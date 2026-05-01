import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform, Animated } from 'react-native';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;
const FONT = Platform.select({
  ios: 'System', android: 'sans-serif',
  web: "'Nunito', 'Varela Round', system-ui, sans-serif",
});

// Duolingo tarzı cevap seçenekleri (yatay butonlar)
const SECENEKLER = {
  1: { metin: 'Kesinlikle Hayır', renk: colors.error,     border: colors.errorDark,    bg: '#FFF0F0', emoji: '😤' },
  2: { metin: 'Hayır',           renk: '#FF8C00',         border: '#E07B00',            bg: '#FFF5E0', emoji: '😕' },
  3: { metin: 'Nötr',            renk: colors.textMuted,  border: '#999999',            bg: colors.surfaceLight, emoji: '😐' },
  4: { metin: 'Evet',            renk: colors.secondary,  border: colors.secondaryDark, bg: colors.secondaryLight, emoji: '🙂' },
  5: { metin: 'Kesinlikle Evet', renk: colors.primary,    border: colors.primaryDark,   bg: colors.primaryLight, emoji: '😄' },
};

export default function QuestionCard({
  soru, soruNo, toplamSoru, seciliDeger, onSecim, renk, progressGizle,
  cevapIleIlerle = false,
}) {
  const bounce = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!seciliDeger) return;
    Animated.sequence([
      Animated.timing(bounce, { toValue: 0.97, duration: 80, useNativeDriver: true }),
      Animated.spring(bounce, { toValue: 1, friction: 5, tension: 300, useNativeDriver: true }),
    ]).start();
  }, [seciliDeger]);

  return (
    <View style={s.kart}>
      {!progressGizle && (
        <View style={s.progressWrap}>
          <View style={s.progressArka}>
            <Animated.View style={[s.progressDolu, {
              width: `${(soruNo / toplamSoru) * 100}%`,
              backgroundColor: renk || colors.primary,
            }]} />
          </View>
          <Text style={[s.progressText, { color: renk || colors.primary }]}>{soruNo}/{toplamSoru}</Text>
        </View>
      )}

      <Text style={s.soruMetni}>{soru}</Text>

      {/* Duolingo tarzı dikey seçenek butonları */}
      <View style={s.seceneklerCol}>
        {[1, 2, 3, 4, 5].map((puan) => {
          const secili = seciliDeger === puan;
          const opt    = SECENEKLER[puan];
          return (
            <Animated.View key={puan} style={secili ? { transform: [{ scale: bounce }] } : {}}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={opt.metin}
                style={[
                  s.secenekBtn,
                  {
                    borderColor:     secili ? opt.border : colors.border,
                    borderBottomColor: secili ? opt.border : colors.border,
                    backgroundColor:   secili ? opt.bg : colors.surface,
                  },
                ]}
                onPress={() => onSecim(puan)}
                activeOpacity={0.75}
              >
                <Text style={s.secenekEmoji}>{opt.emoji}</Text>
                <Text style={[s.secenekMetin, { color: secili ? opt.renk : colors.textPrimary }]}>
                  {opt.metin}
                </Text>
                {secili && (
                  <View style={[s.secenekCheck, { backgroundColor: opt.renk, borderColor: opt.border }]}>
                    <Text style={s.secenekCheckText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>

      {cevapIleIlerle && seciliDeger && (
        <Text style={[s.ilerliyor, { color: renk || colors.primary }]}>
          ✓ Sonraki soruya geçiliyor...
        </Text>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  kart: {
    backgroundColor: colors.surface,
    borderRadius: 20, borderWidth: 2, borderColor: colors.border, borderBottomWidth: 5,
    padding: isDesktop ? 32 : 20,
    marginHorizontal: isDesktop ? 0 : 20,
    gap: isDesktop ? 20 : 16,
  },
  progressWrap: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  progressArka: { flex: 1, height: 10, backgroundColor: colors.borderLight, borderRadius: 5, overflow: 'hidden' },
  progressDolu: { height: 10, borderRadius: 5 },
  progressText: { fontSize: 12, fontWeight: '800', fontFamily: FONT, minWidth: 36, textAlign: 'right' },
  soruMetni: {
    fontSize: isDesktop ? 20 : 17, color: colors.textPrimary,
    lineHeight: isDesktop ? 32 : 26, fontFamily: FONT, fontWeight: '800',
  },
  seceneklerCol: { gap: 10 },
  secenekBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderRadius: 14, borderWidth: 2, borderBottomWidth: 5,
    paddingVertical: 14, paddingHorizontal: 16,
    position: 'relative',
  },
  secenekEmoji:  { fontSize: 20, width: 28, textAlign: 'center' },
  secenekMetin:  { flex: 1, fontSize: 15, fontWeight: '800', fontFamily: FONT },
  secenekCheck: {
    width: 22, height: 22, borderRadius: 11, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center',
  },
  secenekCheckText: { color: '#fff', fontSize: 11, fontWeight: '900' },
  ilerliyor: { fontSize: 13, fontWeight: '800', textAlign: 'center', fontFamily: FONT },
});
