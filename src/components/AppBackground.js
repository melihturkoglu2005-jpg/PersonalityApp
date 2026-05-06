import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

let LinearGradient;
try {
  LinearGradient = require('expo-linear-gradient').LinearGradient;
} catch (e) {
  LinearGradient = null;
}

export default function AppBackground() {
  const { isDark, colors } = useTheme();

  // Light: saf beyazdan çok ufak buz mavisi tona
  // Dark: mevcut arka plan renginin içinde hafif ton geçişi
  const gradientColors = isDark
    ? [
        '#131620',   // biraz daha koyu-mavi çalan üst
        colors.background,           // '#0F1117' orta
        '#0D1015',   // biraz daha siyah alt
      ]
    : [
        '#FFFFFF',   // tam beyaz üst
        '#F7FAFF',   // çok ufak buz mavisi orta
        '#FFFFFF',   // yeniden beyaza
      ];

  if (LinearGradient) {
    return (
      <LinearGradient
        colors={gradientColors}
        locations={isDark ? [0, 0.5, 1] : [0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
    );
  }

  return <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.background }]} />;
}
