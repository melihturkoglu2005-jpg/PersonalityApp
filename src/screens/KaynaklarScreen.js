import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Dimensions, Platform, Animated, Linking,
} from 'react-native';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;

const FONT_DISPLAY = Platform.select({ ios: 'Georgia', android: 'serif', web: "'Cormorant Garamond', Georgia, serif" });
const FONT_BODY    = Platform.select({ ios: 'System', android: 'sans-serif', web: "'DM Sans', system-ui, sans-serif" });

const KATEGORILER = [
  {
    id: 'kitaplar',
    label: 'Kitaplar',
    emoji: '📚',
    icerik: [
      {
        baslik: 'Psikolojik Tipler',
        yazar: 'Carl Gustav Jung',
        yil: '1921',
        aciklama: 'MBTI\'nin temelini oluşturan Jung\'un arketip ve kişilik tipleri üzerine yaptığı kapsamlı çalışma. Dışadönük/içedönük ayrımını ve psikolojik fonksiyonları ilk kez sistematik olarak tanımlar.',
        seviye: 'İleri',
        seviyeRenk: '#E53E3E',
        etiket: 'Kaynak Eser',
      },
      {
        baslik: 'The Enneagram: A Christian Perspective',
        yazar: 'Richard Rohr & Andreas Ebert',
        yil: '2001',
        aciklama: 'Enneagram\'ı ruhsal gelişim perspektifinden ele alan, her tipin motivasyonlarını ve dönüşüm potansiyelini inceleyen kapsamlı rehber.',
        seviye: 'Orta',
        seviyeRenk: '#E8692A',
        etiket: 'Enneagram',
      },
      {
        baslik: 'Gifts Differing: Understanding Personality Type',
        yazar: 'Isabel Briggs Myers',
        yil: '1980',
        aciklama: 'MBTI\'nin yaratıcısının kendi kaleme aldığı temel referans kitap. 16 tipi derinlemesine inceler ve günlük yaşamdaki uygulamalarını açıklar.',
        seviye: 'Başlangıç',
        seviyeRenk: '#38A169',
        etiket: 'MBTI',
      },
      {
        baslik: 'The Wisdom of the Enneagram',
        yazar: 'Don Richard Riso & Russ Hudson',
        yil: '1999',
        aciklama: 'Enneagram\'ın en kapsamlı modern kaynakları arasında gösterilen bu kitap, her tipin sağlıklı ve sağlıksız düzeylerini ayrıntılı olarak inceler.',
        seviye: 'Orta',
        seviyeRenk: '#E8692A',
        etiket: 'Enneagram',
      },
      {
        baslik: 'Please Understand Me II',
        yazar: 'David Keirsey',
        yil: '1998',
        aciklama: 'Keirsey Mizaç Modeli\'ni MBTI ile ilişkilendiren klasik eser. Dört temel mizacı ve 16 tipin özelliklerini pratik örneklerle açıklar.',
        seviye: 'Başlangıç',
        seviyeRenk: '#38A169',
        etiket: 'MBTI',
      },
      {
        baslik: 'Personality Types: Using the Enneagram for Self-Discovery',
        yazar: 'Don Richard Riso',
        yil: '1987',
        aciklama: 'Enneagram tiplerini sağlıktan patolojiye uzanan bir süreklilik içinde inceleyen, her tip için kapsamlı profiller sunan temel başvuru kitabı.',
        seviye: 'Orta',
        seviyeRenk: '#E8692A',
        etiket: 'Enneagram',
      },
    ],
  },
  {
    id: 'arastirmalar',
    label: 'Akademik Araştırmalar',
    emoji: '🔬',
    icerik: [
      {
        baslik: 'MBTI\'nin Psikometrik Özellikleri',
        yazar: 'McCrae & Costa (1989)',
        yil: '1989',
        aciklama: 'MBTI ile Beş Büyük kişilik boyutları arasındaki ilişkiyi inceleyen kritik çalışma. MBTI\'nin test-tekrar güvenilirliği ve yapı geçerliliğini ele alır.',
        seviye: 'Akademik',
        seviyeRenk: '#5B57E6',
        etiket: 'Psikoloji',
      },
      {
        baslik: 'Enneagram\'ın Geçerliliği ve Güvenilirliği',
        yazar: 'Sutton et al. (2013)',
        yil: '2013',
        aciklama: 'Enneagram\'ın psikometrik özelliklerini değerlendiren sistematik derleme. Ölçüm araçlarını ve araştırma bulgularını karşılaştırır.',
        seviye: 'Akademik',
        seviyeRenk: '#5B57E6',
        etiket: 'Psikoloji',
      },
      {
        baslik: 'Kişilik Tiplerinin İş Performansıyla İlişkisi',
        yazar: 'Barrick & Mount (1991)',
        yil: '1991',
        aciklama: 'Kişilik özelliklerinin çeşitli iş kriterleriyle ilişkisini inceleyen meta-analiz çalışması. Beş Büyük boyutların iş başarısını nasıl yordadığını gösterir.',
        seviye: 'Akademik',
        seviyeRenk: '#5B57E6',
        etiket: 'Endüstriyel Psikoloji',
      },
      {
        baslik: 'Kişilik ve Refahın İlişkisi',
        yazar: 'DeNeve & Cooper (1998)',
        yil: '1998',
        aciklama: 'Kişilik özelliklerinin öznel refah ile ilişkisini inceleyen kapsamlı meta-analiz. 137 çalışmanın sonuçlarını sentezler.',
        seviye: 'Akademik',
        seviyeRenk: '#5B57E6',
        etiket: 'Pozitif Psikoloji',
      },
    ],
  },
  {
    id: 'kavramlar',
    label: 'Temel Kavramlar',
    emoji: '💡',
    icerik: [
      {
        baslik: 'Bilişsel Fonksiyonlar',
        aciklama: 'Jung\'un tanımladığı sekiz bilişsel fonksiyon (Te, Ti, Fe, Fi, Se, Si, Ne, Ni), bilgiyi nasıl işlediğimizi ve kararlarımızı nasıl aldığımızı tanımlar. Her MBTI tipinin baskın, yardımcı, üçüncül ve aşağı fonksiyonları vardır.',
        etiket: 'MBTI Temeli',
        etiketRenk: '#5B57E6',
      },
      {
        baslik: 'Kanatlar (Enneagram)',
        aciklama: 'Enneagram\'da her kişilik tipi, komşu tiplerden birinin veya ikisinin özelliklerini taşır. Bu "kanatlara" sahip olmak, kişiliğin nüanslı ve dinamik doğasını yansıtır.',
        etiket: 'Enneagram Temeli',
        etiketRenk: '#E8692A',
      },
      {
        baslik: 'Entegrasyon ve Bozulma',
        aciklama: 'Enneagram\'da her tip, stres altında belirli bir tipe (bozulma), güvenli hissederken ise başka bir tipe (entegrasyon) doğru hareket eder. Bu dinamik, büyüme yolunu gösterir.',
        etiket: 'Enneagram Temeli',
        etiketRenk: '#E8692A',
      },
      {
        baslik: 'Yanlış Tip Atama (Mistyping)',
        aciklama: 'Kişilik testlerinde sıkça karşılaşılan bir sorun. Sosyal baskılar, anlık ruh hali veya testin soru yapısı nedeniyle kişi gerçek tipinden farklı bir sonuç alabilir. Sonuçları değil, temeldeki bilişsel örüntüleri anlamak önemlidir.',
        etiket: 'Genel',
        etiketRenk: '#718096',
      },
      {
        baslik: 'Beş Büyük Kişilik Modeli (Big Five)',
        aciklama: 'Psikoloji araştırmalarında en fazla kullanılan kişilik modeli: Açıklık, Sorumluluk, Dışadönüklük, Uyumluluk ve Nevrotiklik (OCEAN). MBTI boyutlarıyla güçlü korelasyonlar gösterir.',
        etiket: 'Karşılaştırmak',
        etiketRenk: '#0D9E75',
      },
      {
        baslik: 'Kişilik Gelişimi ve Yaş',
        aciklama: 'Jung\'a göre kişilik yaşam boyunca gelişir. Orta yaşta "gölge" ile yüzleşme ve eksik fonksiyonları geliştirme kritik bir süreçtir. MBTI tipleri sabit değil, dinamik bir süreçtir.',
        etiket: 'Gelişimsel',
        etiketRenk: '#38A169',
      },
    ],
  },
  {
    id: 'sss',
    label: 'Sık Sorulan Sorular',
    emoji: '❓',
    icerik: [
      {
        soru: 'MBTI testi bilimsel midir?',
        cevap: 'MBTI karma bir bilimsel statüye sahiptir. Sosyal ve örgütsel psikolojide yaygın olarak kullanılsa da, akademisyenler test-tekrar güvenilirliği ve ölçüm geçerliliği konusunda eleştiriler yöneltmektedir. Beş Büyük model, araştırma camiasında daha güçlü psikometrik desteğe sahiptir.',
      },
      {
        soru: 'Kişilik tipim değişebilir mi?',
        cevap: 'Temel kişilik özellikleri görece sabittir, ancak ifadeniz yaşam koşullarına, gelişiminize ve bilinçli çalışmaya göre evrilebilir. Özellikle orta yaştan itibaren "gölge" özellikleri daha belirgin hale gelebilir.',
      },
      {
        soru: 'MBTI ve Enneagram arasındaki fark nedir?',
        cevap: 'MBTI bilişsel fonksiyonlara ve bilgi işleme biçimlerine odaklanırken, Enneagram temel motivasyonlara, korkulara ve arzulara odaklanır. İkisi birbirini tamamlayıcı niteliktedir.',
      },
      {
        soru: 'Hangi test daha doğrudur?',
        cevap: 'Her iki sistem de farklı yönlere ışık tutar. Tek bir test "mutlak doğruyu" vermez. En etkili yaklaşım, birden fazla çerçeveyi kullanarak kendinizi anlamaya çalışmaktır. Sonuçları bir başlangıç noktası olarak değerlendirin.',
      },
      {
        soru: 'Testler neden farklı sonuçlar verebilir?',
        cevap: 'Ruh haliniz, anlık stres düzeyiniz, toplumsal baskılar ve soruları yorumlama biçiminiz sonuçları etkileyebilir. Birden fazla kez test yapılmasını ve farklı çerçeveler aracılığıyla kendinizi tanımlamayı öneririz.',
      },
    ],
  },
];

