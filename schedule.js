// schedule.js
//
// The schedule builder page. Two things live here:
//   1. The sidebar list of classes -- name, teacher, room, and color,
//      all edited in one place and linked to every instance of that
//      class on the grid.
//   2. The day x block grid you drag those classes onto.
//
// Drag-and-drop uses SortableJS instead of the native HTML5 Drag and
// Drop API -- native HTML5 DnD doesn't work on touchscreens at all,
// which matters for Chromebooks-with-touch and any future mobile use.
//
// Drag behavior:
//   - Dragging FROM the sidebar CLONES the class (sidebar keeps it).
//   - Dragging FROM one schedule slot to another COPIES it -- the
//     original slot keeps its class too.
//   - Each schedule slot holds at most one class -- dropping a second
//     one in replaces the first.
//
// Class metadata (teacher/room/color) lives in ONE place -- the
// `classes` array -- and every placed instance on the grid just reads
// it from there at render time. That's what makes the color "link
// across all instances": there's only one source of truth, so editing
// a class in the sidebar updates every day it's scheduled on and the
// exported view, automatically.
//
// classSchedule itself only needs to remember WHICH class is in each
// slot (by name), but it's still written to localStorage as
// {name, teacher, room, color} per cell -- kept in sync with `classes`
// on every edit -- so anything else reading that key (other modules,
// cloud sync) keeps seeing the shape it already expects.

import "./cloudSync.js"; // side-effect only: enables localStorage -> Supabase sync
import Sortable from "sortablejs";
import { parseSchedulePdf } from "./schedule-import.js";
import { openScheduleExport } from "./scheduleExport.js";

const DEFAULT_DAYS = 6;
const DEFAULT_BLOCKS = 7;

// Cycled through automatically as classes are added; any class's color
// can be overridden with the picker in its card.
const CLASS_COLOR_PALETTE = [
   "#FF5A36", "#5BA6D0", "#EB9486", "#8E7DBE", "#4CAF91",
   "#F2C94C", "#E85D75", "#6FCF97", "#56CCF2", "#BB6BD9",
];

function colorForIndex(i) {
   return CLASS_COLOR_PALETTE[i % CLASS_COLOR_PALETTE.length];
}

// Picks readable text (navy or white) for a given background color so
// placed chips stay legible no matter which color a class is given.
function getContrastText(hex) {
   if (!hex) return "";
   const clean = hex.replace("#", "");
   if (clean.length !== 6) return "";
   const r = parseInt(clean.substring(0, 2), 16);
   const g = parseInt(clean.substring(2, 4), 16);
   const b = parseInt(clean.substring(4, 6), 16);
   const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
   return luminance > 0.6 ? "#22223B" : "#FFFFFF";
}

// ---------------------------------------------------------------------
// State
//
// classes: [{ name, teacher, room, color }, ...] -- the source of truth
//   for every class's metadata.
// classSchedule: [day][block] = class name string, or null. Older saved
//   schedules stored a plain string or a {name, teacher, room} object
//   per slot -- both are normalized on load, and if a slot had its own
//   teacher/room from before this feature existed, that's used to seed
//   the class's (now shared) teacher/room the first time it's loaded.
// ---------------------------------------------------------------------

function normalizeClassEntry(entry, index) {
   if (typeof entry === "string") {
      return { name: entry, teacher: "", room: "", color: colorForIndex(index) };
   }
   return {
      name: entry.name,
      teacher: entry.teacher || "",
      room: entry.room || "",
      color: entry.color || colorForIndex(index),
   };
}

function loadClasses() {
   try {
      const saved = JSON.parse(localStorage.getItem("classes")) || [];
      return saved.map((entry, i) => normalizeClassEntry(entry, i));
   } catch {
      return [];
   }
}

function loadRawSchedule() {
   try {
      const saved = JSON.parse(localStorage.getItem("classSchedule"));
      if (Array.isArray(saved) && saved.length) return saved;
   } catch {
      /* fall through to a blank grid */
   }
   return null;
}

