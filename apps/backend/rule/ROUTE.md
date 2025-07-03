# 📘 rule/ROUTE.md（ルーティング実装ルール）

このドキュメントは、ClaudeなどのAIツールがバックエンドのルーティングを実装・修正する際に従うべきルールを定義する。

## 🎯 基本方針

- **通常のHonoルーター使用**: `Hono`クラスを使用したシンプルなルーティング実装
- **OpenAPI不使用**: `OpenAPIHono`や`@hono/zod-openapi`は使用しない
- **統一性の確保**: 全てのルートファイルで同じパターンを使用
- **可読性重視**: シンプルで理解しやすいルーティング定義

## 🚫 禁止事項

| 禁止事項 | 理由 |
|---------|------|
| `OpenAPIHono`の使用 | プロジェクトポリシーによりOpenAPI機能は使用しない |
| `@hono/zod-openapi`の使用 | 同上 |
| `auth.openapi()`メソッド | OpenAPI関連機能のため使用禁止 |
| 複雑なルーティング設定 | シンプルさを優先 |

## ✅ 推奨パターン

### 基本的なルートファイル構造

```typescript
// src/routes/[feature].route.ts
import { Hono } from 'hono';
import {
  controllerFunction1,
  controllerFunction2,
  // ... 必要なコントローラー関数をインポート
} from '../controllers/[feature].controller';
import { middleware } from '../middlewares/[middleware].middleware'; // 必要に応じて

export const [feature]Router = new Hono();

// GETリクエスト
[feature]Router.get('/', controllerFunction1);
[feature]Router.get('/:id', controllerFunction2);

// POSTリクエスト
[feature]Router.post('/', controllerFunction3);

// PUT/PATCHリクエスト
[feature]Router.put('/:id', controllerFunction4);

// DELETEリクエスト
[feature]Router.delete('/:id', controllerFunction5);

// ミドルウェアが必要な場合
[feature]Router.get('/protected', middleware, controllerFunction6);

export default [feature]Router;
```

### 実装例

#### 認証ルート（auth.route.ts）
```typescript
import { Hono } from 'hono';
import { signIn, getProfile } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export const authRouter = new Hono();

// サインインエンドポイント
authRouter.post('/auth/signin', signIn);

// プロフィール取得エンドポイント（認証が必要）
authRouter.get('/auth/profile', authMiddleware, getProfile);

export default authRouter;
```

#### アイテムルート（item.route.ts）
```typescript
import { Hono } from 'hono';
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/item.controller';

export const itemsRouter = new Hono();

itemsRouter.get('/', getAllItems);
itemsRouter.post('/', createItem);
itemsRouter.get('/:id', getItemById);
itemsRouter.put('/:id', updateItem);
itemsRouter.delete('/:id', deleteItem);

export default itemsRouter;
```

## 🔧 命名規則

| 要素 | 命名規則 | 例 |
|------|---------|-----|
| ファイル名 | `[feature].route.ts` | `auth.route.ts`, `item.route.ts` |
| ルーター変数名 | `[feature]Router` | `authRouter`, `itemsRouter` |
| エクスポート名 | `[feature]Router` または `default` | `export const authRouter`, `export default authRouter` |

## 📦 インポートルール

### 必須インポート
```typescript
import { Hono } from 'hono';
```

### コントローラーインポート
```typescript
import { 
  controllerFunction1,
  controllerFunction2,
} from '../controllers/[feature].controller';
```

### ミドルウェアインポート（必要に応じて）
```typescript
import { middlewareName } from '../middlewares/[middleware].middleware';
```

## 🛠️ エンドポイント定義ルール

### HTTPメソッド対応
- `GET`: データ取得
- `POST`: データ作成
- `PUT`: データ更新（全体）
- `PATCH`: データ更新（部分）
- `DELETE`: データ削除

### パスパラメータ
- IDベースのリソース: `/:id`
- 複数の階層: `/parent/:parentId/child/:childId`

### ミドルウェア適用
```typescript
// 単一ミドルウェア
router.get('/protected', authMiddleware, controller);

// 複数ミドルウェア
router.post('/secure', authMiddleware, validationMiddleware, controller);
```

## 🔍 バリデーション

- Zodスキーマはコントローラー内で処理
- ルートファイルではシンプルなルーティング定義のみ
- OpenAPIスキーマは使用しない

## 📝 コメント規則

```typescript
// 機能説明のコメント
authRouter.post('/auth/signin', signIn);

// 認証が必要なエンドポイントのコメント
authRouter.get('/auth/profile', authMiddleware, getProfile);
```

## ⚠️ 移行時の注意点

### OpenAPIからの移行手順
1. `OpenAPIHono`を`Hono`に変更
2. `auth.openapi()`を適切なHTTPメソッドに変更
3. OpenAPIスキーマのインポートを削除
4. 必要に応じてエンドポイントパスを調整

### 変更前（禁止）
```typescript
import { OpenAPIHono } from '@hono/zod-openapi';
import { signInRoute } from '../schemas/auth.schema';

const auth = new OpenAPIHono();
auth.openapi(signInRoute, signIn);
```

### 変更後（推奨）
```typescript
import { Hono } from 'hono';

export const authRouter = new Hono();
authRouter.post('/auth/signin', signIn);
```

## 🧠 Claude向け指示

Claude、以下を必ず守ってください：

1. **OpenAPI関連の機能は一切使用しないでください**
2. **全てのルートファイルで`Hono`クラスを使用してください**
3. **このROUTE.mdのパターンに従ってルーティングを実装してください**
4. **既存のOpenAPIベースのルートを発見したら、このルールに従って修正してください**
5. **新しいルートを作成する際は、必ずこのパターンを使用してください**

このルールは、プロジェクトの一貫性と保守性を確保するために重要です。