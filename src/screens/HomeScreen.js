import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet,
  SafeAreaView, StatusBar, Dimensions, Platform,
  Animated, Easing, TouchableOpacity, Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import TopNav from '../components/TopNav';
import AppBackground from '../components/AppBackground';
import SoftPressable from '../components/SoftPressable';
import ScreenFadeIn from '../components/ScreenFadeIn';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;

const FONT = Platform.select({
  ios: 'System', android: 'sans-serif',
  web: "'Inter', system-ui, sans-serif",
});

export default function HomeScreen({ navigation }) {
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(16)).current;
  const cardsAnim = useRef(new Animated.Value(0)).current;
  const ctaPulse  = useRef(new Animated.Value(1)).current;
  const kesfetAnim = useRef(new Animated.Value(0)).current;
  const [aktifTest, setAktifTest] = useState('mbti');

  useEffect(() => {
    if (isWeb) {
      let meta = document.querySelector('meta[name=viewport]');
      if (!meta) { meta = document.createElement('meta'); meta.name = 'viewport'; document.head.appendChild(meta); }
      meta.content = 'width=device-width, initial-scale=1, maximum-scale=1';
    }
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 520, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 420, delay: 60, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
      Animated.timing(cardsAnim, { toValue: 1, duration: 560, delay: 130, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
      Animated.timing(kesfetAnim, { toValue: 1, duration: 620, delay: 220, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
    ]).start();

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(ctaPulse, { toValue: 1.03, duration: 1000, useNativeDriver: true, easing: Easing.inOut(Easing.quad) }),
        Animated.timing(ctaPulse, { toValue: 1, duration: 1000, useNativeDriver: true, easing: Easing.inOut(Easing.quad) }),
      ])
    );
    pulseLoop.start();

    return () => { pulseLoop.stop(); };
  }, []);

  const TESTLER = [
    {
      id:      'mbti',
      icon:    '◎',
      label:   'MBTI Testi',
      alt:     '16 kişilik tipi',
      screen:  'MBTI',
      renk:    colors.primary,
      bg:      colors.primaryLight,
    },
    {
      id:      'enneagram',
      icon:    '◈',
      label:   'Enneagram',
      alt:     '9 tip analizi',
      screen:  'Enneagram',
      renk:    '#8B5CF6',
      bg:      '#EDE9FE',
    },
  ];

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <AppBackground />
      <SafeAreaView style={s.safe}>
        <ScreenFadeIn>
          <TopNav navigation={navigation} />

        {/* Ana içerik */}
          <Animated.ScrollView
            contentContainerStyle={s.scroll}
            showsVerticalScrollIndicator={false}
            style={{ opacity: fadeAnim }}
          >
          {/* Hero başlık */}
          <Animated.View style={[s.hero, { transform: [{ translateY: slideAnim }] }]}>
            <Text style={s.heroTitle}>Profilini Keşfet</Text>
            <Text style={s.heroSub}>
              Psikoloji ve tipoloji literatürüne dayanan, akademik amaçlı{'\n'}
              ücretsiz kişilik analizi platformu
            </Text>
          </Animated.View>

          {/* Test seçim kartları */}
          <Animated.View style={[s.testKartlar, { opacity: cardsAnim, transform: [{ translateY: cardsAnim.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }) }] }]}>
            {TESTLER.map((t) => {
              const aktif = aktifTest === t.id;
              return (
                <SoftPressable
                  key={t.id}
                  onPress={() => setAktifTest(t.id)}
                  style={[
                    s.testKart,
                    aktif && { backgroundColor: t.bg, borderColor: t.renk + '55' },
                    {
                      shadowColor: t.renk,
                      shadowOpacity: aktif ? 0.22 : 0.08,
                      shadowRadius: aktif ? 14 : 8,
                    },
                  ]}
                  containerStyle={s.testHoverItem}
                >
                  <View style={[s.testKartIcon, { backgroundColor: aktif ? t.renk + '22' : colors.surfaceLight, borderColor: aktif ? t.renk + '35' : colors.borderLight }]}>
                    <Text style={[s.testKartIconText, { color: aktif ? t.renk : colors.textMuted }]}>{t.icon}</Text>
                  </View>
                  <Text style={[s.testKartLabel, aktif && { color: t.renk, fontWeight: '600' }]}>{t.label}</Text>
                  <Text style={s.testKartAlt}>{t.alt}</Text>
                </SoftPressable>
              );
            })}
          </Animated.View>

          {/* Başlat butonu */}
          <View style={s.ctaWrap}>
            {(() => {
              const secili = TESTLER.find((t) => t.id === aktifTest);
              return (
                <Animated.View style={{ width: '100%', transform: [{ scale: ctaPulse }] }}>
                  <SoftPressable
                    style={s.ctaBtn}
                    onPress={() => navigation.navigate(secili.screen)}
                    containerStyle={s.hoverItem}
                    hoverScale={1.02}
                  >
                    <LinearGradient
                      colors={[secili.renk, secili.renk === colors.primary ? '#0284C7' : '#7C3AED']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={s.ctaGradient}
                    >
                      <View style={s.ctaTopShine} />
                      <Text style={s.ctaBtnText}>Testi Başlat  →</Text>
                    </LinearGradient>
                  </SoftPressable>
                </Animated.View>
              );
            })()}
            <Text style={s.ctaAlt}>Ücretsiz · Kayıt gerektirmez · ~5 dakika</Text>
          </View>

          {/* ── Divider ── */}
          <View style={s.sectionDivider} />

          {/* Keşfet bölümü */}
          <Animated.Text style={[s.sectionTitle, { opacity: kesfetAnim, transform: [{ translateY: kesfetAnim.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }] }]}>Keşfet</Animated.Text>
          <Animated.View style={[s.kesfetGrid, { opacity: kesfetAnim, transform: [{ translateY: kesfetAnim.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }) }] }]}>

            <SoftPressable style={[s.kesfetKart, s.kesfetKartEmerald]}
              containerStyle={s.hoverItem}
              onPress={() => navigation.navigate('KisilikTipleri')}>
              <View style={[s.kesfetIcon, { backgroundColor: '#FEF3C7' }]}>
                <Text style={s.kesfetIconText}>✦</Text>
              </View>
              <View style={s.kesfetKartSag}>
                <View style={s.kesfetKartUst}>
                  <Text style={s.kesfetKartBaslik}>Kişilik Tipleri</Text>
                  <View style={[s.badge, { backgroundColor: '#D1FAE5' }]}>
                    <Text style={[s.badgeText, { color: '#059669' }]}>16 + 9</Text>
                  </View>
                </View>
                <Text style={s.kesfetKartAlt}>MBTI ve Enneagram tiplerini keşfet, özelliklerini öğren.</Text>
                <Text style={s.kesfetKartLink}>İncele →</Text>
              </View>
            </SoftPressable>

            <SoftPressable style={[s.kesfetKart, s.kesfetKartViolet]}
              containerStyle={s.hoverItem}
              onPress={() => navigation.navigate('Kaynaklar')}>
              <View style={[s.kesfetIcon, { backgroundColor: '#EDE9FE' }]}>
                <Text style={s.kesfetIconText}>◈</Text>
              </View>
              <View style={s.kesfetKartSag}>
                <View style={s.kesfetKartUst}>
                  <Text style={s.kesfetKartBaslik}>Kaynaklar</Text>
                  <View style={[s.badge, { backgroundColor: '#EDE9FE' }]}>
                    <Text style={[s.badgeText, { color: '#7C3AED' }]}>Akademik</Text>
                  </View>
                </View>
                <Text style={s.kesfetKartAlt}>Kitaplar, araştırmalar ve temel kavramlar hakkında bilgi edin.</Text>
                <Text style={s.kesfetKartLink}>Görüntüle →</Text>
              </View>
            </SoftPressable>

            <SoftPressable style={[s.kesfetKart, s.kesfetKartCyan]}
              containerStyle={s.hoverItem}
              onPress={() => navigation.navigate('MBTI')}>
              <View style={[s.kesfetIcon, { backgroundColor: '#E0F2FE' }]}>
                <Text style={s.kesfetIconText}>◎</Text>
              </View>
              <View style={s.kesfetKartSag}>
                <View style={s.kesfetKartUst}>
                  <Text style={s.kesfetKartBaslik}>MBTI Testi</Text>
                  <View style={[s.badge, { backgroundColor: '#FEF3C7' }]}>
                    <Text style={[s.badgeText, { color: '#D97706' }]}>YENİ</Text>
                  </View>
                </View>
                <Text style={s.kesfetKartAlt}>Bilişsel fonksiyonlarına dayalı 16 tipten hangisi senin?</Text>
                <Text style={s.kesfetKartLink}>Başla →</Text>
              </View>
            </SoftPressable>

          </Animated.View>

          {/* Footer — tam genişlik, iki satır (referans düzen) */}
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
                      Psikoloji ve tipoloji literatürüne dayanan kişilik analizi
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
                  © {new Date().getFullYear()} Indoles. Tüm hakları saklıdır.
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Kaynaklar', { initialKat: 'sss' })}
                  activeOpacity={0.7}
                  style={s.footerFaqWrap}
                >
                  <Text style={s.footerFaq}>Sıkça Sorulan Sorular</Text>
                </TouchableOpacity>
                <Text style={s.footerDisclaimer}>
                  Buradaki test sonuçları ve açıklamalar bilgilendirme amaçlıdır; profesyonel psikolojik
                  değerlendirmenin yerini tutmaz. Sonuçlar yanılabilir; uygulamayı kullanarak bunu kabul
                  etmiş sayılırsınız.
                </Text>
              </View>
            </View>
          </View>

          </Animated.ScrollView>
        </ScreenFadeIn>
      </SafeAreaView>
    </View>
  );
}

