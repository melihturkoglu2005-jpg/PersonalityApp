import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { FONT } from '../theme/constants';
import SoftPressable from './SoftPressable';
import HamburgerIcon from './HamburgerIcon';
import ThemeToggleIcon from './ThemeToggleIcon';
import MobileMenu from './MobileMenu';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = isWeb && width >= 1024;


export default function TopNav({ navigation }) {
  const { isDark, toggleTheme, colors } = useTheme();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const links = [
    { label: 'Kişilik Tipleri', screen: 'KisilikTipleri' },
    { label: 'Karakterler',     screen: 'CharacterGuide' },
    { label: 'Kaynaklar',       screen: 'Kaynaklar' },
  ];

  return (
    <View style={[s.wrap, { backgroundColor: colors.surface }]}>
      <View style={s.inner}>
        <TouchableOpacity
          style={s.brand}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Ana sayfa"
        >
          <View style={[s.logo, { backgroundColor: colors.primary, borderBottomColor: colors.primaryDark }]}>
            <Text style={s.logoText}>İ</Text>
          </View>
          <Text style={[s.brandTitle, { color: colors.textPrimary }]}>indoles</Text>
        </TouchableOpacity>

        <View style={s.rightRow}>
          {/* Desktop Links */}
          {isDesktop && (
            <View style={s.links}>
              {links.map((item) => (
                <SoftPressable
                  key={item.label}
                  containerStyle={s.linkWrap}
                  style={s.linkBtn}
                  onPress={() => navigation.navigate(item.screen)}
                  hoverScale={1.02}
                >
                  <Text style={[s.linkText, { color: colors.textSecondary }]}>{item.label}</Text>
                </SoftPressable>
              ))}
            </View>
          )}

          {/* Mobile Hamburger Menu */}
          {!isDesktop && (
            <TouchableOpacity
              onPress={() => setMobileMenuVisible(true)}
              style={[s.hamburgerBtn, { borderColor: colors.border }]}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Menü"
            >
              <HamburgerIcon color={colors.textPrimary} size={20} />
            </TouchableOpacity>
          )}

          {/* ── Tema Toggle ── */}
          <TouchableOpacity
            onPress={toggleTheme}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={isDark ? 'Açık temaya geç' : 'Koyu temaya geç'}
            style={[
              s.themeToggle,
              {
                backgroundColor: isDark ? colors.surfaceLight : colors.surfaceHover,
                borderColor: colors.border,
              },
            ]}
          >
            <ThemeToggleIcon isDark={isDark} color={colors.textPrimary} size={isDesktop ? 16 : 14} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[s.divider, { backgroundColor: colors.border }]} />

      {/* Mobile Menu */}
      <MobileMenu
        isVisible={mobileMenuVisible}
        onClose={() => setMobileMenuVisible(false)}
        navigation={navigation}
      />
    </View>
  );
}

const s = StyleSheet.create({
  wrap:  {},
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
    width: 34, height: 34, borderRadius: 10,
    borderBottomWidth: 3,
    alignItems: 'center', justifyContent: 'center',
  },
  logoText:   { color: '#fff', fontSize: 17, fontWeight: '900', fontFamily: FONT },
  brandTitle: { fontSize: isDesktop ? 18 : 16, fontWeight: '800', fontFamily: FONT, letterSpacing: -0.3 },
  rightRow:   { flexDirection: 'row', alignItems: 'center', gap: 8 },
  links:      { flexDirection: 'row', alignItems: 'center', gap: 2 },
  linkWrap:   { width: 'auto' },
  linkBtn:    { paddingHorizontal: isDesktop ? 12 : 6, paddingVertical: 7, borderRadius: 10 },
  linkText:   { fontSize: isDesktop ? 13 : 11, fontFamily: FONT, fontWeight: '700' },
  hamburgerBtn: {
    width: 36, height: 36, borderRadius: 10,
    borderWidth: 2, alignItems: 'center', justifyContent: 'center', marginRight: 4,
  },
  themeToggle: {
    width: isDesktop ? 36 : 32, height: isDesktop ? 36 : 32, borderRadius: 10,
    borderWidth: 2, alignItems: 'center', justifyContent: 'center', marginLeft: 4,
  },
  divider:    { height: 2 },
});
