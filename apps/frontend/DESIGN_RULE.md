# Pokemon Card Management アプリ 統合デザインシステム

## 🎨 カラーシステム

### Primary Colors (Pokemon Theme)
```typescript
const PRIMARY = {
  50: '#EFF6FF',   // Lightest
  100: '#DBEAFE',
  200: '#BFDBFE',
  300: '#93C5FD',
  400: '#60A5FA',
  500: '#3B82E6',  // Base Primary (Pokemon Blue)
  600: '#2563EB',
  700: '#1D4ED8',
  800: '#1E40AF',
  900: '#1E3A8A',  // Darkest
}

const ACCENT = {
  50: '#FFFBEB',
  100: '#FEF3C7',
  200: '#FDE68A',
  300: '#FCD34D',
  400: '#FBBF24',
  500: '#F59E0B',  // Electric Yellow
  600: '#D97706',
  700: '#B45309',
  800: '#92400E',
  900: '#78350F',
}
```

### Pokemon Type Colors
```typescript
const POKEMON_TYPES = {
  fire: '#EF4444',
  water: '#3B82F6',
  grass: '#22C55E',
  electric: '#F59E0B',
  psychic: '#A855F7',
  ice: '#06B6D4',
  dragon: '#8B5CF6',
  dark: '#374151',
  fairy: '#EC4899',
  fighting: '#DC2626',
  poison: '#7C3AED',
  ground: '#D97706',
  flying: '#0EA5E9',
  bug: '#65A30D',
  rock: '#78716C',
  ghost: '#6B21A1',
  steel: '#64748B',
  normal: '#9CA3AF',
}
```

### Semantic Colors
```typescript
const SEMANTIC = {
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
}
```

### Adaptive Theme System
```typescript
const THEME = {
  light: {
    // Background
    background: {
      primary: '#FFFFFF',
      secondary: '#F8FAFC',
      tertiary: '#F1F5F9',
    },
    
    // Surface
    surface: {
      primary: '#FFFFFF',
      secondary: '#F8FAFC',
      elevated: '#FFFFFF',
      card: '#FFFFFF',
    },
    
    // Text
    text: {
      primary: '#0F172A',      // High emphasis
      secondary: '#475569',    // Medium emphasis  
      tertiary: '#94A3B8',     // Low emphasis
      disabled: '#CBD5E1',
    },
    
    // Borders & Dividers
    border: {
      primary: '#E2E8F0',
      secondary: '#F1F5F9',
      focus: '#3B82E6',
    },
    
    // Pokemon Theme Specific
    pokemon: {
      cardBackground: '#FFFFFF',
      cardBorder: '#E2E8F0',
      primary: '#3B82E6',
      accent: '#F59E0B',
    }
  },
  
  dark: {
    // Background
    background: {
      primary: '#0F172A',
      secondary: '#1E293B',
      tertiary: '#334155',
    },
    
    // Surface
    surface: {
      primary: '#1E293B',
      secondary: '#334155',
      elevated: '#475569',
      card: '#1E293B',
    },
    
    // Text
    text: {
      primary: '#F1F5F9',
      secondary: '#CBD5E1',
      tertiary: '#94A3B8',
      disabled: '#64748B',
    },
    
    // Borders & Dividers
    border: {
      primary: '#475569',
      secondary: '#334155',
      focus: '#60A5FA',
    },
    
    // Pokemon Theme Specific
    pokemon: {
      cardBackground: '#1E293B',
      cardBorder: '#475569',
      primary: '#60A5FA',
      accent: '#FCD34D',
    }
  }
}
```

## ✏️ タイポグラフィ (Apple HIG準拠)

### Type Scale
```typescript
const TYPOGRAPHY = {
  // Display
  largeTitle: {
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '400',
    letterSpacing: 0.37,
  },
  
  // Headlines
  title1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '400',
    letterSpacing: 0.36,
  },
  
  title2: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '400',
    letterSpacing: 0.35,
  },
  
  title3: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '400',
    letterSpacing: 0.38,
  },
  
  // Body
  headline: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    letterSpacing: -0.41,
  },
  
  body: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400',
    letterSpacing: -0.41,
  },
  
  callout: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '400',
    letterSpacing: -0.32,
  },
  
  subheadline: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400',
    letterSpacing: -0.24,
  },
  
  footnote: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    letterSpacing: -0.08,
  },
  
  caption1: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    letterSpacing: 0,
  },
  
  caption2: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: '400',
    letterSpacing: 0.07,
  },
}
```

