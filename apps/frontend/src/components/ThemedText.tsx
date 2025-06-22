import { StyleSheet, Text, type TextProps } from 'react-native';
import { useColorScheme } from 'react-native';

import { Colors, Typography } from '../constants/design';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'largeTitle' | 'title1' | 'title2' | 'title3' | 'headline' | 'body' | 'callout' | 'subheadline' | 'footnote' | 'caption1' | 'caption2';
  emphasis?: 'primary' | 'secondary' | 'tertiary' | 'disabled';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'body',
  emphasis = 'primary',
  ...rest
}: ThemedTextProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // カスタムカラーが指定されている場合は優先、そうでなければテーマカラーを使用
  const color = isDark 
    ? (darkColor || Colors.dark.text[emphasis])
    : (lightColor || Colors.light.text[emphasis]);

  return (
    <Text
      style={[
        { color },
        styles[type],
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  largeTitle: {
    ...Typography.largeTitle,
  },
  title1: {
    ...Typography.title1,
  },
  title2: {
    ...Typography.title2,
  },
  title3: {
    ...Typography.title3,
  },
  headline: {
    ...Typography.headline,
  },
  body: {
    ...Typography.body,
  },
  callout: {
    ...Typography.callout,
  },
  subheadline: {
    ...Typography.subheadline,
  },
  footnote: {
    ...Typography.footnote,
  },
  caption1: {
    ...Typography.caption1,
  },
  caption2: {
    ...Typography.caption2,
  },
});
