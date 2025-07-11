// Pokemon Card Management アプリ 統合デザインシステム
// DESIGN_RULE.md に基づく実装

// Primary Colors (Pokemon Theme)
const PRIMARY = {
  50: '#EFF6FF',
  100: '#DBEAFE',
  200: '#BFDBFE',
  300: '#93C5FD',
  400: '#60A5FA',
  500: '#3B82E6',  // Base Primary (Pokemon Blue)
  600: '#2563EB',
  700: '#1D4ED8',
  800: '#1E40AF',
  900: '#1E3A8A',
} as const;

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
} as const;

// Pokemon Type Colors
export const POKEMON_TYPES = {
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
} as const;

// Semantic Colors
export const SEMANTIC = {
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
} as const;

// Adaptive Theme System
export const THEME = {
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
      primary: PRIMARY[500],
      accent: ACCENT[500],
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
      primary: PRIMARY[400],
      accent: ACCENT[300],
    }
  }
} as const;

// Typography (Apple HIG準拠)
export const TYPOGRAPHY = {
  // Display
  largeTitle: {
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '400' as const,
    letterSpacing: 0.37,
  },
  
  // Headlines
  title1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '400' as const,
    letterSpacing: 0.36,
  },
  
  title2: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '400' as const,
    letterSpacing: 0.35,
  },
  
  title3: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '400' as const,
    letterSpacing: 0.38,
  },
  
  // Body
  headline: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600' as const,
    letterSpacing: -0.41,
  },
  
  body: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400' as const,
    letterSpacing: -0.41,
  },
  
  callout: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '400' as const,
    letterSpacing: -0.32,
  },
  
  subheadline: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400' as const,
    letterSpacing: -0.24,
  },
  
  footnote: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400' as const,
    letterSpacing: -0.08,
  },
  
  caption1: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  
  caption2: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: '400' as const,
    letterSpacing: 0.07,
  },
} as const;

// Spacing System (8pt Grid)
export const SPACING = {
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
} as const;

// Border Radius
export const RADIUS = {
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
} as const;

// Shadow System (iOS-style)
export const SHADOWS = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  
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
} as const;

// Component Specific Constants
export const COMPONENT = {
  // Touch Targets (Apple minimum: 44pt)
  touchTarget: {
    minimum: 44,
    recommended: 48,
    comfortable: 56,
  },
  
  // Button Heights
  button: {
    sm: 32,
    md: 44,  // Apple recommended minimum
    lg: 52,
  },
  
  // Pokemon Card
  pokemonCard: {
    aspectRatio: 0.7, // Standard Pokemon card ratio
  },
  
  // Navigation
  tabBar: {
    height: 83, // Safe area + tab bar
  },
  
  header: {
    height: 44,
  },
} as const;

// Animation & Motion
export const ANIMATION = {
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
} as const;

// Breakpoints
export const BREAKPOINTS = {
  sm: 375,  // iPhone SE
  md: 414,  // iPhone Pro
  lg: 768,  // iPad mini
  xl: 1024, // iPad Pro
} as const;

// Export unified design system
export const Colors = THEME;
export const Typography = TYPOGRAPHY;
export const Spacing = SPACING;
export const Radius = RADIUS;
export const Shadows = SHADOWS;
export const Component = COMPONENT;
export const Animation = ANIMATION;

// Default export for convenience
export default {
  Colors: THEME,
  Typography: TYPOGRAPHY,
  Spacing: SPACING,
  Radius: RADIUS,
  Shadows: SHADOWS,
  Component: COMPONENT,
  Animation: ANIMATION,
  PokemonTypes: POKEMON_TYPES,
  Semantic: SEMANTIC,
};
