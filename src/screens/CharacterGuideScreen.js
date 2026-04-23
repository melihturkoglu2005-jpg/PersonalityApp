// CharacterGuideScreen.js — v2: Premium redesign
// Gerçek fotoğraflar, mükemmel grid sistemi, cinematic dark theme

import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
  ScrollView, Dimensions, Platform, Image, Animated,
  FlatList,
} from 'react-native';
import { colors } from '../theme/colors';
import { personalityData, MBTI_TYPE_COLORS, getAllCharacters } from '../data/personalityData';
import TopNav from '../components/TopNav';
import AppBackground from '../components/AppBackground';
import ScreenFadeIn from '../components/ScreenFadeIn';
import Footer from '../components/Footer';

const { width: SCREEN_W } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isDesktop = SCREEN_W >= 1024 && isWeb;
const isTablet  = SCREEN_W >= 600 && SCREEN_W < 1024;

const FONT_DISPLAY = Platform.select({ web: "'DM Sans', system-ui, sans-serif", default: undefined });
const FONT_BODY    = Platform.select({ web: "'Inter', system-ui, sans-serif",    default: undefined });

// Grid sütun sayısı
const COLS = isDesktop ? 4 : isTablet ? 3 : 2;
const HPAD = isDesktop ? 40 : 16;
const GAP  = 12;
const CARD_W = (SCREEN_W - HPAD * 2 - GAP * (COLS - 1)) / COLS;
const CARD_H = CARD_W * 1.45; // portrait oranı

const ALL_TYPES = Object.keys(personalityData);
const GROUP_LABELS = { NT: 'Analistler', NF: 'Diplomatlar', SJ: 'Bekçiler', SP: 'Kaşifler' };

// ─── Tek Karakter Kartı ────────────────────────────────────────────────────
const CharacterCard = React.memo(function CharacterCard({ character, typeColor, rank }) {
  const scale   = useRef(new Animated.Value(1)).current;
  const overlay = useRef(new Animated.Value(0)).current;
  const [imgOk, setImgOk] = useState(true);
  const [imgLoading, setImgLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const timeoutRef = useRef(null);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const pressIn = useCallback(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, speed: 50, bounciness: 4 }),
      Animated.timing(overlay, { toValue: 1, duration: 150, useNativeDriver: false }),
    ]).start();
  }, []);

  const pressOut = useCallback(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 40, bounciness: 6 }),
      Animated.timing(overlay, { toValue: 0, duration: 200, useNativeDriver: false }),
    ]).start();
  }, []);

  const overlayBg = overlay.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.35)'],
  });

  return (
    <Animated.View style={[s.cardOuter, { width: CARD_W, height: CARD_H, transform: [{ scale }] }]}>
      <TouchableOpacity
        style={s.cardTouch}
        onPressIn={pressIn}
        onPressOut={pressOut}
        activeOpacity={1}
      >
        {/* Fotoğraf tam arka plan */}
        {imgOk && character.imageUrl ? (
          <>
            <Image
              source={{ uri: character.imageUrl }}
              style={s.cardPhoto}
              onError={() => {
                console.log('Image load error for:', character.name, 'Retry count:', retryCount);
                if (retryCount < 2) {
                  // Retry up to 2 times
                  setRetryCount(retryCount + 1);
                  setTimeout(() => {
                    setImgOk(true);
                    setImgLoading(true);
                  }, 1000 * (retryCount + 1)); // Exponential backoff
                } else {
                  setImgOk(false);
                  setImgLoading(false);
                }
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                }
              }}
              onLoad={() => {
                console.log('Image loaded successfully for:', character.name);
                setImgLoading(false);
                setRetryCount(0); // Reset retry count on success
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                }
              }}
              onLoadStart={() => {
                setImgLoading(true);
                // Set timeout for slow loading images
                timeoutRef.current = setTimeout(() => {
                  console.log('Image timeout for:', character.name);
                  setImgOk(false);
                  setImgLoading(false);
                }, 8000); // 8 second timeout
              }}
              resizeMode="cover"
            />
            {imgLoading && (
              <View style={[s.cardPhotoFallback, { backgroundColor: typeColor.bg }]}>
                <Text style={[s.fallbackInitial, { color: typeColor.primary }]}>
                  {character.name.charAt(0)}
                </Text>
              </View>
            )}
          </>
        ) : (
          <View style={[s.cardPhotoFallback, { backgroundColor: typeColor.bg }]}>
            <Text style={[s.fallbackInitial, { color: typeColor.primary }]}>
              {character.name.charAt(0)}
            </Text>
          </View>
        )}

        {/* Gradient overlay (CSS-side) */}
        <View style={[s.cardGradient, { backgroundColor: typeColor.bg + '20' }]}
              pointerEvents="none" />

        {/* Hover overlay */}
        <Animated.View style={[s.cardHoverOverlay, { backgroundColor: overlayBg }]}
                       pointerEvents="none" />

        {/* Üst: Tip rozeti + sıra */}
        <View style={s.cardTop}>
          {rank === 0 && (
            <View style={[s.rankBadge, { backgroundColor: typeColor.primary }]}>
              <Text style={s.rankText}>★ 1</Text>
            </View>
          )}
        </View>

        {/* Alt: İsim ve kategori */}
        <View style={s.cardBottom}>
          <View style={[s.categoryPill, { backgroundColor: typeColor.primary + '30', borderColor: typeColor.primary + '55' }]}>
            <Text style={[s.categoryPillText, { color: typeColor.primary }]}>{character.category}</Text>
          </View>
          <Text style={s.cardName} numberOfLines={2}>{character.name}</Text>
          <Text style={s.cardDesc} numberOfLines={2}>{character.description}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ─── Filtre Chip ────────────────────────────────────────────────────────────
