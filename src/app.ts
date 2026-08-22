// Type definition for task element
interface TaskElement extends HTMLLIElement {
  querySelector(selector: string): Element | null;
  remove(): void;
}

// Get DOM elements
const taskInput = document.getElementById('taskInput') as HTMLInputElement;
const addButton = document.getElementById('addButton') as HTMLButtonElement;
const taskList = document.getElementById('taskList') as HTMLUListElement;
const counter = document.getElementById('counter') as HTMLSpanElement;

// State management
let completedTasks: number = 0;

/**
 * Updates the counter display with the current number of completed tasks
 */
function updateCounter(): void {
  counter.textContent = completedTasks.toString();
}

/**
 * Creates and returns a checkbox change event handler
 */
function createCheckboxHandler(checkbox: HTMLInputElement): () => void {
  return (): void => {
    if (checkbox.checked) {
      completedTasks++;
    } else {
      completedTasks--;
    }
    updateCounter();
  };
}

/**
 * Creates and returns a remove button click event handler
 */
function createRemoveHandler(
  task: HTMLLIElement,
  checkbox: HTMLInputElement
): () => void {
  return (): void => {
    if (checkbox.checked) {
      completedTasks--;
    }
    task.remove();
    updateCounter();
  };
}

/**
 * Adds a new task to the task list
 */
function addTask(taskText: string): void {
  if (taskText.trim() === '') {
    return;
  }

  const task = document.createElement('li') as TaskElement;

  task.innerHTML = `
    <label>
      <input type="checkbox" class="complete-checkbox" />
      ${taskText}
    </label>
    <button class="remove-button">Remove</button>
  `;

  const checkbox = task.querySelector(
    '.complete-checkbox'
  ) as HTMLInputElement;
  const removeButton = task.querySelector('.remove-button') as HTMLButtonElement;

  // Add event listeners
  checkbox.addEventListener('change', createCheckboxHandler(checkbox));
  removeButton.addEventListener('click', createRemoveHandler(task, checkbox));

  // Add task to list
  taskList.appendChild(task);

  // Clear input
  taskInput.value = '';
}

// Event listener for add button
addButton.addEventListener('click', (): void => {
  addTask(taskInput.value);
});

// Allow adding task with Enter key
taskInput.addEventListener('keypress', (event: KeyboardEvent): void => {
  if (event.key === 'Enter') {
    addTask(taskInput.value);
  }
});
