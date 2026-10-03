import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { FONT, SERIF } from '../theme/constants';
import { useLayout, GRID } from '../theme/useLayout';
import { Screen, Wrap } from './ui';
import TestOnay from './TestOnay';

const SANIYE_PER_SORU = 10;
const IPUCLARI = [
  'Doğru ya da yanlış cevap yok; ilk içgüdünle cevapla.',
  'Kendini olmak istediğin gibi değil, genelde olduğun gibi düşün.',
  'Nötr seçeneğini yalnızca gerçekten kararsızsan kullan.',
];

// Sağ panel: durum özeti, soru haritası (istenen soruya atlama) ve kısa ipuçları.
function YanPanel({ sira, toplam, aksan, cevaplanan, onGit }) {
  const { colors } = useTheme();
  const cevapSayisi = cevaplanan.filter(Boolean).length;
  const kalanDk = Math.max(1, Math.round(((toplam - cevapSayisi) * SANIYE_PER_SORU) / 60));

  return (
    <View style={[s.panel, { borderLeftColor: colors.border }]}>
      <Text style={[s.panelBaslik, { color: colors.textSecondary }]}>Durum</Text>
      <Text style={[s.buyuk, { color: colors.textPrimary }]}>
        {cevapSayisi}
        <Text style={{ color: colors.textMuted }}> / {toplam}</Text>
      </Text>
      <Text style={[s.kucuk, { color: colors.textSecondary }]}>
        soru cevaplandı · yaklaşık {cevapSayisi === toplam ? 0 : kalanDk} dk kaldı
      </Text>

      <Text style={[s.panelBaslik, { color: colors.textSecondary, marginTop: 36 }]}>Soru haritası</Text>
      <View style={s.harita}>
        {cevaplanan.map((cevaplandi, i) => {
          const simdiki = i === sira - 1;
          return (
            <Pressable
              key={i}
              onPress={() => onGit(i)}
              accessibilityRole="button"
              accessibilityLabel={`Soru ${i + 1}${cevaplandi ? ', cevaplandı' : ''}`}
              style={({ hovered }) => [
                s.nokta,
                {
                  borderColor: simdiki ? aksan : colors.border,
                  backgroundColor: cevaplandi ? aksan : hovered ? colors.surfaceLight : 'transparent',
                  borderWidth: simdiki ? 2 : 1,
                },
              ]}
            >
              <Text style={[s.noktaYazi, { color: cevaplandi ? '#FFFFFF' : simdiki ? aksan : colors.textMuted }]}>{i + 1}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={[s.panelBaslik, { color: colors.textSecondary, marginTop: 36 }]}>Cevaplarken</Text>
      {IPUCLARI.map((t) => (
        <Text key={t} style={[s.ipucu, { color: colors.textSecondary, borderTopColor: colors.border }]}>{t}</Text>
      ))}
    </View>
  );
}

// MBTI ve Enneagram test ekranlarının ortak çerçevesi.
// Mantık (cevap, ilerleme, yönlendirme) ekranlarda kalır; burası yalnızca görünüm.
//   kontrol    → ilerleme çubuğunun hemen altında gösterilen öğe (otomatik ilerleme anahtarı)
//   cevaplanan → her soru için cevaplandı mı (boolean dizisi); sağ panel için
//   onGit      → soru haritasından seçilen soru numarasına (0 tabanlı) gider
export default function TestFrame({ navigation, baslik, sira, toplam, aksan, not, kontrol, cevaplanan, onGit, children }) {
  const { colors } = useTheme();
  const { isNarrow, width, gutter } = useLayout();
  const yuzde = (sira / toplam) * 100;
  const panelVar = width >= 1100 && !!cevaplanan;

  return (
    <TestOnay navigation={navigation}>
      <Screen navigation={navigation} mode="test">
        <Wrap max={GRID} style={{ paddingTop: isNarrow ? 8 : 16 }}>
          <View style={panelVar ? s.iki : null}>
            <View style={[panelVar ? s.ana : null]}>
              <View style={s.meta}>
                <Text style={[s.metaTitle, { color: colors.textSecondary }]}>{baslik}</Text>
                <Text style={[s.sayac, { color: colors.textPrimary }]}>
                  {sira}
                  <Text style={{ color: colors.textMuted }}> / {toplam}</Text>
                </Text>
              </View>

              <View style={[s.iz, { backgroundColor: colors.border }]}>
                <View style={[s.doluluk, { width: `${yuzde}%`, backgroundColor: aksan }]} />
              </View>

              {!!kontrol && <View style={s.kontrol}>{kontrol}</View>}

              {!!not && (
                <Text style={[s.not, { color: aksan, marginTop: isNarrow ? 32 : 48 }]}>{not}</Text>
              )}

              <View style={{ marginTop: not ? 12 : isNarrow ? 32 : 48, paddingBottom: 24 }}>{children}</View>
            </View>

            {panelVar && (
              <YanPanel sira={sira} toplam={toplam} aksan={aksan} cevaplanan={cevaplanan} onGit={onGit || (() => {})} />
            )}
          </View>
        </Wrap>
      </Screen>
    </TestOnay>
  );
}

const s = StyleSheet.create({
  iki: { flexDirection: 'row', alignItems: 'flex-start', gap: 72 },
  ana: { flex: 1, maxWidth: 760, minWidth: 0 },
  meta: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 },
  metaTitle: { fontFamily: FONT, fontSize: 14 },
  sayac: { fontFamily: SERIF, fontSize: 28, letterSpacing: -0.5 },
  iz: { height: 2, borderRadius: 1, overflow: 'hidden' },
  doluluk: { height: 2 },
  kontrol: { marginTop: 14 },
  not: { fontFamily: SERIF, fontSize: 22, fontStyle: 'italic' },

  panel: { width: 340, marginLeft: 'auto', paddingLeft: 40, borderLeftWidth: 1, paddingTop: 4, paddingBottom: 8 },
  panelBaslik: { fontFamily: FONT, fontSize: 13, marginBottom: 12 },
  buyuk: { fontFamily: SERIF, fontSize: 56, letterSpacing: -1.5, lineHeight: 58 },
  kucuk: { fontFamily: FONT, fontSize: 13, marginTop: 6 },
  harita: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  nokta: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  noktaYazi: { fontFamily: FONT, fontSize: 11 },
  ipucu: { fontFamily: FONT, fontSize: 14, lineHeight: 21, paddingVertical: 12, borderTopWidth: 1 },
});
