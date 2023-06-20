// models/todoModel.js
const { v4: uuidv4 } = require('uuid');

const todos = {};

// Get all todos
const getAll = () => {
  return todos;
};

// Create a new todo
const create = (todoData) => {
  const todo = { id: uuidv4(), ...todoData };
  todos[todo.id] = todo;
  return todo;
};

// Delete a todo by ID
const deleteById = (id) => {
  if (todos[id]) {
    delete todos[id];
    return true;
  } else {
    return false;
  }
};

module.exports = {
  getAll,
  create,
  delete: deleteById
};
