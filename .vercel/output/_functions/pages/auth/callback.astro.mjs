export { renderers } from '../../renderers.mjs';

const GET = async ({ url, redirect }) => {
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  const error_description = url.searchParams.get("error_description");
  if (error) {
    return redirect(`/login?error=${encodeURIComponent(error_description || error)}`);
  }
  if (code) {
    return redirect(`/auth/callback-client?code=${encodeURIComponent(code)}`);
  }
  return redirect("/auth/callback-client");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
