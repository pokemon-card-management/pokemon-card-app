# 📘 rule/TEST.md（Claude向け バックエンドテストルール）

このドキュメントは、ClaudeなどのAIツールが 正確・網羅的・信頼性の高いバックエンドテストを自動生成・改善・レビューするためのテスト設計指針を定義する。

## 🎯 目的
- システムの品質を保ち、変更に強い設計を実現する
- Claudeによるテスト生成/レビューを標準化・自動化する
- Bun + Hono をベースとしたAPIやサービスロジックを対象とする

## 🧱 前提構成
- 言語: TypeScript (strict)
- フレームワーク: Bun + Hono
- テストランナー: bun:test
- テスト方式: app.fetch() による直接呼び出し（SuperTest不使用）
- モック・ユーティリティ: vi.mock, msw, faker, zod
- 共通設定: test/config.ts で環境変数やベースURL等を集約管理
- カバレッジレポート: bun test --coverage

## ✅ テストの基本分類と優先度
| テスト種別                         | 目的                | 優先度 | 対象層                          |
| ----------------------------- | ----------------- | --- | ---------------------------- |
| 単体テスト (Unit Test)             | 関数やクラス単位の動作確認     | ★★★ | services, controllers, utils |
| APIテスト (Integration/API Test) | Hono経由でのエンドポイント検証 | ★★★ | routes, middlewares          |
| DB統合テスト (DB Integration Test) | DynamoDBやS3との統合確認 | ★★☆ | repositories                 |
| スキーマ/型テスト                     | Zodバリデーションの検証     | ★★☆ | schemas                      |
| セキュリティ・権限テスト                  | ロール/トークン制御の確認     | ★★☆ | middlewares                  |
| 負荷テスト                         | 高負荷時の動作保証         | ★☆☆ | 非CI範囲                        |
| 回帰テスト                         | バグ再現のための再検証       | ★★★ | 任意全体                         |

## 🛡️ 信頼性向上のためのルール（RELIABILITY）
1. 冪等性の確認
  - 同じリクエストを何度送っても結果が変わらないAPIは、必ず冪等性を確認するテストを含める。
2. 失敗系ケースを重視
  - 異常系（404, 401, 422, 500等）を必ず網羅する。
3. 境界値テスト
  - 最小値、最大値、0件、空文字、null、undefinedなど、入力の端にあるパターンを網羅する。
4. ミドルウェア/ガードテスト
  - 認証トークンの有無、ロールによる拒否、ヘッダー不備の確認。
5. タイムアウト・例外処理
  - 明示的に throw されるエラー、DB接続失敗、通信遅延等のケースを含める。

## 📊 網羅性のためのルール（COVERAGE）
✅ ルート/API単位での網羅リスト（自動生成対応）

| エンドポイント             | 必須テスト観点                                  |
| ------------------- | ---------------------------------------- |
| `GET /cards`        | 正常系 / パラメータあり / パラメータ不正 / 空リスト / 大量レスポンス |
| `GET /cards/:id`    | 正常 / 存在しないID / 無効なID形式                   |
| `POST /cards`       | 正常 / Zodバリデーション / 重複登録 / トークンなし          |
| `PUT /cards/:id`    | 正常 / 部分更新 / 不正な入力 / 権限拒否                 |
| `DELETE /cards/:id` | 正常 / 削除済 / ID不正 / 権限拒否                   |

> Claudeにこの表形式で対象エンドポイントを与えると網羅的にテスト生成可能

## 🧪 テスト実装のルール（CONVENTION）

### ディレクトリ構成

```
apps/
└── backend/
    ├── src/
    │   ├── controllers/
    │   │   └── card.controller.ts
    │   └── ...
    └── test/
        ├── config.ts               # テスト共通設定（BASE_URL等）
        ├── controllers/
        │   └── card.controller.test.ts
        └── routes/
            ├── card.test.ts        # app.fetch()を使用したAPIテスト
            └── auth.test.ts
```

### 命名規則
- *.test.ts: 単体・統合テスト用
- describe名は 関数単位 or API単位
- it名は 入力と期待結果を記述
```ts
describe("createCard", () => {
  it("should create a card when valid data is provided", ...)
  it("should throw if name is missing", ...)
});
```

### APIテストの実装方式
- **app.fetch()による直接呼び出し**：SuperTestの代わりにHonoアプリを直接呼び出し
- **テスト設定の統一**：`test/config.ts`でベースURLや環境変数を管理
- **レスポンスパース**：204（No Content）やエラー時の適切なレスポンス処理

```typescript
// test/config.ts
export const TEST_CONFIG = {
  BASE_URL: process.env.TEST_BASE_URL || "http://localhost:3000"
};

// テスト例
import { TEST_CONFIG } from '../config';
import app from 'src/index';

const res = await app.fetch(new Request(`${TEST_CONFIG.BASE_URL}/items`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(testData)
}));
```

### モック戦略
- dbやexternal APIはvi.mockでモック
- AWS SDK（DynamoDB, S3）もjest-likeにモック
- faker-js/fakerでダミーデータ生成

## 🔒 セキュリティ観点のテスト（SECURITY）
| 項目          | テスト例                       |
| ----------- | -------------------------- |
| 認証なしアクセス    | `401 Unauthorized` を返すこと   |
| トークン改ざん     | 無効トークンで拒否されること             |
| 他人のリソースアクセス | `403 Forbidden` を返すこと      |
| XSS         | 入力にスクリプトタグが混入しても保存されないこと   |
| データ検証バイパス   | スキーマバリデーションが破られないこと（例：Zod） |

## 📈 カバレッジ・品質指標
| 指標                   | 目標値                          |
| -------------------- | ---------------------------- |
| テストカバレッジ（Statements） | 90%以上                        |
| ブランチカバレッジ            | 80%以上                        |
| CI/CDでの自動実行          | 必須（GitHub Actions, bun test） |
| Mutation Testing（将来） | optional                     |

## 💡 Claude向け補足ルール
- Claudeには、1つのdescribeブロックごとに分割してテスト生成を依頼すると精度が高まる
- 例:
```
Claudeへ依頼：

`createCard()` 関数の正常系・異常系を網羅するテストコードを生成してください。
以下の入力条件に基づき、Zodスキーマのバリデーション結果を含めてください。
```

- ルールに従っているかを評価するための自動レビューに rule/TEST.md を渡すと精度UP


## ✅ まとめチェックリスト（Claudeがテストを生成・レビューする際の基準）

- [ ] 正常系の確認がある
- [ ] 失敗系（404, 401, 422など）を網羅
- [ ] 認証・認可のテストがある
- [ ] 型・バリデーションに対するテストがある
- [ ] app.fetch()を使用したAPIテストを実装している
- [ ] test/config.tsから設定を読み込んでいる
- [ ] 204 No Contentやエラーレスポンスを適切に処理している
- [ ] モックを適切に使っている
- [ ] describe/itの命名が明確
- [ ] データはfakerなどで生成している
- [ ] 不要な副作用がない
- [ ] カバレッジが閾値を満たしている

## ✨ オプション：Claudeに学習させるテンプレプロンプト
```md
Claudeへ：
以下は `createCard()` 関数のテスト対象です。
このファイルは、プロジェクトのテストルール `rule/TEST.md` に基づいて記述される必要があります。

ルールの抜粋：
- 正常系・異常系を両方書く
- Zodスキーマに基づくバリデーション確認
- DB操作はmock
- describe/itの命名にルールあり

生成対象関数：
export async function createCard(data: CardInput): Promise<Card> { ... }
```
