import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function CallbackHandler() {
  const [status, setStatus] = useState('Procesando autenticación...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the hash from the URL
        const hash = window.location.hash.substring(1);

        if (!hash) {
          throw new Error('No authentication data found');
        }

        // Parse the hash parameters
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        const expiresIn = params.get('expires_in');

        if (!accessToken) {
          throw new Error('No access token found');
        }

        // Create a session with the tokens
        await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || '',
        });

        setStatus('¡Autenticación exitosa! Redirigiendo...');

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        setStatus('Error en la autenticación');

        // Redirect to login after 2 seconds
        setTimeout(() => {
          window.location.href = `/login?error=${encodeURIComponent(message)}`;
        }, 2000);
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="callback-container">
      <div className="callback-card">
        <div className="spinner"></div>
        <p className="status">{status}</p>
        {error && <p className="error">{error}</p>}
      </div>

      <style>{`
        .callback-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 1rem;
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
        }

        .callback-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          padding: 2rem;
          background-color: var(--surface);
          border-radius: 0.75rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
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

        .status {
          color: var(--text-primary);
          font-weight: 500;
          text-align: center;
        }

        .error {
          color: #ef4444;
          font-size: 0.875rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
