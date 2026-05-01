import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function AppBackground() {
  return <View style={styles.fill} />;
}

const styles = StyleSheet.create({
  fill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
  },
});
