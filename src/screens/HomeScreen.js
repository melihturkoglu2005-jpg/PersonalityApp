// HomeScreen.js
// Bu, uygulamayı açınca ilk gelen ekran.
// İki test için iki buton gösterir.

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import { colors } from '../theme/colors';

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isTablet = width >= 768 && !isWeb;
const isDesktop = width >= 1024 && isWeb;

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >

        {/* Üst başlık bölümü */}
        <View style={styles.header}>
          <Text style={styles.emoji}>🧠</Text>
          <Text style={styles.title}>Kişilik Haritası</Text>
          <Text style={styles.subtitle}>
            Kendini daha iyi tanı.{'\n'}
            İki farklı perspektiften.
          </Text>
        </View>

        {/* Test kartları */}
        <View style={styles.cardsContainer}>
          {isDesktop && (
            <View style={styles.cardsRow}>
              {/* MBTI Kartı - Desktop */}
              <TouchableOpacity
                style={[styles.card, styles.cardMBTI, styles.cardDesktop]}
                onPress={() => navigation.navigate('MBTI')}
                activeOpacity={0.8}
              >
                <Text style={styles.cardEmoji}>⚙️</Text>
                <Text style={styles.cardTitle}>Bilişsel Fonksiyonlar</Text>
                <Text style={styles.cardDesc}>
                  Ni · Ne · Si · Se{'\n'}Ti · Te · Fi · Fe
                </Text>
                <View style={styles.cardBadge}>
                  <Text style={styles.cardBadgeText}>MBTI / Sakinorva</Text>
                </View>
              </TouchableOpacity>

              {/* Enneagram Kartı - Desktop */}
              <TouchableOpacity
                style={[styles.card, styles.cardEnneagram, styles.cardDesktop]}
                onPress={() => navigation.navigate('Enneagram')}
                activeOpacity={0.8}
              >
                <Text style={styles.cardEmoji}>✦</Text>
                <Text style={styles.cardTitle}>Enneagram</Text>
                <Text style={styles.cardDesc}>
                  Tip 1'den Tip 9'a{'\n'}temel motivasyonların
                </Text>
                <View style={[styles.cardBadge, styles.cardBadgeOrange]}>
                  <Text style={styles.cardBadgeText}>9 Tip Modeli</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {!isDesktop && (
            <>
              {/* MBTI Kartı - Mobile/Tablet */}
              <TouchableOpacity
                style={[styles.card, styles.cardMBTI]}
                onPress={() => navigation.navigate('MBTI')}
                activeOpacity={0.8}
              >
                <Text style={styles.cardEmoji}>⚙️</Text>
                <Text style={styles.cardTitle}>Bilişsel Fonksiyonlar</Text>
                <Text style={styles.cardDesc}>
                  Ni · Ne · Si · Se{'\n'}Ti · Te · Fi · Fe
                </Text>
                <View style={styles.cardBadge}>
                  <Text style={styles.cardBadgeText}>MBTI / Sakinorva</Text>
                </View>
              </TouchableOpacity>

              {/* Enneagram Kartı - Mobile/Tablet */}
              <TouchableOpacity
                style={[styles.card, styles.cardEnneagram]}
                onPress={() => navigation.navigate('Enneagram')}
                activeOpacity={0.8}
              >
                <Text style={styles.cardEmoji}>✦</Text>
                <Text style={styles.cardTitle}>Enneagram</Text>
                <Text style={styles.cardDesc}>
                  Tip 1'den Tip 9'a{'\n'}temel motivasyonların
                </Text>
                <View style={[styles.cardBadge, styles.cardBadgeOrange]}>
                  <Text style={styles.cardBadgeText}>9 Tip Modeli</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* ---- FOOTER ---- */}
        <View style={styles.footer}>
          <View style={styles.footerDivider} />

          <Text style={styles.footerUyari}>
            ⚠️  Bu uygulama bilimsel bir tanı aracı değildir
          </Text>
          <Text style={styles.footerAciklama}>
            Kişilik Haritası; psikoloji ve tipologi literatürüne dayanan,
            akademik amaçlı bir kişisel gelişim projesidir. Sonuçlar
            profesyonel psikolojik değerlendirmenin yerini tutmaz.
          </Text>

          <Text style={styles.footerKaynakBaslik}>Akademik Kaynaklar</Text>

          <View style={styles.footerGrid}>
            {[
              { emoji: '📘', ad: 'Jung (1921)',          detay: 'Psychological Types' },
              { emoji: '📗', ad: 'Myers & Briggs (1980)',detay: 'Gifts Differing' },
              { emoji: '📙', ad: 'Harold Grant (1983)',  detay: 'Fonksiyon Yığını Modeli' },
              { emoji: '📕', ad: 'Riso & Hudson (1999)', detay: 'Wisdom of the Enneagram' },
              { emoji: '📓', ad: 'Naranjo (1994)',       detay: 'Character and Neurosis' },
              { emoji: '🔬', ad: 'Sakinorva',            detay: 'sakinorva.net' },
              { emoji: '📊', ad: 'Goldberg (1992)',      detay: 'IPIP Big-Five Markers' },
              { emoji: '🧪', ad: 'Jorgenson (2020)',     detay: 'Statistical "Which Character" Quiz' },
            ].map((k) => (
              <View key={k.ad} style={styles.footerKart}>
                <Text style={styles.footerKartEmoji}>{k.emoji}</Text>
                <Text style={styles.footerKartAd}>{k.ad}</Text>
                <Text style={styles.footerKartDetay}>{k.detay}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.footerCopyright}>
            © 2026 Kişilik Haritası · Akademik Proje
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// --- Stiller ---
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: isDesktop ? 48 : isTablet ? 32 : 24,
    paddingBottom: isDesktop ? 48 : 32,
    maxWidth: isDesktop ? 1200 : '100%',
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    paddingTop: isDesktop ? 64 : isTablet ? 56 : 48,
    marginBottom: isDesktop ? 48 : 24,
  },
  emoji: {
    fontSize: isDesktop ? 72 : isTablet ? 64 : 56,
    marginBottom: isDesktop ? 24 : 16,
  },
  title: {
    fontSize: isDesktop ? 48 : isTablet ? 40 : 32,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: 0.5,
    textAlign: 'center',
    lineHeight: isDesktop ? 60 : isTablet ? 50 : 40,
  },
  subtitle: {
    fontSize: isDesktop ? 20 : isTablet ? 18 : 15,
    color: colors.textSecondary,
    marginTop: isDesktop ? 16 : 10,
    textAlign: 'center',
    lineHeight: isDesktop ? 28 : isTablet ? 26 : 22,
  },
  cardsContainer: {
    gap: isDesktop ? 24 : 16,
    flex: 1,
    justifyContent: isDesktop ? 'center' : 'flex-start',
  },
  cardsRow: {
    flexDirection: 'row',
    gap: isDesktop ? 32 : 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: isDesktop ? 24 : 20,
    padding: isDesktop ? 32 : 24,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: isDesktop ? 200 : 'auto',
    maxWidth: isDesktop ? 400 : '100%',
    flex: isDesktop ? 1 : 'unset',
  },
  cardDesktop: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    transform: [{ scale: 1 }],
  cardMBTI: {
    backgroundColor: colors.surface,
    borderColor: colors.primary + '55', // 55 = %33 opaklık
  },
  cardEnneagram: {
    backgroundColor: colors.surface,
    borderColor: colors.secondary + '55',
  },
  cardBirlesik: {
    backgroundColor: colors.surface,
    borderColor: colors.accent + '55',
  },
  cardEmoji: {
    fontSize: isDesktop ? 40 : isTablet ? 32 : 28,
    marginBottom: isDesktop ? 16 : 10,
  },
  // ... (rest of the styles remain the same)
    fontSize: isDesktop ? 28 : isTablet ? 24 : 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: isDesktop ? 12 : 6,
  },
  cardDesc: {
    fontSize: isDesktop ? 18 : isTablet ? 16 : 14,
    color: colors.textSecondary,
    lineHeight: isDesktop ? 26 : isTablet ? 24 : 20,
    marginBottom: isDesktop ? 20 : 14,
  },
  cardBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary + '22',
    borderRadius: isDesktop ? 24 : 20,
    paddingHorizontal: isDesktop ? 16 : 12,
    paddingVertical: isDesktop ? 6 : 4,
  },
  cardBadgeOrange: {
    backgroundColor: colors.secondary + '22',
  },
  cardBadgeText: {
    fontSize: isDesktop ? 14 : 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  footnote: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: isDesktop ? 16 : 13,
    lineHeight: isDesktop ? 24 : 20,
    marginTop: isDesktop ? 32 : 0,
  },

  // --- Footer ---
  footer: {
    marginTop: isDesktop ? 64 : 40,
    paddingBottom: isDesktop ? 48 : 32,
  },
  footerDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: isDesktop ? 32 : 24,
  },
  footerUyari: {
    fontSize: isDesktop ? 15 : 13,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 10,
  },
  footerAciklama: {
    fontSize: isDesktop ? 14 : 12,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: isDesktop ? 22 : 18,
    marginBottom: isDesktop ? 36 : 28,
    paddingHorizontal: isDesktop ? 48 : 8,
  },
  footerKaynakBaslik: {
    fontSize: isDesktop ? 13 : 11,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 1.5,
    textAlign: 'center',
    marginBottom: isDesktop ? 20 : 16,
  },
  footerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: isDesktop ? 12 : 8,
    marginBottom: isDesktop ? 36 : 24,
  },
  footerKart: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: isDesktop ? 14 : 10,
    paddingHorizontal: isDesktop ? 18 : 12,
    alignItems: 'center',
    minWidth: isDesktop ? 160 : 100,
    maxWidth: isDesktop ? 200 : 140,
  },
  footerKartEmoji: {
    fontSize: isDesktop ? 22 : 16,
    marginBottom: 6,
  },
  footerKartAd: {
    fontSize: isDesktop ? 13 : 11,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 3,
  },
  footerKartDetay: {
    fontSize: isDesktop ? 11 : 10,
    color: colors.textMuted,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  footerCopyright: {
    fontSize: isDesktop ? 13 : 11,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
  },
});