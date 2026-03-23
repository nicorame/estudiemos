import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url, redirect }) => {
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');
  const error_description = url.searchParams.get('error_description');

  if (error) {
    return redirect(`/login?error=${encodeURIComponent(error_description || error)}`);
  }

  // Pass code to client-side handler so it can exchange it using the PKCE verifier in localStorage
  if (code) {
    return redirect(`/auth/callback-client?code=${encodeURIComponent(code)}`);
  }

  // For implicit flow (hash-based tokens)
  return redirect('/auth/callback-client');
};
