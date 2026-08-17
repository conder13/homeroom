// dashboard.js
//
// Owns the dashboard grid: reads the saved module layout, mounts each
// module into its own card, wires up drag-reordering, and handles
// adding/removing modules. This replaces the old pattern of index.html
// hard-coding each module's markup and loading five separate scripts.

import "./cloudSync.js"; // side-effect only: enables localStorage -> Supabase sync
import Sortable from "sortablejs";
import { MODULE_REGISTRY, DEFAULT_LAYOUT } from "./modules/registry.js";

const LAYOUT_KEY = "moduleLayout";

const grid = document.getElementById("module-grid");
const addBtn = document.getElementById("addModuleBtn");
const addPanel = document.getElementById("addModulePanel");

const mountedDestroyers = new Map(); // module id -> destroy()

function loadLayout() {
    const saved = localStorage.getItem(LAYOUT_KEY);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) return parsed;
        } catch {
            /* fall through to default */
        }
    }
    return [...DEFAULT_LAYOUT];
}

function saveLayout() {
    localStorage.setItem(LAYOUT_KEY, JSON.stringify(layout));
}

// Drop any saved ids that no longer correspond to a real module (e.g.
// after renaming/removing one during development).
let layout = loadLayout().filter((id) => MODULE_REGISTRY[id]);

function createModuleCard(id) {
    const def = MODULE_REGISTRY[id];
    if (!def) return null;

    const card = document.createElement("div");
    card.className = "module";
    card.dataset.moduleId = id;

    const header = document.createElement("div");
    header.className = "module-header";

    const handle = document.createElement("span");
    handle.className = "drag-handle";
    handle.textContent = "\u283F"; // ⠿
    handle.title = "Drag to reorder";

    const title = document.createElement("h1");
    title.className = "module-title";
    title.textContent = def.title;

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "module-remove";
    removeBtn.textContent = "\u2715"; // ✕
    removeBtn.title = "Remove module";
    removeBtn.addEventListener("click", () => removeModule(id));

    header.append(handle, title, removeBtn);

    const body = document.createElement("div");
    body.className = "module-body";

    card.append(header, body);

    const destroy = def.mount(body);
    mountedDestroyers.set(id, typeof destroy === "function" ? destroy : () => {});

    return card;
}

function render() {
    mountedDestroyers.forEach((destroy) => destroy());
    mountedDestroyers.clear();
    grid.innerHTML = "";

    layout.forEach((id) => {
        const card = createModuleCard(id);
        if (card) grid.appendChild(card);
    });

    renderAddPanel();
}

function removeModule(id) {
    const destroy = mountedDestroyers.get(id);
    if (destroy) destroy();
    mountedDestroyers.delete(id);
    layout = layout.filter((m) => m !== id);
    saveLayout();
    render();
}

function addModule(id) {
    if (layout.includes(id)) return;
    layout.push(id);
    saveLayout();
    render();
}

function renderAddPanel() {
    addPanel.innerHTML = "";
    addPanel.classList.remove("open");

    const available = Object.keys(MODULE_REGISTRY).filter((id) => !layout.includes(id));

    if (available.length === 0) {
        addBtn.style.display = "none";
        return;
    }
    addBtn.style.display = "";

    available.forEach((id) => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "addModuleOption";
        item.textContent = MODULE_REGISTRY[id].title;
        item.addEventListener("click", () => {
            addModule(id);
        });
        addPanel.appendChild(item);
    });
}

addBtn.addEventListener("click", () => {
    addPanel.classList.toggle("open");
});

document.addEventListener("click", (e) => {
    if (!addPanel.contains(e.target) && e.target !== addBtn) {
        addPanel.classList.remove("open");
    }
});

render();

new Sortable(grid, {
    animation: 150,
    handle: ".drag-handle",
    ghostClass: "module-drag-ghost",
    onEnd: () => {
        layout = Array.from(grid.children).map((el) => el.dataset.moduleId);
        saveLayout();
    },
});