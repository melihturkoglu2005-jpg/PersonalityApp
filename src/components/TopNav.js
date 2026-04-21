import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '../theme/colors';
import SoftPressable from './SoftPressable';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isDesktop = isWeb && width >= 1024;
const FONT = Platform.select({
  ios: 'System',
  android: 'sans-serif',
  web: "'Inter', system-ui, sans-serif",
});

export default function TopNav({ navigation }) {
  const links = [
    { label: 'Kişilik Tipleri', screen: 'KisilikTipleri' },
    { label: 'Kaynaklar', screen: 'Kaynaklar' },
  ];

  return (
    <View style={s.wrap}>
      <View style={s.inner}>
        <TouchableOpacity
          style={s.brand}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.8}
        >
          <View style={s.logo}>
            <Text style={s.logoText}>I</Text>
          </View>
          <View>
            <Text style={s.brandTitle}>Indoles</Text>
            <Text style={s.brandSub}>Kişilik Analizi</Text>
          </View>
        </TouchableOpacity>

        <View style={s.links}>
          {links.map((item) => (
            <SoftPressable
              key={item.label}
              containerStyle={s.linkWrap}
              style={s.linkBtn}
              onPress={() => navigation.navigate(item.screen)}
              hoverScale={1.02}
            >
              <Text style={s.linkText}>{item.label}</Text>
            </SoftPressable>
          ))}
        </View>
      </View>
      <View style={s.divider} />
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { backgroundColor: colors.surface },
  inner: {
    maxWidth: 720,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: { color: '#fff', fontSize: 16, fontWeight: '700', fontFamily: FONT },
  brandTitle: { fontSize: 15, fontWeight: '700', color: colors.textPrimary, fontFamily: FONT, lineHeight: 18 },
  brandSub: { fontSize: 11, color: colors.textMuted, fontFamily: FONT, lineHeight: 14 },
  links: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  linkWrap: { width: 'auto' },
  linkBtn: { paddingHorizontal: isDesktop ? 14 : 10, paddingVertical: 8, borderRadius: 8 },
  linkText: { fontSize: isDesktop ? 14 : 13, color: colors.textSecondary, fontFamily: FONT, fontWeight: '500' },
  divider: { height: 1, backgroundColor: colors.border },
});
