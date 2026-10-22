import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { FONT } from '../theme/constants';
import { useLayout, GRID } from '../theme/useLayout';
import { NAV_LINKS, navAktifMi } from '../navigation/siteNav';
import BrandLogo from './BrandLogo';

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
  const [menuOpen, setMenuOpen] = useState(false);

  const links = NAV_LINKS.map((item) => (
    <NavLink key={item.id} item={item} active={navAktifMi(item.id, active)} onPress={() => { setMenuOpen(false); navigation.navigate(item.screen); }} />
  ));

  return (
    <View style={[s.wrap, seffaf && !menuOpen && { backgroundColor: 'transparent' }]}>
      <View style={[s.inner, { paddingHorizontal: gutter, maxWidth: GRID + gutter * 2 }]}>
        <View style={s.row}>
          <Pressable onPress={() => navigation.navigate('Home')} accessibilityRole="button" accessibilityLabel="Ana sayfa">
            <BrandLogo size={30} />
          </Pressable>
          {isDesktop && <View style={s.links}>{links}</View>}
          {!isDesktop && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              accessibilityState={{ expanded: menuOpen }}
              onPress={() => setMenuOpen((open) => !open)}
              style={s.menuToggle}
            >
              <Text style={s.menuToggleText}>{menuOpen ? 'Kapat  ×' : 'Menü'}</Text>
            </Pressable>
          )}
        </View>

        {!isDesktop && menuOpen && (
          <View style={s.mobileMenu}>
            {links}
          </View>
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap:  { backgroundColor: '#FFFFFF', zIndex: 20 },
  inner: { width: '100%', alignSelf: 'center', paddingTop: 18, paddingBottom: 16 },
  row:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  links: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  linkBtn: { paddingVertical: 9 },
  linkText: { color: '#6F6F6F', fontSize: 14, fontFamily: FONT },
  linkTextOn: { color: '#000000' },
  linkTextActive: { fontWeight: '500' },
  menuToggle: { paddingHorizontal: 14, paddingVertical: 9, borderWidth: 1, borderColor: '#D9D9D7', borderRadius: 100 },
  menuToggleText: { fontFamily: FONT, color: '#111111', fontSize: 13, fontWeight: '500' },
  mobileMenu: {
    marginTop: 15, paddingTop: 13, paddingBottom: 12, borderTopWidth: 1, borderTopColor: '#E5E5E2',
    flexDirection: 'row', flexWrap: 'wrap', columnGap: 25, rowGap: 3, backgroundColor: '#FFFFFF',
  },
});
