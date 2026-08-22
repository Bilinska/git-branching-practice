const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");

let completedTasks = 0;
// Adding comments as a part of training to explain the code
function updateCounter() {
  counter.textContent = completedTasks;
}

addButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return;
  }

  const task = document.createElement("li");

  task.innerHTML = `
        <label>
            <input type="checkbox" class="complete-checkbox">
            ${taskText}
        </label>
        <button class="remove-button">Remove</button>
    `;

  const checkbox = task.querySelector(".complete-checkbox");
  const removeButton = task.querySelector(".remove-button");

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      completedTasks++;
    } else {
      completedTasks--;
    }

    updateCounter();
  });

  removeButton.addEventListener("click", () => {
    if (checkbox.checked) {
      completedTasks--;
    }

    task.remove();
    updateCounter();
  });

  taskList.appendChild(task);

  taskInput.value = "";

  const clearButton = document.getElementById("clearButton");

  clearButton.addEventListener("click", () => {
    taskList.innerHTML = "";
    completedTasks = 0;
    updateCounter();
  });
});
