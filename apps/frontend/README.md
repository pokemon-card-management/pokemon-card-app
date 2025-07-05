# pokemon-card-app/apps/frontend

## frontend の実行

```zsh
pnpm run start
```

## ディレクトリ構造

```
apps/
└── frontend/
    ├── app/                    # Expo Router によるファイルベースルーティング
    │   ├── +not-found.tsx
    │   ├── _layout.tsx
    │   ├── index.tsx
    │   ├── signIn.tsx
    │   └── welcome.tsx
    ├── assets/                 # 静的アセット（画像、フォント）
    │   ├── fonts/
    │   │   └── SpaceMono-Regular.ttf
    │   └── images/
    │       ├── adaptive-icon.png
    │       ├── favicon.png
    │       ├── icon.png
    │       ├── partial-react-logo.png
    │       ├── react-logo.png
    │       ├── react-logo@2x.png
    │       ├── react-logo@3x.png
    │       └── splash-icon.png
    ├── src/
    │   ├── api/                # APIサービス層
    │   │   └── items.ts
    │   ├── components/         # 再利用可能なUIコンポーネント
    │   │   ├── PokemonCard.tsx
    │   │   ├── ThemedButton.tsx
    │   │   ├── ThemedText.tsx
    │   │   └── ThemedView.tsx
    │   ├── constants/          # カラーテーマとデザイントークン
    │   │   ├── colors.ts
    │   │   └── design.ts
    │   ├── hooks/              # APIフックを含むカスタムフック
    │   │   ├── useColorScheme.ts
    │   │   ├── useItems.ts
    │   │   └── useThemeColor.ts
    │   ├── navigation/         # ナビゲーション設定
    │   │   └── AppNavigator.tsx
    │   ├── screens/            # スクリーンコンポーネント
    │   │   ├── CreateItemScreen.tsx
    │   │   ├── ItemDetailScreen.tsx
    │   │   ├── ItemListScreen.tsx
    │   │   └── UpdateItemScreen.tsx
    │   └── types/              # TypeScript型定義
    │       └── index.ts
    └── rule/                   # フロントエンド開発ルール
        ├── CLAUDE.md           # フロントエンド実装ルール
        └── DESIGN_RULE.md      # 統合デザインシステム
```
