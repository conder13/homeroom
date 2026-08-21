// authModal.js
//
// A full-screen login/signup overlay, rendered on top of everything
// (appended to document.body, not to any module's container) so it
// reads as its own screen rather than a form squeezed into a dashboard
// card. modules/account.js just calls openAuthModal() -- this file owns
// the actual form.

import { supabase } from "./supabaseClient.js";

let modalEl = null;

export function openAuthModal() {
    if (modalEl) return; // already open

    let mode = "login";

    const overlay = document.createElement("div");
    overlay.className = "authModalOverlay";

    const card = document.createElement("div");
    card.className = "authModalCard";

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "authModalClose";
    closeBtn.textContent = "\u2715";
    closeBtn.addEventListener("click", closeAuthModal);

    const title = document.createElement("h2");

    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.placeholder = "Email";
    emailInput.autocomplete = "email";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Name";
    nameInput.autocomplete = "username";

    const passInput = document.createElement("input");
    passInput.type = "password";
    passInput.placeholder = "Password (6+ characters)";
    passInput.autocomplete = "current-password";
    passInput.minLength = 6;

    const primaryBtn = document.createElement("button");
    primaryBtn.type = "button";
    primaryBtn.className = "authModalPrimary";

    const switchModeBtn = document.createElement("button");
    switchModeBtn.type = "button";
    switchModeBtn.className = "authModalSwitch";

    const message = document.createElement("p");
    message.className = "authModalMessage";

    function applyMode() {
        if (mode === "login") {
            title.textContent = "Log In";
            primaryBtn.textContent = "Log In";
            switchModeBtn.textContent = "Need an account? Sign up";
            nameInput.style.display = "none";       // add
        } else {
            title.textContent = "Sign Up";
            primaryBtn.textContent = "Sign Up";
            switchModeBtn.textContent = "Already have an account? Log in";
            nameInput.style.display = "";            // add
        }
        message.textContent = "";
    }
    applyMode();

    switchModeBtn.addEventListener("click", () => {
        mode = mode === "login" ? "signup" : "login";
        applyMode();
    });

    primaryBtn.addEventListener("click", async () => {
        primaryBtn.disabled = true;
        message.textContent = "";

        const email = emailInput.value.trim();
        const password = passInput.value;

        if (mode === "signup") {
            const name = nameInput.value.trim();
            if (name) localStorage.setItem("username", name);
        }
        
        const { error } =
            mode === "login"
                ? await supabase.auth.signInWithPassword({ email, password })
                : await supabase.auth.signUp({ email, password });

        primaryBtn.disabled = false;

        if (error) {
            message.textContent = error.message;
        } else if (mode === "signup") {
            message.textContent = "Account created -- log in to sync your data.";
            mode = "login";
            applyMode();
        }
        // A successful LOG IN is handled by cloudSync.js's SIGNED_IN listener,
        // which pulls the account's data and reloads the page -- that reload
        // takes this modal down along with everything else, so there's
        // nothing more to do here on success.
    });

    const form = document.createElement("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        primaryBtn.click();
    });
    form.append(emailInput, nameInput, passInput, primaryBtn);

    card.append(closeBtn, title, form, switchModeBtn, message);
    overlay.appendChild(card);

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeAuthModal();
    });
    document.addEventListener("keydown", onEscape);

    document.body.appendChild(overlay);
    modalEl = overlay;
    emailInput.focus();
}

function onEscape(e) {
    if (e.key === "Escape") closeAuthModal();
}

export function closeAuthModal() {
    if (modalEl) {
        modalEl.remove();
        modalEl = null;
        document.removeEventListener("keydown", onEscape);
    }
}