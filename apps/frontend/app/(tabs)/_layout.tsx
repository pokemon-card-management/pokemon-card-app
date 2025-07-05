import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import { Colors } from '../../src/constants/design';
import { useColorScheme } from '../../src/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark ? Colors.dark.pokemon.primary : Colors.light.pokemon.primary,
        tabBarInactiveTintColor: isDark ? Colors.dark.text.tertiary : Colors.light.text.tertiary,
          tabBarStyle: {
            backgroundColor: isDark ? Colors.dark.surface.primary : Colors.light.surface.primary,
            borderTopColor: isDark ? Colors.dark.border.primary : Colors.light.border.primary,
            borderTopWidth: 1,
            ...Platform.select({
        ios: { position: 'absolute' },
        default: {},
      }),
    },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'ホーム',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              size={24} 
              name={focused ? 'home' : 'home-outline'} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
