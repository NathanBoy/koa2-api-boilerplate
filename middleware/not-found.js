/**
 * 404 handler.
 * Returns a JSON body when no route matched (instead of Koa's default empty response).
 */
module.exports = function notFound() {
  return async (ctx, next) => {
    await next();
    if (ctx.status === 404 && ctx.body === undefined) {
      ctx.status = 404;
      ctx.body = { code: 404, message: "Not Found", data: null };
    }
  };
};