export default function KaynaklarScreen({ navigation }) {
  const [aktifKategori, setAktifKategori] = useState('kitaplar');
  const [acikSSS, setAcikSSS]             = useState(null);
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

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0.3, duration: 100, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1,   duration: 300, useNativeDriver: true }),
    ]).start();
  }, [aktifKategori]);

  const aktifVeri = KATEGORILER.find((k) => k.id === aktifKategori);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.geriBtn}>
            <Text style={styles.geriYazi}>← Geri</Text>
          </TouchableOpacity>
          <View style={styles.headerMid}>
            <Text style={styles.headerBaslik}>Kaynaklar</Text>
            <Text style={styles.headerAlt}>Bilgi & Referanslar</Text>
          </View>
          <View style={{ width: 60 }} />
        </View>

        {/* Hero Kart */}
        <View style={styles.heroKart}>
          <Text style={styles.heroEmoji}>🧠</Text>
          <Text style={styles.heroBaslik}>Psikoloji Kütüphanesi</Text>
          <Text style={styles.heroText}>
            Kişilik psikolojisi alanındaki temel eserler, akademik araştırmalar ve kavramsal rehberler.
          </Text>
        </View>

        {/* Kategori Seçici */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kategoriScroll}
          contentContainerStyle={styles.kategoriContainer}>
          {KATEGORILER.map((k) => (
            <TouchableOpacity key={k.id}
              style={[styles.kategoriBtn, aktifKategori === k.id && styles.kategoriBtnAktif]}
              onPress={() => setAktifKategori(k.id)} activeOpacity={0.7}>
              <Text style={styles.kategoriEmoji}>{k.emoji}</Text>
              <Text style={[styles.kategoriBtnText, aktifKategori === k.id && styles.kategoriBtnTextAktif]}>{k.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* İçerik */}
        <Animated.View style={[styles.icerik, { opacity: fadeAnim }]}>

          {/* Kitaplar & Araştırmalar */}
          {(aktifKategori === 'kitaplar' || aktifKategori === 'arastirmalar') && (
            <View style={styles.kartGrid}>
              {aktifVeri.icerik.map((item, i) => (
                <View key={i} style={styles.kaynakKart}>
                  <View style={styles.kaynakKartUst}>
                    <View style={[styles.seviyeBadge, { backgroundColor: item.seviyeRenk + '18' }]}>
                      <Text style={[styles.seviyeText, { color: item.seviyeRenk }]}>{item.seviye}</Text>
                    </View>
                    <View style={[styles.etiketBadge, { backgroundColor: colors.surfaceLight }]}>
                      <Text style={styles.etiketText}>{item.etiket}</Text>
                    </View>
                  </View>
                  <Text style={styles.kaynakBaslik}>{item.baslik}</Text>
                  {item.yazar && <Text style={styles.kaynakYazar}>{item.yazar} · {item.yil}</Text>}
                  <Text style={styles.kaynakAciklama}>{item.aciklama}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Kavramlar */}
          {aktifKategori === 'kavramlar' && (
            <View style={styles.kartGrid}>
              {aktifVeri.icerik.map((item, i) => (
                <View key={i} style={styles.kavramKart}>
                  <View style={styles.kavramKartUst}>
                    <View style={[styles.etiketBadge, { backgroundColor: (item.etiketRenk || colors.primary) + '18' }]}>
                      <Text style={[styles.etiketText, { color: item.etiketRenk || colors.primary }]}>{item.etiket}</Text>
                    </View>
                  </View>
                  <Text style={styles.kavramBaslik}>{item.baslik}</Text>
                  <Text style={styles.kavramAciklama}>{item.aciklama}</Text>
                </View>
              ))}
            </View>
          )}

          {/* SSS */}
          {aktifKategori === 'sss' && (
            <View style={styles.sssContainer}>
              {aktifVeri.icerik.map((item, i) => (
                <TouchableOpacity key={i} style={styles.sssKart}
                  onPress={() => setAcikSSS(acikSSS === i ? null : i)} activeOpacity={0.8}>
                  <View style={styles.sssUst}>
                    <Text style={styles.sssSoru}>{item.soru}</Text>
                    <Text style={styles.sssOk}>{acikSSS === i ? '↑' : '↓'}</Text>
                  </View>
                  {acikSSS === i && (
                    <Text style={styles.sssCevap}>{item.cevap}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </Animated.View>

        {/* Sorumluluk Reddi */}
        <View style={styles.redKutu}>
          <Text style={styles.redBaslik}>⚠️ Önemli Not</Text>
          <Text style={styles.redText}>
            Bu platform akademik ve kişisel gelişim amaçlıdır. Sunulan test sonuçları ve bilgiler, profesyonel psikolojik tanı ve değerlendirmenin yerini tutmaz. Herhangi bir psikolojik destek için lisanslı bir psikolog veya psikiyatrist ile görüşmenizi öneririz.
          </Text>
        </View>

        {/* Test Başlatma CTA */}
        <View style={styles.ctaKutu}>
          <Text style={styles.ctaBaslik}>Hemen Başlayın</Text>
          <Text style={styles.ctaAlt}>Teoriden pratiğe geçin ve kendi tipinizi keşfedin.</Text>
          <View style={styles.ctaButonlar}>
            <TouchableOpacity style={styles.ctaBtn} onPress={() => navigation.navigate('MBTI')} activeOpacity={0.85}>
              <Text style={styles.ctaBtnText}>MBTI Testi →</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.ctaBtn, styles.ctaBtnSecondary]} onPress={() => navigation.navigate('Enneagram')} activeOpacity={0.85}>
              <Text style={[styles.ctaBtnText, styles.ctaBtnTextSecondary]}>Enneagram →</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

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

  heroKart: {
    margin: isDesktop ? 48 : 20, marginBottom: 0,
    backgroundColor: colors.primary,
    borderRadius: 20, padding: isDesktop ? 32 : 24,
    alignItems: 'center', gap: 8,
  },
  heroEmoji:  { fontSize: 40, marginBottom: 4 },
  heroBaslik: { fontSize: isDesktop ? 26 : 22, fontWeight: '700', color: '#ffffff', fontFamily: FONT_DISPLAY, textAlign: 'center' },
  heroText:   { fontSize: 14, color: 'rgba(255,255,255,0.82)', fontFamily: FONT_BODY, textAlign: 'center', lineHeight: 22, maxWidth: 400 },

  kategoriScroll:    { paddingLeft: isDesktop ? 48 : 20, marginTop: 24 },
  kategoriContainer: { gap: 8, paddingRight: isDesktop ? 48 : 20, paddingBottom: 4 },
  kategoriBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 16, paddingVertical: 10,
    borderRadius: 12, borderWidth: 1.5, borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  kategoriBtnAktif:    { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  kategoriEmoji:       { fontSize: 16 },
  kategoriBtnText:     { fontSize: 13, color: colors.textSecondary, fontWeight: '500', fontFamily: FONT_BODY },
  kategoriBtnTextAktif:{ color: colors.primary },

  icerik:   { paddingHorizontal: isDesktop ? 48 : 20, paddingTop: 20 },
  kartGrid: { gap: 16 },

  // Kaynak Kartları
  kaynakKart: {
    backgroundColor: colors.surface, borderRadius: 18,
    borderWidth: 1, borderColor: colors.border, padding: 20, gap: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  kaynakKartUst:  { flexDirection: 'row', gap: 8 },
  seviyeBadge:    { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  seviyeText:     { fontSize: 11, fontWeight: '600', fontFamily: FONT_BODY },
  etiketBadge:    { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  etiketText:     { fontSize: 11, color: colors.textMuted, fontWeight: '500', fontFamily: FONT_BODY },
  kaynakBaslik:   { fontSize: 17, fontWeight: '700', color: colors.textPrimary, fontFamily: FONT_BODY, lineHeight: 24 },
  kaynakYazar:    { fontSize: 13, color: colors.primary, fontWeight: '500', fontFamily: FONT_BODY },
  kaynakAciklama: { fontSize: 13, color: colors.textSecondary, lineHeight: 20, fontFamily: FONT_BODY },

  // Kavram Kartları
  kavramKart: {
    backgroundColor: colors.surface, borderRadius: 18,
    borderWidth: 1, borderColor: colors.border, padding: 20, gap: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 1,
  },
  kavramKartUst:  { flexDirection: 'row' },
  kavramBaslik:   { fontSize: 17, fontWeight: '700', color: colors.textPrimary, fontFamily: FONT_BODY, lineHeight: 24 },
  kavramAciklama: { fontSize: 13, color: colors.textSecondary, lineHeight: 20, fontFamily: FONT_BODY },

  // SSS
  sssContainer: { gap: 10 },
  sssKart: {
    backgroundColor: colors.surface, borderRadius: 16,
    borderWidth: 1, borderColor: colors.border, padding: 18, gap: 12,
  },
  sssUst:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 },
  sssSoru:  { flex: 1, fontSize: 15, fontWeight: '600', color: colors.textPrimary, fontFamily: FONT_BODY, lineHeight: 22 },
  sssOk:    { fontSize: 16, color: colors.textMuted, paddingTop: 2 },
  sssCevap: { fontSize: 14, color: colors.textSecondary, lineHeight: 22, fontFamily: FONT_BODY },

  // Reddi
  redKutu: {
    margin: isDesktop ? 48 : 20, marginTop: 28,
    backgroundColor: '#FFF8E1', borderRadius: 16,
    borderWidth: 1, borderColor: '#FFD54F',
    padding: isDesktop ? 24 : 18, gap: 8,
  },
  redBaslik: { fontSize: 14, fontWeight: '700', color: '#F57C00', fontFamily: FONT_BODY },
  redText:   { fontSize: 13, color: '#795548', lineHeight: 20, fontFamily: FONT_BODY },

  // CTA
  ctaKutu: {
    marginHorizontal: isDesktop ? 48 : 20,
    backgroundColor: colors.surface, borderRadius: 20,
    borderWidth: 1, borderColor: colors.border,
    padding: isDesktop ? 32 : 24, alignItems: 'center', gap: 8,
  },
  ctaBaslik:   { fontSize: isDesktop ? 24 : 20, fontWeight: '700', color: colors.textPrimary, fontFamily: FONT_DISPLAY },
  ctaAlt:      { fontSize: 14, color: colors.textSecondary, fontFamily: FONT_BODY, textAlign: 'center' },
  ctaButonlar: { flexDirection: isDesktop ? 'row' : 'column', gap: 12, marginTop: 8, alignSelf: 'stretch' },
  ctaBtn: {
    flex: 1, backgroundColor: colors.primary, borderRadius: 14,
    paddingVertical: 14, alignItems: 'center',
  },
  ctaBtnSecondary:      { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.secondary },
  ctaBtnText:           { fontSize: 15, fontWeight: '600', color: '#ffffff', fontFamily: FONT_BODY },
  ctaBtnTextSecondary:  { color: colors.secondary },
});
