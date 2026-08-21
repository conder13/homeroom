// modules/account.js

import { supabase } from "../supabaseClient.js";
import { openAuthModal } from "../authModal.js";

export function mount(container) {
    container.classList.add("account-module");

    const status = document.createElement("p");
    status.className = "accountStatus";

    const actionBtn = document.createElement("button");
    actionBtn.type = "button";

    const nameRow = document.createElement("div");
    nameRow.className = "accountNameRow";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Your name";
    nameInput.className = "accountNameInput";

    const nameSaveBtn = document.createElement("button");
    nameSaveBtn.type = "button";
    nameSaveBtn.className = "accountNameSave";
    nameSaveBtn.textContent = "Save";

    const nameMsg = document.createElement("span");
    nameMsg.className = "accountNameMsg";

    nameRow.append(nameInput, nameSaveBtn, nameMsg);

    function saveName() {
        const value = nameInput.value.trim();
        if (!value) {
            nameMsg.textContent = "Name can't be empty.";
            return;
        }
        localStorage.setItem("username", value);
        status.textContent = "Signed in as " + value;
        nameMsg.textContent = "Saved.";
        setTimeout(() => { nameMsg.textContent = ""; }, 1500);
    }

    nameSaveBtn.addEventListener("click", saveName);
    nameInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            saveName();
        }
    });

    container.append(status, actionBtn, nameRow);

    function renderSignedOut() {
        status.textContent = "Not signed in -- your data is only saved on this device.";
        actionBtn.textContent = "Log In / Sign Up";
        actionBtn.onclick = () => openAuthModal();
        nameRow.style.display = "none";
    }

    function renderSignedIn(user) {
        status.textContent = "Signed in as " + localStorage.getItem("username");
        actionBtn.textContent = "Log Out";
        actionBtn.onclick = () => supabase.auth.signOut();
        nameRow.style.display = "";
        nameInput.value = localStorage.getItem("username") ?? "";
    }

    supabase.auth
        .getSession()
        .then((result) => {
            if (result.data && result.data.session && result.data.session.user) {
                renderSignedIn(result.data.session.user);
            } else {
                renderSignedOut();
            }
        })
        .catch((err) => {
            console.error("Couldn't check login status:", err.message);
            renderSignedOut();
        });

    const authListener = supabase.auth.onAuthStateChange((_event, session) => {
        if (session && session.user) {
            renderSignedIn(session.user);
        } else {
            renderSignedOut();
        }
    });
    const subscription = authListener.data.subscription;

    return function destroy() {
        subscription.unsubscribe();
    };
}