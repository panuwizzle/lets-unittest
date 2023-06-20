const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();


// In-memory database
let todos = {};

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// GET /todos - Get all todos
app.get('/todos', (req, res) => {
  const todosArray = Object.values(todos);
  res.json(todosArray);
});

// POST /todos - Create a new todo
app.post('/todos', (req, res) => {
  const todo = { id: uuidv4(), ...req.body };
  todos[todo.id] = todo;
  res.status(201).json(todo);
});

// DELETE /todos/:id - Delete a todo by ID
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (todos[id]) {
    delete todos[id];
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

module.exports = app;

