import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { FONT, SERIF } from '../theme/constants';
import { useLayout, COL, COL_GAP } from '../theme/useLayout';
import { Screen, Wrap, PageHeader, Tabs, Rule } from '../components/ui';
import EnneagramFigure from '../components/EnneagramFigure';

const MBTI_RAW = [
  { tip: 'INTJ', isim: 'Mimar',       grup: 'Analistler',  tema: 'green',  ozellikler: ['Analitik', 'Bağımsız', 'Stratejik'],  aciklama: 'Bağımsız, kararlı, uzun vadeli stratejik düşüncesiyle vizyoner liderler.' },
  { tip: 'INTP', isim: 'Mantıkçı',    grup: 'Analistler',  tema: 'green',  ozellikler: ['Meraklı', 'Yaratıcı', 'Nesnel'],       aciklama: 'Teorik ve soyut düşüncede mükemmel, yenilikçi düşünürler.' },
  { tip: 'ENTJ', isim: 'Komutan',     grup: 'Analistler',  tema: 'green',  ozellikler: ['Lider', 'Kararlı', 'Stratejik'],        aciklama: 'Güçlü irade ve kararlılıkla hedeflerine ulaşan doğal liderler.' },
  { tip: 'ENTP', isim: 'Tartışmacı',  grup: 'Analistler',  tema: 'green',  ozellikler: ['Yenilikçi', 'Kurnaz', 'Karizmatik'],    aciklama: 'Alışılmışın dışında düşünen, yenilikçi tartışmacılar.' },
  { tip: 'INFJ', isim: 'Savunucu',    grup: 'Diplomatlar', tema: 'yellow', ozellikler: ['Sezgisel', 'İdealist', 'Tutkulu'],       aciklama: 'Derin sezgiye sahip idealistler. İlham verme konusunda uzmandırlar.' },
  { tip: 'INFP', isim: 'Arabulucu',   grup: 'Diplomatlar', tema: 'yellow', ozellikler: ['Empatik', 'Yaratıcı', 'Özgün'],          aciklama: 'Empatik ve yaratıcı, değerlerine derin bağlılıkla yaşayan idealistler.' },
  { tip: 'ENFJ', isim: 'Kahraman',    grup: 'Diplomatlar', tema: 'yellow', ozellikler: ['Karizmatik', 'Empatik', 'Güvenilir'],    aciklama: 'Karizmatik ve ilham verici, insanları bir araya getiren liderler.' },
  { tip: 'ENFP', isim: 'Kampanyacı',  grup: 'Diplomatlar', tema: 'yellow', ozellikler: ['Coşkulu', 'Yaratıcı', 'İyimser'],        aciklama: 'Enerjik, özgür ruhlu ve sosyal bağlantı kuran iyimserler.' },
  { tip: 'ISTJ', isim: 'Lojistikçi',  grup: 'Koruyucular', tema: 'blue',   ozellikler: ['Güvenilir', 'Pratik', 'Düzenli'],        aciklama: 'Güvenilirlik ve düzen konusunda örnek teşkil eden pratik kişiler.' },
  { tip: 'ISFJ', isim: 'Savunucu',    grup: 'Koruyucular', tema: 'blue',   ozellikler: ['Destekleyici', 'Sabırlı', 'Özenli'],     aciklama: 'Sıcak kalpli ve özenli, çevrelerini korumaya hazır bireyler.' },
  { tip: 'ESTJ', isim: 'Yönetici',    grup: 'Koruyucular', tema: 'blue',   ozellikler: ['Organize', 'Kararlı', 'Dürüst'],         aciklama: 'Düzeni ve geleneği yönetme konusunda mükemmel organizatörler.' },
  { tip: 'ESFJ', isim: 'Konsül',      grup: 'Koruyucular', tema: 'blue',   ozellikler: ['Özenli', 'Sosyal', 'Duyarlı'],           aciklama: 'Son derece özenli, sosyal ve toplum odaklı kişiler.' },
  { tip: 'ISTP', isim: 'Virtüöz',     grup: 'Kaşifler',    tema: 'violet', ozellikler: ['Pratik', 'Sakin', 'Meraklı'],            aciklama: 'Araçlarla ve sistemlerle derinlemesine ilgilenen pratik ustalar.' },
  { tip: 'ISFP', isim: 'Maceracı',    grup: 'Kaşifler',    tema: 'violet', ozellikler: ['Zarif', 'Duyarlı', 'Coşkulu'],           aciklama: 'Esnek ve karizmatik sanatçılar. Keşfetmeye her zaman hazırlar.' },
  { tip: 'ESTP', isim: 'Girişimci',   grup: 'Kaşifler',    tema: 'violet', ozellikler: ['Cesur', 'Rasyonel', 'Sosyal'],           aciklama: 'Akıllı, enerjik ve algısal kişiler; riskten zevk alan performerslar.' },
  { tip: 'ESFP', isim: 'Eğlendirici', grup: 'Kaşifler',    tema: 'violet', ozellikler: ['Spontane', 'Neşeli', 'Duyarlı'],         aciklama: 'Spontane, enerjik, etraflarına heyecan saçan doğal performerslar.' },
];

