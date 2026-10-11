# koa2-api-boilerplate

[![License: MIT](https://img.shields.io/github/license/NathanBoy/koa2-api-boilerplate)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![CI](https://img.shields.io/github/actions/workflow/status/NathanBoy/koa2-api-boilerplate/ci.yml)](.github/workflows/ci.yml)

一个轻量、干净、开箱即用的 **Koa2 + Mongoose** RESTful API 脚手架。采用经典的分层架构（router → controller → service → model）和洋葱模型中间件，内置统一的响应格式、错误处理、请求日志、CORS、压缩与会话等常见能力，适合作为个人后端项目或新服务的基础骨架。

> 语言：Node.js ≥ 18 · 框架：Koa 2 · 数据库：MongoDB (Mongoose)

## ✨ 特性

- **经典分层架构**：router / controller / service / model 职责清晰，业务代码好维护、易扩展
- **洋葱模型中间件**：统一响应、全局错误处理、请求日志、CORS、gzip 压缩、签名 Cookie 会话
- **统一响应格式**：所有接口返回 `{ code, message, data }`，前后端对接约定明确
- **配置中心**：全部配置通过环境变量注入（支持 `.env`），开发 / 生产环境分离
- **示例资源**：内置一个完整的 `Post` 增删改查示例，展示分层写法与 Mongoose 用法
- **测试保障**：jest + supertest 接口测试 + ESLint/Prettier 代码规范，CI 自动校验
- **零黑盒依赖**：会话为自实现签名 Cookie，中间件逻辑透明、可读，适合学习

## 🗂 目录结构

```
kok/
├── app.js                  # Koa 应用入口，组装中间件栈
├── server.js               # 启动脚本：连接 DB 并监听端口
├── config/
│   └── index.js            # 集中式配置（环境变量驱动）
├── middleware/             # 中间件（洋葱模型）
│   ├── error-handler.js    # 全局错误处理
│   ├── logger.js           # 请求日志
│   ├── response.js         # 统一响应 ctx.success / ctx.fail
│   ├── cors.js             # 跨域
│   ├── session.js          # 签名 Cookie 会话（示例实现）
│   └── not-found.js        # JSON 404
├── router/
│   └── index.js            # 路由定义
├── controller/             # 控制器：解析请求、调用 service、组装响应
│   ├── health.controller.js
│   └── post.controller.js
├── service/                # 业务层：逻辑与数据访问
│   ├── db.js
│   └── post.service.js
├── model/                  # Mongoose 数据模型
│   └── post.model.js
├── .env.example            # 环境变量示例
└── package.json
```

## 🚀 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 准备环境变量（可选，默认值开箱即用）
cp .env.example .env

# 3. 启动服务（需本机已启动 MongoDB，未启动也能跑，但 /api 会报错）
npm run dev        # 开发模式（自动重启）
# 或
npm start          # 生产模式
```

启动后访问 <http://localhost:3000/health>，应返回：

```json
{ "code": 0, "message": "ok", "data": { "uptime": 0.1, "timestamp": 1690000000000 } }
```

## 🧪 测试与规范

```bash
npm test           # 运行 jest 接口测试（health / 404 / Post CRUD）
npm run lint       # ESLint 代码检查
npm run lint:fix   # 自动修复可修复的 lint 问题
npm run format     # Prettier 格式化代码
```

这些步骤已接入 GitHub Actions（CI）：每次 push / PR 到 `main` 会自动执行 **lint + 测试 + 启动冒烟检查**，全部通过才会显示绿色 ✓。

## 📡 API 示例

| 方法 | 路径             | 说明             |
| ---- | ---------------- | ---------------- |
| GET  | `/`              | API 索引         |
| GET  | `/health`        | 健康检查         |
| GET  | `/api/posts`     | 分页获取文章列表 |
| GET  | `/api/posts/:id` | 获取单篇文章     |
| POST | `/api/posts`     | 创建文章         |
| PUT  | `/api/posts/:id` | 更新文章         |
| DEL  | `/api/posts/:id` | 删除文章         |

**创建一篇文章**

```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello Koa","content":"A minimal API starter.","tags":["koa","node"]}'
```

**统一响应格式**

```json
{ "code": 0, "message": "ok", "data": {/* 业务数据 */} }
```

## ⚙️ 配置说明

所有配置均支持通过环境变量覆盖（详见 `.env.example`）：

| 变量             | 默认值                               | 说明                               |
| ---------------- | ------------------------------------ | ---------------------------------- |
| `NODE_ENV`       | `development`                        | 运行环境                           |
| `PORT`           | `3000`                               | 监听端口                           |
| `APP_NAME`       | `koa2-api-boilerplate`               | 应用名                             |
| `MONGO_URI`      | `mongodb://127.0.0.1:27017/koa2_api` | MongoDB 连接串                     |
| `SESSION_SECRET` | `change-me-in-production`            | 会话签名密钥，**生产环境务必修改** |

## 🧱 如何新增一个资源

1. 在 `model/` 下新建 Mongoose 模型（参考 `post.model.js`）
2. 在 `service/` 下新建业务逻辑（参考 `post.service.js`）
3. 在 `controller/` 下新建控制器，使用 `ctx.success` / `ctx.fail` 返回
4. 在 `router/index.js` 中注册路由

## 📄 License

[MIT](LICENSE)
