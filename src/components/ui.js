import React from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { FONT, SERIF } from '../theme/constants';
import { useLayout, GRID } from '../theme/useLayout';
import TopNav from './TopNav';
import Footer from './Footer';
import AppBackground from './AppBackground';
import ScreenFadeIn from './ScreenFadeIn';

// İçerik sütunu: ortalanmış, kenar boşluklu
export function Wrap({ children, max = GRID, style }) {
  const { gutter } = useLayout();
  return (
    <View style={{ width: '100%', maxWidth: GRID + gutter * 2, alignSelf: 'center', paddingHorizontal: gutter }}>
      <View style={[{ width: '100%', maxWidth: max, alignSelf: 'flex-start' }, style]}>{children}</View>
    </View>
  );
}

// Test çözerken kullanıcıyı boğmamak için: menü yok, yalnızca ana sayfaya dönüş düğmesi
function TestBar({ navigation }) {
  const { colors } = useTheme();
  const { gutter } = useLayout();
  return (
    <View style={{ width: '100%', maxWidth: GRID + gutter * 2, alignSelf: 'center', paddingHorizontal: gutter, paddingTop: 20, paddingBottom: 4 }}>
      <Pressable
        onPress={() => navigation.navigate('Home')}
        accessibilityRole="button"
        accessibilityLabel="Ana sayfaya dön"
        style={{ alignSelf: 'flex-start', paddingVertical: 8 }}
      >
        {({ hovered }) => (
          <Text style={[u.textBtn, { color: hovered ? colors.textPrimary : colors.textSecondary }]}>← Ana sayfa</Text>
        )}
      </Pressable>
    </View>
  );
}

// Tüm iç sayfaların ortak çatısı: nav + kaydırma alanı + footer.
// mode="test": nav yerine yalnızca geri düğmesi, footer yerine yalnızca uyarı metni.
export function Screen({ navigation, active, children, scrollRef, footer = true, mode = 'site' }) {
  const { colors } = useTheme();
  const testMu = mode === 'test';
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <AppBackground />
      <ScreenFadeIn>
        {testMu ? <TestBar navigation={navigation} /> : <TopNav navigation={navigation} active={active} />}
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flexGrow: 1 }}>{children}</View>
          {footer && <Footer navigation={navigation} />}
        </ScrollView>
      </ScreenFadeIn>
    </SafeAreaView>
  );
}

// Sayfa başlığı: büyük serif başlık + gri açıklama (ana sayfanın dili)
export function PageHeader({ title, sub, max = GRID }) {
  const { colors } = useTheme();
  const { isNarrow } = useLayout();
  return (
    <Wrap max={max} style={{ paddingTop: isNarrow ? 28 : 48, paddingBottom: isNarrow ? 24 : 36 }}>
      <Text style={[u.h1, { color: colors.textPrimary, fontSize: isNarrow ? 44 : 68, lineHeight: isNarrow ? 46 : 68 }]}>
        {title}
      </Text>
      {!!sub && (
        <Text style={[u.sub, { color: colors.textSecondary }]}>{sub}</Text>
      )}
    </Wrap>
  );
}

// Altı çizili sekmeler; aktif sekme siyah, diğerleri gri
export function Tabs({ items, value, onChange, accent }) {
  const { colors } = useTheme();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={u.tabsRow}>
      {items.map((it) => {
        const on = it.id === value;
        return (
          <Pressable
            key={it.id}
            onPress={() => onChange(it.id)}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            style={[u.tab, { borderBottomColor: on ? (accent || colors.textPrimary) : 'transparent' }]}
          >
            {({ hovered }) => (
              <Text style={[u.tabText, { color: on || hovered ? colors.textPrimary : colors.textSecondary }, on && { fontWeight: '600' }]}>
                {it.label}
              </Text>
            )}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

// Siyah hap düğme (ana sayfadaki ana düğmeyle aynı)
export function PillButton({ label, onPress, disabled, tone = 'ink', accent, style }) {
  const bg = tone === 'ink' ? '#000000' : tone === 'accent' ? accent : 'transparent';
  const fg = tone === 'ghost' ? '#000000' : '#FFFFFF';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ hovered }) => [
        u.pill,
        { backgroundColor: bg, opacity: disabled ? 0.3 : 1 },
        tone === 'ghost' && { borderWidth: 1, borderColor: '#000000' },
        hovered && !disabled && { transform: [{ scale: 1.03 }] },
        style,
      ]}
    >
      <Text style={[u.pillText, { color: fg }]}>{label}</Text>
    </Pressable>
  );
}

// Düz metin bağlantısı
export function TextButton({ label, onPress, disabled, color }) {
  const { colors } = useTheme();
  return (
    <Pressable onPress={onPress} disabled={disabled} accessibilityRole="button" style={{ opacity: disabled ? 0.3 : 1, paddingVertical: 10 }}>
      {({ hovered }) => (
        <Text style={[u.textBtn, { color: color || (hovered ? colors.textPrimary : colors.textSecondary) }]}>{label}</Text>
      )}
    </Pressable>
  );
}

export function Rule({ style }) {
  const { colors } = useTheme();
  return <View style={[{ height: 1, backgroundColor: colors.border, alignSelf: 'stretch' }, style]} />;
}

const u = StyleSheet.create({
  h1:  { fontFamily: SERIF, fontWeight: '400', letterSpacing: -1.8 },
  sub: { fontFamily: FONT, fontSize: 16, lineHeight: 26, marginTop: 16, maxWidth: 560 },
  tabsRow: { gap: 28, paddingRight: 8 },
  tab: { paddingVertical: 12, borderBottomWidth: 2 },
  tabText: { fontFamily: FONT, fontSize: 15 },
  pill: {
    borderRadius: 999, paddingHorizontal: 28, paddingVertical: 14, alignSelf: 'flex-start',
    alignItems: 'center', justifyContent: 'center',
    ...(Platform.OS === 'web' ? { transitionProperty: 'transform', transitionDuration: '180ms', cursor: 'pointer' } : null),
  },
  pillText: { fontFamily: FONT, fontSize: 15 },
  textBtn:  { fontFamily: FONT, fontSize: 15 },
});
