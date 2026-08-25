// scheduleExport.js
//
// Renders a clean, phone-readable version of the full week schedule
// (class, teacher, room, block time) and lets the student save it as a
// PNG or a PDF. Reads the same localStorage keys the builder already
// writes -- classSchedule and blockTimes -- so there's no separate data
// store to keep in sync.
//
// html2canvas + jsPDF are loaded from CDN the first time this is used,
// the same pattern schedule-import.js already uses for pdf.js -- keeps
// them out of the main bundle for people who never export.

const DAY_LABELS = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8"];

function loadScript(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const s = document.createElement("script");
        s.src = src;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error(`Couldn't load ${src}`));
        document.head.appendChild(s);
    });
}

async function ensureExportLibs() {
    await loadScript("https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js");
    await loadScript("https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js");
}

function normalizeCell(cell) {
    if (!cell) return null;
    // Backward-compat with schedules saved before teacher/room/color existed.
    if (typeof cell === "string") return { name: cell, teacher: "", room: "", color: "" };
    return { name: cell.name, teacher: cell.teacher || "", room: cell.room || "", color: cell.color || "" };
}

function loadExportData() {
    let classSchedule = [];
    let blockTimes = [];
    try {
        classSchedule = JSON.parse(localStorage.getItem("classSchedule")) || [];
    } catch {
        classSchedule = [];
    }
    try {
        blockTimes = JSON.parse(localStorage.getItem("blockTimes")) || [];
    } catch {
        blockTimes = [];
    }
    return { classSchedule, blockTimes };
}

function buildExportCard() {
    const { classSchedule, blockTimes } = loadExportData();

    const card = document.createElement("div");
    card.className = "exportCard";

    const heading = document.createElement("h1");
    heading.className = "exportTitle";
    const username = localStorage.getItem("username");
    heading.textContent = username ? `${username}'s Schedule` : "My Schedule";
    card.appendChild(heading);

    if (!classSchedule.length) {
        const empty = document.createElement("p");
        empty.className = "exportEmptyDay";
        empty.textContent = "No schedule saved yet -- build one on this page first.";
        card.appendChild(empty);
        return card;
    }

    const dayCount = classSchedule.length;
    const blockCount = Math.max(...classSchedule.map((day) => day.length), 0);

    const grid = document.createElement("div");
    grid.className = "exportGrid";
    grid.style.gridTemplateColumns = `repeat(${dayCount + 1}, 1fr)`;
    card.appendChild(grid);

    // Header row: blank corner + one header per day
    grid.appendChild(Object.assign(document.createElement("div"), {
        className: "exportHeaderCell exportCornerCell",
    }));
    classSchedule.forEach((_, dayIndex) => {
        const th = document.createElement("div");
        th.className = "exportHeaderCell";
        th.textContent = DAY_LABELS[dayIndex] || `Day ${dayIndex + 1}`;
        grid.appendChild(th);
    });

    // One row per block: time label, then each day's cell for that block
    for (let b = 0; b < blockCount; b++) {
        const timeCell = document.createElement("div");
        timeCell.className = "exportTimeCol";
        timeCell.textContent = blockTimes[b] || `Block ${b + 1}`;
        grid.appendChild(timeCell);

        classSchedule.forEach((day) => {
            const cell = normalizeCell(day[b]);
            const cellEl = document.createElement("div");

            if (cell && cell.name) {
                cellEl.className = "exportCell";
                if (cell.color) {
                    cellEl.style.borderLeftColor = cell.color;
                }

                const nameRow = document.createElement("div");
                nameRow.className = "exportClassName";
                if (cell.color) {
                    const dot = document.createElement("span");
                    dot.className = "exportColorDot";
                    dot.style.backgroundColor = cell.color;
                    nameRow.appendChild(dot);
                }
                const nameText = document.createElement("span");
                nameText.className = "exportClassNameText";
                nameText.textContent = cell.name;
                nameRow.appendChild(nameText);
                cellEl.appendChild(nameRow);

                const bits = [];
                if (cell.teacher) bits.push(cell.teacher);
                if (cell.room) bits.push(`Rm ${cell.room}`);
                if (bits.length) {
                    const meta = document.createElement("div");
                    meta.className = "exportMeta";
                    meta.textContent = bits.join(" \u00B7 ");
                    cellEl.appendChild(meta);
                }
            } else {
                cellEl.className = "exportCell exportEmptyCell";
            }

            grid.appendChild(cellEl);
        });
    }

    return card;
}

