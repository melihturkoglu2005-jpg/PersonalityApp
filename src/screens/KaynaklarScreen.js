import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Dimensions, Platform,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import TopNav from '../components/TopNav';
import AppBackground from '../components/AppBackground';
import ScreenFadeIn from '../components/ScreenFadeIn';
import Footer from '../components/Footer';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;
const FONT = Platform.select({ ios: 'System', android: 'sans-serif', web: "'Nunito', 'Varela Round', system-ui, sans-serif" });
const MAX  = 720;

const KATEGORILER = [
  { id: 'kitaplar',      label: 'Kitaplar',            emoji: '📚' },
  { id: 'arastirmalar',  label: 'Araştırmalar',         emoji: '🔬' },
  { id: 'kavramlar',     label: 'Kavramlar',            emoji: '💡' },
  { id: 'sss',           label: 'SSS',                  emoji: '❓' },
];

const KITAPLAR = [
  { baslik: 'Psikolojik Tipler', yazar: 'Carl Gustav Jung', yil: '1921', aciklama: 'MBTI\'nin temelini oluşturan, arketip ve kişilik tipleri üzerine kapsamlı çalışma. Dışadönük/içedönük ayrımını sistematik olarak ilk kez tanımlar.', seviye: 'İleri', seviyeRenk: colors.primaryDark, seviyeBg: colors.primaryLight, etiket: 'Kaynak Eser' },
  { baslik: 'Gifts Differing', yazar: 'Isabel Briggs Myers', yil: '1980', aciklama: 'MBTI\'nin yaratıcısının kendi kaleme aldığı temel referans. 16 tipi derinlemesine inceler ve günlük yaşamdaki uygulamalarını açıklar.', seviye: 'Başlangıç', seviyeRenk: colors.primaryDark, seviyeBg: colors.primaryLight, etiket: 'MBTI' },
  { baslik: 'The Wisdom of the Enneagram', yazar: 'Don Richard Riso & Russ Hudson', yil: '1999', aciklama: 'Enneagram\'ın en kapsamlı modern kaynakları arasında. Her tipin sağlıklı ve sağlıksız düzeylerini ayrıntılı inceler.', seviye: 'Orta', seviyeRenk: colors.primaryDark, seviyeBg: colors.primaryLight, etiket: 'Enneagram' },
  { baslik: 'Please Understand Me II', yazar: 'David Keirsey', yil: '1998', aciklama: 'Keirsey Mizaç Modeli\'ni MBTI ile ilişkilendiren klasik eser. Dört temel mizacı pratik örneklerle açıklar.', seviye: 'Başlangıç', seviyeRenk: colors.primaryDark, seviyeBg: colors.primaryLight, etiket: 'MBTI' },
  { baslik: 'The Enneagram: A Christian Perspective', yazar: 'Richard Rohr & Andreas Ebert', yil: '2001', aciklama: 'Enneagram\'ı ruhsal gelişim perspektifinden ele alan, her tipin motivasyonlarını ve dönüşüm potansiyelini inceleyen kapsamlı rehber.', seviye: 'Orta', seviyeRenk: colors.primaryDark, seviyeBg: colors.primaryLight, etiket: 'Enneagram' },
];

const ARASTIRMALAR = [
  { baslik: 'MBTI\'nin Psikometrik Özellikleri', yazar: 'McCrae & Costa', yil: '1989', aciklama: 'MBTI ile Beş Büyük kişilik boyutları arasındaki ilişkiyi inceleyen kritik çalışma. Test-tekrar güvenilirliği ve yapı geçerliliğini ele alır.', seviye: 'Akademik', seviyeRenk: colors.primaryDark, seviyeBg: colors.primaryLight, etiket: 'Psikoloji' },
  { baslik: 'Enneagram\'ın Geçerliliği ve Güvenilirliği', yazar: 'Sutton et al.', yil: '2013', aciklama: 'Enneagram\'ın psikometrik özelliklerini değerlendiren sistematik derleme. Ölçüm araçlarını ve araştırma bulgularını karşılaştırır.', seviye: 'Akademik', seviyeRenk: colors.primaryDark, seviyeBg: colors.primaryLight, etiket: 'Psikoloji' },
  { baslik: 'Kişilik Tiplerinin İş Performansıyla İlişkisi', yazar: 'Barrick & Mount', yil: '1991', aciklama: 'Kişilik özelliklerinin çeşitli iş kriterleriyle ilişkisini inceleyen meta-analiz. Beş Büyük boyutların iş başarısını nasıl yordadığını gösterir.', seviye: 'Akademik', seviyeRenk: colors.primaryDark, seviyeBg: colors.primaryLight, etiket: 'Endüstriyel Psikoloji' },
  { baslik: 'Kişilik ve Refahın İlişkisi', yazar: 'DeNeve & Cooper', yil: '1998', aciklama: 'Kişilik özelliklerinin öznel refah ile ilişkisini inceleyen kapsamlı meta-analiz. 137 çalışmanın sonuçlarını sentezler.', seviye: 'Akademik', seviyeRenk: colors.primaryDark, seviyeBg: colors.primaryLight, etiket: 'Pozitif Psikoloji' },
];

