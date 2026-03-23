import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

export function DashboardClient() {
  const { user, loading, error, logout } = useAuth();

  useEffect(() => {
    // Redirige al login si no hay usuario autenticado
    if (!loading && !user) {
      window.location.href = '/login';
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h1>Error</h1>
        <p>{error}</p>
        <a href="/login">Volver al login</a>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <nav className="dashboard-navbar">
        <div className="navbar-content">
          <h1>Estudiemos</h1>
          <div className="user-menu">
            <span>Hola, {user?.email}</span>
            <button onClick={logout} className="logout-btn">
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="welcome-section">
          <h1>Bienvenido de vuelta</h1>
          <p>ID de usuario: {user?.id}</p>
        </div>

        <div className="courses-section">
          <h2>Tus Cursos</h2>
          <p className="placeholder">
            Los cursos aparecerán aquí próximamente...
          </p>
        </div>

        <div className="progress-section">
          <h2>Tu Progreso</h2>
          <p className="placeholder">
            Comenzarás a ver tu progreso aquí una vez que completes lecciones...
          </p>
        </div>
      </main>
    </div>
  );
}

const styles = `
  .loading-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    gap: 1rem;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--border);
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .error-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    gap: 1rem;
    text-align: center;
  }

  .error-container a {
    padding: 0.75rem 1.5rem;
    background-color: var(--primary-color);
    color: white;
    border-radius: 0.375rem;
    text-decoration: none;
  }

  .dashboard-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .dashboard-navbar {
    background-color: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .navbar-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .navbar-content h1 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--primary-color);
  }

  .user-menu {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--text-secondary);
  }

  .logout-btn {
    padding: 0.5rem 1rem;
    background-color: transparent;
    color: var(--text-primary);
    border: 1px solid var(--border);
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .logout-btn:hover {
    background-color: var(--background);
    border-color: var(--primary-color);
  }

  .dashboard-main {
    flex: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    width: 100%;
  }

  .welcome-section {
    margin-bottom: 2rem;
  }

  .welcome-section h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .welcome-section p {
    color: var(--text-secondary);
  }

  .courses-section,
  .progress-section {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background-color: var(--surface);
    border: 1px solid var(--border);
    border-radius: 0.5rem;
  }

  .courses-section h2,
  .progress-section h2 {
    margin-bottom: 1rem;
  }

  .placeholder {
    color: var(--text-secondary);
    font-style: italic;
  }
`;
