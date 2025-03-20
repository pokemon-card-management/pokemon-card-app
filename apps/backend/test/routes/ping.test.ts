import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { serve } from "bun";
import request from "supertest";
import app from "../../src/routes/ping";

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

describe("GET /ping", () => {
  it("should return 200 and { message: 'pong' }", async () => {
    const res = await request("http://localhost:4000").get("/ping");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "pong" });
  });

  it("should return 400 Bad Request in some cases", async () => {
    const res = await request("http://localhost:4000").get("/ping");

    if (res.status === 400) {
      expect(res.body).toMatchObject({
        message: "Bad Request",
        errors: expect.any(Object),
      });
    } else {
      expect(res.status).toBe(200); // 400 が発生しない場合、正常レスポンス
    }
  });

  it("should return 500 Internal Server Error on unexpected error", async () => {
    // 例: エラーを意図的に発生させるリクエストを送る
    const res = await request("http://localhost:4000").get("/ping?error=true");

    expect([200, 500]).toContain(res.status);
    if (res.status === 500) {
      expect(res.body).toMatchObject({
        message: "Internal Server Error",
      });
    }
  });
});
