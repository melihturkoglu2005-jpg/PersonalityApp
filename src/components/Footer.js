import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform, Linking } from 'react-native';
import { colors, space, shadows, radius } from '../theme/colors';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;
const FONT = Platform.select({ ios:'System', android:'sans-serif', web:"'Inter',system-ui,sans-serif" });

export default function Footer({ navigation }) {
  return (
    <View style={s.root}>
      <View style={s.inner}>

        {/* Üst satır */}
        <View style={s.topRow}>
          <TouchableOpacity style={s.brand} onPress={() => navigation.navigate('Home')} activeOpacity={0.85}>
            <View style={s.logo}>
              <Text style={s.logoText}>I</Text>
            </View>
            <View>
              <Text style={s.brandName}>Indoles</Text>
              <Text style={s.brandTagline}>Psikoloji ve tipoloji literatürüne dayanan kişilik analizi</Text>
            </View>
          </TouchableOpacity>

          <View style={s.topLinks}>
            {[
              { label:'Kişilik Tipleri', screen:'KisilikTipleri' },
              { label:'Kaynaklar',       screen:'Kaynaklar' },
            ].map(l => (
              <TouchableOpacity key={l.label} onPress={() => navigation.navigate(l.screen)} activeOpacity={0.7}>
                <Text style={s.topLink}>{l.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => Linking.openURL('mailto:destek@indoles.com')} activeOpacity={0.7}>
              <Text style={s.topLink}>İletişim</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={s.rule} />

        {/* Alt satır */}
        <View style={s.bottomRow}>
          <Text style={s.copyright}>© {new Date().getFullYear()} Indoles. Tüm hakları saklıdır.</Text>
          <Text style={s.disclaimer}>
            Test sonuçları ve açıklamalar bilgilendirme amaçlıdır; profesyonel psikolojik değerlendirmenin yerini tutmaz.
          </Text>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    alignSelf:'stretch', width:'100%',
    marginTop: space[10],
    borderTopWidth: 1, borderTopColor: colors.border,
    backgroundColor: colors.surfaceLight,
  },
  inner: {
    maxWidth: isDesktop ? 1040 : undefined,
    alignSelf:'center', width:'100%',
    paddingVertical: isDesktop ? space[6] : space[5],
    paddingHorizontal: isDesktop ? space[6] : space[5],
  },
  topRow: {
    flexDirection: isDesktop ? 'row' : 'column',
    alignItems: isDesktop ? 'center' : 'flex-start',
    justifyContent:'space-between',
    gap: space[4],
  },
  brand:     { flexDirection:'row', alignItems:'center', gap: space[3] },
  logo: {
    width: 40, height: 40, borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems:'center', justifyContent:'center',
    ...shadows.colored(colors.primary),
  },
  logoText:    { color:'#fff', fontSize:17, fontWeight:'800', fontFamily: FONT },
  brandName:   { fontSize: 15, fontWeight:'700', color: colors.textPrimary, fontFamily: FONT },
  brandTagline:{ fontSize: 12, color: colors.textMuted, fontFamily: FONT, marginTop: 2 },

  topLinks: { flexDirection:'row', gap: space[5], flexWrap:'wrap' },
  topLink:  { fontSize: 13, fontWeight:'500', color: colors.textSecondary, fontFamily: FONT },

  rule: { height:1, backgroundColor: colors.border, marginVertical: space[4] },

  bottomRow: {
    flexDirection: isDesktop ? 'row' : 'column',
    gap: space[4], alignItems: isDesktop ? 'center' : 'flex-start',
  },
  copyright:   { fontSize: 12, color: colors.textSecondary, fontFamily: FONT, flex: isDesktop ? 1 : undefined },
  disclaimer:  { fontSize: 11, color: colors.textMuted, fontFamily: FONT, lineHeight:17, flex: isDesktop ? 2 : undefined },
});
