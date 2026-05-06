import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions, Platform } from 'react-native';
import { useTestAutoAdvance } from '../hooks/useTestAutoAdvance';
import TestAutoAdvanceToggle from '../components/TestAutoAdvanceToggle';
import { useTheme } from '../theme/ThemeContext';
import { FONT } from '../theme/constants';
import { enneagramQuestions } from '../data/enneagramQuestions';
import QuestionCard from '../components/QuestionCard';
import TopNav from '../components/TopNav';
import AppBackground from '../components/AppBackground';
import ScreenFadeIn from '../components/ScreenFadeIn';

const OTOMATIK_ILERLEME_MS = 320;

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;

export default function EnneagramScreen({ navigation, route }) {
  const { isDark, colors } = useTheme();
  const AKSAN = colors.violet;
  const [soruIndex, setSoruIndex] = useState(0);
  const [cevaplar,  setCevaplar]  = useState({});
  const { cevapIleIlerle, setCevapIleIlerle } = useTestAutoAdvance();
  const otomatikGeriSonrasi = useRef(false);
  const otomatikIlerlemeRef = useRef(null);

  useEffect(
    () => () => {
      if (otomatikIlerlemeRef.current) {
        clearTimeout(otomatikIlerlemeRef.current);
        otomatikIlerlemeRef.current = null;
      }
    },
    []
  );

  const mevcutSoru  = enneagramQuestions[soruIndex];
  const toplamSoru  = enneagramQuestions.length;
  const seciliDeger = cevaplar[mevcutSoru.id];
  const sonSoru     = soruIndex === toplamSoru - 1;
  const ilerleme    = ((soruIndex + 1) / toplamSoru) * 100;

  function puanSec(puan) {
    const onceki = cevaplar[mevcutSoru.id];
    const yeni = { ...cevaplar, [mevcutSoru.id]: puan };
    setCevaplar(yeni);
    if (!cevapIleIlerle) return;
    if (onceki === puan) {
      if (!otomatikGeriSonrasi.current) return;
      otomatikGeriSonrasi.current = false;
    } else {
      otomatikGeriSonrasi.current = false;
    }
    if (otomatikIlerlemeRef.current) {
      clearTimeout(otomatikIlerlemeRef.current);
    }
    const sonraki = () => {
      otomatikIlerlemeRef.current = null;
      if (sonSoru) {
        navigation.navigate('Result', { ...(route.params || {}), enneagramCevaplari: yeni });
      } else {
        setSoruIndex((i) => i + 1);
      }
    };
    otomatikIlerlemeRef.current = setTimeout(sonraki, OTOMATIK_ILERLEME_MS);
  }

  function devamEt() {
    if (!seciliDeger) return;
    if (sonSoru) {
      navigation.navigate('Result', { ...(route.params || {}), enneagramCevaplari: cevaplar });
    } else {
      setSoruIndex((i) => i + 1);
    }
  }

  return (
    <SafeAreaView style={[s.safe, { backgroundColor: colors.background }]}>
      <AppBackground />
      <ScreenFadeIn>
        <TopNav navigation={navigation} />

        {/* Header bar — fully dynamic */}
        <View style={[s.headerMeta, {
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
        }]}>
          <Text style={[s.navTitle, { color: colors.textPrimary }]}>Enneagram</Text>
          <Text style={[s.soruSayac, { color: colors.textMuted }]}>{soruIndex + 1}/{toplamSoru}</Text>
        </View>

        {/* Progress bar — fully dynamic */}
        <View style={[s.progressArka, { backgroundColor: colors.borderLight }]}>
          <View style={[s.progressDolu, { width: `${ilerleme}%`, backgroundColor: AKSAN }]} />
        </View>

        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
          <View style={s.icerik}>
          <TestAutoAdvanceToggle
            value={cevapIleIlerle}
            onValueChange={setCevapIleIlerle}
            accentColor={AKSAN}
          />
          <View style={s.fonksiyon}>
            <View style={[s.fonksiyonDot, { backgroundColor: AKSAN }]} />
            <Text style={[s.fonksiyonText, { color: AKSAN }]}>Tip {mevcutSoru.tip}</Text>
          </View>

          <QuestionCard
            soru={mevcutSoru.soru}
            soruNo={soruIndex + 1}
            toplamSoru={toplamSoru}
            seciliDeger={seciliDeger}
            onSecim={puanSec}
            renk={AKSAN}
            progressGizle
            cevapIleIlerle={cevapIleIlerle}
          />

          <View style={[s.soruActions, cevapIleIlerle && s.soruActionsOtomatik]}>
            <TouchableOpacity
              style={[s.geriButon, {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              }, soruIndex === 0 && s.pasif]}
              onPress={() => {
                if (soruIndex > 0) {
                  otomatikGeriSonrasi.current = true;
                  setSoruIndex((i) => i - 1);
                }
              }}
              disabled={soruIndex === 0}
              activeOpacity={0.7}
            >
              <Text style={[s.geriButonText, { color: colors.textSecondary }]}>← Önceki</Text>
            </TouchableOpacity>
            {!cevapIleIlerle && (
              <TouchableOpacity
                style={[s.ileriButon, {
                  backgroundColor: AKSAN,
                  borderColor: colors.violetDark,
                }, !seciliDeger && s.pasif]}
                onPress={devamEt}
                disabled={!seciliDeger}
                activeOpacity={0.85}
              >
                <Text style={s.ileriButonText}>{sonSoru ? 'Sonuçları Gör →' : 'Sonraki →'}</Text>
              </TouchableOpacity>
            )}
          </View>
          </View>
        </ScrollView>
      </ScreenFadeIn>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:         { flex: 1 },
  headerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 2,
  },
  navTitle:     { fontSize: 16, fontWeight: '700', fontFamily: FONT },
  soruSayac:    { fontSize: 13, fontFamily: FONT, width: 40, textAlign: 'right' },
  progressArka: { height: 10, overflow: 'hidden' },
  progressDolu: { height: 10 },
  scroll:       { paddingBottom: 40 },
  icerik:       { paddingTop: 24, maxWidth: 720, alignSelf: 'center', width: '100%' },
  fonksiyon:    { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: isDesktop ? 0 : 20, marginBottom: 14 },
  fonksiyonDot: { width: 8, height: 8, borderRadius: 4 },
  fonksiyonText:{ fontSize: 12, fontWeight: '600', fontFamily: FONT, letterSpacing: 0.5 },
  soruActions: {
    marginTop: 14,
    paddingHorizontal: isDesktop ? 0 : 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  soruActionsOtomatik: { justifyContent: 'flex-start' },
  geriButon: {
    paddingHorizontal: 20, paddingVertical: 12,
    borderRadius: 14, borderWidth: 2,
  },
  geriButonText: { fontSize: 15, fontFamily: FONT, fontWeight: '800' },
  ileriButon: {
    paddingHorizontal: 24, paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 2, borderBottomWidth: 5,
  },
  ileriButonText: { fontSize: 15, color: '#FFFFFF', fontFamily: FONT, fontWeight: '900' },
  pasif:     { opacity: 0.35 },
});
