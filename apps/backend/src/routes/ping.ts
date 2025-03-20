import { Hono } from "hono";
import { z, createRoute } from "@hono/zod-openapi";
import { errorResponses } from "../schema/error.schema";

const pingRouter = new Hono();

pingRouter.get('/ping', (c) => c.json({ message: 'pong' }));

// GET /ping のルート定義
const pingRoute = createRoute({
  method: "get",
  path: "/ping",
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({ example: "pong" }),
          }),
        },
      },
    },
    ...errorResponses, // 共通エラーレスポンスを適用
  },
  handler: async (c) => {
    try {
      if (Math.random() < 0.2) {
        // 20% の確率で意図的に 400 エラーを発生
        return c.json(
          {
            message: "Bad Request",
            errors: { reason: ["Something went wrong"] },
          },
          400
        );
      }

      return c.json({ message: "pong" }, 200);
    } catch (error) {
      return c.json(
        {
          message: "Internal Server Error",
        },
        500
      );
    }
  },
});

pingRouter.get(pingRoute.path, pingRoute.handler);

export default pingRouter;
