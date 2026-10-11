/**
 * Request logging middleware.
 * Logs method, path, status and duration for every request.
 */
module.exports = function logger() {
  return async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(
      `${new Date().toISOString()} ${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`
    );
  };
};
