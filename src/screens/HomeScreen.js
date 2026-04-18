import React, { useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, StatusBar, Dimensions, Platform, Animated, ImageBackground,
} from 'react-native';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';
const isDesktop = width >= 1024 && isWeb;

const BG_IMAGE = require('../../assets/hero-bg.png');

const FONT_DISPLAY = Platform.select({
  ios: 'Georgia', android: 'serif', web: "'Cormorant Garamond', Georgia, serif",
});
const FONT_BODY = Platform.select({
  ios: 'System', android: 'sans-serif', web: "'DM Sans', system-ui, sans-serif",
});

export default function HomeScreen({ navigation }) {
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const scaleMBTI = useRef(new Animated.Value(1)).current;
  const scaleEnn  = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Web'de Google Fonts yükle
    if (isWeb) {
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@400;500&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 1400, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 1000, delay: 300, useNativeDriver: true }),
    ]).start();
  }, []);

  const pressIn  = (scale) => Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  const pressOut = (scale) => Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }).start();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ImageBackground source={BG_IMAGE} style={styles.bg} resizeMode="cover">
        <SafeAreaView style={styles.safeArea}>

          {/* Navbar */}
          <View style={styles.navbar}>
            <Text style={styles.navBrandText}>Indoles</Text>
            {isWeb && (
              <View style={styles.navLinks}>
                {['Kişilik Tipleri', 'Hizmetler', 'Makaleler', 'Kaynaklar'].map((link) => (
                  <TouchableOpacity key={link} style={styles.navLinkBtn} activeOpacity={0.7}>
                    <Text style={styles.navLink}>{link}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Hero */}
          <Animated.View style={[styles.heroContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <Text style={styles.heroTitle}>Ücretsiz Kişilik Testi</Text>
            <Text style={styles.heroSubtitle}>
              Indoles; psikoloji ve tipoloji literatürüne dayanan, akademik amaçlı bir kişisel gelişim projesidir. Sonuçlar profesyonel psikolojik değerlendirmenin yerini tutmaz.
            </Text>

            <View style={styles.buttonContainer}>
              <Animated.View style={{ transform: [{ scale: scaleMBTI }] }}>
                <TouchableOpacity
                  style={styles.ctaButton}
                  onPressIn={() => pressIn(scaleMBTI)}
                  onPressOut={() => pressOut(scaleMBTI)}
                  onPress={() => navigation.navigate('MBTI')}
                  activeOpacity={1}
                >
                  <Text style={styles.ctaText}>MBTI Testi</Text>
                  <Text style={styles.ctaArrow}> ↗</Text>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View style={{ transform: [{ scale: scaleEnn }] }}>
                <TouchableOpacity
                  style={[styles.ctaButton, styles.ctaButtonSecondary]}
                  onPressIn={() => pressIn(scaleEnn)}
                  onPressOut={() => pressOut(scaleEnn)}
                  onPress={() => navigation.navigate('Enneagram')}
                  activeOpacity={1}
                >
                  <Text style={[styles.ctaText, styles.ctaTextSecondary]}>Enneagram Testi</Text>
                  <Text style={[styles.ctaArrow, styles.ctaArrowSecondary]}> ↗</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </Animated.View>

        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root:    { flex: 1, backgroundColor: '#5f9ec7' },
  bg:      { flex: 1, width: '100%', height: '100%' },
  safeArea:{ flex: 1 },

  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: isWeb ? 48 : 24,
    paddingTop: isWeb ? 20 : 8,
    paddingBottom: 12,
  },
  navBrandText: {
    fontSize: isWeb ? 20 : 18,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: FONT_DISPLAY,
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  navLinks:   { flexDirection: 'row' },
  navLinkBtn: { paddingHorizontal: 16, paddingVertical: 8 },
  navLink:    { fontSize: 15, color: 'rgba(255,255,255,0.9)', fontFamily: FONT_BODY, letterSpacing: 0.1 },

  heroContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: isWeb ? 'flex-start' : 'center',
    paddingTop: isWeb ? 100 : isMobile ? 60 : 40,
    paddingHorizontal: isWeb ? 48 : 24,
    paddingBottom: isWeb ? 200 : 100,
  },
  heroTitle: {
    fontSize: isWeb ? 76 : isMobile ? 34 : 40,
    fontWeight: '300',
    color: '#ffffff',
    fontFamily: FONT_DISPLAY,
    textAlign: 'center',
    letterSpacing: isWeb ? -1.5 : -0.3,
    lineHeight: isWeb ? 88 : 44,
    marginBottom: isWeb ? 28 : 16,
    textShadowColor: 'rgba(0,50,100,0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 16,
  },
  heroSubtitle: {
    fontSize: isWeb ? 16.5 : 14,
    color: 'rgba(255,255,255,0.85)',
    fontFamily: FONT_BODY,
    textAlign: 'center',
    lineHeight: isWeb ? 27 : 22,
    maxWidth: isWeb ? 500 : 280,
    marginBottom: isWeb ? 52 : 32,
  },
  buttonContainer: {
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center',
    gap: isWeb ? 24 : 12,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 100,
    paddingHorizontal: isWeb ? 52 : 32,
    paddingVertical: isWeb ? 22 : 14,
    shadowColor: 'rgba(0,50,100,0.25)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 12,
  },
  ctaText:  { fontSize: isWeb ? 18 : 15, fontWeight: '500', color: '#111111', fontFamily: FONT_BODY, letterSpacing: 0.3 },
  ctaArrow: { fontSize: isWeb ? 18 : 15, color: '#333333', fontWeight: '300', marginLeft: 2 },
  ctaButtonSecondary: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  ctaTextSecondary:  { color: '#ffffff' },
  ctaArrowSecondary: { color: 'rgba(255,255,255,0.8)' },
});