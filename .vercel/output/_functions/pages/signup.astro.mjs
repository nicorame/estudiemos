import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_y1XpGNYX.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_Dc6lGpzd.mjs';
import { G as GoogleAuthButton } from '../chunks/GoogleAuthButton_35bLSAeZ.mjs';
/* empty css                                  */
export { renderers } from '../renderers.mjs';

const $$Signup = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Crear Cuenta", "data-astro-cid-sgjovbj7": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="signup-container" data-astro-cid-sgjovbj7> <div class="signup-card" data-astro-cid-sgjovbj7> <h1 data-astro-cid-sgjovbj7>Crea tu cuenta</h1> <p class="subtitle" data-astro-cid-sgjovbj7>Únete a Estudiemos y comienza tu viaje de aprendizaje</p> <div class="form-group" data-astro-cid-sgjovbj7> <label for="name" data-astro-cid-sgjovbj7>Nombre Completo</label> <input type="text" id="name" placeholder="Tu nombre" data-astro-cid-sgjovbj7> </div> <div class="form-group" data-astro-cid-sgjovbj7> <label for="email" data-astro-cid-sgjovbj7>Email</label> <input type="email" id="email" placeholder="tu@email.com" data-astro-cid-sgjovbj7> </div> <div class="form-group" data-astro-cid-sgjovbj7> <label for="password" data-astro-cid-sgjovbj7>Contraseña</label> <input type="password" id="password" placeholder="Mínimo 8 caracteres" data-astro-cid-sgjovbj7> </div> <div class="form-group" data-astro-cid-sgjovbj7> <label for="confirm-password" data-astro-cid-sgjovbj7>Confirmar Contraseña</label> <input type="password" id="confirm-password" placeholder="Confirma tu contraseña" data-astro-cid-sgjovbj7> </div> <div class="checkbox-group" data-astro-cid-sgjovbj7> <input type="checkbox" id="terms" data-astro-cid-sgjovbj7> <label for="terms" class="checkbox-label" data-astro-cid-sgjovbj7>
Acepto los <a href="/terms" data-astro-cid-sgjovbj7>términos y condiciones</a> </label> </div> <button class="signup-btn" data-astro-cid-sgjovbj7>Crear Cuenta</button> <div class="divider" data-astro-cid-sgjovbj7> <span data-astro-cid-sgjovbj7>o</span> </div> ${renderComponent($$result2, "GoogleAuthButton", GoogleAuthButton, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/nicolasrame/Documents/Workspace/estudiemos/src/components/GoogleAuthButton", "client:component-export": "GoogleAuthButton", "data-astro-cid-sgjovbj7": true })} <p class="login-link" data-astro-cid-sgjovbj7>
¿Ya tienes cuenta? <a href="/login" data-astro-cid-sgjovbj7>Inicia sesión aquí</a> </p> </div> </div> ` })} `;
}, "/Users/nicolasrame/Documents/Workspace/estudiemos/src/pages/signup.astro", void 0);

const $$file = "/Users/nicolasrame/Documents/Workspace/estudiemos/src/pages/signup.astro";
const $$url = "/signup";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Signup,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
