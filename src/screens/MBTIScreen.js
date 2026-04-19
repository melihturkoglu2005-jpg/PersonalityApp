import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Dimensions, Platform,
} from 'react-native';
import { useTestAutoAdvance } from '../hooks/useTestAutoAdvance';
import TestAutoAdvanceToggle from '../components/TestAutoAdvanceToggle';
import { colors, space, shadows, radius } from '../theme/colors';
import { mbtiQuestions } from '../data/mbtiQuestions';
import QuestionCard from '../components/QuestionCard';
import TopNav from '../components/TopNav';
import AppBackground from '../components/AppBackground';
import ScreenFadeIn from '../components/ScreenFadeIn';
import Footer from '../components/Footer';
import AdPlaceholder from '../components/AdPlaceholder';
import SEOMeta from '../components/SEOMeta';

const OTOMATIK_ILERLEME_MS = 320;
const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;
const FONT = Platform.select({ ios:'System', android:'sans-serif', web:"'Inter',system-ui,sans-serif" });

// Her N soruda bir reklam göster
const AD_HER_N_SORU = 8;

export default function MBTIScreen({ navigation, route }) {
  const [soruIndex,  setSoruIndex]  = useState(0);
  const [cevaplar,   setCevaplar]   = useState({});
  const { cevapIleIlerle, setCevapIleIlerle } = useTestAutoAdvance();
  const otomatikGeriSonrasi = useRef(false);
  const otomatikIlerlemeRef = useRef(null);

  useEffect(() => () => {
    if (otomatikIlerlemeRef.current) clearTimeout(otomatikIlerlemeRef.current);
  }, []);

  const mevcutSoru  = mbtiQuestions[soruIndex];
  const toplamSoru  = mbtiQuestions.length;
  const seciliDeger = cevaplar[mevcutSoru.id];
  const sonSoru     = soruIndex === toplamSoru - 1;
  const ilerleme    = ((soruIndex + 1) / toplamSoru) * 100;
  const showAd      = soruIndex > 0 && soruIndex % AD_HER_N_SORU === 0;

  function puanSec(puan) {
    const onceki = cevaplar[mevcutSoru.id];
    const yeni   = { ...cevaplar, [mevcutSoru.id]: puan };
    setCevaplar(yeni);
    if (!cevapIleIlerle) return;
    if (onceki === puan) { if (!otomatikGeriSonrasi.current) return; otomatikGeriSonrasi.current = false; }
    else { otomatikGeriSonrasi.current = false; }
    if (otomatikIlerlemeRef.current) clearTimeout(otomatikIlerlemeRef.current);
    const sonraki = () => {
      otomatikIlerlemeRef.current = null;
      if (sonSoru) navigation.navigate('Result', { ...(route.params||{}), mbtiCevaplari: yeni });
      else setSoruIndex(i => i + 1);
    };
    otomatikIlerlemeRef.current = setTimeout(sonraki, OTOMATIK_ILERLEME_MS);
  }

  function devamEt() {
    if (!seciliDeger) return;
    if (sonSoru) navigation.navigate('Result', { ...(route.params||{}), mbtiCevaplari: cevaplar });
    else setSoruIndex(i => i + 1);
  }

  const tamamlananSoru = Object.keys(cevaplar).length;
  const yuzde = Math.round((tamamlananSoru / toplamSoru) * 100);

  return (
    <SafeAreaView style={s.safe}>
      <SEOMeta
        title="MBTI Testi"
        description="Harold Grant modeliyle bilişsel fonksiyon yığınınızı keşfedin. 16 MBTI tipinden hangisine ait olduğunuzu öğrenin. Ücretsiz, kayıt gerektirmez."
        canonical="https://indoles.com/mbti"
      />
      <AppBackground />
      <ScreenFadeIn>
        <TopNav navigation={navigation} />

        {/* ── Üst bilgi şeridi ── */}
        <View style={s.headerBar}>
          <View style={s.headerLeft}>
            <Text style={s.testAdi}>MBTI Testi</Text>
            <View style={s.headerBadge}>
              <Text style={s.headerBadgeText}>Bilişsel Fonksiyonlar</Text>
            </View>
          </View>
          <View style={s.headerRight}>
            <Text style={s.soruSayac}>{soruIndex + 1} / {toplamSoru}</Text>
            <Text style={s.tamamText}>%{yuzde} tamamlandı</Text>
          </View>
        </View>

        {/* ── İlerleme çubuğu ── */}
        <View style={s.progressArka}>
          <View style={[s.progressDolu, { width: `${ilerleme}%` }]} />
        </View>

        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
          <View style={s.icerik}>

            {/* Reklam: Her 8 soruda bir */}
            {showAd && <AdPlaceholder variant="inline" style={s.inlineAd} />}

            <TestAutoAdvanceToggle
              value={cevapIleIlerle}
              onValueChange={setCevapIleIlerle}
              accentColor={colors.primary}
            />

            {/* Fonksiyon etiketi */}
            <View style={s.fonksiyonRow}>
              <View style={[s.fonksiyonDot, { backgroundColor: colors.primary }]} />
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
                style={[s.geriBtn, soruIndex === 0 && s.pasif]}
                onPress={() => {
                  if (soruIndex > 0) {
                    otomatikGeriSonrasi.current = true;
                    setSoruIndex(i => i - 1);
                  }
                }}
                disabled={soruIndex === 0}
                activeOpacity={0.7}
              >
                <Text style={s.geriBtnText}>← Önceki</Text>
              </TouchableOpacity>

              {!cevapIleIlerle && (
                <TouchableOpacity
                  style={[s.ileriBtn, !seciliDeger && s.pasif]}
                  onPress={devamEt}
                  disabled={!seciliDeger}
                  activeOpacity={0.8}
                >
                  <Text style={s.ileriBtnText}>{sonSoru ? 'Sonucu Gör →' : 'Sonraki →'}</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* SEO içerik: MBTI hakkında */}
            {soruIndex === 0 && (
              <View style={s.seoInfo}>
                <Text style={s.seoInfoTitle}>Bu test nasıl çalışır?</Text>
                <Text style={s.seoInfoText}>
                  Her soru, Jung'un sekiz bilişsel fonksiyonundan birini ölçmek üzere tasarlanmıştır.
                  Cevaplarınız Ne/Si, Ni/Se, Ti/Fe ve Fi/Te eksenlerinde değerlendirilerek
                  Harold Grant'ın fonksiyon yığını modeline göre tipiniz belirlenir.
                </Text>
              </View>
            )}

          </View>
        </ScrollView>
      </ScreenFadeIn>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex:1, backgroundColor: colors.background },

  // Header bar
  headerBar: {
    flexDirection:'row', alignItems:'center', justifyContent:'space-between',
    paddingHorizontal: space[5], paddingVertical: space[3],
    backgroundColor: colors.surface,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  headerLeft:      { flexDirection:'row', alignItems:'center', gap: space[2] },
  testAdi:         { fontSize: 16, fontWeight:'700', color: colors.textPrimary, fontFamily: FONT },
  headerBadge:     { backgroundColor: colors.primaryLight, borderRadius: radius.full, paddingHorizontal: space[3], paddingVertical: 3 },
  headerBadgeText: { fontSize: 11, fontWeight:'600', color: colors.primaryDark, fontFamily: FONT },
  headerRight:     { alignItems:'flex-end' },
  soruSayac:       { fontSize: 14, fontWeight:'700', color: colors.textPrimary, fontFamily: FONT },
  tamamText:       { fontSize: 11, color: colors.textMuted, fontFamily: FONT },

  // Progress
  progressArka: { height: 4, backgroundColor: colors.border },
  progressDolu: { height: 4, backgroundColor: colors.primary, borderRadius: 0 },

  scroll: { paddingBottom: space[10] },
  icerik: {
    paddingTop: space[6],
    maxWidth: isDesktop ? 720 : '100%',
    alignSelf:'center', width:'100%',
  },

  inlineAd: {
    marginHorizontal: isDesktop ? 0 : space[5],
    marginBottom: space[5],
  },

  fonksiyonRow:  { flexDirection:'row', alignItems:'center', gap: space[2], paddingHorizontal: isDesktop ? 0 : space[5], marginBottom: space[4] },
  fonksiyonDot:  { width: 8, height: 8, borderRadius: radius.full },
  fonksiyonText: { fontSize: 12, color: colors.primary, fontWeight:'600', fontFamily: FONT, letterSpacing: 0.5 },

  soruActions: {
    marginTop: space[4], paddingHorizontal: isDesktop ? 0 : space[5],
    flexDirection:'row', alignItems:'center', justifyContent:'space-between',
  },
  soruActionsOtomatik: { justifyContent:'flex-start' },
  geriBtn: {
    paddingHorizontal: space[5], paddingVertical: space[3],
    borderRadius: radius.lg, borderWidth: 1.5, borderColor: colors.border,
    backgroundColor: colors.surface, ...shadows.sm,
  },
  geriBtnText: { fontSize: 14, color: colors.textSecondary, fontFamily: FONT, fontWeight:'500' },
  ileriBtn: {
    paddingHorizontal: space[5], paddingVertical: space[3],
    borderRadius: radius.lg, backgroundColor: colors.primary,
    ...shadows.colored(colors.primary),
  },
  ileriBtnText: { fontSize: 14, color:'#fff', fontFamily: FONT, fontWeight:'600' },
  pasif: { opacity: 0.35 },

  seoInfo: {
    marginHorizontal: isDesktop ? 0 : space[5],
    marginTop: space[6],
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.xl, borderWidth:1, borderColor: colors.border,
    padding: space[5],
  },
  seoInfoTitle: { fontSize: 14, fontWeight:'700', color: colors.textPrimary, fontFamily: FONT, marginBottom: space[2] },
  seoInfoText:  { fontSize: 13, color: colors.textSecondary, fontFamily: FONT, lineHeight: 21 },
});
