import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, StatusBar,
  Dimensions, Platform, Animated, Easing, TouchableOpacity, Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, space, shadows, radius } from '../theme/colors';
import TopNav from '../components/TopNav';
import AppBackground from '../components/AppBackground';
import SoftPressable from '../components/SoftPressable';
import ScreenFadeIn from '../components/ScreenFadeIn';
import Footer from '../components/Footer';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;
const FONT = Platform.select({ ios: 'System', android: 'sans-serif', web: "'Inter', system-ui, sans-serif" });

const TESTLER = [
  { id: 'mbti',      icon: '◎', label: 'MBTI Testi',  alt: '16 kişilik tipi', screen: 'MBTI',      renk: colors.primary, bg: colors.primaryLight },
  { id: 'enneagram', icon: '◈', label: 'Enneagram',   alt: '9 tip analizi',   screen: 'Enneagram', renk: '#8B5CF6',       bg: '#EDE9FE'           },
];

const MAX = 680;

export default function HomeScreen({ navigation }) {
  const fadeAnim   = useRef(new Animated.Value(0)).current;
  const slideAnim  = useRef(new Animated.Value(16)).current;
  const cardsAnim  = useRef(new Animated.Value(0)).current;
  const ctaPulse   = useRef(new Animated.Value(1)).current;
  const kesfetAnim = useRef(new Animated.Value(0)).current;
  const [aktifTest, setAktifTest] = useState('mbti');

  useEffect(() => {
    if (isWeb) {
      let meta = document.querySelector('meta[name=viewport]');
      if (!meta) { meta = document.createElement('meta'); meta.name = 'viewport'; document.head.appendChild(meta); }
      meta.content = 'width=device-width, initial-scale=1, maximum-scale=1';
    }
    Animated.parallel([
      Animated.timing(fadeAnim,   { toValue: 1, duration: 520, useNativeDriver: true }),
      Animated.timing(slideAnim,  { toValue: 0, duration: 420, delay: 60,  useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
      Animated.timing(cardsAnim,  { toValue: 1, duration: 560, delay: 130, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
      Animated.timing(kesfetAnim, { toValue: 1, duration: 620, delay: 220, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
    ]).start();

    const pulseLoop = Animated.loop(Animated.sequence([
      Animated.timing(ctaPulse, { toValue: 1.03, duration: 1000, useNativeDriver: true, easing: Easing.inOut(Easing.quad) }),
      Animated.timing(ctaPulse, { toValue: 1,    duration: 1000, useNativeDriver: true, easing: Easing.inOut(Easing.quad) }),
    ]));
    pulseLoop.start();
    return () => pulseLoop.stop();
  }, []);

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <AppBackground />
      <SafeAreaView style={s.safe}>
        <ScreenFadeIn>
          <TopNav navigation={navigation} />

          <Animated.ScrollView
            contentContainerStyle={s.scroll}
            showsVerticalScrollIndicator={false}
            style={{ opacity: fadeAnim }}
          >
            {/* Hero */}
            <Animated.View style={[s.hero, { transform: [{ translateY: slideAnim }] }]}>
              <Text style={s.heroTitle}>Profilini Keşfet</Text>
              <Text style={s.heroSub}>
                Psikoloji ve tipoloji literatürüne dayanan, akademik amaçlı{'\n'}
                ücretsiz kişilik analizi platformu
              </Text>
            </Animated.View>

            {/* Test seçim kartları */}
            <Animated.View style={[s.testKartlar, {
              opacity: cardsAnim,
              transform: [{ translateY: cardsAnim.interpolate({ inputRange: [0,1], outputRange: [18,0] }) }],
            }]}>
              {TESTLER.map((t) => {
                const aktif = aktifTest === t.id;
                return (
                  <SoftPressable
                    key={t.id}
                    onPress={() => setAktifTest(t.id)}
                    style={[
                      s.testKart,
                      aktif && { backgroundColor: t.bg, borderColor: t.renk + '55' },
                      aktif && shadows.colored(t.renk),
                    ]}
                    containerStyle={s.testHoverItem}
                  >
                    <View style={[s.testKartIcon, {
                      backgroundColor: aktif ? t.renk + '22' : colors.surfaceLight,
                      borderColor: aktif ? t.renk + '35' : colors.borderLight,
                    }]}>
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
                const secili = TESTLER.find(t => t.id === aktifTest);
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
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
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

            {/* Divider */}
            <View style={s.sectionDivider} />

            {/* Keşfet */}
            <Animated.Text style={[s.sectionTitle, {
              opacity: kesfetAnim,
              transform: [{ translateY: kesfetAnim.interpolate({ inputRange: [0,1], outputRange: [12,0] }) }],
            }]}>Keşfet</Animated.Text>

            <Animated.View style={[s.kesfetGrid, {
              opacity: kesfetAnim,
              transform: [{ translateY: kesfetAnim.interpolate({ inputRange: [0,1], outputRange: [18,0] }) }],
            }]}>
              <SoftPressable style={[s.kesfetKart, s.kesfetKartEmerald]} containerStyle={s.hoverItem}
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

              <SoftPressable style={[s.kesfetKart, s.kesfetKartViolet]} containerStyle={s.hoverItem}
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

              <SoftPressable style={[s.kesfetKart, s.kesfetKartCyan]} containerStyle={s.hoverItem}
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

            <Footer navigation={navigation} />
          </Animated.ScrollView>
        </ScreenFadeIn>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  safe: { flex: 1 },
  scroll: { alignItems: 'center', paddingBottom: 0, paddingTop: isDesktop ? space[12] : space[8] },

  // Hero
  hero: { alignItems: 'center', paddingHorizontal: space[6], marginBottom: space[8], maxWidth: MAX, width: '100%' },
  heroTitle: {
    fontSize: isDesktop ? 44 : 30,
    fontWeight: '800',
    color: colors.textPrimary,
    fontFamily: FONT,
    textAlign: 'center',
    letterSpacing: -1,
    lineHeight: isDesktop ? 52 : 38,
    marginBottom: space[4],
  },
  heroSub: {
    fontSize: isDesktop ? 16 : 14,
    color: colors.textSecondary,
    fontFamily: FONT,
    textAlign: 'center',
    lineHeight: 24,
  },

  // Test kartları
  testKartlar: {
    flexDirection: 'row', gap: space[3],
    paddingHorizontal: space[5],
    maxWidth: MAX, width: '100%',
    marginBottom: space[5],
  },
  testHoverItem: { flex: 1 },
  testKart: {
    flex: 1, alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 2, borderColor: colors.border,
    padding: space[5], gap: space[2],
    ...shadows.md,
  },
  testKartIcon: {
    width: 48, height: 48, borderRadius: radius.md,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: space[1], borderWidth: 1,
  },
  testKartIconText: { fontSize: 22 },
  testKartLabel:    { fontSize: 13, fontWeight: '500', color: colors.textPrimary, fontFamily: FONT, textAlign: 'center' },
  testKartAlt:      { fontSize: 11, color: colors.textMuted, fontFamily: FONT, textAlign: 'center' },

  // CTA
  hoverItem: { width: '100%' },
  ctaWrap: {
    alignItems: 'center', gap: space[3],
    maxWidth: MAX, width: '100%',
    paddingHorizontal: space[5], marginBottom: space[4],
  },
  ctaBtn: {
    width: '100%', borderRadius: radius.xl, overflow: 'hidden',
    borderWidth: 1, borderColor: '#ffffff55',
    ...shadows.xl,
  },
  ctaGradient: {
    width: '100%', paddingVertical: space[5],
    alignItems: 'center', justifyContent: 'center', position: 'relative',
  },
  ctaTopShine: {
    position: 'absolute', top: 0, left: space[4], right: space[4],
    height: 1, backgroundColor: '#ffffff88',
  },
  ctaBtnText: { fontSize: 16, fontWeight: '700', color: '#ffffff', fontFamily: FONT, letterSpacing: 0.2 },
  ctaAlt:     { fontSize: 12, color: colors.textMuted, fontFamily: FONT },

  // Divider & Section
  sectionDivider: { height: 1, backgroundColor: colors.border, width: '100%', maxWidth: MAX, marginVertical: space[8] },
  sectionTitle: {
    fontSize: isDesktop ? 24 : 18,
    fontWeight: '800', color: colors.textPrimary,
    fontFamily: FONT, letterSpacing: -0.5,
    alignSelf: 'flex-start', paddingHorizontal: space[5],
    maxWidth: MAX, width: '100%', marginBottom: space[4],
  },

  // Keşfet kartları
  kesfetGrid: { maxWidth: MAX, width: '100%', paddingHorizontal: space[5], gap: space[3] },
  kesfetKart: {
    flexDirection: 'row', gap: space[4],
    backgroundColor: colors.surface,
    borderRadius: radius.xl, borderWidth: 1.5, borderColor: colors.border,
    padding: space[5],
    ...shadows.md,
  },
  kesfetKartCyan:    { borderColor: '#06b6d433', ...shadows.colored('#06b6d4') },
  kesfetKartViolet:  { borderColor: '#8b5cf633', ...shadows.colored('#8b5cf6') },
  kesfetKartEmerald: { borderColor: '#10b98133', ...shadows.colored('#10b981') },
  kesfetIcon: {
    width: 48, height: 48, borderRadius: radius.md,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  kesfetIconText:   { fontSize: 22 },
  kesfetKartSag:    { flex: 1, gap: space[1] },
  kesfetKartUst:    { flexDirection: 'row', alignItems: 'center', gap: space[2] },
  kesfetKartBaslik: { fontSize: 15, fontWeight: '700', color: colors.textPrimary, fontFamily: FONT },
  kesfetKartAlt:    { fontSize: 13, color: colors.textSecondary, fontFamily: FONT, lineHeight: 20 },
  kesfetKartLink:   { fontSize: 13, color: colors.primary, fontWeight: '600', fontFamily: FONT, marginTop: space[1] },

  badge:     { borderRadius: radius.full, paddingHorizontal: space[2] + 2, paddingVertical: 3 },
  badgeText: { fontSize: 10, fontWeight: '700', fontFamily: FONT, letterSpacing: 0.3 },
});
