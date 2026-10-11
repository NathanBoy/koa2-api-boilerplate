/**
 * Central error handler.
 * Catches any error thrown downstream, maps it to a JSON body and a proper HTTP status.
 * 5xx errors are also emitted to the app 'error' event for external monitoring/logging.
 */
module.exports = function errorHandler() {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      const status = err.status || err.statusCode || 500;
      ctx.status = status;

      ctx.body = {
        code: status,
        message: status >= 500 ? "Internal Server Error" : err.message || "Error",
        data: null,
      };

      if (status >= 500) {
        ctx.app.emit("error", err, ctx);
      }
    }
  };
};
