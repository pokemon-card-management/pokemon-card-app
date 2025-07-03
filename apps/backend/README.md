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
- `routes/` → ルーティング
- `controllers/` → ビジネスロジック（use case）を記述
- `services/` → DBや外部APIとのやり取りなどインフラ層を記述
- `middlewares/` → エラー処理や認証などの共通ミドルウェアを記述
- `schemas/` → 型と検証
- `types/` → 共通型
- `repositories/` → DBへの直接的な CRUD 操作
- `constants` → 定数定義（例: エラーメッセージ、環境変数）
- `utils/` → 共通のユーティリティ関数群（例: 日付変換、文字列操作
```
