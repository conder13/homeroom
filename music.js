import { randomInt } from "crypto";
import lofi1 from "url:./audio/lofi1.mp3";
import lofi2 from "url:./audio/lofi2.mp3";
import lofi3 from "url:./audio/lofi3.mp3";
import lofi4 from "url:./audio/lofi4.mp3";
import lofi5 from "url:./audio/lofi5.mp3";
import lofi6 from "url:./audio/lofi6.mp3";


const tracks = [
   { file: lofi1, name: "red" },
   { file: lofi2, name: "orange" },
   { file: lofi3, name: "yellow" },
   { file: lofi4, name: "green" },
   { file: lofi5, name: "lightblue" },
   { file: lofi6, name: "purple" }
];

//shuffle algorithm
for (let i = tracks.length - 1; i > 0; i--) {
   const j = Math.floor(Math.random() * (i + 1));
   [tracks[i], tracks[j]] = [tracks[j], tracks[i]];
}

let currentTrack = 0;
let audio = new Audio(tracks[currentTrack].file);
let isPlaying = false;

// Elements
const play = document.getElementById("playMusic");
const next = document.getElementById("nextTrack");
const cover = document.getElementById("cover");
const songName = document.getElementById("songName");

cover.style.backgroundColor = tracks[currentTrack].name;
songName.textContent = tracks[currentTrack].name;
songName.style.color = tracks[currentTrack].name;

play.addEventListener("click", () => {
   if (isPlaying) {
      audio.pause();
      play.textContent = "▶️";
   } else {
      audio.play();
      play.textContent = "⏸️";

   }
   isPlaying = !isPlaying;
});


next.addEventListener("click", () => {
   audio.pause();
   currentTrack = (currentTrack + 1) % tracks.length;
   audio = new Audio(tracks[currentTrack].file);
   if (isPlaying) {
      audio.play();
      cover.style.backgroundColor = tracks[currentTrack].name;
      songName.textContent = tracks[currentTrack].name;
      songName.style.color = tracks[currentTrack].name;

   }
});


audio.addEventListener("ended", () => {
   currentTrack = (currentTrack + 1) % tracks.length;
   audio = new Audio(tracks[currentTrack].file);
   audio.play();
   cover.style.backgroundColor = tracks[currentTrack].name;
   songName.textContent = tracks[currentTrack].name;
   songName.style.color = tracks[currentTrack].name;

});
