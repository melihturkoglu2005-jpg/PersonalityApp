import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Dimensions, Platform,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { FONT } from '../theme/constants';
import TopNav from '../components/TopNav';
import AppBackground from '../components/AppBackground';
import ScreenFadeIn from '../components/ScreenFadeIn';
import Footer from '../components/Footer';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;
const MAX  = 720;

// ─── Statik veri — renkler useTheme içinde hesaplanıyor ───────────────────
const MBTI_RAW = [
  { tip: 'INTJ', isim: 'Mimar',       emoji: '🏛️', grup: 'Analistler',  tema: 'green',  ozellikler: ['Analitik', 'Bağımsız', 'Stratejik'],  aciklama: 'Bağımsız, kararlı, uzun vadeli stratejik düşüncesiyle vizyoner liderler.' },
  { tip: 'INTP', isim: 'Mantıkçı',    emoji: '🔬', grup: 'Analistler',  tema: 'green',  ozellikler: ['Meraklı', 'Yaratıcı', 'Nesnel'],       aciklama: 'Teorik ve soyut düşüncede mükemmel, yenilikçi düşünürler.' },
  { tip: 'ENTJ', isim: 'Komutan',     emoji: '⚡', grup: 'Analistler',  tema: 'green',  ozellikler: ['Lider', 'Kararlı', 'Stratejik'],        aciklama: 'Güçlü irade ve kararlılıkla hedeflerine ulaşan doğal liderler.' },
  { tip: 'ENTP', isim: 'Tartışmacı',  emoji: '💡', grup: 'Analistler',  tema: 'green',  ozellikler: ['Yenilikçi', 'Kurnaz', 'Karizmatik'],    aciklama: 'Alışılmışın dışında düşünen, yenilikçi tartışmacılar.' },
  { tip: 'INFJ', isim: 'Savunucu',    emoji: '🌿', grup: 'Diplomatlar', tema: 'yellow', ozellikler: ['Sezgisel', 'İdealist', 'Tutkulu'],       aciklama: 'Derin sezgiye sahip idealistler. İlham verme konusunda uzmandırlar.' },
  { tip: 'INFP', isim: 'Arabulucu',   emoji: '🎨', grup: 'Diplomatlar', tema: 'yellow', ozellikler: ['Empatik', 'Yaratıcı', 'Özgün'],          aciklama: 'Empatik ve yaratıcı, değerlerine derin bağlılıkla yaşayan idealistler.' },
  { tip: 'ENFJ', isim: 'Kahraman',    emoji: '🌟', grup: 'Diplomatlar', tema: 'yellow', ozellikler: ['Karizmatik', 'Empatik', 'Güvenilir'],    aciklama: 'Karizmatik ve ilham verici, insanları bir araya getiren liderler.' },
  { tip: 'ENFP', isim: 'Kampanyacı',  emoji: '🎭', grup: 'Diplomatlar', tema: 'yellow', ozellikler: ['Coşkulu', 'Yaratıcı', 'İyimser'],        aciklama: 'Enerjik, özgür ruhlu ve sosyal bağlantı kuran iyimserler.' },
  { tip: 'ISTJ', isim: 'Lojistikçi',  emoji: '📋', grup: 'Koruyucular', tema: 'blue',   ozellikler: ['Güvenilir', 'Pratik', 'Düzenli'],        aciklama: 'Güvenilirlik ve düzen konusunda örnek teşkil eden pratik kişiler.' },
  { tip: 'ISFJ', isim: 'Savunucu',    emoji: '🛡️', grup: 'Koruyucular', tema: 'blue',   ozellikler: ['Destekleyici', 'Sabırlı', 'Özenli'],     aciklama: 'Sıcak kalpli ve özenli, çevrelerini korumaya hazır bireyler.' },
  { tip: 'ESTJ', isim: 'Yönetici',    emoji: '⚖️', grup: 'Koruyucular', tema: 'blue',   ozellikler: ['Organize', 'Kararlı', 'Dürüst'],         aciklama: 'Düzeni ve geleneği yönetme konusunda mükemmel organizatörler.' },
  { tip: 'ESFJ', isim: 'Konsül',      emoji: '🤝', grup: 'Koruyucular', tema: 'blue',   ozellikler: ['Özenli', 'Sosyal', 'Duyarlı'],           aciklama: 'Son derece özenli, sosyal ve toplum odaklı kişiler.' },
  { tip: 'ISTP', isim: 'Virtüöz',     emoji: '🔧', grup: 'Kaşifler',    tema: 'violet', ozellikler: ['Pratik', 'Sakin', 'Meraklı'],            aciklama: 'Araçlarla ve sistemlerle derinlemesine ilgilenen pratik ustalar.' },
  { tip: 'ISFP', isim: 'Maceracı',    emoji: '🌸', grup: 'Kaşifler',    tema: 'violet', ozellikler: ['Zarif', 'Duyarlı', 'Coşkulu'],           aciklama: 'Esnek ve karizmatik sanatçılar. Keşfetmeye her zaman hazırlar.' },
  { tip: 'ESTP', isim: 'Girişimci',   emoji: '🚀', grup: 'Kaşifler',    tema: 'violet', ozellikler: ['Cesur', 'Rasyonel', 'Sosyal'],           aciklama: 'Akıllı, enerjik ve algısal kişiler; riskten zevk alan performerslar.' },
  { tip: 'ESFP', isim: 'Eğlendirici', emoji: '🎉', grup: 'Kaşifler',    tema: 'violet', ozellikler: ['Spontane', 'Neşeli', 'Duyarlı'],         aciklama: 'Spontane, enerjik, etraflarına heyecan saçan doğal performerslar.' },
];

