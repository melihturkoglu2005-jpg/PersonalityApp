import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { colors, space, shadows, radius } from '../theme/colors';
import SoftPressable from './SoftPressable';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = isWeb && width >= 1024;
const FONT = Platform.select({ ios:'System', android:'sans-serif', web:"'Inter',system-ui,sans-serif" });

export default function TopNav({ navigation }) {
  const links = [
    { label: 'Kişilik Tipleri', screen: 'KisilikTipleri' },
    { label: 'Kaynaklar',       screen: 'Kaynaklar' },
  ];

  return (
    <View style={s.wrap}>
      <View style={s.inner}>
        {/* Brand */}
        <TouchableOpacity style={s.brand} onPress={() => navigation.navigate('Home')} activeOpacity={0.8}>
          <View style={s.logo}>
            <Text style={s.logoText}>I</Text>
          </View>
          <View>
            <Text style={s.brandTitle}>Indoles</Text>
            <Text style={s.brandSub}>Kişilik Analizi</Text>
          </View>
        </TouchableOpacity>

        {/* Nav links */}
        <View style={s.links}>
          {links.map((item) => (
            <SoftPressable
              key={item.label}
              containerStyle={s.linkWrap}
              style={s.linkBtn}
              onPress={() => navigation.navigate(item.screen)}
              hoverScale={1.02}
            >
              <Text style={s.linkText}>{item.label}</Text>
            </SoftPressable>
          ))}

          {/* CTA butonu */}
          <SoftPressable
            containerStyle={s.linkWrap}
            style={s.ctaNavBtn}
            onPress={() => navigation.navigate('MBTI')}
            hoverScale={1.03}
          >
            <Text style={s.ctaNavText}>Testi Başlat</Text>
          </SoftPressable>
        </View>
      </View>
      <View style={s.divider} />
    </View>
  );
}

const s = StyleSheet.create({
  wrap:  { backgroundColor: colors.surface, ...shadows.sm },
  inner: {
    maxWidth: 1040,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: isDesktop ? space[6] : space[4],
    paddingVertical: space[3],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand:      { flexDirection:'row', alignItems:'center', gap: space[3] },
  logo: {
    width: 36, height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
    ...shadows.colored(colors.primary),
  },
  logoText:   { color:'#fff', fontSize: 16, fontWeight:'800', fontFamily: FONT },
  brandTitle: { fontSize: 15, fontWeight:'700', color: colors.textPrimary, fontFamily: FONT, lineHeight:18 },
  brandSub:   { fontSize: 11, color: colors.textMuted, fontFamily: FONT, lineHeight:14 },

  links:   { flexDirection:'row', alignItems:'center', gap: space[1] },
  linkWrap:{ width:'auto' },
  linkBtn: {
    paddingHorizontal: isDesktop ? space[4] : space[3],
    paddingVertical: space[2],
    borderRadius: radius.md,
  },
  linkText: {
    fontSize: isDesktop ? 14 : 13,
    color: colors.textSecondary,
    fontFamily: FONT,
    fontWeight: '500',
  },
  ctaNavBtn: {
    paddingHorizontal: isDesktop ? space[4] : space[3],
    paddingVertical: space[2],
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
    marginLeft: space[2],
  },
  ctaNavText: {
    fontSize: isDesktop ? 14 : 13,
    color: colors.primaryDark,
    fontFamily: FONT,
    fontWeight: '600',
  },
  divider: { height: 1, backgroundColor: colors.border },
});
