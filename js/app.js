const addTodoData = document.getElementById("addTodoData");
const addTodoBtn = document.getElementById("addTodoBtn");

// todo filter labels
const totalLabel = document.querySelector(`form label[for="total"]`);
const finishedLabel = document.querySelector(`form label[for="finished"]`);
const unfinishedLabel = document.querySelector(`form label[for="unfinished"]`);

const todoContainer = document.getElementById("todoContainer");

addTodoBtn.addEventListener("click", addNewTodo);
addTodoData.addEventListener("keypress", addNewTodoOnEnter);

totalLabel.addEventListener("click", filterTodo);
finishedLabel.addEventListener("click", filterTodo);
unfinishedLabel.addEventListener("click", filterTodo);

function addNewTodo() {
  if (
    addTodoData.value.trim() == "" ||
    addTodoData.value == null ||
    addTodoData.value == undefined
  ) {
    addTodoData.focus();
    return false;
  } else {
    createNewTodo(addTodoData.value);
  }

  // console.log(addTodoData.value.trim() == null ? "valid" : "invalid") // debug

  addTodoData.value = "";

  // update task status 
  todoCount();
}

function addNewTodoOnEnter(event) {
  // addNewTodo()
  const pressedKey = event.key.toLowerCase();
  if (pressedKey == "enter") addNewTodo();
}

// adding new todo
function createNewTodo(newTodoContent) {
  const todoDiv = document.createElement("div");
  const todoInputData = document.createElement("input");
  const todoFinishBtn = document.createElement("input");
  const todoRemoveBtn = document.createElement("input");

  const addNewTodoContainer = document.getElementById("addNewTodoContainer");

  todoDiv.setAttribute("class", "todo");

  todoInputData.setAttribute("type", "text");
  todoInputData.setAttribute("name", "todo");
  todoInputData.setAttribute("class", "todoTask");
  todoInputData.setAttribute("value", newTodoContent);
  todoInputData.setAttribute("data-finish", false);

  todoFinishBtn.setAttribute("type", "button");
  todoFinishBtn.setAttribute("value", "Finished");
  todoFinishBtn.addEventListener("click", finishTask);

  todoRemoveBtn.setAttribute("type", "button");
  todoRemoveBtn.setAttribute("value", "Remove");
  todoRemoveBtn.addEventListener("click", removeTask);

  todoDiv.appendChild(todoInputData);
  todoDiv.appendChild(todoFinishBtn);
  todoDiv.appendChild(todoRemoveBtn);

  todoContainer.insertBefore(todoDiv, addNewTodoContainer);

  // update task status count
  todoCount();
}

// finish todo
function finishTask(event) {
  const dataInput = event.target.previousElementSibling;
  const isTaskFinished = dataInput.getAttribute("data-finish");

  if (isTaskFinished == "false") {
    dataInput.setAttribute("data-finish", "true");
    event.target.value = "Unfinished";
    event.target.style.backgroundColor = "#d9f1da";
  } else if (isTaskFinished == "true") {
    dataInput.setAttribute("data-finish", "false");
    event.target.value = "Finished";
    event.target.style.backgroundColor = "#f1f1d9";
  }

  todoCount();
}

// remove todo
function removeTask(event) {
  event.target.parentElement.remove();
  todoCount();

  console.log("task removed successfully.");
}

function todoCount() {
  const finishedElem = document.querySelectorAll(`[data-finish="true"]`);
  const unfinishedElem = document.querySelectorAll(`[data-finish="false"]`);
  const totalElem = document.querySelectorAll(`.todo`);

  totalLabel.textContent = `Total: (${totalElem.length})`;
  finishedLabel.textContent = `Finished: (${finishedElem.length})`;
  unfinishedLabel.textContent = `Unfinished: (${unfinishedElem.length})`;
}

todoContainer.addEventListener("submit", function (event) {
  event.preventDefault();
});

// filter total | finished | unfinished task and display
function filterTodo(event) {
  const request = event.target.getAttribute("for");

  const allTodo = document.querySelectorAll(`.todo`);
  const finishedTodo = document.querySelectorAll(`[data-finish="true"]`);
  const unfinishedTodo = document.querySelectorAll(`[data-finish="false"]`);

  console.log(unfinishedTodo)

  switch (request) {
    case "total":
      allTodo.forEach((todo) => (todo.style.display = "flex"));
      break;

    case "unfinished":
      finishedTodo.forEach((todo) => (todo.parentElement.style.display = "none"));
      unfinishedTodo.forEach(
        (todo) => (todo.parentElement.style.display = "flex")
      );
      break;

    case "finished":
      unfinishedTodo.forEach(
        (todo) => (todo.parentElement.style.display = "none")
      );
      finishedTodo.forEach(
        (todo) => (todo.parentElement.style.display = "flex")
      );
      break;

    default:
      console.log("invalid filter request.", request);
      break;
  }
}
