const form = document.getElementById("todo-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load tasks on page load
window.addEventListener("DOMContentLoaded", () => {
  tasks.forEach(addTaskToDOM);
});

// Form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText === "") return;

  const newTask = { text: taskText, completed: false };
  tasks.push(newTask);
  addTaskToDOM(newTask);
  saveTasks();
  input.value = "";
});

// Add task to the DOM
function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.textContent = task.text;
  if (task.completed) li.classList.add("completed");

  // Complete toggle
  li.addEventListener("click", () => {
    task.completed = !task.completed;
    li.classList.toggle("completed");
    saveTasks();
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    tasks = tasks.filter((t) => t !== task);
    li.remove();
    saveTasks();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
