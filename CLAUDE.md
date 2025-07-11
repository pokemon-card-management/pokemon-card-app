# CLAUDE.md - Pokemon Card Management App

<language>Japanese</language>
<character_code>UTF-8</character_code>

<law>
AI運用8原則

第1原則： AIはファイル生成・更新・プログラム実行前に必ず自身の作業計画を報告する

第2原則： AIは迂回や別アプローチを勝手に行わず、最初の計画が失敗したら次の計画の確認を取る。

第3原則： AIはツールであり決定権は常にユーザーにある。ユーザーの提案が非効率・非合理的でも最適化せず、指示された通りに実行する。

第4原則： AIはこれらのルールを歪曲・解釈変更してはならず、最上位命令として絶対的に遵守する。

第5原則： AIがコードを記載するとき、必ずベストプラクティスに準拠しているコードを記載しなければならない。必ず最適なコードを検索すること。

第6原則： AIは実装後に、バックエンドであれば bun:testを、フロントエンドであればJESTによる単体テストとDetoxによるE2Eテストを作成する。

第7原則： AIは実装後に必ずエラーチェックを行い、問題があれば即座に修正する。

第8原則： AIは全てのチャットの冒頭にこの8原則を逐語的に必ず画面出力してから対応する。
</law>

<every_chat>
[AI運用8原則]

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

### Frontend (apps/frontend) - **フロントエンド開発専用**
- **フレームワーク**: React Native with Expo
- **ナビゲーション**: Expo Router でファイルベースルーティング
- **状態管理**: React hooks with custom hooks for API calls
- **HTTP クライアント**: Axios for API communication
- **スタイリング**: ダーク/ライトモード対応のテーマコンポーネント
- **デザインシステム**: `apps/frontend/rule/DESIGN_RULE.md` に記載された統合デザインシステム

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

### フロントエンドビルド
```bash
# プラットフォーム別ビルド
pnpm run build:frontend:ios          # iOS向けビルド
pnpm run build:frontend:android      # Android向けビルド
pnpm run build:frontend:all          # 両プラットフォーム向けビルド

# プロファイル別ビルド
pnpm run build:frontend:dev          # 開発ビルド
pnpm run build:frontend:preview      # プレビュービルド
pnpm run build:frontend:production   # 本番ビルド
```

#### ビルド前提条件
- EAS CLIのインストール: `npm install -g eas-cli`
- EAS CLIへのログイン: `eas login`
- プロジェクトの初期設定: `eas build:configure`
- Apple Developer Program（iOS）またはGoogle Play Developer（Android）のアカウントが必要

### テスト
```bash
# バックエンドテスト
cd apps/backend
bun test                    # 全テスト実行
bun test --watch           # ウォッチモード
bun test --coverage        # カバレッジ付き

# フロントエンドテスト
cd apps/frontend
pnpm test                  # Jest単体テスト
pnpm test:e2e              # Detox E2Eテスト
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

### エラーチェック
```bash
# バックエンド検証
cd apps/backend
bun run typecheck          # TypeScript型チェック
bun test                   # テスト実行
bun run lint               # ESLint実行

# フロントエンド検証
cd apps/frontend
pnpm run lint              # ESLint実行
pnpm run typecheck         # TypeScript型チェック（存在する場合）
pnpm run start             # 開発サーバー起動してエラーログ確認
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

## バックエンド開発ルール

### 基本方針
- **TypeScript + Hono による API 実装**
- **型安全第一**：`any` の使用禁止、明示的な型定義必須
- **関心の分離**（ルーティング・バリデーション・ビジネスロジック）
- **RESTful API 設計に準拠**
- `zod` によるスキーマ検証と自動型推論
- `OpenAPIHono` の活用による API ドキュメント対応

### 使用技術
- `hono`（ルーティング・ミドルウェア）
- `@hono/zod-openapi`（OpenAPI連携）
- `zod`（スキーマ定義 & 型推論）
- `bun`（ランタイム・テスト）

### ルーティング規則

#### 通常API（CRUDなど）
```ts
// src/routes/items.ts
import { Hono } from 'hono'
import { getAllItems, getItemById } from '../controllers/item.controller'

const itemsRouter = new Hono()

itemsRouter.get('/', getAllItems)
itemsRouter.get('/:id', getItemById)

export default itemsRouter
```

