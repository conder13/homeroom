const day1 = { "class 1": "00:00", "class 2": "00:00", "class 3": "00:00", "class 4": "00:00", "class 5": "00:00", "class 6": "00:00", "class 7": "00:00" };
const day2 = { "class 1": "00:00", "class 2": "00:00", "class 3": "00:00", "class 4": "00:00", "class 5": "00:00", "class 6": "00:00", "class 7": "00:00" };
const day3 = { "class 1": "00:00", "class 2": "00:00", "class 3": "00:00", "class 4": "00:00", "class 5": "00:00", "class 6": "00:00", "class 7": "00:00" };
const day4 = { "class 1": "00:00", "class 2": "00:00", "class 3": "00:00", "class 4": "00:00", "class 5": "00:00", "class 6": "00:00", "class 7": "00:00" };
const day5 = { "class 1": "00:00", "class 2": "00:00", "class 3": "00:00", "class 4": "00:00", "class 5": "00:00", "class 6": "00:00", "class 7": "00:00" };
const day6 = { "class 1": "00:00", "class 2": "00:00", "class 3": "00:00", "class 4": "00:00", "class 5": "00:00", "class 6": "00:00", "class 7": "00:00" };
const schedule = [day1, day2, day3, day4, day5, day6];
var today = { "class 1": "00:00", "class 2": "00:00", "class 3": "00:00", "class 4": "00:00", "class 5": "00:00", "class 6": "00:00", "class 7": "00:00" };

const day = 3;
const dayText = document.getElementById("day");
const block1 = document.getElementById("block1");
const block2 = document.getElementById("block2");
const block3 = document.getElementById("block3");
const block4 = document.getElementById("block4");
const block5 = document.getElementById("block5");
const block6 = document.getElementById("block6");
const block7 = document.getElementById("block7");

function setDay() {
   dayText.textContent = "Day " + day.toString() + " Schedule";
   block1.textContent = Object.keys(schedule[day - 1])[0] + " - " + Object.values(schedule[day - 1])[0];
   block2.textContent = Object.keys(schedule[day - 1])[1] + " - " + Object.values(schedule[day - 1])[1];
   block3.textContent = Object.keys(schedule[day - 1])[2] + " - " + Object.values(schedule[day - 1])[2];
   block4.textContent = Object.keys(schedule[day - 1])[3] + " - " + Object.values(schedule[day - 1])[3];
   block5.textContent = Object.keys(schedule[day - 1])[4] + " - " + Object.values(schedule[day - 1])[4];
   block6.textContent = Object.keys(schedule[day - 1])[5] + " - " + Object.values(schedule[day - 1])[5];
   block7.textContent = Object.keys(schedule[day - 1])[6] + " - " + Object.values(schedule[day - 1])[6];

}
setDay();