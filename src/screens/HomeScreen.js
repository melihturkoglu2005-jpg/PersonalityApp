// HomeScreen.js
// Bu, uygulamayı açınca ilk gelen ekran.
// İki test için iki buton gösterir.

import React, { useState } from 'react';
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

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isTablet = width >= 768 && !isWeb;
const isDesktop = width >= 1024 && isWeb;

export default function HomeScreen({ navigation }) {
  const [footerAcik, setFooterAcik] = useState(false);

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
          {isDesktop ? (
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
          ) : (
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

          <TouchableOpacity
            style={styles.footerBaslik}
            onPress={() => setFooterAcik(!footerAcik)}
          >
            <Text style={styles.footerBaslikText}>
              📚 Akademik Kaynaklar
            </Text>
            <Text style={styles.footerBaslikIcon}>
              {footerAcik ? '▼' : '▶'}
            </Text>
          </TouchableOpacity>

          {footerAcik && (
            <View style={styles.footerIcerik}>
              <Text style={styles.footerUyari}>
                ⚠️ Bu uygulama bilimsel bir tanı aracı değildir
              </Text>
              <Text style={styles.footerAciklama}>
                Kişilik Haritası; psikoloji ve tipoloji literatürüne dayanan,
                akademik amaçlı bir kişisel gelişim projesidir.
              </Text>

              <View style={styles.footerGrid}>
                {[
                  { emoji: '📘', ad: 'Jung (1921)', detay: 'Psychological Types' },
                  { emoji: '📗', ad: 'Myers & Briggs (1980)', detay: 'Gifts Differing' },
                  { emoji: '📙', ad: 'Harold Grant (1983)', detay: 'Fonksiyon Yığını' },
                  { emoji: '📕', ad: 'Riso & Hudson (1999)', detay: 'Enneagram' },
                  { emoji: '🔬', ad: 'Sakinorva', detay: 'sakinorva.net' },
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
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: isDesktop ? 20 : isTablet ? 18 : 15,
    color: colors.textSecondary,
    marginTop: 10,
    textAlign: 'center',
  },
  cardsContainer: {
    gap: 16,
    flex: 1,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 32,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  cardDesktop: {
    flex: 1,
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  cardMBTI: {
    borderColor: colors.primary + '55',
  },
  cardEnneagram: {
    borderColor: colors.secondary + '55',
  },
  cardEmoji: {
    fontSize: 28,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 14,
  },
  cardBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary + '22',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  cardBadgeOrange: {
    backgroundColor: colors.secondary + '22',
  },
  cardBadgeText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  footer: {
    marginTop: 40,
    paddingBottom: 32,
  },
  footerDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 16,
  },
  footerBaslik: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  footerBaslikText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  footerBaslikIcon: {
    fontSize: 12,
    color: colors.textMuted,
  },
  footerIcerik: {
    marginTop: 16,
  },
  footerUyari: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
  },
  footerAciklama: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 20,
  },
  footerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  footerKart: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    width: width * 0.4,
  },
  footerKartEmoji: {
    fontSize: 16,
    marginBottom: 4,
  },
  footerKartAd: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  footerKartDetay: {
    fontSize: 10,
    color: colors.textMuted,
    textAlign: 'center',
  },
  footerCopyright: {
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 24,
  },
});