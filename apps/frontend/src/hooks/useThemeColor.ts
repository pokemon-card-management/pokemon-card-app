/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '../constants/design';

import { useColorScheme } from './useColorScheme';

type ColorCategory = 'background' | 'surface' | 'text' | 'border' | 'pokemon';
type ColorKey = 'primary' | 'secondary' | 'tertiary' | 'card' | 'elevated' | 'focus' | 'accent' | 'disabled';

export function useThemeColor(
  props: { light?: string; dark?: string },
  category: ColorCategory,
  key: ColorKey
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][category][key as keyof typeof Colors.light[typeof category]];
  }
}

// 従来のAPIとの互換性のためのヘルパー関数
export function useLegacyThemeColor(
  props: { light?: string; dark?: string },
  colorName: string
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    // 基本的なカラーマッピング
    switch (colorName) {
      case 'text':
        return Colors[theme].text.primary;
      case 'background':
        return Colors[theme].background.primary;
      case 'tint':
        return Colors[theme].pokemon.primary;
      case 'tabIconDefault':
        return Colors[theme].text.tertiary;
      case 'tabIconSelected':
        return Colors[theme].pokemon.primary;
      default:
        return Colors[theme].text.primary;
    }
  }
}
