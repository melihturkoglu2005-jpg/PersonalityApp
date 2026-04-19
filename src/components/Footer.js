import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform, Linking } from 'react-native';
import { colors, space, shadows, radius } from '../theme/colors';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;
const FONT = Platform.select({ ios: 'System', android: 'sans-serif', web: "'Inter', system-ui, sans-serif" });

export default function Footer({ navigation }) {
  return (
    <View style={s.root}>
      <View style={s.inner}>
        <View style={s.topRow}>
          <TouchableOpacity style={s.brand} onPress={() => navigation.navigate('Home')} activeOpacity={0.85}>
            <View style={s.logo}>
              <Text style={s.logoText}>I</Text>
            </View>
            <View style={s.brandTexts}>
              <Text style={s.brandName}>Indoles</Text>
              <Text style={s.brandTagline}>Psikoloji ve tipoloji literatürüne dayanan kişilik analizi</Text>
            </View>
          </TouchableOpacity>

          <View style={s.topLinks}>
            <TouchableOpacity onPress={() => navigation.navigate('Kaynaklar')} activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={s.topLink}>Kaynaklar</Text>
            </TouchableOpacity>
            <Text style={s.sep}>·</Text>
            <TouchableOpacity onPress={() => Linking.openURL('mailto:destek@indoles.com')} activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={s.topLink}>İletişim</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={s.rule} />

        <View style={s.bottomRow}>
          <Text style={s.copyright}>© {new Date().getFullYear()} Indoles. Tüm hakları saklıdır.</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Kaynaklar', { initialKat: 'sss' })} activeOpacity={0.7}>
            <Text style={s.faqLink}>Sıkça Sorulan Sorular</Text>
          </TouchableOpacity>
          <Text style={s.disclaimer}>
            Buradaki test sonuçları ve açıklamalar bilgilendirme amaçlıdır; profesyonel psikolojik
            değerlendirmenin yerini tutmaz. Sonuçlar yanılabilir.
          </Text>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    alignSelf: 'stretch',
    width: '100%',
    marginTop: space[10],
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surfaceLight,
  },
  inner: {
    maxWidth: isDesktop ? 1040 : undefined,
    alignSelf: 'center',
    width: '100%',
    paddingVertical: isDesktop ? space[6] : space[5],
    paddingHorizontal: isDesktop ? space[6] : space[5],
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: space[4],
  },
  brand:        { flexDirection: 'row', alignItems: 'center', gap: space[3], flexShrink: 1 },
  logo: {
    width: 44, height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
    ...shadows.colored(colors.primary),
  },
  logoText:     { color: '#fff', fontSize: 18, fontWeight: '700', fontFamily: FONT },
  brandTexts:   { flexShrink: 1, maxWidth: isDesktop ? 420 : '70%' },
  brandName:    { fontSize: isDesktop ? 17 : 16, fontWeight: '700', color: colors.textPrimary, fontFamily: FONT, letterSpacing: -0.2 },
  brandTagline: { fontSize: 12, color: colors.textSecondary, fontFamily: FONT, marginTop: 3, lineHeight: 17 },

  topLinks: { flexDirection: 'row', alignItems: 'center', gap: space[3], flexShrink: 0 },
  topLink:  { fontSize: 13, fontWeight: '500', color: colors.textSecondary, fontFamily: FONT },
  sep:      { fontSize: 13, color: colors.textMuted, fontFamily: FONT },

  rule: { height: 1, backgroundColor: colors.border, marginTop: space[5], marginBottom: space[4] },

  bottomRow: {
    flexDirection: isDesktop ? 'row' : 'column',
    alignItems: isDesktop ? 'flex-start' : 'stretch',
    gap: isDesktop ? space[5] : space[4],
  },
  copyright:   { fontSize: 12, color: colors.textSecondary, fontFamily: FONT, lineHeight: 18, flex: isDesktop ? 1 : undefined },
  faqLink:     { fontSize: 12, fontWeight: '600', color: colors.primary, fontFamily: FONT, flex: isDesktop ? 1 : undefined, textAlign: isDesktop ? 'center' : 'left' },
  disclaimer:  { flex: isDesktop ? 2 : undefined, fontSize: 11, color: colors.textMuted, fontFamily: FONT, lineHeight: 17 },
});