const ENNEAGRAM_RAW = [
  { tip: 1, isim: 'Reformcu',       emoji: '⚖️', aciklama: 'Mükemmeliyetçi, ilkeli. Etik ve doğruluğa önem verirler.',             korku: 'Yanlış yapmak',      arzu: 'İyi olmak' },
  { tip: 2, isim: 'Yardımsever',    emoji: '💝', aciklama: 'Özenli, cömert. Başkalarına yardım etmekten mutluluk duyarlar.',        korku: 'Sevilmemek',         arzu: 'Sevilmek' },
  { tip: 3, isim: 'Başarıcı',       emoji: '🏆', aciklama: 'Uyum sağlayan, mükemmelliğe ve başarıya odaklanan kişiler.',            korku: 'Değersiz olmak',     arzu: 'Değerli hissetmek' },
  { tip: 4, isim: 'Bireyci',        emoji: '🎨', aciklama: 'Hassas, özgün. Kendini ifade etmeye odaklanan kişiler.',                korku: 'Kimliksiz olmak',    arzu: 'Özgün olmak' },
  { tip: 5, isim: 'Araştırmacı',    emoji: '🔭', aciklama: 'Yoğun, meraklı. Bilgi ve anlayışa değer verirler.',                    korku: 'Yetersiz olmak',     arzu: 'Yetkin olmak' },
  { tip: 6, isim: 'Sadık',          emoji: '🛡️', aciklama: 'Katılımcı, güvenilir. Sorumluluğa önem verirler.',                    korku: 'Desteksiz kalmak',   arzu: 'Güvende olmak' },
  { tip: 7, isim: 'Meraklı',        emoji: '🌈', aciklama: 'Spontane, çok yönlü. Deneyim ve heyecana odaklanan iyimserler.',        korku: 'Acı çekmek',         arzu: 'Mutlu olmak' },
  { tip: 8, isim: 'Meydan Okuyucu', emoji: '⚡', aciklama: 'Güçlü, baskın. Kendini ve başkalarını koruma konusunda kararlılar.',   korku: 'Kontrolü kaybetmek', arzu: 'Kendini korumak' },
  { tip: 9, isim: 'Barışçı',        emoji: '🕊️', aciklama: 'Kabul gören, güven veren. İç huzur ve uyuma değer verirler.',          korku: 'Bağlantı kaybı',     arzu: 'İç huzur' },
];

