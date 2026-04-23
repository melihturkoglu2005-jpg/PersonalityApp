import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Dimensions, Platform, Animated,
} from 'react-native';
import { colors } from '../theme/colors';
import TopNav from '../components/TopNav';
import AppBackground from '../components/AppBackground';
import ScreenFadeIn from '../components/ScreenFadeIn';
import Footer from '../components/Footer';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;
const FONT = Platform.select({ ios: 'System', android: 'sans-serif', web: "'Inter', system-ui, sans-serif" });
const MAX  = 720;

const MBTI_TIPLER = [
  { tip: 'INTJ', isim: 'Mimar',        emoji: '🏛️', renk: colors.primary, bg: colors.primaryLight, aciklama: 'Bağımsız, kararlı, uzun vadeli stratejik düşüncesiyle vizyoner liderler.', ozellikler: ['Analitik', 'Bağımsız', 'Stratejik'], grup: 'Analistler' },
  { tip: 'INTP', isim: 'Mantıkçı',     emoji: '🔬', renk: colors.primary, bg: colors.primaryLight, aciklama: 'Teorik ve soyut düşüncede mükemmel, yenilikçi düşünürler.',                ozellikler: ['Meraklı', 'Yaratıcı', 'Nesnel'],    grup: 'Analistler' },
  { tip: 'ENTJ', isim: 'Komutan',      emoji: '⚡', renk: colors.primary, bg: colors.primaryLight, aciklama: 'Güçlü irade ve kararlılıkla hedeflerine ulaşan doğal liderler.',             ozellikler: ['Lider', 'Kararlı', 'Stratejik'],    grup: 'Analistler' },
  { tip: 'ENTP', isim: 'Tartışmacı',   emoji: '💡', renk: colors.primary, bg: colors.primaryLight, aciklama: 'Alışılmışın dışında düşünen, yenilikçi tartışmacılar.',                      ozellikler: ['Yenilikçi', 'Kurnaz', 'Karizmatik'],grup: 'Analistler' },
  { tip: 'INFJ', isim: 'Savunucu',     emoji: '🌿', renk: colors.accent, bg: colors.primaryLight, aciklama: 'Derin sezgiye sahip idealistler. İlham verme konusunda uzmandırlar.',         ozellikler: ['Sezgisel', 'İdealist', 'Tutkulu'],  grup: 'Diplomatlar' },
  { tip: 'INFP', isim: 'Arabulucu',    emoji: '🎨', renk: colors.accent, bg: colors.primaryLight, aciklama: 'Empatik ve yaratıcı, değerlerine derin bağlılıkla yaşayan idealistler.',      ozellikler: ['Empatik', 'Yaratıcı', 'Özgün'],    grup: 'Diplomatlar' },
  { tip: 'ENFJ', isim: 'Kahraman',     emoji: '🌟', renk: colors.accent, bg: colors.primaryLight, aciklama: 'Karizmatik ve ilham verici, insanları bir araya getiren liderler.',            ozellikler: ['Karizmatik', 'Empatik', 'Güvenilir'],grup: 'Diplomatlar' },
  { tip: 'ENFP', isim: 'Kampanyacı',   emoji: '🎭', renk: colors.accent, bg: colors.primaryLight, aciklama: 'Enerjik, özgür ruhlu ve sosyal bağlantı kuran iyimserler.',                   ozellikler: ['Coşkulu', 'Yaratıcı', 'İyimser'],   grup: 'Diplomatlar' },
  { tip: 'ISTJ', isim: 'Lojistikçi',   emoji: '📋', renk: colors.warning, bg: colors.warning + '20', aciklama: 'Güvenilirlik ve düzen konusunda örnek teşkil eden pratik kişiler.',           ozellikler: ['Güvenilir', 'Pratik', 'Düzenli'],   grup: 'Koruyucular' },
  { tip: 'ISFJ', isim: 'Savunucu',     emoji: '🛡️', renk: colors.warning, bg: colors.warning + '20', aciklama: 'Sıcak kalpli ve özenli, çevrelerini korumaya hazır bireyler.',                ozellikler: ['Destekleyici', 'Sabırlı', 'Özenli'],grup: 'Koruyucular' },
  { tip: 'ESTJ', isim: 'Yönetici',     emoji: '⚖️', renk: colors.warning, bg: colors.warning + '20', aciklama: 'Düzeni ve geleneği yönetme konusunda mükemmel organizatörler.',               ozellikler: ['Organize', 'Kararlı', 'Dürüst'],    grup: 'Koruyucular' },
  { tip: 'ESFJ', isim: 'Konsül',       emoji: '🤝', renk: colors.warning, bg: colors.warning + '20', aciklama: 'Son derece özenli, sosyal ve toplum odaklı kişiler.',                          ozellikler: ['Özenli', 'Sosyal', 'Duyarlı'],      grup: 'Koruyucular' },
  { tip: 'ISTP', isim: 'Virtüöz',      emoji: '🔧', renk: colors.textMuted, bg: colors.surfaceLight, aciklama: 'Araçlarla ve sistemlerle derinlemesine ilgilenen pratik ustalar.',             ozellikler: ['Pratik', 'Sakin', 'Meraklı'],       grup: 'Kaşifler' },
  { tip: 'ISFP', isim: 'Maceracı',     emoji: '🌸', renk: colors.textMuted, bg: colors.surfaceLight, aciklama: 'Esnek ve karizmatik sanatçılar. Keşfetmeye her zaman hazırlar.',              ozellikler: ['Zarif', 'Duyarlı', 'Coşkulu'],      grup: 'Kaşifler' },
  { tip: 'ESTP', isim: 'Girişimci',    emoji: '🚀', renk: colors.textMuted, bg: colors.surfaceLight, aciklama: 'Akıllı, enerjik ve algısal kişiler; riskten zevk alan performerslar.',         ozellikler: ['Cesur', 'Rasyonel', 'Sosyal'],      grup: 'Kaşifler' },
  { tip: 'ESFP', isim: 'Eğlendirici',  emoji: '🎉', renk: colors.textMuted, bg: colors.surfaceLight, aciklama: 'Spontane, enerjik, etraflarına heyecan saçan doğal performerslar.',            ozellikler: ['Spontane', 'Neşeli', 'Duyarlı'],    grup: 'Kaşifler' },
];

