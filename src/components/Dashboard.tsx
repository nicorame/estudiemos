import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { TodoSection } from './TodoSection';
import { PomodoroSection } from './PomodoroSection';

type Section = 'home' | 'pomodoro' | 'todos' | 'spaced' | 'ranking';

interface User {
  id: string;
  email: string;
  user_metadata: { name?: string; avatar_url?: string };
}

const NAV_ITEMS: { id: Section; label: string; icon: string }[] = [
  { id: 'home',     label: 'Inicio',            icon: '🏠' },
  { id: 'pomodoro', label: 'Pomodoro',           icon: '⏱️' },
  { id: 'todos',    label: 'Tareas',             icon: '✅' },
  { id: 'spaced',   label: 'Estudio espaciado',  icon: '🧠' },
  { id: 'ranking',  label: 'Ranking',            icon: '🏆' },
];

export function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [section, setSection] = useState<Section>('home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        window.location.href = '/';
        return;
      }
      // Garantizar que existe el perfil (por si el trigger no disparó)
      await supabase.from('profiles').upsert({
        id: data.user.id,
        username: data.user.user_metadata?.name ?? data.user.email,
        avatar_url: data.user.user_metadata?.avatar_url ?? null,
      }, { onConflict: 'id', ignoreDuplicates: true });

      setUser(data.user as User);
      setLoading(false);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="dash-loading">
        <div className="dash-spinner"></div>
      </div>
    );
  }

  const name = user?.user_metadata?.name ?? user?.email ?? 'Usuario';
  const avatar = user?.user_metadata?.avatar_url;
  const initials = name.charAt(0).toUpperCase();

  return (
    <div className="dash-shell">
      {/* SIDEBAR */}
      <aside className="dash-sidebar">
        <div className="sidebar-logo">estudiemos</div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`sidebar-item${section === item.id ? ' active' : ''}`}
              onClick={() => setSection(item.id)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            {avatar
              ? <img src={avatar} alt={name} className="user-avatar" />
              : <div className="user-initials">{initials}</div>
            }
            <span className="user-name">{name.split(' ')[0]}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout} title="Cerrar sesión">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dash-main">
        {section === 'home'     && <HomeSection user={user} onNavigate={setSection} />}
        {section === 'pomodoro' && <PomodoroSection userId={user!.id} />}
        {section === 'todos'    && <TodoSection userId={user!.id} />}
        {section === 'spaced'   && <Placeholder title="Estudio espaciado" icon="🧠" desc="Próximamente" />}
        {section === 'ranking'  && <Placeholder title="Ranking" icon="🏆" desc="Próximamente" />}
      </main>
    </div>
  );
}

/* ---- HOME SECTION ---- */
function HomeSection({ user, onNavigate }: { user: User | null; onNavigate: (s: Section) => void }) {
  const [streak, setStreak] = useState<number | null>(null);
  const [totalMinutes, setTotalMinutes] = useState<number | null>(null);
  const [pendingTodos, setPendingTodos] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;

    // Racha
    supabase.rpc('get_streak', { p_user_id: user.id })
      .then(({ data }) => setStreak(data ?? 0));

    // Minutos totales
    supabase
      .from('pomodoro_sessions')
      .select('duration_minutes')
      .eq('user_id', user.id)
      .eq('completed', true)
      .then(({ data }) => {
        const total = (data ?? []).reduce((sum, s) => sum + s.duration_minutes, 0);
        setTotalMinutes(total);
      });

    // Tareas pendientes
    supabase
      .from('todos')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('completed', false)
      .then(({ count }) => setPendingTodos(count ?? 0));
  }, [user]);

  const name = user?.user_metadata?.name ?? 'Usuario';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Buenos días' : hour < 19 ? 'Buenas tardes' : 'Buenas noches';

  return (
    <div className="section-content">
      <div className="home-header">
        <h1 className="home-title">{greeting}, {name.split(' ')[0]} 👋</h1>
        <p className="home-subtitle">¿Qué vas a estudiar hoy?</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-value">{streak ?? '—'}</div>
          <div className="stat-label">días de racha</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-value">{totalMinutes ?? '—'}</div>
          <div className="stat-label">minutos estudiados</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{pendingTodos ?? '—'}</div>
          <div className="stat-label">tareas pendientes</div>
        </div>
      </div>

      <div className="quick-actions">
        <h2 className="section-heading">Accesos rápidos</h2>
        <div className="actions-grid">
          <QuickCard icon="⏱️" title="Iniciar Pomodoro" desc="Arrancá una sesión de estudio" onClick={() => onNavigate('pomodoro')} />
          <QuickCard icon="✅" title="Nueva tarea" desc="Agregá algo a tu lista" onClick={() => onNavigate('todos')} />
          <QuickCard icon="🧠" title="Repasar hoy" desc="Temas que vencen hoy" onClick={() => onNavigate('spaced')} />
        </div>
      </div>
    </div>
  );
}

function QuickCard({ icon, title, desc, onClick }: { icon: string; title: string; desc: string; onClick: () => void }) {
  return (
    <button className="quick-card" onClick={onClick}>
      <span className="quick-icon">{icon}</span>
      <div>
        <div className="quick-title">{title}</div>
        <div className="quick-desc">{desc}</div>
      </div>
    </button>
  );
}

function Placeholder({ title, icon, desc }: { title: string; icon: string; desc: string }) {
  return (
    <div className="section-content placeholder-section">
      <div className="placeholder-icon">{icon}</div>
      <h1 className="placeholder-title">{title}</h1>
      <p className="placeholder-desc">{desc}</p>
    </div>
  );
}