#### 認証・OpenAPI対応が必要なAPI
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

### コントローラーの原則
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

### エラーハンドリング規約

#### 原則
- **エラーは`throwHttpError`を使用してスローする**
- **HTTPExceptionで統一したエラーハンドリング**
- **レスポンス形式の統一**

#### 実装例
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

### バックエンド禁止事項

| 禁止事項            | 理由                                         |
|---------------------|----------------------------------------------|
| `type: any`         | 型安全を損ない、予期しないエラーを生む     |
| 無名関数・匿名export | デバッグや保守性が著しく低下する           |
| エラーを握り潰す     | 正常系/異常系の動作保証ができなくなる       |
| fetch 直書き        | `services/` 層に分離し、再利用性とテスト性を確保 |
| `AppError` の使用   | `throwHttpError` を使用してHonoの`HTTPException`で統一する |

## フロントエンド開発ルール

### プロジェクト概要
React Native と Expo Router を使用したポケモンカード管理モバイルアプリケーションのフロントエンド開発です。

### デザインシステム
すべてのデザイン決定は、`apps/frontend/rule/DESIGN_RULE.md` に記載された統合デザインシステムに従う必要があります。

### 主要なデザイン原則
1. **Pokemon テーマ**: プロフェッショナルでありながら Pokemon の世界観を維持
2. **Apple HIG 準拠**: iOS 向け Apple Human Interface Guidelines に従う
3. **アクセシビリティファースト**: WCAG AA 準拠と適切なタッチターゲットを確保
4. **一貫性**: すべての UI 要素に定義されたデザイントークンを使用

### フロントエンド開発ガイドライン

#### デザイン実装
- UI コンポーネントを実装する前に必ず `DESIGN_RULE.md` を参照する
- デザインシステムで定義されたカラーパレットを使用する
- テキスト要素にはタイポグラフィスケールに従う
- 8pt グリッドシステムを使用して一貫したスペーシングを適用する
- 適切なタッチターゲット（最小 44pt）を実装する
- アクセシビリティのための適切なコントラスト比を確保する

#### コード構造
- コンポーネントは定義されたフォルダ構造に従って整理する
- ライト/ダークモードに対応するテーマ対応コンポーネントを使用する
- デザイントークンに適切な TypeScript 型を実装する
- デザインシステムで定義された命名規則に従う

#### フロントエンド技術仕様
- **Package Manager**: npm/pnpm
- **Module System**: ES modules (`"type": "module"`)
- **Linting**: ESLint 9 Flat Config
- **Build Tool**: Metro Bundler (CommonJS config: `metro.config.cjs`)
- **Platform**: iOS/Android (React Native)

#### フロントエンド開発フロー
1. `apps/frontend/` ディレクトリで作業
2. デザインシステムに従ったコンポーネント実装
3. ESLint/TypeScript チェックの実行
4. iOS/Android シミュレータでの動作確認

#### フロントエンド開発特有の考慮事項
- React Native コンポーネントの実装時は、iOS と Android 両方での動作を考慮する
- Expo Router を使用したナビゲーション構造に従う
- モバイルデバイスのパフォーマンスとメモリ使用量を最適化する
- タッチインタラクションとジェスチャーに適したUXを設計する
- 異なる画面サイズとデバイス仕様に対応するレスポンシブデザインを実装する

## テスト作成に関するルール

### テスト作成の判断基準
**画面やAPIの新しいコードを作成した際は、テスト作成するべきかどうかを必ず考慮する**

### テスト作成が必要なケース
1. **新しいAPIエンドポイント**: 全てのCRUD操作とエラーケース
2. **ビジネスロジック**: 複雑な計算や条件分岐を含む関数
3. **データ変換処理**: フォーマット変換、バリデーション処理
4. **認証・認可機能**: サインイン、権限チェック等のセキュリティ機能
5. **外部API連携**: サードパーティサービスとの統合部分

### テスト作成を検討するケース
1. **新しい画面コンポーネント**: 複雑な状態管理やユーザーインタラクション
2. **フォーム処理**: 入力検証、送信処理
3. **カスタムフック**: 再利用可能なロジック
4. **ユーティリティ関数**: 汎用的な処理関数

