import React from 'react';
import { View, Text, Switch, StyleSheet, Platform, Dimensions } from 'react-native';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;
const FONT = Platform.select({ ios: 'System', android: 'sans-serif', web: "'Nunito', 'Varela Round', system-ui, sans-serif" });

export default function TestAutoAdvanceToggle({ value, onValueChange, accentColor }) {
  return (
    <View style={s.row}>
      <Text style={s.label}>Cevaba dokununca ilerle</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: `${accentColor}99` }}
        thumbColor={Platform.OS === 'android' ? (value ? accentColor : '#f4f3f4') : undefined}
        ios_backgroundColor={colors.border}
      />
    </View>
  );
}

const s = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: isDesktop ? 0 : 20,
    paddingVertical: 10,
    marginBottom: 4,
    gap: 12,
  },
  label: {
    flex: 1,
    fontSize: isDesktop ? 14 : 13,
    color: colors.textSecondary,
    fontFamily: FONT,
    fontWeight: '500',
  },
});
