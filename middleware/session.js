/**
 * Lightweight, dependency-free signed cookie session.
 *
 * A session is a plain object at ctx.session that persists as a
 * HMAC-signed, base64url-encoded cookie. Call ctx.session.save() to
 * write it back to the browser.
 *
 * NOTE: this is an *example* implementation for teaching layered
 * middleware. For real applications prefer a battle-tested store
 * (e.g. koa-session + redis / jwt).
 */
const crypto = require("crypto");

const COOKIE_NAME = "koa_session";

function sign(value, secret) {
  return crypto.createHmac("sha256", secret).update(value).digest("base64url");
}

function verify(raw, secret) {
  const dot = raw.indexOf(".");
  if (dot === -1) return null;
  const payload = raw.slice(0, dot);
  const sig = raw.slice(dot + 1);
  if (sig !== sign(payload, secret)) return null;
  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  } catch (err) {
    return null;
  }
}

module.exports = function session(options = {}) {
  const secret = options.secret;
  const maxAge = options.maxAge;

  return async (ctx, next) => {
    // Load existing session from cookie if present and valid.
    ctx.session = verify(ctx.cookies.get(COOKIE_NAME) || "", secret) || {};

    // Provide a save() helper.
    ctx.session.save = () => {
      const payload = Buffer.from(JSON.stringify(ctx.session)).toString("base64url");
      const value = `${payload}.${sign(payload, secret)}`;
      ctx.cookies.set(COOKIE_NAME, value, { httpOnly: true, maxAge });
    };

    await next();
  };
};
