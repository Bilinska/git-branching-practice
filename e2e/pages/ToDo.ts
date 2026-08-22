import {Locator, Page} from '@playwright/test';

export class ToDoPage {
  readonly page: Page;
  readonly taskInput: Locator;
  readonly addButton: Locator;
  readonly taskList: Locator;
  readonly clearButton: Locator;
  readonly counter: Locator;
  readonly taskItems: Locator;
  readonly completeCheckboxes: Locator;
  readonly removeButtons: Locator;
  readonly placeholder: Locator


  constructor(page: Page) {
    this.page = page;
    this.taskInput = page.locator('#taskInput');
    this.addButton = page.locator('#addButton');
    this.taskList = page.locator('#taskList');
    this.clearButton = page.locator('#clearButton');
    this.counter = page.locator('#counter');
    this.taskItems = page.locator('li');
    this.completeCheckboxes = page.locator('.complete-checkbox');
    this.removeButtons = page.locator('.remove-button');
    this.placeholder = page.locator('#taskInput[placeholder="Enter a task"]');
  }

async navigate(){
    await this.page.goto('file:///c%3A/Users/Iryna-PC/Documents/git-branching-practice/public/index.html');
    await this.page.waitForLoadState('networkidle');
}   
}