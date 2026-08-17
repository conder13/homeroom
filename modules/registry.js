// modules/registry.js
//
// The single place that knows about every module type that exists.
// A module is: an id (used as the storage key for layout + as a CSS
// hook), a display title, and a mount(container) function.
//
// mount(container) must:
//   - build its own DOM inside `container`
//   - wire up its own event listeners
//   - return a destroy() function that undoes anything with a lifetime
//     longer than the DOM nodes themselves (setInterval timers, audio
//     playback, window-level event listeners, etc.)
//
// To add a new module type: write modules/yourModule.js exporting
// `mount`, then add one line below. Nothing else in the app needs to
// change -- dashboard.js, the layout picker, and drag-reordering all
// work off this list automatically.

import { mount as mountSchedule } from "./today.js";
import { mount as mountFlashcards } from "./flashcards.js";
import { mount as mountTodo } from "./todo.js";
import { mount as mountTimer } from "./timer.js";
import { mount as mountMusic } from "./music.js";
import { mount as mountAccount } from "./account.js";

export const MODULE_REGISTRY = {
    account: { title: "Account", mount: mountAccount },
    schedule: { title: "Today's Schedule", mount: mountSchedule },
    flashcards: { title: "Flashcards", mount: mountFlashcards },
    todo: { title: "Homework", mount: mountTodo },
    timer: { title: "Study Timer", mount: mountTimer },
    music: { title: "Lofi Player", mount: mountMusic },
};

// What a first-time visitor sees, in order.
export const DEFAULT_LAYOUT = ["account", "schedule", "flashcards", "todo", "timer", "music"];