// modules/flashcards.js
//
// Generalizes the old single-purpose Spanish verb quiz into a
// deck-based flashcard system. "Spanish Verbs" is now one deck among
// others; "Custom Deck" lets a student build their own front/back
// cards for any subject, stored in localStorage.
//
// To add another built-in deck later (French verbs, vocab, whatever):
// add one entry to DECKS with a next() function that returns
// { prompt, answer }. Nothing else in this file needs to change.

import { getConjugation } from "spanish-verbs";

const SPANISH_TENSES = ["INDICATIVE_PRESENT", "INDICATIVE_PRETERITE"];
const SPANISH_VERBS = [
    "hablar", "comer", "vivir", "ser", "estar", "tener", "hacer", "ir",
    "decir", "poder", "ver", "dar", "saber", "querer", "llegar", "pasar",
    "deber", "poner", "parecer", "quedar", "creer", "llevar", "dejar",
    "seguir", "encontrar", "llamar", "pensar", "salir", "volver", "tomar",
];
const SPANISH_PRONOUNS = ["yo", "tú", "él/ella/usted", "nosotros", "vosotros", "ellos/ellas/ustedes"];

function loadCustomDeck() {
    try {
        return JSON.parse(localStorage.getItem("customFlashcards")) || [];
    } catch {
        return [];
    }
}

function saveCustomDeck(deck) {
    localStorage.setItem("customFlashcards", JSON.stringify(deck));
}

export function mount(container) {
    container.classList.add("flashcards-module");

    let customDeck = loadCustomDeck();

    // Each deck: a label for the <select>, a next() that returns
    // {prompt, answer} (or null if there's nothing to show), and whether
    // the "Manage Cards" panel should be offered for it.
    const DECKS = {
        spanish: {
            label: "Spanish Verbs",
            manageable: false,
            next() {
                const verb = SPANISH_VERBS[Math.floor(Math.random() * SPANISH_VERBS.length)];
                const tense = SPANISH_TENSES[Math.floor(Math.random() * SPANISH_TENSES.length)];
                const number = Math.floor(Math.random() * SPANISH_PRONOUNS.length);
                return {
                    prompt: `${verb} - ${tense.toLowerCase()} - ${SPANISH_PRONOUNS[number]}`,
                    answer: getConjugation(verb, tense, number),
                };
            },
        },
        custom: {
            label: "Custom Deck",
            manageable: true,
            next() {
                if (customDeck.length === 0) return null;
                const card = customDeck[Math.floor(Math.random() * customDeck.length)];
                return { prompt: card.front, answer: card.back };
            },
        },
    };

    const deckSelect = document.createElement("select");
    deckSelect.className = "deckSelect";
    Object.entries(DECKS).forEach(([value, deck]) => {
        const opt = document.createElement("option");
        opt.value = value;
        opt.textContent = deck.label;
        deckSelect.appendChild(opt);
    });

    const prompt = document.createElement("h2");
    prompt.className = "flashcardPrompt";

    const form = document.createElement("form");
    form.className = "flashcardForm";
    const answerInput = document.createElement("input");
    answerInput.type = "text";
    answerInput.maxLength = 40;
    const checkBtn = document.createElement("button");
    checkBtn.type = "submit";
    checkBtn.textContent = "Check";
    form.append(answerInput, checkBtn);

    const feedback = document.createElement("h2");
    feedback.className = "flashcardFeedback";
    const score = document.createElement("h2");
    score.className = "flashcardScore";
    score.textContent = "0/0";

    const manageToggle = document.createElement("button");
    manageToggle.type = "button";
    manageToggle.className = "manageToggle";
    manageToggle.textContent = "Manage Cards";

    const managePanel = document.createElement("div");
    managePanel.className = "managePanel";

    container.append(deckSelect, prompt, form, feedback, score, manageToggle, managePanel);

    let deckMode = "spanish";
    let current = null;
    let correct = 0;
    let total = 0;

    function nextCard() {
        current = DECKS[deckMode].next();
        feedback.textContent = "";
        answerInput.value = "";

        if (!current) {
            prompt.textContent = "No custom cards yet -- add some below.";
            form.style.display = "none";
            return;
        }
        form.style.display = "";
        prompt.textContent = current.prompt;
        answerInput.focus();
    }

    function onSubmit(e) {
        e.preventDefault();
        if (!current) return;
        total++;
        const guess = answerInput.value.trim().toLowerCase();
        if (guess === current.answer.trim().toLowerCase()) {
            correct++;
            feedback.textContent = "Correct!";
        } else {
            feedback.textContent = `Wrong! ${current.answer}`;
        }
        score.textContent = `${correct}/${total}`;
        nextCard();
    }
    form.addEventListener("submit", onSubmit);

    function onDeckChange() {
        deckMode = deckSelect.value;
        correct = 0;
        total = 0;
        score.textContent = "0/0";
        renderManagePanel();
        nextCard();
    }
    deckSelect.addEventListener("change", onDeckChange);

    function onManageToggle() {
        managePanel.classList.toggle("open");
    }
    manageToggle.addEventListener("click", onManageToggle);

    function renderManagePanel() {
        managePanel.innerHTML = "";
        managePanel.classList.remove("open");

        if (!DECKS[deckMode].manageable) {
            manageToggle.style.display = "none";
            return;
        }
        manageToggle.style.display = "";

        const list = document.createElement("ul");
        list.className = "customCardList";
        customDeck.forEach((card, i) => {
            const li = document.createElement("li");
            const text = document.createElement("span");
            text.textContent = `${card.front} \u2192 ${card.back}`;
            const del = document.createElement("button");
            del.type = "button";
            del.className = "removeBtn";
            del.textContent = "\u2715";
            del.addEventListener("click", () => {
                customDeck.splice(i, 1);
                saveCustomDeck(customDeck);
                renderManagePanel();
                if (!current) nextCard();
            });
            li.append(text, del);
            list.appendChild(li);
        });

        const addForm = document.createElement("form");
        addForm.className = "addCardForm";
        const frontInput = document.createElement("input");
        frontInput.placeholder = "Front (question)";
        frontInput.maxLength = 40;
        const backInput = document.createElement("input");
        backInput.placeholder = "Back (answer)";
        backInput.maxLength = 40;
        const addBtn = document.createElement("button");
        addBtn.type = "submit";
        addBtn.textContent = "Add Card";
        addForm.append(frontInput, backInput, addBtn);

        addForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const front = frontInput.value.trim();
            const back = backInput.value.trim();
            if (!front || !back) return;
            customDeck.push({ front, back });
            saveCustomDeck(customDeck);
            frontInput.value = "";
            backInput.value = "";
            renderManagePanel();
            if (!current) nextCard();
        });

        managePanel.append(list, addForm);
    }

    renderManagePanel();
    nextCard();

    return () => {
        form.removeEventListener("submit", onSubmit);
        deckSelect.removeEventListener("change", onDeckChange);
        manageToggle.removeEventListener("click", onManageToggle);
    };
}