const KAVRAMLAR = [
  { baslik: 'Bilişsel Fonksiyonlar', aciklama: 'Jung\'un tanımladığı sekiz bilişsel fonksiyon (Te, Ti, Fe, Fi, Se, Si, Ne, Ni), bilgiyi nasıl işlediğimizi ve kararlarımızı nasıl aldığımızı tanımlar. Her MBTI tipinin baskın, yardımcı, üçüncül ve aşağı fonksiyonları vardır.', etiket: 'MBTI', etiketRenk: colors.primaryDark, etiketBg: colors.primaryLight },
  { baslik: 'Kanatlar (Enneagram)', aciklama: 'Her kişilik tipi, komşu tiplerden birinin veya ikisinin özelliklerini taşır. Bu "kanatlar", kişiliğin nüanslı ve dinamik doğasını yansıtır.', etiket: 'Enneagram', etiketRenk: colors.primaryDark, etiketBg: colors.primaryLight },
  { baslik: 'Entegrasyon ve Bozulma', aciklama: 'Her tip, stres altında belirli bir tipe (bozulma), güvenli hissederken başka bir tipe (entegrasyon) doğru hareket eder. Bu dinamik, büyüme yolunu gösterir.', etiket: 'Enneagram', etiketRenk: colors.primaryDark, etiketBg: colors.primaryLight },
  { baslik: 'Yanlış Tip Atama (Mistyping)', aciklama: 'Sosyal baskılar, anlık ruh hali veya testin soru yapısı nedeniyle kişi gerçek tipinden farklı sonuç alabilir. Sonuçları değil, temeldeki bilişsel örüntüleri anlamak önemlidir.', etiket: 'Genel', etiketRenk: colors.primaryDark, etiketBg: colors.primaryLight },
  { baslik: 'Beş Büyük Model (Big Five)', aciklama: 'Psikoloji araştırmalarında en fazla kullanılan model: Açıklık, Sorumluluk, Dışadönüklük, Uyumluluk ve Nevrotiklik (OCEAN). MBTI boyutlarıyla güçlü korelasyonlar gösterir.', etiket: 'Karşılaştırma', etiketRenk: colors.primaryDark, etiketBg: colors.primaryLight },
  { baslik: 'Kişilik Gelişimi ve Yaş', aciklama: 'Jung\'a göre kişilik yaşam boyunca gelişir. Orta yaşta "gölge" ile yüzleşme ve eksik fonksiyonları geliştirme kritik bir süreçtir.', etiket: 'Gelişimsel', etiketRenk: colors.primaryDark, etiketBg: colors.primaryLight },
];

const SSS = [
  { soru: 'MBTI testi bilimsel midir?', cevap: 'MBTI karma bir bilimsel statüye sahiptir. Sosyal ve örgütsel psikolojide yaygın kullanılsa da, akademisyenler test-tekrar güvenilirliği konusunda eleştiriler yöneltmektedir. Beş Büyük model araştırma camiasında daha güçlü psikometrik desteğe sahiptir.' },
  { soru: 'Kişilik tipim değişebilir mi?', cevap: 'Temel kişilik özellikleri görece sabittir, ancak ifadeniz yaşam koşullarına ve bilinçli çalışmaya göre evrilebilir. Özellikle orta yaştan itibaren "gölge" özellikleri daha belirgin hale gelebilir.' },
  { soru: 'MBTI ve Enneagram arasındaki fark nedir?', cevap: 'MBTI bilişsel fonksiyonlara ve bilgi işleme biçimlerine odaklanırken, Enneagram temel motivasyonlara, korkulara ve arzulara odaklanır. İkisi birbirini tamamlayıcı niteliktedir.' },
  { soru: 'Testler neden farklı sonuçlar verebilir?', cevap: 'Ruh haliniz, anlık stres düzeyiniz, toplumsal baskılar ve soruları yorumlama biçiminiz sonuçları etkileyebilir. Birden fazla kez test yapılmasını öneririz.' },
  { soru: 'Hangi test daha doğrudur?', cevap: 'Her iki sistem de farklı yönlere ışık tutar. En etkili yaklaşım birden fazla çerçeveyi kullanarak kendinizi anlamaya çalışmaktır. Sonuçları bir başlangıç noktası olarak değerlendirin.' },
];

