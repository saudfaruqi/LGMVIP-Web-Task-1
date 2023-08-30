const addButton = document.getElementById("add-button");
const newTaskInput = document.getElementById("new-task");
const taskList = document.getElementById("task-list");

addButton.addEventListener("click", () => {
  addNewTask();
});

newTaskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent default Enter key behavior (e.g., form submission)
    addNewTask();
  }
});

// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.reverse().forEach(task => addTask(task.text, task.completed));
});

function addTask(text, completed = false) {
  const taskItem = document.createElement("li");
  taskItem.innerHTML = `
    <label>
      <input type="checkbox" class="task-checkbox" ${completed ? "checked" : ""}>
      <span class="${completed ? "completed" : ""}">${text}</span>
    </label>
    <button class="remove-button">Delete</button>
  `;
  
  // Insert new task at the beginning of the list
  taskList.prepend(taskItem);

  const removeButton = taskItem.querySelector(".remove-button");
  const taskCheckbox = taskItem.querySelector(".task-checkbox");

  removeButton.addEventListener("click", () => {
    taskList.removeChild(taskItem);
    updateLocalStorage();
  });

  taskCheckbox.addEventListener("change", () => {
    if (taskCheckbox.checked) {
      taskItem.querySelector("span").classList.add("completed");
    } else {
      taskItem.querySelector("span").classList.remove("completed");
    }
    updateLocalStorage();
  });

  updateLocalStorage();
}

function updateLocalStorage() {
  const tasks = [];
  const taskItems = document.querySelectorAll(".task-checkbox");
  taskItems.forEach(taskItem => {
    tasks.push({
      text: taskItem.nextElementSibling.textContent,
      completed: taskItem.checked
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addNewTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText !== "") {
      addTask(taskText);
      newTaskInput.value = "";
    }
  }