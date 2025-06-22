import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors, Typography, Spacing } from '../src/constants/design';

export default function SignInScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>サインイン</Text>
      <Text style={styles.subtitle}>準備中...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.background.primary,
  },
  title: {
    ...Typography.title1,
    fontWeight: '600',
    color: Colors.dark.text.primary,
    marginBottom: Spacing[3],
  },
  subtitle: {
    ...Typography.subheadline,
    color: Colors.dark.text.secondary,
  },
});