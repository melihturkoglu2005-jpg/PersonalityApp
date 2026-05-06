import React from 'react';
import { View, Text } from 'react-native';
import { Platform } from 'react-native';

export default function HamburgerIcon({ color = '#333', size = 24 }) {
  if (Platform.OS === 'web') {
    return (
      <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
        <div style={{
          width: size,
          height: size,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{
            width: '100%',
            height: '2.5px',
            backgroundColor: color,
            borderRadius: '1px',
          }} />
          <div style={{
            width: '100%',
            height: '2.5px',
            backgroundColor: color,
            borderRadius: '1px',
          }} />
          <div style={{
            width: '100%',
            height: '2.5px',
            backgroundColor: color,
            borderRadius: '1px',
          }} />
        </div>
      </View>
    );
  }

  // Native için Text ile basit çizgiler
  return (
    <View style={{ width: size, height: size, justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={{ width: '100%', height: 2.5, backgroundColor: color, borderRadius: 1 }} />
      <View style={{ width: '100%', height: 2.5, backgroundColor: color, borderRadius: 1 }} />
      <View style={{ width: '100%', height: 2.5, backgroundColor: color, borderRadius: 1 }} />
    </View>
  );
}
