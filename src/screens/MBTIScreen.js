import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions, Platform } from 'react-native';
import { useTestAutoAdvance } from '../hooks/useTestAutoAdvance';
import TestAutoAdvanceToggle from '../components/TestAutoAdvanceToggle';
import { useTheme } from '../theme/ThemeContext';
import { lightColors as colors } from '../theme/colors'; // fallback for StyleSheet
import { mbtiQuestions } from '../data/mbtiQuestions';
import QuestionCard from '../components/QuestionCard';
import TopNav from '../components/TopNav';
import AppBackground from '../components/AppBackground';
import ScreenFadeIn from '../components/ScreenFadeIn';
import Footer from '../components/Footer';

const OTOMATIK_ILERLEME_MS = 320;

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;
const FONT = Platform.select({ ios: 'System', android: 'sans-serif', web: "'Nunito', 'Varela Round', system-ui, sans-serif" });

export default function MBTIScreen({ navigation, route }) {
  const { isDark, colors } = useTheme();
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

  const mevcutSoru  = mbtiQuestions[soruIndex];
  const toplamSoru  = mbtiQuestions.length;
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
        navigation.navigate('Result', { ...(route.params || {}), mbtiCevaplari: yeni });
      } else {
        setSoruIndex((i) => i + 1);
      }
    };
    otomatikIlerlemeRef.current = setTimeout(sonraki, OTOMATIK_ILERLEME_MS);
  }

  function devamEt() {
    if (!seciliDeger) return;
    if (sonSoru) {
      navigation.navigate('Result', { ...(route.params || {}), mbtiCevaplari: cevaplar });
    } else {
      setSoruIndex((i) => i + 1);
    }
  }

  return (
    <SafeAreaView style={[s.safe, { backgroundColor: colors.background }]}>
      <AppBackground />
      <ScreenFadeIn>
        <TopNav navigation={navigation} />
        <View style={s.headerMeta}>
          <Text style={s.navTitle}>MBTI Testi</Text>
          <Text style={s.soruSayac}>{soruIndex + 1}/{toplamSoru}</Text>
        </View>

        {/* Progress bar */}
        <View style={s.progressArka}>
          <View style={[s.progressDolu, { width: `${ilerleme}%` }]} />
        </View>

        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
          <View style={s.icerik}>
          <TestAutoAdvanceToggle
            value={cevapIleIlerle}
            onValueChange={setCevapIleIlerle}
            accentColor={colors.primary}
          />
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
            cevapIleIlerle={cevapIleIlerle}
          />

          <View style={[s.soruActions, cevapIleIlerle && s.soruActionsOtomatik]}>
            <TouchableOpacity
              style={[s.geriButon, soruIndex === 0 && s.pasif]}
              onPress={() => {
                if (soruIndex > 0) {
                  otomatikGeriSonrasi.current = true;
                  setSoruIndex((i) => i - 1);
                }
              }}
              disabled={soruIndex === 0}
              activeOpacity={0.7}
            >
              <Text style={s.geriButonText}>← Önceki</Text>
            </TouchableOpacity>
            {!cevapIleIlerle && (
              <TouchableOpacity
                style={[s.ileriButon, !seciliDeger && s.pasif]}
                onPress={devamEt}
                disabled={!seciliDeger}
                activeOpacity={0.8}
              >
                <Text style={s.ileriButonText}>{sonSoru ? 'Sonucu Gör →' : 'Sonraki →'}</Text>
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
  safe: { flex: 1, backgroundColor: colors.background },
  headerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.surface, borderBottomWidth: 2, borderBottomColor: colors.border,
  },
  navTitle:   { fontSize: 16, fontWeight: '900', color: colors.textPrimary, fontFamily: FONT },
  soruSayac:  { fontSize: 13, color: colors.textMuted, fontFamily: FONT, width: 40, textAlign: 'right' },
  progressArka: { height: 10, backgroundColor: colors.borderLight, borderRadius: 5, overflow: 'hidden' },
  progressDolu: { height: 10, backgroundColor: colors.primary, borderRadius: 5 },
  scroll:     { paddingBottom: 40 },
  icerik:     { paddingTop: 24, maxWidth: 720, alignSelf: 'center', width: '100%' },
  fonksiyon:  { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: isDesktop ? 0 : 20, marginBottom: 14 },
  fonksiyonDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  fonksiyonText:{ fontSize: 12, color: colors.primary, fontWeight: '600', fontFamily: FONT, letterSpacing: 0.5 },
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
    borderRadius: 14, borderWidth: 2, borderColor: colors.border, borderBottomWidth: 5,
    backgroundColor: colors.surface, borderBottomWidth: 2, borderBottomColor: colors.border,
  },
  geriButonText: { fontSize: 15, color: colors.textSecondary, fontFamily: FONT, fontWeight: '800' },
  ileriButon: {
    paddingHorizontal: 24, paddingVertical: 12,
    borderRadius: 14, backgroundColor: colors.secondary,
    borderWidth: 2, borderColor: colors.secondaryDark, borderBottomWidth: 5,
  },
  ileriButonText: { fontSize: 15, color: '#FFFFFF', fontFamily: FONT, fontWeight: '900' },
  pasif:     { opacity: 0.35 },
});
