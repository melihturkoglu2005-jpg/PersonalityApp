// QuestionCard.js
// Hem MBTI hem Enneagram ekranında kullanılan soru kartı.
// Soruyu gösterir, 1-5 arası derecelendirme butonları sunar.

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors } from '../theme/colors';

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
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: 24,
  },
  soruNo: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 14,
    letterSpacing: 1,
  },
  soruMetni: {
    fontSize: 17,
    color: colors.textPrimary,
    lineHeight: 26,
    marginBottom: 28,
    fontWeight: '400',
  },
  butonlar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  puanButon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  puanSayi: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  puanSayiSecili: {
    color: '#fff',
    fontWeight: '700',
  },
  etiket: {
    textAlign: 'center',
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 4,
  },
});