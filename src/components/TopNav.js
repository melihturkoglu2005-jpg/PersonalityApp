import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '../theme/colors';
import SoftPressable from './SoftPressable';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = isWeb && width >= 1024;

const FONT = Platform.select({
  ios:     'System',
  android: 'sans-serif',
  web:     "'Nunito', 'Varela Round', system-ui, sans-serif",
});

export default function TopNav({ navigation }) {
  const links = [
    { label: 'Kişilik Tipleri', screen: 'KisilikTipleri' },
    { label: 'Karakterler',     screen: 'CharacterGuide' },
    { label: 'Kaynaklar',       screen: 'Kaynaklar' },
  ];

  return (
    <View style={s.wrap}>
      <View style={s.inner}>
        <TouchableOpacity
          style={s.brand}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Ana sayfa"
        >
          <View style={s.logo}>
            <Text style={s.logoText}>İ</Text>
          </View>
          <Text style={s.brandTitle}>indoles</Text>
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
  wrap:  { backgroundColor: colors.surface },
  inner: {
    maxWidth: 720,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand:      { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.primary,
    borderBottomWidth: 3,
    borderBottomColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText:   { color: '#fff', fontSize: 17, fontWeight: '900', fontFamily: FONT },
  brandTitle: { fontSize: 18, fontWeight: '800', color: colors.textPrimary, fontFamily: FONT, letterSpacing: -0.3 },
  links:      { flexDirection: 'row', alignItems: 'center', gap: 2 },
  linkWrap:   { width: 'auto' },
  linkBtn:    { paddingHorizontal: isDesktop ? 12 : 8, paddingVertical: 7, borderRadius: 10 },
  linkText:   { fontSize: isDesktop ? 13 : 12, color: colors.textSecondary, fontFamily: FONT, fontWeight: '700' },
  divider:    { height: 2, backgroundColor: colors.border },
});
