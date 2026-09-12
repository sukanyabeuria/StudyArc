import Todo from '../models/Todo.js';

/**
 * @desc    Get all todos belonging to the authenticated user
 * @route   GET /api/todos
 * @access  Private
 */
export const getTodos = async (req, res, next) => {
  try {
    // Strictly scoped to the authenticated user's _id
    const todos = await Todo.find({ userId: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
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
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    // Strict Ownership Protection: verify todo belongs to calling user
    if (todo.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access forbidden: You do not have permission to access this resource'
      });
    }

    res.status(200).json({
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

    // Always associate with the authenticated user's ID from req.user
    // Never accept a userId passed in req.body
    const todo = await Todo.create({
      userId: req.user._id,
      title: title.trim(),
      description: description ? description.trim() : '',
      completed: completed !== undefined ? Boolean(completed) : false,
      priority: priority || 'medium',
      dueDate: dueDate || null
    });

    res.status(201).json({
      success: true,
      data: todo
    });
  } catch (error) {
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
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    // Strict Ownership Protection: verify todo belongs to calling user
    if (todo.userId.toString() !== req.user._id.toString()) {
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

    res.status(200).json({
      success: true,
      data: updatedTodo
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
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    // Strict Ownership Protection: verify todo belongs to calling user
    if (todo.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access forbidden: You do not have permission to delete this resource'
      });
    }

    await todo.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
