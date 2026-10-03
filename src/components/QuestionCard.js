import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { FONT, SERIF } from '../theme/constants';
import { useLayout } from '../theme/useLayout';

// 1-5 katılma ölçeği: uçlara doğru büyüyen beş daire.
// Sol taraf (katılmıyorum) mürekkep, sağ taraf (katılıyorum) test vurgusu, ortası gri.
const ETIKET = {
  1: 'Kesinlikle hayır',
  2: 'Hayır',
  3: 'Nötr',
  4: 'Evet',
  5: 'Kesinlikle evet',
};

export default function QuestionCard({
  soru, seciliDeger, onSecim, renk, cevapIleIlerle = false,
}) {
  const { colors } = useTheme();
  const { isNarrow } = useLayout();
  const accent = renk || colors.primary;
  const SIZES = isNarrow ? [46, 34, 24, 34, 46] : [60, 44, 30, 44, 60];

  const tone = (puan) => {
    if (puan <= 2) return '#E53935';
    if (puan === 3) return colors.textMuted || '#9E9E9E';
    return '#43A047';
  };

  return (
    <View>
      <Text style={[s.soru, { color: colors.textPrimary, fontSize: isNarrow ? 28 : 40, lineHeight: isNarrow ? 32 : 44 }]}>
        {soru}
      </Text>

      <View style={[s.skala, { marginTop: isNarrow ? 36 : 52 }]}>
        {[1, 2, 3, 4, 5].map((puan, i) => {
          const secili = seciliDeger === puan;
          const d = SIZES[i];
          const c = tone(puan);
          return (
            <Pressable
              key={puan}
              onPress={() => onSecim(puan)}
              accessibilityRole="button"
              accessibilityLabel={ETIKET[puan]}
              accessibilityState={{ selected: secili }}
              style={s.hit}
            >
              {({ hovered }) => (
                <View
                  style={{
                    width: d, height: d, borderRadius: d / 2,
                    borderWidth: 1.5, borderColor: c,
                    backgroundColor: secili ? c : hovered ? colors.surfaceLight : 'transparent',
                    ...(Platform.OS === 'web' ? { transitionProperty: 'background-color', transitionDuration: '140ms' } : null),
                  }}
                />
              )}
            </Pressable>
          );
        })}
      </View>

      <View style={s.uclar}>
        <Text style={[s.uc, { color: colors.textSecondary }]}>Katılmıyorum</Text>
        <Text style={[s.uc, { color: colors.textSecondary }]}>Katılıyorum</Text>
      </View>

      <Text style={[s.secim, { color: seciliDeger ? tone(seciliDeger) : 'transparent' }]} accessibilityLiveRegion="polite">
        {seciliDeger ? ETIKET[seciliDeger] : ' '}
      </Text>

      {cevapIleIlerle && !!seciliDeger && (
        <Text style={[s.ilerliyor, { color: colors.textMuted }]}>Sonraki soruya geçiliyor</Text>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  soru: { fontFamily: SERIF, fontWeight: '400', letterSpacing: -0.8 },
  skala: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  hit: { minWidth: 48, minHeight: 64, alignItems: 'center', justifyContent: 'center' },
  uclar: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  uc: { fontFamily: FONT, fontSize: 12 },
  secim: { fontFamily: SERIF, fontSize: 26, fontStyle: 'italic', textAlign: 'center', marginTop: 20, minHeight: 32 },
  ilerliyor: { fontFamily: FONT, fontSize: 12, textAlign: 'center', marginTop: 4 },
});
