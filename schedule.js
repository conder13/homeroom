var classSchedule = [
   [null, null, null, null, null, null, null],
   [null, null, null, null, null, null, null],
   [null, null, null, null, null, null, null],
   [null, null, null, null, null, null, null],
   [null, null, null, null, null, null, null],
   [null, null, null, null, null, null, null]
];

var classes = [];

if (localStorage.getItem('classes')) {
   console.log(localStorage.getItem('classes'));
}
classes = JSON.parse(localStorage.getItem('classes'));

classSchedule = JSON.parse(localStorage.getItem('classSchedule'));
console.log(classSchedule);

const scheduleContainer = document.getElementById("scheduleContainer");
const classList = document.getElementById("classList");
const newClassName = document.getElementById("newClassName");
const addClassBtn = document.getElementById("addClassBtn");
const clearBtn = document.getElementById("clearSchedule");

clearBtn.addEventListener("click", clearSchedule);

function addClass() {
   const name = newClassName.value.trim();
   if (!name) return;
   const classEl = createClassLabel(name, false);  // Sidebar class
   classList.appendChild(classEl);
   classes.push(name);
   localStorage.setItem('classes', JSON.stringify(classes));

   newClassName.value = "";
}

addClassBtn.addEventListener("click", addClass);

newClassName.addEventListener("keydown", (e) => {
   if (e.key === "Enter") {
      addClass();
   }
});

let classId = 0;

function generateSchedule(days = 6, blocks = 7) {
   classes.forEach(c => {
      const classEl = createClassLabel(c, false);  // Sidebar class
      classList.appendChild(classEl);
   });

   const savedSchedule = localStorage.getItem('classSchedule');
   if (savedSchedule) {
      classSchedule = JSON.parse(savedSchedule);
   } else {
      classSchedule = Array(days).fill(null).map(() => Array(blocks).fill(null));
   }

   scheduleContainer.innerHTML = "";

   for (let d = 1; d <= days; d++) {
      const day = document.createElement("div");
      day.className = "day";

      const header = document.createElement("h3");
      header.textContent = `Day ${d}`;
      day.appendChild(header);

      for (let b = 1; b <= blocks; b++) {
         const block = document.createElement("div");
         block.className = "block";
         block.dataset.day = d;
         block.dataset.block = b;

         block.addEventListener("dragover", (e) => e.preventDefault());

         block.addEventListener("drop", (e) => {
            e.preventDefault();
            const id = e.dataTransfer.getData("text/plain");
            const draggedClassEl = document.getElementById(id);
            if (draggedClassEl) {
               const className = draggedClassEl.firstChild.textContent;

               const dayIndex = parseInt(block.dataset.day) - 1;
               const blockIndex = parseInt(block.dataset.block) - 1;
               classSchedule[dayIndex][blockIndex] = className;

               block.innerHTML = "";
               const placedEl = createClassLabel(className, true); // Placed class
               placedEl.id = `placed-${Math.random().toString(36).substr(2, 9)}`;
               block.appendChild(placedEl);

               localStorage.setItem('classSchedule', JSON.stringify(classSchedule));
            }
         });

         const savedClass = classSchedule[d - 1][b - 1];
         if (savedClass) {
            const classDiv = createClassLabel(savedClass, true);
            classDiv.id = `placed-${Math.random().toString(36).substr(2, 9)}`;
            block.appendChild(classDiv);
         }

         day.appendChild(block);
      }

      scheduleContainer.appendChild(day);
   }
}

function dragStart(e) {
   e.dataTransfer.setData("text/plain", e.target.id);
}

function createClassLabel(name, isPlaced = false) {
   const el = document.createElement("div");
   el.className = "classLabel";
   el.textContent = name;
   el.id = `class-${classId++}`;
   el.draggable = true;
   el.addEventListener("dragstart", dragStart);

   const removeBtn = document.createElement("button");
   removeBtn.className = "removeBtn";
   removeBtn.textContent = "✕";
   removeBtn.onclick = (e) => {
      e.stopPropagation();
      classes.pop()
      if (isPlaced) {
         // Remove only this placed instance
         el.remove();
      } else {
         // Remove all placed copies and the class list item
         const placedItems = scheduleContainer.querySelectorAll(`[id^="placed-"]`);
         placedItems.forEach(item => {
            if (item.textContent.includes(name)) {
               item.remove();
            }
         });
         el.remove();
      }
   };

   el.appendChild(removeBtn);

   return el;
}

function clearSchedule() {
   const placedItems = scheduleContainer.querySelectorAll(`[id^="placed-"]`);
   placedItems.forEach(item => {
      item.remove();
   });
   classSchedule = classSchedule.map(row => row.map(() => null));

   console.log(classSchedule);
   localStorage.setItem('classSchedule', JSON.stringify(classSchedule));

}

generateSchedule(6, 7);
