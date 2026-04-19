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
import Footer from '../components/Footer';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;
const FONT = Platform.select({ ios: 'System', android: 'sans-serif', web: "'Inter', system-ui, sans-serif" });
const MAX = 680;

// ─── Disclaimer bileşeni ──────────────────────────────────────────────────────
function HomeDisclaimer() {
  return (
    <View style={hd.kutu}>
      <Text style={hd.ikon}>ℹ</Text>
      <Text style={hd.metin}>
        Bu platform kişisel farkındalık ve keşif amaçlıdır. MBTI ve Enneagram modelleri sınırlı psikometrik desteğe sahiptir; sonuçlar klinik tanı veya kesin kariyer yönlendirmesi için kullanılmamalıdır.
      </Text>
    </View>
  );
}

const hd = StyleSheet.create({
  kutu: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: colors.warningLight,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.warning + '50',
    padding: 14,
    marginBottom: 24,
    maxWidth: MAX,
    width: '100%',
    paddingHorizontal: 20,
  },
  ikon: { fontSize: 14, color: colors.warning, marginTop: 1, flexShrink: 0 },
  metin: { fontSize: 12, color: '#78350F', lineHeight: 18, flex: 1, fontFamily: FONT },
});

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

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(ctaPulse, { toValue: 1.03, duration: 1000, useNativeDriver: true, easing: Easing.inOut(Easing.quad) }),
        Animated.timing(ctaPulse, { toValue: 1,    duration: 1000, useNativeDriver: true, easing: Easing.inOut(Easing.quad) }),
      ])
    );
    pulseLoop.start();
    return () => { pulseLoop.stop(); };
  }, []);

  const TESTLER = [
    { id: 'mbti',      icon: '◎', label: 'MBTI Testi',  alt: '16 kişilik tipi',  screen: 'MBTI',      renk: colors.primary,    bg: colors.primaryLight },
    { id: 'enneagram', icon: '◈', label: 'Enneagram',   alt: '9 tip analizi',    screen: 'Enneagram', renk: colors.enneagram,  bg: colors.enneagramLight },
  ];

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
                Psikoloji ve tipoloji literatürüne dayanan{'\n'}
                kişisel farkındalık platformu
              </Text>
            </Animated.View>

            {/* Disclaimer */}
            <HomeDisclaimer />

            {/* Test seçim kartları */}
            <Animated.View style={[s.testKartlar, {
              opacity: cardsAnim,
              transform: [{ translateY: cardsAnim.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }) }]
            }]}>
              {TESTLER.map((t) => {
                const aktif = aktifTest === t.id;
                return (
                  <SoftPressable
                    key={t.id}
                    onPress={() => setAktifTest(t.id)}
                    style={[s.testKart, aktif && { backgroundColor: t.bg, borderColor: t.renk + '55' },
                      { shadowColor: t.renk, shadowOpacity: aktif ? 0.22 : 0.06, shadowRadius: aktif ? 14 : 6 }]}
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

            {/* CTA butonu */}
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
                        colors={[secili.renk, secili.id === 'mbti' ? colors.primaryDark : '#6D28D9']}
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

            <View style={s.sectionDivider} />

            {/* Keşfet */}
            <Animated.Text style={[s.sectionTitle, {
              opacity: kesfetAnim,
              transform: [{ translateY: kesfetAnim.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }]
            }]}>Keşfet</Animated.Text>

            <Animated.View style={[s.kesfetGrid, {
              opacity: kesfetAnim,
              transform: [{ translateY: kesfetAnim.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }) }]
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
                      <Text style={[s.badgeText, { color: '#065F46' }]}>16 + 9</Text>
                    </View>
                  </View>
                  <Text style={s.kesfetKartAlt}>MBTI ve Enneagram tiplerini keşfet, özelliklerini öğren.</Text>
                  <Text style={s.kesfetKartLink}>İncele →</Text>
                </View>
              </SoftPressable>

              <SoftPressable style={[s.kesfetKart, s.kesfetKartViolet]} containerStyle={s.hoverItem}
                onPress={() => navigation.navigate('Kaynaklar')}>
                <View style={[s.kesfetIcon, { backgroundColor: colors.enneagramLight }]}>
                  <Text style={s.kesfetIconText}>◈</Text>
                </View>
                <View style={s.kesfetKartSag}>
                  <View style={s.kesfetKartUst}>
                    <Text style={s.kesfetKartBaslik}>Kaynaklar</Text>
                    <View style={[s.badge, { backgroundColor: colors.enneagramLight }]}>
                      <Text style={[s.badgeText, { color: '#5B21B6' }]}>Akademik</Text>
                    </View>
                  </View>
                  <Text style={s.kesfetKartAlt}>Kitaplar, araştırmalar ve temel kavramlar hakkında bilgi edin.</Text>
                  <Text style={[s.kesfetKartLink, { color: colors.enneagram }]}>Görüntüle →</Text>
                </View>
              </SoftPressable>

              <SoftPressable style={[s.kesfetKart, s.kesfetKartCyan]} containerStyle={s.hoverItem}
                onPress={() => navigation.navigate('MBTI')}>
                <View style={[s.kesfetIcon, { backgroundColor: colors.primaryLight }]}>
                  <Text style={s.kesfetIconText}>◎</Text>
                </View>
                <View style={s.kesfetKartSag}>
                  <View style={s.kesfetKartUst}>
                    <Text style={s.kesfetKartBaslik}>MBTI Testi</Text>
                    <View style={[s.badge, { backgroundColor: colors.warningLight }]}>
                      <Text style={[s.badgeText, { color: '#92400E' }]}>YENİ</Text>
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
  scroll: { alignItems: 'center', paddingBottom: 0, paddingTop: isDesktop ? 56 : 32 },

  hero: { alignItems: 'center', paddingHorizontal: 24, marginBottom: 32, maxWidth: MAX, width: '100%' },
  heroTitle: { fontSize: isDesktop ? 40 : 28, fontWeight: '700', color: colors.textPrimary, fontFamily: FONT, textAlign: 'center', letterSpacing: -0.5, marginBottom: 12 },
  heroSub: { fontSize: isDesktop ? 16 : 14, color: colors.textSecondary, fontFamily: FONT, textAlign: 'center', lineHeight: 22 },

  testKartlar: { flexDirection: 'row', gap: 12, paddingHorizontal: 20, maxWidth: MAX, width: '100%', marginBottom: 20 },
  testKart: { flex: 1, alignItems: 'center', backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1.5, borderColor: colors.border, padding: 18, gap: 8 },
  testKartIcon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 4, borderWidth: 1 },
  testKartIconText: { fontSize: 22 },
  testKartLabel: { fontSize: 13, fontWeight: '500', color: colors.textPrimary, fontFamily: FONT, textAlign: 'center' },
  testKartAlt: { fontSize: 11, color: colors.textMuted, fontFamily: FONT, textAlign: 'center' },

  ctaWrap: { alignItems: 'center', gap: 12, maxWidth: MAX, width: '100%', paddingHorizontal: 20, marginBottom: 12 },
  testHoverItem: { flex: 1 },
  hoverItem: { width: '100%' },
  ctaBtn: { width: '100%', borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#ffffff55', shadowColor: '#0ea5e9', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.22, shadowRadius: 14, elevation: 6 },
  ctaGradient: { width: '100%', paddingVertical: 18, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  ctaTopShine: { position: 'absolute', top: 0, left: 12, right: 12, height: 1, backgroundColor: '#ffffff80' },
  ctaBtnText: { fontSize: 16, fontWeight: '600', color: '#ffffff', fontFamily: FONT, letterSpacing: 0.2 },
  ctaAlt: { fontSize: 12, color: colors.textMuted, fontFamily: FONT },

  sectionDivider: { height: 1, backgroundColor: colors.border, width: '100%', maxWidth: MAX, marginVertical: 32 },
  sectionTitle: { fontSize: 15, fontWeight: '600', color: colors.textPrimary, fontFamily: FONT, alignSelf: 'center', paddingHorizontal: 20, maxWidth: MAX, width: '100%', marginBottom: 16 },

  kesfetGrid: { maxWidth: MAX, width: '100%', paddingHorizontal: 20, gap: 12 },
  kesfetKart: { flexDirection: 'row', gap: 16, backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  kesfetKartCyan:    { borderColor: colors.primary + '33',   shadowColor: colors.primary,   shadowOpacity: 0.12 },
  kesfetKartViolet:  { borderColor: colors.enneagram + '33', shadowColor: colors.enneagram, shadowOpacity: 0.10 },
  kesfetKartEmerald: { borderColor: '#10b981' + '33',        shadowColor: '#10b981',        shadowOpacity: 0.10 },
  kesfetIcon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  kesfetIconText: { fontSize: 22 },
  kesfetKartSag: { flex: 1, gap: 4 },
  kesfetKartUst: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  kesfetKartBaslik: { fontSize: 14, fontWeight: '600', color: colors.textPrimary, fontFamily: FONT },
  kesfetKartAlt: { fontSize: 12, color: colors.textSecondary, fontFamily: FONT, lineHeight: 18 },
  kesfetKartLink: { fontSize: 12, color: colors.primary, fontWeight: '500', fontFamily: FONT, marginTop: 4 },
  badge: { borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { fontSize: 10, fontWeight: '700', fontFamily: FONT, letterSpacing: 0.3 },
});
