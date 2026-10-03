import React from 'react';
import { View, Text, Switch, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { FONT } from '../theme/constants';

export default function TestAutoAdvanceToggle({ value, onValueChange, accentColor }) {
  const { colors } = useTheme();
  return (
    <View style={s.row}>
      <Text style={[s.label, { color: colors.textSecondary }]}>Cevaba dokununca ilerle</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: accentColor }}
        thumbColor={Platform.OS === 'android' ? (value ? '#FFFFFF' : '#f4f3f4') : '#FFFFFF'}
        ios_backgroundColor={colors.border}
        {...(Platform.OS === 'web' ? { activeThumbColor: '#FFFFFF' } : null)}
      />
    </View>
  );
}

const s = StyleSheet.create({
  row:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  label: { flex: 1, fontSize: 13, fontFamily: FONT },
});
