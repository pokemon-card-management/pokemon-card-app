// src/types/index.ts

// アプリ全体で共通して使う型定義
export interface Item {
    id: string
    name: string
    description?: string
  }
  
  // React Navigation 用の型定義（画面間のパラメータ）
  export type NavigationParams = {
    ItemList: undefined
    ItemDetail: { id: string }
    CreateItem: undefined
    UpdateItem: { id: string }
  }
  