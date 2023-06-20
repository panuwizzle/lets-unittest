const express = require('express');
const todosController = require('./controllers/TodoController');

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// GET /todos - Get all todos
app.get('/todos', todosController.getAllTodos);

// POST /todos - Create a new todo
app.post('/todos', todosController.createTodo);

// DELETE /todos/:id - Delete a todo by ID
app.delete('/todos/:id', todosController.deleteTodo);

module.exports = app