const KAT_IDS = ['kitaplar', 'arastirmalar', 'kavramlar', 'sss'];

export default function KaynaklarScreen({ navigation, route }) {
  const { isDark, colors } = useTheme();
  const paramKat = route?.params?.initialKat;
  const [aktifKat, setAktifKat] = useState(() =>
    KAT_IDS.includes(paramKat) ? paramKat : 'kitaplar'
  );
  const [acikSSS,  setAcikSSS]  = useState(null);

  useEffect(() => {
    const k = route?.params?.initialKat;
    if (KAT_IDS.includes(k)) {
      setAktifKat(k);
      setAcikSSS(null);
    }
  }, [route?.params?.initialKat]);

  const veri = aktifKat === 'kitaplar' ? KITAPLAR : aktifKat === 'arastirmalar' ? ARASTIRMALAR : aktifKat === 'kavramlar' ? KAVRAMLAR : SSS;

  return (
    <SafeAreaView style={[s.safe, { backgroundColor: colors.background }]}>
      <AppBackground />
      <ScreenFadeIn>
        <TopNav navigation={navigation} />

        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Hero */}
        <View style={s.hero}>
          <View style={s.heroIcon}>
            <Text style={s.heroIconText}>🧠</Text>
          </View>
          <Text style={s.heroTitle}>Psikoloji Kütüphanesi</Text>
          <Text style={s.heroSub}>Kişilik psikolojisi alanındaki temel eserler, akademik araştırmalar ve kavramsal rehberler.</Text>
        </View>

        {/* Kategori seçici */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          style={s.katScroll} contentContainerStyle={s.katRow}>
          {KATEGORILER.map((k) => (
            <TouchableOpacity key={k.id}
              style={[s.katBtn, aktifKat === k.id && s.katBtnAktif]}
              onPress={() => { setAktifKat(k.id); setAcikSSS(null); }} activeOpacity={0.7}>
              <Text style={s.katEmoji}>{k.emoji}</Text>
              <Text style={[s.katBtnText, aktifKat === k.id && s.katBtnTextAktif]}>{k.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* İçerik */}
        <View style={s.liste}>

          {/* Kitaplar & Araştırmalar */}
          {(aktifKat === 'kitaplar' || aktifKat === 'arastirmalar') && veri.map((item, i) => (
            <View key={i} style={s.kaynakKart}>
              <View style={s.kaynakKartUst}>
                <View style={[s.badge, { backgroundColor: item.seviyeBg }]}>
                  <Text style={[s.badgeText, { color: item.seviyeRenk }]}>{item.seviye}</Text>
                </View>
                <View style={[s.badge, { backgroundColor: colors.surfaceLight }]}>
                  <Text style={[s.badgeText, { color: colors.textMuted }]}>{item.etiket}</Text>
                </View>
              </View>
              <Text style={s.kaynakBaslik}>{item.baslik}</Text>
              <Text style={s.kaynakYazar}>{item.yazar} · {item.yil}</Text>
              <Text style={s.kaynakAciklama}>{item.aciklama}</Text>
            </View>
          ))}

          {/* Kavramlar */}
          {aktifKat === 'kavramlar' && KAVRAMLAR.map((item, i) => (
            <View key={i} style={s.kavramKart}>
              <View style={[s.badge, { backgroundColor: item.etiketBg, marginBottom: 8 }]}>
                <Text style={[s.badgeText, { color: item.etiketRenk }]}>{item.etiket}</Text>
              </View>
              <Text style={s.kavramBaslik}>{item.baslik}</Text>
              <Text style={s.kavramAciklama}>{item.aciklama}</Text>
            </View>
          ))}

          {/* SSS — accordion */}
          {aktifKat === 'sss' && SSS.map((item, i) => (
            <TouchableOpacity key={i} style={s.sssKart}
              onPress={() => setAcikSSS(acikSSS === i ? null : i)} activeOpacity={0.8}>
              <View style={s.sssUst}>
                <Text style={s.sssSoru}>{item.soru}</Text>
                <Text style={s.sssOk}>{acikSSS === i ? '↑' : '↓'}</Text>
              </View>
              {acikSSS === i && <Text style={s.sssCevap}>{item.cevap}</Text>}
            </TouchableOpacity>
          ))}

        </View>

        {/* Uyarı kutusu */}
        <View style={s.uyariKutu}>
          <View style={s.uyari}>
            <Text style={s.uyariBaslik}>⚠️ Önemli Not</Text>
            <Text style={s.uyariText}>Bu platform akademik ve kişisel gelişim amaçlıdır. Profesyonel psikolojik tanı ve değerlendirmenin yerini tutmaz.</Text>
          </View>
        </View>

        <Footer navigation={navigation} />

        </ScrollView>
      </ScreenFadeIn>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },

  scroll: { alignItems: 'center', paddingBottom: 24, paddingTop: 22 },

  // Hero
  hero: { alignItems: 'center', gap: 10, paddingHorizontal: 24, maxWidth: MAX, width: '100%', marginBottom: 24 },
  heroIcon:    { width: 60, height: 60, borderRadius: 16, backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center' },
  heroIconText:{ fontSize: 28 },
  heroTitle:   { fontSize: isDesktop ? 26 : 22, fontWeight: '800', color: colors.textPrimary, fontFamily: FONT, textAlign: 'center' },
  heroSub:     { fontSize: 14, color: colors.textSecondary, fontFamily: FONT, textAlign: 'center', lineHeight: 22, maxWidth: 400 },

  // Kategori butonlar
  katScroll:  { maxWidth: MAX, width: '100%' },
  katRow:     { paddingHorizontal: 20, gap: 8, paddingBottom: 20 },
  katBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 9,
    borderRadius: 10, borderWidth: 1.5, borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  katBtnAktif:     { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  katEmoji:        { fontSize: 14 },
  katBtnText:      { fontSize: 13, color: colors.textSecondary, fontFamily: FONT, fontWeight: '500' },
  katBtnTextAktif: { color: colors.primary, fontWeight: '600' },

  liste: { maxWidth: MAX, width: '100%', paddingHorizontal: 20, gap: 10 },

  // Kaynak kartı
  kaynakKart: {
    backgroundColor: colors.surface, borderRadius: 14,
    borderWidth: 1, borderColor: colors.border, padding: 18, gap: 6,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 2,
  },
  kaynakKartUst:  { flexDirection: 'row', gap: 8, marginBottom: 4 },
  kaynakBaslik:   { fontSize: 15, fontWeight: '800', color: colors.textPrimary, fontFamily: FONT, lineHeight: 22 },
  kaynakYazar:    { fontSize: 12, color: colors.primary, fontWeight: '500', fontFamily: FONT },
  kaynakAciklama: { fontSize: 13, color: colors.textSecondary, lineHeight: 20, fontFamily: FONT },

  badge:     { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  badgeText: { fontSize: 11, fontWeight: '600', fontFamily: FONT, letterSpacing: 0.2 },

  // Kavram kartı
  kavramKart: {
    backgroundColor: colors.surface, borderRadius: 14,
    borderWidth: 1, borderColor: colors.border, padding: 18, gap: 6,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 5, elevation: 2,
  },
  kavramBaslik:   { fontSize: 15, fontWeight: '800', color: colors.textPrimary, fontFamily: FONT, lineHeight: 22 },
  kavramAciklama: { fontSize: 13, color: colors.textSecondary, lineHeight: 20, fontFamily: FONT },

  // SSS
  sssKart: {
    backgroundColor: colors.surface, borderRadius: 14,
    borderWidth: 1, borderColor: colors.border, padding: 18, gap: 12,
  },
  sssUst:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 },
  sssSoru:  { flex: 1, fontSize: 14, fontWeight: '600', color: colors.textPrimary, fontFamily: FONT, lineHeight: 21 },
  sssOk:    { fontSize: 14, color: colors.textMuted },
  sssCevap: { fontSize: 13, color: colors.textSecondary, lineHeight: 20, fontFamily: FONT },

  // Uyarı
  uyariKutu: {
    maxWidth: MAX, width: '100%', paddingHorizontal: 20, marginTop: 24,
  },
  uyari: {
    backgroundColor: '#FFFBEB', borderRadius: 12,
    borderWidth: 1, borderColor: '#FDE68A', padding: 16, gap: 6,
  },
  uyariBaslik: { fontSize: 13, fontWeight: '700', color: '#D97706', fontFamily: FONT },
  uyariText:   { fontSize: 12, color: '#92400E', fontFamily: FONT, lineHeight: 18, marginTop: 4 },
});
