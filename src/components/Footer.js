import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform, Linking } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { FONT } from '../theme/constants';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;

export default function Footer({ navigation }) {
  const { colors } = useTheme();

  return (
    <View style={[s.root, { borderTopColor: colors.border }]}>
      <View style={s.inner}>

        {/* ─── Alt Satır ─── */}
        <View style={s.bottomRow}>
          <TouchableOpacity
            style={s.brand}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.8}
          >
            <View style={[s.logoBox, { backgroundColor: colors.primary }]}>
              <Text style={s.logoChar}>İ</Text>
            </View>
            <Text style={[s.brandName, { color: colors.textPrimary }]}>indoles</Text>
          </TouchableOpacity>

          <View style={s.links}>
            <TouchableOpacity onPress={() => navigation.navigate('Kaynaklar')} activeOpacity={0.7}>
              <Text style={[s.link, { color: colors.textMuted }]}>Kaynaklar</Text>
            </TouchableOpacity>
            <Text style={[s.sep, { color: colors.border }]}>|</Text>
            <TouchableOpacity onPress={() => Linking.openURL('mailto:destek@indoles.com')} activeOpacity={0.7}>
              <Text style={[s.link, { color: colors.textMuted }]}>İletişim</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ─── Akademik Uyarı — kutusuzsuz, sade metin ─── */}
        <Text style={[s.disclaimer, { color: colors.textMuted, borderTopColor: colors.borderLight }]}>
          Bu platform yalnızca akademik ve kişisel gelişim amaçlıdır. Test sonuçları kesin psikolojik tanı niteliği taşımaz ve profesyonel psikolojik değerlendirmenin yerini tutmaz.
        </Text>

        {/* ─── Copyright ─── */}
        <Text style={[s.copy, { color: colors.textMuted }]}>
          © {new Date().getFullYear()} indoles · Psikoloji ve tipoloji literatürüne dayalı kişilik analizi
        </Text>

      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    alignSelf: 'stretch',
    width: '100%',
    marginTop: 32,
    borderTopWidth: 1,
  },
  inner: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: isDesktop ? 32 : 24,
    gap: 14,
  },

  // Alt satır
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand:    { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoBox:  { width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  logoChar: { color: '#fff', fontSize: 13, fontWeight: '800', fontFamily: FONT },
  brandName:{ fontSize: 14, fontWeight: '800', fontFamily: FONT, letterSpacing: -0.2 },

  links: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  link:  { fontSize: 12, fontWeight: '600', fontFamily: FONT },
  sep:   { fontSize: 10 },

  // Uyarı — kutusuzsuz
  disclaimer: {
    fontSize: 11,
    fontFamily: FONT,
    lineHeight: 17,
    textAlign: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
  },

  // Copyright
  copy: {
    fontSize: 11,
    fontFamily: FONT,
    textAlign: 'center',
  },
});
