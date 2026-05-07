import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform, Linking } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

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
            <Text style={s.brandName}>
              Indoles
              <Text style={s.brandSup}>®</Text>
            </Text>
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
    maxWidth: 1280,
    alignSelf: 'center',
    paddingHorizontal: 32,
    paddingTop: 24,
    paddingBottom: isDesktop ? 40 : 28,
    gap: 14,
  },

  // Alt satır
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand:    { flexDirection: 'row', alignItems: 'center' },
  brandName: {
    color: '#000000',
    fontSize: 30,
    letterSpacing: -0.5,
    fontFamily: Platform.OS === 'web' ? '"Instrument Serif", serif' : undefined,
  },
  brandSup: {
    fontSize: 12,
    position: 'relative',
    top: -14,
  },
  links: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  link:  { fontSize: 12, fontWeight: '600' },
  sep:   { fontSize: 10 },

  // Uyarı — kutusuzsuz
  disclaimer: {
    fontSize: 10,
    lineHeight: 16,
    textAlign: 'left',
    paddingTop: 12,
    borderTopWidth: 1,
  },

  // Copyright
  copy: {
    fontSize: 11,
    textAlign: 'left',
  },
});
