import React, { useState, useEffect } from 'react';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../../api/client';
import { Check, Plus, Trash2, CheckSquare } from 'lucide-react';

export default function TodoWidget() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('medium');

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
    <div className="bg-[#0b0c0f] border border-zinc-850 rounded-2xl p-3.5 shadow-xl flex flex-col h-full overflow-hidden text-zinc-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-orange-500/15 text-orange-400 flex items-center justify-center">
            <CheckSquare className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs font-bold text-white leading-none flex items-center gap-1.5">
            <span>To-Do List</span>
            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-full bg-orange-500/15 text-orange-400">
              {todos.filter((t) => !t.completed).length}
            </span>
          </h3>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1 px-2.5 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-[11px] font-semibold shadow-sm shadow-orange-500/30 active:scale-95 transition-all"
        >
          <Plus className="w-3 h-3" />
          <span>Add</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 p-0.5 bg-zinc-950 rounded-xl mb-2 border border-zinc-850 text-[11px]">
        {['all', 'active', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-1 rounded-lg font-medium capitalize transition-all ${
              filter === f
                ? 'bg-zinc-850 text-orange-400 font-bold shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Inline Form */}
      {isAdding && (
        <form onSubmit={handleCreate} className="mb-2 p-2 rounded-xl bg-zinc-950 border border-orange-500/30 space-y-1.5">
          <input
            type="text"
            required
            autoFocus
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="What will you study?"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-orange-500"
          />
          <div className="flex items-center justify-between">
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-0.5 text-[10px] text-zinc-300"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-2 py-0.5 text-[10px] text-zinc-500 hover:text-zinc-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-2.5 py-0.5 bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-semibold rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Task List with Custom Scrollbar */}
      <div className="custom-scrollbar flex-1 overflow-y-auto space-y-1 pr-1">
        {loading ? (
          <div className="flex items-center justify-center h-28 text-xs text-zinc-600">
            Loading tasks...
          </div>
        ) : filteredTodos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-28 text-center text-zinc-600">
            <p className="text-xs">No tasks found</p>
            <p className="text-[10px] text-zinc-700 mt-0.5">Click "+ Add" to create one</p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo._id}
              className={`group flex items-center justify-between p-2 rounded-xl border transition-all ${
                todo.completed
                  ? 'bg-zinc-950/40 border-zinc-900 text-zinc-600'
                  : 'bg-zinc-900/80 border-zinc-850 hover:border-zinc-750 text-zinc-200'
              }`}
            >
              <div
                onClick={() => handleToggle(todo)}
                className="flex items-center gap-2 cursor-pointer select-none flex-1 min-w-0"
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center transition-all ${
                    todo.completed
                      ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/40'
                      : 'border border-zinc-700 hover:border-orange-500 bg-zinc-950'
                  }`}
                >
                  {todo.completed && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <p className={`text-xs font-medium truncate ${todo.completed ? 'line-through text-zinc-600' : 'text-zinc-200'}`}>
                  {todo.title}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    todo.priority === 'high' ? 'bg-red-500' : todo.priority === 'medium' ? 'bg-orange-500' : 'bg-emerald-500'
                  }`}
                />
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="opacity-0 group-hover:opacity-100 p-0.5 text-zinc-500 hover:text-red-400 transition-opacity"
                  title="Delete"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
