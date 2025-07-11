const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// プロジェクトルートディレクトリ
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// ホットリロードを有効にする
config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      // CORS設定でホットリロードを有効にする
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
      return middleware(req, res, next);
    };
  },
};

// ホットリロード設定とパスマッピング
config.resolver = {
  ...config.resolver,
  sourceExts: [...config.resolver.sourceExts, 'js', 'jsx', 'ts', 'tsx'],
  alias: {
    '@': path.resolve(__dirname, '.'),
    '@/components': path.resolve(__dirname, './components'),
    '@/src': path.resolve(__dirname, './src'),
  },
};

// モノレポ用のwatchFolders設定
config.watchFolders = [
  monorepoRoot,
];

// モノレポ用の依存関係解決設定
config.resolver = {
  ...config.resolver,
  nodeModulesPaths: [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(monorepoRoot, 'node_modules'),
  ],
  sourceExts: [...config.resolver.sourceExts, 'js', 'jsx', 'ts', 'tsx'],
  alias: {
    '@': path.resolve(__dirname, '.'),
    '@/components': path.resolve(__dirname, './components'),
    '@/src': path.resolve(__dirname, './src'),
  },
};

module.exports = config;