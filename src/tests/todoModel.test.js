const { v4: uuidv4 } = require('uuid');
const todoModel = require('../models/TodoModel');

describe('Todo Model', () => {
  beforeEach(() => {
    const allTodos = todoModel.getAll();
    Object.keys(allTodos).forEach((key) => {
      delete allTodos[key];
    });
  });

  test('Create a new todo', () => {
    const todoData = {
      title: 'Test Todo',
      description: 'This is a test todo',
    };

    const todo = todoModel.create(todoData);

    expect(todo).toHaveProperty('id');
    expect(todo.title).toBe('Test Todo');
    expect(todo.description).toBe('This is a test todo');
    expect(Object.values(todoModel.getAll())).toContain(todo);
  });

  test('Get all todos', () => {
    const todoData1 = {
      title: 'Test Todo 1',
      description: 'This is test todo 1',
    };

    const todoData2 = {
      title: 'Test Todo 2',
      description: 'This is test todo 2',
    };

    todoModel.create(todoData1);
    todoModel.create(todoData2);

    const todos = todoModel.getAll();

    expect(Object.values(todos)).toHaveLength(2);
    expect(Object.values(todos)).toContainEqual(expect.objectContaining(todoData1));
    expect(Object.values(todos)).toContainEqual(expect.objectContaining(todoData2));
  });

  test('Delete a todo by ID', () => {
    const todoData = {
      title: 'Test Todo',
      description: 'This is a test todo',
    };

    const todo = todoModel.create(todoData);

    expect(Object.values(todoModel.getAll())).toContain(todo);

    const deleted = todoModel.delete(todo.id);

    expect(deleted).toBe(true);
    expect(Object.values(todoModel.getAll())).not.toContain(todo);
  });

  test('Delete a non-existing todo by ID', () => {
    const nonExistingId = uuidv4();

    const deleted = todoModel.delete(nonExistingId);

    expect(deleted).toBe(false);
  });
});
