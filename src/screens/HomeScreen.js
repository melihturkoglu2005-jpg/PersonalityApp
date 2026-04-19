import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, StatusBar,
  Dimensions, Platform, Animated, Easing, TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, space, shadows, radius } from '../theme/colors';
import TopNav from '../components/TopNav';
import AppBackground from '../components/AppBackground';
import SoftPressable from '../components/SoftPressable';
import ScreenFadeIn from '../components/ScreenFadeIn';
import Footer from '../components/Footer';
import AdPlaceholder from '../components/AdPlaceholder';
import SEOMeta from '../components/SEOMeta';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;
const FONT = Platform.select({ ios:'System', android:'sans-serif', web:"'Inter',system-ui,sans-serif" });
const MAX  = 720;

export default function HomeScreen({ navigation }) {
  const fadeAnim   = useRef(new Animated.Value(0)).current;
  const slideAnim  = useRef(new Animated.Value(24)).current;
  const cardsAnim  = useRef(new Animated.Value(0)).current;
  const kesfetAnim = useRef(new Animated.Value(0)).current;
  const ctaPulse   = useRef(new Animated.Value(1)).current;
  const [aktifTest, setAktifTest] = useState('mbti');

  useEffect(() => {
    if (isWeb) {
      let meta = document.querySelector('meta[name=viewport]');
      if (!meta) { meta = document.createElement('meta'); meta.name = 'viewport'; document.head.appendChild(meta); }
      meta.content = 'width=device-width, initial-scale=1, maximum-scale=1';
    }
    Animated.stagger(80, [
      Animated.timing(fadeAnim,   { toValue:1, duration:500, useNativeDriver:true }),
      Animated.timing(slideAnim,  { toValue:0, duration:440, useNativeDriver:true, easing:Easing.out(Easing.cubic) }),
      Animated.timing(cardsAnim,  { toValue:1, duration:520, useNativeDriver:true, easing:Easing.out(Easing.cubic) }),
      Animated.timing(kesfetAnim, { toValue:1, duration:560, useNativeDriver:true, easing:Easing.out(Easing.cubic) }),
    ]).start();

    const pulse = Animated.loop(Animated.sequence([
      Animated.timing(ctaPulse, { toValue:1.025, duration:1200, useNativeDriver:true, easing:Easing.inOut(Easing.quad) }),
      Animated.timing(ctaPulse, { toValue:1,     duration:1200, useNativeDriver:true, easing:Easing.inOut(Easing.quad) }),
    ]));
    pulse.start();
    return () => pulse.stop();
  }, []);

  const TESTLER = [
    { id:'mbti',      icon:'◎', label:'MBTI Testi',  alt:'16 kişilik tipi', screen:'MBTI',      renk:colors.primary,  bg:colors.primaryLight  },
    { id:'enneagram', icon:'◈', label:'Enneagram',   alt:'9 tip analizi',   screen:'Enneagram', renk:colors.violet,   bg:colors.violetLight   },
  ];

  const secili = TESTLER.find(t => t.id === aktifTest);

  return (
    <View style={s.root}>
      <SEOMeta />
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <AppBackground />
      <SafeAreaView style={s.safe}>
        <ScreenFadeIn>
          <TopNav navigation={navigation} />

          <Animated.ScrollView
            contentContainerStyle={s.scroll}
            showsVerticalScrollIndicator={false}
            style={{ opacity: fadeAnim }}
          >
            {/* ── Leaderboard reklam (üst) ── */}
            {isDesktop && <AdPlaceholder variant="leaderboard" />}

            {/* ── Hero ── */}
            <Animated.View style={[s.hero, { transform:[{ translateY: slideAnim }] }]}>
              <View style={s.heroBadge}>
                <Text style={s.heroBadgeText}>✦ Akademik · Ücretsiz · Kayıt Gerektirmez</Text>
              </View>
              <Text style={s.heroTitle}>Kişiliğini Derinlemesine{'\n'}Keşfet</Text>
              <Text style={s.heroSub}>
                Psikoloji ve tipoloji literatürüne dayanan, Harold Grant modeli ile
                bilişsel fonksiyon yığınınızı analiz eden platform.
              </Text>
            </Animated.View>

            {/* ── Test seçim kartları ── */}
            <Animated.View style={[s.testKartlar, {
              opacity: cardsAnim,
              transform:[{ translateY: cardsAnim.interpolate({ inputRange:[0,1], outputRange:[20,0] }) }],
            }]}>
              {TESTLER.map((t) => {
                const aktif = aktifTest === t.id;
                return (
                  <SoftPressable
                    key={t.id}
                    onPress={() => setAktifTest(t.id)}
                    style={[
                      s.testKart,
                      aktif && { backgroundColor: t.bg, borderColor: t.renk + '66' },
                      aktif && shadows.colored(t.renk),
                    ]}
                    containerStyle={s.testKartWrap}
                  >
                    <View style={[s.testKartIcon, {
                      backgroundColor: aktif ? t.renk + '20' : colors.surfaceLight,
                      borderColor: aktif ? t.renk + '44' : colors.border,
                    }]}>
                      <Text style={[s.testKartIconText, { color: aktif ? t.renk : colors.textMuted }]}>{t.icon}</Text>
                    </View>
                    <Text style={[s.testKartLabel, aktif && { color: t.renk }]}>{t.label}</Text>
                    <Text style={s.testKartAlt}>{t.alt}</Text>
                    {aktif && (
                      <View style={[s.testKartCheck, { backgroundColor: t.renk }]}>
                        <Text style={s.testKartCheckText}>✓</Text>
                      </View>
                    )}
                  </SoftPressable>
                );
              })}
            </Animated.View>

            {/* ── CTA Butonu ── */}
            <View style={s.ctaWrap}>
              <Animated.View style={{ width:'100%', transform:[{ scale: ctaPulse }] }}>
                <SoftPressable
                  style={s.ctaBtn}
                  onPress={() => navigation.navigate(secili.screen)}
                  containerStyle={{ width:'100%' }}
                  hoverScale={1.02}
                >
                  <LinearGradient
                    colors={[secili.renk, secili.id === 'mbti' ? colors.primaryDark : '#6D28D9']}
                    start={{ x:0, y:0 }} end={{ x:1, y:1 }}
                    style={s.ctaGradient}
                  >
                    <View style={s.ctaShine} />
                    <Text style={s.ctaBtnText}>{secili.label} Başlat  →</Text>
                  </LinearGradient>
                </SoftPressable>
              </Animated.View>
              <Text style={s.ctaAlt}>Ücretsiz · Kayıt gerektirmez · ~5 dakika</Text>
            </View>

            {/* ── Özellikler şeridi ── */}
            <Animated.View style={[s.featRow, {
              opacity: cardsAnim,
              transform:[{ translateY: cardsAnim.interpolate({ inputRange:[0,1], outputRange:[16,0] }) }],
            }]}>
              {[
                { icon:'🧠', label:'Bilişsel Fonksiyonlar', sub:'Harold Grant Modeli' },
                { icon:'📊', label:'Güven Skoru',           sub:'Algoritma analizi' },
                { icon:'📚', label:'Akademik Kaynaklar',    sub:'Literatüre dayalı' },
              ].map(f => (
                <View key={f.label} style={s.featItem}>
                  <Text style={s.featIcon}>{f.icon}</Text>
                  <Text style={s.featLabel}>{f.label}</Text>
                  <Text style={s.featSub}>{f.sub}</Text>
                </View>
              ))}
            </Animated.View>

            {/* ── Divider ── */}
            <View style={s.divider} />

            {/* ── Keşfet Başlığı ── */}
            <Animated.View style={[s.sectionHeader, {
              opacity: kesfetAnim,
              transform:[{ translateY: kesfetAnim.interpolate({ inputRange:[0,1], outputRange:[12,0] }) }],
            }]}>
              <Text style={s.sectionTitle}>Keşfet</Text>
              <Text style={s.sectionSub}>Kişilik tipolojisi hakkında daha fazlasını öğren</Text>
            </Animated.View>

            {/* ── Keşfet Kartları ── */}
            <Animated.View style={[s.kesfetGrid, {
              opacity: kesfetAnim,
              transform:[{ translateY: kesfetAnim.interpolate({ inputRange:[0,1], outputRange:[18,0] }) }],
            }]}>
              {[
                {
                  icon:'✦', iconBg:'#FEF3C7', color:'#10B981', borderColor:'#10B98133',
                  title:'Kişilik Tipleri', badge:'16 + 9', badgeBg:'#D1FAE5', badgeColor:'#059669',
                  desc:'MBTI ve Enneagram tiplerini keşfet, özelliklerini ve güçlü yönlerini öğren.',
                  link:'İncele →', screen:'KisilikTipleri',
                },
                {
                  icon:'◈', iconBg:'#EDE9FE', color:'#8B5CF6', borderColor:'#8b5cf633',
                  title:'Kaynaklar', badge:'Akademik', badgeBg:'#EDE9FE', badgeColor:'#7C3AED',
                  desc:'Psikoloji kitapları, araştırmalar ve temel kavramlar hakkında bilgi edin.',
                  link:'Görüntüle →', screen:'Kaynaklar',
                },
                {
                  icon:'◎', iconBg:'#E0F2FE', color:'#0EA5E9', borderColor:'#06b6d433',
                  title:'MBTI Testi', badge:'YENİ', badgeBg:'#FEF3C7', badgeColor:'#D97706',
                  desc:'Bilişsel fonksiyonlarına dayalı kapsamlı MBTI analizine hemen başla.',
                  link:'Başla →', screen:'MBTI',
                },
              ].map(k => (
                <SoftPressable
                  key={k.title}
                  style={[s.kesfetKart, { borderColor: k.borderColor }, shadows.colored(k.color.replace('#','').length===6 ? k.color : '#0EA5E9')]}
                  containerStyle={{ width:'100%' }}
                  onPress={() => navigation.navigate(k.screen)}
                >
                  <View style={[s.kesfetIcon, { backgroundColor: k.iconBg }]}>
                    <Text style={[s.kesfetIconText, { color: k.color }]}>{k.icon}</Text>
                  </View>
                  <View style={s.kesfetSag}>
                    <View style={s.kesfetUst}>
                      <Text style={s.kesfetBaslik}>{k.title}</Text>
                      <View style={[s.badge, { backgroundColor: k.badgeBg }]}>
                        <Text style={[s.badgeText, { color: k.badgeColor }]}>{k.badge}</Text>
                      </View>
                    </View>
                    <Text style={s.kesfetDesc}>{k.desc}</Text>
                    <Text style={[s.kesfetLink, { color: k.color }]}>{k.link}</Text>
                  </View>
                </SoftPressable>
              ))}
            </Animated.View>

            {/* ── SEO İçerik Bloğu: Harold Grant Modeli ── */}
            <View style={s.seoBlock}>
              <Text style={s.seoTitle}>Harold Grant Modeli Nedir?</Text>
              <Text style={s.seoText}>
                Harold Grant modeli, Jung'un bilişsel fonksiyonlarını sistematik bir yığın (stack) olarak organize eden
                tipoloji çerçevesidir. Her MBTI tipinin dört temel fonksiyonu — Dominant, Auxiliary, Tertiary ve
                Inferior — belirli bir sırayla çalışır ve bireyin dünyayı nasıl algıladığını, kararlarını nasıl
                aldığını belirler.{'\n\n'}
                Bu platformdaki testler, her soruyu doğrudan bir bilişsel fonksiyon ekseni (Ne/Si, Ni/Se, Ti/Fe,
                Fi/Te) üzerinden değerlendirerek standart MBTI anketlerinden daha nüanslı sonuçlar üretir.
              </Text>
            </View>

            {/* ── Inline reklam (içerik sonrası) ── */}
            <AdPlaceholder variant="inline" style={{ maxWidth: MAX, width:'100%' }} />

            <Footer navigation={navigation} />
          </Animated.ScrollView>
        </ScreenFadeIn>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex:1, backgroundColor: colors.background },
  safe: { flex:1 },
  scroll: {
    alignItems: 'center',
    paddingBottom: 0,
    paddingTop: isDesktop ? space[12] : space[8],
  },

  // Hero
  hero: {
    alignItems: 'center',
    paddingHorizontal: space[6],
    marginBottom: space[8],
    maxWidth: MAX, width:'100%',
  },
  heroBadge: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.full,
    paddingHorizontal: space[4], paddingVertical: space[1]+2,
    marginBottom: space[5],
  },
  heroBadgeText: {
    fontSize: 11, fontWeight:'700', color: colors.primaryDark,
    fontFamily: FONT, letterSpacing: 0.4,
  },
  heroTitle: {
    fontSize: isDesktop ? 48 : 32,
    fontWeight: '800',
    color: colors.textPrimary,
    fontFamily: FONT,
    textAlign: 'center',
    letterSpacing: -1,
    lineHeight: isDesktop ? 58 : 40,
    marginBottom: space[4],
  },
  heroSub: {
    fontSize: isDesktop ? 17 : 15,
    color: colors.textSecondary,
    fontFamily: FONT,
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 540,
  },

  // Test kartları
  testKartlar: {
    flexDirection: 'row', gap: space[3],
    paddingHorizontal: space[5],
    maxWidth: MAX, width:'100%',
    marginBottom: space[5],
  },
  testKartWrap: { flex:1 },
  testKart: {
    flex:1, alignItems:'center',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 2, borderColor: colors.border,
    padding: space[5], gap: space[2],
    position: 'relative',
    ...shadows.md,
  },
  testKartIcon: {
    width: 48, height: 48, borderRadius: radius.md,
    alignItems:'center', justifyContent:'center',
    borderWidth:1, marginBottom: space[1],
  },
  testKartIconText: { fontSize: 22 },
  testKartLabel:    { fontSize: 14, fontWeight:'600', color: colors.textPrimary, fontFamily: FONT, textAlign:'center' },
  testKartAlt:      { fontSize: 12, color: colors.textMuted, fontFamily: FONT, textAlign:'center' },
  testKartCheck:    {
    position:'absolute', top: space[2], right: space[2],
    width: 20, height: 20, borderRadius: radius.full,
    alignItems:'center', justifyContent:'center',
  },
  testKartCheckText: { color:'#fff', fontSize: 11, fontWeight:'800' },

  // CTA
  ctaWrap: {
    alignItems:'center', gap: space[3],
    maxWidth: MAX, width:'100%',
    paddingHorizontal: space[5], marginBottom: space[4],
  },
  ctaBtn: {
    width:'100%', borderRadius: radius.xl,
    overflow:'hidden',
    ...shadows.xl,
  },
  ctaGradient: {
    width:'100%', paddingVertical: space[5],
    alignItems:'center', justifyContent:'center',
    position:'relative',
  },
  ctaShine: {
    position:'absolute', top:0, left: space[4], right: space[4],
    height:1, backgroundColor:'rgba(255,255,255,0.5)',
  },
  ctaBtnText: {
    fontSize: 17, fontWeight:'700',
    color:'#fff', fontFamily: FONT, letterSpacing:0.3,
  },
  ctaAlt: { fontSize: 13, color: colors.textMuted, fontFamily: FONT },

  // Özellikler şeridi
  featRow: {
    flexDirection:'row', gap: space[3],
    maxWidth: MAX, width:'100%',
    paddingHorizontal: space[5],
    marginBottom: space[6],
  },
  featItem: {
    flex:1, alignItems:'center', gap: space[1],
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: space[4],
    borderWidth:1, borderColor: colors.border,
    ...shadows.sm,
  },
  featIcon:  { fontSize: 22, marginBottom: space[1] },
  featLabel: { fontSize: 12, fontWeight:'700', color: colors.textPrimary, fontFamily: FONT, textAlign:'center' },
  featSub:   { fontSize: 11, color: colors.textMuted, fontFamily: FONT, textAlign:'center' },

  // Divider
  divider: {
    height: 1, backgroundColor: colors.border,
    width:'100%', maxWidth: MAX,
    marginVertical: space[8],
  },

  // Section header
  sectionHeader: {
    paddingHorizontal: space[5],
    maxWidth: MAX, width:'100%',
    marginBottom: space[5],
  },
  sectionTitle: {
    fontSize: isDesktop ? 28 : 22,
    fontWeight:'800', color: colors.textPrimary,
    fontFamily: FONT, letterSpacing:-0.5,
    marginBottom: space[1],
  },
  sectionSub: {
    fontSize: 14, color: colors.textSecondary, fontFamily: FONT,
  },

  // Keşfet kartları
  kesfetGrid: {
    maxWidth: MAX, width:'100%',
    paddingHorizontal: space[5], gap: space[3],
    marginBottom: space[6],
  },
  kesfetKart: {
    flexDirection:'row', gap: space[4],
    backgroundColor: colors.surface,
    borderRadius: radius.xl, borderWidth: 1.5,
    padding: space[5],
    ...shadows.md,
  },
  kesfetIcon: {
    width: 48, height: 48, borderRadius: radius.md,
    alignItems:'center', justifyContent:'center', flexShrink:0,
  },
  kesfetIconText:  { fontSize: 22 },
  kesfetSag:       { flex:1, gap: space[1] },
  kesfetUst:       { flexDirection:'row', alignItems:'center', gap: space[2], marginBottom: space[1] },
  kesfetBaslik:    { fontSize: 15, fontWeight:'700', color: colors.textPrimary, fontFamily: FONT },
  kesfetDesc:      { fontSize: 13, color: colors.textSecondary, fontFamily: FONT, lineHeight: 20 },
  kesfetLink:      { fontSize: 13, fontWeight:'600', fontFamily: FONT, marginTop: space[1] },

  badge:     { borderRadius: radius.full, paddingHorizontal: space[2]+2, paddingVertical: 3 },
  badgeText: { fontSize: 10, fontWeight:'700', fontFamily: FONT, letterSpacing:0.3 },

  // SEO içerik bloğu
  seoBlock: {
    maxWidth: MAX, width:'100%',
    paddingHorizontal: space[5],
    marginBottom: space[8],
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.xl,
    borderWidth: 1, borderColor: colors.border,
    padding: space[6],
    ...shadows.sm,
  },
  seoTitle: {
    fontSize: isDesktop ? 20 : 17,
    fontWeight:'700', color: colors.textPrimary,
    fontFamily: FONT, marginBottom: space[3], letterSpacing:-0.3,
  },
  seoText: {
    fontSize: 14, color: colors.textSecondary,
    fontFamily: FONT, lineHeight: 24,
  },
});
