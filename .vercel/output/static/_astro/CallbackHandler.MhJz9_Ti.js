import{j as r,s as d}from"./supabase.BDzTBRnM.js";import{r as n}from"./index.DK-fsZOb.js";function f(){const[c,t]=n.useState("Procesando autenticación..."),[o,i]=n.useState(null);return n.useEffect(()=>{(async()=>{try{const a=window.location.hash.substring(1);if(!a)throw new Error("No authentication data found");const e=new URLSearchParams(a),s=e.get("access_token"),l=e.get("refresh_token"),h=e.get("expires_in");if(!s)throw new Error("No access token found");await d.auth.setSession({access_token:s,refresh_token:l||""}),t("¡Autenticación exitosa! Redirigiendo..."),setTimeout(()=>{window.location.href="/dashboard"},1e3)}catch(a){const e=a instanceof Error?a.message:"Unknown error";i(e),t("Error en la autenticación"),setTimeout(()=>{window.location.href=`/login?error=${encodeURIComponent(e)}`},2e3)}})()},[]),r.jsxs("div",{className:"callback-container",children:[r.jsxs("div",{className:"callback-card",children:[r.jsx("div",{className:"spinner"}),r.jsx("p",{className:"status",children:c}),o&&r.jsx("p",{className:"error",children:o})]}),r.jsx("style",{children:`
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
      `})]})}export{f as CallbackHandler};
