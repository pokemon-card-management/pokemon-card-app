import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';

import { Colors, Typography, Spacing, Radius, Shadows, Component, POKEMON_TYPES } from '../src/constants/design';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header />
        <HeroCardStack />
        <ActionButtons />
      </ScrollView>
    </SafeAreaView>
  );
}

const Header = () => (
  <View style={styles.header}>
    <View style={styles.logoContainer}>
      <Text style={styles.logoIcon}>⚡</Text>
      <Text style={styles.logoText}>ポケモンカード管理</Text>
    </View>
    <Text style={styles.subtitle}>コレクションを簡単に管理しよう</Text>
  </View>
);

const HeroCardStack = () => (
  <View style={styles.heroSection}>
    <View style={styles.pokemonCardStack}>
      <Card icon="⚡" style={styles.card1} />
      <Card icon="🔥" style={styles.card2} />
      <Card icon="💧" style={styles.card3} />
    </View>
  </View>
);

const Card = ({ icon, style }: { icon: string; style: object }) => (
  <View style={[styles.card, style]}>
    <Text style={styles.cardText}>{icon}</Text>
  </View>
);

const ActionButtons = () => (
  <View style={styles.actionSection}>
    <PrimaryButton text="ログインする" onPress={() => router.push('/(tabs)')} />
    <SecondaryButton text="新規サインインする" onPress={() => router.push('/signIn')} />
  </View>
);

const PrimaryButton = ({ text, onPress }: { text: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.primaryButton} onPress={onPress}>
    <Text style={styles.primaryButtonText}>{text}</Text>
  </TouchableOpacity>
);

const SecondaryButton = ({ text, onPress }: { text: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.secondaryButton} onPress={onPress}>
    <Text style={styles.secondaryButtonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background.primary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Spacing[5],
  },
  header: {
    alignItems: 'center',
    paddingTop: Spacing[10],
    paddingHorizontal: Spacing[5],
    paddingBottom: Spacing[8],
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing[3],
  },
  logoIcon: {
    fontSize: 40,
    marginRight: Spacing[3],
  },
  logoText: {
    ...Typography.title1,
    fontWeight: '600',
    color: Colors.dark.text.primary,
  },
  subtitle: {
    ...Typography.subheadline,
    color: Colors.dark.text.secondary,
    textAlign: 'center',
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: Spacing[10],
  },
  pokemonCardStack: {
    position: 'relative',
    width: 200,
    height: 280,
  },
  card: {
    position: 'absolute',
    width: 140,
    height: 200,
    backgroundColor: Colors.dark.surface.card,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.md,
    borderWidth: 2,
  },
  card1: {
    top: 0,
    left: 30,
    borderColor: POKEMON_TYPES.electric,
    backgroundColor: POKEMON_TYPES.electric + '20',
    transform: [{ rotate: '-10deg' }],
  },
  card2: {
    top: 20,
    left: 0,
    borderColor: POKEMON_TYPES.fire,
    backgroundColor: POKEMON_TYPES.fire + '20',
    transform: [{ rotate: '5deg' }],
  },
  card3: {
    top: 40,
    left: 60,
    borderColor: POKEMON_TYPES.water,
    backgroundColor: POKEMON_TYPES.water + '20',
    transform: [{ rotate: '-5deg' }],
  },
  cardText: {
    fontSize: 48,
  },
  actionSection: {
    paddingHorizontal: Spacing[5],
    paddingVertical: Spacing[4],
    gap: Spacing[5],
  },
  primaryButton: {
    backgroundColor: Colors.dark.pokemon.primary,
    height: Component.button.md,
    paddingHorizontal: Spacing[10],
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
  },
  primaryButtonText: {
    ...Typography.headline,
    color: Colors.dark.background.primary,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    height: Component.button.md,
    paddingHorizontal: Spacing[5],
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.pokemon.primary,
  },
  secondaryButtonText: {
    ...Typography.callout,
    fontWeight: '600',
    color: Colors.dark.pokemon.primary,
  },
});
