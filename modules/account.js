// modules/account.js

import { supabase } from "../supabaseClient.js";
import { openAuthModal } from "../authModal.js";

export function mount(container) {
    container.classList.add("account-module");

    const status = document.createElement("p");
    status.className = "accountStatus";

    const actionBtn = document.createElement("button");
    actionBtn.type = "button";

    container.append(status, actionBtn);

    function renderSignedOut() {
        status.textContent = "Not signed in -- your data is only saved on this device.";
        actionBtn.textContent = "Log In / Sign Up";
        actionBtn.onclick = () => openAuthModal();
    }

    function renderSignedIn(user) {
        status.textContent = "Signed in as " + user.email;
        actionBtn.textContent = "Log Out";
        actionBtn.onclick = () => supabase.auth.signOut();
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