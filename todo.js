import { todo } from "node:test";
import { json } from "stream/consumers";

var itemCollection = document.getElementsByClassName("todoItem");
var items;

const addForm = document.getElementById("todo");
const addInput = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");

var totalItems = 0;
const maxItems = 10;
var todoArray = [];
console.log(localStorage.getItem("todoArray"));
if (localStorage.getItem("todoArray") && localStorage.getItem("todoArray") != JSON.stringify(todoArray)) {
   todoArray = JSON.parse(localStorage.getItem("todoArray"));
   for (var i = 0; i < todoArray.length; i++) {
      addItem(todoArray[i]);
   }
}

function updateList() {
   console.log("updated list");
   totalItems = 0;
   itemCollection = document.getElementsByClassName("todoItem");
   items = Array.from(itemCollection);
   console.log("there are " + items.length + " items");
   for (var i = 0; i < items.length; i++) {
      console.log(i - 1);
      items[i].onclick = function () {
         this.parentElement.remove();
         updateList();
      }
      totalItems++;
   }
   console.log(JSON.stringify(todoArray));
   localStorage.setItem("todoArray", JSON.stringify(todoArray));

}
function addItem(item) {

   if (totalItems >= maxItems) {
      return;
   }
   const li = document.createElement('li');
   const button = document.createElement('button');
   button.textContent = item;
   button.classList.add("todoItem");
   li.appendChild(button);
   todoList.appendChild(li);
   updateList();
}


addForm.addEventListener('submit', e => {
   e.preventDefault();
   todoArray.push(addInput.value);

   addItem(addInput.value);
   addInput.value = "";

});
