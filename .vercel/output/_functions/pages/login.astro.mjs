import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_y1XpGNYX.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_Dc6lGpzd.mjs';
import { G as GoogleAuthButton } from '../chunks/GoogleAuthButton_jIe57VxS.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Iniciar Sesi\xF3n", "data-astro-cid-sgpqyurt": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="login-container" data-astro-cid-sgpqyurt> <div class="login-card" data-astro-cid-sgpqyurt> <h1 data-astro-cid-sgpqyurt>Bienvenido</h1> <p class="subtitle" data-astro-cid-sgpqyurt>Inicia sesión en Estudiemos</p> ${renderComponent($$result2, "GoogleAuthButton", GoogleAuthButton, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/nicolasrame/Documents/Workspace/estudiemos/src/components/GoogleAuthButton", "client:component-export": "GoogleAuthButton", "data-astro-cid-sgpqyurt": true })} <p class="signup-link" data-astro-cid-sgpqyurt>
¿No tienes cuenta? <a href="/signup" data-astro-cid-sgpqyurt>Crea una aquí</a> </p> </div> </div> ` })} `;
}, "/Users/nicolasrame/Documents/Workspace/estudiemos/src/pages/login.astro", void 0);

const $$file = "/Users/nicolasrame/Documents/Workspace/estudiemos/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
