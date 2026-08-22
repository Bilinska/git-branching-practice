import {Locator, Page} from '@playwright/test';

export class ToDoPage {
  readonly page: ToDoPage;
  readonly taskInput: Locator;
  readonly addButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.taskInput = page.locator('#taskInput');
    this.addButton = page.locator('#addButton');
  }

async navigate(){
    await this.page.goto('file:///c%3A/Users/Iryna-PC/Documents/git-branching-practice/public/index.html');
    await this.page.waitForLoadState('networkidle');
}   
}