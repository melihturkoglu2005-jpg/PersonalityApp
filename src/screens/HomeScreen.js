import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, StatusBar, Dimensions, Platform,
  Animated, TextInput,
} from 'react-native';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;

const FONT = Platform.select({
  ios: 'System', android: 'sans-serif',
  web: "'Inter', system-ui, sans-serif",
});

// x.fazlioglu.tr tarzı: merkezi, kartlı, soğuk beyaz, teal aksan
export default function HomeScreen({ navigation }) {
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(16)).current;
  const [aktifTest, setAktifTest] = useState('mbti');
  const [menuAcik,  setMenuAcik]  = useState(false);

  useEffect(() => {
    if (isWeb) {
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
      link.rel  = 'stylesheet';
      document.head.appendChild(link);
      let meta = document.querySelector('meta[name=viewport]');
      if (!meta) { meta = document.createElement('meta'); meta.name = 'viewport'; document.head.appendChild(meta); }
      meta.content = 'width=device-width, initial-scale=1, maximum-scale=1';
    }
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, delay: 80, useNativeDriver: true }),
    ]).start();
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
    {
      id:      'tipler',
      icon:    '◇',
      label:   'Kişilik Tipleri',
      alt:     '16 + 9 rehber',
      screen:  'KisilikTipleri',
      renk:    '#10B981',
      bg:      '#D1FAE5',
    },
  ];

  const navLinks = [
    { label: 'Kişilik Tipleri', screen: 'KisilikTipleri' },
    { label: 'Kaynaklar',       screen: 'Kaynaklar' },
  ];

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SafeAreaView style={s.safe}>

        {/* ── Top navbar (x.fazlioglu.tr tarzı) ── */}
        <View style={s.navbar}>
          <View style={s.navLeft}>
            <View style={s.navLogo}>
              <Text style={s.navLogoText}>I</Text>
            </View>
            <View>
              <Text style={s.navBrand}>Indoles</Text>
              <Text style={s.navBrandSub}>Kişilik Analizi</Text>
            </View>
          </View>

          {isDesktop ? (
            <View style={s.navLinks}>
              {navLinks.map((item) => (
                <TouchableOpacity key={item.label} style={s.navLinkBtn} activeOpacity={0.7}
                  onPress={() => item.screen && navigation.navigate(item.screen)}>
                  <Text style={s.navLink}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <TouchableOpacity style={s.menuBtn} onPress={() => setMenuAcik(!menuAcik)} activeOpacity={0.7}>
              <Text style={s.menuBtnText}>{menuAcik ? '✕' : '☰'}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Mobil dropdown */}
        {!isDesktop && menuAcik && (
          <View style={s.mobileMenu}>
            {navLinks.map((item) => (
              <TouchableOpacity key={item.label} style={s.mobileItem} activeOpacity={0.7}
                onPress={() => { setMenuAcik(false); if (item.screen) navigation.navigate(item.screen); }}>
                <Text style={s.mobileItemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* ── İnce ayraç çizgi ── */}
        <View style={s.navDivider} />

        {/* ── Ana içerik: merkezi, x.fazlioglu.tr gibi ── */}
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

          {/* ── 3'lü test seçim kartları (x.fazlioglu.tr feature cards) ── */}
          <View style={s.testKartlar}>
            {TESTLER.map((t) => {
              const aktif = aktifTest === t.id;
              return (
                <TouchableOpacity
                  key={t.id}
                  style={[s.testKart, aktif && { backgroundColor: t.bg, borderColor: t.renk + '60' }]}
                  onPress={() => setAktifTest(t.id)}
                  activeOpacity={0.8}
                >
                  <View style={[s.testKartIcon, { backgroundColor: aktif ? t.renk + '20' : colors.surfaceLight }]}>
                    <Text style={[s.testKartIconText, { color: aktif ? t.renk : colors.textMuted }]}>{t.icon}</Text>
                  </View>
                  <Text style={[s.testKartLabel, aktif && { color: t.renk, fontWeight: '600' }]}>{t.label}</Text>
                  <Text style={s.testKartAlt}>{t.alt}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* ── Başlat butonu (büyük, pill, x.fazlioglu.tr stili) ── */}
          <View style={s.ctaWrap}>
            {(() => {
              const secili = TESTLER.find((t) => t.id === aktifTest);
              return (
                <TouchableOpacity
                  style={[s.ctaBtn, { backgroundColor: secili.renk }]}
                  onPress={() => navigation.navigate(secili.screen)}
                  activeOpacity={0.85}
                >
                  <Text style={s.ctaBtnText}>Testi Başlat  →</Text>
                </TouchableOpacity>
              );
            })()}
            <Text style={s.ctaAlt}>Ücretsiz · Kayıt gerektirmez · ~5 dakika</Text>
          </View>

          {/* ── Divider ── */}
          <View style={s.sectionDivider} />

          {/* ── Keşfet bölümü (x.fazlioglu.tr alt kartları) ── */}
          <Text style={s.sectionTitle}>Keşfet</Text>
          <View style={s.kesfetGrid}>

            <TouchableOpacity style={s.kesfetKart} activeOpacity={0.8}
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
            </TouchableOpacity>

            <TouchableOpacity style={s.kesfetKart} activeOpacity={0.8}
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
            </TouchableOpacity>

            <TouchableOpacity style={s.kesfetKart} activeOpacity={0.8}
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
            </TouchableOpacity>

          </View>

          {/* ── Footer notu ── */}
          <View style={s.footer}>
            <Text style={s.footerText}>
              Sonuçlar profesyonel psikolojik değerlendirmenin yerini tutmaz.
            </Text>
          </View>

        </Animated.ScrollView>
      </SafeAreaView>
    </View>
  );
}

const MAX = 680;

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  safe: { flex: 1 },

  // Navbar — x.fazlioglu.tr birebir
  navbar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: isDesktop ? 40 : 20,
    paddingVertical: 14,
    backgroundColor: colors.surface,
  },
  navLeft:       { flexDirection: 'row', alignItems: 'center', gap: 10 },
  navLogo: {
    width: 34, height: 34, borderRadius: 9,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  navLogoText:   { color: '#fff', fontSize: 16, fontWeight: '700', fontFamily: FONT },
  navBrand:      { fontSize: 15, fontWeight: '700', color: colors.textPrimary, fontFamily: FONT, lineHeight: 18 },
  navBrandSub:   { fontSize: 11, color: colors.textMuted, fontFamily: FONT, lineHeight: 14 },
  navLinks:      { flexDirection: 'row', alignItems: 'center', gap: 4 },
  navLinkBtn:    { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  navLink:       { fontSize: 14, color: colors.textSecondary, fontFamily: FONT, fontWeight: '500' },
  menuBtn:       { padding: 8 },
  menuBtnText:   { fontSize: 18, color: colors.textSecondary },
  navDivider:    { height: 1, backgroundColor: colors.border },

  // Mobil menü
  mobileMenu: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  mobileItem: {
    paddingVertical: 14, paddingHorizontal: 20,
    borderBottomWidth: 1, borderBottomColor: colors.borderLight,
  },
  mobileItemText: { fontSize: 15, color: colors.textPrimary, fontFamily: FONT, fontWeight: '500' },

  // Scroll
  scroll: {
    alignItems: 'center',
    paddingBottom: 60,
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

  // Test kartları — x.fazlioglu.tr feature card grid
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
    alignItems: 'center', justifyContent: 'center', marginBottom: 4,
  },
  testKartIconText: { fontSize: 20 },
  testKartLabel:    { fontSize: 13, fontWeight: '500', color: colors.textPrimary, fontFamily: FONT, textAlign: 'center' },
  testKartAlt:      { fontSize: 11, color: colors.textMuted, fontFamily: FONT, textAlign: 'center' },

  // CTA butonu
  ctaWrap: { alignItems: 'center', gap: 10, maxWidth: MAX, width: '100%', paddingHorizontal: 20, marginBottom: 12 },
  ctaBtn: {
    width: '100%', paddingVertical: 16, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4,
  },
  ctaBtnText: { fontSize: 16, fontWeight: '600', color: '#ffffff', fontFamily: FONT, letterSpacing: 0.2 },
  ctaAlt:     { fontSize: 12, color: colors.textMuted, fontFamily: FONT },

  // Divider
  sectionDivider: { height: 1, backgroundColor: colors.border, width: '100%', maxWidth: MAX, marginVertical: 28 },
  sectionTitle:   { fontSize: 15, fontWeight: '600', color: colors.textPrimary, fontFamily: FONT, alignSelf: 'flex-start', paddingHorizontal: 20, maxWidth: MAX, width: '100%', marginBottom: 12 },

  // Keşfet kartları — x.fazlioglu.tr alt kart listesi
  kesfetGrid: { maxWidth: MAX, width: '100%', paddingHorizontal: 20, gap: 10 },
  kesfetKart: {
    flexDirection: 'row', gap: 14,
    backgroundColor: colors.surface,
    borderRadius: 16, borderWidth: 1, borderColor: colors.border,
    padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
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

  // Footer
  footer: { marginTop: 32, paddingHorizontal: 24, maxWidth: MAX, width: '100%', alignItems: 'center' },
  footerText: { fontSize: 11, color: colors.textMuted, fontFamily: FONT, textAlign: 'center', lineHeight: 16 },
});
