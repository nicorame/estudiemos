import 'piccolore';
import { o as decodeKey } from './chunks/astro/server_y1XpGNYX.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BXHHnEpd.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/nicolasrame/Documents/Workspace/estudiemos/","cacheDir":"file:///Users/nicolasrame/Documents/Workspace/estudiemos/node_modules/.astro/","outDir":"file:///Users/nicolasrame/Documents/Workspace/estudiemos/dist/","srcDir":"file:///Users/nicolasrame/Documents/Workspace/estudiemos/src/","publicDir":"file:///Users/nicolasrame/Documents/Workspace/estudiemos/public/","buildClientDir":"file:///Users/nicolasrame/Documents/Workspace/estudiemos/dist/client/","buildServerDir":"file:///Users/nicolasrame/Documents/Workspace/estudiemos/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/auth/callback","isIndex":false,"type":"endpoint","pattern":"^\\/auth\\/callback\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"callback","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/callback.ts","pathname":"/auth/callback","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/dashboard.DQ_lFJQv.css"},{"type":"inline","content":"main[data-astro-cid-sckkx6r4]{min-height:100vh;display:flex;flex-direction:column}\n"}],"routeData":{"route":"/auth/callback-client","isIndex":false,"type":"page","pattern":"^\\/auth\\/callback-client\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"callback-client","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/callback-client.astro","pathname":"/auth/callback-client","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/dashboard.DQ_lFJQv.css"},{"type":"inline","content":"body{background-color:#0a0a0a;color:#e5e7eb;min-height:100vh}\n"}],"routeData":{"route":"/dashboard","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard.astro","pathname":"/dashboard","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/dashboard.DQ_lFJQv.css"},{"type":"inline","content":"main[data-astro-cid-sckkx6r4]{min-height:100vh;display:flex;flex-direction:column}\n.login-container[data-astro-cid-sgpqyurt]{display:flex;justify-content:center;align-items:center;min-height:100vh;padding:1rem;background:linear-gradient(135deg,var(--primary-color) 0%,var(--secondary-color) 100%)}.login-card[data-astro-cid-sgpqyurt]{width:100%;max-width:400px;padding:2rem;background-color:var(--surface);border-radius:.75rem;box-shadow:0 20px 25px -5px #0000001a}h1[data-astro-cid-sgpqyurt]{margin-bottom:.5rem;font-size:1.875rem;color:var(--text-primary);text-align:center}.subtitle[data-astro-cid-sgpqyurt]{text-align:center;color:var(--text-secondary);margin-bottom:2rem}.form-group[data-astro-cid-sgpqyurt]{margin-bottom:1.5rem}label[data-astro-cid-sgpqyurt]{display:block;margin-bottom:.5rem;font-weight:500;color:var(--text-primary)}input[data-astro-cid-sgpqyurt]{width:100%;padding:.75rem;border:1px solid var(--border);border-radius:.375rem;font-size:1rem;transition:border-color .2s,box-shadow .2s}input[data-astro-cid-sgpqyurt]:focus{outline:none;border-color:var(--primary-color);box-shadow:0 0 0 3px #6366f11a}.login-btn[data-astro-cid-sgpqyurt]{width:100%;padding:.75rem;margin-bottom:1.5rem;background-color:var(--primary-color);color:#fff;border:none;border-radius:.375rem;font-size:1rem;font-weight:600;cursor:pointer;transition:background-color .2s}.login-btn[data-astro-cid-sgpqyurt]:hover{background-color:#4f46e5}.divider[data-astro-cid-sgpqyurt]{display:flex;align-items:center;margin:1.5rem 0;color:var(--text-secondary)}.divider[data-astro-cid-sgpqyurt]:before,.divider[data-astro-cid-sgpqyurt]:after{content:\"\";flex:1;height:1px;background-color:var(--border)}.divider[data-astro-cid-sgpqyurt] span[data-astro-cid-sgpqyurt]{padding:0 .75rem}.signup-link[data-astro-cid-sgpqyurt]{text-align:center;color:var(--text-secondary)}.signup-link[data-astro-cid-sgpqyurt] a[data-astro-cid-sgpqyurt]{color:var(--primary-color);font-weight:600;text-decoration:none}.signup-link[data-astro-cid-sgpqyurt] a[data-astro-cid-sgpqyurt]:hover{text-decoration:underline}\n"}],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/dashboard.DQ_lFJQv.css"},{"type":"inline","content":"main[data-astro-cid-sckkx6r4]{min-height:100vh;display:flex;flex-direction:column}\n.signup-container[data-astro-cid-sgjovbj7]{display:flex;justify-content:center;align-items:center;min-height:100vh;padding:1rem;background:linear-gradient(135deg,var(--primary-color) 0%,var(--secondary-color) 100%)}.signup-card[data-astro-cid-sgjovbj7]{width:100%;max-width:450px;padding:2rem;background-color:var(--surface);border-radius:.75rem;box-shadow:0 20px 25px -5px #0000001a}h1[data-astro-cid-sgjovbj7]{margin-bottom:.5rem;font-size:1.875rem;color:var(--text-primary);text-align:center}.subtitle[data-astro-cid-sgjovbj7]{text-align:center;color:var(--text-secondary);margin-bottom:2rem}.form-group[data-astro-cid-sgjovbj7]{margin-bottom:1.5rem}label[data-astro-cid-sgjovbj7]{display:block;margin-bottom:.5rem;font-weight:500;color:var(--text-primary)}input[data-astro-cid-sgjovbj7][type=text],input[data-astro-cid-sgjovbj7][type=email],input[data-astro-cid-sgjovbj7][type=password]{width:100%;padding:.75rem;border:1px solid var(--border);border-radius:.375rem;font-size:1rem;transition:border-color .2s,box-shadow .2s}input[data-astro-cid-sgjovbj7][type=text]:focus,input[data-astro-cid-sgjovbj7][type=email]:focus,input[data-astro-cid-sgjovbj7][type=password]:focus{outline:none;border-color:var(--primary-color);box-shadow:0 0 0 3px #6366f11a}.checkbox-group[data-astro-cid-sgjovbj7]{display:flex;align-items:center;gap:.75rem;margin-bottom:1.5rem}input[data-astro-cid-sgjovbj7][type=checkbox]{width:20px;height:20px;cursor:pointer}.checkbox-label[data-astro-cid-sgjovbj7]{margin:0;font-size:.875rem;color:var(--text-secondary);cursor:pointer}.checkbox-label[data-astro-cid-sgjovbj7] a[data-astro-cid-sgjovbj7]{color:var(--primary-color)}.signup-btn[data-astro-cid-sgjovbj7]{width:100%;padding:.75rem;margin-bottom:1.5rem;background-color:var(--primary-color);color:#fff;border:none;border-radius:.375rem;font-size:1rem;font-weight:600;cursor:pointer;transition:background-color .2s}.signup-btn[data-astro-cid-sgjovbj7]:hover{background-color:#4f46e5}.divider[data-astro-cid-sgjovbj7]{display:flex;align-items:center;margin:1.5rem 0;color:var(--text-secondary)}.divider[data-astro-cid-sgjovbj7]:before,.divider[data-astro-cid-sgjovbj7]:after{content:\"\";flex:1;height:1px;background-color:var(--border)}.divider[data-astro-cid-sgjovbj7] span[data-astro-cid-sgjovbj7]{padding:0 .75rem}.login-link[data-astro-cid-sgjovbj7]{text-align:center;color:var(--text-secondary)}.login-link[data-astro-cid-sgjovbj7] a[data-astro-cid-sgjovbj7]{color:var(--primary-color);font-weight:600;text-decoration:none}.login-link[data-astro-cid-sgjovbj7] a[data-astro-cid-sgjovbj7]:hover{text-decoration:underline}\n"}],"routeData":{"route":"/signup","isIndex":false,"type":"page","pattern":"^\\/signup\\/?$","segments":[[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signup.astro","pathname":"/signup","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/dashboard.DQ_lFJQv.css"},{"type":"inline","content":"main[data-astro-cid-sckkx6r4]{min-height:100vh;display:flex;flex-direction:column}\n"},{"type":"external","src":"/_astro/index.COgRX7Fc.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/nicolasrame/Documents/Workspace/estudiemos/src/pages/dashboard.astro",{"propagation":"none","containsHead":true}],["/Users/nicolasrame/Documents/Workspace/estudiemos/src/pages/auth/callback-client.astro",{"propagation":"none","containsHead":true}],["/Users/nicolasrame/Documents/Workspace/estudiemos/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/nicolasrame/Documents/Workspace/estudiemos/src/pages/login.astro",{"propagation":"none","containsHead":true}],["/Users/nicolasrame/Documents/Workspace/estudiemos/src/pages/signup.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/auth/callback@_@ts":"pages/auth/callback.astro.mjs","\u0000@astro-page:src/pages/auth/callback-client@_@astro":"pages/auth/callback-client.astro.mjs","\u0000@astro-page:src/pages/dashboard@_@astro":"pages/dashboard.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/signup@_@astro":"pages/signup.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_D_Ux2-HE.mjs","/Users/nicolasrame/Documents/Workspace/estudiemos/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BmmxvlL-.mjs","/Users/nicolasrame/Documents/Workspace/estudiemos/src/components/CallbackHandler":"_astro/CallbackHandler.MhJz9_Ti.js","/Users/nicolasrame/Documents/Workspace/estudiemos/src/components/Dashboard":"_astro/Dashboard.Cq_jUtVW.js","/Users/nicolasrame/Documents/Workspace/estudiemos/src/components/GoogleAuthButton":"_astro/GoogleAuthButton.C18AREv8.js","@astrojs/react/client.js":"_astro/client.nc8uITnr.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/dashboard.DQ_lFJQv.css","/_astro/index.COgRX7Fc.css","/_astro/CallbackHandler.MhJz9_Ti.js","/_astro/Dashboard.Cq_jUtVW.js","/_astro/GoogleAuthButton.C18AREv8.js","/_astro/client.nc8uITnr.js","/_astro/index.DK-fsZOb.js","/_astro/supabase.BDzTBRnM.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"dwONhIbb9QlikoJ5C3XNZs+9CLYaF+wMbC1B6ctqueQ="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
