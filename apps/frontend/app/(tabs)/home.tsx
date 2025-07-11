import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

import { Colors, Typography, Spacing } from '../../src/constants/design';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>ポケモンカード管理</Text>
          <Text style={styles.subtitle}>おかえりなさい！</Text>
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>クイックアクション</Text>
          <View style={styles.actionGrid}>
            <View style={styles.actionCard}>
              <Text style={styles.actionTitle}>🎴</Text>
              <Text style={styles.actionLabel}>カード追加</Text>
            </View>
            <View style={styles.actionCard}>
              <Text style={styles.actionTitle}>📋</Text>
              <Text style={styles.actionLabel}>カード一覧</Text>
            </View>
            <View style={styles.actionCard}>
              <Text style={styles.actionTitle}>🔍</Text>
              <Text style={styles.actionLabel}>検索</Text>
            </View>
            <View style={styles.actionCard}>
              <Text style={styles.actionTitle}>📊</Text>
              <Text style={styles.actionLabel}>統計</Text>
            </View>
          </View>
        </View>

        <View style={styles.recentActivity}>
          <Text style={styles.sectionTitle}>最近の活動</Text>
          <View style={styles.activityCard}>
            <Text style={styles.activityText}>最近追加されたカードはありません</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing[5],
  },
  header: {
    marginBottom: Spacing[8],
    alignItems: 'center',
  },
  title: {
    ...Typography.largeTitle,
    fontWeight: '700',
    color: Colors.dark.text.primary,
    textAlign: 'center',
    marginBottom: Spacing[2],
  },
  subtitle: {
    ...Typography.title3,
    color: Colors.dark.text.secondary,
    textAlign: 'center',
  },
  quickActions: {
    marginBottom: Spacing[8],
  },
  sectionTitle: {
    ...Typography.title2,
    fontWeight: '600',
    color: Colors.dark.text.primary,
    marginBottom: Spacing[4],
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: Colors.dark.surface.secondary,
    borderRadius: 12,
    padding: Spacing[4],
    alignItems: 'center',
    marginBottom: Spacing[3],
    borderWidth: 1,
    borderColor: Colors.dark.border.primary,
  },
  actionTitle: {
    fontSize: 32,
    marginBottom: Spacing[2],
  },
  actionLabel: {
    ...Typography.callout,
    fontWeight: '500',
    color: Colors.dark.text.primary,
    textAlign: 'center',
  },
  recentActivity: {
    marginBottom: Spacing[8],
  },
  activityCard: {
    backgroundColor: Colors.dark.surface.secondary,
    borderRadius: 8,
    padding: Spacing[4],
    borderWidth: 1,
    borderColor: Colors.dark.border.primary,
  },
  activityText: {
    ...Typography.body,
    color: Colors.dark.text.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});