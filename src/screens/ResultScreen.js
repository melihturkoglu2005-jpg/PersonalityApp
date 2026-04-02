// ResultScreen.js — Gelişmiş sonuç ekranı
// mbtiCalculator ve enneagramCalculator'dan gelen zengin veriyi gösterir.

import React, { useMemo } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView,
} from 'react-native';
import { colors } from '../theme/colors';
import { mbtiHesapla, MBTI_ENNEAGRAM_KORELASYON } from '../utils/mbtiCalculator';
import { enneagramHesapla, hibritGuvenSkoru } from '../utils/enneagramCalculator';

const MBTI_ACIKLAMALAR = {
  INTJ: 'Stratejist — Bağımsız, kararlı ve uzun vadeli düşünen mükemmeliyetçi.',
  INTP: 'Mantıkçı — Meraklı, analitik ve yenilikçi bir düşünür.',
  ENTJ: 'Komutan — Güçlü liderlik içgüdüsüne sahip, kararlı ve stratejik.',
  ENTP: 'Tartışmacı — Zeki, meraklı ve alışılmışın dışında düşünen.',
  INFJ: 'Savunucu — Derin sezgilere sahip, idealist ve kararlı.',
  INFP: 'Arabulucu — Empatik, yaratıcı ve değerlerine bağlı.',
  ENFJ: 'Protagonist — İlham verici, empatik ve insanları bir araya getiren.',
  ENFP: 'Kampanyacı — Enerjik, yaratıcı ve özgürlüğü seven.',
  ISTJ: 'Lojistikçi — Güvenilir, sabırlı ve sorumluluğa önem veren.',
  ISFJ: 'Koruyucu — Sadık, sabırlı ve başkalarını gözeten.',
  ESTJ: 'Yönetici — Düzenli, kararlı ve geleneklere saygılı.',
  ESFJ: 'Konsül — Sıcakkanlı, sadık ve topluma önem veren.',
  ISTP: 'Virtüöz — Pratik, gözlemci ve bağımsız.',
  ISFP: 'Maceracı — Estetik duyarlılığı yüksek, sakin ve açık fikirli.',
  ESTP: 'Girişimci — Enerjik, pratik ve anı yaşayan.',
  ESFP: 'Eğlendirici — Spontane, enerjik ve hayat dolu.',
};

const ENNEAGRAM_ACIKLAMALAR = {
  1: 'Reformcu — Mükemmeliyetçi, ilkeli ve iyileştirme odaklı.',
  2: 'Yardımsever — Cömert, empatik ve ilişki odaklı.',
  3: 'Başarıcı — Hırslı, uyumlu ve başarı odaklı.',
  4: 'Bireyci — Özgün, duyarlı ve kendi ifadesini arayan.',
  5: 'Gözlemci — Analitik, bağımsız ve bilgi odaklı.',
  6: 'Sadık — Güvenilir, sorumlu ve güvenlik arayan.',
  7: 'Meraklı — Coşkulu, çok yönlü ve deneyim odaklı.',
  8: 'Meydan Okuyucu — Güçlü, kararlı ve koruyucu.',
  9: 'Barışçıl — Uyumlu, sakin ve uzlaşmayı seven.',
};

// Güven skoru rengi
function guvenRengi(skor) {
  if (skor >= 80) return colors.success;
  if (skor >= 60) return colors.secondary;
  return colors.error;
}

// Güven skoru etiketi
function guvenEtiketi(skor) {
  if (skor >= 80) return 'Yüksek güven';
  if (skor >= 60) return 'Orta güven';
  return 'Düşük güven — tekrar test önerilir';
}

