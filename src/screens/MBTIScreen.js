import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions, Platform } from 'react-native';
import { useTestAutoAdvance } from '../hooks/useTestAutoAdvance';
import TestAutoAdvanceToggle from '../components/TestAutoAdvanceToggle';
import { colors, space, shadows, radius } from '../theme/colors';
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
const FONT = Platform.select({ ios: 'System', android: 'sans-serif', web: "'Inter', system-ui, sans-serif" });

export default function MBTIScreen({ navigation, route }) {
  const [soruIndex, setSoruIndex] = useState(0);
  const [cevaplar,  setCevaplar]  = useState({});
  const { cevapIleIlerle, setCevapIleIlerle } = useTestAutoAdvance();
  const otomatikGeriSonrasi = useRef(false);
  const otomatikIlerlemeRef = useRef(null);

  useEffect(() => () => {
    if (otomatikIlerlemeRef.current) { clearTimeout(otomatikIlerlemeRef.current); otomatikIlerlemeRef.current = null; }
  }, []);

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
    if (onceki === puan) { if (!otomatikGeriSonrasi.current) return; otomatikGeriSonrasi.current = false; }
    else { otomatikGeriSonrasi.current = false; }
    if (otomatikIlerlemeRef.current) clearTimeout(otomatikIlerlemeRef.current);
    const sonraki = () => {
      otomatikIlerlemeRef.current = null;
      if (sonSoru) navigation.navigate('Result', { ...(route.params || {}), mbtiCevaplari: yeni });
      else setSoruIndex(i => i + 1);
    };
    otomatikIlerlemeRef.current = setTimeout(sonraki, OTOMATIK_ILERLEME_MS);
  }

  function devamEt() {
    if (!seciliDeger) return;
    if (sonSoru) navigation.navigate('Result', { ...(route.params || {}), mbtiCevaplari: cevaplar });
    else setSoruIndex(i => i + 1);
  }

  return (
    <SafeAreaView style={s.safe}>
      <AppBackground />
      <ScreenFadeIn>
        <TopNav navigation={navigation} />

        <View style={s.headerMeta}>
          <View style={s.headerLeft}>
            <Text style={s.navTitle}>MBTI Testi</Text>
            <View style={s.headerBadge}>
              <Text style={s.headerBadgeText}>Bilişsel Fonksiyonlar</Text>
            </View>
          </View>
          <Text style={s.soruSayac}>{soruIndex + 1}/{toplamSoru}</Text>
        </View>

        <View style={s.progressArka}>
          <View style={[s.progressDolu, { width: `${ilerleme}%` }]} />
        </View>

        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
          <View style={s.icerik}>
            <TestAutoAdvanceToggle value={cevapIleIlerle} onValueChange={setCevapIleIlerle} accentColor={colors.primary} />

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
                onPress={() => { if (soruIndex > 0) { otomatikGeriSonrasi.current = true; setSoruIndex(i => i - 1); } }}
                disabled={soruIndex === 0}
                activeOpacity={0.7}
              >
                <Text style={s.geriButonText}>← Önceki</Text>
              </TouchableOpacity>
              {!cevapIleIlerle && (
                <TouchableOpacity style={[s.ileriButon, !seciliDeger && s.pasif]} onPress={devamEt} disabled={!seciliDeger} activeOpacity={0.8}>
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
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: space[5], paddingVertical: space[3],
    backgroundColor: colors.surface,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  headerLeft:      { flexDirection: 'row', alignItems: 'center', gap: space[3] },
  navTitle:        { fontSize: 16, fontWeight: '700', color: colors.textPrimary, fontFamily: FONT },
  headerBadge:     { backgroundColor: colors.primaryLight, borderRadius: radius.full, paddingHorizontal: space[3], paddingVertical: 3 },
  headerBadgeText: { fontSize: 11, fontWeight: '600', color: colors.primaryDark, fontFamily: FONT },
  soruSayac:       { fontSize: 13, color: colors.textMuted, fontFamily: FONT, width: 44, textAlign: 'right', fontWeight: '600' },

  progressArka: { height: 4, backgroundColor: colors.border },
  progressDolu: { height: 4, backgroundColor: colors.primary },

  scroll:  { paddingBottom: space[10] },
  icerik:  { paddingTop: space[6], maxWidth: isDesktop ? 720 : '100%', alignSelf: 'center', width: '100%' },

  fonksiyon:    { flexDirection: 'row', alignItems: 'center', gap: space[2], paddingHorizontal: isDesktop ? 0 : space[5], marginBottom: space[4] },
  fonksiyonDot: { width: 8, height: 8, borderRadius: radius.full, backgroundColor: colors.primary },
  fonksiyonText:{ fontSize: 12, color: colors.primary, fontWeight: '600', fontFamily: FONT, letterSpacing: 0.5 },

  soruActions: {
    marginTop: space[4], paddingHorizontal: isDesktop ? 0 : space[5],
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  soruActionsOtomatik: { justifyContent: 'flex-start' },
  geriButon: {
    paddingHorizontal: space[5], paddingVertical: space[3],
    borderRadius: radius.lg, borderWidth: 1.5, borderColor: colors.border,
    backgroundColor: colors.surface, ...shadows.sm,
  },
  geriButonText: { fontSize: 14, color: colors.textSecondary, fontFamily: FONT, fontWeight: '500' },
  ileriButon: {
    paddingHorizontal: space[5], paddingVertical: space[3],
    borderRadius: radius.lg, backgroundColor: colors.primary,
    ...shadows.colored(colors.primary),
  },
  ileriButonText: { fontSize: 14, color: '#fff', fontFamily: FONT, fontWeight: '600' },
  pasif: { opacity: 0.35 },
});
