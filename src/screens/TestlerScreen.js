import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { FONT, SERIF } from '../theme/constants';
import { useLayout, COL_GAP } from '../theme/useLayout';
import { Screen, Wrap, PageHeader, Rule, PillButton, TextButton } from '../components/ui';

const TESTLER = [
  {
    id: 'MBTI',
    ad: 'MBTI Testi',
    soru: 50,
    aciklama:
      'Bilgiyi nasıl işlediğine ve kararlarını nasıl verdiğine bakar. Bilişsel fonksiyonlara dayanan 50 soruyla 16 kişilik tipinden hangisine daha yakın olduğunu bulur. Sonuçta tipin, güçlü yönlerin, kariyer önerilerin ve aynı tipteki tanınmış isimler yer alır.',
    buton: 'MBTI testini başlat',
    renk: 'primary',
  },
  {
    id: 'Enneagram',
    ad: 'Enneagram Testi',
    soru: 45,
    aciklama:
      'Seni neyin harekete geçirdiğine, temel motivasyonlarına ve korkularına bakar. 45 soruyla 9 tipten hangisine daha yakın olduğunu bulur. Sonuçta tipin, kanadın ve stres ile güvenlik yönlerin Enneagram şemasında gösterilir.',
    buton: 'Enneagram testini başlat',
    renk: 'secondary',
  },
];

export default function TestlerScreen({ navigation }) {
  const { colors } = useTheme();
  const { isDesktop, isNarrow } = useLayout();

  return (
    <Screen navigation={navigation} active="Testler">
      <PageHeader
        title="Testler"
        sub="İki ayrı test, iki ayrı bakış. Birini seç; istersen ikisini de çözüp sonuçlarını tek sayfada birleştir. Kayıt ya da üyelik gerekmez."
      />

      <Wrap>
        <Rule />
        <View style={isDesktop && { flexDirection: 'row', gap: COL_GAP }}>
          {TESTLER.map((t, i) => {
            const aksan = colors[t.renk];
            return (
              <View
                key={t.id}
                style={[
                  s.kart,
                  isDesktop && { flex: 1 },
                  isDesktop && i === 1 && { borderLeftWidth: 1, borderLeftColor: colors.border, paddingLeft: COL_GAP },
                  !isDesktop && i === 1 && { borderTopWidth: 1, borderTopColor: colors.border },
                ]}
              >
                <Text style={[s.ad, { color: colors.textPrimary, fontSize: isNarrow ? 40 : 52 }]}>{t.ad}</Text>
                <Text style={[s.metin, { color: colors.textSecondary }]}>{t.aciklama}</Text>
                <Text style={[s.meta, { color: colors.textMuted }]}>{t.soru} soru</Text>
                <PillButton label={t.buton} tone="accent" accent={aksan} onPress={() => navigation.navigate(t.id)} style={{ marginTop: 28 }} />
              </View>
            );
          })}
        </View>
        <Rule />

        <View style={s.alt}>
          <Text style={[s.altMetin, { color: colors.textSecondary }]}>
            Hangisini seçeceğinden emin değil misin? MBTI düşünme biçimini, Enneagram ise motivasyonlarını anlatır; birbirini tamamlarlar.
            Önce MBTI ile başlamak yaygın bir yoldur.
          </Text>
          <TextButton label="Kaynaklarda farkı oku →" color={colors.textPrimary} onPress={() => navigation.navigate('Kaynaklar', { initialKat: 'sss' })} />
        </View>
      </Wrap>
    </Screen>
  );
}

const s = StyleSheet.create({
  kart: { paddingVertical: 40 },
  ad: { fontFamily: SERIF, letterSpacing: -1.2, lineHeight: 54, marginBottom: 16 },
  metin: { fontFamily: FONT, fontSize: 15, lineHeight: 24, maxWidth: 560 },
  meta: { fontFamily: FONT, fontSize: 13, marginTop: 20 },
  alt: { paddingVertical: 48, alignItems: 'center', gap: 8 },
  altMetin: { fontFamily: FONT, fontSize: 16, lineHeight: 26, textAlign: 'center', maxWidth: 600 },
});
