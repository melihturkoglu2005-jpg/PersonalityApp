import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { mbtiQuestions } from '../data/mbtiQuestions';
import { mbtiHesapla } from '../utils/mbtiCalculator';
import QuestionCard from '../components/QuestionCard';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isTablet  = width >= 768 && !isWeb;
const isDesktop = width >= 1024 && isWeb;

export default function MBTIScreen({ navigation, route }) {
  const [soruIndex, setSoruIndex] = useState(0);
  const [cevaplar,  setCevaplar]  = useState({});

  const mevcutSoru  = mbtiQuestions[soruIndex];
  const toplamSoru  = mbtiQuestions.length;
  const seciliDeger = cevaplar[mevcutSoru.id];
  const sonSoru     = soruIndex === toplamSoru - 1;

  function puanSec(puan) {
    setCevaplar((onceki) => ({ ...onceki, [mevcutSoru.id]: puan }));
    // Tüm sorularda (son dahil) 400ms sonra otomatik ilerle
    setTimeout(() => {
      if (sonSoru) {
        const mevcutParams = route.params || {};
        navigation.navigate('Result', { ...mevcutParams, mbtiCevaplari: { ...cevaplar, [mevcutSoru.id]: puan } });
      } else {
        setSoruIndex((i) => i + 1);
      }
    }, 400);
  }

  function geri() {
    if (soruIndex > 0) setSoruIndex((i) => i - 1);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.ustBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.geriButonAlani}>
          <Text style={styles.geriYazi}>← Geri</Text>
        </TouchableOpacity>
        <Text style={styles.baslik}>Bilişsel Fonksiyonlar</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Tek progress bar — üstte, QuestionCard'dakini kaldırdık */}
      <View style={styles.progressArka}>
        <View style={[styles.progressDolu, { width: `${((soruIndex + 1) / toplamSoru) * 100}%`, backgroundColor: colors.primary }]} />
      </View>

      <ScrollView contentContainerStyle={styles.icerik}>
        <Text style={styles.fonksiyonEtiketi}>
          {mevcutSoru.fonksiyon} — Bilişsel Fonksiyon
        </Text>
        {/* soruNo prop'unu toplamSoru ile gönderiyoruz ama QuestionCard'daki progress bar'ı gizleyeceğiz */}
        <QuestionCard
          soru={mevcutSoru.soru}
          soruNo={soruIndex + 1}
          toplamSoru={toplamSoru}
          seciliDeger={seciliDeger}
          onSecim={puanSec}
          renk={colors.primary}
          progressGizle={true}
        />
      </ScrollView>

      {/* Sadece Geri butonu — ileri butonu artık otomatik */}
      <View style={styles.altBar}>
        <TouchableOpacity
          style={[styles.buton, styles.geriButon, soruIndex === 0 && styles.butonPasif]}
          onPress={geri}
          disabled={soruIndex === 0}
        >
          <Text style={styles.geriButonYazi}>← Önceki</Text>
        </TouchableOpacity>
        <View style={styles.soruSayac}>
          <Text style={styles.soruSayacYazi}>{soruIndex + 1} / {toplamSoru}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:             { flex: 1, backgroundColor: colors.background },
  ustBar:           { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: isDesktop ? 48 : isTablet ? 32 : 24, paddingTop: isDesktop ? 24 : 16, paddingBottom: isDesktop ? 20 : 12 },
  geriButonAlani:   { width: 60 },
  geriYazi:         { color: colors.textSecondary, fontSize: isDesktop ? 17 : 15 },
  baslik:           { color: colors.textPrimary, fontSize: isDesktop ? 20 : 16, fontWeight: '600' },
  progressArka:     { height: isDesktop ? 4 : 3, backgroundColor: colors.border, marginHorizontal: isDesktop ? 48 : isTablet ? 32 : 24, borderRadius: 2, marginBottom: isDesktop ? 32 : 24 },
  progressDolu:     { height: isDesktop ? 4 : 3, borderRadius: 2 },
  icerik:           { paddingBottom: isDesktop ? 32 : 24, paddingHorizontal: isDesktop ? 48 : isTablet ? 32 : 0 },
  fonksiyonEtiketi: { color: colors.primary, fontSize: isDesktop ? 14 : 12, fontWeight: '600', letterSpacing: 1.5, marginHorizontal: isDesktop ? 0 : 24, marginBottom: isDesktop ? 16 : 12 },
  altBar:           { flexDirection: 'row', alignItems: 'center', padding: isDesktop ? 48 : 24, paddingBottom: isDesktop ? 48 : 32, maxWidth: isDesktop ? 800 : '100%', alignSelf: 'center', width: '100%' },
  buton:            { paddingVertical: isDesktop ? 20 : 16, paddingHorizontal: 24, borderRadius: isDesktop ? 16 : 14, alignItems: 'center' },
  geriButon:        { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  geriButonYazi:    { color: colors.textSecondary, fontSize: isDesktop ? 17 : 15, fontWeight: '500' },
  butonPasif:       { opacity: 0.4 },
  soruSayac:        { flex: 1, alignItems: 'flex-end' },
  soruSayacYazi:    { color: colors.textMuted, fontSize: 14 },
});