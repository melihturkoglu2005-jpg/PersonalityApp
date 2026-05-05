import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Dimensions, Platform, Linking,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;

const FONT = Platform.select({
  ios:     'System',
  android: 'sans-serif',
  web:     "'Nunito', 'Varela Round', system-ui, sans-serif",
});

export default function Footer({ navigation }) {
  const { colors } = useTheme();
  return (
    <View style={[s.root, { borderTopColor: colors.border, backgroundColor: colors.surfaceLight }]}>
      <View style={s.inner}>
        <View style={s.topRow}>
          <TouchableOpacity
            style={s.brandBlock}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Ana sayfa"
          >
            <View style={[s.logoBox, { backgroundColor: colors.primary }]}>
              <Text style={s.logoChar}>İ</Text>
            </View>
            <View style={s.brandTexts}>
              <Text style={[s.brandName, { color: colors.textPrimary }]}>indoles</Text>
              <Text style={[s.brandTagline, { color: colors.textSecondary }]}>
                Psikoloji ve tipoloji literatürüne dayalı kişilik analizi
              </Text>
            </View>
          </TouchableOpacity>

          <View style={s.topLinks}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Kaynaklar')}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={[s.topLink, { color: colors.textSecondary }]}>Kaynaklar</Text>
            </TouchableOpacity>
            <Text style={[s.sep, { color: colors.textMuted }]}>·</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL('mailto:destek@indoles.com')}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={[s.topLink, { color: colors.textSecondary }]}>İletişim</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[s.rule, { backgroundColor: colors.border }]} />

        <View style={s.bottomRow}>
          <Text style={[s.copyright, { color: colors.textSecondary }]}>
            © {new Date().getFullYear()} indoles. Tüm hakları saklıdır.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Kaynaklar', { initialKat: 'sss' })}
            activeOpacity={0.7}
          >
            <Text style={[s.faq, { color: colors.primary }]}>Sık Sorulan Sorular</Text>
          </TouchableOpacity>
          <Text style={[s.disclaimer, { color: colors.textMuted }]}>
            Test sonuçları ve açıklamalar yalnızca bilgilendirme amaçlıdır;
            profesyonel psikolojik değerlendirmenin yerini tutmaz.
          </Text>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    alignSelf: 'stretch', width: '100%', marginTop: 32, borderTopWidth: 2,
  },
  inner: {
    width: '100%', maxWidth: 720, alignSelf: 'center',
    paddingVertical: isDesktop ? 24 : 20,
    paddingHorizontal: 20,
    paddingBottom: isDesktop ? 28 : 24,
  },
  topRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
  },
  brandBlock:  { flexDirection: 'row', alignItems: 'center', gap: 12, flexShrink: 1 },
  logoBox:     { width: 32, height: 32, borderRadius: 9, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  logoChar:    { color: '#fff', fontSize: 15, fontWeight: '800', fontFamily: FONT },
  brandTexts:  { flexShrink: 1, maxWidth: isDesktop ? 400 : '70%' },
  brandName:   { fontSize: 15, fontWeight: '800', fontFamily: FONT, letterSpacing: -0.2 },
  brandTagline:{ fontSize: 12, fontFamily: FONT, marginTop: 3, lineHeight: 17, fontWeight: '600' },
  topLinks:    { flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 0 },
  topLink:     { fontSize: 13, fontWeight: '600', fontFamily: FONT },
  sep:         { fontSize: 13, fontFamily: FONT },
  rule:        { height: 1, marginTop: 18, marginBottom: 16, width: '100%' },
  bottomRow:   { flexDirection: isDesktop ? 'row' : 'column', alignItems: isDesktop ? 'flex-start' : 'stretch', gap: isDesktop ? 20 : 10 },
  copyright:   { fontSize: 12, fontFamily: FONT, fontWeight: '600', lineHeight: 18, flex: isDesktop ? 1 : undefined },
  faq:         { fontSize: 12, fontWeight: '700', fontFamily: FONT, lineHeight: 18, flex: isDesktop ? 1 : undefined, textAlign: isDesktop ? 'center' : 'left' },
  disclaimer:  { flex: isDesktop ? 2 : undefined, fontSize: 11, fontFamily: FONT, lineHeight: 17, fontWeight: '600' },
});
