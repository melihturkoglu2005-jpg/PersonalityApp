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
  StatusBar,
} from 'react-native';
import { colors } from '../theme/colors';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      <View style={styles.container}>

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

          {/* MBTI Kartı */}
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

          {/* Enneagram Kartı */}
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

        </View>

        {/* Alt not */}
        <Text style={styles.footnote}>
          Her iki testi de tamamlayarak{'\n'}birleşik profilini gör
        </Text>

      </View>
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
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    paddingTop: 48,
  },
  emoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 22,
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardMBTI: {
    backgroundColor: colors.surface,
    borderColor: colors.primary + '55', // 55 = %33 opaklık
  },
  cardEnneagram: {
    backgroundColor: colors.surface,
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
  footnote: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },
});