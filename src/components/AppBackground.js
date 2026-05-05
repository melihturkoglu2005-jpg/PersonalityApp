import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function AppBackground() {
  const { colors } = useTheme();
  return <View style={[styles.fill, { backgroundColor: colors.background }]} />;
}

const styles = StyleSheet.create({
  fill: { ...StyleSheet.absoluteFillObject },
});