### Font Family
```typescript
const FONTS = {
  primary: 'SF Pro Display',
  secondary: 'SF Pro Text',
  fallback: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}
```

## 📏 Spacing System (8pt Grid)

```typescript
const SPACING = {
  0: 0,
  1: 4,    // 0.25rem
  2: 8,    // 0.5rem  
  3: 12,   // 0.75rem
  4: 16,   // 1rem    - Base unit
  5: 20,   // 1.25rem
  6: 24,   // 1.5rem
  8: 32,   // 2rem
  10: 40,  // 2.5rem
  12: 48,  // 3rem
  16: 64,  // 4rem
  20: 80,  // 5rem
  24: 96,  // 6rem
}

// Component Specific
const COMPONENT_SPACING = {
  // Padding
  paddingXS: 8,
  paddingS: 12,
  paddingM: 16,
  paddingL: 20,
  paddingXL: 24,
  
  // Margins
  marginXS: 8,
  marginS: 12,
  marginM: 16,
  marginL: 20,
  marginXL: 24,
  
  // Gaps
  gapXS: 4,
  gapS: 8,
  gapM: 12,
  gapL: 16,
  gapXL: 20,
}
```

## 🔄 Border Radius

```typescript
const RADIUS = {
  none: 0,
  xs: 2,
  sm: 4,
  base: 6,     // Standard elements
  md: 8,       // Pokemon cards
  lg: 12,      // Large cards
  xl: 16,      // Sheets, modals
  '2xl': 20,   // Large components
  '3xl': 24,   // Hero elements
  full: 9999,  // Pills, avatars
}

// Component Mapping
const COMPONENT_RADIUS = {
  button: RADIUS.md,        // 8px
  pokemonCard: RADIUS.md,   // 8px (Pokemon card style)
  card: RADIUS.base,        // 6px
  input: RADIUS.base,       // 6px
  modal: RADIUS.xl,         // 16px
  sheet: RADIUS.xl,         // 16px
  badge: RADIUS.full,       // Pill shape
  avatar: RADIUS.full,      // Circle
  image: RADIUS.sm,         // 4px
}
```

## 🌅 Shadow System (iOS-style)

```typescript
const SHADOWS = {
  none: 'none',
  
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  
  base: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  
  xl: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
}
```

## 🎛️ Component Design Rules

### Buttons
```typescript
const BUTTON = {
  // Sizes (Apple minimum touch target: 44pt)
  sizes: {
    sm: {
      height: 32,
      paddingHorizontal: 12,
      fontSize: 14,
    },
    md: {
      height: 44,  // Apple recommended minimum
      paddingHorizontal: 16,
      fontSize: 16,
    },
    lg: {
      height: 52,
      paddingHorizontal: 20,
      fontSize: 18,
    },
  },
  
  // Variants
  variants: {
    primary: {
      backgroundColor: PRIMARY[500],
      color: '#FFFFFF',
      borderRadius: RADIUS.md,
      shadow: SHADOWS.sm,
    },
    secondary: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: PRIMARY[500],
      color: PRIMARY[500],
      borderRadius: RADIUS.md,
    },
    accent: {
      backgroundColor: ACCENT[500],
      color: '#FFFFFF',
      borderRadius: RADIUS.md,
      shadow: SHADOWS.sm,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: PRIMARY[500],
      borderRadius: RADIUS.md,
    },
  },
  
  // States (Apple-style feedback)
  states: {
    pressed: {
      opacity: 0.8,
      scale: 0.98,
    },
    disabled: {
      opacity: 0.4,
    },
  },
}
```

### Pokemon Cards
```typescript
const POKEMON_CARD = {
  // Standard Pokemon card proportions
  standard: {
    aspectRatio: 0.7,
    borderRadius: RADIUS.md,
    shadow: SHADOWS.md,
    padding: SPACING[3],
    backgroundColor: THEME.light.pokemon.cardBackground,
    borderWidth: 1,
    borderColor: THEME.light.pokemon.cardBorder,
  },
  
  // Compact list view
  compact: {
    borderRadius: RADIUS.base,
    shadow: SHADOWS.sm,
    padding: SPACING[4],
    marginVertical: SPACING[2],
  },
  
  // Featured/Hero cards
  featured: {
    borderRadius: RADIUS.lg,
    shadow: SHADOWS.lg,
    padding: SPACING[5],
  },
}
```

