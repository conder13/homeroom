// modules/schedule.js
//
// Shows today's classes, pulled from the classSchedule saved by the
// Schedule Builder page (schedule.html / schedule.js). Read-only here --
// this module just displays it.

const noSchoolDates = [
   "2025-09-01", "2025-09-23", "2025-10-02", "2025-10-13", "2025-10-20",
   "2025-11-11", "2025-11-27", "2025-11-28", "2025-12-01", "2025-12-24",
   "2025-12-25", "2025-12-26", "2025-12-27", "2025-12-28", "2025-12-29",
   "2025-12-30", "2025-12-31", "2026-01-01", "2026-01-02", "2026-01-19",
   "2026-02-16", "2026-02-17", "2026-02-18", "2026-02-19", "2026-02-20",
   "2026-03-19", "2026-03-20", "2026-04-20", "2026-04-21", "2026-04-22",
   "2026-04-23", "2026-04-24", "2026-05-25", "2026-06-19",
];

function toLocalISO(d) {
   const y = d.getFullYear();
   const m = String(d.getMonth() + 1).padStart(2, "0");
   const day = String(d.getDate()).padStart(2, "0");
   return `${y}-${m}-${day}`;
}

function getCycleDay(today) {
   const start = new Date(2025, 7, 27);
   let dayNumber = 1;
   const todayISO = toLocalISO(today);

   for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
      const iso = toLocalISO(d);
      const isWeekend = d.getDay() === 0 || d.getDay() === 6;
      const isNoSchool = noSchoolDates.includes(iso);
      if (isWeekend || isNoSchool) continue;
      if (iso === todayISO) return dayNumber;
      dayNumber = (dayNumber % 6) + 1;
   }
   return null;
}

export function mount(container) {
   container.classList.add("schedule-module");

   const dayTitle = document.createElement("h2");
   dayTitle.className = "schedule-day-title";

   const list = document.createElement("div");
   list.className = "schedule-block-list";

   container.append(dayTitle, list);

   function render() {
      let classSchedule = [];
      try {
         classSchedule = JSON.parse(localStorage.getItem("classSchedule")) || [];
      } catch {
         classSchedule = [];
      }

      const dayNum = getCycleDay(new Date());
      list.innerHTML = "";

      if (dayNum == null || !classSchedule[dayNum - 1]) {
         dayTitle.textContent = dayNum == null ? "No School Today" : "No Schedule Saved";
         return;
      }

      dayTitle.textContent = `Day ${dayNum} Schedule`;

      const blocks = classSchedule[dayNum - 1];
      let any = false;
      blocks.forEach((cls) => {
         if (!cls) return;
         any = true;
         // Older saved schedules stored a plain class-name string per slot;
         // newer ones (from the PDF importer or manual entry) store
         // { name, teacher, room }. Support both.
         const cell = typeof cls === "string" ? { name: cls, teacher: "", room: "" } : cls;

         const block = document.createElement("div");
         block.className = "block";
         const name = document.createElement("h4");
         name.className = "cName";
         name.textContent = cell.name;
         block.appendChild(name);

         if (cell.room) {
            const room = document.createElement("span");
            room.className = "cRoom";
            room.textContent = `Rm ${cell.room}`;
            block.appendChild(room);
         }

         list.appendChild(block);
      });

      if (!any) {
         const empty = document.createElement("p");
         empty.className = "schedule-empty";
         empty.textContent = "No classes saved for this day yet.";
         list.appendChild(empty);
      }
   }

   render();

   // If the schedule gets edited on the Schedule page (another tab), pick
   // up the change here without needing a manual refresh.
   const onStorage = (e) => {
      if (e.key === "classSchedule") render();
   };
   window.addEventListener("storage", onStorage);

   return () => {
      window.removeEventListener("storage", onStorage);
   };
}