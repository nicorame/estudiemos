import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url, redirect }) => {
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');
  const error_description = url.searchParams.get('error_description');

  if (error) {
    return redirect(`/login?error=${encodeURIComponent(error_description || error)}`);
  }

  if (code) {
    // Supabase will handle the code internally
    // Redirect to dashboard, user session should be established
    return redirect('/dashboard');
  }

  // For implicit flow (hash-based tokens), redirect to a client-side handler
  return redirect('/auth/callback-client');
};