const ENNEAGRAM_RAW = [
  { tip: 1, isim: 'Reformcu',       aciklama: 'Mükemmeliyetçi, ilkeli. Etik ve doğruluğa önem verirler.',             korku: 'Yanlış yapmak',      arzu: 'İyi olmak' },
  { tip: 2, isim: 'Yardımsever',    aciklama: 'Özenli, cömert. Başkalarına yardım etmekten mutluluk duyarlar.',        korku: 'Sevilmemek',         arzu: 'Sevilmek' },
  { tip: 3, isim: 'Başarıcı',       aciklama: 'Uyum sağlayan, mükemmelliğe ve başarıya odaklanan kişiler.',            korku: 'Değersiz olmak',     arzu: 'Değerli hissetmek' },
  { tip: 4, isim: 'Bireyci',        aciklama: 'Hassas, özgün. Kendini ifade etmeye odaklanan kişiler.',                korku: 'Kimliksiz olmak',    arzu: 'Özgün olmak' },
  { tip: 5, isim: 'Araştırmacı',    aciklama: 'Yoğun, meraklı. Bilgi ve anlayışa değer verirler.',                    korku: 'Yetersiz olmak',     arzu: 'Yetkin olmak' },
  { tip: 6, isim: 'Sadık',          aciklama: 'Katılımcı, güvenilir. Sorumluluğa önem verirler.',                    korku: 'Desteksiz kalmak',   arzu: 'Güvende olmak' },
  { tip: 7, isim: 'Meraklı',        aciklama: 'Spontane, çok yönlü. Deneyim ve heyecana odaklanan iyimserler.',        korku: 'Acı çekmek',         arzu: 'Mutlu olmak' },
  { tip: 8, isim: 'Meydan Okuyucu', aciklama: 'Güçlü, baskın. Kendini ve başkalarını koruma konusunda kararlılar.',   korku: 'Kontrolü kaybetmek', arzu: 'Kendini korumak' },
  { tip: 9, isim: 'Barışçı',        aciklama: 'Kabul gören, güven veren. İç huzur ve uyuma değer verirler.',          korku: 'Bağlantı kaybı',     arzu: 'İç huzur' },
];

const GRUPLAR = ['Analistler', 'Diplomatlar', 'Koruyucular', 'Kaşifler'];

