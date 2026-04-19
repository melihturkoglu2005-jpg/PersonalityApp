/**
 * AdPlaceholder — Kullanıcı deneyimini bozmayan, dikkat çeken reklam alanları.
 * variant: 'banner' | 'sidebar' | 'inline' | 'leaderboard'
 */
import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { colors, radius, space } from '../theme/colors';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;
const FONT = Platform.select({ ios:'System', android:'sans-serif', web:"'Inter',system-ui,sans-serif" });

export default function AdPlaceholder({ variant = 'banner', style }) {
  if (variant === 'inline') {
    return (
      <View style={[s.inline, style]}>
        <View style={s.inlineLeft}>
          <Text style={s.tag}>Reklam</Text>
          <Text style={s.inlineTitle}>Kişiliğini Geliştir</Text>
          <Text style={s.inlineSub}>Psikoloji kitapları ve kurslar için öneriler</Text>
        </View>
        <View style={s.inlineCta}>
          <Text style={s.inlineCtaText}>Keşfet →</Text>
        </View>
      </View>
    );
  }

  if (variant === 'sidebar') {
    return (
      <View style={[s.sidebar, style]}>
        <Text style={s.tag}>Reklam</Text>
        <View style={s.sidebarBox} />
        <Text style={s.sidebarLabel}>300 × 250</Text>
      </View>
    );
  }

  if (variant === 'leaderboard') {
    return (
      <View style={[s.leaderboard, style]}>
        <Text style={s.tag}>Reklam</Text>
        <Text style={s.leaderboardLabel}>728 × 90 — Leaderboard</Text>
      </View>
    );
  }

  // default: banner
  return (
    <View style={[s.banner, style]}>
      <Text style={s.tag}>Reklam</Text>
      <Text style={s.bannerLabel}>Reklam Alanı · 320 × 50</Text>
    </View>
  );
}

const s = StyleSheet.create({
  tag: {
    fontSize: 9, fontWeight: '700', letterSpacing: 1.2,
    color: colors.textXMuted, fontFamily: FONT,
    textTransform: 'uppercase', marginBottom: space[1],
  },

  // inline — test soruları arasına giren şerit
  inline: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border,
    borderStyle: 'dashed',
    paddingHorizontal: space[5], paddingVertical: space[4],
    marginHorizontal: isDesktop ? 0 : space[5],
    marginVertical: space[4],
  },
  inlineLeft:    { flex: 1 },
  inlineTitle:   { fontSize: 14, fontWeight: '600', color: colors.textSecondary, fontFamily: FONT },
  inlineSub:     { fontSize: 12, color: colors.textMuted, fontFamily: FONT, marginTop: 2 },
  inlineCta:     { marginLeft: space[4], backgroundColor: colors.primaryLight, borderRadius: radius.md, paddingHorizontal: space[4], paddingVertical: space[2] },
  inlineCtaText: { fontSize: 12, fontWeight: '600', color: colors.primary, fontFamily: FONT },

  // sidebar — yan sütun
  sidebar: {
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.xl,
    borderWidth: 1, borderColor: colors.border,
    borderStyle: 'dashed',
    padding: space[4], alignItems: 'center',
    width: 300,
  },
  sidebarBox: {
    width: 250, height: 200,
    backgroundColor: colors.borderLight,
    borderRadius: radius.md, marginVertical: space[3],
  },
  sidebarLabel: { fontSize: 11, color: colors.textXMuted, fontFamily: FONT },

  // leaderboard — geniş üst/alt banner
  leaderboard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border,
    borderStyle: 'dashed',
    height: 90, alignItems: 'center', justifyContent: 'center',
    width: '100%', maxWidth: 728, alignSelf: 'center',
    marginVertical: space[5],
  },
  leaderboardLabel: { fontSize: 12, color: colors.textXMuted, fontFamily: FONT },

  // banner
  banner: {
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border,
    borderStyle: 'dashed',
    height: 50, alignItems: 'center', justifyContent: 'center',
    marginVertical: space[3],
  },
  bannerLabel: { fontSize: 11, color: colors.textXMuted, fontFamily: FONT },
});
