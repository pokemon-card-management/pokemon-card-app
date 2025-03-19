import 'dotenv/config';

if (!process.env.API_BASE_URL) {
  process.env.API_BASE_URL = 'http://localhost:3000'; // デフォルト値を設定
}

console.log('JEST SETUP: API_BASE_URL =', process.env.API_BASE_URL);

global.process.env.EXPO_OS = 'ios'; // または 'android'
