let todoArray = [];
const text = document.getElementById("text");
const addTaskButton = document.getElementById("add-task-btn");
const saveTaskButton = document.getElementById("save-todo-btn");
const listBox = document.getElementById("listBox");
const saveInd = document.getElementById("saveIndex");
const itemInput = document.getElementById("itemInput");
const itemList = document.getElementById("itemList");

function AddItem() {
  3;
  const newItemText = itemInput.value.trim();
  if (newItemText === "") {
    const li = document.createElement("li");
    li.textContent = newItemText;
    itemList.appendChild(li);
    itemInput.value = "";
  }
}

itemInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    AddItem();
  }
});

addTaskButton.addEventListener("click", () => {
  if (itemInput.value === "") {
    alert("Input is empty");
    return;
  }
  todoArray.push(itemInput.value);
  itemInput.value = "";
  localStorage.setItem("todo", JSON.stringify(todoArray));

  let todo = localStorage.getItem("todo");
  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }
  displayTodo();
});

function displayTodo() {
  let todo = localStorage.getItem("todo");
  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }
  let htmlCode = "";
  todoArray.forEach((list, ind) => {
    htmlCode += `<div class='flex mb-4 items-center'>
          <p class='w-full text-white font-bold'>${list}</p>
          <button onclick='edit(${ind})' class='flex-no-shrink p-2 ml-4 mr-2 rounded text-white text-grey bg-green-600'>Edit</button>
          <button onclick='deleteTodo(${ind})' class='flex-no-shrink p-2 ml-2 rounded text-white bg-red-500'>Delete</button>
       </div>`;
  });
  listBox.innerHTML = htmlCode;
}

function deleteTodo(ind) {
  let todo = localStorage.getItem("todo");
  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }
  todoArray.splice(ind, 1);
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo();
}

function edit(ind) {
  saveInd.value = ind;
  let todo = localStorage.getItem("todo");
  let todoArray = JSON.parse(todo);
  itemInput.value = todoArray[ind];
  document.getElementById("add-task-btn").style.display = "none";
  document.getElementById("save-todo-btn").style.display = "block";
}

saveTaskButton.addEventListener("click", () => {
  let todos = localStorage.getItem("todo");
  let todoArray = JSON.parse(todos) || [];
  let id = parseInt(saveInd.value);
  if (id >= 0 && id < todoArray.length) {
    todoArray[id] = itemInput.value;
    addTaskButton.style.display = "block";
    saveTaskButton.style.display = "none";
    itemInput.value = "";
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
  }
});
displayTodo();

// save-todo-btn
