import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

import { Colors, Typography, Spacing } from '../src/constants/design';

const REDIRECT_DELAY = 100; // ms

export default function IndexScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/welcome');
    }, REDIRECT_DELAY);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ポケモンカード管理</Text>
      <Text style={styles.subtitle}>読み込み中...</Text>
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