### Navigation
```typescript
const NAVIGATION = {
  // Tab Bar (Apple style)
  tabBar: {
    height: 83, // Safe area + tab bar
    backgroundColor: THEME.light.surface.primary,
    borderTopWidth: 0.5,
    borderTopColor: THEME.light.border.primary,
    shadow: SHADOWS.sm,
  },
  
  // Header
  header: {
    height: 44,
    backgroundColor: THEME.light.surface.primary,
    borderBottomWidth: 0.5,
    borderBottomColor: THEME.light.border.primary,
  },
}
```

### Input Fields
```typescript
const INPUT = {
  base: {
    height: 44,
    borderRadius: RADIUS.base,
    paddingHorizontal: SPACING[4],
    borderWidth: 1,
    fontSize: 16, // iOS recommended for preventing zoom
    backgroundColor: THEME.light.surface.primary,
  },
  
  states: {
    default: {
      borderColor: THEME.light.border.primary,
    },
    focused: {
      borderColor: PRIMARY[500],
      borderWidth: 2,
      shadow: SHADOWS.sm,
    },
    error: {
      borderColor: SEMANTIC.error,
    },
  },
}
```

## ♿ アクセシビリティ配慮

### Color Contrast (WCAG AA準拠)
```typescript
const ACCESSIBILITY = {
  contrast: {
    normal: 4.5,   // 通常テキスト
    large: 3.0,    // 大きなテキスト (18px+)
    ui: 3.0,       // UI要素
  },
  
  // Color blind friendly
  colorBlindSafe: {
    primary: '#0066CC',
    secondary: '#FF6600',
    success: '#009900',
    warning: '#FFAA00',
    error: '#CC0000',
  },
}
```

### Touch Targets
```typescript
const TOUCH_TARGETS = {
  minimum: 44,      // Apple minimum (44x44pt)
  recommended: 48,  // Material Design recommendation
  comfortable: 56,  // Large touch targets
}
```

### Motion & Animation (Apple-style)
```typescript
const ANIMATION = {
  duration: {
    short: 200,
    medium: 300,
    long: 500,
  },
  
  easing: {
    easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    easeIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    easeInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  },
  
  respectsReduceMotion: true,
}
```

## 📱 Responsive Breakpoints

```typescript
const BREAKPOINTS = {
  sm: 375,  // iPhone SE
  md: 414,  // iPhone Pro
  lg: 768,  // iPad mini
  xl: 1024, // iPad Pro
}
```

## 🎨 Design Principles

### Pokemon Theme Integration
1. **親しみやすさ**: ポケモンの世界観を大切にしつつ、過度に子供っぽくならない
2. **清潔感**: カード情報を整理しやすい、すっきりとしたレイアウト
3. **信頼性**: 大切なコレクション情報を管理するアプリとしての安心感
4. **楽しさ**: カードゲームの魅力を損なわない、ワクワク感のあるUI

### Apple Design Philosophy
1. **Clarity**: コンテンツが最優先、装飾は最小限
2. **Deference**: UIがコンテンツを邪魔しない
3. **Depth**: 階層構造を視覚的に表現

## 🔧 Implementation Guidelines

### Constants File Structure
```typescript
// src/constants/design.ts
export const Colors = THEME;
export const Typography = TYPOGRAPHY;
export const Spacing = SPACING;
export const Radius = RADIUS;
export const Shadows = SHADOWS;
export const PokemonTypes = POKEMON_TYPES;
```

### Component Naming Convention
- `PokemonCard` - ポケモンカード表示コンポーネント
- `ThemedButton` - テーマ対応ボタン
- `TypeBadge` - ポケモンタイプ表示バッジ
- `SafeAreaView` - セーフエリア対応ビュー

### File Organization
```
src/
├── components/
│   ├── ui/          # 基本UIコンポーネント
│   ├── pokemon/     # ポケモン関連コンポーネント
│   └── themed/      # テーマ対応コンポーネント
├── constants/
│   ├── design.ts    # デザインシステム
│   └── colors.ts    # カラーパレット
└── hooks/
    └── useTheme.ts  # テーマフック
```

---

このデザインシステムは、Pokemon Card Managementアプリの一貫したユーザー体験を提供し、Apple のデザイン哲学に準拠しながら、ポケモンの世界観を大切にしたものです。