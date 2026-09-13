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
    <div className="bg-gradient-to-b from-[#0c0e15] to-[#08090d] border border-zinc-800/80 hover:border-zinc-700/80 rounded-2xl p-4 shadow-2xl flex flex-col h-full overflow-hidden text-zinc-100 relative">
      {/* Subtle Inner Highlight */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center shadow-sm shadow-orange-500/10">
            <CheckSquare className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-white font-syne leading-none flex items-center gap-2">
            <span>Task Matrix</span>
            <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400">
              {todos.filter((t) => !t.completed).length}
            </span>
          </h3>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl text-[11px] font-bold shadow-md shadow-orange-500/25 active:scale-95 transition-all"
        >
          <Plus className="w-3 h-3" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 p-1 bg-zinc-950/80 rounded-xl mb-2.5 border border-zinc-850 text-[11px]">
        {['all', 'active', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-1 rounded-lg font-medium capitalize transition-all ${
              filter === f
                ? 'bg-zinc-850 text-orange-400 font-bold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Inline Form */}
      {isAdding && (
        <form onSubmit={handleCreate} className="mb-2.5 p-2.5 rounded-xl bg-zinc-950/90 border border-orange-500/40 space-y-2 shadow-lg">
          <input
            type="text"
            required
            autoFocus
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="What milestone will you conquer?"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-orange-500"
          />
          <div className="flex items-center justify-between">
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-[10px] text-zinc-300 focus:outline-none focus:border-orange-500"
            >
              <option value="low">🟢 Low Priority</option>
              <option value="medium">🟠 Medium Priority</option>
              <option value="high">🔴 High Priority</option>
            </select>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-2.5 py-1 text-[10px] text-zinc-400 hover:text-zinc-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-[10px] font-bold rounded-lg shadow-sm"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Task List with Custom Scrollbar */}
      <div className="custom-scrollbar flex-1 overflow-y-auto space-y-1.5 pr-1 min-h-0">
        {loading ? (
          <div className="flex items-center justify-center h-28 text-xs text-zinc-500">
            Syncing tasks...
          </div>
        ) : filteredTodos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500/20 to-amber-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-2.5 shadow-sm shadow-orange-500/10">
              <CheckSquare className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-bold text-zinc-200">Clear Mind, Clear Objectives</h4>
            <p className="text-[10px] text-zinc-400 max-w-[200px] mt-0.5 mb-3 leading-snug">
              No tasks pending. Set milestones to drive your study momentum.
            </p>
            <button
              onClick={() => setIsAdding(true)}
              className="px-3 py-1.5 bg-orange-500/15 hover:bg-orange-500 text-orange-400 hover:text-white border border-orange-500/30 rounded-xl text-[11px] font-bold transition-all active:scale-95"
            >
              + Add First Task
            </button>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo._id}
              className={`group flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                todo.completed
                  ? 'bg-zinc-950/40 border-zinc-900 text-zinc-500'
                  : 'bg-zinc-950/70 border-zinc-850/80 hover:border-zinc-750 hover:bg-zinc-900/60 text-zinc-200'
              }`}
            >
              <div
                onClick={() => handleToggle(todo)}
                className="flex items-center gap-2.5 cursor-pointer select-none flex-1 min-w-0"
              >
                <div
                  className={`w-4 h-4 rounded-md flex items-center justify-center transition-all ${
                    todo.completed
                      ? 'bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-sm shadow-orange-500/40'
                      : 'border border-zinc-700 hover:border-orange-500 bg-zinc-900'
                  }`}
                >
                  {todo.completed && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <p className={`text-xs font-medium truncate ${todo.completed ? 'line-through text-zinc-500' : 'text-zinc-200'}`}>
                  {todo.title}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    todo.priority === 'high' ? 'bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.6)]' : todo.priority === 'medium' ? 'bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,0.6)]' : 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]'
                  }`}
                  title={`${todo.priority} priority`}
                />
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-red-400 transition-opacity"
                  title="Delete"
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
