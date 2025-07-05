// 基本的なReact Nativeモック
global.jest = require('jest');

// React Nativeコンポーネントのモック
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  
  // Alert、Keyboard等の基本モック
  RN.Alert = {
    alert: jest.fn(),
  };
  
  RN.Keyboard = {
    dismiss: jest.fn(),
  };
  
  return RN;
});

// expo-routerのモック
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  },
}));

// React Native Testing Libraryは一旦無効化
jest.mock('@testing-library/react-native', () => ({
  render: jest.fn(),
  screen: {},
  fireEvent: {},
  waitFor: jest.fn(),
}));