// scheduleGridParser.js
//
// Parses the "Student Schedule" grid page produced by the Aspen SIS
// ("JasperReports StudentScheduleHighSchool" report). This is the report
// used by Lexington High School and many other districts that run Aspen.
//
// Designed to consume pdf.js's page.getTextContent() items directly:
//   { str, x, top }
//     x   = distance from the left edge of the page, in PDF points
//     top = distance from the TOP of the page, in PDF points
//           (= viewport.height - item.transform[5])
// pdf.js conveniently emits one item per visual sub-line within a grid
// cell (e.g. "World History II" as a single item, "2206-012 Rm : 224" as
// the next), so no word-level re-joining is needed.
//
// -------------------------------------------------------------------------
// HOW THE GRID IS LAID OUT (reverse-engineered from a real export)
// -------------------------------------------------------------------------
// - A header row has "D1".."D6" labels, one per day of the school's day
//   rotation (however many days the rotation uses).
// - Each day's content column sits a fixed ~32.4pt to the LEFT of its
//   header label's x position (empirically constant in this report).
// - The page is divided into horizontal "bands", one per class period.
//   Each band ends with a row containing "<time> AM/PM - <time> AM/PM"
//   (one such string per day column). We use those rows as band
//   separators rather than trying to parse period numbers/letters,
//   because a single vertical band can correspond to different period
//   labels on different days (e.g. "4a" for some days, "4b" for others)
//   -- vertical position is reliable, the printed label is not.
// - Within a band + day column, the cell contains: course name (1-2
//   lines), then a line starting with the course CODE (pattern:
//   letters/digits, hyphen, 3 digits -- e.g. "2206-012"), then teacher
//   name. We only need the course name, so we stop reading at the code
//   line.
// -------------------------------------------------------------------------

const CODE_RE = /^[A-Za-z0-9]+-\d{3}$/;
const TIME_ROW_RE = /\d{1,2}:\d{2}\s*(AM|PM)\s*-\s*\d{1,2}:\d{2}\s*(AM|PM)/;
const HEADER_TO_CONTENT_X_OFFSET = 32.4; // empirically constant in this report

/**
 * @param {{str:string, x:number, top:number}[]} items - text items for one page
 * @returns {{ classSchedule: (string|null)[][], dayCount: number, periodCount: number }}
 */
function parseGridItems(items) {
    const clean = items
        .map((it) => ({ str: it.str.trim(), x: it.x, top: it.top }))
        .filter((it) => it.str !== "");

    // 1. Day-column headers
    const headerTokens = clean.filter((it) => /^D\d+$/.test(it.str));
    if (headerTokens.length < 2) {
        throw new Error(
            "Could not find day-column headers (D1, D2, ...) on this page -- is this the schedule grid page?"
        );
    }
    const headerTop = Math.min(...headerTokens.map((h) => h.top));
    const dayHeaders = headerTokens
        .filter((it) => Math.abs(it.top - headerTop) < 2)
        .sort((a, b) => a.x - b.x);
    const dayCount = dayHeaders.length;
    const dayX0 = dayHeaders.map((h) => h.x - HEADER_TO_CONTENT_X_OFFSET);

    // 2. Band (period) boundaries: rows matching the time-range pattern.
    // Keep the row's own text too (e.g. "9:15 AM - 10:05 AM") -- these
    // repeat once per day column at the same top, so dedupe by top but
    // keep the first text seen for each band.
    const timeItemsSorted = clean
        .filter((it) => TIME_ROW_RE.test(it.str))
        .sort((a, b) => a.top - b.top);

    const bandBoundaries = [];
    const blockTimes = [];
    for (const it of timeItemsSorted) {
        const t = Math.round(it.top * 10) / 10;
        if (bandBoundaries.length === 0 || t - bandBoundaries[bandBoundaries.length - 1] > 2) {
            bandBoundaries.push(t);
            blockTimes.push(it.str.trim());
        }
    }
    if (bandBoundaries.length === 0) {
        throw new Error("Could not find any period time rows on this page.");
    }
    const bandStarts = [headerTop, ...bandBoundaries];
    const periodCount = bandBoundaries.length;

    function bandForTop(top) {
        for (let i = 0; i < periodCount; i++) {
            const lo = bandStarts[i];
            const hi = bandStarts[i + 1];
            if (top > lo && top <= hi + 0.3) {
                if (Math.abs(top - hi) < 0.3) return null; // this IS the time row itself
                return i;
            }
        }
        return null;
    }

    // 3. Bucket every remaining content line into (band, day column)
    const labelColCutoff = dayX0[0] - 10;
    const cellLines = new Map(); // `${band}-${col}` -> [{top, text}]

    for (const it of clean) {
        if (/^D\d+$/.test(it.str)) continue; // header
        if (TIME_ROW_RE.test(it.str)) continue; // time row
        if (it.top <= headerTop + 0.5) continue; // banner text above the grid
        if (it.x < labelColCutoff) continue; // leftmost period-number/letter column

        const band = bandForTop(it.top);
        if (band === null) continue;

        let col = 0;
        let bestDist = Infinity;
        for (let i = 0; i < dayCount; i++) {
            const d = Math.abs(dayX0[i] - it.x);
            if (d < bestDist) {
                bestDist = d;
                col = i;
            }
        }

        const key = `${band}-${col}`;
        if (!cellLines.has(key)) cellLines.set(key, []);
        cellLines.get(key).push({ top: it.top, text: it.str });
    }

    // 4. For each cell: lines before the course-code line are the course
    //    name; the code line itself carries the room ("...Rm : 224"); any
    //    line(s) after it are the teacher's name.
    const classSchedule = Array.from({ length: dayCount }, () => Array(periodCount).fill(null));

    for (const [key, lines] of cellLines.entries()) {
        const [bandStr, colStr] = key.split("-");
        const band = parseInt(bandStr, 10);
        const col = parseInt(colStr, 10);
        lines.sort((a, b) => a.top - b.top);

        const nameParts = [];
        const teacherParts = [];
        let room = "";
        let seenCode = false;

        for (const line of lines) {
            const firstToken = line.text.split(" ")[0];
            if (!seenCode && CODE_RE.test(firstToken)) {
                seenCode = true;
                const roomMatch = line.text.match(/Rm\s*:\s*(\S+)/i);
                if (roomMatch) room = roomMatch[1];
                continue; // the code/room line itself isn't part of the name or teacher
            }
            if (seenCode) {
                teacherParts.push(line.text);
            } else {
                nameParts.push(line.text);
            }
        }

        const name = nameParts.join(" ").trim();
        if (name) {
            classSchedule[col][band] = {
                name,
                teacher: teacherParts.join(" ").trim(),
                room,
            };
        }
    }

    return { classSchedule, blockTimes, dayCount, periodCount };
}

export { parseGridItems, CODE_RE, TIME_ROW_RE };