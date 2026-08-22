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
    await expect(page.locator('#taskInput')).toBeVisible();
    await expect(page.locator('#addButton')).toBeVisible();
    await expect(page.locator('#taskList')).toBeEmpty();
    await expect(page.locator('#counter')).toBeVisible();
    await expect(page.locator('#clearButton')).toBeVisible();
    await expect(page.locator('#counter')).toHaveText('0');
  });

  // Test 3: Add a single task
  test('should add a new task', async ({ page }) => {
    const input = page.locator('#taskInput');
    const button = page.locator('#addButton');

    await input.fill('Buy groceries');
    await button.click();

    await expect(page.locator('#taskList')).toBeVisible();

    const taskItem = page.locator('li').first();
    await expect(taskItem).toContainText('Buy groceries');
  });

  // Test 4: Add multiple tasks
  test('should add multiple tasks', async ({ page }) => {
    const input = page.locator('#taskInput');
    const button = page.locator('#addButton');

    const tasks = ['Task 1', 'Task 2', 'Task 3'];

    for (const task of tasks) {
      await input.fill(task);
      await button.click();
    }

    const taskCount = await page.locator('li').count();
    expect(taskCount).toBe(3);
  });

  // Test 5: Mark task as complete and check counter
  test('should update counter when task is completed', async ({ page }) => {
    const input = page.locator('#taskInput');
    const button = page.locator('#addButton');
    const counter = page.locator('#counter');

    // Add a task
    await input.fill('Learn Playwright');
    await button.click();

    // Check the checkbox
    const checkbox = page.locator('.complete-checkbox').first();
    await checkbox.check();

    // Verify counter increased
    await expect(counter).toHaveText('1');
  });

  // Test 6: Remove a task
  test('should remove a task', async ({ page }) => {
    const input = page.locator('#taskInput');
    const button = page.locator('#addButton');

    // Add a task
    await input.fill('Task to delete');
    await button.click();

    // Remove the task
    const removeButton = page.locator('.remove-button').first();
    await removeButton.click();

    // Verify task is removed
    const taskCount = await page.locator('li').count();
    expect(taskCount).toBe(0);
  });

  // Test 7: Uncheck task and verify counter decreases
  test('should decrease counter when task is unchecked', async ({ page }) => {
    const input = page.locator('#taskInput');
    const button = page.locator('#addButton');
    const counter = page.locator('#counter');

    // Add and complete task
    await input.fill('Test task');
    await button.click();

    const checkbox = page.locator('.complete-checkbox').first();
    await checkbox.check();
    await expect(counter).toHaveText('1');

    // Uncheck task
    await checkbox.uncheck();
    await expect(counter).toHaveText('0');
  });

  // Test 8: Empty input validation
  test('should not add empty task', async ({ page }) => {
    const button = page.locator('#addButton');

    await button.click();

    const taskCount = await page.locator('li').count();
    expect(taskCount).toBe(0);
  });

  // Test 9: Input field clears after adding task
  test('should clear input field after adding task', async ({ page }) => {
    const input = page.locator('#taskInput');
    const button = page.locator('#addButton');

    await input.fill('New task');
    await button.click();

    const inputValue = await input.inputValue();
    expect(inputValue).toBe('');
  });

  // Test 10: Remove completed task decreases counter
  test('should decrease counter when removing completed task', async ({
    page,
  }) => {
    const input = page.locator('#taskInput');
    const button = page.locator('#addButton');
    const counter = page.locator('#counter');

    await input.fill('Task');
    await button.click();

    const checkbox = page.locator('.complete-checkbox').first();
    await checkbox.check();
    await expect(counter).toHaveText('1');

    const removeButton = page.locator('.remove-button').first();
    await removeButton.click();

    await expect(counter).toHaveText('0');
  });

  // Test 11: Complex user flow
  test('should handle complex user interactions', async ({ page }) => {
    const input = page.locator('#taskInput');
    const button = page.locator('#addButton');
    const counter = page.locator('#counter');

    // Add 3 tasks
    const tasks = ['Learn Playwright', 'Write tests', 'Deploy app'];
    for (const task of tasks) {
      await input.fill(task);
      await button.click();
    }

    expect(await page.locator('li').count()).toBe(3);

    // Complete first 2 tasks
    await page.locator('.complete-checkbox').nth(0).check();
    await page.locator('.complete-checkbox').nth(1).check();
    await expect(counter).toHaveText('2');

    // Remove completed task
    await page.locator('.remove-button').nth(0).click();
    expect(await page.locator('li').count()).toBe(2);
    await expect(counter).toHaveText('1');
  });

  // Test 12: Add task using Enter key
  test('should add task when pressing Enter key', async ({ page }) => {
    const input = page.locator('#taskInput');

    await input.fill('Task from Enter key');
    await input.press('Enter');

    const taskItem = page.locator('li').first();
    await expect(taskItem).toContainText('Task from Enter key');

    // Verify input is cleared
    await expect(input).toHaveValue('');
  });

  // Test 13: Task styling on completion
  test('should apply strikethrough style when task is completed', async ({
    page,
  }) => {
    const input = page.locator('#taskInput');
    const button = page.locator('#addButton');

    await input.fill('Complete me');
    await button.click();

    const checkbox = page.locator('.complete-checkbox').first();
    const label = page.locator('label').first();

    // Check the checkbox
    await checkbox.check();

    // Verify the checked state
    await expect(checkbox).toBeChecked();
  });

  // Test 14: Multiple checkboxes work independently
  test('should handle multiple tasks independently', async ({ page }) => {
    const input = page.locator('#taskInput');
    const button = page.locator('#addButton');
    const counter = page.locator('#counter');

    // Add 3 tasks
    for (let i = 1; i <= 3; i++) {
      await input.fill(`Task ${i}`);
      await button.click();
    }

    // Complete task 1 and 3
    await page.locator('.complete-checkbox').nth(0).check();
    await page.locator('.complete-checkbox').nth(2).check();
    await expect(counter).toHaveText('2');

    // Uncheck task 1
    await page.locator('.complete-checkbox').nth(0).uncheck();
    await expect(counter).toHaveText('1');

    // Remove task 2 (unchecked)
    await page.locator('.remove-button').nth(1).click();
    expect(await page.locator('li').count()).toBe(2);
    await expect(counter).toHaveText('1');
  });

  // Test 15: Task input placeholder
  test('should have correct input placeholder', async ({ page }) => {
    const input = page.locator('#taskInput');
    const placeholder = await input.getAttribute('placeholder');
    expect(placeholder).toBe('Enter a task');
  });

  // Test 16: Clear all tasks
  test('should clear all tasks when clear button is clicked', async ({ page }) => {
    const input = page.locator('#taskInput');
    const button = page.locator('#addButton');
    const clearButton = page.locator('#clearButton');

    // Add 3 tasks
    for (let i = 1; i <= 3; i++) {
      await input.fill(`Task ${i}`);
      await button.click();
    }

    // Clear all tasks
    await clearButton.click();

    // Verify all tasks are removed
    const taskCount = await page.locator('li').count();
    expect(taskCount).toBe(0);
  });
});
