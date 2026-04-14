import { onRequestGet as __api_d1_ts_onRequestGet } from "F:\\VSCodeProjects\\nextjs-cloudflare-demo\\functions\\api\\d1.ts"
import { onRequestGet as __api_kv_ts_onRequestGet } from "F:\\VSCodeProjects\\nextjs-cloudflare-demo\\functions\\api\\kv.ts"
import { onRequestPost as __api_kv_ts_onRequestPost } from "F:\\VSCodeProjects\\nextjs-cloudflare-demo\\functions\\api\\kv.ts"
import { onRequestGet as __api_r2_ts_onRequestGet } from "F:\\VSCodeProjects\\nextjs-cloudflare-demo\\functions\\api\\r2.ts"
import { onRequestPost as __api_r2_ts_onRequestPost } from "F:\\VSCodeProjects\\nextjs-cloudflare-demo\\functions\\api\\r2.ts"

export const routes = [
    {
      routePath: "/api/d1",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_d1_ts_onRequestGet],
    },
  {
      routePath: "/api/kv",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_kv_ts_onRequestGet],
    },
  {
      routePath: "/api/kv",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_kv_ts_onRequestPost],
    },
  {
      routePath: "/api/r2",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_r2_ts_onRequestGet],
    },
  {
      routePath: "/api/r2",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_r2_ts_onRequestPost],
    },
  ]