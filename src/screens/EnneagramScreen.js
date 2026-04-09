// EnneagramScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { colors } from '../theme/colors';
import { enneagramQuestions } from '../data/enneagramQuestions';
import { enneagramHesapla } from '../utils/enneagramCalculator';
import QuestionCard from '../components/QuestionCard';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isTablet  = width >= 768 && !isWeb;
const isDesktop = width >= 1024 && isWeb;

export default function EnneagramScreen({ navigation, route }) {
  const [soruIndex, setSoruIndex] = useState(0);
  const [cevaplar,  setCevaplar]  = useState({});

  const mevcutSoru  = enneagramQuestions[soruIndex];
  const toplamSoru  = enneagramQuestions.length;
  const seciliDeger = cevaplar[mevcutSoru.id];
  const sonSoru     = soruIndex === toplamSoru - 1;
  const ilerleme    = ((soruIndex + 1) / toplamSoru) * 100;

  function puanSec(puan) {
    setCevaplar((onceki) => ({ ...onceki, [mevcutSoru.id]: puan }));
    // Son soru değilse otomatik ilerle — son soruda butona bırak
    if (!sonSoru) {
      setTimeout(() => setSoruIndex((i) => i + 1), 300);
    }
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
      <View style={styles.ustBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.geriYazi}>← Geri</Text>
        </TouchableOpacity>
        <Text style={styles.baslik}>Enneagram</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* İyileştirilmiş Progress Bar - Sayı ve Yüzde ile */}
      <View style={styles.progressContainer}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressSayi}>{soruIndex + 1} / {toplamSoru}</Text>
          <Text style={styles.progressYuzde}>%{Math.round(ilerleme)}</Text>
        </View>
        <View style={styles.progressArka}>
          <View 
            style={[
              styles.progressDolu, 
              { 
                width: `${ilerleme}%`, 
                backgroundColor: ilerleme < 50 ? colors.secondary : colors.primary 
              }
            ]} 
          />
        </View>
        {ilerleme === 100 && (
          <View style={styles.tamamlandiIcon}>
            <Text style={styles.tamamlandiText}>✓</Text>
          </View>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.icerik}>
        <Text style={styles.tipEtiketi}>
          Tip {mevcutSoru.tip}
        </Text>
        <QuestionCard
          soru={mevcutSoru.soru}
          soruNo={soruIndex + 1}
          toplamSoru={toplamSoru}
          seciliDeger={seciliDeger}
          onSecim={puanSec}
          renk={colors.secondary}
        />
      </ScrollView>

      <View style={styles.altBar}>
        <TouchableOpacity
          style={[styles.buton, styles.geriButon, soruIndex === 0 && styles.butonPasif]}
          onPress={geri}
          disabled={soruIndex === 0}
        >
          <Text style={styles.geriButonYazi}>Önceki</Text>
        </TouchableOpacity>

        {sonSoru && (
          <TouchableOpacity
            style={[styles.buton, styles.ileriButon, !seciliDeger && styles.butonPasif]}
            onPress={ileri}
            disabled={!seciliDeger}
          >
            <Text style={styles.ileriButonYazi}>Sonuçları Gör</Text>
          </TouchableOpacity>
        )}

        {!sonSoru && soruIndex > 0 && seciliDeger && (
          <TouchableOpacity style={[styles.buton, styles.ileriButon]} onPress={ileri}>
            <Text style={styles.ileriButonYazi}>Sonraki</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:             { flex: 1, backgroundColor: colors.background },
  ustBar:           { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: isDesktop ? 48 : isTablet ? 32 : 24, paddingTop: isDesktop ? 24 : 16, paddingBottom: isDesktop ? 20 : 12 },
  geriYazi:         { color: colors.textSecondary, fontSize: isDesktop ? 17 : 15, width: 60 },
  baslik:           { color: colors.textPrimary, fontSize: isDesktop ? 20 : 16, fontWeight: '600' },
  progressContainer: { paddingHorizontal: isDesktop ? 48 : isTablet ? 32 : 24, paddingVertical: isDesktop ? 16 : 12, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border, marginBottom: isDesktop ? 24 : 16 },
  progressInfo:     { flexDirection: 'row', justifyContent: 'space-between', marginBottom: isDesktop ? 12 : 8 },
  progressSayi:     { fontSize: isDesktop ? 14 : 13, fontWeight: '600', color: colors.textSecondary },
  progressYuzde:    { fontSize: isDesktop ? 14 : 13, fontWeight: '600', color: colors.secondary },
  progressArka:     { height: isDesktop ? 8 : 6, backgroundColor: colors.border, borderRadius: 4, overflow: 'hidden' },
  progressDolu:     { height: isDesktop ? 8 : 6, borderRadius: 4 },
  tamamlandiIcon:   { marginTop: isDesktop ? 12 : 8, alignItems: 'center' },
  tamamlandiText:   { fontSize: isDesktop ? 24 : 20, color: colors.accent, fontWeight: '700' },
  icerik:           { paddingBottom: isDesktop ? 32 : 24, paddingHorizontal: isDesktop ? 48 : isTablet ? 32 : 0 },
  tipEtiketi:       { color: colors.secondary, fontSize: isDesktop ? 14 : 12, fontWeight: '600', letterSpacing: 1.5, marginHorizontal: isDesktop ? 0 : 24, marginBottom: isDesktop ? 16 : 12 },
  altBar:           { flexDirection: 'row', gap: isDesktop ? 16 : 12, padding: isDesktop ? 48 : 24, paddingBottom: isDesktop ? 48 : 32, maxWidth: isDesktop ? 800 : '100%', alignSelf: 'center', width: '100%' },
  buton:            { flex: 1, paddingVertical: isDesktop ? 20 : 16, borderRadius: isDesktop ? 16 : 14, alignItems: 'center' },
  geriButon:        { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  geriButonYazi:    { color: colors.textSecondary, fontSize: isDesktop ? 17 : 15, fontWeight: '500' },
  ileriButon:       { backgroundColor: colors.secondary },
  butonPasif:       { opacity: 0.4 },
  ileriButonYazi:   { color: '#fff', fontSize: isDesktop ? 17 : 15, fontWeight: '600' },
});