# Maestro E2E テストセットアップガイド

## 概要

このドキュメントでは、Expo + React Native プロジェクトでMaestro E2Eテストを設定する手順を説明します。

## 前提条件

### 必要なツール
- Node.js 20以上
- Xcode（iOS用）
- Android Studio（Android用）
- Maestro CLI

## セットアップ手順

### 1. Maestroのインストール

```bash
# Maestro CLIのインストール（ワンコマンド）
curl -Ls "https://get.maestro.mobile.dev" | bash

# パスの設定
export PATH="$PATH":"$HOME/.maestro/bin"

# インストール確認
maestro --version
```

### 2. Expo開発サーバーの起動

Maestroは実行中のアプリに対してテストを実行します：

```bash
# フロントエンドアプリケーションの起動
pnpm run start

# または特定のプラットフォーム用に起動
pnpm run ios    # iOS
pnpm run android # Android
```

### 3. テスト実行

#### 基本的なテスト実行
```bash
# スモークテスト
maestro test .maestro/smoke.yml

# 認証テスト
maestro test .maestro/auth.yml

# 全テストの実行
maestro test .maestro/
```

#### 特定のタグでテスト実行
```bash
# スモークテストのみ実行
maestro test .maestro/ --include-tags smoke

# 重要テストのみ実行
maestro test .maestro/ --include-tags critical
```

## テストファイルの場所

- **テストディレクトリ**: `.maestro/`
- **スモークテスト**: `.maestro/smoke.yml`
- **認証テスト**: `.maestro/auth.yml`
- **ナビゲーションテスト**: `.maestro/navigation.yml`
- **完全フローテスト**: `.maestro/complete-flow.yml`

## Maestroの利点

### Expo開発での利点
1. **簡単な設定**: 複雑なネイティブビルドが不要
2. **YAML記法**: 直感的でわかりやすい構文
3. **リアルタイム実行**: 開発中のアプリに対してテスト実行
4. **Expo公式サポート**: ExpoとEAS Workflowsとの統合

### Maestroテスト例

```yaml
appId: host.exp.Exponent
tags:
  - smoke
---
# スモークテスト
- openLink: exp://127.0.0.1:8081
- assertVisible: "ホーム画面へ"
- tapOn: "ホーム画面へ"
- assertVisible: "ホーム"
```

## 重要な注意事項

### Expo固有の設定
1. **openLink使用**: `launchApp`の代わりに`openLink: exp://127.0.0.1:8081`を使用
2. **開発サーバー必須**: テスト実行前にExpo開発サーバーを起動
3. **ポート番号**: 実際のExpoサーバーのポート番号に合わせる

### テスト要素の識別
- **testID**: コンポーネントに適切な`testID`を追加
- **テキスト**: 表示テキストでの要素識別
- **ID**: 一意のID属性での要素識別

## 利用可能なテストパターン

### 基本操作
- `tapOn`: 要素をタップ
- `assertVisible`: 要素の表示確認
- `assertNotVisible`: 要素の非表示確認
- `inputText`: テキスト入力
- `openLink`: リンクを開く

### 条件分岐
- `runFlow`: 条件に応じたフロー実行
- `when`: 条件分岐

### 待機処理
- `waitForAnimationToEnd`: アニメーション完了待ち
- `waitUntilVisible`: 要素の表示待ち

## 実装状況

### 完了済み
- [x] Maestro CLI インストール
- [x] テストファイル作成（smoke、auth、navigation、complete-flow）
- [x] package.json設定
- [x] Expo開発環境対応

### 実装が必要
- [ ] 実際のテスト実行・デバッグ
- [ ] CI/CD統合
- [ ] より詳細なテストシナリオ作成

## トラブルシューティング

### よくある問題

1. **接続エラー**: Expo開発サーバーが起動していない
   - 解決策: `pnpm run start`でサーバーを起動

2. **要素が見つからない**: `testID`が正しく設定されていない
   - 解決策: コンポーネントに適切な`testID`を追加

3. **ポート番号エラー**: 実際のExpoサーバーのポート番号と異なる
   - 解決策: テストファイルのポート番号を確認・修正

### デバッグ方法

```bash
# デバッグ出力付きでテスト実行
maestro test .maestro/smoke.yml --debug-output debug/

# 詳細なログ出力
maestro test .maestro/smoke.yml --format HTML --output report.html
```

## 推奨事項

**テスト戦略**:
1. **スモークテスト**: 基本機能の確認
2. **認証テスト**: サインイン/サインアウト機能
3. **ナビゲーションテスト**: 画面遷移の確認
4. **完全フローテスト**: エンドツーエンドの業務フロー

**CI/CD統合**:
- EAS Workflowsとの統合
- GitHub Actionsでの自動テスト実行
- Maestro Cloudでのクラウドテスト実行

これにより、開発効率を保ちながら包括的なE2Eテスト戦略を実現できます。