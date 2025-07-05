# backend

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run serve
```

ディレクトリ構造
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
