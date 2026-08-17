// modules/todo.js

const MAX_ITEMS = 10;

function loadTodos() {
   try {
      return JSON.parse(localStorage.getItem("todoArray")) || [];
   } catch {
      return [];
   }
}

function saveTodos(todos) {
   localStorage.setItem("todoArray", JSON.stringify(todos));
}

export function mount(container) {
   container.classList.add("todo-module");

   const form = document.createElement("form");
   form.className = "todoForm";

   const input = document.createElement("input");
   input.type = "text";
   input.maxLength = 25;
   input.placeholder = "Add homework...";

   const addBtn = document.createElement("button");
   addBtn.type = "submit";
   addBtn.textContent = "Add";

   form.append(input, addBtn);

   const list = document.createElement("ol");
   list.className = "todoList";

   container.append(form, list);

   let todos = loadTodos();

   function renderItem(text) {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "todoItem";
      btn.textContent = text;
      btn.addEventListener("click", () => {
         const idx = todos.indexOf(text);
         if (idx !== -1) todos.splice(idx, 1);
         li.remove();
         saveTodos(todos);
      });
      li.appendChild(btn);
      list.appendChild(li);
   }

   todos.forEach(renderItem);

   function onSubmit(e) {
      e.preventDefault();
      const text = input.value.trim();
      if (!text || list.children.length >= MAX_ITEMS) return;
      todos.push(text);
      renderItem(text);
      saveTodos(todos);
      input.value = "";
   }

   form.addEventListener("submit", onSubmit);

   return () => {
      form.removeEventListener("submit", onSubmit);
   };
}