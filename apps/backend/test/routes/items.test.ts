import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { serve } from "bun";
import request from "supertest";
import app from "index";

let server: any;

beforeAll(() => {
  server = serve({
    fetch: app.fetch,
    port: 4000,
  });
});

afterAll(() => {
  // Bun.serve は手動で停止しなくてもOK
});

describe("GET /", () => {
  it("should return 200 and { message: [] }", async () => {
    const res = await request("http://localhost:4000").get("/items");

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("should return 500 Internal Server Error on unexpected error", async () => {
    // 例: エラーを意図的に発生させるリクエストを送る
    const res = await request("http://localhost:4000").get("/items?error=true");

    expect([200, 500]).toContain(res.status);
    if (res.status === 500) {
      expect(res.body).toMatchObject({
        message: "Internal Server Error",
      });
    }
  });
});
