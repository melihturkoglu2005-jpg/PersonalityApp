import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, Modal, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { FONT, SERIF } from '../theme/constants';
import { useLayout, GRID } from '../theme/useLayout';
import { Screen, Wrap } from './ui';
import TestOnay from './TestOnay';

const IPUCLARI = [
  'Doğru ya da yanlış cevap yok; ilk içgüdünle cevapla.',
  'Kendini olmak istediğin gibi değil, genelde olduğun gibi düşün.',
  'Nötr seçeneğini yalnızca gerçekten kararsızsan kullan.',
];

function SoruHaritasi({ sira, aksan, cevaplanan, onGit, mobil = false }) {
  const { colors } = useTheme();
  return (
    <View style={[s.harita, mobil && s.mobilHarita]}>
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
              mobil && s.mobilNokta,
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
  );
}

// Sağ panel: durum özeti, soru haritası ve kısa ipuçları.
function YanPanel({ sira, toplam, aksan, cevaplanan, onGit }) {
  const { colors } = useTheme();
  const cevapSayisi = cevaplanan.filter(Boolean).length;

  return (
    <View style={[s.panel, { borderLeftColor: colors.border }]}>
      <Text style={[s.panelBaslik, { color: colors.textSecondary }]}>Durum</Text>
      <Text style={[s.buyuk, { color: colors.textPrimary }]}>
        {cevapSayisi}
        <Text style={{ color: colors.textMuted }}> / {toplam}</Text>
      </Text>
      <Text style={[s.kucuk, { color: colors.textSecondary }]}>soru cevaplandı</Text>

      <Text style={[s.panelBaslik, { color: colors.textSecondary, marginTop: 36 }]}>Soru haritası</Text>
      <SoruHaritasi sira={sira} aksan={aksan} cevaplanan={cevaplanan} onGit={onGit} />

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
  const { isNarrow, width } = useLayout();
  const [haritaAcik, setHaritaAcik] = useState(false);
  const yuzde = (sira / toplam) * 100;
  const panelVar = width >= 1100 && !!cevaplanan;
  const haritaDugmesiVar = !panelVar && !!cevaplanan && !!onGit;

  function soruyaGit(index) {
    setHaritaAcik(false);
    onGit(index);
  }

  return (
    <TestOnay navigation={navigation}>
      <Screen navigation={navigation} mode="test" footer={false}>
        <Wrap max={GRID} style={{ paddingTop: isNarrow ? 8 : 16 }}>
          <View style={panelVar ? s.iki : null}>
            <View style={[panelVar ? s.ana : null]}>
              <View style={s.meta}>
                <Text style={[s.metaTitle, { color: colors.textSecondary }]}>{baslik}</Text>
                <Pressable
                  onPress={haritaDugmesiVar ? () => setHaritaAcik(true) : undefined}
                  disabled={!haritaDugmesiVar}
                  accessibilityRole={haritaDugmesiVar ? 'button' : undefined}
                  accessibilityLabel={haritaDugmesiVar ? `Soru ${sira} / ${toplam}, soru haritasını aç` : undefined}
                  style={[s.sayacDugme, haritaDugmesiVar && { borderColor: colors.border, backgroundColor: colors.surfaceLight }]}
                >
                  <Text style={[s.sayac, { color: colors.textPrimary }]}>
                    {sira}
                    <Text style={{ color: colors.textMuted }}> / {toplam}</Text>
                  </Text>
                  {haritaDugmesiVar && <Text style={[s.sayacOk, { color: aksan }]}>⌄</Text>}
                </Pressable>
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
        {haritaDugmesiVar && (
          <Modal visible={haritaAcik} transparent animationType="fade" onRequestClose={() => setHaritaAcik(false)}>
            <View style={s.modalKatman}>
              <Pressable style={StyleSheet.absoluteFill} onPress={() => setHaritaAcik(false)} accessibilityLabel="Soru haritasını kapat" />
              <View style={[s.modalKart, { backgroundColor: colors.background, borderColor: colors.border }]}>
                <View style={s.modalBaslikSatiri}>
                  <View>
                    <Text style={[s.modalBaslik, { color: colors.textPrimary }]}>Soru haritası</Text>
                    <Text style={[s.modalAciklama, { color: colors.textSecondary }]}>
                      {cevaplanan.filter(Boolean).length} / {toplam} soru cevaplandı
                    </Text>
                  </View>
                  <Pressable onPress={() => setHaritaAcik(false)} accessibilityRole="button" accessibilityLabel="Kapat" style={s.kapatDugme}>
                    <Text style={[s.kapatYazi, { color: colors.textSecondary }]}>✕</Text>
                  </Pressable>
                </View>
                <ScrollView style={s.modalKaydirma} showsVerticalScrollIndicator={false} contentContainerStyle={s.modalIcerik}>
                  <SoruHaritasi sira={sira} aksan={aksan} cevaplanan={cevaplanan} onGit={soruyaGit} mobil />
                </ScrollView>
                <Text style={[s.modalIpucu, { color: colors.textMuted }]}>Bir soruya dokunarak doğrudan geçebilirsin.</Text>
              </View>
            </View>
          </Modal>
        )}
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
  sayacDugme: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderColor: 'transparent', borderRadius: 16, paddingHorizontal: 10, paddingVertical: 4, marginRight: -10 },
  sayacOk: { fontFamily: FONT, fontSize: 20, marginTop: -5 },
  iz: { height: 2, borderRadius: 1, overflow: 'hidden' },
  doluluk: { height: 2 },
  kontrol: { marginTop: 14 },
  not: { fontFamily: SERIF, fontSize: 22, fontStyle: 'italic' },

  panel: { width: 340, marginLeft: 'auto', paddingLeft: 40, borderLeftWidth: 1, paddingTop: 4, paddingBottom: 8 },
  panelBaslik: { fontFamily: FONT, fontSize: 13, marginBottom: 12 },
  buyuk: { fontFamily: SERIF, fontSize: 56, letterSpacing: -1.5, lineHeight: 58 },
  kucuk: { fontFamily: FONT, fontSize: 13, marginTop: 6 },
  harita: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  mobilHarita: { justifyContent: 'center', gap: 8 },
  nokta: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  mobilNokta: { width: 42, height: 42, borderRadius: 21 },
  noktaYazi: { fontFamily: FONT, fontSize: 11 },
  ipucu: { fontFamily: FONT, fontSize: 14, lineHeight: 21, paddingVertical: 12, borderTopWidth: 1 },
  modalKatman: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(12, 18, 28, 0.48)' },
  modalKart: { maxHeight: '75%', borderTopLeftRadius: 28, borderTopRightRadius: 28, borderWidth: 1, paddingHorizontal: 22, paddingTop: 24, paddingBottom: 30 },
  modalBaslikSatiri: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  modalBaslik: { fontFamily: FONT, fontSize: 22, fontWeight: '600' },
  modalAciklama: { fontFamily: FONT, fontSize: 13, marginTop: 6 },
  kapatDugme: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  kapatYazi: { fontFamily: FONT, fontSize: 20 },
  modalKaydirma: { flexShrink: 1 },
  modalIcerik: { paddingTop: 24, paddingBottom: 16 },
  modalIpucu: { fontFamily: FONT, fontSize: 12, textAlign: 'center', marginTop: 8 },
});
