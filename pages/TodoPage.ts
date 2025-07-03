import { Page, Locator, expect } from '@playwright/test';

export class TodoPage {
    readonly page: Page;
    readonly input: Locator;
    readonly todoItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.input = page.getByPlaceholder('What needs to be done?');
        this.todoItems = page.getByTestId('todo-title');
    }

    async goto() {
        await this.page.goto('https://demo.playwright.dev/todomvc/#/');
    }

    async addTask(name: string) {
        await this.input.fill(name);
        await this.input.press('Enter');
    }

    async expectTaskCount(count: number) {
        await expect(this.todoItems).toHaveCount(count);
    }

    async expectTaskText(index: number, text: string) {
        await expect(this.todoItems.nth(index)).toHaveText(text);
    }

    async expectAnyTaskToHaveText(text: string) {
        await expect(this.todoItems).toHaveText(text);
    }

    async expectTasksVisible() {
        await expect(this.todoItems).toBeVisible();
    }

    async expectTaskExists(text: string) {
        await this.expectTasksVisible();
        await this.expectAnyTaskToHaveText(text);
    }

    async deleteTaskByIndex(index: number) {
        const item = this.page.locator('[data-testid="todo-item"]').nth(index);
        await item.hover();
        await item.locator('.destroy').click();
    }

}
