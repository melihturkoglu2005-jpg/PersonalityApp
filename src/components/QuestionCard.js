// QuestionCard.js
// Hem MBTI hem Enneagram ekranında kullanılan soru kartı.
// Soruyu gösterir, 1-5 arası renkli Likert ölçeği butonları sunar.

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isTablet = width >= 768 && !isWeb;
const isDesktop = width >= 1024 && isWeb;

// Likert ölçeği etiketleri
const ETIKETLER = {
  1: 'Kesinlikle Katılmıyorum',
  2: 'Katılmıyorum',
  3: 'Nötrüm',
  4: 'Katılıyorum',
  5: 'Kesinlikle Katılıyorum',
};

export default function QuestionCard({
  soru,         // soru metni
  soruNo,       // kaçıncı soru (örn: 3)
  toplamSoru,   // toplam soru sayısı (örn: 40)
  seciliDeger,  // şu an seçili puan (1-5 arası)
  onSecim,      // kullanıcı bir puana basınca çağrılır
  renk,         // kart vurgu rengi (MBTI için mor, Enneagram için turuncu)
}) {
  const [scaleAnims] = useState({
    1: new Animated.Value(1),
    2: new Animated.Value(1),
    3: new Animated.Value(1),
    4: new Animated.Value(1),
    5: new Animated.Value(1),
  });

  // Likert skala renkleri: 1=kırmızı (kesinlikle katılmıyorum) → 5=yeşil (kesinlikle katılıyorum)
  const getRenk = (puan) => {
    const renkler = {
      1: '#E05C5C', // Kırmızı - Kesinlikle Katılmıyorum
      2: '#F0A856', // Turuncu - Katılmıyorum
      3: '#D4D45C', // Sarı - Nötr
      4: '#7CAE3C', // Açık yeşil - Katılıyorum
      5: '#4CAF7D', // Koyu yeşil - Kesinlikle Katılıyorum
    };
    return renkler[puan];
  };

  const handlePress = (puan) => {
    // Seçim animasyonu
    Animated.sequence([
      Animated.timing(scaleAnims[puan], {
        toValue: 1.12,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims[puan], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    onSecim(puan);
  };

  return (
    <View style={styles.kart}>

      {/* Soru numarası */}
      <Text style={[styles.soruNo, { color: renk }]}>
        {soruNo} / {toplamSoru}
      </Text>

      {/* Soru metni */}
      <Text style={styles.soruMetni}>{soru}</Text>

      {/* Likert ölçeği seçenek butonları - RENKLI */}
      <View style={styles.butonlar}>
        {[1, 2, 3, 4, 5].map((puan) => {
          const secili = seciliDeger === puan;
          const butonRengi = getRenk(puan);

          return (
            <Animated.View
              key={puan}
              style={[
                styles.secenekWrapper,
                { transform: [{ scale: scaleAnims[puan] }] },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.puanButon,
                  {
                    backgroundColor: secili ? butonRengi : colors.surfaceLight,
                    borderColor: secili ? butonRengi : colors.border,
                    borderWidth: secili ? 2 : 1,
                  },
                ]}
                onPress={() => handlePress(puan)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.puanSayi,
                    {
                      color: secili ? '#FFFFFF' : colors.textSecondary,
                      fontWeight: secili ? '700' : '500',
                    },
                  ]}
                >
                  {puan}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>

      {/* Seçili değerin etiket açıklaması */}
      <Text style={styles.etiket}>
        {seciliDeger ? ETIKETLER[seciliDeger] : 'Bir seçenek işaretle'}
      </Text>

      {/* Ölçek yönü göstergesi */}
      <View style={styles.olcekYonu}>
        <Text style={styles.olcekYonuSol}>←</Text>
        <Text style={styles.olcekYonuMetni}>Katılmıyorum</Text>
        <Text style={styles.olcekYonuSag}>→ Katılıyorum</Text>
      </View>

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: isDesktop ? 20 : 16,
    gap: isDesktop ? 12 : 8,
  },
  secenekWrapper: {
    flex: 1,
  },
  puanButon: {
    height: isDesktop ? 72 : isTablet ? 64 : 56,
    borderRadius: isDesktop ? 16 : 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  puanSayi: {
    fontSize: isDesktop ? 20 : isTablet ? 18 : 16,
    fontWeight: '600',
  },
  etiket: {
    textAlign: 'center',
    fontSize: isDesktop ? 15 : isTablet ? 14 : 13,
    color: colors.textMuted,
    marginBottom: isDesktop ? 12 : 8,
    fontWeight: '500',
  },
  olcekYonu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: isDesktop ? 8 : 4,
  },
  olcekYonuSol: {
    fontSize: isDesktop ? 14 : 12,
    color: colors.textMuted,
  },
  olcekYonuMetni: {
    fontSize: isDesktop ? 12 : 11,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  olcekYonuSag: {
    fontSize: isDesktop ? 14 : 12,
    color: colors.textMuted,
  },
});