// Reduces a raw (possibly legacy) saved schedule down to the runtime
// shape this file works with: just the class name per slot.
function extractNames(raw) {
   if (!raw) {
      return Array(DEFAULT_DAYS).fill(null).map(() => Array(DEFAULT_BLOCKS).fill(null));
   }
   return raw.map((day) => day.map((cell) => {
      if (!cell) return null;
      if (typeof cell === "string") return cell;
      return cell.name || null;
   }));
}

// One-time migration: if a legacy schedule had per-slot teacher/room
// and the matching class doesn't have any yet, adopt it as that
// class's (now shared) teacher/room.
function seedClassMetaFromRawSchedule(raw) {
   if (!raw) return;
   raw.forEach((day) => day.forEach((cell) => {
      if (cell && typeof cell === "object" && cell.name) {
         const cls = findClass(cell.name);
         if (cls && !cls.teacher && !cls.room && (cell.teacher || cell.room)) {
            cls.teacher = cell.teacher || "";
            cls.room = cell.room || "";
         }
      }
   }));
}

function loadBlockTimes() {
   try {
      const saved = JSON.parse(localStorage.getItem("blockTimes"));
      if (Array.isArray(saved)) return saved;
   } catch {
      /* fall through */
   }
   return [];
}

function findClass(name) {
   return classes.find((c) => c.name === name);
}

function persistClasses() {
   localStorage.setItem("classes", JSON.stringify(classes));
}

// Writes classSchedule back out as {name, teacher, room, color} per
// slot (derived fresh from `classes`), not bare names -- so anything
// else reading this key still gets the full picture.
function persistSchedule() {
   const denormalized = classSchedule.map((day) =>
       day.map((name) => {
          if (!name) return null;
          const cls = findClass(name);
          return {
             name,
             teacher: cls?.teacher || "",
             room: cls?.room || "",
             color: cls?.color || "",
          };
       })
   );
   localStorage.setItem("classSchedule", JSON.stringify(denormalized));
}

function persistBlockTimes() {
   localStorage.setItem("blockTimes", JSON.stringify(blockTimes));
}

let classes = loadClasses();
const initialRawSchedule = loadRawSchedule();
seedClassMetaFromRawSchedule(initialRawSchedule);
let classSchedule = extractNames(initialRawSchedule);
let blockTimes = loadBlockTimes();

// Save back the normalized/migrated shapes right away so localStorage
// (and anything syncing off it) reflects the upgrade immediately.
persistClasses();
persistSchedule();

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

// Block-times panel and the export button aren't in schedule.html --
// built here at runtime so this feature doesn't require an HTML edit.
const blockTimesPanel = document.createElement("div");
blockTimesPanel.id = "blockTimesPanel";
scheduleContainer.parentNode.insertBefore(blockTimesPanel, scheduleContainer);

const exportBtn = document.createElement("button");
exportBtn.type = "button";
exportBtn.id = "exportScheduleBtn";
exportBtn.textContent = "Export Schedule";
exportBtn.addEventListener("click", () => openScheduleExport());
clearBtn.insertAdjacentElement("afterend", exportBtn);

// ---------------------------------------------------------------------
// Sidebar: class cards (name, color, teacher, room, remove) -- this is
// now the one place all of a class's metadata is edited.
// ---------------------------------------------------------------------