const ENNEAGRAM_TIPLER = [
  { tip: 1, isim: 'Reformcu',         emoji: '⚖️', renk: colors.secondary, bg: colors.secondaryLight, aciklama: 'Mükemmeliyetçi, ilkeli. Etik ve doğruluğa önem verirler.',              korku: 'Yanlış yapmak',       arzu: 'İyi olmak' },
  { tip: 2, isim: 'Yardımsever',      emoji: '💝', renk: colors.secondary, bg: colors.secondaryLight, aciklama: 'Özenli, cömert. Başkalarına yardım etmekten mutluluk duyarlar.',         korku: 'Sevilmemek',          arzu: 'Sevilmek' },
  { tip: 3, isim: 'Başarıcı',         emoji: '🏆', renk: colors.secondary, bg: colors.secondaryLight, aciklama: 'Uyum sağlayan, mükemmelliğe ve başarıya odaklanan kişiler.',             korku: 'Değersiz olmak',      arzu: 'Değerli hisselmek' },
  { tip: 4, isim: 'Bireyci',          emoji: '🎨', renk: colors.secondary, bg: colors.secondaryLight, aciklama: 'Hassas, özgün. Kendini ifade etmeye odaklanan kişiler.',                 korku: 'Kimliksiz olmak',     arzu: 'Özgün olmak' },
  { tip: 5, isim: 'Araştırmacı',      emoji: '🔭', renk: colors.secondary, bg: colors.secondaryLight, aciklama: 'Yoğun, meraklı. Bilgi ve anlayışa değer verirler.',                      korku: 'Yetersiz olmak',      arzu: 'Yetkin olmak' },
  { tip: 6, isim: 'Sadık',            emoji: '🛡️', renk: colors.secondary, bg: colors.secondaryLight, aciklama: 'Katılımcı, güvenilir. Sorumluluğa önem verirler.',                      korku: 'Desteksiz kalmak',    arzu: 'Güvende olmak' },
  { tip: 7, isim: 'Meraklı',          emoji: '🌈', renk: colors.secondary, bg: colors.secondaryLight, aciklama: 'Spontane, çok yönlü. Deneyim ve heyecana odaklanan iyimserler.',          korku: 'Acı çekmek',          arzu: 'Mutlu olmak' },
  { tip: 8, isim: 'Meydan Okuyucu',   emoji: '⚡', renk: colors.secondary, bg: colors.secondaryLight, aciklama: 'Güçlü, baskın. Kendini ve başkalarını koruma konusunda kararlılar.',      korku: 'Kontrolü kaybetmek',  arzu: 'Kendini korumak' },
  { tip: 9, isim: 'Barışçı',          emoji: '🕊️', renk: colors.secondary, bg: colors.secondaryLight, aciklama: 'Kabul gören, güven veren. İç huzur ve uyuma değer verirler.',            korku: 'Bağlantı kaybı',      arzu: 'İç huzur' },
];

