import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { mbtiQuestions } from '../data/mbtiQuestions';
import QuestionCard from '../components/QuestionCard';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;
const FONT = Platform.select({ ios: 'System', android: 'sans-serif', web: "'Inter', system-ui, sans-serif" });

export default function MBTIScreen({ navigation, route }) {
  const [soruIndex, setSoruIndex] = useState(0);
  const [cevaplar,  setCevaplar]  = useState({});

  const mevcutSoru  = mbtiQuestions[soruIndex];
  const toplamSoru  = mbtiQuestions.length;
  const seciliDeger = cevaplar[mevcutSoru.id];
  const sonSoru     = soruIndex === toplamSoru - 1;
  const ilerleme    = ((soruIndex + 1) / toplamSoru) * 100;

  function puanSec(puan) {
    setCevaplar((prev) => ({ ...prev, [mevcutSoru.id]: puan }));
    setTimeout(() => {
      if (sonSoru) {
        navigation.navigate('Result', { ...( route.params || {}), mbtiCevaplari: { ...cevaplar, [mevcutSoru.id]: puan } });
      } else {
        setSoruIndex((i) => i + 1);
      }
    }, 380);
  }

  return (
    <SafeAreaView style={s.safe}>
      {/* Navbar */}
      <View style={s.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.geriBtn} activeOpacity={0.7}>
          <Text style={s.geriText}>← Geri</Text>
        </TouchableOpacity>
        <Text style={s.navTitle}>MBTI Testi</Text>
        <Text style={s.soruSayac}>{soruIndex + 1}/{toplamSoru}</Text>
      </View>

      {/* Progress bar */}
      <View style={s.progressArka}>
        <View style={[s.progressDolu, { width: `${ilerleme}%` }]} />
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <View style={s.icerik}>
          {/* Fonksiyon etiketi */}
          <View style={s.fonksiyon}>
            <View style={s.fonksiyonDot} />
            <Text style={s.fonksiyonText}>{mevcutSoru.fonksiyon} · Bilişsel Fonksiyon</Text>
          </View>

          <QuestionCard
            soru={mevcutSoru.soru}
            soruNo={soruIndex + 1}
            toplamSoru={toplamSoru}
            seciliDeger={seciliDeger}
            onSecim={puanSec}
            renk={colors.primary}
            progressGizle
          />
        </View>
      </ScrollView>

      {/* Alt bar */}
      <View style={s.altBar}>
        <TouchableOpacity
          style={[s.geriButon, soruIndex === 0 && s.pasif]}
          onPress={() => soruIndex > 0 && setSoruIndex((i) => i - 1)}
          disabled={soruIndex === 0}
          activeOpacity={0.7}
        >
          <Text style={s.geriButonText}>← Önceki</Text>
        </TouchableOpacity>
        <Text style={s.altSayac}>{soruIndex + 1} / {toplamSoru}</Text>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  navbar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 14, backgroundColor: colors.surface,
  },
  geriBtn:    { width: 60 },
  geriText:   { fontSize: 14, color: colors.textSecondary, fontFamily: FONT, fontWeight: '500' },
  navTitle:   { fontSize: 16, fontWeight: '700', color: colors.textPrimary, fontFamily: FONT },
  soruSayac:  { fontSize: 13, color: colors.textMuted, fontFamily: FONT, width: 40, textAlign: 'right' },
  progressArka: { height: 3, backgroundColor: colors.border },
  progressDolu: { height: 3, backgroundColor: colors.primary },
  scroll:     { paddingBottom: 32 },
  icerik:     { paddingTop: 24, maxWidth: isDesktop ? 720 : '100%', alignSelf: 'center', width: '100%' },
  fonksiyon:  { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: isDesktop ? 0 : 20, marginBottom: 14 },
  fonksiyonDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  fonksiyonText:{ fontSize: 12, color: colors.primary, fontWeight: '600', fontFamily: FONT, letterSpacing: 0.5 },
  altBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 16,
    backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border,
  },
  geriButon: {
    paddingHorizontal: 20, paddingVertical: 11,
    borderRadius: 10, borderWidth: 1.5, borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  geriButonText: { fontSize: 14, color: colors.textSecondary, fontFamily: FONT, fontWeight: '500' },
  pasif:     { opacity: 0.35 },
  altSayac:  { fontSize: 13, color: colors.textMuted, fontFamily: FONT },
});
