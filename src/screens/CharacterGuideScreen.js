// CharacterGuideScreen.js — v3: Sitenin açık temasıyla tam uyumlu
import React, { useState, useMemo, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Dimensions, Platform,
  Image, Animated,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { personalityData, MBTI_TYPE_COLORS } from '../data/personalityData';
import TopNav from '../components/TopNav';
import AppBackground from '../components/AppBackground';
import ScreenFadeIn from '../components/ScreenFadeIn';
import Footer from '../components/Footer';

const { width: SCREEN_W } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = SCREEN_W >= 1024 && isWeb;
const MAX_W     = 720;
const FONT = Platform.select({
  ios: 'System', android: 'sans-serif',
  web: "'Nunito', 'Varela Round', system-ui, sans-serif",
});

const ALL_TYPES = Object.keys(personalityData);

const GRUPLAR = [
  { id: 'NT', label: 'Analistler',  types: ['INTJ','INTP','ENTJ','ENTP'] },
  { id: 'NF', label: 'Diplomatlar', types: ['INFJ','INFP','ENFJ','ENFP'] },
  { id: 'SJ', label: 'Koruyucular', types: ['ISTJ','ISFJ','ESTJ','ESFJ'] },
  { id: 'SP', label: 'Kaşifler',    types: ['ISTP','ISFP','ESTP','ESFP'] },
];

// ─── Tek Karakter Kartı ────────────────────────────────────────────────────
const CharacterCard = React.memo(function CharacterCard({ char, primary, isFirst }) {
  const [imgErr, setImgErr] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;

  const photoSize = isDesktop ? 80 : 68;

  return (
    <Animated.View style={[s.charCard, { transform: [{ scale }] }, isFirst && { borderColor: primary + '55' }]}>
      <TouchableOpacity
        style={s.charCardInner}
        onPressIn={() => Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, speed: 60 }).start()}
        onPressOut={() => Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50 }).start()}
        activeOpacity={1}
      >
        {/* Üst aksan çizgisi (ilk kart) */}
        {isFirst && <View style={[s.firstAccent, { backgroundColor: primary }]} />}

        {/* Fotoğraf */}
        <View style={[s.photoRing, {
          width: photoSize + 4, height: photoSize + 4,
          borderRadius: (photoSize + 4) / 2,
          borderColor: isFirst ? primary : primary + '44',
          borderWidth: isFirst ? 2.5 : 1.5,
        }]}>
          {!imgErr ? (
            <Image
              source={{ uri: char.imageUrl }}
              style={{ width: photoSize, height: photoSize, borderRadius: photoSize / 2 }}
              resizeMode="cover"
              onError={() => setImgErr(true)}
            />
          ) : (
            <View style={[s.photoFallback, {
              width: photoSize, height: photoSize,
              borderRadius: photoSize / 2,
              backgroundColor: primary + '15',
            }]}>
              <Text style={[s.photoFallbackText, { color: primary }]}>
                {char.name.charAt(0)}
              </Text>
            </View>
          )}
        </View>

        {/* #1 rozeti */}
        {isFirst && (
          <View style={[s.no1Badge, { backgroundColor: primary }]}>
            <Text style={s.no1Text}>★ 1</Text>
          </View>
        )}

        {/* Kategori */}
        <View style={[s.catBadge, { backgroundColor: primary + '15' }]}>
          <Text style={[s.catText, { color: primary }]}>{char.category}</Text>
        </View>

        {/* İsim */}
        <Text style={[s.charName, isFirst && { fontSize: isDesktop ? 16 : 14 }]} numberOfLines={2}>
          {char.name}
        </Text>

        {/* Açıklama (sadece büyük ekranda veya ilk kartta) */}
        <Text style={s.charDesc} numberOfLines={isFirst ? 3 : 2}>{char.description}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ─── Tip Liste Satırı ──────────────────────────────────────────────────────
