import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Dimensions, Platform, Animated,
} from 'react-native';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;

const FONT_DISPLAY = Platform.select({ ios: 'Georgia', android: 'serif', web: "'Cormorant Garamond', Georgia, serif" });
const FONT_BODY    = Platform.select({ ios: 'System', android: 'sans-serif', web: "'DM Sans', system-ui, sans-serif" });

const MBTI_TIPLER = [
  { tip: 'INTJ', isim: 'Mimar', emoji: '🏛️', renk: '#5B57E6', aciklama: 'Bağımsız, kararlı ve uzun vadeli stratejik düşüncesiyle vizyoner liderler.', ozellikler: ['Analitik', 'Bağımsız', 'Kararlı', 'Stratejik'], grup: 'Analistler' },
  { tip: 'INTP', isim: 'Mantıkçı', emoji: '🔬', renk: '#5B57E6', aciklama: 'Teorik ve soyut düşüncede mükemmel, meraklı ve yenilikçi düşünürler.', ozellikler: ['Meraklı', 'Yaratıcı', 'Nesnel', 'Analitik'], grup: 'Analistler' },
  { tip: 'ENTJ', isim: 'Komutan', emoji: '⚡', renk: '#5B57E6', aciklama: 'Doğal liderler. Güçlü irade ve kararlılıkla hedeflerine ulaşırlar.', ozellikler: ['Lider', 'Kararlı', 'Stratejik', 'Özgüvenli'], grup: 'Analistler' },
  { tip: 'ENTP', isim: 'Tartışmacı', emoji: '💡', renk: '#5B57E6', aciklama: 'Zeki ve meraklı, alışılmışın dışında düşünen yenilikçi tartışmacılar.', ozellikler: ['Yenilikçi', 'Kurnaz', 'Karizmatik', 'Doğrudan'], grup: 'Analistler' },
  { tip: 'INFJ', isim: 'Savunucu', emoji: '🌿', renk: '#0D9E75', aciklama: 'Derin sezgiye sahip idealistler. İnsanlara ilham verme konusunda uzmandırlar.', ozellikler: ['Sezgisel', 'İdealist', 'İlkeli', 'Tutkulu'], grup: 'Diplomatlar' },
  { tip: 'INFP', isim: 'Arabulucu', emoji: '🎨', renk: '#0D9E75', aciklama: 'Empatik ve yaratıcı, değerlerine derin bağlılıkla yaşayan idealistler.', ozellikler: ['Empatik', 'Yaratıcı', 'İdealist', 'Özgün'], grup: 'Diplomatlar' },
  { tip: 'ENFJ', isim: 'Kahraman', emoji: '🌟', renk: '#0D9E75', aciklama: 'Karizmatik ve ilham verici liderler. İnsanları bir araya getirmekte ustadırlar.', ozellikler: ['Karizmatik', 'Empatik', 'Güvenilir', 'Doğal Lider'], grup: 'Diplomatlar' },
  { tip: 'ENFP', isim: 'Kampanyacı', emoji: '🎭', renk: '#0D9E75', aciklama: 'Enerjik ve yaratıcı, özgür ruhlu ve sosyal bağlantı kuran iyimserler.', ozellikler: ['Coşkulu', 'Yaratıcı', 'Sosyal', 'İyimser'], grup: 'Diplomatlar' },
  { tip: 'ISTJ', isim: 'Lojistikçi', emoji: '📋', renk: '#E8692A', aciklama: 'Pratik ve gerçekçi, güvenilirlik ve düzen konusunda örnek teşkil ederler.', ozellikler: ['Güvenilir', 'Pratik', 'Düzenli', 'Kararlı'], grup: 'Koruyucular' },
  { tip: 'ISFJ', isim: 'Savunucu', emoji: '🛡️', renk: '#E8692A', aciklama: 'Sıcak kalpli ve özenli, çevrelerini korumaya her zaman hazır bireyler.', ozellikler: ['Destekleyici', 'Güvenilir', 'Sabırlı', 'Gözlemci'], grup: 'Koruyucular' },
  { tip: 'ESTJ', isim: 'Yönetici', emoji: '⚖️', renk: '#E8692A', aciklama: 'Düzeni ve geleneği yönetme konusunda mükemmel, pratik organizatörler.', ozellikler: ['Organize', 'Kararlı', 'Dürüst', 'Sadık'], grup: 'Koruyucular' },
  { tip: 'ESFJ', isim: 'Konsül', emoji: '🤝', renk: '#E8692A', aciklama: 'Son derece özenli, sosyal ve halka açık, toplum odaklı kişiler.', ozellikler: ['Özenli', 'Sosyal', 'Sadık', 'Duyarlı'], grup: 'Koruyucular' },
  { tip: 'ISTP', isim: 'Virtüöz', emoji: '🔧', renk: '#718096', aciklama: 'Cesur ve pratik, araçlarla ve sistemlerle derinlemesine ilgilenen ustalar.', ozellikler: ['Pratik', 'Sakin', 'Meraklı', 'Esnek'], grup: 'Kaşifler' },
  { tip: 'ISFP', isim: 'Maceracı', emoji: '🌸', renk: '#718096', aciklama: 'Esnek ve karizmatik sanatçılar. Keşfetmeye ve deneyimlemeye her zaman hazırlar.', ozellikler: ['Zarif', 'Duyarlı', 'Meraklı', 'Coşkulu'], grup: 'Kaşifler' },
  { tip: 'ESTP', isim: 'Girişimci', emoji: '🚀', renk: '#718096', aciklama: 'Akıllı, enerjik ve algısal kişiler; riskten zevk alan doğal performerslar.', ozellikler: ['Cesur', 'Rasyonel', 'Doğrudan', 'Sosyal'], grup: 'Kaşifler' },
  { tip: 'ESFP', isim: 'Eğlendirici', emoji: '🎉', renk: '#718096', aciklama: 'Spontane, enerjik ve coşkulu; etraflarına heyecan saçan doğal performerslar.', ozellikler: ['Spontane', 'Enerjik', 'Neşeli', 'Duyarlı'], grup: 'Kaşifler' },
];

