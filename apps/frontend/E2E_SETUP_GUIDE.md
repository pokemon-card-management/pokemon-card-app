# Detox E2E テストセットアップガイド

## 概要

このドキュメントでは、Expo + React Native プロジェクトでDetox E2Eテストを設定する手順を説明します。

## 前提条件

### 必要なツール
- Node.js 20以上
- Xcode（iOS用）
- Android Studio（Android用）
- Detox CLI

## セットアップ手順

### 1. Detoxの依存関係インストール

```bash
# Detox関連の依存関係をインストール
npm install --save-dev detox

# iOS用の追加ツール（macOSのみ）
brew tap wix/brew
brew install applesimutils

# Detox CLIのグローバルインストール
npm install -g detox-cli
```

### 2. expo prebuildでネイティブコード生成

Detoxを使用するには、ネイティブコードが必要です：

```bash
# iOSプラットフォーム用
npx expo prebuild --platform ios

# Androidプラットフォーム用  
npx expo prebuild --platform android
```

### 3. アプリビルド

#### iOS用
```bash
# iOSアプリのビルド
npm run build:e2e:ios

# または手動ビルド
xcodebuild -workspace ios/frontend.xcworkspace -scheme frontend -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build
```

#### Android用
```bash
# Androidアプリのビルド
npm run build:e2e:android

# または手動ビルド
cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug
```

### 4. テスト実行

#### iOS Simulator
```bash
# iOSシミュレータでテスト実行
detox test --configuration ios.sim.debug
```

#### Android Emulator
```bash
# Androidエミュレータでテスト実行
detox test --configuration android.emu.debug
```

## テストファイルの場所

- **テストディレクトリ**: `e2e/`
- **サインインテスト**: `e2e/signIn.test.js`
- **設定ファイル**: `.detoxrc.js`

## 重要な注意事項

### Expo固有の制約
1. **ネイティブコード必須**: `expo prebuild`でネイティブコードを生成する必要があります
2. **EAS Build推奨**: 本格的なテストにはEAS Buildでビルドしたアプリを使用することを推奨
3. **開発効率**: 設定が複雑で、開発サイクルが長くなる可能性があります

### 代替案: Maestro

Expo公式では、DetoxよりもMaestroを推奨しています：

**Maestroの利点**:
- より簡単な設定
- YAML記法で直感的
- EAS Workflowsとの統合
- Expo公式サポート

**Maestroテスト例**:
```yaml
appId: com.yourcompany.frontend
---
- launchApp
- tapOn: "メールアドレス"
- inputText: "pikachu@example.com"
- tapOn: "パスワード"  
- inputText: "pikachuPokemon1234!"
- tapOn: "サインイン"
- assertVisible: "ホーム"
```

## トラブルシューティング

### よくある問題

1. **ビルドエラー**: `expo prebuild`後にプロジェクトが正常にビルドできない
   - 解決策: iOS/Android固有の設定を確認

2. **シミュレータ起動エラー**: iOS SimulatorまたはAndroid Emulatorが起動しない
   - 解決策: XcodeまたはAndroid Studioで事前にシミュレータを起動

3. **テスト要素が見つからない**: `testID`が正しく設定されていない
   - 解決策: コンポーネントに適切な`testID`を追加

### サポートされているテストパターン

- フォーム入力
- ボタンタップ
- ナビゲーション
- アラート確認
- ローディング状態
- テキスト検証

## 実装状況

### 完了済み
- [x] Detox設定ファイル作成
- [x] サインイン画面のテストファイル作成
- [x] testID追加（TextInput、ThemedButton）
- [x] package.json設定

### 実装が必要
- [ ] `expo prebuild`実行
- [ ] iOS/Androidアプリビルド
- [ ] 実際のテスト実行・デバッグ
- [ ] CI/CD統合

## 推奨事項

**短期的には**:
- Jest単体テストに集中（React Native Testing Library）
- 手動テストでE2E要件をカバー

**長期的には**:
- MaestroによるE2Eテスト導入を検討
- EAS Workflowsとの統合

これにより、開発効率を保ちながら包括的なテスト戦略を実現できます。