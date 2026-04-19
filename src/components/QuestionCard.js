import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform, Animated } from 'react-native';
import { colors, space, shadows, radius } from '../theme/colors';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;
const FONT = Platform.select({ ios:'System', android:'sans-serif', web:"'Inter',system-ui,sans-serif" });

const OPTS = {
  1: { metin:'Kesinlikle Katılmıyorum', renk:'#DC2626', bg:'#FEF2F2', border:'#FECACA', boyut:1.0 },
  2: { metin:'Katılmıyorum',            renk:'#EF4444', bg:'#FFF5F5', border:'#FECACA', boyut:0.80 },
  3: { metin:'Nötr',                    renk:'#94A3B8', bg:'#F1F5F9', border:'#CBD5E1', boyut:0.65 },
  4: { metin:'Katılıyorum',             renk:'#22C55E', bg:'#F0FDF4', border:'#BBF7D0', boyut:0.80 },
  5: { metin:'Kesinlikle Katılıyorum',  renk:'#15803D', bg:'#DCFCE7', border:'#86EFAC', boyut:1.0 },
};

export default function QuestionCard({
  soru, soruNo, toplamSoru, seciliDeger, onSecim, renk, progressGizle, cevapIleIlerle = false,
}) {
  const pulse = useRef(new Animated.Value(1)).current;
  const glow  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!cevapIleIlerle || !seciliDeger) { pulse.setValue(1); glow.setValue(0); return; }
    Animated.parallel([
      Animated.sequence([
        Animated.spring(pulse, { toValue:1.16, friction:5, tension:280, useNativeDriver:true }),
        Animated.spring(pulse, { toValue:1, friction:6, tension:200, useNativeDriver:true }),
      ]),
      Animated.sequence([
        Animated.timing(glow, { toValue:1, duration:90,  useNativeDriver:true }),
        Animated.timing(glow, { toValue:0, duration:220, useNativeDriver:true }),
      ]),
    ]).start();
  }, [seciliDeger, soruNo, cevapIleIlerle]);

  const yonlendirme = cevapIleIlerle
    ? 'Bir seçenek seçtiğinizde otomatik ilerler.'
    : 'Bir seçenek seçin, ardından Sonraki\'ye basın.';

  return (
    <View style={s.kart}>
      {!progressGizle && (
        <View style={s.progressBar}>
          <View style={[s.progressFill, { width:`${(soruNo/toplamSoru)*100}%`, backgroundColor: renk }]} />
        </View>
      )}

      <Text style={s.soruText}>{soru}</Text>
      <Text style={s.yonlendirme}>{yonlendirme}</Text>

      {/* Etiket çifti */}
      <View style={s.labelRow}>
        <Text style={[s.labelText, { color:'#B91C1C' }]}>Katılmıyorum</Text>
        <Text style={[s.labelText, { color:'#047857' }]}>Katılıyorum</Text>
      </View>

      {/* Daire seçenekleri */}
      <View style={s.daireRow}>
        {[1,2,3,4,5].map(puan => {
          const secili = seciliDeger === puan;
          const opt    = OPTS[puan];
          const BASE   = isDesktop ? 54 : 46;
          const boyut  = Math.round(BASE * opt.boyut);
          const boyutG = Math.round(boyut * 1.26);

          const Daire = (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={`${puan}. seviye: ${opt.metin}`}
              style={[
                s.daire,
                {
                  width:boyut, height:boyut, borderRadius:boyut/2,
                  borderColor:     secili ? opt.renk : opt.border,
                  borderWidth:     secili ? 3 : 1.5,
                  backgroundColor: secili ? opt.renk : colors.surface,
                  ...(secili ? shadows.colored(opt.renk) : shadows.sm),
                },
              ]}
              onPress={() => onSecim(puan)}
              activeOpacity={0.75}
            >
              {secili && <View style={s.innerDot} />}
            </TouchableOpacity>
          );

          return (
            <View key={puan} style={s.daireSlot}>
              {secili && cevapIleIlerle ? (
                <Animated.View style={[
                  s.daireWrap,
                  { width:boyutG, height:boyutG, borderRadius:boyutG/2, transform:[{ scale:pulse }] },
                ]}>
                  <Animated.View pointerEvents="none" style={[
                    StyleSheet.absoluteFillObject,
                    { borderRadius:boyutG/2, borderWidth:3, borderColor:opt.renk,
                      opacity: glow.interpolate({ inputRange:[0,1], outputRange:[0,0.5] }) },
                  ]} />
                  {Daire}
                </Animated.View>
              ) : Daire}
            </View>
          );
        })}
      </View>

      {seciliDeger && (
        <Text style={[s.seciliYazi, { color: OPTS[seciliDeger].renk }]}>
          {OPTS[seciliDeger].metin}
        </Text>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  kart: {
    backgroundColor: colors.surface,
    borderRadius: radius.xxl,
    borderWidth: 1, borderColor: colors.border,
    padding: isDesktop ? space[9] : space[6],
    marginHorizontal: isDesktop ? 0 : space[5],
    gap: isDesktop ? space[6] : space[5],
    ...shadows.lg,
  },
  progressBar:  { height: 4, backgroundColor: colors.border, borderRadius: radius.full, overflow:'hidden' },
  progressFill: { height: 4, borderRadius: radius.full },
  soruText: {
    fontSize: isDesktop ? 20 : 17,
    color: colors.textPrimary,
    lineHeight: isDesktop ? 32 : 28,
    fontFamily: FONT, fontWeight:'600', letterSpacing:-0.2,
  },
  yonlendirme: { fontSize: 12, color: colors.textMuted, fontFamily: FONT, marginTop: -space[3] },
  labelRow:    { flexDirection:'row', justifyContent:'space-between', paddingHorizontal: space[1] },
  labelText:   { fontSize: isDesktop ? 13 : 12, fontWeight:'700', fontFamily: FONT },
  daireRow:    { flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal: isDesktop ? space[2] : space[1], paddingVertical: space[2] },
  daireSlot:   { alignItems:'center', justifyContent:'center', minWidth: isDesktop ? 64 : 54 },
  daireWrap:   { alignItems:'center', justifyContent:'center' },
  daire:       { alignItems:'center', justifyContent:'center' },
  innerDot:    { width:10, height:10, borderRadius:5, backgroundColor:'#fff' },
  seciliYazi:  { fontSize: 13, fontWeight:'700', textAlign:'center', fontFamily: FONT },
});