const ENNEAGRAM_TIPLER = [
  { tip: 1, isim: 'Reformcu', emoji: '⚖️', renk: '#5B57E6', aciklama: 'Mükemmeliyetçi, ilkeli ve amaçlı. Etik ve doğruluğa önem verirler.', korkusu: 'Yanlış yapmak', arzusu: 'İyi olmak' },
  { tip: 2, isim: 'Yardımsever', emoji: '💝', renk: '#E8692A', aciklama: 'Özenli, kişilerarası ilişkilere odaklı ve cömert. Başkalarına yardım etmekten mutluluk duyarlar.', korkusu: 'Sevilmemek', arzusu: 'Sevilmek' },
  { tip: 3, isim: 'Başarıcı', emoji: '🏆', renk: '#0D9E75', aciklama: 'Uyum sağlayan, mükemmelliğe odaklanan ve başarı odaklı kişiler.', korkusu: 'Değersiz olmak', arzusu: 'Değerli hisselmek' },
  { tip: 4, isim: 'Bireyci', emoji: '🎨', renk: '#9C27B0', aciklama: 'Hassas, geri çekilen ve kendini ifade etmeye odaklanan, özgün kişiler.', korkusu: 'Kimliksiz olmak', arzusu: 'Özgün olmak' },
  { tip: 5, isim: 'Araştırmacı', emoji: '🔭', renk: '#2196F3', aciklama: 'Yoğun, meraklı ve yetkinlik konusunda yenilikçi. Bilgi ve anlayışa değer verirler.', korkusu: 'Yetersiz olmak', arzusu: 'Yetkin olmak' },
  { tip: 6, isim: 'Sadık', emoji: '🛡️', renk: '#607D8B', aciklama: 'Katılımcı, güvenilir ve güvenlik odaklı. Sorumluluğa önem verirler.', korkusu: 'Destek olmadan kalmak', arzusu: 'Güvende hissetmek' },
  { tip: 7, isim: 'Meraklı', emoji: '🌈', renk: '#FF9800', aciklama: 'Spontane, çok yönlü ve dağınık. Deneyime ve heyecana odaklanan iyimserler.', korkusu: 'Acı çekmek', arzusu: 'Mutlu olmak' },
  { tip: 8, isim: 'Meydan Okuyucu', emoji: '⚡', renk: '#F44336', aciklama: 'Güçlü, baskın ve kendinden emin. Kendini ve başkalarını koruma konusunda kararlılar.', korkusu: 'Kontrolü kaybetmek', arzusu: 'Kendini korumak' },
  { tip: 9, isim: 'Barışçı', emoji: '🕊️', renk: '#8BC34A', aciklama: 'Kabul gören, güven veren ve istikrarlı. İç huzur ve uyuma değer verirler.', korkusu: 'Bağlantı kaybı', arzusu: 'İç huzur' },
];

