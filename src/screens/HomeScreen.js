import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, StatusBar,
  Dimensions, Platform, Animated, Easing,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { FONT } from '../theme/constants';
import AppBackground from '../components/AppBackground';
import TopNav from '../components/TopNav';
import SoftPressable from '../components/SoftPressable';
import ScreenFadeIn from '../components/ScreenFadeIn';
import Footer from '../components/Footer';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;
const MAX       = 720;

export default function HomeScreen({ navigation }) {
  const { isDark, colors } = useTheme();
  const fadeAnim   = useRef(new Animated.Value(0)).current;
  const slideAnim  = useRef(new Animated.Value(24)).current;
  const cardsAnim  = useRef(new Animated.Value(0)).current;
  const kesfetAnim = useRef(new Animated.Value(0)).current;
  const [aktifTest, setAktifTest] = useState('mbti');

  const TESTLER = [
    {
      id: 'mbti', icon: '🧠',
      label: 'MBTI Testi', alt: '16 kişilik tipi',
      screen: 'MBTI',
      fill: colors.secondary, fillDark: colors.secondaryDark,
      bg: colors.secondaryLight, border: colors.secondaryDark,
    },
    {
      id: 'enneagram', icon: '✨',
      label: 'Enneagram', alt: '9 tip analizi',
      screen: 'Enneagram',
      fill: colors.violet, fillDark: colors.violetDark,
      bg: colors.violetLight, border: colors.violetDark,
    },
  ];

  const KESFET_KARTLAR = [
    {
      emoji: '🌟', baslik: 'Kişilik Tipleri',
      alt: '16 MBTI + 9 Enneagram tipini keşfet',
      screen: 'KisilikTipleri', badgeText: '16 + 9 Tip',
      border: colors.accentDark, bg: colors.accentLight, badgeColor: colors.accentDark,
    },
    {
      emoji: '📚', baslik: 'Kaynaklar',
      alt: 'Akademik kitap ve araştırmalar',
      screen: 'Kaynaklar', badgeText: 'Akademik',
      border: colors.secondaryDark, bg: colors.secondaryLight, badgeColor: colors.secondaryDark,
    },
    {
      emoji: '🔍', baslik: 'MBTI Testi',
      alt: '16 tipten hangisi senin?',
      screen: 'MBTI', badgeText: 'Yeni',
      border: colors.primaryDark, bg: colors.primaryLight, badgeColor: colors.primaryDark,
    },
    {
      emoji: '🎭', baslik: 'Karakter Rehberi',
      alt: '96 ünlü karakterle eşleş',
      screen: 'CharacterGuide', badgeText: '96 Karakter',
      border: colors.violetDark, bg: colors.violetLight, badgeColor: colors.violetDark,
    },
  ];

  const ADIMLAR = [
    {
      no: '1', emoji: '🎯', baslik: 'Testi Seç',
      alt: 'MBTI veya Enneagram',
      color: colors.secondary, border: colors.secondaryDark, bg: colors.secondaryLight,
    },
    {
      no: '2', emoji: '✍️', baslik: 'Soruları Yanıtla',
      alt: '~5 dakikada tamamla',
      color: colors.accent, border: colors.accentDark, bg: colors.accentLight,
    },
    {
      no: '3', emoji: '🏆', baslik: 'Sonucunu İncele',
      alt: 'Detaylı analiz al',
      color: colors.primary, border: colors.primaryDark, bg: colors.primaryLight,
    },
  ];

  useEffect(() => {
    if (isWeb) {
      let meta = document.querySelector('meta[name=viewport]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'viewport';
        document.head.appendChild(meta);
      }
      meta.content = 'width=device-width, initial-scale=1, maximum-scale=1';
      if (!document.querySelector('#duo-font')) {
        const link = document.createElement('link');
        link.id   = 'duo-font';
        link.rel  = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&display=swap';
        document.head.appendChild(link);
      }
    }
    Animated.parallel([
      Animated.timing(fadeAnim,   { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim,  { toValue: 0, duration: 420, delay: 60,  useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
      Animated.timing(cardsAnim,  { toValue: 1, duration: 500, delay: 140, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
      Animated.timing(kesfetAnim, { toValue: 1, duration: 560, delay: 250, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
    ]).start();
  }, []);

  const secili = TESTLER.find((t) => t.id === aktifTest);

  return (
    <View style={[s.root, { backgroundColor: colors.background }]}>
      <AppBackground />
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <SafeAreaView style={s.safe}>
        <ScreenFadeIn>
          <TopNav navigation={navigation} />

          <Animated.ScrollView
            contentContainerStyle={s.scroll}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
          >

            {/* ── HERO KARTI ───────────────────────────────────────────── */}
            <Animated.View
              style={[
                s.heroCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.primaryDark,
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <Text style={[s.heroTitle, { color: colors.textPrimary }]}>Kişiliğini Keşfet</Text>
              <Text style={[s.heroSub, { color: colors.textSecondary }]}>
                Psikoloji temelli testlerle kendini daha iyi tanı
              </Text>
            </Animated.View>

            {/* ── TEST SEÇ ─────────────────────────────────────────────── */}
            <Animated.View
              style={[
                s.section,
                {
                  opacity: cardsAnim,
                  transform: [{
                    translateY: cardsAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }),
                  }],
                },
              ]}
            >
              <Text style={[s.sectionLabel, { color: colors.textMuted }]}>Test Seç</Text>
              <View style={s.testRow}>
                {TESTLER.map((t) => {
                  const aktif = aktifTest === t.id;
                  return (
                    <SoftPressable
                      key={t.id}
                      onPress={() => setAktifTest(t.id)}
                      style={[
                        s.testKart,
                        {
                          borderColor: aktif ? t.border : colors.border,
                          borderBottomColor: aktif ? t.border : colors.border,
                          backgroundColor: aktif ? t.bg : colors.surface,
                        },
                      ]}
                      containerStyle={s.testKartWrap}
                    >
                      <Text style={s.testEmoji}>{t.icon}</Text>
                      <Text style={[s.testLabel, { color: aktif ? t.fill : colors.textPrimary }]}>{t.label}</Text>
                      <Text style={[s.testSub, { color: colors.textMuted }]}>{t.alt}</Text>
                      {aktif && (
                        <View style={[s.checkBadge, { backgroundColor: t.fill, borderColor: t.fillDark }]}>
                          <Text style={s.checkText}>✓</Text>
                        </View>
                      )}
                    </SoftPressable>
                  );
                })}
              </View>
            </Animated.View>

            {/* ── CTA BUTONU ───────────────────────────────────────────── */}
            <Animated.View style={[s.ctaSection, { opacity: cardsAnim }]}>
              <SoftPressable
                style={[s.ctaBtn, { backgroundColor: secili.fill, borderColor: secili.fillDark }]}
                onPress={() => navigation.navigate(secili.screen)}
                containerStyle={s.ctaBtnWrap}
                hoverScale={1.015}
              >
                <Text style={s.ctaBtnText}>{secili.label}ni Başlat 🚀</Text>
              </SoftPressable>
            </Animated.View>

            <View style={[s.divider, { backgroundColor: colors.border }]} />

            {/* ── KEŞFET ───────────────────────────────────────────────── */}
            <Animated.View
              style={[
                s.section,
                {
                  opacity: kesfetAnim,
                  transform: [{
                    translateY: kesfetAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }),
                  }],
                },
              ]}
            >
              <Text style={[s.sectionLabel, { color: colors.textMuted }]}>Keşfet</Text>
              <View style={s.kesfetGrid}>
                {KESFET_KARTLAR.map((k, i) => (
                  <SoftPressable
                    key={i}
                    style={[s.kesfetKart, { borderColor: k.border, backgroundColor: k.bg }]}
                    containerStyle={isDesktop ? s.kesfetWrapDesktop : s.kesfetWrap}
                    onPress={() => navigation.navigate(k.screen)}
                  >
                    <Text style={s.kesfetEmoji}>{k.emoji}</Text>
                    <Text style={[s.kesfetBaslik, { color: k.badgeColor }]}>{k.baslik}</Text>
                    <Text style={[s.kesfetAlt, { color: colors.textSecondary }]}>{k.alt}</Text>
                    <View style={[s.badge, { backgroundColor: k.badgeColor }]}>
                      <Text style={s.badgeText}>{k.badgeText}</Text>
                    </View>
                  </SoftPressable>
                ))}
              </View>
            </Animated.View>

            <View style={[s.divider, { backgroundColor: colors.border }]} />

            {/* ── NASIL ÇALIŞIR ─────────────────────────────────────────── */}
            <Animated.View
              style={[
                s.section,
                {
                  opacity: kesfetAnim,
                  transform: [{
                    translateY: kesfetAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }),
                  }],
                },
              ]}
            >
              <Text style={[s.sectionLabel, { color: colors.textMuted }]}>Nasıl Çalışır?</Text>
              <View style={s.adimRow}>
                {ADIMLAR.map((adim, i) => (
                  <View
                    key={i}
                    style={[s.adimKart, { borderColor: adim.border, backgroundColor: adim.bg }]}
                  >
                    <View style={[s.adimNo, { backgroundColor: adim.color, borderColor: adim.border }]}>
                      <Text style={s.adimNoText}>{adim.no}</Text>
                    </View>
                    <Text style={s.adimEmoji}>{adim.emoji}</Text>
                    <Text style={[s.adimBaslik, { color: adim.color }]}>{adim.baslik}</Text>
                    <Text style={[s.adimAlt, { color: colors.textSecondary }]}>{adim.alt}</Text>
                  </View>
                ))}
              </View>
            </Animated.View>

            <Footer navigation={navigation} />

          </Animated.ScrollView>
        </ScreenFadeIn>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  scroll: {
    alignItems: 'center',
    paddingBottom: 32,
    paddingTop: isDesktop ? 48 : 28,
  },

  heroCard: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
    marginBottom: 24,
    maxWidth: MAX,
    width: '100%',
    borderRadius: 18,
    borderWidth: 2,
    borderBottomWidth: 5,
    marginHorizontal: 20,
  },
  heroTitle: {
    fontSize: isDesktop ? 44 : 28,
    fontWeight: '900',
    fontFamily: FONT,
    textAlign: 'center',
    letterSpacing: -0.5,
    lineHeight: isDesktop ? 52 : 34,
    marginBottom: 12,
  },
  heroSub: {
    fontSize: isDesktop ? 16 : 13,
    fontFamily: FONT,
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '700',
    marginBottom: 24,
  },

  section: { maxWidth: MAX, width: '100%', paddingHorizontal: 20, marginBottom: 16 },
  sectionLabel: {
    fontSize: 11, fontWeight: '900', fontFamily: FONT,
    letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 12,
  },

  testRow:      { flexDirection: 'row', gap: 12 },
  testKartWrap: { flex: 1 },
  testKart: {
    flex: 1, alignItems: 'center', borderRadius: 18,
    borderWidth: 2, borderBottomWidth: 5,
    padding: isDesktop ? 20 : 16, gap: 6,
    position: 'relative', minHeight: isDesktop ? 140 : 110,
  },
  testEmoji: { fontSize: isDesktop ? 32 : 28, marginBottom: 4 },
  testLabel: { fontSize: isDesktop ? 14 : 13, fontWeight: '900', fontFamily: FONT, textAlign: 'center' },
  testSub:   { fontSize: isDesktop ? 11 : 10, fontWeight: '700', fontFamily: FONT, textAlign: 'center' },
  checkBadge: {
    position: 'absolute', top: -7, right: -7,
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, alignItems: 'center', justifyContent: 'center',
  },
  checkText: { color: '#fff', fontSize: 11, fontWeight: '900' },

  ctaSection: {
    maxWidth: MAX, width: '100%',
    paddingHorizontal: 20, marginBottom: 8,
    alignItems: 'center', gap: 10,
  },
  ctaBtnWrap: { width: '100%' },
  ctaBtn: {
    width: '100%', borderRadius: 14,
    borderWidth: 2, borderBottomWidth: 5,
    paddingVertical: 16, alignItems: 'center', justifyContent: 'center',
  },
  ctaBtnText: { fontSize: 17, fontWeight: '900', color: '#FFFFFF', fontFamily: FONT, letterSpacing: 0.3 },

  divider: { height: 2, width: '100%', maxWidth: MAX, marginVertical: 24 },

  kesfetGrid: {
    flexDirection: isDesktop ? 'row' : 'column',
    flexWrap: isDesktop ? 'wrap' : 'nowrap',
    gap: 12, width: '100%', maxWidth: MAX,
    alignItems: isDesktop ? 'stretch' : 'center',
  },
  kesfetWrap:        { width: '100%' },
  kesfetWrapDesktop: { width: '48%', marginBottom: 12 },
  kesfetKart: {
    borderRadius: 18, borderWidth: 2, borderBottomWidth: 5,
    padding: isDesktop ? 18 : 16, gap: 6,
    ...(isDesktop ? { width: '100%', minHeight: 140 } : { width: '100%', maxWidth: 340, minHeight: 110 }),
  },
  kesfetEmoji:  { fontSize: isDesktop ? 26 : 24, marginBottom: 2 },
  kesfetBaslik: { fontSize: isDesktop ? 15 : 14, fontWeight: '900', fontFamily: FONT },
  kesfetAlt:    { fontSize: isDesktop ? 12 : 11, fontWeight: '700', fontFamily: FONT, lineHeight: 16 },
  badge: { alignSelf: 'flex-start', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, marginTop: 4 },
  badgeText: { fontSize: 10, fontWeight: '900', color: '#fff', fontFamily: FONT, letterSpacing: 0.3 },

  adimRow: { flexDirection: isDesktop ? 'row' : 'column', gap: 12 },
  adimKart: {
    flex: isDesktop ? 1 : undefined,
    borderRadius: 18, borderWidth: 2, borderBottomWidth: 5,
    padding: isDesktop ? 18 : 16, gap: 4, alignItems: 'flex-start',
    ...(isDesktop ? {} : { maxWidth: 340 }),
  },
  adimNo: {
    width: 28, height: 28, borderRadius: 14, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center', marginBottom: 6,
  },
  adimNoText: { fontSize: 13, fontWeight: '900', color: '#fff', fontFamily: FONT },
  adimEmoji:  { fontSize: isDesktop ? 22 : 20, marginBottom: 2 },
  adimBaslik: { fontSize: isDesktop ? 14 : 13, fontWeight: '900', fontFamily: FONT },
  adimAlt:    { fontSize: isDesktop ? 12 : 11, fontWeight: '700', fontFamily: FONT },
});