function createClassCard(cls, onRemove) {
   const card = document.createElement("div");
   card.className = "classCard";
   card.dataset.className = cls.name;

   const top = document.createElement("div");
   top.className = "classCardTop";

   const colorInput = document.createElement("input");
   colorInput.type = "color";
   colorInput.className = "classColorInput";
   colorInput.value = cls.color;
   colorInput.title = "Class color";
   // Don't let opening the color picker start a drag.
   colorInput.addEventListener("pointerdown", (e) => e.stopPropagation());
   colorInput.addEventListener("input", () => {
      cls.color = colorInput.value;
      persistClasses();
      persistSchedule();
      renderGrid();
   });

   const nameInput = document.createElement("input");
   nameInput.type = "text";
   nameInput.className = "classCardNameInput";
   nameInput.value = cls.name;
   nameInput.maxLength = 40;
   // Don't let clicking into the name field start a drag.
   nameInput.addEventListener("pointerdown", (e) => e.stopPropagation());
   nameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") nameInput.blur();
   });
   nameInput.addEventListener("change", () => {
      const newName = nameInput.value.trim();
      const renamed = renameClassEverywhere(cls.name, newName);
      if (renamed) {
         card.dataset.className = newName;
      } else {
         // Blank or a name already in use -- revert the field.
         nameInput.value = cls.name;
      }
   });

   const removeBtn = document.createElement("button");
   removeBtn.type = "button";
   removeBtn.className = "removeBtn";
   removeBtn.textContent = "\u2715";
   removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      onRemove();
   });

   top.append(colorInput, nameInput, removeBtn);
   card.appendChild(top);

   const metaRow = document.createElement("div");
   metaRow.className = "classMetaRow";

   const teacherInput = document.createElement("input");
   teacherInput.type = "text";
   teacherInput.className = "classMetaInput";
   teacherInput.placeholder = "Teacher";
   teacherInput.value = cls.teacher;

   const roomInput = document.createElement("input");
   roomInput.type = "text";
   roomInput.className = "classMetaInput";
   roomInput.placeholder = "Room";
   roomInput.value = cls.room;

   // Don't let typing/clicking in these inputs start a drag.
   [teacherInput, roomInput].forEach((input) => {
      input.addEventListener("pointerdown", (e) => e.stopPropagation());
   });
   teacherInput.addEventListener("change", () => {
      cls.teacher = teacherInput.value.trim();
      persistClasses();
      persistSchedule();
      renderGrid();
   });
   roomInput.addEventListener("change", () => {
      cls.room = roomInput.value.trim();
      persistClasses();
      persistSchedule();
      renderGrid();
   });

   metaRow.append(teacherInput, roomInput);
   card.appendChild(metaRow);

   return card;
}

function renderClassList() {
   classList.innerHTML = "";
   classes.forEach((cls) => {
      const card = createClassCard(cls, () => removeClassEverywhere(cls.name));
      classList.appendChild(card);
   });
}

function addClass() {
   const name = newClassName.value.trim();
   if (!name) return;
   if (classes.some((c) => c.name === name)) {
      newClassName.value = "";
      return; // already have this one -- no duplicate cards
   }
   classes.push({ name, teacher: "", room: "", color: colorForIndex(classes.length) });
   persistClasses();
   renderClassList();
   newClassName.value = "";
}

function removeClassEverywhere(name) {
   classes = classes.filter((c) => c.name !== name);
   persistClasses();

   // Clear every placed instance of this class from the grid.
   classSchedule = classSchedule.map((day) => day.map((n) => (n === name ? null : n)));
   persistSchedule();

   renderClassList();
   renderGrid();
}

