import React from 'react';
import { View } from 'react-native';

export default function HamburgerIcon({ color = '#333', size = 24 }) {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M3 12h18M3 6h18M3 18h18"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </View>
  );
}
