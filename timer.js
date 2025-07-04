const timerText = document.getElementById("timeRemaining");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const startTime = document.getElementById("startTimer");
const stopTime = document.getElementById("stopTimer");
const pauseTime = document.getElementById("pauseTimer");
var timer;
var totalSeconds = 1800;
var currentSeconds = 0;

function startTimer(seconds) {
   seconds += 1;
   var start = Date.now();
   timer = setInterval(function () {
      var delta = Date.now() - start;
      console.log(delta);
      currentSeconds = seconds - (delta / 1000);
      if (currentSeconds <= 0) {
         clearInterval(timer);
         console.log("done");
      } else {
         console.log(Math.floor(currentSeconds));
         timerText.textContent = new Date(Math.floor(currentSeconds) * 1000).toISOString().slice(11, 19);

      }
   }, 1000);
}

function updatePreset() {
   var totalSeconds = (parseInt(hours.value) * 3600 + parseInt(minutes.value) * 60 + parseInt(seconds.value));
   timerText.textContent = new Date(totalSeconds * 1000).toISOString().slice(11, 19);
}

startTime.addEventListener('click', function () {
   totalSeconds = (parseInt(hours.value) * 3600 + parseInt(minutes.value) * 60 + parseInt(seconds.value));
   console.log(totalSeconds);
   updatePreset();
   startTimer(totalSeconds);

});

stopTime.addEventListener('click', function () {
   clearInterval(timer);
   updatePreset();
});

pauseTime.addEventListener('click', function () {
   if (pauseTime.textContent == "Pause") {
      clearInterval(timer);
      pauseTime.textContent = "Resume";
   } else {
      startTimer(currentSeconds);
      pauseTime.textContent = "Pause";
   }
});