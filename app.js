/**
 * Koa application entry.
 * Builds the middleware stack (onion model) and mounts the router.
 */
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const compress = require("koa-compress");

const config = require("./config");
const { rootRouter, apiRouter } = require("./router");

const errorHandler = require("./middleware/error-handler");
const logger = require("./middleware/logger");
const response = require("./middleware/response");
const cors = require("./middleware/cors");
const session = require("./middleware/session");
const notFound = require("./middleware/not-found");

const app = new Koa();
app.name = config.name;
app.proxy = true;
app.keys = [config.session.secret];

// Order matters: outermost middleware runs first and last (onion model).
app.use(errorHandler()); // catch everything
app.use(
  compress({
    filter: (contentType) => /text|json|javascript/i.test(contentType),
    threshold: 2048,
  })
);
app.use(logger()); // request logging
app.use(response()); // ctx.success / ctx.fail helpers
app.use(cors()); // CORS
app.use(session(config.session)); // signed cookie session
app.use(bodyParser()); // parse JSON / urlencoded bodies

app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());

app.use(notFound()); // JSON 404

// Global error listener (e.g. for external monitoring / alerting).
app.on("error", (err, ctx) => {
  console.error(`[app error] ${err.message}`, {
    path: ctx.path,
    method: ctx.method,
  });
});

module.exports = app;
