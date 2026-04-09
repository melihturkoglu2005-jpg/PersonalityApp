// QuestionCard.js
// Hem MBTI hem Enneagram ekranında kullanılan soru kartı.
// 16personalities.com tarzında modern seçim arayüzü.

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

// 16personalities tarzında seçenek etiketleri
const SECENEKLER = {
  1: { metin: 'Strongly Disagree', kisa: 'SD' },
  2: { metin: 'Disagree', kisa: 'D' },
  3: { metin: 'Neutral', kisa: 'N' },
  4: { metin: 'Agree', kisa: 'A' },
  5: { metin: 'Strongly Agree', kisa: 'SA' },
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

      {/* Soru numarası ve ilerleme */}
      <View style={styles.ustBilgi}>
        <Text style={styles.soruNo}>Question {soruNo} of {toplamSoru}</Text>
        <View style={styles.ilerlemeCubugu}>
          <View 
            style={[
              styles.ilerlemeDoluluk, 
              { width: `${(soruNo / toplamSoru) * 100}%`, backgroundColor: renk }
            ]} 
          />
        </View>
      </View>

      {/* Soru metni */}
      <Text style={styles.soruMetni}>{soru}</Text>

      {/* 16personalities tarzında seçim butonları */}
      <View style={styles.secimAlani}>
        <View style={styles.secimYonu}>
          <Text style={styles.yonuMetniSol}>Strongly Disagree</Text>
          <Text style={styles.yonuMetniSag}>Strongly Agree</Text>
        </View>
        
        <View style={styles.butonlar}>
          {[1, 2, 3, 4, 5].map((puan) => {
            const secili = seciliDeger === puan;
            const secenek = SECENEKLER[puan];
            return (
              <TouchableOpacity
                key={puan}
                style={[
                  styles.secimButonu,
                  secili && styles.secimButonuSecili,
                  secili && { borderColor: renk, backgroundColor: renk + '15' },
                ]}
                onPress={() => onSecim(puan)}
                activeOpacity={0.8}
              >
                <View style={styles.butonIcerik}>
                  <Text style={[
                    styles.butonHarf,
                    secili && { color: renk, fontWeight: '700' }
                  ]}>
                    {secenek.kisa}
                  </Text>
                  <Text style={[
                    styles.butonMetin,
                    secili && { color: renk, fontWeight: '600' }
                  ]}>
                    {secenek.metin}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  kart: {
    backgroundColor: colors.surface,
    borderRadius: isDesktop ? 16 : 12,
    padding: isDesktop ? 40 : 24,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: isDesktop ? 0 : isTablet ? 32 : 24,
    maxWidth: isDesktop ? 900 : '100%',
    alignSelf: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  ustBilgi: {
    marginBottom: isDesktop ? 32 : 20,
  },
  soruNo: {
    fontSize: isDesktop ? 14 : 12,
    color: colors.textSecondary,
    fontWeight: '500',
    marginBottom: isDesktop ? 12 : 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  ilerlemeCubugu: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  ilerlemeDoluluk: {
    height: '100%',
    borderRadius: 2,
    transition: 'width 0.3s ease',
  },
  soruMetni: {
    fontSize: isDesktop ? 20 : 16,
    color: colors.textPrimary,
    lineHeight: isDesktop ? 30 : 24,
    marginBottom: isDesktop ? 40 : 32,
    fontWeight: '400',
  },
  secimAlani: {
    gap: isDesktop ? 20 : 16,
  },
  secimYonu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: isDesktop ? 8 : 4,
  },
  yonuMetniSol: {
    fontSize: isDesktop ? 13 : 11,
    color: colors.textMuted,
    fontWeight: '500',
  },
  yonuMetniSag: {
    fontSize: isDesktop ? 13 : 11,
    color: colors.textMuted,
    fontWeight: '500',
  },
  butonlar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: isDesktop ? 8 : 4,
  },
  secimButonu: {
    flex: 1,
    paddingVertical: isDesktop ? 16 : 12,
    paddingHorizontal: isDesktop ? 8 : 4,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: isDesktop ? 12 : 8,
    backgroundColor: colors.surface,
    alignItems: 'center',
    minHeight: isDesktop ? 80 : 70,
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
  secimButonuSecili: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  butonIcerik: {
    alignItems: 'center',
    gap: isDesktop ? 6 : 4,
  },
  butonHarf: {
    fontSize: isDesktop ? 16 : 14,
    color: colors.textSecondary,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  butonMetin: {
    fontSize: isDesktop ? 11 : 9,
    color: colors.textMuted,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: isDesktop ? 14 : 12,
  },
});