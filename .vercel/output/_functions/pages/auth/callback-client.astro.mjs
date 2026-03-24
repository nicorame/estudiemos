import { e as createComponent, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_y1XpGNYX.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_Dc6lGpzd.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { s as supabase } from '../../chunks/supabase_Css712tW.mjs';
export { renderers } from '../../renderers.mjs';

function CallbackHandler() {
  const [status, setStatus] = useState("Procesando autenticación...");
  const [error, setError] = useState(null);
  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        if (code) {
          const { error: error2 } = await supabase.auth.exchangeCodeForSession(code);
          if (error2) throw error2;
        } else {
          const hash = window.location.hash.substring(1);
          if (!hash) throw new Error("No authentication data found");
          const hashParams = new URLSearchParams(hash);
          const accessToken = hashParams.get("access_token");
          const refreshToken = hashParams.get("refresh_token");
          if (!accessToken) throw new Error("No access token found");
          const { error: error2 } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || ""
          });
          if (error2) throw error2;
        }
        setStatus("¡Autenticación exitosa! Redirigiendo...");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 500);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        setStatus("Error en la autenticación");
        setTimeout(() => {
          window.location.href = `/login?error=${encodeURIComponent(message)}`;
        }, 2e3);
      }
    };
    handleCallback();
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "callback-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "callback-card", children: [
      /* @__PURE__ */ jsx("div", { className: "spinner" }),
      /* @__PURE__ */ jsx("p", { className: "status", children: status }),
      error && /* @__PURE__ */ jsx("p", { className: "error", children: error })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
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
      ` })
  ] });
}

const $$CallbackClient = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Autenticando..." }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CallbackHandler", CallbackHandler, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/nicolasrame/Documents/Workspace/estudiemos/src/components/CallbackHandler", "client:component-export": "CallbackHandler" })} ` })}`;
}, "/Users/nicolasrame/Documents/Workspace/estudiemos/src/pages/auth/callback-client.astro", void 0);

const $$file = "/Users/nicolasrame/Documents/Workspace/estudiemos/src/pages/auth/callback-client.astro";
const $$url = "/auth/callback-client";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CallbackClient,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
