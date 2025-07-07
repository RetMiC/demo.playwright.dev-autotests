import { test as base, expect, Page } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

type MyFixtures = {
  todo: TodoPage;
  singleTask: void;
  multipleTasks: void;
};

export const test = base.extend<MyFixtures>({
  todo: async ({ page }, use) => {
    const todo = new TodoPage(page);
    await todo.goto();
    await use(todo);
  },

  singleTask: async ({ todo }, use) => {
    await todo.addTask('Удалить меня');
    await use();
  },

  multipleTasks: async ({ todo }, use) => {
    await todo.addTask('Остаться');
    await todo.addTask('Удалить');
    await use();
  }
});

export { expect };

HW5