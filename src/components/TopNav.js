import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, Platform } from 'react-native';
import { FONT, SERIF } from '../theme/constants';
import { useLayout, GRID } from '../theme/useLayout';

const LINKS = [
  { id: 'Home',           label: 'Ana Sayfa',        screen: 'Home' },
  { id: 'MBTI',           label: 'MBTI Testi',       screen: 'MBTI' },
  { id: 'Enneagram',      label: 'Enneagram',        screen: 'Enneagram' },
  { id: 'KisilikTipleri', label: 'Kişilik Tipleri',  screen: 'KisilikTipleri' },
  { id: 'CharacterGuide', label: 'Karakter Rehberi', screen: 'CharacterGuide' },
  { id: 'Kaynaklar',      label: 'Kaynaklar',        screen: 'Kaynaklar' },
];

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

// Ana sayfadaki üst çubukla aynı ölçüler: 1280 px kolon, logo sol, düğme sağ kenarda.
export default function TopNav({ navigation, active }) {
  const { isDesktop, gutter } = useLayout();

  const links = LINKS.map((item) => (
    <NavLink key={item.id} item={item} active={active === item.id} onPress={() => navigation.navigate(item.screen)} />
  ));

  return (
    <View style={s.wrap}>
      <View style={[s.inner, { paddingHorizontal: gutter, maxWidth: GRID + gutter * 2 }]}>
        <View style={s.row}>
          <View style={s.left}>
            <Pressable onPress={() => navigation.navigate('Home')} accessibilityRole="button" accessibilityLabel="Ana sayfa">
              <Text style={s.brand}>
                Indoles<Text style={s.brandSup}>®</Text>
              </Text>
            </Pressable>
            {isDesktop && <View style={s.links}>{links}</View>}
          </View>

          <Pressable
            onPress={() => navigation.navigate('MBTI')}
            accessibilityRole="button"
            style={({ hovered }) => [s.cta, hovered && s.ctaHover]}
          >
            <Text style={s.ctaText}>Teste Başla</Text>
          </Pressable>
        </View>

        {!isDesktop && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.linksScroll} style={{ marginTop: 6 }}>
            {links}
          </ScrollView>
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
