import React from 'react';
import { View, Text, Pressable, StyleSheet, Linking } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { FONT } from '../theme/constants';
import { useLayout, GRID } from '../theme/useLayout';
import BrandLogo from './BrandLogo';

export default function Footer({ navigation }) {
  const { colors, isDark } = useTheme();
  const { gutter } = useLayout();

  return (
    <View style={[s.root, { borderTopColor: colors.border }]}>
      <View style={[s.inner, { paddingHorizontal: gutter, maxWidth: GRID + gutter * 2 }]}>
        <View style={s.row}>
          <Pressable onPress={() => navigation.navigate('Home')} accessibilityRole="button" accessibilityLabel="Ana sayfa">
            <BrandLogo size={26} lightOnDark={isDark} />
          </Pressable>
          <View style={s.links}>
            <Pressable onPress={() => navigation.navigate('Hakkimizda')} accessibilityRole="link">
              <Text style={[s.link, { color: colors.textSecondary }]}>Hakkımızda</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Testler')} accessibilityRole="link">
              <Text style={[s.link, { color: colors.textSecondary }]}>Testler</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Kaynaklar')} accessibilityRole="link">
              <Text style={[s.link, { color: colors.textSecondary }]}>Kaynaklar</Text>
            </Pressable>
            <Pressable onPress={() => Linking.openURL('mailto:destek@indoles.com')} accessibilityRole="link">
              <Text style={[s.link, { color: colors.textSecondary }]}>İletişim</Text>
            </Pressable>
          </View>
        </View>

        <Text style={[s.note, { color: colors.textSecondary }]}>
          © {new Date().getFullYear()} Indoles. Akademik kaynaklardan yararlanılarak öğrenme ve kendini keşfetme amacıyla oluşturulmuş bağımsız bir kişilik testi projesidir. Sonuçlar psikolojik tanı niteliği taşımaz ve profesyonel psikolojik değerlendirmenin yerini tutmaz.
        </Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root:  { alignSelf: 'stretch', width: '100%', marginTop: 72, borderTopWidth: 1 },
  inner: { width: '100%', alignSelf: 'center', paddingTop: 28, paddingBottom: 40, gap: 12 },
  row:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 6 },
  links: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 22 },
  link:  { fontSize: 13, fontFamily: FONT },
  note:  { fontSize: 12, lineHeight: 18, fontFamily: FONT, maxWidth: 900 },
});
