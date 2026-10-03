import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { FONT, SERIF } from '../theme/constants';
import { useLayout } from '../theme/useLayout';
import { Screen, Wrap } from './ui';

// MBTI ve Enneagram test ekranlarının ortak çerçevesi.
// Mantık (cevap, ilerleme, yönlendirme) ekranlarda kalır; burası yalnızca görünüm.
export default function TestFrame({ navigation, active, baslik, sira, toplam, aksan, not, children }) {
  const { colors } = useTheme();
  const { isNarrow } = useLayout();
  const yuzde = (sira / toplam) * 100;

  return (
    <Screen navigation={navigation} active={active} footer={false}>
      <Wrap max={760} style={{ paddingTop: isNarrow ? 12 : 24 }}>
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

        {!!not && (
          <Text style={[s.not, { color: aksan, marginTop: isNarrow ? 36 : 56 }]}>{not}</Text>
        )}

        <View style={{ marginTop: not ? 12 : isNarrow ? 36 : 56, paddingBottom: 24 }}>{children}</View>
      </Wrap>
    </Screen>
  );
}

const s = StyleSheet.create({
  meta: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 },
  metaTitle: { fontFamily: FONT, fontSize: 14 },
  sayac: { fontFamily: SERIF, fontSize: 28, letterSpacing: -0.5 },
  iz: { height: 2, borderRadius: 1, overflow: 'hidden' },
  doluluk: { height: 2 },
  not: { fontFamily: SERIF, fontSize: 22, fontStyle: 'italic' },
});
