import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors } from '../src/constants/colors';

export default function SignInScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>µ¤ó¤ó</Text>
      <Text style={styles.subtitle}>–™-...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
  },
});