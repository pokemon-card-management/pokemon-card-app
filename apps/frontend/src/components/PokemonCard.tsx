import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useColorScheme } from 'react-native';

import { Colors, Typography, Spacing, Radius, Shadows, Component, POKEMON_TYPES } from '../constants/design';

export type PokemonType = keyof typeof POKEMON_TYPES;

export interface PokemonCardProps {
  name: string;
  type: PokemonType;
  rarity?: string;
  setName?: string;
  cardNumber?: string;
  onPress?: () => void;
  style?: ViewStyle;
  compact?: boolean;
}

export function PokemonCard({
  name,
  type,
  rarity,
  setName,
  cardNumber,
  onPress,
  style,
  compact = false,
}: PokemonCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const typeColor = POKEMON_TYPES[type];
  const cardStyles = [
    styles.card,
    compact ? styles.compactCard : styles.standardCard,
    {
      backgroundColor: isDark ? Colors.dark.surface.card : Colors.light.surface.card,
      borderColor: isDark ? Colors.dark.border.primary : Colors.light.border.primary,
    },
    style,
  ];

  const typeStyles = [
    styles.typeBadge,
    {
      backgroundColor: typeColor + '20',
      borderColor: typeColor,
    },
  ];

  const CardContent = () => (
    <View style={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text 
          style={[
            compact ? styles.compactName : styles.name,
            { color: isDark ? Colors.dark.text.primary : Colors.light.text.primary }
          ]}
          numberOfLines={1}
        >
          {name}
        </Text>
        <View style={typeStyles}>
          <Text style={[styles.typeText, { color: typeColor }]}>
            {type.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Card Details */}
      {!compact && (
        <View style={styles.details}>
          {rarity && (
            <Text style={[styles.detailText, { color: isDark ? Colors.dark.text.secondary : Colors.light.text.secondary }]}>
              {rarity}
            </Text>
          )}
          {setName && (
            <Text style={[styles.detailText, { color: isDark ? Colors.dark.text.tertiary : Colors.light.text.tertiary }]}>
              {setName}
            </Text>
          )}
          {cardNumber && (
            <Text style={[styles.cardNumber, { color: isDark ? Colors.dark.text.tertiary : Colors.light.text.tertiary }]}>
              #{cardNumber}
            </Text>
          )}
        </View>
      )}

      {/* Type indicator bar */}
      <View style={[styles.typeIndicator, { backgroundColor: typeColor }]} />
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyles}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <CardContent />
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyles}>
      <CardContent />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  
  standardCard: {
    aspectRatio: Component.pokemonCard.aspectRatio,
    ...Shadows.md,
  },
  
  compactCard: {
    height: 80,
    ...Shadows.sm,
  },

  content: {
    flex: 1,
    padding: Spacing[3],
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing[2],
  },

  name: {
    ...Typography.headline,
    flex: 1,
    marginRight: Spacing[2],
  },

  compactName: {
    ...Typography.callout,
    fontWeight: '600',
    flex: 1,
    marginRight: Spacing[2],
  },

  typeBadge: {
    paddingHorizontal: Spacing[2],
    paddingVertical: Spacing[1],
    borderRadius: Radius.sm,
    borderWidth: 1,
  },

  typeText: {
    ...Typography.caption1,
    fontWeight: '600',
  },

  details: {
    flex: 1,
    justifyContent: 'space-between',
  },

  detailText: {
    ...Typography.footnote,
    marginBottom: Spacing[1],
  },

  cardNumber: {
    ...Typography.caption2,
    textAlign: 'right',
    marginTop: 'auto',
  },

  typeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
  },
});