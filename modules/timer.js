// modules/timer.js

function makeLabeledInput(labelText, value, max) {
   const wrap = document.createElement("span");
   wrap.className = "timerField";

   const label = document.createElement("label");
   label.textContent = labelText;

   const input = document.createElement("input");
   input.type = "number";
   input.min = "0";
   if (max !== undefined) input.max = String(max);
   input.value = String(value);

   wrap.append(label, input);
   return { wrap, input };
}

export function mount(container) {
   container.classList.add("timer-module");

   const display = document.createElement("h2");
   display.className = "timeRemaining";
   display.textContent = "00:30:00";

   const controls = document.createElement("div");
   controls.className = "timerControls";
   const stopBtn = document.createElement("button");
   stopBtn.type = "button";
   stopBtn.textContent = "Stop";
   const pauseBtn = document.createElement("button");
   pauseBtn.type = "button";
   pauseBtn.textContent = "Pause";
   controls.append(stopBtn, pauseBtn);

   const inputsRow = document.createElement("div");
   inputsRow.className = "timerInputs";

   const h = makeLabeledInput("H:", 0);
   const m = makeLabeledInput("M:", 30);
   const s = makeLabeledInput("S:", 0, 59);
   const startBtn = document.createElement("button");
   startBtn.type = "button";
   startBtn.textContent = "Start";

   inputsRow.append(h.wrap, m.wrap, s.wrap, startBtn);
   container.append(display, controls, inputsRow);

   let timer = null;
   let currentSeconds = 0;

   function updatePreset() {
      const totalSeconds =
          (parseInt(h.input.value) || 0) * 3600 +
          (parseInt(m.input.value) || 0) * 60 +
          (parseInt(s.input.value) || 0);
      display.textContent = new Date(totalSeconds * 1000).toISOString().slice(11, 19);
      return totalSeconds;
   }

   function startTimer(seconds) {
      seconds += 1;
      const start = Date.now();
      timer = setInterval(() => {
         const delta = Date.now() - start;
         currentSeconds = seconds - delta / 1000;
         if (currentSeconds <= 0) {
            clearInterval(timer);
         } else {
            display.textContent = new Date(Math.floor(currentSeconds) * 1000)
                .toISOString()
                .slice(11, 19);
         }
      }, 1000);
   }

   startBtn.addEventListener("click", () => {
      const total = updatePreset();
      clearInterval(timer);
      startTimer(total);
      pauseBtn.textContent = "Pause";
   });

   stopBtn.addEventListener("click", () => {
      clearInterval(timer);
      updatePreset();
      pauseBtn.textContent = "Pause";
   });

   pauseBtn.addEventListener("click", () => {
      if (pauseBtn.textContent === "Pause") {
         clearInterval(timer);
         pauseBtn.textContent = "Resume";
      } else {
         clearInterval(timer);
         startTimer(currentSeconds);
         pauseBtn.textContent = "Pause";
      }
   });

   return () => {
      clearInterval(timer);
   };
}