function TypeRow({ type, onPress }) {
  const tc   = MBTI_TYPE_COLORS[type];
  const data = personalityData[type];
  const previews = data.characters.slice(0, 4);
  const [imgErrs, setImgErrs] = useState({});
  const AVATAR = isDesktop ? 40 : 34;

  return (
    <TouchableOpacity style={s.typeRow} onPress={onPress} activeOpacity={0.75}>
      {/* Sol */}
      <View style={s.typeRowLeft}>
        <View style={[s.typeCodeBg, { backgroundColor: tc.primary + '18' }]}>
          <Text style={[s.typeCode, { color: tc.primary }]}>{type}</Text>
        </View>
        <Text style={s.typeName}>{tc.label}</Text>
        <Text style={s.typeDesc} numberOfLines={2}>{data.description}</Text>
        <View style={[s.typeLink, { backgroundColor: tc.primary + '15' }]}>
          <Text style={[s.typeLinkText, { color: tc.primary }]}>
            {data.characters.length} karakter →
          </Text>
        </View>
      </View>

      {/* Sağ: yığılmış avatarlar */}
      <View style={s.typeRowRight}>
        <View style={s.avatarStack}>
          {previews.map((c, i) => (
            <View key={c.id} style={[s.stackAvatar, {
              width: AVATAR, height: AVATAR, borderRadius: AVATAR / 2,
              marginLeft: i === 0 ? 0 : -10,
              zIndex: 20 - i,
              borderColor: colors.surface,
            }]}>
              {!imgErrs[c.id] ? (
                <Image
                  source={{ uri: c.imageUrl }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                  onError={() => setImgErrs(p => ({ ...p, [c.id]: true }))}
                />
              ) : (
                <View style={[s.stackFallback, { backgroundColor: tc.primary + '20' }]}>
                  <Text style={[s.stackFallbackText, { color: tc.primary }]}>{c.name.charAt(0)}</Text>
                </View>
              )}
            </View>
          ))}
          {data.characters.length > 4 && (
            <View style={[s.stackExtra, {
              width: AVATAR, height: AVATAR, borderRadius: AVATAR / 2,
              marginLeft: -10, zIndex: 0,
              backgroundColor: tc.primary + '18',
              borderColor: tc.primary + '44',
            }]}>
              <Text style={[s.stackExtraText, { color: tc.primary }]}>
                +{data.characters.length - 4}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─── Ana Ekran ─────────────────────────────────────────────────────────────
export default function CharacterGuideScreen({ navigation }) {
  const { isDark, colors } = useTheme();
  const [aktifGrup, setAktifGrup] = useState('NT');
  const [aktifTip, setAktifTip]   = useState(null);
  const scrollRef = useRef(null);

  const grupTipleri = useMemo(
    () => GRUPLAR.find(g => g.id === aktifGrup)?.types || [],
    [aktifGrup]
  );

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
      setTimeout(() => scrollRef.current?.scrollTo({ y: 300, animated: true }), 80);
    }
  }

  return (
    <SafeAreaView style={[s.safe, { backgroundColor: colors.background }]}>
      <AppBackground />
      <ScreenFadeIn>
        <TopNav navigation={navigation} />

        <ScrollView
          ref={scrollRef}
          contentContainerStyle={s.scroll}
          showsVerticalScrollIndicator={false}
        >

          {/* ─ Başlık ─ */}
          <View style={s.hero}>
            <Text style={s.heroTitle}>Karakter Rehberi</Text>
            <Text style={s.heroSub}>
              16 MBTI tipine ait {totalCount} ünlü isim.
              Grubu seç, tipi bul, karakterleri keşfet.
            </Text>
          </View>

          {/* ─ Grup Tabları ─ */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={s.grupScroll}
            contentContainerStyle={s.grupRow}
          >
            {GRUPLAR.map(g => {
              const aktif = aktifGrup === g.id;
              const renk  = MBTI_TYPE_COLORS[g.types[0]].primary;
              return (
                <TouchableOpacity
                  key={g.id}
                  style={[s.grupBtn, aktif && { backgroundColor: renk + '18', borderColor: renk }]}
                  onPress={() => handleGrup(g.id)}
                  activeOpacity={0.7}
                >
                  <Text style={[s.grupText, aktif && { color: renk, fontWeight: '600' }]}>
                    {g.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* ─ Tip Seçici ─ */}
          <View style={s.tipRow}>
            {grupTipleri.map(type => {
              const tc    = MBTI_TYPE_COLORS[type];
              const aktif = aktifTip === type;
              return (
                <TouchableOpacity
                  key={type}
                  style={[s.tipBtn, aktif && { backgroundColor: tc.primary, borderColor: tc.primary }]}
                  onPress={() => handleTip(type)}
                  activeOpacity={0.75}
                >
                  <Text style={[s.tipBtnCode, aktif && { color: '#fff' }]}>{type}</Text>
                  <Text style={[s.tipBtnLabel, aktif && { color: '#ffffffCC' }]}>{tc.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* ─ İçerik ─ */}
          {!aktifTip ? (
            /* Liste görünümü */
            <View style={s.liste}>
              {grupTipleri.map(type => (
                <TypeRow key={type} type={type} onPress={() => handleTip(type)} />
              ))}
            </View>
          ) : (
            /* Grid görünümü */
            <View style={s.gridSection}>

              {/* Tip başlığı */}
              <View style={[s.tipHeader, { borderLeftColor: seciliColors.primary }]}>
                <View style={[s.tipHeaderBadge, { backgroundColor: seciliColors.primary + '18' }]}>
                  <Text style={[s.tipHeaderCode, { color: seciliColors.primary }]}>{aktifTip}</Text>
                </View>
                <View style={s.tipHeaderInfo}>
                  <Text style={s.tipHeaderName}>{seciliColors.label}</Text>
                  <Text style={s.tipHeaderDesc}>{seciliData.description}</Text>
                </View>
                <TouchableOpacity style={s.kapatBtn} onPress={() => setAktifTip(null)}>
                  <Text style={s.kapatText}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Kartlar */}
              <View style={s.cardGrid}>
                {seciliData.characters.map((char, idx) => (
                  <View key={char.id} style={s.cardCell}>
                    <CharacterCard
                      char={char}
                      primary={seciliColors.primary}
                      isFirst={idx === 0}
                    />
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={s.divider} />
          <Footer navigation={navigation} />
        </ScrollView>
      </ScreenFadeIn>
    </SafeAreaView>
  );
}

// ─── StyleSheet ────────────────────────────────────────────────────────────
const AVATAR_SIZE = isDesktop ? 40 : 34;

const s = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: colors.background },
  scroll: { alignItems: 'center', paddingBottom: 32, paddingTop: isDesktop ? 32 : 20 },

  // Hero — HomeScreen heroTitle/heroSub ile birebir
  hero: { alignItems: 'center', paddingHorizontal: 20, marginBottom: 20, maxWidth: MAX_W, width: '100%' },
  heroTitle: {
    fontSize: isDesktop ? 32 : 24, fontWeight: '700',
    color: colors.textPrimary, fontFamily: FONT,
    textAlign: 'center', letterSpacing: -0.4, marginBottom: 8,
  },
  heroSub: {
    fontSize: isDesktop ? 15 : 14, color: colors.textSecondary,
    fontFamily: FONT, textAlign: 'center', lineHeight: 22,
  },

  // Grup tab — KisilikTipleriScreen ile birebir
  grupScroll: { maxWidth: MAX_W, width: '100%' },
  grupRow:    { paddingHorizontal: 20, gap: 8, paddingBottom: 14 },
  grupBtn: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
    borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.surface,
  },
  grupText: { fontSize: 13, color: colors.textSecondary, fontFamily: FONT },

  // Tip seçici butonlar — 4'lü sıra, testKart stili
  tipRow: {
    flexDirection: 'row', gap: 8,
    paddingHorizontal: 20, maxWidth: MAX_W, width: '100%', marginBottom: 16,
  },
  tipBtn: {
    flex: 1, alignItems: 'center', paddingVertical: 10, paddingHorizontal: 4,
    borderRadius: 12, borderWidth: 1.5, borderColor: colors.border,
    backgroundColor: colors.surface, gap: 2,
  },
  tipBtnCode:  { fontSize: 13, fontWeight: '800', color: colors.textPrimary, fontFamily: FONT },
  tipBtnLabel: { fontSize: 9, color: colors.textMuted, fontFamily: FONT, textAlign: 'center' },

  // Liste
  liste: { maxWidth: MAX_W, width: '100%', paddingHorizontal: 20, gap: 10 },

  // Tip satırı — HomeScreen kesfetKart ile birebir
  typeRow: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: colors.surface,
    borderRadius: 16, borderWidth: 2, borderColor: colors.border, borderBottomWidth: 5,
    padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  typeRowLeft:  { flex: 1, gap: 5 },
  typeRowRight: { alignItems: 'center', justifyContent: 'center', minWidth: isDesktop ? 130 : 110 },

  typeCodeBg:   { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  typeCode:     { fontSize: 13, fontWeight: '800', fontFamily: FONT },
  typeName:     { fontSize: 15, fontWeight: '600', color: colors.textPrimary, fontFamily: FONT },
  typeDesc:     { fontSize: 12, color: colors.textSecondary, fontFamily: FONT, lineHeight: 17 },
  typeLink:     { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginTop: 2 },
  typeLinkText: { fontSize: 11, fontWeight: '700', fontFamily: FONT },

  avatarStack: { flexDirection: 'row', alignItems: 'center' },
  stackAvatar: { borderWidth: 2, overflow: 'hidden', backgroundColor: colors.surfaceLight },
  stackFallback: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
  stackFallbackText: { fontSize: 13, fontWeight: '700', fontFamily: FONT },
  stackExtra: { borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  stackExtraText: { fontSize: 11, fontWeight: '700', fontFamily: FONT },

  // Grid bölümü
  gridSection: { maxWidth: MAX_W, width: '100%', paddingHorizontal: 20 },

  // Tip başlığı — KisilikTipleri tipKart ile uyumlu
  tipHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 14, borderWidth: 2, borderColor: colors.border, borderBottomWidth: 5,
    borderLeftWidth: 4, paddingLeft: 16, paddingRight: 12,
    paddingVertical: 14, marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  tipHeaderBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  tipHeaderCode:  { fontSize: 18, fontWeight: '900', fontFamily: FONT },
  tipHeaderInfo:  { flex: 1 },
  tipHeaderName:  { fontSize: 15, fontWeight: '800', color: colors.textPrimary, fontFamily: FONT },
  tipHeaderDesc:  { fontSize: 12, color: colors.textSecondary, fontFamily: FONT, marginTop: 2 },
  kapatBtn: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center', justifyContent: 'center',
  },
  kapatText: { fontSize: 11, color: colors.textMuted, fontFamily: FONT },

  // Kart grid — masaüstü 3 kolon, mobil 2 kolon
  cardGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  cardCell: {
    width: isDesktop ? '31.5%' : '47.5%',
    flexGrow: 1,
  },

  // Karakter kartı — colors.surface bazlı, site ile uyumlu
  charCard: {
    backgroundColor: colors.surface,
    borderRadius: 16, borderWidth: 2, borderColor: colors.border, borderBottomWidth: 5,
    overflow: 'hidden', position: 'relative',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  firstAccent: { height: 3, position: 'absolute', top: 0, left: 0, right: 0 },
  charCardInner: { padding: 16, alignItems: 'center', gap: 8 },

  photoRing: { overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  photoFallback: { alignItems: 'center', justifyContent: 'center' },
  photoFallbackText: { fontSize: 28, fontWeight: '900', fontFamily: FONT },

  no1Badge: {
    position: 'absolute', top: 10, right: 10,
    paddingHorizontal: 7, paddingVertical: 3, borderRadius: 8,
  },
  no1Text: { fontSize: 9, fontWeight: '800', color: '#fff', fontFamily: FONT },

  catBadge:  { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  catText:   { fontSize: 9, fontWeight: '700', fontFamily: FONT },

  charName: {
    fontSize: isDesktop ? 14 : 13, fontWeight: '700',
    color: colors.textPrimary, textAlign: 'center',
    fontFamily: FONT, lineHeight: 18,
  },
  charDesc: {
    fontSize: 11, color: colors.textSecondary,
    textAlign: 'center', lineHeight: 16, fontFamily: FONT,
  },

  divider: { height: 1, backgroundColor: colors.border, width: '100%', maxWidth: MAX_W, marginTop: 32, marginBottom: 8 },
});
