/**
 * Simple CORS middleware.
 * Adjust the defaults via options when stricter control is needed.
 */
module.exports = function cors(options = {}) {
  const {
    origin = "*",
    allowMethods = "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    allowHeaders = "Content-Type,Authorization",
    maxAge = 86400,
  } = options;

  return async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", origin);
    ctx.set("Access-Control-Allow-Methods", allowMethods);
    ctx.set("Access-Control-Allow-Headers", allowHeaders);
    ctx.set("Access-Control-Max-Age", String(maxAge));

    // Short-circuit preflight requests.
    if (ctx.method === "OPTIONS") {
      ctx.status = 204;
      return;
    }

    await next();
  };
};
