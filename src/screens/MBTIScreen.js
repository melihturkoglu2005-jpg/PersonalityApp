// MBTIScreen.js
// Kullanıcının 40 MBTI sorusunu cevapladığı ekran.

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { colors } from '../theme/colors';
import { mbtiQuestions } from '../data/mbtiQuestions';
import QuestionCard from '../components/QuestionCard';

export default function MBTIScreen({ navigation, route }) {
  // Şu an gösterilen sorunun indexi (0'dan başlar)
  const [soruIndex, setSoruIndex] = useState(0);

  // Tüm cevaplar burada tutulur: { soruId: puan }
  const [cevaplar, setCevaplar] = useState({});

  const mevcutSoru = mbtiQuestions[soruIndex];
  const toplamSoru = mbtiQuestions.length;
  const seciliDeger = cevaplar[mevcutSoru.id];
  const sonSoru = soruIndex === toplamSoru - 1;

  // Kullanıcı bir puan seçince
  function puanSec(puan) {
    setCevaplar((onceki) => ({ ...onceki, [mevcutSoru.id]: puan }));
  }

  // İleri butonu
function ileri() {
  if (!seciliDeger) return;
  if (sonSoru) {
    // Varsa önceki Enneagram cevaplarını da gönder
    const mevcutParams = route.params || {};
    navigation.navigate('Result', {
      ...mevcutParams,
      mbtiCevaplari: cevaplar,
    });
  } else {
    setSoruIndex((i) => i + 1);
  }
}

  // Geri butonu
  function geri() {
    if (soruIndex > 0) setSoruIndex((i) => i - 1);
  }

  // İlerleme yüzdesi (progress bar için)
  const ilerleme = ((soruIndex + 1) / toplamSoru) * 100;

  return (
    <SafeAreaView style={styles.safe}>

      {/* Üst bar */}
      <View style={styles.ustBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.geriYazi}>← Geri</Text>
        </TouchableOpacity>
        <Text style={styles.baslik}>Bilişsel Fonksiyonlar</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* İlerleme çubuğu */}
      <View style={styles.progressArka}>
        <View style={[styles.progressDolu, { width: `${ilerleme}%`, backgroundColor: colors.primary }]} />
      </View>

      <ScrollView contentContainerStyle={styles.icerik}>

        {/* Hangi fonksiyon ölçülüyor etiketi */}
        <Text style={styles.fonksiyonEtiketi}>
          {mevcutSoru.fonksiyon} — Bilişsel Fonksiyon
        </Text>

        {/* Soru kartı */}
        <QuestionCard
          soru={mevcutSoru.soru}
          soruNo={soruIndex + 1}
          toplamSoru={toplamSoru}
          seciliDeger={seciliDeger}
          onSecim={puanSec}
          renk={colors.primary}
        />

      </ScrollView>

      {/* Alt navigasyon butonları */}
      <View style={styles.altBar}>
        <TouchableOpacity
          style={[styles.buton, styles.geriButon]}
          onPress={geri}
          disabled={soruIndex === 0}
        >
          <Text style={styles.geriButonYazi}>Önceki</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buton,
            styles.ileriButon,
            !seciliDeger && styles.butonPasif,
          ]}
          onPress={ileri}
          disabled={!seciliDeger}
        >
          <Text style={styles.ileriButonYazi}>
            {sonSoru ? 'Sonuçları Gör' : 'Sonraki'}
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  ustBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
  },
  geriYazi: {
    color: colors.textSecondary,
    fontSize: 15,
    width: 60,
  },
  baslik: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  progressArka: {
    height: 3,
    backgroundColor: colors.border,
    marginHorizontal: 24,
    borderRadius: 2,
    marginBottom: 24,
  },
  progressDolu: {
    height: 3,
    borderRadius: 2,
  },
  icerik: {
    paddingBottom: 24,
  },
  fonksiyonEtiketi: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginHorizontal: 24,
    marginBottom: 12,
  },
  altBar: {
    flexDirection: 'row',
    gap: 12,
    padding: 24,
    paddingBottom: 32,
  },
  buton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  geriButon: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  geriButonYazi: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: '500',
  },
  ileriButon: {
    backgroundColor: colors.primary,
  },
  butonPasif: {
    opacity: 0.4,
  },
  ileriButonYazi: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});