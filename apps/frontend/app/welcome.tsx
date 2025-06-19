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
import { Colors } from '../src/constants/colors';

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
    backgroundColor: Colors.dark.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoIcon: {
    fontSize: 40,
    marginRight: 10,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.dark.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 40,
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
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
  },
  card1: {
    top: 0,
    left: 30,
    borderColor: Colors.pokemon.electric,
    backgroundColor: Colors.pokemon.electric + '20',
    transform: [{ rotate: '-10deg' }],
  },
  card2: {
    top: 20,
    left: 0,
    borderColor: Colors.pokemon.fire,
    backgroundColor: Colors.pokemon.fire + '20',
    transform: [{ rotate: '5deg' }],
  },
  card3: {
    top: 40,
    left: 60,
    borderColor: Colors.pokemon.water,
    backgroundColor: Colors.pokemon.water + '20',
    transform: [{ rotate: '-5deg' }],
  },
  cardText: {
    fontSize: 48,
  },
  actionSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 20,
  },
  primaryButton: {
    backgroundColor: Colors.dark.primary,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    color: Colors.dark.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: Colors.dark.surface,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  secondaryButtonText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '600',
  },
});
