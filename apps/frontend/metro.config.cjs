const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

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

// ファイル変更監視設定
config.watchFolders = [
  ...config.watchFolders || [],
];

module.exports = config;