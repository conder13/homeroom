// cloudSync.js
//
// Import this once, early, on every page (index.html's dashboard.js and
// schedule.html's schedule.js both do). It has no exports -- it works
// entirely by side effect:
//
//   1. Wraps localStorage.setItem so that writes to the app's known data
//      keys also get pushed to Supabase (debounced), IF someone's signed
//      in. Every module that already does localStorage.setItem("todoArray", ...)
//      etc. keeps working exactly as before -- this doesn't change their
//      code at all, it just also mirrors the write to the cloud.
//   2. Listens for sign-in and pulls that user's saved data down,
//      overwriting local state, then reloads the page so every module
//      mounts fresh with the synced data.
//
// This intentionally does NOT pull-and-reload on every normal page load
// (only right after an explicit sign-in). That keeps this "basic": your
// data syncs whenever you're logged in and something changes, and
// whenever you log in somewhere new. If you want perfect freshness the
// instant you open the app on a second device without re-logging-in,
// that's a reasonable future upgrade, but it adds real complexity
// (every module would need a "refresh from storage" hook instead of
// only reading localStorage once at mount) -- skip it until it's
// actually annoying you.

import { supabase } from "./supabaseClient.js";

const SYNCED_KEYS = ["username", "classes", "classSchedule", "todoArray", "customFlashcards", "moduleLayout", "blockTimes"];

const COLUMN_MAP = {
    username: "username",
    classes: "classes",
    classSchedule: "class_schedule",
    todoArray: "todo_array",
    customFlashcards: "custom_flashcards",
    moduleLayout: "module_layout",
    blockTimes: "block_times",
};

let currentUserId = null;
let pushTimer = null;
let suppressSync = false; // true while we're writing pulled-down cloud data back into localStorage

const originalSetItem = localStorage.setItem.bind(localStorage);
localStorage.setItem = function (key, value) {
    originalSetItem(key, value);
    if (!suppressSync && currentUserId && SYNCED_KEYS.includes(key)) {
        schedulePush();
    }
};

function schedulePush() {
    clearTimeout(pushTimer);
    pushTimer = setTimeout(pushToCloud, 800);
}

async function pushToCloud() {
    if (!currentUserId) return;

    const row = { user_id: currentUserId, updated_at: new Date().toISOString() };
    for (const key of SYNCED_KEYS) {
        const raw = localStorage.getItem(key);
        if (key === "username") {
            // Stored as a plain string (not JSON) by authModal.js / account.js.
            row[COLUMN_MAP[key]] = raw ?? null;
        } else {
            row[COLUMN_MAP[key]] = raw ? JSON.parse(raw) : null;
        }
    }

    const { error } = await supabase.from("user_data").upsert(row);
    if (error) console.error("Cloud sync failed:", error.message);
}

async function pullFromCloud(userId) {
    const { data, error } = await supabase
        .from("user_data")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

    if (error) {
        console.error("Couldn't load your saved data:", error.message);
        return;
    }

    if (!data) {
        // First time this account has ever synced -- seed the cloud with
        // whatever's already on this device instead of wiping it.
        await pushToCloud();
        return;
    }

    suppressSync = true;
    for (const key of SYNCED_KEYS) {
        const value = data[COLUMN_MAP[key]];
        if (value !== null && value !== undefined) {
            if (key === "username") {
                originalSetItem(key, value);
            } else {
                originalSetItem(key, JSON.stringify(value));
            }
        }
    }
    suppressSync = false;
}

supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_IN" && session?.user) {
        currentUserId = session.user.id;

        const reloadKey = `cloudSyncReloaded_${currentUserId}`;
        const alreadyReloaded = sessionStorage.getItem(reloadKey);

        if (alreadyReloaded) {
            return;
        }

        sessionStorage.setItem(reloadKey, "true");

        await pullFromCloud(currentUserId);
        window.location.reload();
    }

    else if (event === "SIGNED_OUT") {
        currentUserId = null;

        // Remove reload flags so the next login gets a fresh sync
        for (const key of Object.keys(sessionStorage)) {
            if (key.startsWith("cloudSyncReloaded_")) {
                sessionStorage.removeItem(key);
            }
        }
    }
});
// Pick up an already-active session on page load (e.g. a normal visit
// after having logged in previously) so pushes keep working without
// needing to log in again every time -- but don't pull+reload here,
// per the note above.
supabase.auth.getSession().then(({ data }) => {
    if (data?.session?.user) {
        currentUserId = data.session.user.id;
    }
}).catch((err) => {
    console.error("Couldn't check login status:", err.message);
});