const GRUPLAR = ['Analistler', 'Diplomatlar', 'Koruyucular', 'Kaşifler'];
const GRUP_RENKLERI = {
  'Analistler': '#5B57E6',
  'Diplomatlar': '#0D9E75',
  'Koruyucular': '#E8692A',
  'Kaşifler': '#718096',
};

export default function KisilikTipleriScreen({ navigation }) {
  const [aktifTab, setAktifTab] = useState('mbti');
  const [aktifGrup, setAktifGrup] = useState('Analistler');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isWeb) {
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@400;500&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  const filtreliMbti = MBTI_TIPLER.filter((t) => t.grup === aktifGrup);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.geriBtn}>
            <Text style={styles.geriYazi}>← Geri</Text>
          </TouchableOpacity>
          <View style={styles.headerMid}>
            <Text style={styles.headerBaslik}>Kişilik Tipleri</Text>
            <Text style={styles.headerAlt}>Psikoloji & Tipoloji</Text>
          </View>
          <View style={{ width: 60 }} />
        </View>

        {/* Tab Seçici */}
        <View style={styles.tabContainer}>
          {[{ id: 'mbti', label: 'MBTI (16 Tip)' }, { id: 'enneagram', label: 'Enneagram (9 Tip)' }].map((tab) => (
            <TouchableOpacity key={tab.id} style={[styles.tab, aktifTab === tab.id && styles.tabAktif]}
              onPress={() => setAktifTab(tab.id)} activeOpacity={0.7}>
              <Text style={[styles.tabText, aktifTab === tab.id && styles.tabTextAktif]}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* MBTI İçeriği */}
        {aktifTab === 'mbti' && (
          <Animated.View style={{ opacity: fadeAnim }}>
            {/* Grup filtreleri */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.grupScroll}
              contentContainerStyle={styles.grupContainer}>
              {GRUPLAR.map((g) => (
                <TouchableOpacity key={g} style={[styles.grupBtn, aktifGrup === g && { backgroundColor: GRUP_RENKLERI[g] + '22', borderColor: GRUP_RENKLERI[g] }]}
                  onPress={() => setAktifGrup(g)} activeOpacity={0.7}>
                  <Text style={[styles.grupBtnText, aktifGrup === g && { color: GRUP_RENKLERI[g] }]}>{g}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Kart ızgarası */}
            <View style={styles.kartGrid}>
              {filtreliMbti.map((tip) => (
                <View key={tip.tip} style={[styles.mbtiKart, { borderColor: tip.renk + '30' }]}>
                  <View style={styles.mbtiKartUst}>
                    <Text style={styles.mbtiEmoji}>{tip.emoji}</Text>
                    <View style={[styles.mbtiGrupBadge, { backgroundColor: tip.renk + '18' }]}>
                      <Text style={[styles.mbtiGrupBadgeText, { color: tip.renk }]}>{tip.grup}</Text>
                    </View>
                  </View>
                  <Text style={[styles.mbtiTip, { color: tip.renk }]}>{tip.tip}</Text>
                  <Text style={styles.mbtiIsim}>{tip.isim}</Text>
                  <Text style={styles.mbtiAciklama}>{tip.aciklama}</Text>
                  <View style={styles.mbtiOzellikler}>
                    {tip.ozellikler.map((o) => (
                      <View key={o} style={[styles.ozellikBadge, { backgroundColor: tip.renk + '12' }]}>
                        <Text style={[styles.ozellikText, { color: tip.renk }]}>{o}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>

            {/* MBTI Hakkında Bilgi */}
            <View style={styles.bilgiKutu}>
              <Text style={styles.bilgiBaslik}>MBTI Hakkında</Text>
              <Text style={styles.bilgiText}>
                Myers-Briggs Tip Göstergesi (MBTI), Isabel Briggs Myers ve annesi Katherine Cook Briggs tarafından Carl Gustav Jung'un psikolojik tip teorisi temel alınarak geliştirilmiştir.{'\n\n'}
                Dört ana boyut üzerinden 16 farklı kişilik tipi tanımlar: Enerji yönelimi (E/I), Bilgi toplama (S/N), Karar verme (T/F) ve Yaşam tarzı (J/P).{'\n\n'}
                MBTI, kariyer rehberliği, takım geliştirme ve kişisel büyüme alanlarında yaygın olarak kullanılmaktadır.
              </Text>
            </View>
          </Animated.View>
        )}

        {/* Enneagram İçeriği */}
        {aktifTab === 'enneagram' && (
          <Animated.View style={{ opacity: fadeAnim }}>
            <View style={styles.kartGrid}>
              {ENNEAGRAM_TIPLER.map((tip) => (
                <View key={tip.tip} style={[styles.ennKart, { borderColor: tip.renk + '30' }]}>
                  <View style={styles.ennKartUst}>
                    <View style={[styles.ennNumaraDaire, { backgroundColor: tip.renk + '18', borderColor: tip.renk + '40' }]}>
                      <Text style={[styles.ennNumara, { color: tip.renk }]}>{tip.tip}</Text>
                    </View>
                    <Text style={styles.ennEmoji}>{tip.emoji}</Text>
                  </View>
                  <Text style={styles.ennIsim}>{tip.isim}</Text>
                  <Text style={styles.ennAciklama}>{tip.aciklama}</Text>
                  <View style={styles.ennMotivasyonlar}>
                    <View style={styles.ennMotivasyon}>
                      <Text style={styles.ennMotivasyonEtiket}>Temel Korku</Text>
                      <Text style={[styles.ennMotivasyonDeger, { color: '#E53E3E' }]}>{tip.korkusu}</Text>
                    </View>
                    <View style={styles.ennAyrac} />
                    <View style={styles.ennMotivasyon}>
                      <Text style={styles.ennMotivasyonEtiket}>Temel Arzu</Text>
                      <Text style={[styles.ennMotivasyonDeger, { color: '#38A169' }]}>{tip.arzusu}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Enneagram Hakkında Bilgi */}
            <View style={styles.bilgiKutu}>
              <Text style={styles.bilgiBaslik}>Enneagram Hakkında</Text>
              <Text style={styles.bilgiText}>
                Enneagram, dokuz birbiriyle bağlantılı kişilik tipinden oluşan dinamik bir kişilik modelidir. Kökleri antik Yunan, Süryani Hristiyanlığı ve Sufizm'e dayanan bu model, 20. yüzyılda Oscar Ichazo ve Claudio Naranjo tarafından modern psikoloji ile sentezlenmiştir.{'\n\n'}
                Her tip, temel bir korkuyu ve arzuyu merkeze alır. Kanatlar, entegrasyon ve bozulma noktaları ise kişiliğin dinamik doğasını yansıtır.{'\n\n'}
                Enneagram, öz-farkındalık geliştirmek, ilişkileri anlamak ve kişisel dönüşüm için güçlü bir araçtır.
              </Text>
            </View>
          </Animated.View>
        )}

        {/* Alt test butonları */}
        <View style={styles.altButonlar}>
          <TouchableOpacity style={styles.altBtn} onPress={() => navigation.navigate('MBTI')} activeOpacity={0.85}>
            <Text style={styles.altBtnText}>MBTI Testini Başlat →</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.altBtn, styles.altBtnSecondary]} onPress={() => navigation.navigate('Enneagram')} activeOpacity={0.85}>
            <Text style={[styles.altBtnText, styles.altBtnTextSecondary]}>Enneagram Testini Başlat →</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const KART_GENISLIK = isDesktop ? '48%' : '100%';

const styles = StyleSheet.create({
  safe:      { flex: 1, backgroundColor: colors.background },
  container: { paddingBottom: 60 },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: isDesktop ? 48 : 20,
    paddingTop: isDesktop ? 32 : 16, paddingBottom: 20,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  geriBtn:      { width: 60, paddingVertical: 4 },
  geriYazi:     { color: colors.textSecondary, fontSize: 15, fontFamily: FONT_BODY },
  headerMid:    { alignItems: 'center' },
  headerBaslik: { fontSize: isDesktop ? 22 : 18, fontWeight: '700', color: colors.textPrimary, fontFamily: FONT_DISPLAY, letterSpacing: 0.3 },
  headerAlt:    { fontSize: 11, color: colors.textMuted, letterSpacing: 1, marginTop: 2, fontFamily: FONT_BODY },

  tabContainer: {
    flexDirection: 'row', gap: 8,
    paddingHorizontal: isDesktop ? 48 : 20, paddingVertical: 20,
  },
  tab: {
    flex: 1, paddingVertical: 12, borderRadius: 12,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: 'center',
  },
  tabAktif:     { backgroundColor: colors.primary, borderColor: colors.primary },
  tabText:      { fontSize: 14, fontWeight: '500', color: colors.textSecondary, fontFamily: FONT_BODY },
  tabTextAktif: { color: '#ffffff' },

  grupScroll:     { paddingLeft: isDesktop ? 48 : 20 },
  grupContainer:  { gap: 8, paddingRight: isDesktop ? 48 : 20, paddingBottom: 20 },
  grupBtn: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.surface,
  },
  grupBtnText:  { fontSize: 13, color: colors.textSecondary, fontWeight: '500', fontFamily: FONT_BODY },

  kartGrid: {
    paddingHorizontal: isDesktop ? 48 : 20, gap: 16,
    flexDirection: isDesktop ? 'row' : 'column',
    flexWrap: isDesktop ? 'wrap' : 'nowrap',
  },

  // MBTI Kartları
  mbtiKart: {
    width: isDesktop ? KART_GENISLIK : '100%',
    backgroundColor: colors.surface,
    borderRadius: 18, borderWidth: 1,
    padding: 20, gap: 6,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  mbtiKartUst:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  mbtiEmoji:        { fontSize: 28 },
  mbtiGrupBadge:    { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  mbtiGrupBadgeText:{ fontSize: 10, fontWeight: '600', letterSpacing: 0.5, fontFamily: FONT_BODY },
  mbtiTip:          { fontSize: 26, fontWeight: '700', fontFamily: FONT_DISPLAY, letterSpacing: -0.5 },
  mbtiIsim:         { fontSize: 16, fontWeight: '600', color: colors.textPrimary, fontFamily: FONT_BODY },
  mbtiAciklama:     { fontSize: 13, color: colors.textSecondary, lineHeight: 20, fontFamily: FONT_BODY },
  mbtiOzellikler:   { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6 },
  ozellikBadge:     { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  ozellikText:      { fontSize: 11, fontWeight: '500', fontFamily: FONT_BODY },

  // Enneagram Kartları
  ennKart: {
    width: isDesktop ? KART_GENISLIK : '100%',
    backgroundColor: colors.surface,
    borderRadius: 18, borderWidth: 1,
    padding: 20, gap: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  ennKartUst:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ennNumaraDaire:   { width: 40, height: 40, borderRadius: 20, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  ennNumara:        { fontSize: 18, fontWeight: '700', fontFamily: FONT_DISPLAY },
  ennEmoji:         { fontSize: 26 },
  ennIsim:          { fontSize: 18, fontWeight: '700', color: colors.textPrimary, fontFamily: FONT_BODY },
  ennAciklama:      { fontSize: 13, color: colors.textSecondary, lineHeight: 20, fontFamily: FONT_BODY },
  ennMotivasyonlar: { flexDirection: 'row', backgroundColor: colors.surfaceLight, borderRadius: 12, padding: 12, marginTop: 4 },
  ennMotivasyon:    { flex: 1, alignItems: 'center' },
  ennMotivasyonEtiket: { fontSize: 10, color: colors.textMuted, fontWeight: '600', letterSpacing: 0.5, marginBottom: 4, fontFamily: FONT_BODY },
  ennMotivasyonDeger:  { fontSize: 13, fontWeight: '600', textAlign: 'center', fontFamily: FONT_BODY },
  ennAyrac:         { width: 1, backgroundColor: colors.border, marginHorizontal: 8 },

  // Bilgi Kutusu
  bilgiKutu: {
    marginHorizontal: isDesktop ? 48 : 20,
    marginTop: 28, marginBottom: 8,
    backgroundColor: colors.surface, borderRadius: 18,
    borderWidth: 1, borderColor: colors.border,
    padding: isDesktop ? 28 : 20,
  },
  bilgiBaslik: { fontSize: 18, fontWeight: '700', color: colors.textPrimary, fontFamily: FONT_DISPLAY, marginBottom: 12 },
  bilgiText:   { fontSize: 14, color: colors.textSecondary, lineHeight: 22, fontFamily: FONT_BODY },

  // Alt Butonlar
  altButonlar: {
    paddingHorizontal: isDesktop ? 48 : 20,
    marginTop: 24, gap: 12,
    flexDirection: isDesktop ? 'row' : 'column',
  },
  altBtn: {
    flex: isDesktop ? 1 : undefined,
    backgroundColor: colors.primary, borderRadius: 14,
    paddingVertical: 16, alignItems: 'center',
    shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 6,
  },
  altBtnSecondary: { backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.secondary, shadowColor: 'transparent', elevation: 0 },
  altBtnText:      { fontSize: 15, fontWeight: '600', color: '#ffffff', fontFamily: FONT_BODY },
  altBtnTextSecondary: { color: colors.secondary },
});
