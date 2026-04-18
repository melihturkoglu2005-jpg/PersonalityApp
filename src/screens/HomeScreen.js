import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, StatusBar, Dimensions, Platform,
  Animated, ImageBackground,
} from 'react-native';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;

const BG_IMAGE = require('../../assets/hero-bg.png');

const FONT_DISPLAY = Platform.select({
  ios: 'Georgia', android: 'serif',
  web: "'Cormorant Garamond', Georgia, serif",
});
const FONT_BODY = Platform.select({
  ios: 'System', android: 'sans-serif',
  web: "'DM Sans', system-ui, sans-serif",
});

export default function HomeScreen({ navigation }) {
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleMBTI = useRef(new Animated.Value(1)).current;
  const scaleEnn  = useRef(new Animated.Value(1)).current;
  const [menuAcik, setMenuAcik] = useState(false);

  useEffect(() => {
    if (isWeb) {
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@400;500&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      let meta = document.querySelector('meta[name=viewport]');
      if (!meta) { meta = document.createElement('meta'); meta.name = 'viewport'; document.head.appendChild(meta); }
      meta.content = 'width=device-width, initial-scale=1, maximum-scale=1';
    }
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 1200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 900, delay: 200, useNativeDriver: true }),
    ]).start();
  }, []);

  const pressIn  = (s) => Animated.spring(s, { toValue: 0.96, useNativeDriver: true }).start();
  const pressOut = (s) => Animated.spring(s, { toValue: 1, friction: 5, useNativeDriver: true }).start();

  const navLinks = [
    { label: 'Kişilik Tipleri', screen: 'KisilikTipleri' },
    { label: 'Hizmetler',       screen: null },
    { label: 'Makaleler',       screen: null },
    { label: 'Kaynaklar',       screen: 'Kaynaklar' },
  ];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ImageBackground source={BG_IMAGE} style={styles.bg} resizeMode="cover">
        <View style={styles.overlay} />
        <SafeAreaView style={styles.safeArea}>

          {/* Navbar */}
          <View style={styles.navbar}>
            <Text style={styles.navBrand}>Indoles</Text>
            {isDesktop ? (
              <View style={styles.navLinks}>
                {navLinks.map((item) => (
                  <TouchableOpacity key={item.label} style={styles.navLinkBtn} activeOpacity={0.7}
                    onPress={() => item.screen && navigation.navigate(item.screen)}>
                    <Text style={styles.navLink}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <TouchableOpacity style={styles.hamburger} onPress={() => setMenuAcik(!menuAcik)} activeOpacity={0.7}>
                <View style={styles.hamburgerCizgi} />
                <View style={[styles.hamburgerCizgi, menuAcik && { opacity: 0 }]} />
                <View style={styles.hamburgerCizgi} />
              </TouchableOpacity>
            )}
          </View>

          {/* Mobil dropdown */}
          {!isDesktop && menuAcik && (
            <View style={styles.mobileMenu}>
              {navLinks.map((item) => (
                <TouchableOpacity key={item.label} style={styles.mobileMenuItem} activeOpacity={0.7}
                  onPress={() => { setMenuAcik(false); if (item.screen) navigation.navigate(item.screen); }}>
                  <Text style={styles.mobileMenuText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Hero */}
          <View style={styles.heroWrapper}>
            <Animated.View style={[styles.heroContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
              <Text style={styles.heroEtiket}>PSİKOLOJİ & TİPOLOJİ</Text>
              <Text style={styles.heroTitle}>{'Ücretsiz\nKişilik\nTesti'}</Text>
              <Text style={styles.heroSubtitle}>
                Psikoloji ve tipoloji literatürüne dayanan, akademik amaçlı bir kişisel gelişim projesi. Sonuçlar profesyonel psikolojik değerlendirmenin yerini tutmaz.
              </Text>

              <View style={styles.buttonRow}>
                <Animated.View style={{ transform: [{ scale: scaleMBTI }] }}>
                  <TouchableOpacity style={styles.ctaPrimary}
                    onPressIn={() => pressIn(scaleMBTI)} onPressOut={() => pressOut(scaleMBTI)}
                    onPress={() => navigation.navigate('MBTI')} activeOpacity={1}>
                    <Text style={styles.ctaPrimaryText}>MBTI Testi</Text>
                    <Text style={styles.ctaArrow}> ↗</Text>
                  </TouchableOpacity>
                </Animated.View>

                <Animated.View style={{ transform: [{ scale: scaleEnn }] }}>
                  <TouchableOpacity style={styles.ctaSecondary}
                    onPressIn={() => pressIn(scaleEnn)} onPressOut={() => pressOut(scaleEnn)}
                    onPress={() => navigation.navigate('Enneagram')} activeOpacity={1}>
                    <Text style={styles.ctaSecondaryText}>Enneagram</Text>
                    <Text style={styles.ctaArrowSecondary}> ↗</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>

              <View style={styles.infoRow}>
                {[['16', 'MBTI Tipi'], ['9', 'Enneagram Tipi'], ['100%', 'Ücretsiz']].map(([sayi, label], i, arr) => (
                  <React.Fragment key={label}>
                    <View style={styles.infoKart}>
                      <Text style={styles.infoSayi}>{sayi}</Text>
                      <Text style={styles.infoLabel}>{label}</Text>
                    </View>
                    {i < arr.length - 1 && <View style={styles.infoAyrac} />}
                  </React.Fragment>
                ))}
              </View>
            </Animated.View>
          </View>

        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root:    { flex: 1, backgroundColor: '#5B8BB0' },
  bg:      { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,30,60,0.2)' },
  safeArea:{ flex: 1 },

  navbar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: isDesktop ? 56 : 20,
    paddingTop: isDesktop ? 24 : 14,
    paddingBottom: 12,
    zIndex: 10,
  },
  navBrand: {
    fontSize: isDesktop ? 22 : 19, fontWeight: '600', color: '#fff',
    fontFamily: FONT_DISPLAY, letterSpacing: 2,
    textShadowColor: 'rgba(0,0,0,0.25)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 6,
  },
  navLinks:   { flexDirection: 'row' },
  navLinkBtn: { paddingHorizontal: 18, paddingVertical: 8 },
  navLink:    { fontSize: 15, color: 'rgba(255,255,255,0.92)', fontFamily: FONT_BODY, letterSpacing: 0.2 },

  hamburger:       { padding: 8, gap: 6, justifyContent: 'center' },
  hamburgerCizgi:  { width: 22, height: 2, backgroundColor: '#fff', borderRadius: 2 },

  mobileMenu: {
    position: 'absolute', top: 60, left: 0, right: 0,
    backgroundColor: 'rgba(8,22,48,0.95)',
    zIndex: 100, paddingVertical: 8,
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  mobileMenuItem: {
    paddingVertical: 15, paddingHorizontal: 24,
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  mobileMenuText: { color: 'rgba(255,255,255,0.9)', fontSize: 16, fontFamily: FONT_BODY, letterSpacing: 0.3 },

  heroWrapper: {
    flex: 1, justifyContent: 'center',
    paddingHorizontal: isDesktop ? 56 : 24,
    paddingBottom: isDesktop ? 60 : 40,
  },
  heroContent: { alignItems: isDesktop ? 'flex-start' : 'center', maxWidth: isDesktop ? 580 : '100%' },

  heroEtiket: {
    fontSize: isDesktop ? 12 : 10, color: 'rgba(255,255,255,0.65)',
    fontFamily: FONT_BODY, letterSpacing: 3, marginBottom: isDesktop ? 20 : 10, fontWeight: '500',
  },
  heroTitle: {
    fontSize: isDesktop ? 80 : 44, fontWeight: '300', color: '#fff',
    fontFamily: FONT_DISPLAY,
    textAlign: isDesktop ? 'left' : 'center',
    letterSpacing: isDesktop ? -2 : -0.5,
    lineHeight: isDesktop ? 90 : 52,
    marginBottom: isDesktop ? 28 : 16,
    textShadowColor: 'rgba(0,30,80,0.2)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 20,
  },
  heroSubtitle: {
    fontSize: isDesktop ? 16 : 13, color: 'rgba(255,255,255,0.8)',
    fontFamily: FONT_BODY,
    textAlign: isDesktop ? 'left' : 'center',
    lineHeight: isDesktop ? 26 : 20,
    maxWidth: isDesktop ? 440 : 290,
    marginBottom: isDesktop ? 44 : 28,
  },

  buttonRow: {
    flexDirection: 'row', gap: 12,
    marginBottom: isDesktop ? 48 : 24,
    alignSelf: isDesktop ? 'flex-start' : 'center',
    flexWrap: 'wrap', justifyContent: 'center',
  },
  ctaPrimary: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 100,
    paddingHorizontal: isDesktop ? 40 : 28,
    paddingVertical: isDesktop ? 18 : 15,
    shadowColor: 'rgba(0,30,80,0.4)',
    shadowOffset: { width: 0, height: 8 }, shadowOpacity: 1, shadowRadius: 24, elevation: 12,
  },
  ctaPrimaryText: { fontSize: isDesktop ? 17 : 15, fontWeight: '600', color: '#111827', fontFamily: FONT_BODY },
  ctaArrow:       { fontSize: isDesktop ? 16 : 14, color: '#374151' },
  ctaSecondary: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 100, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.4)',
    paddingHorizontal: isDesktop ? 40 : 28,
    paddingVertical: isDesktop ? 18 : 15,
  },
  ctaSecondaryText: { fontSize: isDesktop ? 17 : 15, fontWeight: '500', color: '#fff', fontFamily: FONT_BODY },
  ctaArrowSecondary:{ fontSize: isDesktop ? 16 : 14, color: 'rgba(255,255,255,0.75)' },

  infoRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.16)',
    paddingVertical: isDesktop ? 16 : 14,
    paddingHorizontal: isDesktop ? 28 : 16,
    alignSelf: isDesktop ? 'flex-start' : 'stretch',
  },
  infoKart:  { flex: 1, alignItems: 'center' },
  infoSayi:  { fontSize: isDesktop ? 24 : 20, fontWeight: '300', color: '#fff', fontFamily: FONT_DISPLAY, letterSpacing: -0.5 },
  infoLabel: { fontSize: 10, color: 'rgba(255,255,255,0.6)', fontFamily: FONT_BODY, marginTop: 2, textAlign: 'center' },
  infoAyrac: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.18)' },
});
