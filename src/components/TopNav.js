import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, Platform } from 'react-native';
import { FONT, SERIF } from '../theme/constants';
import { useLayout, GRID } from '../theme/useLayout';
import { NAV_LINKS, navAktifMi } from '../navigation/siteNav';

function NavLink({ item, active, onPress }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="link" accessibilityLabel={item.label} style={s.linkBtn}>
      {({ hovered }) => (
        <Text style={[s.linkText, (active || hovered) && s.linkTextOn, active && s.linkTextActive]}>
          {item.label}
        </Text>
      )}
    </Pressable>
  );
}

// Tüm sayfalarda (ana sayfa dahil) aynı üst çubuk: 1280 px kolon, logo sol, menü yanında.
export default function TopNav({ navigation, active, seffaf = false }) {
  const { isDesktop, gutter } = useLayout();

  const links = NAV_LINKS.map((item) => (
    <NavLink key={item.id} item={item} active={navAktifMi(item.id, active)} onPress={() => navigation.navigate(item.screen)} />
  ));

  return (
    <View style={[s.wrap, seffaf && { backgroundColor: 'transparent' }]}>
      <View style={[s.inner, { paddingHorizontal: gutter, maxWidth: GRID + gutter * 2 }]}>
        <View style={[s.row, !isDesktop && { justifyContent: 'center' }]}>
          <Pressable onPress={() => navigation.navigate('Home')} accessibilityRole="button" accessibilityLabel="Ana sayfa">
            <Text style={s.brand}>
              Indoles<Text style={s.brandSup}>®</Text>
            </Text>
          </Pressable>
          {isDesktop && <View style={s.links}>{links}</View>}
        </View>

        {!isDesktop && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginTop: 16, justifyContent: 'center' }}>
            {links}
          </View>
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap:  { backgroundColor: '#FFFFFF' },
  inner: { width: '100%', alignSelf: 'center', paddingTop: 24, paddingBottom: 16 },
  row:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  left:  { flexDirection: 'row', alignItems: 'center', gap: 24 },
  brand: { color: '#000000', fontSize: 30, letterSpacing: -0.6, fontFamily: SERIF },
  brandSup: { fontSize: 12, position: 'relative', top: -14 },
  links: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  linksScroll: { gap: 20 },
  linkBtn: { paddingVertical: 8 },
  linkText: { color: '#6F6F6F', fontSize: 14, fontFamily: FONT },
  linkTextOn: { color: '#000000' },
  linkTextActive: { fontWeight: '500' },
  cta: {
    borderRadius: 999, paddingHorizontal: 24, paddingVertical: 10,
    backgroundColor: '#000000',
    ...(Platform.OS === 'web' ? { transitionProperty: 'transform', transitionDuration: '180ms' } : null),
  },
  ctaHover: { transform: [{ scale: 1.03 }] },
  ctaText:  { color: '#FFFFFF', fontSize: 14, fontFamily: FONT },
});
