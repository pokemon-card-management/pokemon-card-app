import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useColorScheme } from 'react-native';

import { Colors } from '../constants/design';

interface ThemedViewProps {
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
  lightColor?: string;
  darkColor?: string;
  surface?: 'primary' | 'secondary' | 'card' | 'elevated';
}

export function ThemedView({ 
  style, 
  lightColor, 
  darkColor, 
  surface = 'primary',
  children,
  ...otherProps 
}: ThemedViewProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // カスタムカラーが指定されている場合は優先
  // surfaceの種類に応じて適切なカラーパレットを使用
  const getBackgroundColor = () => {
    if (isDark) {
      if (darkColor) return darkColor;
      // surface の種類に応じて適切なパレットから選択
      if (surface === 'card' || surface === 'elevated') {
        return Colors.dark.surface[surface];
      }
      return Colors.dark.background[surface] || Colors.dark.background.primary;
    } else {
      if (lightColor) return lightColor;
      // surface の種類に応じて適切なパレットから選択
      if (surface === 'card' || surface === 'elevated') {
        return Colors.light.surface[surface] || Colors.light.surface.primary;
      }
      return Colors.light.background[surface] || Colors.light.background.primary;
    }
  };
  
  const backgroundColor = getBackgroundColor();

  return (
    <View 
      style={[{ backgroundColor }, style]} 
      {...otherProps}
    >
      {children}
    </View>
  );
}