function FilterChip({ label, isActive, color, onPress }) {
  return (
    <TouchableOpacity
      style={[s.chip, isActive && { backgroundColor: color + '25', borderColor: color }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {isActive && <View style={[s.chipDot, { backgroundColor: color }]} />}
      <Text style={[s.chipText, isActive && { color, fontWeight: '700' }]}>{label}</Text>
    </TouchableOpacity>
  );
}

// ─── Ana Ekran ──────────────────────────────────────────────────────────────
export default function CharacterGuideScreen({ navigation }) {
  const [selectedType, setSelectedType] = useState(null);
  const scrollRef = useRef(null);

  // Gruplara göre tipleri organize et
  const typesByGroup = useMemo(() => {
    const map = {};
    ALL_TYPES.forEach((t) => {
      const g = MBTI_TYPE_COLORS[t].group;
      if (!map[g]) map[g] = [];
      map[g].push(t);
    });
    return map;
  }, []);

  const currentCharacters = useMemo(() => {
    if (selectedType) return personalityData[selectedType]?.characters || [];
    return [];
  }, [selectedType]);

  function handleTypeSelect(type) {
    if (selectedType === type) {
      setSelectedType(null);
    } else {
      setSelectedType(type);
      setTimeout(() => scrollRef.current?.scrollTo({ y: 340, animated: true }), 80);
    }
  }

  const typeColor = selectedType ? MBTI_TYPE_COLORS[selectedType] : null;
  const totalCount = ALL_TYPES.reduce((s, t) => s + personalityData[t].characters.length, 0);

  return (
    <SafeAreaView style={s.safe}>
      {/* Karanlık arka plan */}
      <View style={s.darkBg} />

      <ScreenFadeIn>
        <TopNav navigation={navigation} />

        <ScrollView ref={scrollRef} contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

          {/* Hero başlık */}
          <View style={s.hero}>
            <View style={s.heroBadge}>
              <Text style={s.heroBadgeText}>16 Tip · {totalCount} Karakter</Text>
            </View>
            <Text style={s.heroTitle}>Ünlüler &{'\n'}Kurgusal Karakterler</Text>
            <Text style={s.heroSub}>
              Dünyaca tanınan isimler ve sevilen karakterlerle{'\n'}kişilik tiplerini keşfet.
            </Text>
          </View>

          {/* Filtre paneli */}
          <View style={s.filterPanel}>
            {/* Tümü butonu */}
            <FilterChip
              label={`Tümü (${totalCount})`}
              isActive={!selectedType}
              color="#94A3B8"
              onPress={() => setSelectedType(null)}
            />
            <View style={s.filterDivider} />

            {/* Grup bazlı tipler */}
            {Object.entries(typesByGroup).map(([group, types]) => (
              <View key={group} style={s.filterGroup}>
                <Text style={s.filterGroupLabel}>{GROUP_LABELS[group]}</Text>
                <View style={s.filterRow}>
                  {types.map((type) => {
                    const tc = MBTI_TYPE_COLORS[type];
                    return (
                      <FilterChip
                        key={type}
                        label={type}
                        isActive={selectedType === type}
                        color={tc.primary}
                        onPress={() => handleTypeSelect(type)}
                      />
                    );
                  })}
                </View>
              </View>
            ))}
          </View>

          {/* Seçili tip içeriği */}
          {selectedType && typeColor ? (
            <View style={s.typeSection}>
              {/* Tip header */}
              <View style={[s.typeHeader, { borderLeftColor: typeColor.primary, borderLeftWidth: 4 }]}>
                <View style={s.typeHeaderLeft}>
                  <View style={[s.typeLabelBig, { backgroundColor: typeColor.primary + '20' }]}>
                    <Text style={[s.typeLabelBigText, { color: typeColor.primary }]}>{selectedType}</Text>
                  </View>
                  <View>
                    <Text style={s.typeNameBig}>{typeColor.label}</Text>
                    <Text style={s.typeDescBig}>{personalityData[selectedType].description}</Text>
                  </View>
                </View>
                <Text style={[s.typeCount, { color: typeColor.primary }]}>
                  {currentCharacters.length} kişi
                </Text>
              </View>

              {/* Grid */}
              <View style={s.grid}>
                {currentCharacters.map((char, idx) => (
                  <CharacterCard
                    key={char.id}
                    character={char}
                    typeColor={typeColor}
                    rank={idx}
                  />
                ))}
              </View>
            </View>
          ) : (
            /* Tüm tipler özet görünümü */
            <View style={s.allTypesView}>
              {ALL_TYPES.map((type) => {
                const tc = MBTI_TYPE_COLORS[type];
                const chars = personalityData[type].characters.slice(0, 3);
                return (
                  <TouchableOpacity
                    key={type}
                    style={[s.typeRow, { borderColor: tc.primary + '30' }]}
                    onPress={() => handleTypeSelect(type)}
                    activeOpacity={0.8}
                  >
                    {/* Sol: Tip bilgisi */}
                    <View style={[s.typeRowLeft, { borderRightColor: tc.primary + '30' }]}>
                      <View style={[s.typeRowBadge, { backgroundColor: tc.primary + '20' }]}>
                        <Text style={[s.typeRowBadgeText, { color: tc.primary }]}>{type}</Text>
                      </View>
                      <Text style={s.typeRowName}>{tc.label}</Text>
                      <Text style={s.typeRowDesc} numberOfLines={2}>
                        {personalityData[type].description}
                      </Text>
                      <Text style={[s.typeRowMore, { color: tc.primary }]}>
                        Tüm karakterleri gör →
                      </Text>
                    </View>

                    {/* Sağ: Küçük önizleme fotoğraflar */}
                    <View style={s.typeRowPhotos}>
                      {chars.map((char, idx) => (
                        <View
                          key={char.id}
                          style={[
                            s.miniPhoto,
                            { borderColor: tc.primary + '55', zIndex: 10 - idx, marginLeft: idx > 0 ? -14 : 0 },
                          ]}
                        >
                          <Image
                            source={{ uri: char.imageUrl }}
                            style={s.miniPhotoImg}
                            resizeMode="cover"
                          />
                        </View>
                      ))}
                      <View style={[s.miniPhotoCount, { backgroundColor: tc.primary + '20', borderColor: tc.primary + '44', marginLeft: -14, zIndex: 0 }]}>
                        <Text style={[s.miniPhotoCountText, { color: tc.primary }]}>
                          +{personalityData[type].characters.length - 3}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          <Footer navigation={navigation} />
        </ScrollView>
      </ScreenFadeIn>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  darkBg: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.background },


  scroll: { paddingBottom: 60 },

  // Hero
  hero: { alignItems: 'center', paddingTop: 20, paddingBottom: 24, paddingHorizontal: 20, maxWidth: 720, width: '100%', alignSelf: 'center' },
  heroBadge: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surfaceLight, borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, marginBottom: 20,
  },
  heroBadgeText: { fontSize: 12, color: colors.textMuted, fontWeight: '600', fontFamily: FONT_BODY },
  heroTitle: {
    fontSize: isDesktop ? 48 : 34, fontWeight: '800', color: colors.textPrimary,
    textAlign: 'center', lineHeight: isDesktop ? 58 : 42,
    fontFamily: FONT_DISPLAY, marginBottom: 14,
    letterSpacing: -0.5,
  },
  heroSub: {
    fontSize: 15, color: colors.textSecondary, textAlign: 'center',
    lineHeight: 24, fontFamily: FONT_BODY,
  },

  // Filtre paneli
  filterPanel: {
    marginHorizontal: 20, marginBottom: 24,
    backgroundColor: colors.surface, borderRadius: 16,
    borderWidth: 1, borderColor: colors.border,
    padding: 16, maxWidth: 720, width: '100%', alignSelf: 'center',
  },
  filterDivider: { height: 1, backgroundColor: colors.border, marginVertical: 14 },
  filterGroup: { marginBottom: 12 },
  filterGroupLabel: {
    fontSize: 10, fontWeight: '700', color: colors.textMuted,
    letterSpacing: 1.5, textTransform: 'uppercase',
    fontFamily: FONT_BODY, marginBottom: 8,
  },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },

  // Chip
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 20, borderWidth: 1, borderColor: colors.border,
    backgroundColor: colors.surface, marginBottom: 2,
  },
  chipDot: { width: 5, height: 5, borderRadius: 3 },
  chipText: { fontSize: 12, color: colors.textSecondary, fontWeight: '500', fontFamily: FONT_BODY },

  // Seçili tip header
  typeSection: { paddingHorizontal: 20, maxWidth: 720, width: '100%', alignSelf: 'center' },
  typeHeader: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16, paddingVertical: 16,
    marginBottom: 20,
    backgroundColor: colors.surface, borderRadius: 12,
    borderWidth: 1, borderColor: colors.border,
  },
  typeHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  typeLabelBig: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  typeLabelBigText: { fontSize: 18, fontWeight: '900', fontFamily: FONT_DISPLAY },
  typeNameBig: { fontSize: 17, fontWeight: '700', color: colors.textPrimary, fontFamily: FONT_DISPLAY },
  typeDescBig: { fontSize: 12, color: colors.textSecondary, marginTop: 2, fontFamily: FONT_BODY },
  typeCount: { fontSize: 12, fontWeight: '700', paddingRight: 16, fontFamily: FONT_BODY },

  // Karakter Grid
  grid: {
    flexDirection: 'row', flexWrap: 'wrap',
    gap: GAP,
  },

  // Kart
  cardOuter: {
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTouch: { flex: 1 },
  cardPhoto: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  cardPhotoFallback: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center', justifyContent: 'center',
  },
  fallbackInitial: { fontSize: 52, fontWeight: '900', fontFamily: FONT_DISPLAY, color: colors.textPrimary },
  cardGradient: {
    ...StyleSheet.absoluteFillObject,
    // Sadece alt %40'ini kaplayan daha ince gradient efekti
    top: '60%',
  },
  cardHoverOverlay: { ...StyleSheet.absoluteFillObject },

  cardTop: {
    position: 'absolute', top: 10, left: 10, right: 10,
    flexDirection: 'row', justifyContent: 'flex-end',
  },
  rankBadge: {
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 8,
  },
  rankText: { fontSize: 10, fontWeight: '800', color: '#fff', fontFamily: FONT_BODY },

  cardBottom: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 12,
  },
  categoryPill: {
    alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 8, borderWidth: 1, marginBottom: 6,
  },
  categoryPillText: { fontSize: 9, fontWeight: '700', fontFamily: FONT_BODY },
  cardName: {
    fontSize: CARD_W > 140 ? 14 : 12,
    fontWeight: '800', color: colors.textPrimary,
    fontFamily: FONT_DISPLAY, marginBottom: 3,
    lineHeight: CARD_W > 140 ? 18 : 16,
  },
  cardDesc: {
    fontSize: 10, color: colors.textMuted,
    fontFamily: FONT_BODY, lineHeight: 14,
  },

  // Tüm tipler listesi
  allTypesView: { paddingHorizontal: 20, gap: 10, maxWidth: 720, width: '100%', alignSelf: 'center' },
  typeRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 14, borderWidth: 1,
    overflow: 'hidden', alignItems: 'center',
    borderColor: colors.border,
  },
  typeRowLeft: {
    flex: 1, padding: 16,
    borderRightWidth: 1,
  },
  typeRowBadge: {
    alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 8, marginBottom: 8,
  },
  typeRowBadgeText: { fontSize: 13, fontWeight: '800', fontFamily: FONT_DISPLAY },
  typeRowName: { fontSize: 16, fontWeight: '700', color: colors.textPrimary, fontFamily: FONT_DISPLAY, marginBottom: 4 },
  typeRowDesc: { fontSize: 12, color: colors.textSecondary, fontFamily: FONT_BODY, lineHeight: 17, marginBottom: 8 },
  typeRowMore: { fontSize: 11, fontWeight: '700', fontFamily: FONT_BODY },

  typeRowPhotos: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 20,
    minWidth: isDesktop ? 140 : 110,
    justifyContent: 'center',
  },
  miniPhoto: {
    width: isDesktop ? 44 : 38, height: isDesktop ? 44 : 38,
    borderRadius: isDesktop ? 22 : 19,
    borderWidth: 2, overflow: 'hidden',
    backgroundColor: colors.surfaceLight,
  },
  miniPhotoImg: { width: '100%', height: '100%' },
  miniPhotoCount: {
    width: isDesktop ? 44 : 38, height: isDesktop ? 44 : 38,
    borderRadius: isDesktop ? 22 : 19,
    borderWidth: 2,
    alignItems: 'center', justifyContent: 'center',
  },
  miniPhotoCountText: { fontSize: 11, fontWeight: '800', fontFamily: FONT_BODY },
});