// Renames a class in place and repoints every slot on the grid that
// referenced the old name -- returns false (and changes nothing) if the
// new name is blank or already taken by another class.
function renameClassEverywhere(oldName, newName) {
   if (!newName || (newName !== oldName && classes.some((c) => c.name === newName))) {
      return false;
   }

   const cls = findClass(oldName);
   if (!cls) return false;
   cls.name = newName;
   persistClasses();

   classSchedule = classSchedule.map((day) => day.map((n) => (n === oldName ? newName : n)));
   persistSchedule();

   renderGrid();
   return true;
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

// Tints a slot with a class's color and picks a readable text color to
// go with it; pass a falsy color to reset the slot back to default.
function applyBlockColor(blockEl, color) {
   if (color) {
      blockEl.style.backgroundColor = color;
      blockEl.style.color = getContrastText(color);
   } else {
      blockEl.style.backgroundColor = "";
      blockEl.style.color = "";
   }
}

function createPlacedChip(name, onRemove) {
   const cls = findClass(name) || { name, teacher: "", room: "", color: "" };

   const chip = document.createElement("div");
   chip.className = "classLabel classLabel--placed";
   chip.dataset.className = name;

   const top = document.createElement("div");
   top.className = "classLabelTop";

   if (cls.color) {
      const dot = document.createElement("span");
      dot.className = "classColorDot";
      dot.style.backgroundColor = cls.color;
      top.appendChild(dot);
   }

   const nameEl = document.createElement("span");
   nameEl.className = "classLabelName";
   nameEl.textContent = name;
   top.appendChild(nameEl);

   const removeBtn = document.createElement("button");
   removeBtn.type = "button";
   removeBtn.className = "removeBtn";
   removeBtn.textContent = "\u2715";
   removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      onRemove();
   });
   top.appendChild(removeBtn);

   chip.appendChild(top);

   const bits = [cls.teacher, cls.room ? `Rm ${cls.room}` : ""].filter(Boolean);
   if (bits.length) {
      const meta = document.createElement("div");
      meta.className = "classLabelMeta";
      meta.textContent = bits.join(" \u00B7 ");
      chip.appendChild(meta);
   }

   return chip;
}

function fillSlot(dayIndex, blockIndex, chipEl) {
   const name = chipEl.dataset.className;
   classSchedule[dayIndex][blockIndex] = name;
   persistSchedule();

   // The dropped chip is a bare clone (from the sidebar) or a moved node
   // (from another slot) -- neither carries a rewired remove button, so
   // just re-render this slot's chip properly rather than patching the
   // raw dropped node in place.
   renderGrid();
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

      const name = classSchedule[dayIndex]?.[b] || null;
      if (name) {
         const chip = createPlacedChip(name, () => {
            chip.remove();
            classSchedule[dayIndex][b] = null;
            persistSchedule();
            applyBlockColor(block, null);
         });
         block.appendChild(chip);
         applyBlockColor(block, findClass(name)?.color);
      }

      new Sortable(block, {
         group: { name: "classes", pull: "clone", put: true },
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

   renderBlockTimes(blocks);
}

function renderBlockTimes(blockCount) {
   blockTimesPanel.innerHTML = "";

   const heading = document.createElement("h2");
   heading.textContent = "Block Times";
   blockTimesPanel.appendChild(heading);

   const hint = document.createElement("p");
   hint.className = "blockTimesHint";
   hint.textContent = "Fill these in once and they'll show up on your exported schedule.";
   blockTimesPanel.appendChild(hint);

   const row = document.createElement("div");
   row.className = "blockTimesRow";

   for (let b = 0; b < blockCount; b++) {
      const field = document.createElement("div");
      field.className = "blockTimeField";

      const label = document.createElement("label");
      label.textContent = `Block ${b + 1}`;
      label.htmlFor = `blockTime-${b}`;

      const input = document.createElement("input");
      input.type = "text";
      input.id = `blockTime-${b}`;
      input.placeholder = "e.g. 9:15 - 10:05 AM";
      input.value = blockTimes[b] || "";
      input.addEventListener("change", () => {
         blockTimes[b] = input.value.trim();
         persistBlockTimes();
      });

      field.append(label, input);
      row.appendChild(field);
   }

   blockTimesPanel.appendChild(row);
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
         if (!classes.some((c) => c.name === name)) {
            classes.push({ name, teacher: "", room: "", color: colorForIndex(classes.length) });
         }
      });

      seedClassMetaFromRawSchedule(parsed.classSchedule);
      classSchedule = extractNames(parsed.classSchedule);
      blockTimes = parsed.blockTimes || [];

      persistClasses();
      persistSchedule();
      persistBlockTimes();
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