import React, { useState, useEffect } from 'react';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../../api/client';
import { Check, Plus, Trash2, Clock, AlertCircle } from 'lucide-react';

export default function TodoWidget() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('medium');

  // Fetch todos on mount
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const res = await fetchTodos();
      if (res.success) {
        setTodos(res.data);
      }
    } catch (err) {
      console.error('Failed to load todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (todo) => {
    try {
      const updated = !todo.completed;
      // Optimistic update
      setTodos((prev) =>
        prev.map((t) => (t._id === todo._id ? { ...t, completed: updated } : t))
      );
      await updateTodo(todo._id, { completed: updated });
    } catch (err) {
      console.error('Failed to update todo:', err);
      loadTodos();
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const res = await addTodo({
        title: newTitle.trim(),
        priority: newPriority
      });
      if (res.success) {
        setTodos((prev) => [res.data, ...prev]);
        setNewTitle('');
        setIsAdding(false);
      }
    } catch (err) {
      console.error('Failed to create todo:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      setTodos((prev) => prev.filter((t) => t._id !== id));
      await deleteTodo(id);
    } catch (err) {
      console.error('Failed to delete todo:', err);
      loadTodos();
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="bg-focus-900/90 border border-zinc-800/80 rounded-2xl p-5 shadow-xl flex flex-col h-full backdrop-blur-md">
      {/* Header (Matching Mockup) */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <span>To-Do List</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400">
            {todos.filter((t) => !t.completed).length} left
          </span>
        </h3>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-semibold shadow-sm shadow-orange-500/30 transition-all active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Filter Tabs (All, Active, Completed) */}
      <div className="flex items-center gap-1 p-1 bg-focus-850 rounded-xl mb-4 border border-zinc-800/60">
        {['all', 'active', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
              filter === f
                ? 'bg-zinc-800 text-orange-400 font-bold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Inline Task Creator Form */}
      {isAdding && (
        <form onSubmit={handleCreate} className="mb-4 p-3 rounded-xl bg-focus-850 border border-orange-500/30 space-y-2.5 animate-in fade-in">
          <input
            type="text"
            required
            autoFocus
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="What are you studying today?"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500"
          />
          <div className="flex items-center justify-between">
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-zinc-300 focus:outline-none focus:border-orange-500"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-2.5 py-1 text-xs text-zinc-400 hover:text-zinc-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Task List */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-[220px]">
        {loading ? (
          <div className="flex items-center justify-center h-40 text-xs text-zinc-500">
            Loading tasks...
          </div>
        ) : filteredTodos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-center text-zinc-500">
            <p className="text-xs">No tasks found in this view.</p>
            <p className="text-[11px] text-zinc-600 mt-1">Click "+ Add Task" to set a study goal!</p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo._id}
              className={`group flex items-center justify-between p-3 rounded-xl border transition-all ${
                todo.completed
                  ? 'bg-zinc-900/40 border-zinc-800/40 text-zinc-500'
                  : 'bg-focus-850/80 border-zinc-800/80 hover:border-zinc-700 text-zinc-200'
              }`}
            >
              {/* Checkbox & Title */}
              <div
                onClick={() => handleToggle(todo)}
                className="flex items-center gap-3 cursor-pointer select-none flex-1 min-w-0"
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                    todo.completed
                      ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/40'
                      : 'border-2 border-zinc-700 hover:border-orange-500/60 bg-zinc-900'
                  }`}
                >
                  {todo.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className={`text-xs font-medium truncate ${
                      todo.completed ? 'line-through text-zinc-500' : 'text-zinc-200'
                    }`}
                  >
                    {todo.title}
                  </p>
                </div>
              </div>

              {/* Priority & Delete */}
              <div className="flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    todo.priority === 'high'
                      ? 'bg-red-500'
                      : todo.priority === 'medium'
                      ? 'bg-orange-500'
                      : 'bg-emerald-500'
                  }`}
                  title={`${todo.priority} priority`}
                />
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-red-400 transition-opacity"
                  title="Delete task"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
