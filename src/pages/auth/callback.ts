import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url, redirect }) => {
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    return redirect(`/login?error=${encodeURIComponent(error)}`);
  }

  if (!code) {
    return redirect('/login?error=missing_code');
  }

  // Redirige al dashboard después de autenticación exitosa
  return redirect('/dashboard');
};
