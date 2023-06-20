const todosController = require('../controllers/TodoController');
const todoModel = require('../models/TodoModel');

describe('Todos Controller', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Create a new todo - Spy the createTodo function call', () => {
    
    // spy the create function in todoModel
    const createSpy = jest.spyOn(todoModel, 'create');

    const req = {
      body: {
        title: 'Test Todo',
        description: 'This is a test todo',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    todosController.createTodo(req, res);

    expect(createSpy).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  xtest('Create a new todo - Mock error from model', () => {
    const mockError = new Error('Mock Model Error');
    const createSpy = jest.spyOn(todoModel, 'create').mockImplementation(() => {
      throw mockError;
    });

    const req = {
      body: {
        title: 'Test Todo',
        description: 'This is a test todo',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      sendStatus: jest.fn(),
    };

    try {
      todosController.createTodo(req, res);
    } catch (error) {
      expect(createSpy).toHaveBeenCalledWith(req.body);
      expect(res.status).not.toHaveBeenCalledWith(201);
      expect(res.json).not.toHaveBeenCalled();
      expect(res.sendStatus).toHaveBeenCalledWith(500);
      expect(error).toBe(mockError);
    }
  });

});
