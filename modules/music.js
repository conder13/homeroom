// modules/music.js
//
// NOTE: this file lives in modules/, one level deeper than the old
// music.js did -- the audio import paths below go up one directory
// (../audio/...) to reach the same audio folder as before. If your
// audio files aren't at that path, adjust these six imports.

import lofi1 from "url:../audio/lofi1.mp3";
import lofi2 from "url:../audio/lofi2.mp3";
import lofi3 from "url:../audio/lofi3.mp3";
import lofi4 from "url:../audio/lofi4.mp3";
import lofi5 from "url:../audio/lofi5.mp3";
import lofi6 from "url:../audio/lofi6.mp3";

const TRACKS_SOURCE = [
   { file: lofi1, name: "red" },
   { file: lofi2, name: "orange" },
   { file: lofi3, name: "yellow" },
   { file: lofi4, name: "green" },
   { file: lofi5, name: "lightblue" },
   { file: lofi6, name: "purple" },
];

export function mount(container) {
   container.classList.add("music-module");

   // Shuffle a fresh copy each time the module is mounted.
   const tracks = [...TRACKS_SOURCE];
   for (let i = tracks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tracks[i], tracks[j]] = [tracks[j], tracks[i]];
   }

   let currentTrack = 0;
   let audio = new Audio(tracks[currentTrack].file);
   let isPlaying = false;

   const cover = document.createElement("div");
   cover.className = "cover";
   const songName = document.createElement("h2");
   songName.className = "songName";
   const controls = document.createElement("div");
   const playBtn = document.createElement("button");
   playBtn.type = "button";
   playBtn.textContent = "▶";
   const nextBtn = document.createElement("button");
   nextBtn.type = "button";
   nextBtn.textContent = "⏭";
   controls.append(playBtn, nextBtn);

   container.append(cover, songName, controls);

   function updateDisplay() {
      cover.style.backgroundColor = tracks[currentTrack].name;
      songName.textContent = tracks[currentTrack].name;
      songName.style.color = tracks[currentTrack].name;
   }
   updateDisplay();

   function onEnded() {
      goToNext(true);
   }
   audio.addEventListener("ended", onEnded);

   function goToNext(autoplay) {
      audio.pause();
      audio.removeEventListener("ended", onEnded);
      currentTrack = (currentTrack + 1) % tracks.length;
      audio = new Audio(tracks[currentTrack].file);
      audio.addEventListener("ended", onEnded);
      if (autoplay) audio.play();
      updateDisplay();
   }

   playBtn.addEventListener("click", () => {
      if (isPlaying) {
         audio.pause();
         playBtn.textContent = "▶";
      } else {
         audio.play();
         playBtn.textContent = "⏸";
      }
      isPlaying = !isPlaying;
   });

   nextBtn.addEventListener("click", () => goToNext(isPlaying));

   return () => {
      audio.pause();
      audio.removeEventListener("ended", onEnded);
   };
}