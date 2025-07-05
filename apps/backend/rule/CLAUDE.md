# CLAUDE.md - API実装ルール（TypeScript + Hono）

このプロジェクトでは、バックエンドのAPIに [Hono](https://hono.dev/) を使用し、**厳密な型安全**と**拡張性の高い構造**を維持することを目的とします。Claudeは本ガイドラインを遵守し、コードの生成・レビュー・PR提案を行ってください。

---

## ✅ 基本方針

- **TypeScript + Hono による API 実装**
- **型安全第一**：`any` の使用禁止、明示的な型定義必須
- **関心の分離**（ルーティング・バリデーション・ビジネスロジック）
- **RESTful API 設計に準拠**
- `zod` によるスキーマ検証と自動型推論
- `OpenAPIHono` の活用による API ドキュメント対応
- `src/` ディレクトリ以下に機能単位で構成

---

## 📁 ディレクトリ構成

```
apps/
└── backend/
    ├── src/
    │   ├── constants/      # 定数定義（例: エラーメッセージ、環境変数）
    │   ├── controllers/    # ビジネスロジック（use case）を記述
    │   ├── db/             # DB関連の設定
    │   ├── middlewares/    # エラー処理や認証などの共通ミドルウェア
    │   ├── repositories/   # DBへの直接的な CRUD 操作
    │   ├── routes/         # ルーティング定義
    │   ├── schemas/        # Zodで定義したバリデーション & 型
    │   ├── services/       # DBや外部APIとのやり取りなどインフラ層
    │   ├── types/          # 共通型
    │   ├── utils/          # 共通のユーティリティ関数群（例: 日付変換、文字列操作）
    │   └── index.ts        # Honoアプリ起点
    ├── test/
    │   ├── config.ts       # テスト共通設定（BASE_URL等）
    │   ├── controllers/    # コントローラー単体テスト
    │   └── routes/         # APIテスト（app.fetch()使用）
    │       ├── items.test.ts
    │       └── auth.test.ts
    ├── data/
    │   └── items.json      # JSONデータベースファイル
    └── rule/
        ├── CLAUDE.md       # API実装ルール
        └── TEST.md         # テストルール
```

---

## 🛠️ 使用技術

- `hono`（ルーティング・ミドルウェア）
- `@hono/zod-openapi`（OpenAPI連携）
- `zod`（スキーマ定義 & 型推論）
- `bun`（ランタイム・テスト）

---

## 📦 ルーティング規則

### 🔹 通常API（CRUDなど）

```ts
// src/routes/items.ts
import { Hono } from 'hono'
import { getAllItems, getItemById } from '../controllers/item.controller'

const itemsRouter = new Hono()

itemsRouter.get('/', getAllItems)
itemsRouter.get('/:id', getItemById)

export default itemsRouter
```

### 🔹 認証・OpenAPI対応が必要なAPI

```ts
// src/routes/auth.ts
import { OpenAPIHono } from '@hono/zod-openapi'
import { signInRoute } from '../schemas/auth.schema'
import { AuthController } from '../controllers/auth.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const auth = new OpenAPIHono()
const controller = new AuthController()

auth.openapi(signInRoute, controller.signIn)
auth.get('/auth/profile', authMiddleware, controller.getProfile)

export default auth
```

---

## 🧱 コントローラーの原則

- 各関数は `Context` 型を明示
- 返却値も型指定（`Response` or `c.json(...)`）
- `any` は **一切使用禁止**

```ts
// src/controllers/item.controller.ts
import { Context } from 'hono'
import { getAllItemsService } from '../services/item.service'

export const getAllItems = async (c: Context) => {
  const items = await getAllItemsService()
  return c.json(items)
}
```

---

## 🔐 ミドルウェアルール

- `errorHandler`：予期せぬエラーをキャッチしてレスポンス整形
- `authMiddleware`：JWTトークン検証 → `c.set('user', decodedUser)` で共有

---

## ⚠️ エラーハンドリング規約

### 原則
- **エラーは`throwHttpError`を使用してスローする**
- **HTTPExceptionで統一したエラーハンドリング**
- **レスポンス形式の統一**

### 実装例

```ts
// utils/errors.ts
export const throwHttpError = ({ status, message }: ErrorInfo): never => {
  throw new HTTPException(status, {
    message: JSON.stringify({
      message,
      status,
    }),
  })
}

// 認証専用のヘルパー関数
export const throwAuthError = (message: string, status: number): never => {
  throw new HTTPException(status, {
    message: JSON.stringify({
      message,
      status,
    }),
  })
}
```

### コントローラーでのキャッチ

```ts
try {
  // ビジネスロジック
} catch (error) {
  if (error instanceof HTTPException) {
    const errorMessage = JSON.parse(error.message);
    return c.json(
      {
        error: ERROR_CODES.SPECIFIC_ERROR,
        message: errorMessage.message,
        status: errorMessage.status
      },
      errorMessage.status as 400 | 401 | 403 | 404 | 500
    );
  }
  // 予期しないエラー処理
}
```

---

## 🔄 共通型（`types/`）

```ts
// src/types/item.ts
export type Item = {
  id: string
  name: string
  price: number
}
```

---

## 🚫 禁止事項

| 禁止事項            | 理由                                         |
|---------------------|----------------------------------------------|
| `type: any`         | 型安全を損ない、予期しないエラーを生む     |
| 無名関数・匿名export | デバッグや保守性が著しく低下する           |
| エラーを握り潰す     | 正常系/異常系の動作保証ができなくなる       |
| fetch 直書き        | `services/` 層に分離し、再利用性とテスト性を確保 |
| `AppError` の使用   | `throwHttpError` を使用してHonoの`HTTPException`で統一する |

---

## 🧪 テスト

- `bun test` により各ルートの API テストを実行
- `apps/backend/test/routes/` にルーティング単位で配置
- `supertest` or `undici` でAPIを呼び出して期待レスポンスを確認

---

## 🧠 Claudeへのお願い

Claude、以下を必ず守ってください：

1. ルーティングには `Hono` または `OpenAPIHono` を使ってください
2. 型安全を厳守し、`any` は **一切使用しないでください**
3. `zod` による入力検証を行い、コントローラー層で信頼できるデータを扱ってください
4. API仕様変更時は `schemas/` を更新してください
5. コードの責務は以下に分けてください：
   - `routes/` → ルーティング
   - `controllers/` → ビジネスロジック（use case）を記述
   - `services/` → DBや外部APIとのやり取りなどインフラ層を記述
   - `middlewares/` → エラー処理や認証などの共通ミドルウェアを記述
   - `schemas/` → 型と検証
   - `types/` → 共通型
   - `repositories/` → DBへの直接的な CRUD 操作
   - `constants` → 定数定義（例: エラーメッセージ、環境変数）
   - `utils/` → 共通のユーティリティ関数群（例: 日付変換、文字列操作など）
6. ディレクトリを追加したり、規約が変更した際はCLAUDE.mdなどのルールファイルを修正してください。

---
