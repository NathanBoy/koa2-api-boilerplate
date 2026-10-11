/**
 * Controller-level tests for the Post CRUD API.
 * The service layer is mocked so the tests exercise routing, middleware and
 * response shaping without requiring a live MongoDB connection.
 */
const request = require("supertest");

jest.mock("../service/post.service", () => ({
  list: jest.fn(),
  detail: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}));

const postService = require("../service/post.service");
const app = require("../app");

const server = request(app.callback());

describe("POSTs API", () => {
  beforeEach(() => jest.clearAllMocks());

  it("GET /api/posts returns a paginated list", async () => {
    postService.list.mockResolvedValue({
      list: [{ _id: "1", title: "a" }],
      total: 1,
      page: 1,
      pageSize: 10,
    });

    const res = await server.get("/api/posts?page=1&pageSize=10");
    expect(res.status).toBe(200);
    expect(res.body.code).toBe(0);
    expect(res.body.data.total).toBe(1);
    expect(postService.list).toHaveBeenCalledTimes(1);
  });

  it("GET /api/posts/:id returns a single post", async () => {
    postService.detail.mockResolvedValue({ _id: "1", title: "a" });

    const res = await server.get("/api/posts/1");
    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe("a");
  });

  it("GET /api/posts/:id returns 404 when the post is not found", async () => {
    const err = new Error("Post not found");
    err.status = 404;
    postService.detail.mockRejectedValue(err);

    const res = await server.get("/api/posts/999");
    expect(res.status).toBe(404);
    expect(res.body.code).toBe(404);
  });

  it("POST /api/posts creates a post", async () => {
    postService.create.mockResolvedValue({ _id: "2", title: "new" });

    const res = await server.post("/api/posts").send({ title: "new", content: "x" });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("created");
    expect(res.body.data.title).toBe("new");
  });

  it("PUT /api/posts/:id updates a post", async () => {
    postService.update.mockResolvedValue({ _id: "1", title: "upd" });

    const res = await server.put("/api/posts/1").send({ title: "upd" });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("updated");
  });

  it("DELETE /api/posts/:id removes a post", async () => {
    postService.remove.mockResolvedValue({ _id: "1" });

    const res = await server.delete("/api/posts/1");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("deleted");
  });

  it("returns a JSON 500 body on internal errors", async () => {
    postService.list.mockRejectedValue(new Error("boom"));

    const res = await server.get("/api/posts");
    expect(res.status).toBe(500);
    expect(res.body.code).toBe(500);
    expect(res.body.message).toBe("Internal Server Error");
  });
});