const MAX = 680;

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  safe: { flex: 1 },

  // Scroll
  scroll: {
    alignItems: 'center',
    paddingBottom: isDesktop ? 48 : 36,
    paddingTop: isDesktop ? 52 : 32,
  },

  // Hero
  hero: { alignItems: 'center', paddingHorizontal: 24, marginBottom: 32, maxWidth: MAX, width: '100%' },
  heroTitle: {
    fontSize: isDesktop ? 40 : 28, fontWeight: '700',
    color: colors.textPrimary, fontFamily: FONT,
    textAlign: 'center', letterSpacing: -0.5,
    marginBottom: 12,
  },
  heroSub: {
    fontSize: isDesktop ? 16 : 14, color: colors.textSecondary,
    fontFamily: FONT, textAlign: 'center', lineHeight: 22,
  },

  // Test kartları
  testKartlar: {
    flexDirection: 'row', gap: 10,
    paddingHorizontal: 20,
    maxWidth: MAX, width: '100%',
    marginBottom: 20,
  },
  testKart: {
    flex: 1, alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16, borderWidth: 1.5, borderColor: colors.border,
    padding: 16, gap: 6,
  },
  testKartIcon: {
    width: 44, height: 44, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', marginBottom: 4, borderWidth: 1,
  },
  testKartIconText: { fontSize: 20 },
  testKartLabel:    { fontSize: 13, fontWeight: '500', color: colors.textPrimary, fontFamily: FONT, textAlign: 'center' },
  testKartAlt:      { fontSize: 11, color: colors.textMuted, fontFamily: FONT, textAlign: 'center' },

  // CTA butonu
  ctaWrap: { alignItems: 'center', gap: 10, maxWidth: MAX, width: '100%', paddingHorizontal: 20, marginBottom: 12 },
  testHoverItem: { flex: 1 },
  hoverItem: { width: '100%' },
  ctaBtn: {
    width: '100%',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ffffff55',
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.26,
    shadowRadius: 14,
    elevation: 6,
  },
  ctaGradient: {
    width: '100%',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  ctaTopShine: {
    position: 'absolute',
    top: 0,
    left: 12,
    right: 12,
    height: 1,
    backgroundColor: '#ffffff88',
  },
  ctaBtnText: { fontSize: 16, fontWeight: '600', color: '#ffffff', fontFamily: FONT, letterSpacing: 0.2 },
  ctaAlt:     { fontSize: 12, color: colors.textMuted, fontFamily: FONT },

  // Divider
  sectionDivider: { height: 1, backgroundColor: colors.border, width: '100%', maxWidth: MAX, marginVertical: 28 },
  sectionTitle:   { fontSize: 15, fontWeight: '600', color: colors.textPrimary, fontFamily: FONT, alignSelf: 'center', paddingHorizontal: 20, maxWidth: MAX, width: '100%', marginBottom: 12 },

  // Keşfet kartları
  kesfetGrid: { maxWidth: MAX, width: '100%', paddingHorizontal: 20, gap: 10 },
  kesfetKart: {
    flexDirection: 'row', gap: 14,
    backgroundColor: colors.surface,
    borderRadius: 16, borderWidth: 1, borderColor: colors.border,
    padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  kesfetKartCyan: {
    borderColor: '#06b6d433',
    shadowColor: '#06b6d4',
    shadowOpacity: 0.14,
  },
  kesfetKartViolet: {
    borderColor: '#8b5cf633',
    shadowColor: '#8b5cf6',
    shadowOpacity: 0.12,
  },
  kesfetKartEmerald: {
    borderColor: '#10b98133',
    shadowColor: '#10b981',
    shadowOpacity: 0.12,
  },
  kesfetIcon: {
    width: 44, height: 44, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  kesfetIconText:    { fontSize: 20 },
  kesfetKartSag:     { flex: 1, gap: 4 },
  kesfetKartUst:     { flexDirection: 'row', alignItems: 'center', gap: 8 },
  kesfetKartBaslik:  { fontSize: 14, fontWeight: '600', color: colors.textPrimary, fontFamily: FONT },
  kesfetKartAlt:     { fontSize: 12, color: colors.textSecondary, fontFamily: FONT, lineHeight: 18 },
  kesfetKartLink:    { fontSize: 12, color: colors.primary, fontWeight: '500', fontFamily: FONT, marginTop: 2 },

  badge:     { borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { fontSize: 10, fontWeight: '700', fontFamily: FONT, letterSpacing: 0.3 },

  footerFullBleed: {
    alignSelf: 'stretch',
    width: '100%',
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: '#EEF2F7',
  },
  footerBar: {
    width: '100%',
    maxWidth: isDesktop ? 1200 : undefined,
    alignSelf: 'center',
    paddingVertical: isDesktop ? 22 : 20,
    paddingHorizontal: isDesktop ? 40 : 20,
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
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  footerLogoCircleText: { color: '#fff', fontSize: 18, fontWeight: '700', fontFamily: FONT },
  footerBrandTexts: { flexShrink: 1, maxWidth: isDesktop ? 420 : '70%' },
  footerBrandName: {
    fontSize: isDesktop ? 17 : 16,
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
});
