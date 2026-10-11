/**
 * Uniform response wrapper.
 * Exposes ctx.success / ctx.fail helpers so every controller returns the same shape:
 *   { code, message, data }
 * code 0 means success, non-zero means failure.
 */
module.exports = function response() {
  return async (ctx, next) => {
    ctx.success = (data = null, message = "ok") => {
      ctx.body = { code: 0, message, data };
    };

    ctx.fail = (message = "error", code = 1, status = 200) => {
      ctx.status = status;
      ctx.body = { code, message, data: null };
    };

    await next();
  };
};
