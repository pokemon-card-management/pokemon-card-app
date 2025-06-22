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
  const backgroundColor = isDark 
    ? (darkColor || Colors.dark.background[surface])
    : (lightColor || Colors.light.background[surface]);

  return (
    <View 
      style={[{ backgroundColor }, style]} 
      {...otherProps}
    >
      {children}
    </View>
  );
}

