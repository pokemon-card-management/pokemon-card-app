# テスト実行ガイド

## 概要

このプロジェクトでは以下のテスト環境を提供しています：

- **Jest単体テスト** (フロントエンド)
- **Bun テスト** (バックエンド)
- **Maestro E2Eテスト** (フロントエンド)
- **Detox E2Eテスト** (フロントエンド - オプション)

## フロントエンド テスト

### 単体テスト (Jest)

```bash
# フロントエンドディレクトリに移動
cd apps/frontend

# 全テスト実行
pnpm test

# カバレッジ付きテスト実行
pnpm test --coverage

# ウォッチモード
pnpm test:watch

# デバッグ情報付き
pnpm test:debug
```

### E2Eテスト (Maestro) - 推奨

#### 前提条件

```bash
# Maestro CLIをインストール
curl -Ls "https://get.maestro.mobile.dev" | bash

# パスを追加
echo 'export PATH="$HOME/.maestro/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

#### ローカル実行

```bash
# アプリを起動 (別ターミナル)
cd apps/frontend
pnpm start

# Maestroテスト実行
pnpm test:maestro

# 個別テスト実行
pnpm test:maestro:smoke    # スモークテスト
pnpm test:maestro:auth     # 認証テスト
```

#### CI/CD実行

- Pull Request作成時に自動実行
- 'run-e2e-cloud' ラベル付きでMaestro Cloud実行

### E2Eテスト (Detox) - オプション

#### 前提条件

```bash
# iOS (macOSのみ)
brew tap wix/brew
brew install applesimutils

# Detox CLI
npm install -g detox-cli
```

#### 実行

```bash
cd apps/frontend

# iOS
pnpm build:e2e:ios
pnpm test:e2e --configuration ios.sim.debug

# Android
pnpm build:e2e:android
pnpm test:e2e --configuration android.emu.debug
```

## バックエンド テスト

```bash
# バックエンドディレクトリに移動
cd apps/backend

# 全テスト実行
bun test

# ウォッチモード
bun test --watch

# カバレッジ付き
bun test --coverage
```

## GitHub Actions

### 自動実行されるワークフロー

1. **test-frontend.yml** - フロントエンド単体テスト
   - TypeScriptチェック
   - ESLintチェック
   - Jestテスト (カバレッジ付き)
   - ビルドチェック
   - セキュリティスキャン

2. **test-backend.yml** - バックエンドテスト
   - Bunテスト実行

3. **e2e-tests.yml** - Maestro E2Eテスト (EAS無料プラン対応)
   - Expo Development Buildでアプリビルド
   - Maestroテスト実行 (smoke, auth, navigation)
   - Maestro Cloud実行 (APIキー設定時のみ)

4. **ci.yml** - 統合CI
   - 依存関係インストール
   - ESLintチェック
   - 全テスト実行

### 手動実行

```bash
# GitHub CLIを使用
gh workflow run e2e-tests.yml -f platform=android
gh workflow run e2e-tests.yml -f platform=ios
```

## テストファイル構成

### Jest単体テスト

```
apps/frontend/
├── __tests__/
│   ├── simple.test.js      # 基本テスト
│   └── signIn.test.js      # サインイン画面テスト
└── jest.config.js          # Jest設定
```

### Maestro E2Eテスト

```
.maestro/
├── smoke.yml               # スモークテスト
├── auth.yml                # 認証フローテスト
└── navigation.yml          # ナビゲーションテスト
```

### Detox E2Eテスト

```
apps/frontend/
├── e2e/
│   ├── signIn.test.js      # サインイン画面E2Eテスト
│   ├── jest.config.js      # Detox Jest設定
│   └── init.js             # Detox初期化
└── .detoxrc.js             # Detox設定
```

## トラブルシューティング

### Jest テスト

- **モジュール解決エラー**: `jest.setup.js`の設定確認
- **TypeScriptエラー**: `tsconfig.json`の設定確認
- **React Nativeモック**: `jest.config.js`のモック設定確認

### Maestro テスト

- **アプリが見つからない**: appIdの確認
- **要素が見つからない**: testIDの確認
- **タイムアウト**: アプリの起動時間を考慮

### Detox テスト

- **ビルドエラー**: `expo prebuild`の実行確認
- **シミュレータエラー**: デバイス設定の確認
- **パフォーマンス**: テスト実行時の負荷確認

## ベストプラクティス

1. **テスト駆動開発**: 新機能実装前にテストを作成
2. **段階的導入**: 重要な機能から順次テストケースを追加
3. **定期実行**: 夜間バッチでE2Eテストを実行
4. **早期発見**: PRレビュー前にローカルでテスト実行
5. **継続的改善**: テスト失敗時は根本原因を分析して改善

## 参考資料

- [Jest Documentation](https://jestjs.io/)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Maestro Documentation](https://maestro.mobile.dev/)
- [Detox Documentation](https://wix.github.io/Detox/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)