const GRUPLAR = ['Analistler', 'Diplomatlar', 'Koruyucular', 'Kaşifler'];

export default function KisilikTipleriScreen({ navigation }) {
  const [aktifTab,  setAktifTab]  = useState('mbti');
  const [aktifGrup, setAktifGrup] = useState('Analistler');

  const filtreliMbti = MBTI_TIPLER.filter((t) => t.grup === aktifGrup);

  return (
    <SafeAreaView style={s.safe}>
      <AppBackground />
      <ScreenFadeIn>
        <TopNav navigation={navigation} />

        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Tab */}
        <View style={s.tabRow}>
          {[{ id: 'mbti', label: 'MBTI · 16 Tip' }, { id: 'enneagram', label: 'Enneagram · 9 Tip' }].map((tab) => (
            <TouchableOpacity key={tab.id} style={[s.tab, aktifTab === tab.id && s.tabAktif]}
              onPress={() => setAktifTab(tab.id)} activeOpacity={0.7}>
              <Text style={[s.tabText, aktifTab === tab.id && s.tabTextAktif]}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* MBTI */}
        {aktifTab === 'mbti' && (
          <>
            {/* Grup filtresi */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
              style={s.grupScroll} contentContainerStyle={s.grupRow}>
              {GRUPLAR.map((g) => {
                const grupRenk = MBTI_TIPLER.find((t) => t.grup === g)?.renk || colors.primary;
                const aktif = aktifGrup === g;
                return (
                  <TouchableOpacity key={g}
                    style={[s.grupBtn, aktif && { backgroundColor: grupRenk + '18', borderColor: grupRenk }]}
                    onPress={() => setAktifGrup(g)} activeOpacity={0.7}>
                    <Text style={[s.grupBtnText, aktif && { color: grupRenk, fontWeight: '600' }]}>{g}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Tip listesi */}
            <View style={s.liste}>
              {filtreliMbti.map((tip) => (
                <View key={tip.tip} style={s.tipKart}>
                  <View style={s.tipKartSol}>
                    <View style={[s.tipEmojiBg, { backgroundColor: tip.bg }]}>
                      <Text style={s.tipEmoji}>{tip.emoji}</Text>
                    </View>
                  </View>
                  <View style={s.tipKartOrta}>
                    <View style={s.tipKartUst}>
                      <Text style={[s.tipKod, { color: tip.renk }]}>{tip.tip}</Text>
                      <Text style={s.tipIsim}>{tip.isim}</Text>
                    </View>
                    <Text style={s.tipAciklama}>{tip.aciklama}</Text>
                    <View style={s.ozellikRow}>
                      {tip.ozellikler.map((o) => (
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

        {/* Enneagram */}
        {aktifTab === 'enneagram' && (
          <View style={s.liste}>
            {ENNEAGRAM_TIPLER.map((tip) => (
              <View key={tip.tip} style={s.tipKart}>
                <View style={s.tipKartSol}>
                  <View style={[s.tipNumBg, { backgroundColor: tip.bg, borderColor: tip.renk + '40' }]}>
                    <Text style={[s.tipNum, { color: tip.renk }]}>{tip.tip}</Text>
                  </View>
                </View>
                <View style={s.tipKartOrta}>
                  <View style={s.tipKartUst}>
                    <Text style={s.tipEmoji}>{tip.emoji}</Text>
                    <Text style={[s.tipKod, { color: tip.renk }]}>{tip.isim}</Text>
                  </View>
                  <Text style={s.tipAciklama}>{tip.aciklama}</Text>
                  <View style={s.motivasyonRow}>
                    <View style={s.motivasyon}>
                      <Text style={s.motivasyonEtiket}>Korku</Text>
                      <Text style={[s.motivasyonDeger, { color: '#EF4444' }]}>{tip.korku}</Text>
                    </View>
                    <View style={s.motivasyonAyrac} />
                    <View style={s.motivasyon}>
                      <Text style={s.motivasyonEtiket}>Arzu</Text>
                      <Text style={[s.motivasyonDeger, { color: '#10B981' }]}>{tip.arzu}</Text>
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
  safe: { flex: 1, backgroundColor: colors.background },

  scroll: { alignItems: 'center', paddingBottom: 24, paddingTop: 24 },

  tabRow: {
    flexDirection: 'row', gap: 8,
    paddingHorizontal: 20, maxWidth: MAX, width: '100%', marginBottom: 20,
  },
  tab: {
    flex: 1, paddingVertical: 11, borderRadius: 10,
    backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.border,
    alignItems: 'center',
  },
  tabAktif:     { backgroundColor: colors.primary, borderColor: colors.primary },
  tabText:      { fontSize: 13, fontWeight: '500', color: colors.textSecondary, fontFamily: FONT },
  tabTextAktif: { color: '#ffffff', fontWeight: '600' },

  grupScroll: { maxWidth: MAX, width: '100%' },
  grupRow:    { paddingHorizontal: 20, gap: 8, paddingBottom: 16 },
  grupBtn: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
    borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.surface,
  },
  grupBtnText: { fontSize: 13, color: colors.textSecondary, fontFamily: FONT },

  liste:   { maxWidth: MAX, width: '100%', paddingHorizontal: 20, gap: 10 },

  // Tip kartı
  tipKart: {
    flexDirection: 'row', gap: 14,
    backgroundColor: colors.surface,
    borderRadius: 14, borderWidth: 1, borderColor: colors.border,
    padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  tipKartSol:    { justifyContent: 'flex-start', paddingTop: 2 },
  tipEmojiBg:    { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tipEmoji:      { fontSize: 20 },
  tipNumBg:      { width: 44, height: 44, borderRadius: 12, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  tipNum:        { fontSize: 20, fontWeight: '700', fontFamily: FONT },
  tipKartOrta:   { flex: 1, gap: 6 },
  tipKartUst:    { flexDirection: 'row', alignItems: 'center', gap: 8 },
  tipKod:        { fontSize: 15, fontWeight: '700', fontFamily: FONT },
  tipIsim:       { fontSize: 13, color: colors.textSecondary, fontFamily: FONT },
  tipAciklama:   { fontSize: 13, color: colors.textSecondary, lineHeight: 19, fontFamily: FONT },
  ozellikRow:    { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  ozellik:       { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  ozellikText:   { fontSize: 11, fontWeight: '500', fontFamily: FONT },
  motivasyonRow: { flexDirection: 'row', backgroundColor: colors.surfaceLight, borderRadius: 10, padding: 10 },
  motivasyon:    { flex: 1, alignItems: 'center', gap: 2 },
  motivasyonEtiket: { fontSize: 10, color: colors.textMuted, fontFamily: FONT, fontWeight: '600', letterSpacing: 0.3 },
  motivasyonDeger:  { fontSize: 12, fontWeight: '600', fontFamily: FONT, textAlign: 'center' },
  motivasyonAyrac:  { width: 1, backgroundColor: colors.border, marginHorizontal: 8 },
});
