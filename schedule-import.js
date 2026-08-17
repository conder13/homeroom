// schedule-import.js
//
// Browser-side glue between an uploaded schedule PDF and Homeroom's
// existing localStorage schema (`classes`, `classSchedule` -- see
// schedule.js / today.js).
//
// Requires pdf.js loaded globally, e.g. in index.html / schedule.html:
//
//   <script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js"></script>
//
// (Same pattern you're already using for Papa Parse -- a plain CDN
// script tag is simpler than wiring pdf.js's worker through Parcel.)
//
// Usage (e.g. wired to a <input type="file"> change event):
//
//   import { parseSchedulePdf } from "./schedule-import.js";
//
//   fileInput.addEventListener("change", async (e) => {
//     const file = e.target.files[0];
//     try {
//       const { classes, classSchedule, dayCount, periodCount } =
//         await parseSchedulePdf(file);
//       // Show `classSchedule` in a review UI (reuse schedule.js's grid
//       // rendering) BEFORE writing to localStorage -- PDF parsing will
//       // occasionally get a cell wrong, and letting the student fix it
//       // in the same drag-and-drop grid they already know is much
//       // better than silently trusting the parse.
//     } catch (err) {
//       alert("Couldn't read that schedule PDF: " + err.message);
//     }
//   });

import { parseGridItems } from "./scheduleGridParser.js";

if (typeof window !== "undefined" && window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js";
}

/**
 * @param {File} file
 * @returns {Promise<{classes: string[], classSchedule: (string|null)[][], dayCount: number, periodCount: number}>}
 */
export async function parseSchedulePdf(file) {
    if (!window.pdfjsLib) {
        throw new Error(
            "pdf.js isn't loaded. Add the pdfjs-dist <script> tag to this page."
        );
    }

    const buffer = await file.arrayBuffer();
    const doc = await window.pdfjsLib.getDocument({ data: buffer }).promise;

    // The report has a course-description page AND the grid page; find the
    // grid page by scanning for the "D1"/"D2"/... headers rather than
    // assuming a fixed page number, so this keeps working if a school's
    // export omits or reorders pages.
    for (let p = 1; p <= doc.numPages; p++) {
        const page = await doc.getPage(p);
        const viewport = page.getViewport({ scale: 1 });
        const content = await page.getTextContent();
        const items = content.items
            .filter((it) => it.str.trim() !== "")
            .map((it) => ({
                str: it.str,
                x: it.transform[4],
                top: viewport.height - it.transform[5],
            }));

        const looksLikeGrid = items.some((it) => /^D\d+$/.test(it.str.trim()));
        if (!looksLikeGrid) continue;

        const { classSchedule, dayCount, periodCount } = parseGridItems(items);

        // Derive the unique class list (in first-seen order) for the sidebar
        // "classes" array that schedule.js already expects.
        const classes = [];
        for (const day of classSchedule) {
            for (const name of day) {
                if (name && !classes.includes(name)) classes.push(name);
            }
        }

        return { classes, classSchedule, dayCount, periodCount };
    }

    throw new Error(
        "Couldn't find a schedule grid (D1, D2, ... columns) in this PDF. " +
        "This importer currently supports the Aspen SIS 'Student Schedule' report."
    );
}

/**
 * Writes parsed results into the same localStorage keys schedule.js /
 * today.js already read from, so no other code needs to change.
 * Call this only AFTER the student has reviewed/corrected the parse.
 */
export function saveParsedSchedule({ classes, classSchedule }) {
    localStorage.setItem("classes", JSON.stringify(classes));
    localStorage.setItem("classSchedule", JSON.stringify(classSchedule));
}