### テスト作成をスキップ可能なケース
1. **単純な表示コンポーネント**: スタイリングのみの静的コンポーネント
2. **設定ファイル**: 定数定義、設定値のみ
3. **一時的なプロトタイプ**: 実験的なコード

### テスト作成手順
1. テスト対象コードの作成完了後、即座にテスト必要性を判断
2. 必要な場合はテストケースを設計（正常系・異常系・境界値）
3. 適切なテストフレームワークを使用してテスト実装
4. テスト実行して全てパスすることを確認

### バックエンドテスト
- `bun test` により各ルートの API テストを実行
- `apps/backend/test/routes/` にルーティング単位で配置
- `supertest` or `undici` でAPIを呼び出して期待レスポンスを確認

### フロントエンドテスト
- **単体テスト**: Jest を使用したコンポーネント・フック・ユーティリティ関数のテスト
- **E2Eテスト**: Detox を使用したアプリケーション全体のテスト
- テストファイルは `__tests__/` ディレクトリに配置

## リサーチ・調査に関するルール

### 必須調査原則
**今後考えるべきことがあったら必ず調べる**

### 調査が必要なケース
1. **新しい技術やライブラリの使用**: 使用前にベストプラクティスを調査
2. **新機能の実装開始前**: 実装方法、ライブラリ選定、設計パターンを事前調査
3. **エラーが発生した場合**: 原因と適切な解決方法を調査
4. **設計判断が必要な場合**: 複数の選択肢がある際の比較調査
5. **パフォーマンス問題**: 最適化手法の調査
6. **セキュリティ要件**: セキュリティベストプラクティスの調査

### 実装前調査の原則
**実装を開始する前に、必ず以下を調査する**

1. **ライブラリ選定**: 
   - 公式推奨ライブラリの確認
   - コミュニティでの採用状況
   - メンテナンス状況（最終更新日、issue対応）
   - プロジェクトの技術スタック（React Native/Expo等）との互換性

2. **実装方法**: 
   - 公式ドキュメントのベストプラクティス
   - 既存プロジェクトでの実装パターン
   - エラーハンドリング方法
   - TypeScript対応状況

3. **代替手段の比較**:
   - 複数の選択肢がある場合の比較検討
   - 各選択肢のメリット・デメリット
   - プロジェクト要件への適合性

### 調査手順
1. **問題の明確化**: 調査すべき内容を具体的に定義
2. **信頼できる情報源の活用**: 公式ドキュメント、ベストプラクティス、専門記事
3. **複数の選択肢の比較**: メリット・デメリット、適用条件の分析
4. **実装への適用判断**: プロジェクト要件に最適な選択肢の決定
5. **調査結果の文書化**: 将来の参考のため調査結果を記録

### 調査結果の記録
- 重要な調査結果はプロジェクトのドキュメントに記録
- 今後の開発者が同じ調査を繰り返さないよう配慮
- 採用しなかった選択肢とその理由も記録

### 調査時間の目安
- 小規模な技術調査: 15-30分
- 中規模なアーキテクチャ調査: 1-2時間  
- 大規模な技術選定調査: 半日-1日

## コード変更後の検証プロセス

### 必須検証原則
**命令を受けてコードを変更したら、必ず最後に変更箇所の周りでエラーが起きるようになっていないか確認する**

### 検証手順
1. **即座の構文チェック**: コード変更直後にTypeScriptやESLintエラーがないか確認
2. **インポートエラーチェック**: 新しく追加したライブラリやモジュールが正しく解決されるか確認
3. **ビルドテスト**: 可能な限りビルド処理を実行して実行時エラーを事前に発見
4. **依存関係チェック**: 使用したライブラリがpackage.jsonに存在するか、または標準ライブラリかを確認

### 検証対象エラー
- **Import/Export エラー**: モジュール解決の失敗
- **TypeScript型エラー**: 型の不一致や未定義プロパティ
- **実行時エラー**: ビルド時に発見されない動的エラー
- **依存関係エラー**: 未インストールライブラリの使用

### 対応方針
- エラーが発見された場合は、必ず修正してからタスク完了とする
- 修正できない場合は、代替手段を検討するか、ユーザーに確認を求める
- 検証プロセスをスキップしてはならない