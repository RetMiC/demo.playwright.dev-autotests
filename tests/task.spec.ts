import { test, expect } from '../fixtures/todo-fixture';

test.describe('Добавление задач', () => {
  test('Можно добавить одну задачу', async ({ todo }) => {
    await todo.addTask('Купить хлеб');
    await todo.expectTaskCount(1);
    await todo.expectTaskText(0, 'Купить хлеб');
  });

  test('Add new task with space: First task', async ({ todo }) => {
    await todo.addTask('First task');
    await todo.expectTaskExists('First task');
  });

  test('Add new task: Task', async ({ todo }) => {
    await todo.addTask('Task');
    await todo.expectTaskExists('Task');
  });
});

test.describe('Удаление задач', () => {
  test('Можно удалить одну задачу', async ({ todo, singleTask }) => {
    await todo.expectTaskCount(1);
    await todo.deleteTaskByIndex(0);
    await todo.expectTaskCount(0);
  });

  test('Можно удалить одну из нескольких задач', async ({ todo, multipleTasks }) => {
    await todo.expectTaskCount(2);
    await todo.deleteTaskByIndex(1);
    await todo.expectTaskCount(1);
    await todo.expectTaskText(0, 'Остаться');
  });
});

// Эта ветка 4