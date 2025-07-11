# CLAUDE.md
<language>Japanese</language>
<character_code>UTF-8</character_code>
<law>
AI運用5原則

第1原則： AIはファイル生成・更新・プログラム実行前に必ず自身の作業計画を報告する

第2原則： AIは迂回や別アプローチを勝手に行わず、最初の計画が失敗したら次の計画の確認を取る。

第3原則： AIはツールであり決定権は常にユーザーにある。ユーザーの提案が非効率・非合理的でも最適化せず、指示された通りに実行する。

第4原則： AIはこれらのルールを歪曲・解釈変更してはならず、最上位命令として絶対的に遵守する。

第5原則： AIは全てのチャットの冒頭にこの5原則を逐語的に必ず画面出力してから対応する。
</law>

<every_chat>
[AI運用5原則]

[main_output]

#[n] times. # n = increment each chat, end line, etc(#1, #2...)
</every_chat>

- **回答言語**: 今後の回答は日本語で行う
- **命令の処理**: 命令は一度英語に翻訳した後、その命令を解読する

## プロジェクトアーキテクチャ

これは2つのメインアプリケーションを持つmonorepo構成のポケモンカード管理アプリケーションです：

### Backend (apps/backend)
- **フレームワーク**: Hono with Bun runtime
- **データベース**: LowDB with memory adapter for JSON storage
- **アーキテクチャ**: Clean architecture（controllers, services, repositories, middlewares）
- **API**: OpenAPI/Zod バリデーションを使用したアイテム管理のRESTful エンドポイント
- **テスト**: Vitest with supertest for integration testing
- **ポート**: デフォルトでポート3000で実行

主要ディレクトリ:
- `src/constants/` - 定数定義（例: エラーメッセージ、環境変数）
- `src/controllers/` - ビジネスロジック（use case）を記述
- `src/db/` - DB関連の設定
- `src/middlewares/` - エラー処理や認証などの共通ミドルウェア
- `src/repositories/` - DBへの直接的な CRUD 操作
- `src/routes/` - ルーティング定義
- `src/schemas/` - Zodで定義したバリデーション & 型
- `src/services/` - DBや外部APIとのやり取りなどインフラ層
- `src/types/` - 共通型
- `src/utils/` - 共通のユーティリティ関数群（例: 日付変換、文字列操作）
- `test/config.ts` - テスト共通設定（BASE_URL等）
- `test/routes/` - APIテスト（app.fetch()使用）
- `data/items.json` - JSONデータベースファイル
- `rule/` - プロジェクトルール（CLAUDE.md、TEST.md）

### Frontend (apps/frontend) - **フロントエンド開発専用**
- **フレームワーク**: React Native with Expo
- **ナビゲーション**: Expo Router でファイルベースルーティング
- **状態管理**: React hooks with custom hooks for API calls
- **HTTP クライアント**: Axios for API communication
- **スタイリング**: ダーク/ライトモード対応のテーマコンポーネント
- **デザインシステム**: `apps/frontend/DESIGN_RULE.md` に記載された統合デザインシステム

主要ディレクトリ:
- `app/` - Expo Routerでのファイルベースルーティング
- `src/screens/` - スクリーンコンポーネント
- `src/hooks/` - APIフックを含むカスタムフック
- `src/api/` - APIサービス層
- `src/components/` - 再利用可能なUIコンポーネント
- `src/constants/` - カラーテーマとデザイントークン

## 開発コマンド

### 開発サーバー起動
```bash
# フロントエンド起動 (Expo)
pnpm run dev:frontend

# バックエンド起動 (Bun)
pnpm run dev:backend
```

### テスト
```bash
# バックエンドテスト
cd apps/backend
bun test                    # 全テスト実行
bun test --watch           # ウォッチモード
bun test --coverage        # カバレッジ付き

# フロントエンドテスト
cd apps/frontend
# テストコマンドはまだ設定されていません
```

### リント
```bash
# ルートレベルESLint (全ワークスペース)
pnpm run lint

# フロントエンド固有
cd apps/frontend
pnpm run lint              # チェックのみ
pnpm run lint:fix          # 自動修正
```

