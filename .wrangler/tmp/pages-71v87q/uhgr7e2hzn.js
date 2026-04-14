// <define:__ROUTES__>
var define_ROUTES_default = { version: 1, description: "Built with @cloudflare/next-on-pages@1.13.16.", include: ["/*"], exclude: ["/_next/static/*"] };

// node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "F:\\VSCodeProjects\\nextjs-cloudflare-demo\\.wrangler\\tmp\\pages-71v87q\\bundledWorker-0.6690572194853652.mjs";
import { isRoutingRuleMatch } from "F:\\VSCodeProjects\\nextjs-cloudflare-demo\\node_modules\\wrangler\\templates\\pages-dev-util.ts";
export * from "F:\\VSCodeProjects\\nextjs-cloudflare-demo\\.wrangler\\tmp\\pages-71v87q\\bundledWorker-0.6690572194853652.mjs";
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = worker;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  pages_dev_pipeline_default as default
};
//# sourceMappingURL=uhgr7e2hzn.js.map
