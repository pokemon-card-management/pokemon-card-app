import React from 'react';
import { View, ViewStyle } from 'react-native';

import { Colors } from '../constants/colors';

interface ThemedViewProps {
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
  lightColor?: string;
  darkColor?: string;
}

export function ThemedView({ 
  style, 
  lightColor: _lightColor, 
  darkColor, 
  children,
  ...otherProps 
}: ThemedViewProps) {
  // ダークテーマを使用（将来的にはテーマ切り替え機能を追加可能）
  const backgroundColor = darkColor || Colors.dark.background;

  return (
    <View 
      style={[{ backgroundColor }, style]} 
      {...otherProps}
    >
      {children}
    </View>
  );
}

