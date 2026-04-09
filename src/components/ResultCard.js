// ResultCard.js
// Sonuç ekranında MBTI veya Enneagram sonucunu gösteren collapsible kart

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isTablet = width >= 768 && !isWeb;
const isDesktop = width >= 1024 && isWeb;

export default function ResultCard({
  baslik,           // 'MBTI' veya 'Enneagram'
  sonuc,            // 'INTJ' veya '5'
  aciklama,         // Uzun açıklama metni
  guvenSkor,        // Güven yüzdesi (0-100)
  renk,             // Kart rengi (mor veya turuncu)
  kanatAciklamasi,  // Enneagram kanadı açıklaması (opsiyonel)
}) {
  const [acik, setAcik] = useState(false);

  const guvenRengi = guvenSkor >= 80 ? colors.success : guvenSkor >= 60 ? colors.secondary : colors.error;

  const guvenMetni = guvenSkor >= 80 ? 'Yüksek Güven' : guvenSkor >= 60 ? 'Orta Güven' : 'Düşük Güven';

  return (
    <View style={[styles.kart, { borderColor: renk + '44' }]}>
      {/* Açılıp kapanır Header */}
      <TouchableOpacity
        style={[styles.baslik, { backgroundColor: renk + '15' }]}
        onPress={() => setAcik(!acik)}
        activeOpacity={0.7}
      >
        <View style={styles.baslikSol}>
          <Text style={styles.baslikLabel}>{baslik}</Text>
          <Text style={[styles.sonuc, { color: renk }]}>
            {sonuc}
          </Text>
        </View>
        <Text style={styles.toggleIcon}>
          {acik ? '▼' : '▶'}
        </Text>
      </TouchableOpacity>

      {/* Genişletilmiş İçerik */}
      {acik && (
        <View style={styles.icerik}>
          {/* Güven Skoru Bar */}
          <View style={styles.guvenBlok}>
            <View style={styles.guvenBaslik}>
              <Text style={styles.guvenLabel}>Güven Skoru</Text>
              <Text style={[styles.guvenMetni, { color: guvenRengi }]}>
                {guvenMetni}
              </Text>
            </View>
            <View style={styles.guvenBar}>
              <View
                style={[
                  styles.guvenDolu,
                  { width: `${guvenSkor}%`, backgroundColor: guvenRengi },
                ]}
              />
            </View>
            <Text style={styles.guvenYuzde}>{guvenSkor}%</Text>
          </View>

          {/* Ana Açıklama */}
          <Text style={styles.aciklama}>{aciklama}</Text>

          {/* Kanat Açıklaması (Enneagram için) */}
          {kanatAciklamasi && (
            <View style={[styles.kanatBlok, { borderLeftColor: renk }]}>
              <Text style={styles.kanatBaslik}>✦ Kanadının Etkisi</Text>
              <Text style={styles.kanatAciklama}>{kanatAciklamasi}</Text>
            </View>
          )}

          {/* Kopyala Butonu */}
          <TouchableOpacity
            style={[styles.kopyalaButonu, { borderColor: renk }]}
            onPress={() => {
              // Basit implementasyon - gerçekte Clipboard API'sini kullanabilirsin
              alert(`${baslik}: ${sonuc}\n\n${aciklama.substring(0, 100)}...`);
            }}
          >
            <Text style={[styles.kopyalaYazi, { color: renk }]}>
              📋 Sonucu Paylaş
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  kart: {
    marginBottom: isDesktop ? 20 : 16,
    borderRadius: isDesktop ? 16 : 14,
    overflow: 'hidden',
    borderWidth: 1,
    backgroundColor: colors.surface,
  },
  baslik: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: isDesktop ? 24 : 20,
  },
  baslikSol: {
    flex: 1,
  },
  baslikLabel: {
    fontSize: isDesktop ? 14 : 12,
    color: colors.textSecondary,
    marginBottom: isDesktop ? 8 : 6,
    fontWeight: '500',
  },
  sonuc: {
    fontSize: isDesktop ? 32 : 28,
    fontWeight: '700',
    letterSpacing: isDesktop ? 2 : 1,
  },
  toggleIcon: {
    fontSize: isDesktop ? 16 : 14,
    color: colors.textMuted,
    fontWeight: '600',
  },
  icerik: {
    paddingHorizontal: isDesktop ? 24 : 20,
    paddingBottom: isDesktop ? 24 : 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  guvenBlok: {
    marginBottom: isDesktop ? 24 : 20,
    paddingBottom: isDesktop ? 20 : 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  guvenBaslik: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: isDesktop ? 12 : 10,
  },
  guvenLabel: {
    fontSize: isDesktop ? 13 : 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  guvenMetni: {
    fontSize: isDesktop ? 13 : 12,
    fontWeight: '600',
  },
  guvenBar: {
    height: isDesktop ? 10 : 8,
    backgroundColor: colors.surfaceLight,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: isDesktop ? 10 : 8,
  },
  guvenDolu: {
    height: '100%',
    borderRadius: 4,
  },
  guvenYuzde: {
    fontSize: isDesktop ? 13 : 12,
    color: colors.textMuted,
    fontWeight: '500',
  },
  aciklama: {
    fontSize: isDesktop ? 15 : 14,
    color: colors.textPrimary,
    lineHeight: isDesktop ? 24 : 22,
    marginBottom: isDesktop ? 20 : 16,
  },
  kanatBlok: {
    backgroundColor: colors.surface,
    padding: isDesktop ? 16 : 14,
    borderRadius: isDesktop ? 12 : 10,
    marginBottom: isDesktop ? 20 : 16,
    borderLeftWidth: 3,
  },
  kanatBaslik: {
    fontSize: isDesktop ? 13 : 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: isDesktop ? 8 : 6,
  },
  kanatAciklama: {
    fontSize: isDesktop ? 14 : 13,
    color: colors.textPrimary,
    lineHeight: isDesktop ? 22 : 20,
  },
  kopyalaButonu: {
    paddingVertical: isDesktop ? 14 : 12,
    paddingHorizontal: isDesktop ? 16 : 14,
    backgroundColor: colors.surface,
    borderRadius: isDesktop ? 12 : 10,
    alignItems: 'center',
    borderWidth: 1,
  },
  kopyalaYazi: {
    fontSize: isDesktop ? 14 : 13,
    fontWeight: '600',
  },
});
