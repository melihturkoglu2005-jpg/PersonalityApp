// QuestionCard.js
// Hem MBTI hem Enneagram ekranında kullanılan soru kartı.
// Soruyu gösterir, 1-5 arası derecelendirme butonları sunar.

import React from 'react';
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

// derecelendirme etiketleri
const ETIKETLER = {
  1: 'Hiç değil',
  2: 'Biraz',
  3: 'Orta',
  4: 'Çok',
  5: 'Tam benim',
};

export default function QuestionCard({
  soru,         // soru metni
  soruNo,       // kaçıncı soru (örn: 3)
  toplamSoru,   // toplam soru sayısı (örn: 40)
  seciliDeger,  // şu an seçili puan (1-5 arası)
  onSecim,      // kullanıcı bir puana basınca çağrılır
  renk,         // kart vurgu rengi (MBTI için mor, Enneagram için turuncu)
}) {
  return (
    <View style={styles.kart}>

      {/* Soru numarası */}
      <Text style={[styles.soruNo, { color: renk }]}>
        {soruNo} / {toplamSoru}
      </Text>

      {/* Soru metni */}
      <Text style={styles.soruMetni}>{soru}</Text>

      {/* 1-5 arası puanlama butonları */}
      <View style={styles.butonlar}>
        {[1, 2, 3, 4, 5].map((puan) => {
          const secili = seciliDeger === puan;
          return (
            <TouchableOpacity
              key={puan}
              style={[
                styles.puanButon,
                secili && { backgroundColor: renk, borderColor: renk },
              ]}
              onPress={() => onSecim(puan)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.puanSayi,
                  secili && styles.puanSayiSecili,
                ]}
              >
                {puan}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Seçili değerin etiketi */}
      <Text style={styles.etiket}>
        {seciliDeger ? ETIKETLER[seciliDeger] : 'Bir seçenek işaretle'}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  kart: {
    backgroundColor: colors.surface,
    borderRadius: isDesktop ? 24 : 20,
    padding: isDesktop ? 32 : 24,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: isDesktop ? 0 : isTablet ? 32 : 24,
    maxWidth: isDesktop ? 800 : '100%',
    alignSelf: 'center',
    width: '100%',
  },
  soruNo: {
    fontSize: isDesktop ? 15 : isTablet ? 14 : 13,
    fontWeight: '600',
    marginBottom: isDesktop ? 18 : 14,
    letterSpacing: 1,
  },
  soruMetni: {
    fontSize: isDesktop ? 22 : isTablet ? 19 : 17,
    color: colors.textPrimary,
    lineHeight: isDesktop ? 32 : isTablet ? 28 : 26,
    marginBottom: isDesktop ? 36 : 28,
    fontWeight: '400',
  },
  butonlar: {
    flexDirection: isDesktop ? 'row' : 'row',
    justifyContent: 'space-between',
    marginBottom: isDesktop ? 16 : 12,
    gap: isDesktop ? 12 : 8,
  },
  puanButon: {
    width: isDesktop ? 64 : isTablet ? 56 : 48,
    height: isDesktop ? 64 : isTablet ? 56 : 48,
    borderRadius: isDesktop ? 32 : isTablet ? 28 : 24,
    borderWidth: isDesktop ? 2 : 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  puanSayi: {
    fontSize: isDesktop ? 20 : isTablet ? 18 : 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  puanSayiSecili: {
    color: '#fff',
    fontWeight: '700',
  },
  etiket: {
    textAlign: 'center',
    fontSize: isDesktop ? 15 : isTablet ? 14 : 13,
    color: colors.textMuted,
    marginTop: isDesktop ? 8 : 4,
  },
});