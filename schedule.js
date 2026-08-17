// schedule.js
//
// The schedule builder page. Two things live here:
//   1. The sidebar list of classes (add/remove).
//   2. The day x block grid you drag those classes onto.
//
// Drag-and-drop uses SortableJS instead of the native HTML5 Drag and
// Drop API -- native HTML5 DnD doesn't work on touchscreens at all,
// which matters for Chromebooks-with-touch and any future mobile use.
//
// Drag behavior:
//   - Dragging FROM the sidebar CLONES the class (sidebar keeps it).
//   - Dragging FROM one schedule slot to another MOVES it.
//   - Each schedule slot holds at most one class -- dropping a second
//     one in replaces the first.

import "./cloudSync.js"; // side-effect only: enables localStorage -> Supabase sync
import Sortable from "sortablejs";
import { parseSchedulePdf } from "./schedule-import.js";

const DEFAULT_DAYS = 6;
const DEFAULT_BLOCKS = 7;

// ---------------------------------------------------------------------
// State
// ---------------------------------------------------------------------

let classes = loadClasses();
let classSchedule = loadSchedule();

function loadClasses() {
   try {
      return JSON.parse(localStorage.getItem("classes")) || [];
   } catch {
      return [];
   }
}

function loadSchedule() {
   try {
      const saved = JSON.parse(localStorage.getItem("classSchedule"));
      if (Array.isArray(saved) && saved.length) return saved;
   } catch {
      /* fall through to a blank grid */
   }
   return Array(DEFAULT_DAYS).fill(null).map(() => Array(DEFAULT_BLOCKS).fill(null));
}

function persistClasses() {
   localStorage.setItem("classes", JSON.stringify(classes));
}

function persistSchedule() {
   localStorage.setItem("classSchedule", JSON.stringify(classSchedule));
}

// ---------------------------------------------------------------------
// DOM refs
// ---------------------------------------------------------------------

const classList = document.getElementById("classList");
const newClassName = document.getElementById("newClassName");
const addClassBtn = document.getElementById("addClassBtn");
const clearBtn = document.getElementById("clearSchedule");
const scheduleContainer = document.getElementById("scheduleContainer");
const scheduleUpload = document.getElementById("scheduleUpload");
const uploadStatus = document.getElementById("uploadStatus");

// ---------------------------------------------------------------------
// Class chips (shared by the sidebar and placed-in-a-slot views)
// ---------------------------------------------------------------------

function createClassChip(name, onRemove) {
   const chip = document.createElement("div");
   chip.className = "classLabel";
   chip.dataset.className = name;
   chip.textContent = name;

   const removeBtn = document.createElement("button");
   removeBtn.type = "button";
   removeBtn.className = "removeBtn";
   removeBtn.textContent = "\u2715";
   removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      onRemove();
   });
   chip.appendChild(removeBtn);

   return chip;
}

// ---------------------------------------------------------------------
// Sidebar: add / remove classes
// ---------------------------------------------------------------------

function renderClassList() {
   classList.innerHTML = "";
   classes.forEach((name) => {
      const chip = createClassChip(name, () => removeClassEverywhere(name));
      classList.appendChild(chip);
   });
}

function addClass() {
   const name = newClassName.value.trim();
   if (!name) return;
   if (classes.includes(name)) {
      newClassName.value = "";
      return; // already have this one -- no duplicate chips
   }
   classes.push(name);
   persistClasses();
   renderClassList();
   newClassName.value = "";
}

function removeClassEverywhere(name) {
   classes = classes.filter((c) => c !== name);
   persistClasses();

   // Clear every placed instance of this class from the grid.
   classSchedule = classSchedule.map((day) => day.map((c) => (c === name ? null : c)));
   persistSchedule();

   renderClassList();
   renderGrid();
}

addClassBtn.addEventListener("click", addClass);
newClassName.addEventListener("keydown", (e) => {
   if (e.key === "Enter") {
      e.preventDefault();
      addClass();
   }
});

new Sortable(classList, {
   group: { name: "classes", pull: "clone", put: false },
   sort: false,
   filter: ".removeBtn",
   preventOnFilter: true,
});

// ---------------------------------------------------------------------
// Grid: the actual schedule
// ---------------------------------------------------------------------

function fillSlot(dayIndex, blockIndex, chipEl) {
   const name = chipEl.dataset.className;
   classSchedule[dayIndex][blockIndex] = name;
   persistSchedule();

   // Cloned/moved chips don't carry their original click listener, so
   // rewire the remove button for its new context (clearing this one slot).
   const removeBtn = chipEl.querySelector(".removeBtn");
   removeBtn.onclick = (e) => {
      e.stopPropagation();
      chipEl.remove();
      classSchedule[dayIndex][blockIndex] = null;
      persistSchedule();
   };
}

function createDayColumn(dayIndex, blockCount) {
   const day = document.createElement("div");
   day.className = "day";

   const header = document.createElement("h3");
   header.textContent = `Day ${dayIndex + 1}`;
   day.appendChild(header);

   for (let b = 0; b < blockCount; b++) {
      const block = document.createElement("div");
      block.className = "block";

      const existing = classSchedule[dayIndex]?.[b];
      if (existing) {
         const chip = createClassChip(existing, () => {
            chip.remove();
            classSchedule[dayIndex][b] = null;
            persistSchedule();
         });
         block.appendChild(chip);
      }

      new Sortable(block, {
         group: { name: "classes", pull: true, put: true },
         sort: false,
         filter: ".removeBtn",
         preventOnFilter: true,
         onAdd: (evt) => {
            // Enforce one class per slot: whatever else is in here, drop it.
            Array.from(block.children).forEach((child) => {
               if (child !== evt.item) child.remove();
            });
            fillSlot(dayIndex, b, evt.item);
         },
         onRemove: () => {
            // The class was dragged out to another slot -- this one's empty now.
            classSchedule[dayIndex][b] = null;
            persistSchedule();
         },
      });

      day.appendChild(block);
   }

   return day;
}

function renderGrid() {
   const days = classSchedule.length || DEFAULT_DAYS;
   const blocks = classSchedule[0]?.length || DEFAULT_BLOCKS;

   scheduleContainer.innerHTML = "";
   scheduleContainer.style.setProperty("--day-count", days);

   for (let d = 0; d < days; d++) {
      scheduleContainer.appendChild(createDayColumn(d, blocks));
   }
}

function clearSchedule() {
   classSchedule = classSchedule.map((day) => day.map(() => null));
   persistSchedule();
   renderGrid();
}

clearBtn.addEventListener("click", clearSchedule);

// ---------------------------------------------------------------------
// PDF upload
// ---------------------------------------------------------------------

scheduleUpload.addEventListener("change", async (e) => {
   const file = e.target.files[0];
   if (!file) return;

   uploadStatus.textContent = "Reading schedule...";

   try {
      const parsed = await parseSchedulePdf(file);

      parsed.classes.forEach((name) => {
         if (!classes.includes(name)) classes.push(name);
      });
      classSchedule = parsed.classSchedule;

      persistClasses();
      persistSchedule();
      renderClassList();
      renderGrid();

      uploadStatus.textContent =
          `Imported ${parsed.dayCount} days x ${parsed.periodCount} periods. ` +
          `Check the grid below and fix anything that's off.`;
   } catch (err) {
      console.error(err);
      uploadStatus.textContent = "Couldn't read that PDF: " + err.message;
   } finally {
      scheduleUpload.value = "";
   }
});

// ---------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------

renderClassList();
renderGrid();