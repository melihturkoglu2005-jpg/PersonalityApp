import React from 'react';
import { Image, Text, View } from 'react-native';
import { SERIF } from '../theme/constants';

const blackMark = require('../../assets/brand-mark.png');
const whiteMark = require('../../assets/brand-mark-white.png');

export default function BrandLogo({ size = 30, lightOnDark = false }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: Math.round(size * 0.22) }}>
      <Image source={lightOnDark ? whiteMark : blackMark} resizeMode="contain" style={{ width: size, height: size }} accessibilityElementsHidden />
      <Text style={{ color: lightOnDark ? '#FFFFFF' : '#000000', fontFamily: SERIF, fontSize: size, letterSpacing: -0.02 * size }}>
        Indoles
      </Text>
    </View>
  );
}