export default function ResultScreen({ route, navigation }) {
  const { mbtiCevaplari, enneagramCevaplari } = route.params || {};

  const mbtiSonuc = useMemo(() =>
    mbtiCevaplari ? mbtiHesapla(mbtiCevaplari) : null,
  [mbtiCevaplari]);

  const enneagramSonuc = useMemo(() =>
    enneagramCevaplari ? enneagramHesapla(enneagramCevaplari) : null,
  [enneagramCevaplari]);

  const hibritSkor = useMemo(() =>
    mbtiSonuc && enneagramSonuc
      ? hibritGuvenSkoru(mbtiSonuc.tip, enneagramSonuc.tip)
      : null,
  [mbtiSonuc, enneagramSonuc]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.icerik}>
        <Text style={styles.baslik}>Sonuçların</Text>
        <Text style={styles.altBaslik}>Araştırma bazlı kişilik analizi</Text>

        {/* MBTI Sonuç Kartı */}
        {mbtiSonuc && (
          <View style={[styles.kart, { borderColor: colors.primary + '55' }]}>
            <Text style={[styles.etiket, { color: colors.primary }]}>BİLİŞSEL FONKSİYONLAR</Text>
            <Text style={styles.buyukTip}>{mbtiSonuc.tip}</Text>
            <Text style={styles.aciklama}>{MBTI_ACIKLAMALAR[mbtiSonuc.tip]}</Text>

            {/* Fonksiyon Yığını */}
            <Text style={styles.altBaslikKutu}>Harold Grant Fonksiyon Yığını</Text>
            <View style={styles.yiginSatir}>
              {mbtiSonuc.yigin.slice(0, 4).map((f, i) => {
                const etiketler = ['Dom', 'Aux', 'Ter', 'Inf'];
                return (
                  <View key={f} style={[styles.yiginKutu,
                    i === 0 && { backgroundColor: colors.primary + '33', borderColor: colors.primary }]}>
                    <Text style={[styles.yiginF, i === 0 && { color: colors.primary }]}>{f}</Text>
                    <Text style={styles.yiginE}>{etiketler[i]}</Text>
                  </View>
                );
              })}
            </View>

            {/* Alternatif tipler */}
            <Text style={styles.altBaslikKutu}>Yakın Alternatifler</Text>
            <View style={styles.alternatifSatir}>
              {mbtiSonuc.alternatifler.map((t) => (
                <View key={t} style={styles.alternatifKutu}>
                  <Text style={styles.alternatifYazi}>{t}</Text>
                </View>
              ))}
            </View>

            {/* Güven skoru */}
            <View style={styles.guvenSatir}>
              <Text style={styles.guvenYazi}>Algoritma güveni</Text>
              <View style={[styles.guvenBadge,
                { backgroundColor: guvenRengi(mbtiSonuc.guvenSkoru) + '22' }]}>
                <Text style={[styles.guvenBadgeYazi,
                  { color: guvenRengi(mbtiSonuc.guvenSkoru) }]}>
                  {guvenEtiketi(mbtiSonuc.guvenSkoru)} · %{mbtiSonuc.guvenSkoru}
                </Text>
              </View>
            </View>

            {/* Fonksiyon skor çubukları */}
            <Text style={styles.altBaslikKutu}>Fonksiyon Skorları</Text>
            {Object.entries(mbtiSonuc.aksAyarliSkorlar)
              .sort((a, b) => b[1] - a[1])
              .map(([f, skor]) => (
                <View key={f} style={styles.skorSatir}>
                  <Text style={styles.skorEtiket}>{f}</Text>
                  <View style={styles.barArka}>
                    <View style={[styles.barDolu, {
                      width: `${skor}%`,
                      backgroundColor: colors.primary,
                    }]} />
                  </View>
                  <Text style={styles.skorSayi}>{skor}</Text>
                </View>
              ))}
          </View>
        )}

        {/* Enneagram Sonuç Kartı */}
        {enneagramSonuc && (
          <View style={[styles.kart, { borderColor: colors.secondary + '55' }]}>
            <Text style={[styles.etiket, { color: colors.secondary }]}>ENNEAGRAM</Text>
            <Text style={styles.buyukTip}>{enneagramSonuc.kanatYazisi}</Text>
            <Text style={styles.aciklama}>{ENNEAGRAM_ACIKLAMALAR[enneagramSonuc.tip]}</Text>

            {/* Entegrasyon bilgisi */}
            <Text style={styles.altBaslikKutu}>Entegrasyon Yönleri</Text>
            <View style={styles.alternatifSatir}>
              <View style={[styles.alternatifKutu, { borderColor: colors.success + '66' }]}>
                <Text style={[styles.alternatifYazi, { color: colors.success }]}>
                  Güvenlik → {enneagramSonuc.entegrasyon.guvenlik}
                </Text>
              </View>
              <View style={[styles.alternatifKutu, { borderColor: colors.error + '66' }]}>
                <Text style={[styles.alternatifYazi, { color: colors.error }]}>
                  Stres → {enneagramSonuc.entegrasyon.stres}
                </Text>
              </View>
            </View>

            {/* Güven skoru */}
            <View style={styles.guvenSatir}>
              <Text style={styles.guvenYazi}>Algoritma güveni</Text>
              <View style={[styles.guvenBadge,
                { backgroundColor: guvenRengi(enneagramSonuc.guvenSkoru) + '22' }]}>
                <Text style={[styles.guvenBadgeYazi,
                  { color: guvenRengi(enneagramSonuc.guvenSkoru) }]}>
                  {guvenEtiketi(enneagramSonuc.guvenSkoru)} · %{enneagramSonuc.guvenSkoru}
                </Text>
              </View>
            </View>

            {/* Tip skor çubukları */}
            <Text style={styles.altBaslikKutu}>Tip Skorları</Text>
            {Object.entries(enneagramSonuc.kanatAyarliSkorlar)
              .sort((a, b) => b[1] - a[1])
              .map(([tip, skor]) => (
                <View key={tip} style={styles.skorSatir}>
                  <Text style={styles.skorEtiket}>Tip {tip}</Text>
                  <View style={styles.barArka}>
                    <View style={[styles.barDolu, {
                      width: `${skor}%`,
                      backgroundColor: colors.secondary,
                    }]} />
                  </View>
                  <Text style={styles.skorSayi}>{skor}</Text>
                </View>
              ))}
          </View>
        )}

        {/* Birleşik Profil Kartı */}
        {mbtiSonuc && enneagramSonuc && (
          <View style={[styles.kart, { borderColor: colors.accent + '55' }]}>
            <Text style={[styles.etiket, { color: colors.accent }]}>BİRLEŞİK PROFİL</Text>
            <Text style={styles.buyukTip}>
              {mbtiSonuc.tip} · {enneagramSonuc.kanatYazisi}
            </Text>
            <Text style={styles.aciklama}>
              {MBTI_ACIKLAMALAR[mbtiSonuc.tip]?.split('—')[0].trim()} ve{' '}
              {ENNEAGRAM_ACIKLAMALAR[enneagramSonuc.tip]?.split('—')[0].trim()}{' '}
              özelliklerini bir arada taşıyorsun.
            </Text>

            {/* Hibrit güven skoru */}
            <Text style={styles.altBaslikKutu}>İki Sistem Arası Korelasyon</Text>
            <View style={styles.guvenSatir}>
              <Text style={styles.guvenYazi}>Araştırma uyumu</Text>
              <View style={[styles.guvenBadge,
                { backgroundColor: guvenRengi(hibritSkor) + '22' }]}>
                <Text style={[styles.guvenBadgeYazi,
                  { color: guvenRengi(hibritSkor) }]}>
                  {guvenEtiketi(hibritSkor)} · %{hibritSkor}
                </Text>
              </View>
            </View>

            {/* Bu MBTI tipiyle en çok görülen Enneagram tipleri */}
            <Text style={styles.altBaslikKutu}>
              {mbtiSonuc.tip} için yaygın Enneagram tipleri
            </Text>
            <View style={styles.alternatifSatir}>
              {MBTI_ENNEAGRAM_KORELASYON[mbtiSonuc.tip]?.yuksek.map((t) => (
                <View key={t} style={[styles.alternatifKutu,
                  t === enneagramSonuc.tip && {
                    borderColor: colors.accent,
                    backgroundColor: colors.accent + '22',
                  }]}>
                  <Text style={[styles.alternatifYazi,
                    t === enneagramSonuc.tip && { color: colors.accent }]}>
                    Tip {t}
                    {t === enneagramSonuc.tip ? ' ✓' : ''}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Ana sayfaya dön */}
        <TouchableOpacity
          style={styles.donButon}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.donButonYazi}>Ana Sayfaya Dön</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:            { flex: 1, backgroundColor: colors.background },
  icerik:          { padding: 24, paddingBottom: 48 },
  baslik:          { fontSize: 32, fontWeight: '700', color: colors.textPrimary, marginTop: 16 },
  altBaslik:       { fontSize: 14, color: colors.textSecondary, marginTop: 6, marginBottom: 24 },
  kart:            { backgroundColor: colors.surface, borderRadius: 20, padding: 22, borderWidth: 1, marginBottom: 16 },
  etiket:          { fontSize: 11, fontWeight: '700', letterSpacing: 2, marginBottom: 8 },
  buyukTip:        { fontSize: 38, fontWeight: '700', color: colors.textPrimary, marginBottom: 6 },
  aciklama:        { fontSize: 14, color: colors.textSecondary, lineHeight: 22, marginBottom: 18 },
  altBaslikKutu:   { fontSize: 12, color: colors.textMuted, marginBottom: 10, marginTop: 6, fontWeight: '500' },
  yiginSatir:      { flexDirection: 'row', gap: 8, marginBottom: 16 },
  yiginKutu:       { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceLight },
  yiginF:          { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  yiginE:          { fontSize: 10, color: colors.textMuted, marginTop: 2 },
  alternatifSatir: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 14 },
  alternatifKutu:  { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: colors.border },
  alternatifYazi:  { fontSize: 13, color: colors.textSecondary, fontWeight: '500' },
  guvenSatir:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  guvenYazi:       { fontSize: 13, color: colors.textSecondary },
  guvenBadge:      { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  guvenBadgeYazi:  { fontSize: 12, fontWeight: '600' },
  skorSatir:       { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  skorEtiket:      { fontSize: 12, color: colors.textSecondary, width: 38, fontWeight: '500' },
  barArka:         { flex: 1, height: 6, backgroundColor: colors.border, borderRadius: 3 },
  barDolu:         { height: 6, borderRadius: 3 },
  skorSayi:        { fontSize: 12, color: colors.textMuted, width: 28, textAlign: 'right' },
  donButon:        { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
  donButonYazi:    { color: colors.textSecondary, fontSize: 15, fontWeight: '500' },
});