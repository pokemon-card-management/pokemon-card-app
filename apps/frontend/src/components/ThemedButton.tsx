import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { useColorScheme } from 'react-native';

import { Colors, Typography, Radius, Shadows, Component } from '../constants/design';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ThemedButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function ThemedButton({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ThemedButtonProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const buttonStyles = [
    styles.base,
    styles[`size_${size}`],
    styles[`variant_${variant}_${isDark ? 'dark' : 'light'}`],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text_${size}`],
    styles[`text_${variant}_${isDark ? 'dark' : 'light'}`],
    disabled && styles.textDisabled,
    textStyle,
  ];

  const handlePress = () => {
    if (!disabled && !loading) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' || variant === 'accent' 
            ? (isDark ? Colors.dark.background.primary : Colors.light.background.primary)
            : (isDark ? Colors.dark.pokemon.primary : Colors.light.pokemon.primary)
          }
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.md,
  },
  
  // Sizes
  size_sm: {
    height: Component.button.sm,
    paddingHorizontal: 12,
  },
  size_md: {
    height: Component.button.md,
    paddingHorizontal: 16,
  },
  size_lg: {
    height: Component.button.lg,
    paddingHorizontal: 20,
  },

  // Primary variant
  variant_primary_light: {
    backgroundColor: Colors.light.pokemon.primary,
    ...Shadows.sm,
  },
  variant_primary_dark: {
    backgroundColor: Colors.dark.pokemon.primary,
    ...Shadows.sm,
  },

  // Secondary variant
  variant_secondary_light: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.light.pokemon.primary,
  },
  variant_secondary_dark: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.dark.pokemon.primary,
  },

  // Accent variant
  variant_accent_light: {
    backgroundColor: Colors.light.pokemon.accent,
    ...Shadows.sm,
  },
  variant_accent_dark: {
    backgroundColor: Colors.dark.pokemon.accent,
    ...Shadows.sm,
  },

  // Ghost variant
  variant_ghost_light: {
    backgroundColor: 'transparent',
  },
  variant_ghost_dark: {
    backgroundColor: 'transparent',
  },

  // Disabled state
  disabled: {
    opacity: 0.4,
  },

  // Text styles
  text: {
    textAlign: 'center',
  },

  text_sm: {
    ...Typography.footnote,
    fontWeight: '600',
  },
  text_md: {
    ...Typography.callout,
    fontWeight: '600',
  },
  text_lg: {
    ...Typography.headline,
  },

  // Text colors for variants
  text_primary_light: {
    color: Colors.light.background.primary,
  },
  text_primary_dark: {
    color: Colors.dark.background.primary,
  },

  text_secondary_light: {
    color: Colors.light.pokemon.primary,
  },
  text_secondary_dark: {
    color: Colors.dark.pokemon.primary,
  },

  text_accent_light: {
    color: Colors.light.background.primary,
  },
  text_accent_dark: {
    color: Colors.dark.background.primary,
  },

  text_ghost_light: {
    color: Colors.light.pokemon.primary,
  },
  text_ghost_dark: {
    color: Colors.dark.pokemon.primary,
  },

  textDisabled: {
    opacity: 0.6,
  },
});