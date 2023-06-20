// controllers/todosController.js
const todos = require('../models/TodoModel');

// Get all todos
const getAllTodos = (req, res) => {
  const todosArray = Object.values(todos.getAll());
  res.json(todosArray);
};

// Create a new todo
const createTodo = (req, res) => {
  const todo = todos.create({ ...req.body });
  res.status(201).json(todo);
};

// Delete a todo by ID
const deleteTodo = (req, res) => {
  const id = req.params.id;
  if (todos.delete(id)) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  deleteTodo,
};
