const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

addButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return;
  }

  const task = document.createElement("li");

  task.innerHTML = `
        <label>
            <input type="checkbox">
            ${taskText}
        </label>
    `;

  taskList.appendChild(task);

  taskInput.value = "";
});
