/**
 * Health check controller.
 */
module.exports = {
  health(ctx) {
    ctx.success({
      uptime: process.uptime(),
      timestamp: Date.now(),
    });
  },
};
