import { getConjugation } from 'spanish-verbs';


const verbText = document.getElementById("verb");
const conjugationForm = document.getElementById("answer");

const userGuess = document.getElementById("conjugation");
const feedback = document.getElementById("feedback");
const correctText = document.getElementById("correct");
const tenses = ["INDICATIVE_PRESENT", "INDICATIVE_PRETERITE"];
const verbs = ["hablar", "comer", "vivir", "ser", "estar", "tener", "hacer", "ir", "decir", "poder", "ver", "dar", "saber", "querer", "llegar", "pasar", "deber", "poner", "parecer", "quedar", "creer", "llevar", "dejar", "seguir", "encontrar", "llamar", "pensar", "salir", "volver", "tomar"];
var verb = "Verb";
var tense = "Tense";
var total = 0;
var correct = 0;

function newVerb() {
   verb = verbs[Math.floor(Math.random() * verbs.length)];
   tense = tenses[Math.floor(Math.random() * tenses.length)];
   verbText.textContent = verb + " - " + tense.toLocaleLowerCase();
}

function checkAnswer(answer) {
   total++;
   console.log(answer);
   var correctAnswer = getConjugation(verb, tense, 2);
   if (answer == correctAnswer) {
      correct++;
      feedback.textContent = "Correct!";
   } else {
      feedback.textContent = "Wrong!" + " " + correctAnswer;
   }
   correctText.textContent = correct + "/" + total;
}

newVerb();

conjugationForm.addEventListener('submit', e => {
   e.preventDefault();
   checkAnswer(userGuess.value);
   userGuess.value = "";
   newVerb();
});
