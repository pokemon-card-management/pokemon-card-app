import { describe, it, expect, beforeAll, afterAll, beforeEach } from "bun:test";
import app from "index";
import { createInMemoryDB } from 'db/memory.adapter'
import { setDB } from 'services/item.service'
import type { ItemType } from 'schemas/item.schema'
import type { Low } from 'lowdb'
import type { Data } from 'db/memory.adapter'
import { TEST_CONFIG } from '../config';

let mockDB: Low<Data>;

// レスポンスボディを適切にパースするヘルパー関数
const parseResponseBody = async (res: Response) => {
  const contentLength = res.headers.get('content-length');
  
  if (res.status === 204 || contentLength === '0') {
    return {};
  }

  try {
    return await res.json();
  } catch {
    return {};
  }
};

beforeAll(async () => {
  mockDB = createInMemoryDB()
  await mockDB.read()
  mockDB.data ||= { items: [] }
  setDB(mockDB)
});

beforeEach(async () => {
  // 各テスト前にDBをリセット
  mockDB.data = { items: [] }
  await mockDB.write()
  // サービスにもmockDBを再設定
  setDB(mockDB)
});

afterAll(() => {
  // クリーンアップ処理
});

describe("Items API", () => {
  
  describe("GET /items", () => {
    it("空の場合、空配列を返す", async () => {
      const res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items`, {
        method: "GET"
      }));

      expect(res.status).toBe(200);
      const body = await parseResponseBody(res);
      expect(body).toEqual([]);
    });

    it("データがある場合、アイテム一覧を返す", async () => {
      // テストデータを追加
      const testItems: ItemType[] = [
        {
          id: 1,
          name: "ポケモンカード",
          description: "ピカチュウのカード",
          price: 100,
          createdAt: "2024-01-01T00:00:00.000Z",
          updatedAt: "2024-01-01T00:00:00.000Z"
        },
        {
          id: 2,
          name: "ポケモンカード2",
          description: "フシギダネのカード",
          price: 200,
          createdAt: "2024-01-01T00:00:00.000Z",
          updatedAt: "2024-01-01T00:00:00.000Z"
        }
      ];
      
      mockDB.data.items = testItems;
      await mockDB.write();

      const res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items`, {
        method: "GET"
      }));

      expect(res.status).toBe(200);
      const body = await parseResponseBody(res);
      expect(body).toEqual(testItems);
    });
  });

  describe("POST /items", () => {
    it("正常なアイテム作成（必須フィールドのみ）", async () => {
      const newItem = {
        name: "新しいポケモンカード"
      };

      const res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newItem)
      }));

      expect(res.status).toBe(201);
      const body = await parseResponseBody(res);
      expect(body).toMatchObject({
        id: 1,
        name: "新しいポケモンカード",
        description: "",
        price: null
      });
      expect(body.createdAt).toBeDefined();
      expect(body.updatedAt).toBeDefined();
    });

    it("正常なアイテム作成（全フィールド）", async () => {
      const newItem = {
        name: "プレミアムポケモンカード",
        description: "希少なホログラムカード",
        price: 500
      };

      const res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newItem)
      }));

      expect(res.status).toBe(201);
      const body = await parseResponseBody(res);
      expect(body).toMatchObject({
        id: 1,
        name: "プレミアムポケモンカード",
        description: "希少なホログラムカード",
        price: 500
      });
      expect(body.createdAt).toBeDefined();
      expect(body.updatedAt).toBeDefined();
    });

    it("バリデーションエラー（名前なし）", async () => {
      const invalidItem = {
        description: "説明のみ",
        price: 100
      };

      const res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(invalidItem)
      }));
      
      expect(res.status).toBe(400);
      const body = await parseResponseBody(res);
      expect(body).toHaveProperty("message");
    });

    it("バリデーションエラー（空の名前）", async () => {
      const invalidItem = {
        name: "",
        description: "空の名前",
        price: 100
      };

      const res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(invalidItem)
      }));

      expect(res.status).toBe(400);
      const body = await parseResponseBody(res);
      expect(body).toHaveProperty("message");
    });

    it("バリデーションエラー（負の価格）", async () => {
      const invalidItem = {
        name: "テストカード",
        description: "負の価格",
        price: -100
      };

      const res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(invalidItem)
      }));

      expect(res.status).toBe(400);
      const body = await parseResponseBody(res);
      expect(body).toHaveProperty("message");
    });

    it("連続作成でIDが正しく増加する", async () => {
      const item1 = { name: "カード1" };
      const item2 = { name: "カード2" };

      const res1 = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item1)
      }));

      const res2 = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item2)
      }));

      expect(res1.status).toBe(201);
      expect(res2.status).toBe(201);
      const body1 = await parseResponseBody(res1);
      const body2 = await parseResponseBody(res2);
      expect(body1.id).toBe(1);
      expect(body2.id).toBe(2);
    });
  });

  describe("GET /items/:id", () => {
    beforeEach(async () => {
      // テストデータを準備
      const testItem: ItemType = {
        id: 1,
        name: "テストカード",
        description: "テスト用のカード",
        price: 150,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z"
      };
      mockDB.data.items = [testItem];
      await mockDB.write();
    });

    it("存在するIDでアイテムを取得", async () => {
      const res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items/1`, {
        method: "GET"
      }));

      expect(res.status).toBe(200);
      const body = await parseResponseBody(res);
      expect(body).toMatchObject({
        id: 1,
        name: "テストカード",
        description: "テスト用のカード",
        price: 150
      });
    });

    it("存在しないIDで404エラー", async () => {
      const res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items/999`, {
        method: "GET"
      }));

      expect(res.status).toBe(404);
      const body = await parseResponseBody(res);
      expect(body).toHaveProperty("message");
    });

    it("不正なIDでバリデーションエラー", async () => {
      const res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items/invalid`, {
        method: "GET"
      }));

      expect(res.status).toBe(400);
      const body = await parseResponseBody(res);
      expect(body).toHaveProperty("message");
    });

    it("負のIDでバリデーションエラー", async () => {
      const res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items/-1`, {
        method: "GET"
      }));

      expect(res.status).toBe(400);
      const body = await parseResponseBody(res);
      expect(body).toHaveProperty("message");
    });

    it("0のIDでバリデーションエラー", async () => {
      const res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items/0`, {
        method: "GET"
      }));

      expect(res.status).toBe(400);
      const body = await parseResponseBody(res);
      expect(body).toHaveProperty("message");
    });
  });

  describe("PUT /items/:id", () => {
    beforeEach(async () => {
      // テストデータを準備
      const testItem: ItemType = {
        id: 1,
        name: "更新前カード",
        description: "更新前の説明",
        price: 100,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z"
      };
      mockDB.data.items = [testItem];
      await mockDB.write();
    });

    it("存在するIDでアイテムを完全更新", async () => {
      const updateData = {
        name: "更新後カード",
        description: "更新後の説明",
        price: 200
      };

      const res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items/1`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
      }));

      expect(res.status).toBe(200);
      const body = await parseResponseBody(res);
      expect(body).toMatchObject({
        id: 1,
        name: "更新後カード",
        description: "更新後の説明",
        price: 200
      });
      expect(body.updatedAt).not.toBe("2024-01-01T00:00:00.000Z");
    });

    it("存在するIDでアイテムを部分更新（名前のみ）", async () => {
      const updateData = {
        name: "部分更新カード"
      };

      const res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items/1`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
      }));

      expect(res.status).toBe(200);
      const body = await parseResponseBody(res);
      expect(body).toMatchObject({
        id: 1,
        name: "部分更新カード",
        description: "更新前の説明", // 変更されない
        price: 100 // 変更されない
      });
    });

    it("存在するIDでアイテムを部分更新（価格のみ）", async () => {
      const updateData = {
        price: 300
      };

      const res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items/1`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
      }));

      expect(res.status).toBe(200);
      const body = await parseResponseBody(res);
      expect(body).toMatchObject({
        id: 1,
        name: "更新前カード", // 変更されない
        description: "更新前の説明", // 変更されない
        price: 300
      });
    });

    it("存在しないIDで404エラー", async () => {
      const updateData = {
        name: "存在しないアイテム"
      };

      const res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items/999`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
      }));

      expect(res.status).toBe(404);
      const body = await parseResponseBody(res);
      expect(body).toHaveProperty("message");
    });

    it("不正なIDでバリデーションエラー", async () => {
      const updateData = {
        name: "更新データ"
      };

      const res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items/invalid`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
      }));

      expect(res.status).toBe(400);
      const body = await parseResponseBody(res);
      expect(body).toHaveProperty("message");
    });

    it("空のデータで更新を試行", async () => {
      const res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items/1`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({})
      }));

      expect(res.status).toBe(200);
      const body = await parseResponseBody(res);
      // 空のオブジェクトでも更新は成功するが、値は変更されない
      expect(body).toMatchObject({
        id: 1,
        name: "更新前カード",
        description: "更新前の説明",
        price: 100
      });
    });
  });

  describe("DELETE /items/:id", () => {
    beforeEach(async () => {
      // テストデータを準備
      const testItems: ItemType[] = [
        {
          id: 1,
          name: "削除テストカード1",
          description: "削除用のカード1",
          price: 100,
          createdAt: "2024-01-01T00:00:00.000Z",
          updatedAt: "2024-01-01T00:00:00.000Z"
        },
        {
          id: 2,
          name: "削除テストカード2",
          description: "削除用のカード2",
          price: 200,
          createdAt: "2024-01-01T00:00:00.000Z",
          updatedAt: "2024-01-01T00:00:00.000Z"
        }
      ];
      mockDB.data.items = testItems;
      await mockDB.write();
    });

    it("存在するIDでアイテムを削除", async () => {
      const res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items/1`, {
        method: "DELETE"
      }));

      expect(res.status).toBe(204);
      const body = await parseResponseBody(res);
      expect(body).toEqual({});

      // 削除されたことを確認
      const getRes = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items/1`, {
        method: "GET"
      }));
      expect(getRes.status).toBe(404);

      // 他のアイテムは残っていることを確認
      const getRes2 = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items/2`, {
        method: "GET"
      }));
      expect(getRes2.status).toBe(200);
    });

    it("存在しないIDで404エラー", async () => {
      const res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items/999`, {
        method: "DELETE"
      }));

      expect(res.status).toBe(404);
      const body = await parseResponseBody(res);
      expect(body).toHaveProperty("message");
    });

    it("不正なIDでバリデーションエラー", async () => {
      const res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items/invalid`, {
        method: "DELETE"
      }));

      expect(res.status).toBe(400);
      const body = await parseResponseBody(res);
      expect(body).toHaveProperty("message");
    });

    it("負のIDでバリデーションエラー", async () => {
      const res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items/-1`, {
        method: "DELETE"
      }));

      expect(res.status).toBe(400);
      const body = await parseResponseBody(res);
      expect(body).toHaveProperty("message");
    });
  });

  describe("エラーハンドリング", () => {
    it("不正なJSONでPOSTリクエスト", async () => {
      const res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: '{"invalid": json}'
      }));

      expect([400, 500]).toContain(res.status);
    });

    it("不正なJSONでPUTリクエスト", async () => {
      // テストデータを準備
      const testItem: ItemType = {
        id: 1,
        name: "テストカード",
        description: "テスト用",
        price: 100,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z"
      };
      mockDB.data.items = [testItem];
      await mockDB.write();

      const res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items/1`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: '{"invalid": json}'
      }));

      expect([400, 500]).toContain(res.status);
    });
  });

  describe("統合テスト", () => {
    it("CRUD操作の一連の流れ", async () => {
      // 1. 初期状態は空
      let res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items`, {
        method: "GET"
      }));
      expect(res.status).toBe(200);
      let body = await parseResponseBody(res);
      expect(body).toEqual([]);

      // 2. アイテムを作成
      const createData = {
        name: "統合テストカード",
        description: "CRUD操作テスト用",
        price: 250
      };

      res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(createData)
      }));
      expect(res.status).toBe(201);
      body = await parseResponseBody(res);
      const createdItem = body;
      expect(createdItem.id).toBe(1);

      // 3. 作成されたアイテムを取得
      res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items/${createdItem.id}`, {
        method: "GET"
      }));
      expect(res.status).toBe(200);
      body = await parseResponseBody(res);
      expect(body).toMatchObject(createData);

      // 4. アイテムリストに含まれることを確認
      res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items`, {
        method: "GET"
      }));
      expect(res.status).toBe(200);
      body = await parseResponseBody(res);
      expect(body).toHaveLength(1);
      expect(body[0]).toMatchObject(createData);

      // 5. アイテムを更新
      const updateData = {
        name: "更新された統合テストカード",
        price: 350
      };

      res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items/${createdItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
      }));
      expect(res.status).toBe(200);
      body = await parseResponseBody(res);
      expect(body.name).toBe(updateData.name);
      expect(body.price).toBe(updateData.price);
      expect(body.description).toBe(createData.description); // 変更されない

      // 6. アイテムを削除
      res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items/${createdItem.id}`, {
        method: "DELETE"
      }));
      expect(res.status).toBe(204);

      // 7. 削除されたことを確認
      res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items/${createdItem.id}`, {
        method: "GET"
      }));
      expect(res.status).toBe(404);

      // 8. アイテムリストが空になったことを確認
      res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items`, {
        method: "GET"
      }));
      expect(res.status).toBe(200);
      body = await parseResponseBody(res);
      expect(body).toEqual([]);
    });
  });
});