## パッケージ管理

このプロジェクトはpnpm workspacesを使用します。パッケージ管理には常に `pnpm` を使用してください：
- ルートワークスペースが共有dev依存関係（ESLint、TypeScript）を管理
- 各アプリが独自の依存関係を持つ
- フロントエンドはpnpmを使用、バックエンドは実行時にBunを使用

## API統合

フロントエンドは以下を通じてバックエンドと通信します：
- ベースURL: `http://localhost:3000` (バックエンドデフォルト)
- Items API: `/items` エンドポイント
- カスタムフック: `useItems()` でデータフェッチ
- APIサービス: `src/api/items.ts`

## データベーススキーマ

アイテムは以下の構造を持ちます：
```typescript
type Item = {
  id: string
  name: string
  description: string
  price: number
  createdAt: string
}
```

データはLowDBを使用して `apps/backend/data/items.json` に保存されます。

## フロントエンド開発ガイドライン

### デザインシステム
フロントエンド開発では、必ず `apps/frontend/DESIGN_RULE.md` に記載された統合デザインシステムに従ってください：

- **カラーパレット**: Pokemon テーマと Apple HIG 準拠
- **タイポグラフィ**: Apple HIG タイポグラフィスケール
- **スペーシング**: 8pt グリッドシステム
- **コンポーネント**: Apple スタイルのUI要素
- **アクセシビリティ**: WCAG AA 準拠

### 主要なデザイン原則
1. **Pokemon テーマ**: プロフェッショナルでありながら Pokemon の世界観を維持
2. **Apple HIG 準拠**: iOS 向け Apple Human Interface Guidelines に従う
3. **アクセシビリティファースト**: 適切なタッチターゲットとコントラスト比を確保
4. **一貫性**: 定義されたデザイントークンを使用

### フロントエンド技術仕様
- **Package Manager**: npm/pnpm
- **Module System**: ES modules (`"type": "module"`)
- **Linting**: ESLint 9 Flat Config
- **Build Tool**: Metro Bundler (CommonJS config: `metro.config.cjs`)
- **Platform**: iOS/Android (React Native)

### フロントエンド開発フロー
1. `apps/frontend/` ディレクトリで作業
2. デザインシステムに従ったコンポーネント実装
3. ESLint/TypeScript チェックの実行
4. iOS/Android シミュレータでの動作確認

## ディレクトリ構造維持の原則

### 重要原則
1. **ディレクトリ構造の変更時は、必ず関連するドキュメントを同時に更新する**
2. **新しいディレクトリやファイルを追加した場合は、以下のファイルを更新する**：
   - `apps/backend/README.md` - バックエンドのディレクトリ構造
   - `apps/backend/rule/CLAUDE.md` - API実装ルール内のディレクトリ構造
   - `apps/backend/rule/TEST.md` - テストルール内のディレクトリ構造
   - `CLAUDE.md` - プロジェクト全体のアーキテクチャ説明

### 更新手順
1. ディレクトリ構造に変更を加える
2. 上記リストの全てのドキュメントを確認し、必要に応じて更新
3. 変更内容が正確に反映されているか確認
4. コミット時に「ディレクトリ構造更新に伴うドキュメント更新」を明記

### 対象となる変更
- 新しいディレクトリの追加
- 既存ディレクトリの削除
- ディレクトリ名の変更
- 重要なファイルの移動
- アーキテクチャの変更

### フロントエンド構造変更時の更新対象
フロントエンドのディレクトリ構造に変更が発生した場合は、追加で以下のファイルも更新する：
- `apps/frontend/README.md` - フロントエンドのディレクトリ構造
- `apps/frontend/rule/DESIGN_RULE.md` - デザインシステム内の構造記述
- `apps/frontend/rule/CLAUDE.md` - フロントエンド実装ルール

### 注意事項
- この原則は、プロジェクトの整合性を保つために必須です
- AIが作業する際は、この原則を必ず遵守してください
- ドキュメントの更新を忘れると、他の開発者やAIが混乱する原因となります
- バックエンドとフロントエンドで管理するドキュメントが異なるため、変更対象を正確に把握すること
