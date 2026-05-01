import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Dimensions, Platform, Linking,
} from 'react-native';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;

const FONT = Platform.select({
  ios:     'System',
  android: 'sans-serif',
  web:     "'Nunito', 'Varela Round', system-ui, sans-serif",
});

export default function Footer({ navigation }) {
  return (
    <View style={s.root}>
      <View style={s.inner}>

        {/* Üst satır: marka + linkler */}
        <View style={s.topRow}>
          <TouchableOpacity
            style={s.brandBlock}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Ana sayfa"
          >
            <View style={s.logoBox}>
              <Text style={s.logoChar}>İ</Text>
            </View>
            <View style={s.brandTexts}>
              <Text style={s.brandName}>indoles</Text>
              <Text style={s.brandTagline}>
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
              <Text style={s.topLink}>Kaynaklar</Text>
            </TouchableOpacity>
            <Text style={s.sep}>·</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL('mailto:destek@indoles.com')}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={s.topLink}>İletişim</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={s.rule} />

        {/* Alt satır: telif + SSS + yasal */}
        <View style={s.bottomRow}>
          <Text style={s.copyright}>
            © {new Date().getFullYear()} indoles. Tüm hakları saklıdır.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Kaynaklar', { initialKat: 'sss' })}
            activeOpacity={0.7}
          >
            <Text style={s.faq}>Sık Sorulan Sorular</Text>
          </TouchableOpacity>
          <Text style={s.disclaimer}>
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
    alignSelf: 'stretch',
    width: '100%',
    marginTop: 32,
    borderTopWidth: 2,
    borderTopColor: colors.border,
    backgroundColor: colors.surfaceLight,
  },
  inner: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    paddingVertical: isDesktop ? 24 : 20,
    paddingHorizontal: 20,
    paddingBottom: isDesktop ? 28 : 24,
  },

  // Üst satır
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 16,
  },
  brandBlock: { flexDirection: 'row', alignItems: 'center', gap: 12, flexShrink: 1 },
  logoBox: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  logoChar:    { color: '#fff', fontSize: 15, fontWeight: '800', fontFamily: FONT },
  brandTexts:  { flexShrink: 1, maxWidth: isDesktop ? 400 : '70%' },
  brandName:   { fontSize: 15, fontWeight: '800', color: colors.textPrimary, fontFamily: FONT, letterSpacing: -0.2 },
  brandTagline: { fontSize: 12, color: colors.textSecondary, fontFamily: FONT, marginTop: 3, lineHeight: 17, fontWeight: '600' },
  topLinks:    { flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 0 },
  topLink:     { fontSize: 13, fontWeight: '600', color: colors.textSecondary, fontFamily: FONT },
  sep:         { fontSize: 13, color: colors.textMuted, fontFamily: FONT },

  // Ayırıcı
  rule: { height: 1, backgroundColor: colors.border, marginTop: 18, marginBottom: 16, width: '100%' },

  // Alt satır
  bottomRow: {
    flexDirection: isDesktop ? 'row' : 'column',
    alignItems: isDesktop ? 'flex-start' : 'stretch',
    gap: isDesktop ? 20 : 10,
  },
  copyright: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: FONT,
    fontWeight: '600',
    lineHeight: 18,
    flex: isDesktop ? 1 : undefined,
  },
  faq: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    fontFamily: FONT,
    lineHeight: 18,
    flex: isDesktop ? 1 : undefined,
    textAlign: isDesktop ? 'center' : 'left',
  },
  disclaimer: {
    flex: isDesktop ? 2 : undefined,
    fontSize: 11,
    color: colors.textMuted,
    fontFamily: FONT,
    lineHeight: 17,
    fontWeight: '600',
  },
});
