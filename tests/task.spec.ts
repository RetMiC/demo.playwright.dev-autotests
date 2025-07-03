import { test } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test.describe('Добавление задач', () => {
  let todo: TodoPage;

  test.beforeEach(async ({ page }) => {
    todo = new TodoPage(page);
    await todo.goto();
  });

  test('Можно добавить одну задачу', async () => {
    await todo.addTask('Купить хлеб');
    await todo.expectTaskCount(1);
    await todo.expectTaskText(0, 'Купить хлеб');
  });

  test('Add new task with space: First task', async () => {
    await todo.addTask('First task');
    await todo.expectTaskExists('First taskfsdf');
  });

  test('Add new task: Task', async () => {
    await todo.addTask('Task');
    await todo.expectTaskExists('Task');
  });

  test('Добавление задачи в TodoMVC', async () => {
    await todo.addTask('Купить молоко');
    await todo.expectTaskExists('Купить молоко');
  });
});

test.describe('Удаление задач', () => {
  let todo: TodoPage;

  test.beforeEach(async ({ page }) => {
    todo = new TodoPage(page);
    await todo.goto();
  });

  test('Можно удалить одну задачу', async () => {
    await todo.addTask('Удалить меня');
    await todo.expectTaskCount(1);

    await todo.deleteTaskByIndex(0);
    await todo.expectTaskCount(0);
  });

  test('Можно удалить одну из нескольких задач', async () => {
    await todo.addTask('Остаться');
    await todo.addTask('Удалить');

    await todo.expectTaskCount(2);
    await todo.deleteTaskByIndex(1);
    await todo.expectTaskCount(1);
    await todo.expectTaskText(0, 'Остаться');
  });
});