async function renderToCanvas(card) {
    // Render off-screen at a fixed width so the export looks the same
    // regardless of the phone/laptop window it was triggered from.
    return window.html2canvas(card, {
        backgroundColor: "#22223B",
        scale: 2,
        useCORS: true,
    });
}

// Mobile browsers (iOS Safari especially) largely ignore the <a download>
// trick -- it just opens the image/PDF in a new tab instead of saving it.
// The reliable cross-platform way to hand a generated file to the user is
// the Web Share API's file support: it opens the native share sheet, and
// "Save to Photos" / "Save to Files" is one of the options there. Where
// that's not available (most desktop browsers), fall back to the classic
// anchor-click download, which works fine there.
async function shareOrDownloadFile(blob, filename, mimeType) {
    const file = new File([blob], filename, { type: mimeType });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
            await navigator.share({ files: [file], title: filename });
            return "shared";
        } catch (err) {
            if (err.name === "AbortError") return "shared"; // user closed the share sheet -- not a failure
            // Some browsers report canShare: true but still fail -- fall through to a download.
        }
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    return "downloaded";
}

async function downloadPng(card) {
    const canvas = await renderToCanvas(card);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    return shareOrDownloadFile(blob, "my-schedule.png", "image/png");
}

async function downloadPdf(card) {
    const canvas = await renderToCanvas(card);
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? "landscape" : "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
    });
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, canvas.width, canvas.height);
    const blob = pdf.output("blob");
    return shareOrDownloadFile(blob, "my-schedule.pdf", "application/pdf");
}

export function openScheduleExport() {
    const overlay = document.createElement("div");
    overlay.className = "exportOverlay";

    const panel = document.createElement("div");
    panel.className = "exportPanel";

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "exportClose";
    closeBtn.textContent = "\u2715";
    closeBtn.addEventListener("click", () => overlay.remove());

    const previewWrap = document.createElement("div");
    previewWrap.className = "exportPreviewWrap";
    const card = buildExportCard();
    previewWrap.appendChild(card);

    const actions = document.createElement("div");
    actions.className = "exportActions";

    const pngBtn = document.createElement("button");
    pngBtn.type = "button";
    pngBtn.textContent = "Save as Image";

    const pdfBtn = document.createElement("button");
    pdfBtn.type = "button";
    pdfBtn.textContent = "Save as PDF";

    const status = document.createElement("p");
    status.className = "exportStatus";

    async function withStatus(fn, label) {
        status.textContent = "Preparing...";
        pngBtn.disabled = true;
        pdfBtn.disabled = true;
        try {
            await ensureExportLibs();
            const result = await fn(card);
            status.textContent = result === "shared"
                ? `${label} shared -- check where you saved it.`
                : `${label} saved to your downloads.`;
        } catch (err) {
            console.error("Schedule export failed:", err);
            status.textContent = "Couldn't export -- try again.";
        } finally {
            pngBtn.disabled = false;
            pdfBtn.disabled = false;
        }
    }

    pngBtn.addEventListener("click", () => withStatus(downloadPng, "Image"));
    pdfBtn.addEventListener("click", () => withStatus(downloadPdf, "PDF"));

    actions.append(pngBtn, pdfBtn);
    panel.append(closeBtn, previewWrap, actions, status);
    overlay.appendChild(panel);

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.remove();
    });
    document.addEventListener("keydown", function onEscape(e) {
        if (e.key === "Escape") {
            overlay.remove();
            document.removeEventListener("keydown", onEscape);
        }
    });

    document.body.appendChild(overlay);
}