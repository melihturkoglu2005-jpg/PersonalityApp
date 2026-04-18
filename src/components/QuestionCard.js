import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;
const FONT = Platform.select({ ios: 'System', android: 'sans-serif', web: "'Inter', system-ui, sans-serif" });

// Sol = mor (katılmıyorum), Sağ = teal (katılıyorum)
const SECENEKLER = {
  1: { metin: 'Kesinlikle Katılmıyorum', renk: '#7C3AED', bg: '#EDE9FE', boyut: 1.0 },
  2: { metin: 'Katılmıyorum',            renk: '#A78BFA', bg: '#F5F3FF', boyut: 0.82 },
  3: { metin: 'Nötr',                    renk: '#94A3B8', bg: '#F1F5F9', boyut: 0.65 },
  4: { metin: 'Katılıyorum',             renk: '#0EA5E9', bg: '#E0F2FE', boyut: 0.82 },
  5: { metin: 'Kesinlikle Katılıyorum',  renk: '#0284C7', bg: '#BFDBFE', boyut: 1.0 },
};

export default function QuestionCard({ soru, soruNo, toplamSoru, seciliDeger, onSecim, renk, progressGizle }) {
  return (
    <View style={s.kart}>

      {!progressGizle && (
        <View style={s.progress}>
          <View style={s.progressArka}>
            <View style={[s.progressDolu, { width: `${(soruNo / toplamSoru) * 100}%`, backgroundColor: renk }]} />
          </View>
        </View>
      )}

      <Text style={s.soruMetni}>{soru}</Text>

      {/* Etiketler */}
      <View style={s.etiketRow}>
        <Text style={[s.etiket, { color: '#7C3AED' }]}>Katılmıyorum</Text>
        <Text style={[s.etiket, { color: '#0284C7' }]}>Katılıyorum</Text>
      </View>

      {/* Daire seçenekleri — x.fazlioglu.tr minimal tarzı */}
      <View style={s.daireRow}>
        {[1, 2, 3, 4, 5].map((puan) => {
          const secili = seciliDeger === puan;
          const opt    = SECENEKLER[puan];
          const BASE   = isDesktop ? 52 : 44;
          const boyut  = Math.round(BASE * opt.boyut);
          return (
            <TouchableOpacity
              key={puan}
              style={[
                s.daire,
                {
                  width: boyut, height: boyut, borderRadius: boyut / 2,
                  borderColor:      secili ? opt.renk : '#CBD5E0',
                  borderWidth:      secili ? 2.5 : 1.5,
                  backgroundColor:  secili ? opt.renk : colors.surface,
                },
              ]}
              onPress={() => onSecim(puan)}
              activeOpacity={0.75}
            />
          );
        })}
      </View>

      {seciliDeger && (
        <Text style={[s.seciliYazi, { color: SECENEKLER[seciliDeger].renk }]}>
          {SECENEKLER[seciliDeger].metin}
        </Text>
      )}

    </View>
  );
}

const s = StyleSheet.create({
  kart: {
    backgroundColor: colors.surface,
    borderRadius: 16, borderWidth: 1, borderColor: colors.border,
    padding: isDesktop ? 36 : 24,
    marginHorizontal: isDesktop ? 0 : 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
    gap: isDesktop ? 24 : 20,
  },
  progress:      { gap: 6 },
  progressArka:  { height: 3, backgroundColor: colors.border, borderRadius: 2, overflow: 'hidden' },
  progressDolu:  { height: 3, borderRadius: 2 },
  soruMetni:     { fontSize: isDesktop ? 19 : 16, color: colors.textPrimary, lineHeight: isDesktop ? 30 : 25, fontFamily: FONT, fontWeight: '500' },
  etiketRow:     { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4 },
  etiket:        { fontSize: isDesktop ? 13 : 12, fontWeight: '600', fontFamily: FONT },
  daireRow:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: isDesktop ? 8 : 4, paddingVertical: 8 },
  daire:         { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 2, elevation: 1 },
  seciliYazi:    { fontSize: 13, fontWeight: '600', textAlign: 'center', fontFamily: FONT },
});
