import mongoose from 'mongoose';
import Todo from '../models/Todo.js';

// In-memory cache fallback used only while MongoDB connection is establishing
const memoryTodos = new Map();

/**
 * @desc    Get all todos belonging to the authenticated user
 * @route   GET /api/todos
 * @access  Private
 */
export const getTodos = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const userIdStr = userId.toString();

    // Primary: Read directly from MongoDB
    if (mongoose.connection.readyState === 1) {
      const todos = await Todo.find({ userId }).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: todos.length,
        data: todos
      });
    }

    // Fallback: Read from in-memory cache while database is connecting
    const userList = memoryTodos.get(userIdStr) || [];
    return res.status(200).json({
      success: true,
      count: userList.length,
      data: userList
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single todo by ID with ownership verification
 * @route   GET /api/todos/:id
 * @access  Private
 */
export const getTodoById = async (req, res, next) => {
  try {
    const userIdStr = req.user._id.toString();

    if (mongoose.connection.readyState === 1) {
      const todo = await Todo.findById(req.params.id);

      if (!todo) {
        return res.status(404).json({
          success: false,
          message: 'Todo not found'
        });
      }

      if (todo.userId.toString() !== userIdStr) {
        return res.status(403).json({
          success: false,
          message: 'Access forbidden: You do not have permission to access this resource'
        });
      }

      return res.status(200).json({
        success: true,
        data: todo
      });
    }

    const userList = memoryTodos.get(userIdStr) || [];
    const todo = userList.find((t) => t._id.toString() === req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new todo for the authenticated user
 * @route   POST /api/todos
 * @access  Private
 */
export const createTodo = async (req, res, next) => {
  try {
    const { title, description, completed, priority, dueDate } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a todo title'
      });
    }

    const userId = req.user._id;
    const userIdStr = userId.toString();

    // Primary: Persist directly into MongoDB
    if (mongoose.connection.readyState === 1) {
      const todo = await Todo.create({
        userId,
        title: title.trim(),
        description: description ? description.trim() : '',
        completed: completed !== undefined ? Boolean(completed) : false,
        priority: priority || 'medium',
        dueDate: dueDate || null
      });

      console.log(`[Todo] Created in MongoDB for user ${userIdStr}: "${todo.title}"`);

      return res.status(201).json({
        success: true,
        data: todo
      });
    }

    // Fallback while MongoDB connection is establishing
    const newTodo = {
      _id: new mongoose.Types.ObjectId().toString(),
      userId,
      title: title.trim(),
      description: description ? description.trim() : '',
      completed: completed !== undefined ? Boolean(completed) : false,
      priority: priority || 'medium',
      dueDate: dueDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const userList = memoryTodos.get(userIdStr) || [];
    userList.unshift(newTodo);
    memoryTodos.set(userIdStr, userList);

    console.log(`[Todo Fallback] Created in memory for user ${userIdStr}: "${newTodo.title}"`);

    return res.status(201).json({
      success: true,
      data: newTodo
    });
  } catch (error) {
    console.error(`[Todo Controller Error]: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Update a todo belonging to the authenticated user
 * @route   PUT /api/todos/:id
 * @access  Private
 */
export const updateTodo = async (req, res, next) => {
  try {
    const userIdStr = req.user._id.toString();

    if (mongoose.connection.readyState === 1) {
      const todo = await Todo.findById(req.params.id);

      if (!todo) {
        return res.status(404).json({
          success: false,
          message: 'Todo not found'
        });
      }

      if (todo.userId.toString() !== userIdStr) {
        return res.status(403).json({
          success: false,
          message: 'Access forbidden: You do not have permission to modify this resource'
        });
      }

      const { title, description, completed, priority, dueDate } = req.body;

      if (title !== undefined) todo.title = title.trim();
      if (description !== undefined) todo.description = description.trim();
      if (completed !== undefined) todo.completed = Boolean(completed);
      if (priority !== undefined) todo.priority = priority;
      if (dueDate !== undefined) todo.dueDate = dueDate;

      const updatedTodo = await todo.save();

      return res.status(200).json({
        success: true,
        data: updatedTodo
      });
    }

    // Memory fallback
    const userList = memoryTodos.get(userIdStr) || [];
    const todoIndex = userList.findIndex((t) => t._id.toString() === req.params.id);

    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    const { title, description, completed, priority, dueDate } = req.body;
    const existing = userList[todoIndex];
    const updated = {
      ...existing,
      ...(title !== undefined ? { title: title.trim() } : {}),
      ...(description !== undefined ? { description: description.trim() } : {}),
      ...(completed !== undefined ? { completed: Boolean(completed) } : {}),
      ...(priority !== undefined ? { priority } : {}),
      ...(dueDate !== undefined ? { dueDate } : {}),
      updatedAt: new Date().toISOString()
    };
    userList[todoIndex] = updated;

    return res.status(200).json({
      success: true,
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a todo belonging to the authenticated user
 * @route   DELETE /api/todos/:id
 * @access  Private
 */
export const deleteTodo = async (req, res, next) => {
  try {
    const userIdStr = req.user._id.toString();

    if (mongoose.connection.readyState === 1) {
      const todo = await Todo.findById(req.params.id);

      if (!todo) {
        return res.status(404).json({
          success: false,
          message: 'Todo not found'
        });
      }

      if (todo.userId.toString() !== userIdStr) {
        return res.status(403).json({
          success: false,
          message: 'Access forbidden: You do not have permission to delete this resource'
        });
      }

      await todo.deleteOne();

      return res.status(200).json({
        success: true,
        message: 'Todo deleted successfully'
      });
    }

    // Memory fallback
    const userList = memoryTodos.get(userIdStr) || [];
    const filtered = userList.filter((t) => t._id.toString() !== req.params.id);
    memoryTodos.set(userIdStr, filtered);

    return res.status(200).json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
