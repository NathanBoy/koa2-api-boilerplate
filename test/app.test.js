/**
 * HTTP-layer tests for the general endpoints:
 * health check, API index and JSON 404 handling.
 */
const request = require("supertest");
const app = require("../app");

const server = request(app.callback());

describe("GET /health", () => {
  it("returns 200 with a unified success body", async () => {
    const res = await server.get("/health");
    expect(res.status).toBe(200);
    expect(res.body.code).toBe(0);
    expect(res.body.message).toBe("ok");
    expect(typeof res.body.data.uptime).toBe("number");
    expect(typeof res.body.data.timestamp).toBe("number");
  });
});

describe("GET /", () => {
  it("returns the API index", async () => {
    const res = await server.get("/");
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("koa2-api-boilerplate");
    expect(res.body.health).toBe("/health");
    expect(res.body.posts).toBe("/api/posts");
  });
});

describe("404 handling", () => {
  it("returns a JSON 404 body for unknown routes", async () => {
    const res = await server.get("/does-not-exist");
    expect(res.status).toBe(404);
    expect(res.body.code).toBe(404);
    expect(res.body.message).toBe("Not Found");
    expect(res.body.data).toBeNull();
  });
});
