import { test, expect } from '@playwright/test';
import { ToDoPage } from './pages/ToDo';

test.describe('To-Do Application', () => {
  // Run before each test
  test.beforeEach(async ({ page }) => {
    const toDoPage = new ToDoPage(page);
    await toDoPage.navigate();
  });

  // Test 1: Page loads with correct title
  test('should display the correct title', async ({ page }) => {
    const title = await page.locator('h1').textContent();
    expect(title).toBe('My Awesome To-Do Application 🚀');
  });

  // Test 2: Page has correct initial state
  test('should display initial state correctly', async ({ page }) => {
    const toDoPage = new ToDoPage(page);

    await expect(toDoPage.taskInput).toBeVisible();
    await expect(toDoPage.addButton).toBeVisible();
    await expect(toDoPage.taskList).toBeEmpty();
    await expect(toDoPage.clearButton).toBeVisible();
    await expect(toDoPage.counter).toBeVisible();
    await expect(toDoPage.counter).toHaveText('0');
  });

  // Test 3: Add a single task
  test('should add a new task', async ({ page }) => {
    const toDoPage = new ToDoPage(page);

    await toDoPage.taskInput.fill('Buy groceries');
    await toDoPage.addButton.click();

    await expect(toDoPage.taskList).toBeVisible();

    const taskItem = toDoPage.taskItems.first();
    await expect(taskItem).toContainText('Buy groceries');
  });

  // Test 4: Add multiple tasks
  test('should add multiple tasks', async ({ page }) => {
    const toDoPage = new ToDoPage(page);

    const tasks = ['Task 1', 'Task 2', 'Task 3'];

    for (const task of tasks) {
      await toDoPage.taskInput.fill(task);
      await toDoPage.addButton.click();
    }

    const taskCount = await toDoPage.taskItems.count();
    expect(taskCount).toBe(3);
  });

  // Test 5: Mark task as complete and check counter
  test('should update counter when task is completed', async ({ page }) => {
    const toDoPage = new ToDoPage(page);

    // Add a task
    await toDoPage.taskInput.fill('Learn Playwright');
    await toDoPage.addButton.click();

    // Check the checkbox
    await toDoPage.completeCheckboxes.first().check();

    // Verify counter increased
    await expect(toDoPage.counter).toHaveText('1');
  });

  // Test 6: Remove a task
  test('should remove a task', async ({ page }) => {
    const toDoPage = new ToDoPage(page);

    // Add a task
    await toDoPage.taskInput.fill('Task to delete');
    await toDoPage.addButton.click();

    // Remove the task
    await toDoPage.removeButtons.first().click();

    // Verify task is removed
    await expect(toDoPage.taskList).toBeEmpty();
  });

  // Test 7: Uncheck task and verify counter decreases
  test('should decrease counter when task is unchecked', async ({ page }) => {
    const toDoPage = new ToDoPage(page);

    // Add and complete task
    await toDoPage.taskInput.fill('Test task');
    await toDoPage.addButton.click();
    await toDoPage.completeCheckboxes.check();
    await expect(toDoPage.counter).toHaveText('1');

    // Uncheck task
    await toDoPage.completeCheckboxes.uncheck();
    await expect(toDoPage.counter).toHaveText('0');
  });

  // Test 8: Empty input validation
  test('should not add empty task', async ({ page }) => {
    const toDoPage = new ToDoPage(page);

    await toDoPage.addButton.click();
    expect(await toDoPage.taskItems.count()).toBe(0);
  });

  // Test 9: Input field clears after adding task
  test('should clear input field after adding task', async ({ page }) => {
    const toDoPage = new ToDoPage(page);

    await toDoPage.taskInput.fill('New task');
    await toDoPage.addButton.click();

    expect(await toDoPage.taskInput.inputValue()).toBe('');
  });

  // Test 10: Remove completed task decreases counter
  test('should decrease counter when removing completed task', async ({ page }) => {
    const toDoPage = new ToDoPage(page);

    await toDoPage.taskInput.fill('Task');
    await toDoPage.addButton.click();

    await toDoPage.completeCheckboxes.first().check();
    await expect(toDoPage.counter).toHaveText('1');

    await toDoPage.removeButtons.first().click();

    await expect(toDoPage.counter).toHaveText('0');
  });

  // Test 11: Complex user flow
  test('should handle complex user interactions', async ({ page }) => {
    const toDoPage = new ToDoPage(page);

    // Add 3 tasks
    const tasks = ['Learn Playwright', 'Write tests', 'Deploy app'];
    for (const task of tasks) {
      await toDoPage.taskInput.fill(task);
      await toDoPage.addButton.click();
    }

    expect(await toDoPage.taskItems.count()).toBe(3);

    // Complete first 2 tasks
    await toDoPage.completeCheckboxes.nth(0).check();
    await toDoPage.completeCheckboxes.nth(1).check();
    await expect(toDoPage.counter).toHaveText('2');

    // Remove completed task
    await toDoPage.removeButtons.nth(0).click();
    expect(await toDoPage.taskItems.count()).toBe(2);
    await expect(toDoPage.counter).toHaveText('1');
  });

  // Test 12: Add task using Enter key
  test('should add task when pressing Enter key', async ({ page }) => {
    const toDoPage = new ToDoPage(page);

    await toDoPage.taskInput.fill('Task from Enter key');
    await toDoPage.taskInput.press('Enter');

    await expect(toDoPage.taskItems.first()).toContainText('Task from Enter key');

    // Verify input is cleared
    await expect(toDoPage.taskInput).toHaveValue('');
  });

  // Test 13: Multiple checkboxes work independently
  test('should handle multiple tasks independently', async ({ page }) => {
    const toDoPage = new ToDoPage(page);

    // Add 3 tasks
    for (let i = 1; i <= 3; i++) {
      await toDoPage.taskInput.fill(`Task ${i}`);
      await toDoPage.addButton.click();
    }

    // Complete task 1 and 3
    await toDoPage.completeCheckboxes.nth(0).check();
    await toDoPage.completeCheckboxes.nth(2).check();
    await expect(toDoPage.counter).toHaveText('2');

    // Uncheck task 1
    await toDoPage.completeCheckboxes.nth(0).uncheck();
    await expect(toDoPage.counter).toHaveText('1');

    // Remove task 2 (unchecked)
    await toDoPage.removeButtons.nth(1).click();
    expect(await toDoPage.taskItems.count()).toBe(2);
    await expect(toDoPage.counter).toHaveText('1');
  });

  // Test 14: Task input placeholder
  test('should have correct input placeholder', async ({ page }) => {
    const toDoPage = new ToDoPage(page);
    expect(await toDoPage.placeholder.getAttribute('placeholder')).toBe('Enter a task');
  });

  // Test 15: Clear all tasks
  test('should clear all tasks when clear button is clicked', async ({ page }) => {
    const toDoPage = new ToDoPage(page);

    // Add 3 tasks
    for (let i = 1; i <= 5; i++) {
      await toDoPage.taskInput.fill(`Task ${i}`);
      await toDoPage.addButton.click();
    }

    // Clear all tasks
    await toDoPage.clearButton.click();

    // Verify all tasks are removed
    expect(await toDoPage.counter.textContent()).toBe('0');
  });

  /**
 * Test 17: Add and manage 15 tasks in the list
 * 
 * This test verifies that the application can handle:
 * - Adding 15 tasks to the list
 * - Displaying all tasks correctly
 * - Managing checkboxes independently with 15 tasks
 * - Completing and removing tasks with a large list
 * - Counter accuracy with many tasks
 */

  test('should handle 15 tasks in the list', async ({ page }) => {
    const toDoPage = new ToDoPage(page);

    // Step 1: Create 15 tasks
    const tasksToAdd = [
      'Learn TypeScript',
      'Master Playwright',
      'Write unit tests',
      'Write integration tests',
      'Write e2e tests',
      'Code review',
      'Deploy to production',
      'Monitor application',
      'Fix bugs',
      'Optimize performance',
      'Update documentation',
      'Refactor code',
      'Plan next sprint',
      'Attend standup',
      'Research new frameworks'
    ];

    // Add all 15 tasks
    for (const task of tasksToAdd) {
      await toDoPage.taskInput.fill(task);
      await toDoPage.addButton.click();
    }

    // Step 2: Verify all 15 tasks are in the list
    expect(await toDoPage.taskItems.count()).toBe(15);

    // Step 3: Verify each task appears in the correct order
    for (let i = 0; i < tasksToAdd.length; i++) {
      await expect(toDoPage.taskItems.nth(i)).toContainText(tasksToAdd[i]);
    }

    // Step 4: Complete every 3rd task (5 tasks total: indices 2, 5, 8, 11, 14)
    const tasksToComplete = [2, 5, 8, 11, 14];
    for (const index of tasksToComplete) {
      await toDoPage.completeCheckboxes.nth(index).check();
    }

    // Step 5: Verify counter shows 5 completed tasks
    await expect(toDoPage.counter).toHaveText('5');

    // Step 6: Remove every 2nd completed task (remove indices 5 and 14)
    const tasksToRemove = [5, 11]; // Remove in reverse order to maintain indices
    for (const index of tasksToRemove.reverse()) {
      const removeButton = page.locator('li').nth(index).locator('.remove-button');
      await removeButton.click();
    }

    // Step 7: Verify 13 tasks remain (15 - 2)
    const remainingTaskCount = await page.locator('li').count();
    expect(remainingTaskCount).toBe(13);

    // Step 8: Verify counter is updated (3 completed tasks remain: indices 2, 8, 11 original)
    // After removal, counter should be 3 (5 completed - 2 removed)
    await expect(toDoPage.counter).toHaveText('3');

    // Step 9: Complete 5 more tasks from the remaining ones
    const moreIndicesToComplete = [0, 3, 6, 9, 12];
    for (const index of moreIndicesToComplete) {
      const checkbox = page.locator('li').nth(index).locator('.complete-checkbox');
      await checkbox.check();
    }

    // Step 10: Verify counter now shows 7 completed tasks (3 + 4)
    await expect(toDoPage.counter).toHaveText('7');

    // Step 11: Uncheck one of the completed tasks
    const uncompleteCheckbox = page.locator('li').nth(0).locator('.complete-checkbox');
    await uncompleteCheckbox.uncheck();

    // Step 12: Verify counter decreased to 6
    await expect(toDoPage.counter).toHaveText('6');

    // Step 13: Verify all remaining tasks are still visible
    const finalTaskCount = await page.locator('li').count();
    expect(finalTaskCount).toBe(13);

    // Step 14: Verify input field is still functional with many tasks
    await toDoPage.taskInput.fill('Final test task with many items');
    await toDoPage.addButton.click();

    // Step 15: Verify new task was added (total should be 14)
    const finalCount = await page.locator('li').count();
    expect(finalCount).toBe(14);

    // Step 16: Verify input is cleared after adding
    const inputValue = await toDoPage.taskInput.inputValue();
    expect(inputValue).toBe('');

    // Step 17: Verify the new task appears at the end
    const lastTask = page.locator('li').last();
    await expect(lastTask).toContainText('Final test task with many items');
  });
});
