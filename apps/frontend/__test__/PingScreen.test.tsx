import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import PingScreen from '@/screens/PingScreen';

// fetchのモックを設定（必要に応じて）
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'pong' }),
  })
) as jest.Mock;

describe('PingScreen', () => {
  it('should display "pong" when API call is successful', async () => {
    const { getByText } = render(<PingScreen />);
    // 初期状態は "Loading..." と表示されるはず
    expect(getByText("Loading...")).toBeTruthy();

    // API呼び出しの結果を待つ
    await waitFor(() => {
      expect(getByText("pong")).toBeTruthy();
    });
  });
});
