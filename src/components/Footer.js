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
  ios: 'System', android: 'sans-serif',
  web: "'Inter', system-ui, sans-serif",
});

export default function Footer({ navigation }) {
  return (
    <View style={s.footerFullBleed}>
      <View style={s.footerBar}>
        <View style={s.footerTopRow}>
          <TouchableOpacity
            style={s.footerBrandBlock}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Ana sayfa"
          >
            <View style={s.footerLogoCircle}>
              <Text style={s.footerLogoCircleText}>I</Text>
            </View>
            <View style={s.footerBrandTexts}>
              <Text style={s.footerBrandName}>Indoles</Text>
              <Text style={s.footerBrandTagline}>
                Psikoloji ve tipoloji literatürüne dayanan kisilik analizi
              </Text>
            </View>
          </TouchableOpacity>

          <View style={s.footerTopLinks}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Kaynaklar')}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={s.footerTopLink}>Kaynaklar</Text>
            </TouchableOpacity>
            <Text style={s.footerTopSep}>·</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL('mailto:destek@indoles.com')}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={s.footerTopLink}>İletişim</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={s.footerRule} />

        <View style={s.footerBottomRow}>
          <Text style={s.footerCopyright}>
            © {new Date().getFullYear()} Indoles. Tüm haklari saklidir.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Kaynaklar', { initialKat: 'sss' })}
            activeOpacity={0.7}
            style={s.footerFaqWrap}
          >
            <Text style={s.footerFaq}>Sikça Sorulan Sorular</Text>
          </TouchableOpacity>
          <Text style={s.footerDisclaimer}>
            Buradaki test sonuçlari ve açiklamalar bilgilendirme amaçlidir; profesyonel psikolojik
            degerlendirmenin yerini tutmaz. Sonuçlar yanilabilir; uygulamayi kullanarak bunu kabul
            etmis sayilirsunuz.
          </Text>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  footerFullBleed: {
    alignSelf: 'stretch',
    width: '100%',
    marginTop: 32,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: '#EEF2F7',
  },
  footerBar: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    paddingVertical: isDesktop ? 24 : 20,
    paddingHorizontal: 20,
    paddingBottom: isDesktop ? 28 : 24,
  },
  footerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 16,
  },
  footerBrandBlock: { flexDirection: 'row', alignItems: 'center', gap: 12, flexShrink: 1 },
  footerLogoCircle: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerLogoCircleText: { color: '#fff', fontSize: 16, fontWeight: '700', fontFamily: FONT },
  footerBrandTexts: { flexShrink: 1, maxWidth: isDesktop ? 420 : '70%' },
  footerBrandName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    fontFamily: FONT,
    letterSpacing: -0.2,
  },
  footerBrandTagline: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: FONT,
    marginTop: 3,
    lineHeight: 17,
  },
  footerTopLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexShrink: 0,
  },
  footerTopLink: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
    fontFamily: FONT,
  },
  footerTopSep: { fontSize: 13, color: colors.textMuted, fontFamily: FONT },
  footerRule: {
    height: 1,
    backgroundColor: colors.border,
    marginTop: 18,
    marginBottom: 16,
    width: '100%',
  },
  footerBottomRow: {
    flexDirection: isDesktop ? 'row' : 'column',
    alignItems: isDesktop ? 'flex-start' : 'stretch',
    gap: isDesktop ? 20 : 14,
  },
  footerCopyright: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: FONT,
    lineHeight: 18,
    flex: isDesktop ? 1 : undefined,
    minWidth: isDesktop ? 140 : undefined,
  },
  footerFaqWrap: {
    flex: isDesktop ? 1 : undefined,
    alignItems: isDesktop ? 'center' : 'flex-start',
    minWidth: isDesktop ? 120 : undefined,
  },
  footerFaq: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    fontFamily: FONT,
    textAlign: isDesktop ? 'center' : 'left',
    lineHeight: 18,
  },
  footerDisclaimer: {
    flex: isDesktop ? 2 : undefined,
    fontSize: 11,
    color: colors.textMuted,
    fontFamily: FONT,
    lineHeight: 17,
    minWidth: isDesktop ? 180 : undefined,
  },
  disabledLink: {
    opacity: 0.5,
  },
  footerTopLinkDisabled: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textMuted,
    fontFamily: FONT,
  },
});
