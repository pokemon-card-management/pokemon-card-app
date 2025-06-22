// Pokemon Card Management デザインシステム準拠のカラーパレット
import { THEME, POKEMON_TYPES, SEMANTIC } from './design';

// 統合デザインシステムからのカラーエクスポート
export const Colors = THEME;

// Pokemon タイプカラー（互換性のため）
export const PokemonColors = POKEMON_TYPES;

// セマンティックカラー（互換性のため）
export const SemanticColors = SEMANTIC;

// 従来のAPI互換性のためのエイリアス
export const LegacyColors = {
  light: {
    primary: THEME.light.pokemon.primary,
    secondary: THEME.light.text.secondary,
    background: THEME.light.background.primary,
    surface: THEME.light.surface.secondary,
    card: THEME.light.surface.card,
    text: THEME.light.text.primary,
    textSecondary: THEME.light.text.secondary,
    border: THEME.light.border.primary,
    accent: THEME.light.pokemon.accent,
    success: SEMANTIC.success,
    warning: SEMANTIC.warning,
    error: SEMANTIC.error,
    headerBackground: THEME.light.surface.primary,
    tabBackground: THEME.light.surface.primary,
    tabInactive: THEME.light.text.tertiary,
  },
  dark: {
    primary: THEME.dark.pokemon.primary,
    secondary: THEME.dark.text.secondary,
    background: THEME.dark.background.primary,
    surface: THEME.dark.surface.secondary,
    card: THEME.dark.surface.card,
    text: THEME.dark.text.primary,
    textSecondary: THEME.dark.text.secondary,
    border: THEME.dark.border.primary,
    accent: THEME.dark.pokemon.accent,
    success: SEMANTIC.success,
    warning: SEMANTIC.warning,
    error: SEMANTIC.error,
    headerBackground: THEME.dark.surface.primary,
    tabBackground: THEME.dark.surface.primary,
    tabInactive: THEME.dark.text.tertiary,
  },
  pokemon: POKEMON_TYPES,
};

// デフォルトエクスポート（後方互換性のため）
export default Colors;