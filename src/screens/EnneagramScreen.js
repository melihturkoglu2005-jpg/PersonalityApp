// EnneagramScreen.js
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
import { enneagramQuestions } from '../data/enneagramQuestions';
import QuestionCard from '../components/QuestionCard';

export default function EnneagramScreen({ navigation, route }) {
  // 1. State Tanımlamaları
  const [soruIndex, setSoruIndex] = useState(0);
  const [cevaplar, setCevaplar] = useState({});

  // 2. Yardımcı Değişkenler
  const mevcutSoru = enneagramQuestions[soruIndex];
  const toplamSoru = enneagramQuestions.length;
  const seciliDeger = cevaplar[mevcutSoru.id];
  const sonSoru = soruIndex === toplamSoru - 1;
  const ilerleme = ((soruIndex + 1) / toplamSoru) * 100;

  // 3. Fonksiyonlar
  function puanSec(puan) {
    setCevaplar((onceki) => ({ ...onceki, [mevcutSoru.id]: puan }));
  }

  function ileri() {
    if (!seciliDeger) return;

    if (sonSoru) {
      // MBTI ekranından gelen verileri (varsa) koruyarak Result ekranına aktarır
      const mevcutParams = route.params || {};
      navigation.navigate('Result', {
        ...mevcutParams,
        enneagramCevaplari: cevaplar,
      });
    } else {
      setSoruIndex((i) => i + 1);
    }
  }

  function geri() {
    if (soruIndex > 0) setSoruIndex((i) => i - 1);
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Üst bar */}
      <View style={styles.ustBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.geriYazi}>← Geri</Text>
        </TouchableOpacity>
        <Text style={styles.baslik}>Enneagram</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* İlerleme çubuğu */}
      <View style={styles.progressArka}>
        <View style={[styles.progressDolu, { width: `${ilerleme}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.icerik}>
        {/* Tip etiketi */}
        <Text style={styles.tipEtiketi}>
          Tip {mevcutSoru.tip}
        </Text>

        {/* Soru kartı */}
        <QuestionCard
          soru={mevcutSoru.soru}
          soruNo={soruIndex + 1}
          toplamSoru={toplamSoru}
          seciliDeger={seciliDeger}
          onSecim={puanSec}
          renk={colors.secondary}
        />
      </ScrollView>

      {/* Alt butonlar */}
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

// Stil tanımlamaları (Aynı kalabilir)
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  ustBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 16, paddingBottom: 12 },
  geriYazi: { color: colors.textSecondary, fontSize: 15, width: 60 },
  baslik: { color: colors.textPrimary, fontSize: 16, fontWeight: '600' },
  progressArka: { height: 3, backgroundColor: colors.border, marginHorizontal: 24, borderRadius: 2, marginBottom: 24 },
  progressDolu: { height: 3, borderRadius: 2, backgroundColor: colors.secondary },
  icerik: { paddingBottom: 24 },
  tipEtiketi: { color: colors.secondary, fontSize: 12, fontWeight: '600', letterSpacing: 1.5, marginHorizontal: 24, marginBottom: 12 },
  altBar: { flexDirection: 'row', gap: 12, padding: 24, paddingBottom: 32 },
  buton: { flex: 1, paddingVertical: 16, borderRadius: 14, alignItems: 'center' },
  geriButon: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  geriButonYazi: { color: colors.textSecondary, fontSize: 15, fontWeight: '500' },
  ileriButon: { backgroundColor: colors.secondary },
  butonPasif: { opacity: 0.4 },
  ileriButonYazi: { color: '#fff', fontSize: 15, fontWeight: '600' },
});