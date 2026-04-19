import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform, Animated } from 'react-native';
import { colors, space, shadows, radius } from '../theme/colors';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;
const FONT = Platform.select({ ios: 'System', android: 'sans-serif', web: "'Inter', system-ui, sans-serif" });

const KIRMIZI_ETIKET = '#B91C1C';
const YESIL_ETIKET   = '#047857';

const SECENEKLER = {
  1: { metin: 'Kesinlikle Katılmıyorum', renk: '#DC2626', bg: '#FEE2E2', kenarDurgun: '#FECACA', boyut: 1.0 },
  2: { metin: 'Katılmıyorum',            renk: '#EF4444', bg: '#FEF2F2', kenarDurgun: '#FECACA', boyut: 0.82 },
  3: { metin: 'Nötr',                    renk: '#94A3B8', bg: '#F1F5F9', kenarDurgun: '#CBD5E1', boyut: 0.65 },
  4: { metin: 'Katılıyorum',             renk: '#22C55E', bg: '#DCFCE7', kenarDurgun: '#BBF7D0', boyut: 0.82 },
  5: { metin: 'Kesinlikle Katılıyorum',  renk: '#15803D', bg: '#D1FAE5', kenarDurgun: '#86EFAC', boyut: 1.0 },
};

export default function QuestionCard({
  soru, soruNo, toplamSoru, seciliDeger, onSecim, renk, progressGizle, cevapIleIlerle = false,
}) {
  const yonlendirmeMetni = cevapIleIlerle
    ? 'Bir seçenek seçtiğinizde otomatik olarak bir sonraki soruya geçilir.'
    : 'Devam etmek için bir seçenek seçin veya aşağıdaki Sonraki ile ilerleyin.';

  const pulse = useRef(new Animated.Value(1)).current;
  const glow  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!cevapIleIlerle || !seciliDeger) { pulse.setValue(1); glow.setValue(0); return; }
    pulse.setValue(1); glow.setValue(0);
    Animated.parallel([
      Animated.sequence([
        Animated.spring(pulse, { toValue: 1.18, friction: 5, tension: 280, useNativeDriver: true }),
        Animated.spring(pulse, { toValue: 1,    friction: 6, tension: 200, useNativeDriver: true }),
      ]),
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 90,  useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0, duration: 220, useNativeDriver: true }),
      ]),
    ]).start();
  }, [seciliDeger, soruNo, cevapIleIlerle]);

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
      <Text style={s.yonlendirme}>{yonlendirmeMetni}</Text>

      <View style={s.etiketRow}>
        <Text style={[s.etiket, { color: KIRMIZI_ETIKET }]}>Katılmıyorum</Text>
        <Text style={[s.etiket, { color: YESIL_ETIKET }]}>Katılıyorum</Text>
      </View>

      <View style={s.daireRow}>
        {[1, 2, 3, 4, 5].map((puan) => {
          const secili = seciliDeger === puan;
          const opt    = SECENEKLER[puan];
          const BASE   = isDesktop ? 52 : 44;
          const boyut  = Math.round(BASE * opt.boyut);
          const boyutG = Math.round(boyut * 1.28);

          const daireIci = (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={`${puan}. seviye: ${opt.metin}`}
              style={[
                s.daire,
                {
                  width: boyut, height: boyut, borderRadius: boyut / 2,
                  borderColor:     secili ? opt.renk : opt.kenarDurgun,
                  borderWidth:     secili ? 3 : 1.5,
                  backgroundColor: secili ? opt.renk : colors.surface,
                  ...(secili ? shadows.colored(opt.renk) : shadows.sm),
                },
              ]}
              onPress={() => onSecim(puan)}
              activeOpacity={0.75}
            >
              {secili && <View style={s.icNokta} />}
            </TouchableOpacity>
          );

          return (
            <View key={puan} style={s.daireSlot}>
              {secili && cevapIleIlerle ? (
                <Animated.View style={[
                  s.daireAnimWrap,
                  { width: boyutG, height: boyutG, borderRadius: boyutG / 2, transform: [{ scale: pulse }] },
                ]}>
                  <Animated.View pointerEvents="none" style={[
                    StyleSheet.absoluteFillObject,
                    { borderRadius: boyutG / 2, borderWidth: 3, borderColor: opt.renk,
                      opacity: glow.interpolate({ inputRange: [0, 1], outputRange: [0, 0.5] }) },
                  ]} />
                  {daireIci}
                </Animated.View>
              ) : daireIci}
            </View>
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
    borderRadius: radius.xxl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: isDesktop ? space[9] : space[6],
    marginHorizontal: isDesktop ? 0 : space[5],
    gap: isDesktop ? space[6] : space[5],
    ...shadows.lg,
  },
  progress:     { gap: space[1] },
  progressArka: { height: 4, backgroundColor: colors.border, borderRadius: radius.full, overflow: 'hidden' },
  progressDolu: { height: 4, borderRadius: radius.full },
  soruMetni: {
    fontSize: isDesktop ? 19 : 16,
    color: colors.textPrimary,
    lineHeight: isDesktop ? 30 : 26,
    fontFamily: FONT,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  yonlendirme: { fontSize: 12, color: colors.textMuted, fontFamily: FONT, marginTop: -space[3] },
  etiketRow:   { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: space[1] },
  etiket:      { fontSize: isDesktop ? 13 : 12, fontWeight: '700', fontFamily: FONT },
  daireRow:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: isDesktop ? space[2] : space[1], paddingVertical: space[2] },
  daireSlot:   { alignItems: 'center', justifyContent: 'center', minWidth: isDesktop ? 60 : 52 },
  daireAnimWrap: { alignItems: 'center', justifyContent: 'center' },
  daire:       { alignItems: 'center', justifyContent: 'center' },
  icNokta:     { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FFFFFF' },
  seciliYazi:  { fontSize: 13, fontWeight: '700', textAlign: 'center', fontFamily: FONT },
});
