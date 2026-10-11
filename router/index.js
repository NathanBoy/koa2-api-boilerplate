/**
 * Route definitions.
 * - rootRouter: general endpoints (/, /health)
 * - apiRouter:  business APIs, grouped under the /api prefix
 * Controllers stay thin; business logic lives in service/.
 */
const Router = require("@koa/router");
const config = require("../config");

const healthController = require("../controller/health.controller");
const postController = require("../controller/post.controller");

// General routes.
const rootRouter = new Router();
rootRouter.get("/", (ctx) => {
  ctx.body = {
    name: config.name,
    version: "1.0.0",
    health: "/health",
    posts: "/api/posts",
  };
});
rootRouter.get("/health", healthController.health);

// Business APIs.
const apiRouter = new Router({ prefix: "/api" });
apiRouter.get("/posts", postController.list);
apiRouter.get("/posts/:id", postController.detail);
apiRouter.post("/posts", postController.create);
apiRouter.put("/posts/:id", postController.update);
apiRouter.delete("/posts/:id", postController.remove);

module.exports = { rootRouter, apiRouter };
