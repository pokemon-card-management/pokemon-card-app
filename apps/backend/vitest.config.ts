import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // `describe` や `it` をグローバルで使えるようにする
    environment: "node", // Node.js 環境で実行
    coverage: {
      reporter: ["text", "json", "html"], // カバレッジレポートを出力
    },
  },
});
