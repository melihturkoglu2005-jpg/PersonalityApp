import React, { useState, useMemo, useRef, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { FONT, SERIF } from '../theme/constants';
import { useLayout, COL, COL_GAP } from '../theme/useLayout';
import { personalityData, MBTI_TYPE_COLORS } from '../data/personalityData';
import { Screen, Wrap, PageHeader, Tabs, Rule, TextButton } from '../components/ui';
import Portrait from '../components/Portrait';
import { prefetchChars } from '../data/characterImage';

const ALL_TYPES = Object.keys(personalityData);

const GRUPLAR = [
  { id: 'NT', label: 'Analistler',  types: ['INTJ', 'INTP', 'ENTJ', 'ENTP'] },
  { id: 'NF', label: 'Diplomatlar', types: ['INFJ', 'INFP', 'ENFJ', 'ENFP'] },
  { id: 'SJ', label: 'Koruyucular', types: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'] },
  { id: 'SP', label: 'Kaşifler',    types: ['ISTP', 'ISFP', 'ESTP', 'ESFP'] },
];

function KarakterKarti({ char, ring, genis }) {
  const { colors } = useTheme();
  return (
    <View style={[s.kart, genis && s.kartGenis]}>
      <Portrait char={char} size={genis ? 88 : 72} ring={ring} />
      <View style={{ flex: 1, minWidth: 0, gap: 4 }}>
        <Text style={[s.karakterAd, { color: colors.textPrimary }]} numberOfLines={2}>{char.name}</Text>
        <Text style={[s.karakterKat, { color: colors.textSecondary }]}>{char.category}</Text>
        <Text style={[s.karakterAcik, { color: colors.textSecondary }]} numberOfLines={3}>{char.description}</Text>
      </View>
    </View>
  );
}

function TipSatiri({ type, onPress }) {
  const { colors } = useTheme();
  const { isNarrow, isDesktop } = useLayout();
  const tc = MBTI_TYPE_COLORS[type];
  const data = personalityData[type];
  const onizleme = data.characters.slice(0, 4);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${type} ${tc.label} karakterleri`}
      style={({ hovered }) => [s.satir, isNarrow && { flexWrap: 'wrap' }, { borderBottomColor: colors.border, gap: isDesktop ? COL_GAP : 16 }, hovered && { backgroundColor: colors.surfaceLight }]}
    >
      <View style={[s.kodKolon, isDesktop && { width: COL }]}>
        <View style={[s.nokta, { backgroundColor: tc.primary }]} />
        <Text style={[s.kod, { color: colors.textPrimary, fontSize: isNarrow ? 40 : 56 }]}>{type}</Text>
      </View>
      <View style={{ flex: 1, minWidth: 0, gap: 4 }}>
        <Text style={[s.tipAd, { color: colors.textPrimary }]}>{tc.label}</Text>
        {!isNarrow && <Text style={[s.tipAcik, { color: colors.textSecondary }]} numberOfLines={2}>{data.description}</Text>}
      </View>
      <View style={[s.yigin, isNarrow && { width: '100%', paddingLeft: 26 }]}>
        {onizleme.map((c, i) => (
          <View key={c.id} style={{ marginLeft: i === 0 ? 0 : -10, zIndex: 10 - i, borderRadius: 20, borderWidth: 2, borderColor: colors.background }}>
            <View style={{ borderRadius: 18 }}><Portrait char={c} size={36} /></View>
          </View>
        ))}
      </View>
    </Pressable>
  );
}

export default function CharacterGuideScreen({ navigation, route }) {
  const { colors } = useTheme();
  const { isDesktop } = useLayout();
  const initialType = route?.params?.initialType;
  const [aktifGrup, setAktifGrup] = useState(() => MBTI_TYPE_COLORS[initialType]?.group || 'NT');
  const [aktifTip, setAktifTip] = useState(() => personalityData[initialType] ? initialType : null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!personalityData[initialType]) return;
    setAktifGrup(MBTI_TYPE_COLORS[initialType].group);
    setAktifTip(initialType);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [initialType]);

  const grupTipleri = useMemo(
    () => GRUPLAR.find((g) => g.id === aktifGrup)?.types || [],
    [aktifGrup]
  );

  // Aktif gruptaki tüm fotoğrafları önceden yükle: tip açıldığında anında görünsün
  useEffect(() => {
    grupTipleri.forEach((t) => prefetchChars(personalityData[t].characters));
  }, [grupTipleri]);

  const seciliData   = aktifTip ? personalityData[aktifTip] : null;
  const seciliColors = aktifTip ? MBTI_TYPE_COLORS[aktifTip] : null;

  const totalCount = useMemo(
    () => ALL_TYPES.reduce((acc, t) => acc + personalityData[t].characters.length, 0),
    []
  );

  function handleGrup(id) {
    setAktifGrup(id);
    setAktifTip(null);
  }

  function handleTip(type) {
    if (aktifTip === type) {
      setAktifTip(null);
    } else {
      setAktifTip(type);
      setTimeout(() => scrollRef.current?.scrollTo({ y: 240, animated: true }), 80);
    }
  }

  return (
    <Screen navigation={navigation} active="CharacterGuide" scrollRef={scrollRef}>
      <PageHeader
        title="Karakter rehberi"
        sub={`16 MBTI tipine ait ${totalCount} tanınmış isim. Grubu seç, tipi bul, kimlerle aynı tipte olduğuna bak.`}
      />

      <Wrap>
        <Tabs
          accent={colors.textPrimary}
          value={aktifGrup}
          onChange={handleGrup}
          items={GRUPLAR.map((g) => ({ id: g.id, label: g.label }))}
        />
        <Rule />

        <View style={s.tipSecici}>
          {grupTipleri.map((type) => {
            const tc = MBTI_TYPE_COLORS[type];
            const on = aktifTip === type;
            return (
              <Pressable
                key={type}
                onPress={() => handleTip(type)}
                accessibilityRole="button"
                accessibilityState={{ selected: on }}
                style={[s.tipBtn, { borderColor: on ? colors.textPrimary : colors.border, backgroundColor: on ? colors.textPrimary : 'transparent' }]}
              >
                <View style={[s.tipBtnNokta, { backgroundColor: tc.primary }]} />
                <Text style={[s.tipBtnKod, { color: on ? '#FFFFFF' : colors.textPrimary }]}>{type}</Text>
                <Text style={[s.tipBtnAd, { color: on ? '#FFFFFFB3' : colors.textSecondary }]}>{tc.label}</Text>
              </Pressable>
            );
          })}
        </View>

        {!aktifTip ? (
          <View style={{ marginTop: 16 }}>
            {grupTipleri.map((type) => (
              <TipSatiri key={type} type={type} onPress={() => handleTip(type)} />
            ))}
          </View>
        ) : (
          <View style={{ marginTop: 32 }}>
            <View style={s.tipBaslikSatir}>
              <View style={{ flex: 1 }}>
                <Text style={[s.tipBaslikKod, { color: colors.textPrimary }]}>{aktifTip}</Text>
                <Text style={[s.tipBaslikAd, { color: colors.textPrimary }]}>{seciliColors.label}</Text>
                <Text style={[s.tipAcik, { color: colors.textSecondary, marginTop: 8, maxWidth: 520 }]}>{seciliData.description}</Text>
              </View>
              <TextButton label="Listeye dön" onPress={() => setAktifTip(null)} />
            </View>

            <Rule style={{ marginTop: 24 }} />

            <View style={s.izgara}>
              {seciliData.characters.map((char, idx) => (
                <View key={char.id} style={[s.hucre, isDesktop && s.hucreIki, { borderBottomColor: colors.border }]}>
                  <KarakterKarti char={char} ring={seciliColors.primary} genis={idx === 0} />
                </View>
              ))}
            </View>
          </View>
        )}
      </Wrap>
    </Screen>
  );
}

const s = StyleSheet.create({
  tipSecici: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 24 },
  tipBtn:    { flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 1, borderRadius: 999, paddingHorizontal: 16, paddingVertical: 9 },
  tipBtnNokta: { width: 8, height: 8, borderRadius: 4 },
  tipBtnKod: { fontFamily: FONT, fontSize: 14, fontWeight: '600' },
  tipBtnAd:  { fontFamily: FONT, fontSize: 13 },

  satir:  { flexDirection: 'row', alignItems: 'center', paddingVertical: 26, borderBottomWidth: 1 },
  kodKolon: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  nokta:  { width: 10, height: 10, borderRadius: 5 },
  kod:    { fontFamily: SERIF, fontWeight: '400', letterSpacing: -1.2 },
  tipAd:  { fontFamily: SERIF, fontSize: 26, letterSpacing: -0.4 },
  tipAcik:{ fontFamily: FONT, fontSize: 14, lineHeight: 22 },
  yigin:  { flexDirection: 'row', alignItems: 'center' },

  tipBaslikSatir: { flexDirection: 'row', alignItems: 'flex-start', gap: 16 },
  tipBaslikKod:   { fontFamily: SERIF, fontSize: 88, lineHeight: 88, letterSpacing: -3 },
  tipBaslikAd:    { fontFamily: SERIF, fontSize: 32, letterSpacing: -0.6, marginTop: 4 },

  izgara:  { flexDirection: 'row', flexWrap: 'wrap' },
  hucre:   { width: '100%', paddingVertical: 24, borderBottomWidth: 1 },
  hucreIki:{ width: '50%', paddingRight: COL_GAP / 2 },

  kart:       { flexDirection: 'row', alignItems: 'flex-start', gap: 18 },
  kartGenis:  {},
  karakterAd: { fontFamily: SERIF, fontSize: 26, letterSpacing: -0.4, lineHeight: 28 },
  karakterKat:{ fontFamily: FONT, fontSize: 13 },
  karakterAcik:{ fontFamily: FONT, fontSize: 14, lineHeight: 21, marginTop: 2 },
});
