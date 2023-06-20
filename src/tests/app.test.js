const request = require('supertest');
const app = require('../app');

describe('Todo API', () => {
  let createdTodoId;

  test('POST /todos - Create a new todo', async () => {
    const todoData = {
      title: 'Test Todo',
      description: 'This is a test todo',
    };

    const response = await request(app)
      .post('/todos')
      .send(todoData)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    createdTodoId = response.body.id;
  });

  test('GET /todos - Get all todos', async () => {
    const response = await request(app)
      .get('/todos')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty('id', createdTodoId);
    expect(response.body[0]).toHaveProperty('title', 'Test Todo');
    expect(response.body[0]).toHaveProperty('description', 'This is a test todo');
  });

  test('DELETE /todos/:id - Delete a todo by ID', async () => {
    await request(app)
      .delete(`/todos/${createdTodoId}`)
      .expect(204);

    const response = await request(app)
      .get('/todos')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0);
  });
});

