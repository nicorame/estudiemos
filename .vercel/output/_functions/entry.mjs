import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_b_d-1inD.mjs';
import { manifest } from './manifest_ybrYu75k.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/auth/callback.astro.mjs');
const _page2 = () => import('./pages/auth/callback-client.astro.mjs');
const _page3 = () => import('./pages/dashboard.astro.mjs');
const _page4 = () => import('./pages/login.astro.mjs');
const _page5 = () => import('./pages/signup.astro.mjs');
const _page6 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/auth/callback.ts", _page1],
    ["src/pages/auth/callback-client.astro", _page2],
    ["src/pages/dashboard.astro", _page3],
    ["src/pages/login.astro", _page4],
    ["src/pages/signup.astro", _page5],
    ["src/pages/index.astro", _page6]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "441be979-b979-4c7b-9863-9e4581bee296",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
