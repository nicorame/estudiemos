import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  due_date: string | null;
  created_at: string;
}

interface Props {
  userId: string;
}

export function TodoSection({ userId }: Props) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const { data } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    setTodos(data ?? []);
    setLoading(false);
  }

  async function addTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setAdding(true);

    const { data, error } = await supabase
      .from('todos')
      .insert({ user_id: userId, title: input.trim(), due_date: dueDate || null })
      .select()
      .single();

    if (!error && data) {
      setTodos(prev => [data, ...prev]);
      setInput('');
      setDueDate('');
    }
    setAdding(false);
  }

  async function toggleTodo(id: string, completed: boolean) {
    await supabase.from('todos').update({ completed: !completed }).eq('id', id);
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !completed } : t));
  }

  async function deleteTodo(id: string) {
    await supabase.from('todos').delete().eq('id', id);
    setTodos(prev => prev.filter(t => t.id !== id));
  }

  const pending = todos.filter(t => !t.completed);
  const done = todos.filter(t => t.completed);

  return (
    <div className="section-content">
      <div className="home-header">
        <h1 className="home-title">Tareas</h1>
        <p className="home-subtitle">{pending.length} pendiente{pending.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Formulario */}
      <form className="todo-form" onSubmit={addTodo}>
        <input
          className="todo-input"
          type="text"
          placeholder="Nueva tarea..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={adding}
        />
        <input
          className="todo-date"
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          disabled={adding}
        />
        <button className="todo-add-btn" type="submit" disabled={adding || !input.trim()}>
          {adding ? '...' : '+ Agregar'}
        </button>
      </form>

      {/* Lista */}
      {loading ? (
        <div className="todo-loading">Cargando...</div>
      ) : (
        <>
          {pending.length === 0 && done.length === 0 && (
            <div className="todo-empty">
              <span>📋</span>
              <p>No tenés tareas todavía. ¡Agregá una!</p>
            </div>
          )}

          {pending.length > 0 && (
            <div className="todo-list">
              {pending.map(todo => (
                <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
              ))}
            </div>
          )}

          {done.length > 0 && (
            <div className="todo-done-section">
              <p className="todo-done-label">Completadas ({done.length})</p>
              <div className="todo-list">
                {done.map(todo => (
                  <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function TodoItem({
  todo,
  onToggle,
  onDelete,
}: {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}) {
  const isOverdue = todo.due_date && !todo.completed && todo.due_date < new Date().toISOString().split('T')[0];

  return (
    <div className={`todo-item${todo.completed ? ' completed' : ''}`}>
      <button className="todo-check" onClick={() => onToggle(todo.id, todo.completed)}>
        {todo.completed
          ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          : <span className="todo-check-empty" />
        }
      </button>

      <div className="todo-text">
        <span className="todo-title">{todo.title}</span>
        {todo.due_date && (
          <span className={`todo-due${isOverdue ? ' overdue' : ''}`}>
            📅 {formatDate(todo.due_date)}
          </span>
        )}
      </div>

      <button className="todo-delete" onClick={() => onDelete(todo.id)}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  );
}

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
}