const GRUPLAR = ['Analistler', 'Diplomatlar', 'Koruyucular', 'Kaşifler'];

export default function KisilikTipleriScreen({ navigation }) {
  const { colors } = useTheme();
  const [aktifTab,  setAktifTab]  = useState('mbti');
  const [aktifGrup, setAktifGrup] = useState('Analistler');

  // Tema renklerini runtime'da hesapla
  const TEMA = {
    green:  { renk: colors.primary,   bg: colors.primaryLight,   border: colors.primaryDark },
    yellow: { renk: colors.accent,    bg: colors.accentLight,    border: colors.accentDark },
    blue:   { renk: colors.secondary, bg: colors.secondaryLight, border: colors.secondaryDark },
    violet: { renk: colors.violet,    bg: colors.violetLight,    border: colors.violetDark },
  };

  const MBTI_TIPLER = MBTI_RAW.map(t => ({ ...t, ...TEMA[t.tema] }));
  const filtreliMbti = MBTI_TIPLER.filter(t => t.grup === aktifGrup);
  const grupRengi = TEMA[{ Analistler: 'green', Diplomatlar: 'yellow', Koruyucular: 'blue', Kaşifler: 'violet' }[aktifGrup]];

  return (
    <SafeAreaView style={[s.safe, { backgroundColor: colors.background }]}>
      <AppBackground />
      <ScreenFadeIn>
        <TopNav navigation={navigation} />
        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

          {/* ── Tab ── */}
          <View style={s.tabRow}>
            {[{ id: 'mbti', label: 'MBTI · 16 Tip' }, { id: 'enneagram', label: 'Enneagram · 9 Tip' }].map(tab => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  s.tab,
                  { backgroundColor: colors.surface, borderColor: colors.border },
                  aktifTab === tab.id && { backgroundColor: colors.primary, borderColor: colors.primaryDark },
                ]}
                onPress={() => setAktifTab(tab.id)} activeOpacity={0.7}
              >
                <Text style={[s.tabText, { color: colors.textSecondary }, aktifTab === tab.id && { color: '#fff' }]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* ── MBTI ── */}
          {aktifTab === 'mbti' && (
            <>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}
                style={s.grupScroll} contentContainerStyle={s.grupRow}>
                {GRUPLAR.map(g => {
                  const gTema = TEMA[{ Analistler: 'green', Diplomatlar: 'yellow', Koruyucular: 'blue', Kaşifler: 'violet' }[g]];
                  const aktif = aktifGrup === g;
                  return (
                    <TouchableOpacity
                      key={g}
                      style={[
                        s.grupBtn,
                        { backgroundColor: colors.surface, borderColor: colors.border },
                        aktif && { backgroundColor: gTema.bg, borderColor: gTema.border },
                      ]}
                      onPress={() => setAktifGrup(g)} activeOpacity={0.7}
                    >
                      <Text style={[s.grupBtnText, { color: colors.textSecondary }, aktif && { color: gTema.renk, fontWeight: '700' }]}>
                        {g}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <View style={s.liste}>
                {filtreliMbti.map(tip => (
                  <View key={tip.tip} style={[s.tipKart, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <View style={[s.tipEmojiBg, { backgroundColor: tip.bg }]}>
                      <Text style={s.tipEmoji}>{tip.emoji}</Text>
                    </View>
                    <View style={s.tipKartOrta}>
                      <View style={s.tipKartUst}>
                        <Text style={[s.tipKod, { color: tip.renk }]}>{tip.tip}</Text>
                        <Text style={[s.tipIsim, { color: colors.textSecondary }]}>{tip.isim}</Text>
                      </View>
                      <Text style={[s.tipAciklama, { color: colors.textSecondary }]}>{tip.aciklama}</Text>
                      <View style={s.ozellikRow}>
                        {tip.ozellikler.map(o => (
                          <View key={o} style={[s.ozellik, { backgroundColor: tip.bg }]}>
                            <Text style={[s.ozellikText, { color: tip.renk }]}>{o}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* ── Enneagram ── */}
          {aktifTab === 'enneagram' && (
            <View style={s.liste}>
              {ENNEAGRAM_RAW.map(tip => (
                <View key={tip.tip} style={[s.tipKart, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                  <View style={[s.tipNumBg, { backgroundColor: colors.secondaryLight, borderColor: colors.secondaryDark + '60' }]}>
                    <Text style={[s.tipNum, { color: colors.secondary }]}>{tip.tip}</Text>
                  </View>
                  <View style={s.tipKartOrta}>
                    <View style={s.tipKartUst}>
                      <Text style={s.tipEmoji}>{tip.emoji}</Text>
                      <Text style={[s.tipKod, { color: colors.secondary }]}>{tip.isim}</Text>
                    </View>
                    <Text style={[s.tipAciklama, { color: colors.textSecondary }]}>{tip.aciklama}</Text>
                    <View style={[s.motivasyonRow, { backgroundColor: colors.surfaceLight }]}>
                      <View style={s.motivasyon}>
                        <Text style={[s.motivasyonEtiket, { color: colors.textMuted }]}>Korku</Text>
                        <Text style={[s.motivasyonDeger, { color: colors.error }]}>{tip.korku}</Text>
                      </View>
                      <View style={[s.motivasyonAyrac, { backgroundColor: colors.border }]} />
                      <View style={s.motivasyon}>
                        <Text style={[s.motivasyonEtiket, { color: colors.textMuted }]}>Arzu</Text>
                        <Text style={[s.motivasyonDeger, { color: colors.primary }]}>{tip.arzu}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}

          <Footer navigation={navigation} />
        </ScrollView>
      </ScreenFadeIn>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:   { flex: 1 },
  scroll: { alignItems: 'center', paddingBottom: 24, paddingTop: 24 },

  tabRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 20, maxWidth: MAX, width: '100%', marginBottom: 16 },
  tab: { flex: 1, paddingVertical: 11, borderRadius: 10, borderWidth: 1.5, alignItems: 'center' },
  tabText: { fontSize: 13, fontWeight: '600', fontFamily: FONT },

  grupScroll: { maxWidth: MAX, width: '100%' },
  grupRow:    { paddingHorizontal: 20, gap: 8, paddingBottom: 14 },
  grupBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1.5 },
  grupBtnText: { fontSize: 13, fontFamily: FONT },

  liste: { maxWidth: MAX, width: '100%', paddingHorizontal: 20, gap: 10 },

  tipKart: {
    flexDirection: 'row', gap: 14,
    borderRadius: 14, borderWidth: 1.5, borderBottomWidth: 4,
    padding: 16,
  },
  tipEmojiBg:  { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 },
  tipEmoji:    { fontSize: 20 },
  tipNumBg:    { width: 44, height: 44, borderRadius: 12, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 },
  tipNum:      { fontSize: 20, fontWeight: '700', fontFamily: FONT },
  tipKartOrta: { flex: 1, gap: 6 },
  tipKartUst:  { flexDirection: 'row', alignItems: 'center', gap: 8 },
  tipKod:      { fontSize: 15, fontWeight: '700', fontFamily: FONT },
  tipIsim:     { fontSize: 13, fontFamily: FONT },
  tipAciklama: { fontSize: 13, lineHeight: 19, fontFamily: FONT },
  ozellikRow:  { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  ozellik:     { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  ozellikText: { fontSize: 11, fontWeight: '600', fontFamily: FONT },

  motivasyonRow: { flexDirection: 'row', borderRadius: 10, padding: 10 },
  motivasyon:    { flex: 1, alignItems: 'center', gap: 2 },
  motivasyonEtiket: { fontSize: 10, fontFamily: FONT, fontWeight: '600', letterSpacing: 0.3, textTransform: 'uppercase' },
  motivasyonDeger:  { fontSize: 12, fontWeight: '600', fontFamily: FONT, textAlign: 'center' },
  motivasyonAyrac:  { width: 1, marginHorizontal: 8 },
});
