# pokemon-card-app

## apps/frontend の実行

```zsh
pnpm run dev:frontend
```

## apps/buckend の実行

```zsh
pnpm run dev:backend
```

## フロントエンドのビルド

### プラットフォーム別ビルド

```zsh
# iOS向けビルド
pnpm run build:frontend:ios
# ローカルでビルドする場合 AppleDeveloperの有料アカウントでログインが必要
pnpm run build:frontend:dev:ios --local

# Android向けビルド
pnpm run build:frontend:android
# ローカルでビルドする場合
pnpm run build:frontend:dev:android:local --local

# 両プラットフォーム向けビルド
pnpm run build:frontend:all
```

### プロファイル別ビルド

```zsh
# 開発ビルド
pnpm run build:frontend:dev

# プレビュービルド
pnpm run build:frontend:preview

# 本番ビルド
pnpm run build:frontend:production
```

### 前提条件

- EAS CLIのインストール: `npm install -g eas-cli`
- EAS CLIへのログイン: `eas login`
- プロジェクトの初期設定: `eas build:configure`
- Apple Developer Program（iOS）またはGoogle Play Developer（Android）のアカウントが必要

## ブランチのお掃除

```zsh
git branch --merged | grep -vE '(main|develop|master)' | xargs -I {} git branch -d {} && git branch -r --merged origin/main | grep -vE 'origin/(main|develop|master)' | sed 's/origin\///' | xargs -I {} git push origin --delete {}
```
