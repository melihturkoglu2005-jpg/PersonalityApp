import React from 'react';
import { View } from 'react-native';
import { Platform } from 'react-native';

export default function ThemeToggleIcon({ isDark, color = '#333', size = 20 }) {
  if (isDark) {
    if (Platform.OS === 'web') {
      return (
        <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
          <div style={{
            width: size,
            height: size,
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '40%',
              height: '40%',
              border: `2px solid ${color}`,
              borderRadius: '50%',
            }} />
            <div style={{
              position: 'absolute',
              top: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              height: '15%',
              backgroundColor: color,
            }} />
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              height: '15%',
              backgroundColor: color,
            }} />
            <div style={{
              position: 'absolute',
              left: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '15%',
              height: '2px',
              backgroundColor: color,
            }} />
            <div style={{
              position: 'absolute',
              right: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '15%',
              height: '2px',
              backgroundColor: color,
            }} />
          </div>
        </View>
      );
    }

    // Native için basit güneş ikonu
    return (
      <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{
          width: size * 0.4,
          height: size * 0.4,
          borderRadius: size * 0.2,
          borderWidth: 2,
          borderColor: color,
          position: 'absolute',
        }} />
        <View style={{
          position: 'absolute',
          top: 0,
          width: 2,
          height: size * 0.15,
          backgroundColor: color,
        }} />
        <View style={{
          position: 'absolute',
          bottom: 0,
          width: 2,
          height: size * 0.15,
          backgroundColor: color,
        }} />
        <View style={{
          position: 'absolute',
          left: 0,
          width: size * 0.15,
          height: 2,
          backgroundColor: color,
        }} />
        <View style={{
          position: 'absolute',
          right: 0,
          width: size * 0.15,
          height: 2,
          backgroundColor: color,
        }} />
      </View>
    );
  }

  // Ay ikonu (dark mode off)
  if (Platform.OS === 'web') {
    return (
      <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
        <div style={{
          width: size * 0.8,
          height: size * 0.8,
          backgroundColor: color,
          borderRadius: '50%',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            top: '-10%',
            right: '-10%',
            width: '30%',
            height: '30%',
            backgroundColor: 'transparent',
            borderRadius: '50%',
            border: `2px solid ${color}`,
          }} />
        </div>
      </View>
    );
  }

  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{
        width: size * 0.8,
        height: size * 0.8,
        backgroundColor: color,
        borderRadius: size * 0.4,
        position: 'relative',
      }}>
        <View style={{
          position: 'absolute',
          top: -size * 0.1,
          right: -size * 0.1,
          width: size * 0.3,
          height: size * 0.3,
          backgroundColor: 'transparent',
          borderRadius: size * 0.15,
          borderWidth: 2,
          borderColor: color,
        }} />
      </View>
    </View>
  );
}