export default function KisilikTipleriScreen({ navigation }) {
  const { colors } = useTheme();
  const { isDesktop, isNarrow } = useLayout();
  const [aktifTab,  setAktifTab]  = useState('mbti');
  const [aktifGrup, setAktifGrup] = useState('Analistler');
  const [seciliTip, setSeciliTip] = useState(1);

  const filtreliMbti = MBTI_RAW.filter((t) => t.grup === aktifGrup);
  const secili = ENNEAGRAM_RAW.find((t) => t.tip === seciliTip);
  const aksan  = aktifTab === 'mbti' ? colors.primary : colors.secondary;

  return (
    <Screen navigation={navigation} active="KisilikTipleri">
      <PageHeader
        title="Kişilik tipleri"
        sub="MBTI'nin 16 tipi ve Enneagram'ın 9 tipi. Önce sistemi, sonra grubu seç."
      />

      <Wrap>
        <Tabs
          accent={aksan}
          value={aktifTab}
          onChange={setAktifTab}
          items={[{ id: 'mbti', label: 'MBTI, 16 tip' }, { id: 'enneagram', label: 'Enneagram, 9 tip' }]}
        />
        <Rule />

        {aktifTab === 'mbti' && (
          <View style={{ marginTop: 28 }}>
            <Tabs
              accent={colors.textPrimary}
              value={aktifGrup}
              onChange={setAktifGrup}
              items={GRUPLAR.map((g) => ({ id: g, label: g }))}
            />

            <View style={{ marginTop: 8 }}>
              {filtreliMbti.map((tip) => (
                <View key={tip.tip} style={[s.satir, { borderBottomColor: colors.border }, !isDesktop && s.satirDar]}>
                  <Text style={[s.kod, { color: aksan, fontSize: isNarrow ? 52 : 72 }, isDesktop && { width: COL }]}>
                    {tip.tip}
                  </Text>
                  <View style={{ flex: 1, minWidth: 0, gap: 8 }}>
                    <Text style={[s.isim, { color: colors.textPrimary }]}>{tip.isim}</Text>
                    <Text style={[s.metin, { color: colors.textSecondary }]}>{tip.aciklama}</Text>
                    <Text style={[s.ozellik, { color: colors.textPrimary }]}>{tip.ozellikler.join(', ')}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {aktifTab === 'enneagram' && (
          <View style={[s.ennRow, isDesktop && s.ennRowWide]}>
            <View style={[s.ennSol, isDesktop && { width: COL }]}>
              <EnneagramFigure
                selected={seciliTip}
                onSelect={setSeciliTip}
                size={isNarrow ? 300 : COL}
                accent={colors.secondary}
              />
              {Platform.OS !== 'web' && (
                <View style={s.numRow}>
                  {ENNEAGRAM_RAW.map((t) => {
                    const on = t.tip === seciliTip;
                    return (
                      <Pressable
                        key={t.tip}
                        onPress={() => setSeciliTip(t.tip)}
                        accessibilityRole="button"
                        accessibilityLabel={`Tip ${t.tip}`}
                        style={[s.num, { borderColor: on ? colors.secondary : colors.border, backgroundColor: on ? colors.secondary : 'transparent' }]}
                      >
                        <Text style={[s.numText, { color: on ? '#FFFFFF' : colors.textPrimary }]}>{t.tip}</Text>
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </View>

            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={[s.ennNo, { color: colors.secondary }]}>{secili.tip}</Text>
              <Text style={[s.ennIsim, { color: colors.textPrimary }]}>{secili.isim}</Text>
              <Text style={[s.metin, { color: colors.textSecondary, marginTop: 12, maxWidth: 460 }]}>{secili.aciklama}</Text>

              <View style={[s.motiv, { borderTopColor: colors.border }]}>
                <View style={s.motivKol}>
                  <Text style={[s.motivEtiket, { color: colors.textSecondary }]}>Temel korku</Text>
                  <Text style={[s.motivDeger, { color: colors.textPrimary }]}>{secili.korku}</Text>
                </View>
                <View style={[s.motivKol, { borderLeftColor: colors.border, borderLeftWidth: 1, paddingLeft: 20 }]}>
                  <Text style={[s.motivEtiket, { color: colors.textSecondary }]}>Temel arzu</Text>
                  <Text style={[s.motivDeger, { color: colors.textPrimary }]}>{secili.arzu}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </Wrap>
    </Screen>
  );
}

const s = StyleSheet.create({
  satir:     { flexDirection: 'row', alignItems: 'flex-start', gap: COL_GAP, paddingVertical: 28, borderBottomWidth: 1 },
  satirDar:  { flexDirection: 'column', gap: 8 },
  kod:       { fontFamily: SERIF, fontWeight: '400', letterSpacing: -1.5, lineHeight: 72 },
  isim:      { fontFamily: SERIF, fontSize: 28, letterSpacing: -0.4 },
  metin:     { fontFamily: FONT, fontSize: 15, lineHeight: 24, maxWidth: 520 },
  ozellik:   { fontFamily: FONT, fontSize: 14, fontWeight: '500' },

  ennRow:     { marginTop: 32, gap: 32 },
  ennRowWide: { flexDirection: 'row', alignItems: 'flex-start', gap: COL_GAP },
  ennSol:     { alignItems: 'flex-start' },
  numRow:     { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginTop: 8 },
  num:        { width: 38, height: 38, borderRadius: 19, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  numText:    { fontFamily: SERIF, fontSize: 18 },
  ennNo:      { fontFamily: SERIF, fontSize: 120, lineHeight: 120, letterSpacing: -4 },
  ennIsim:    { fontFamily: SERIF, fontSize: 40, letterSpacing: -0.8, marginTop: 4 },
  motiv:      { flexDirection: 'row', gap: 20, marginTop: 32, paddingTop: 20, borderTopWidth: 1, maxWidth: 460 },
  motivKol:   { flex: 1, gap: 6 },
  motivEtiket:{ fontFamily: FONT, fontSize: 13 },
  motivDeger: { fontFamily: SERIF, fontSize: 24, letterSpacing: -0.3 },
});
