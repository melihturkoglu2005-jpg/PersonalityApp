// HomeScreen.js
// Yeni tasarım: Tam ekran arka plan görseli, navbar, hero metni ve CTA butonu.

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform,
  Animated,
  ImageBackground,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';
const isTablet = width >= 768 && !isWeb;
const isDesktop = width >= 1024 && isWeb;

const BG_IMAGE = require('../../assets/hero-bg.png');

const FONT_DISPLAY = Platform.select({
  ios: 'Georgia',
  android: 'serif',
  web: "'Inter', system-ui, sans-serif",
});
const FONT_BODY = Platform.select({
  ios: 'System',
  android: 'sans-serif',
  web: "'Inter', system-ui, sans-serif",
});

export default function HomeScreen({ navigation }) {
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const btnScale  = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(btnScale, { toValue: 0.95, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(btnScale, { toValue: 1, friction: 4, useNativeDriver: true }).start();
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* ── Arka plan ── */}
      <ImageBackground source={BG_IMAGE} style={styles.bg} resizeMode="cover">

        <SafeAreaView style={styles.safeArea}>

          {/* ── Navbar ── */}
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

          {/* ── Hero İçerik ── */}
          <Animated.View
            style={[
              styles.heroContent,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Text style={styles.heroTitle}>Ücretsiz Kişilik Testi</Text>

            <Text style={styles.heroSubtitle}>
              Indoles; psikoloji ve tipoloji literatürüne dayanan, akademik amaçlı bir kişisel gelişim projesidir. Sonuçlar profesyonel psikolojik değerlendirmenin yerini tutmaz.
            </Text>

            {/* CTA Butonları */}
            <View style={styles.buttonContainer}>
              <Animated.View style={{ transform: [{ scale: btnScale }] }}>
                <TouchableOpacity
                  style={styles.ctaButton}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  onPress={() => navigation.navigate('MBTI')}
                  activeOpacity={1}
                >
                  <Text style={styles.ctaText}>MBTI Testi</Text>
                  <Text style={styles.ctaArrow}> ↗</Text>
                </TouchableOpacity>
              </Animated.View>
              
              <Animated.View style={{ transform: [{ scale: btnScale }] }}>
                <TouchableOpacity
                  style={[styles.ctaButton, styles.ctaButtonSecondary]}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
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

// ─── Stiller ────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#5f9ec7',
  },

  // ── Arka plan ──
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  bgBase: {
    backgroundColor: '#7cb9e0',
  },
  bgOverlayTop: {
    // Üst kısım daha açık/beyazımsı
    ...(isWeb
      ? { background: 'linear-gradient(180deg, rgba(210,232,248,0.75) 0%, rgba(130,185,220,0.3) 55%, transparent 100%)' }
      : { backgroundColor: 'rgba(210,232,248,0.55)' }),
  },
  bgOverlayBottom: {
    // Alt kısım biraz daha parlak/açık zemin
    ...(isWeb
      ? { background: 'linear-gradient(0deg, rgba(235,245,252,0.5) 0%, transparent 50%)' }
      : { backgroundColor: 'rgba(235,245,252,0.3)' }),
  },

  safeArea: {
    flex: 1,
  },

  // ── Navbar ──
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: isWeb ? 48 : 24,
    paddingTop: isWeb ? 20 : 8,
    paddingBottom: 12,
    position: 'relative',
  },
  navBrandText: {
    fontSize: isWeb ? 19 : 17,
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: FONT_DISPLAY,
    letterSpacing: 0.4,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  navLinks: {
    flexDirection: 'row',
  },
  navLinkBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  navLink: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    fontFamily: FONT_BODY,
    letterSpacing: 0.1,
  },

  // ── Hero ──
  heroContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: isWeb ? 'flex-start' : 'center',
    paddingTop: isWeb ? 80 : isMobile ? 60 : 40,
    paddingHorizontal: isWeb ? 48 : isMobile ? 24 : 28,
    paddingBottom: isWeb ? 200 : isMobile ? 100 : 80,
  },
  heroTitle: {
    fontSize: isWeb ? 72 : isMobile ? 32 : 38,
    fontWeight: '300',
    color: '#ffffff',
    fontFamily: FONT_DISPLAY,
    textAlign: 'center',
    letterSpacing: isWeb ? -1.0 : isMobile ? -0.2 : -0.3,
    lineHeight: isWeb ? 84 : isMobile ? 42 : 48,
    marginBottom: isWeb ? 28 : isMobile ? 16 : 20,
    textShadowColor: 'rgba(0,50,100,0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 16,
  },
  heroSubtitle: {
    fontSize: isWeb ? 16.5 : isMobile ? 14 : 15,
    color: 'rgba(255,255,255,0.85)',
    fontFamily: FONT_BODY,
    textAlign: 'center',
    lineHeight: isWeb ? 27 : isMobile ? 22 : 24,
    maxWidth: isWeb ? 500 : isMobile ? 280 : 310,
    marginBottom: isWeb ? 52 : isMobile ? 32 : 40,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  heroSubtitleBold: {
    fontWeight: '700',
    color: '#ffffff',
  },

  // ── CTA Butonu ──
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 100,
    paddingHorizontal: isWeb ? 52 : isMobile ? 32 : 40,
    paddingVertical: isWeb ? 22 : isMobile ? 14 : 17,
    shadowColor: 'rgba(0,50,100,0.25)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
  },
  ctaText: {
    fontSize: isWeb ? 18 : isMobile ? 14 : 16,
    fontWeight: '500',
    color: '#111111',
    fontFamily: FONT_BODY,
    letterSpacing: 0.3,
  },
  buttonContainer: {
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: isWeb ? 24 : isMobile ? 12 : 16,
  },
  ctaButtonSecondary: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
    shadowColor: 'rgba(255,255,255,0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    backdropFilter: 'blur(8px)',
  },
  ctaTextSecondary: {
    color: '#ffffff',
  },
  ctaArrowSecondary: {
    color: 'rgba(255,255,255,0.8)',
  },
  ctaArrow: {
    fontSize: isWeb ? 18 : 16,
    color: '#333333',
    fontWeight: '300',
    marginLeft: 2,
  },
});
