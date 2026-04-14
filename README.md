# Next.js + Cloudflare Pages Demo

使用 **D1**、**R2**、**KV** 的 Next.js 示例，部署在 Cloudflare Pages。

采用 Cloudflare Pages Functions（`functions/` 目录）处理 API，前端使用 Next.js 静态导出。

## 项目结构

```
app/
  layout.tsx
  page.tsx        # 前端交互页面
functions/
  api/
    d1.ts         # D1 数据库 API（Cloudflare Pages Function）
    kv.ts         # KV 键值存储 API
    r2.ts         # R2 对象存储 API
wrangler.jsonc    # Cloudflare 绑定配置
next.config.js    # 静态导出配置（dist 目录）
```

## 前置要求

- Node.js 18+
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) 已登录

```bash
npm install -g wrangler
wrangler login
```

## 1. 安装依赖

```bash
cd nextjs-cloudflare-demo
npm install
```

## 2. 创建 Cloudflare 资源

### D1 数据库

```bash
wrangler d1 create nextjs-demo-d1
```

创建后，把返回的 `database_id` 填入 `wrangler.jsonc` 的 `d1_databases[0].database_id`。

### KV 命名空间

```bash
wrangler kv namespace create nextjs-demo-kv
```

创建后，把返回的 `id` 填入 `wrangler.jsonc` 的 `kv_namespaces[0].id`。

### R2 Bucket

```bash
wrangler r2 bucket create nextjs-demo-r2
```

bucket 名称需与 `wrangler.jsonc` 中 `r2_buckets[0].bucket_name` 一致。

## 3. 本地开发

```bash
# 构建 Next.js 静态输出
npm run build

# 本地模拟 Cloudflare 环境运行
npm run pages:dev
```

访问 http://localhost:8788

## 4. 部署

```bash
npm run build
npm run pages:deploy
```

或者连接 Git 仓库到 Cloudflare Pages 实现自动部署：

1. 将代码 push 到 GitHub
2. 进入 Cloudflare Dashboard → Pages → Create a project
3. 选择仓库，Build command 填 `npm run build`，Output directory 填 `dist`
4. 在 Pages 项目的 Settings → Functions → Bindings 中绑定 D1 / KV / R2

## 关键技术点

- **Cloudflare Pages Functions**: 使用 `functions/` 目录编写边缘函数，直接访问 `context.env.DB` / `context.env.KV` / `context.env.R2`
- **静态导出**: `next.config.js` 使用 `output: 'export'`，生成纯静态前端资源到 `dist`
- **本地模拟**: `wrangler pages dev` 同时提供静态资源和 Functions 的执行环境
