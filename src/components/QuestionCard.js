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

// Görsel seçim arayüzü - yeilden mora geçen skalada daire boyutlari (5'li skala)
const SECENEKLER = {
  1: { metin: 'Kesinlikle Katilmiyorum', renk: '#8B5CF6', boyut: 1.0 },  // Mor - en büyük
  2: { metin: 'Katilmiyorum', renk: '#A78BFA', boyut: 0.8 },             // Mor
  3: { metin: 'Nötr', renk: '#9CA3AF', boyut: 0.6 },                    // Gri - en küçük
  4: { metin: 'Katiliyorum', renk: '#4ADE80', boyut: 0.8 },             // Yeþil
  5: { metin: 'Kesinlikle Katiliyorum', renk: '#22C55E', boyut: 1.0 },   // Yeþil - en büyük
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
        <Text style={styles.soruNo}>Soru {soruNo} / {toplamSoru}</Text>
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

      {/* Görsel daireli seçim arayüzü */}
      <View style={styles.gorselSecimAlani}>
        <View style={styles.yonEtiketleri}>
          <Text style={styles.yonuEtiketiSag}>Katilmiyorum</Text>
          <Text style={styles.yonuEtiketiSol}>Katiliyorum</Text>
        </View>
        
        <View style={styles.daireContainer}>
          {[1, 2, 3, 4, 5].map((puan) => {
            const secili = seciliDeger === puan;
            const secenek = SECENEKLER[puan];
            const temelBoyut = isDesktop ? 24 : isTablet ? 20 : 20; // Mobilde büyüttük
            const daireBoyutu = temelBoyut * secenek.boyut;
            
            return (
              <TouchableOpacity
                key={puan}
                style={[
                  styles.daireButon,
                  {
                    width: daireBoyutu,
                    height: daireBoyutu,
                    borderRadius: daireBoyutu / 2,
                    borderColor: secenek.renk,
                    borderWidth: secili ? 3 : 2,
                    backgroundColor: secili ? secenek.renk : 'transparent',
                    padding: 8, // Extra dokunma alani
                  }
                ]}
                onPress={() => onSecim(puan)}
                activeOpacity={0.7}
              />
            );
          })}
        </View>
        
        {/* Seçili degerin açiklamasi */}
        {seciliDeger && (
          <Text style={[styles.seciliAciklama, { color: SECENEKLER[seciliDeger].renk }]}>
            {SECENEKLER[seciliDeger].metin}
          </Text>
        )}
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
  gorselSecimAlani: {
    gap: isDesktop ? 24 : 20,
  },
  yonEtiketleri: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: isDesktop ? 16 : 8,
  },
  yonuEtiketiSol: {
    fontSize: isDesktop ? 16 : 14,
    color: '#22C55E', // Yeþil
    fontWeight: '600',
  },
  yonuEtiketiSag: {
    fontSize: isDesktop ? 16 : 14,
    color: '#8B5CF6', // Mor
    fontWeight: '600',
  },
  daireContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: isDesktop ? 16 : 4, // Mobilde azalttik
    paddingVertical: isDesktop ? 20 : 16,
  },
  daireButon: {
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  seciliAciklama: {
    fontSize: isDesktop ? 14 : 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: isDesktop ? 8 : 6,
  },
});