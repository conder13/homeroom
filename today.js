var classSchedule = [
   [null, null, null, null, null, null, null],
   [null, null, null, null, null, null, null],
   [null, null, null, null, null, null, null],
   [null, null, null, null, null, null, null],
   [null, null, null, null, null, null, null],
   [null, null, null, null, null, null, null]
];
if (localStorage.getItem('classSchedule')) {
   classSchedule = JSON.parse(localStorage.getItem('classSchedule'));

}

const noSchoolDates = [
   "2025-09-01",
   "2025-09-23",
   "2025-10-02",
   "2025-10-13",
   "2025-10-20",
   "2025-11-11",
   "2025-11-27",
   "2025-11-28",
   "2025-12-01",
   "2025-12-24",
   "2025-12-25",
   "2025-12-26",
   "2025-12-27",
   "2025-12-28",
   "2025-12-29",
   "2025-12-30",
   "2025-12-31",
   "2026-01-01",
   "2026-01-02",
   "2026-01-19",
   "2026-02-16",
   "2026-02-17",
   "2026-02-18",
   "2026-02-19",
   "2026-02-20",
   "2026-03-19",
   "2026-03-20",
   "2026-04-20",
   "2026-04-21",
   "2026-04-22",
   "2026-04-23",
   "2026-04-24",
   "2026-05-25",
   "2026-06-19"
];

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

function toLocalISO(d) {
   const y = d.getFullYear();
   const m = String(d.getMonth() + 1).padStart(2, "0");
   const day = String(d.getDate()).padStart(2, "0");
   return `${y}-${m}-${day}`;
}


console.log(getCycleDay(new Date())); // Example → Day 3
console.log(new Date());


function displayToday(dayNum, schedule) {
   if (dayNum == null) {
      return null;
   }
   document.getElementById('day').textContent = "Day " + dayNum;
   dayNum -= 1;
   document.getElementById('block1').textContent = schedule[dayNum][0];
   document.getElementById('block2').textContent = schedule[dayNum][1];
   document.getElementById('block3').textContent = schedule[dayNum][2];
   document.getElementById('block4').textContent = schedule[dayNum][3];
   document.getElementById('block5').textContent = schedule[dayNum][4];
   document.getElementById('block6').textContent = schedule[dayNum][5];
   document.getElementById('block7').textContent = schedule[dayNum][6];


}




displayToday(getCycleDay(new Date()), classSchedule);