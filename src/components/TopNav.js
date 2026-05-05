import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
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
  const { isDark, toggleTheme, colors } = useTheme();

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
            <Text style={s.themeIcon}>{isDark ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[s.divider, { backgroundColor: colors.border }]} />
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
  brandTitle: { fontSize: 18, fontWeight: '800', fontFamily: FONT, letterSpacing: -0.3 },
  rightRow:   { flexDirection: 'row', alignItems: 'center', gap: 8 },
  links:      { flexDirection: 'row', alignItems: 'center', gap: 2 },
  linkWrap:   { width: 'auto' },
  linkBtn:    { paddingHorizontal: isDesktop ? 12 : 8, paddingVertical: 7, borderRadius: 10 },
  linkText:   { fontSize: isDesktop ? 13 : 12, fontFamily: FONT, fontWeight: '700' },
  themeToggle: {
    width: 36, height: 36, borderRadius: 10,
    borderWidth: 2, alignItems: 'center', justifyContent: 'center', marginLeft: 4,
  },
  themeIcon:  { fontSize: 16 },
  divider:    { height: 2 },
});
