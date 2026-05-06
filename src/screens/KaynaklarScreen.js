import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Dimensions, Platform,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { FONT } from '../theme/constants';
import TopNav from '../components/TopNav';
import AppBackground from '../components/AppBackground';
import ScreenFadeIn from '../components/ScreenFadeIn';
import Footer from '../components/Footer';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;
const MAX  = 720;

const KATEGORILER = [
  { id: 'kitaplar',     label: 'Kitaplar',      emoji: '📚' },
  { id: 'arastirmalar', label: 'Araştırmalar',  emoji: '🔬' },
  { id: 'kavramlar',    label: 'Kavramlar',     emoji: '💡' },
  { id: 'sss',          label: 'SSS',           emoji: '❓' },
];

const KITAPLAR = [
  { baslik: 'Psikolojik Tipler', yazar: 'Carl Gustav Jung', yil: '1921', aciklama: 'MBTI\'nin temelini oluşturan, arketip ve kişilik tipleri üzerine kapsamlı çalışma. Dışadönük/içedönük ayrımını sistematik olarak ilk kez tanımlar.', seviye: 'İleri', etiket: 'Kaynak Eser' },
  { baslik: 'Gifts Differing', yazar: 'Isabel Briggs Myers', yil: '1980', aciklama: 'MBTI\'nin yaratıcısının kendi kaleme aldığı temel referans. 16 tipi derinlemesine inceler ve günlük yaşamdaki uygulamalarını açıklar.', seviye: 'Başlangıç', etiket: 'MBTI' },
  { baslik: 'The Wisdom of the Enneagram', yazar: 'Don Richard Riso & Russ Hudson', yil: '1999', aciklama: 'Enneagram\'ın en kapsamlı modern kaynakları arasında. Her tipin sağlıklı ve sağlıksız düzeylerini ayrıntılı inceler.', seviye: 'Orta', etiket: 'Enneagram' },
  { baslik: 'Please Understand Me II', yazar: 'David Keirsey', yil: '1998', aciklama: 'Keirsey Mizaç Modeli\'ni MBTI ile ilişkilendiren klasik eser. Dört temel mizacı pratik örneklerle açıklar.', seviye: 'Başlangıç', etiket: 'MBTI' },
  { baslik: 'The Enneagram: A Christian Perspective', yazar: 'Richard Rohr & Andreas Ebert', yil: '2001', aciklama: 'Enneagram\'ı ruhsal gelişim perspektifinden ele alan, her tipin motivasyonlarını ve dönüşüm potansiyelini inceleyen kapsamlı rehber.', seviye: 'Orta', etiket: 'Enneagram' },
];

const ARASTIRMALAR = [
  { baslik: 'MBTI\'nin Psikometrik Özellikleri', yazar: 'McCrae & Costa', yil: '1989', aciklama: 'MBTI ile Beş Büyük kişilik boyutları arasındaki ilişkiyi inceleyen kritik çalışma. Test-tekrar güvenilirliği ve yapı geçerliliğini ele alır.', seviye: 'Akademik', etiket: 'Psikoloji' },
  { baslik: 'Enneagram\'ın Geçerliliği ve Güvenilirliği', yazar: 'Sutton et al.', yil: '2013', aciklama: 'Enneagram\'ın psikometrik özelliklerini değerlendiren sistematik derleme. Ölçüm araçlarını ve araştırma bulgularını karşılaştırır.', seviye: 'Akademik', etiket: 'Psikoloji' },
  { baslik: 'Kişilik Tiplerinin İş Performansıyla İlişkisi', yazar: 'Barrick & Mount', yil: '1991', aciklama: 'Kişilik özelliklerinin çeşitli iş kriterleriyle ilişkisini inceleyen meta-analiz. Beş Büyük boyutların iş başarısını nasıl yordadığını gösterir.', seviye: 'Akademik', etiket: 'Endüstriyel Psikoloji' },
  { baslik: 'Kişilik ve Refahın İlişkisi', yazar: 'DeNeve & Cooper', yil: '1998', aciklama: 'Kişilik özelliklerinin öznel refah ile ilişkisini inceleyen kapsamlı meta-analiz. 137 çalışmanın sonuçlarını sentezler.', seviye: 'Akademik', etiket: 'Pozitif Psikoloji' },
];

const KAVRAMLAR = [
  { baslik: 'Bilişsel Fonksiyonlar', aciklama: 'Jung\'un tanımladığı sekiz bilişsel fonksiyon (Te, Ti, Fe, Fi, Se, Si, Ne, Ni), bilgiyi nasıl işlediğimizi ve kararlarımızı nasıl aldığımızı tanımlar. Her MBTI tipinin baskın, yardımcı, üçüncül ve aşağı fonksiyonları vardır.', etiket: 'MBTI' },
  { baslik: 'Kanatlar (Enneagram)', aciklama: 'Her kişilik tipi, komşu tiplerden birinin veya ikisinin özelliklerini taşır. Bu "kanatlar", kişiliğin nüanslı ve dinamik doğasını yansıtır.', etiket: 'Enneagram' },
  { baslik: 'Entegrasyon ve Bozulma', aciklama: 'Her tip, stres altında belirli bir tipe (bozulma), güvenli hissederken başka bir tipe (entegrasyon) doğru hareket eder. Bu dinamik, büyüme yolunu gösterir.', etiket: 'Enneagram' },
  { baslik: 'Yanlış Tip Atama (Mistyping)', aciklama: 'Sosyal baskılar, anlık ruh hali veya testin soru yapısı nedeniyle kişi gerçek tipinden farklı sonuç alabilir. Sonuçları değil, temeldeki bilişsel örüntüleri anlamak önemlidir.', etiket: 'Genel' },
  { baslik: 'Beş Büyük Model (Big Five)', aciklama: 'Psikoloji araştırmalarında en fazla kullanılan model: Açıklık, Sorumluluk, Dışadönüklük, Uyumluluk ve Nevrotiklik (OCEAN). MBTI boyutlarıyla güçlü korelasyonlar gösterir.', etiket: 'Karşılaştırma' },
  { baslik: 'Kişilik Gelişimi ve Yaş', aciklama: 'Jung\'a göre kişilik yaşam boyunca gelişir. Orta yaşta "gölge" ile yüzleşme ve eksik fonksiyonları geliştirme kritik bir süreçtir.', etiket: 'Gelişimsel' },
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
  const { colors } = useTheme();
  const paramKat = route?.params?.initialKat;
  const [aktifKat, setAktifKat] = useState(() => KAT_IDS.includes(paramKat) ? paramKat : 'kitaplar');
  const [acikSSS,  setAcikSSS]  = useState(null);

  useEffect(() => {
    const k = route?.params?.initialKat;
    if (KAT_IDS.includes(k)) { setAktifKat(k); setAcikSSS(null); }
  }, [route?.params?.initialKat]);

  const veri = aktifKat === 'kitaplar' ? KITAPLAR : aktifKat === 'arastirmalar' ? ARASTIRMALAR : aktifKat === 'kavramlar' ? KAVRAMLAR : SSS;

  // Etiket rengi
  function etiketRenk(etiket) {
    if (etiket === 'MBTI' || etiket === 'Kaynak Eser') return { bg: colors.primaryLight, renk: colors.primaryDark };
    if (etiket === 'Enneagram')    return { bg: colors.violetLight, renk: colors.violetDark };
    if (etiket === 'Akademik' || etiket?.includes('Psikoloji')) return { bg: colors.secondaryLight, renk: colors.secondaryDark };
    return { bg: colors.surfaceLight, renk: colors.textMuted };
  }

  function seviyeRenk(seviye) {
    if (seviye === 'Başlangıç') return { bg: colors.primaryLight, renk: colors.primaryDark };
    if (seviye === 'Orta')      return { bg: colors.accentLight,  renk: colors.accentDark };
    if (seviye === 'İleri' || seviye === 'Akademik') return { bg: colors.violetLight, renk: colors.violetDark };
    return { bg: colors.surfaceLight, renk: colors.textMuted };
  }

  return (
    <SafeAreaView style={[s.safe, { backgroundColor: colors.background }]}>
      <AppBackground />
      <ScreenFadeIn>
        <TopNav navigation={navigation} />
        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

          {/* Hero */}
          <View style={s.hero}>
            <View style={[s.heroIcon, { backgroundColor: colors.secondaryLight }]}>
              <Text style={s.heroIconText}>🧠</Text>
            </View>
            <Text style={[s.heroTitle, { color: colors.textPrimary }]}>Psikoloji Kütüphanesi</Text>
            <Text style={[s.heroSub, { color: colors.textSecondary }]}>
              Kişilik psikolojisi alanındaki temel eserler, akademik araştırmalar ve kavramsal rehberler.
            </Text>
          </View>

          {/* Kategori Seçici */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}
            style={s.katScroll} contentContainerStyle={s.katRow}>
            {KATEGORILER.map(k => {
              const aktif = aktifKat === k.id;
              return (
                <TouchableOpacity
                  key={k.id}
                  style={[
                    s.katBtn,
                    { backgroundColor: colors.surface, borderColor: colors.border },
                    aktif && { backgroundColor: colors.primaryLight, borderColor: colors.primaryDark },
                  ]}
                  onPress={() => { setAktifKat(k.id); setAcikSSS(null); }} activeOpacity={0.7}
                >
                  <Text style={s.katEmoji}>{k.emoji}</Text>
                  <Text style={[s.katBtnText, { color: colors.textSecondary }, aktif && { color: colors.primaryDark, fontWeight: '700' }]}>
                    {k.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* İçerik */}
          <View style={s.liste}>

            {/* Kitaplar & Araştırmalar */}
            {(aktifKat === 'kitaplar' || aktifKat === 'arastirmalar') && veri.map((item, i) => {
              const sv = seviyeRenk(item.seviye);
              const et = etiketRenk(item.etiket);
              return (
                <View key={i} style={[s.kaynakKart, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                  <View style={s.badgeRow}>
                    <View style={[s.badge, { backgroundColor: sv.bg }]}>
                      <Text style={[s.badgeText, { color: sv.renk }]}>{item.seviye}</Text>
                    </View>
                    <View style={[s.badge, { backgroundColor: et.bg }]}>
                      <Text style={[s.badgeText, { color: et.renk }]}>{item.etiket}</Text>
                    </View>
                  </View>
                  <Text style={[s.kaynakBaslik, { color: colors.textPrimary }]}>{item.baslik}</Text>
                  <Text style={[s.kaynakYazar, { color: colors.primary }]}>{item.yazar} · {item.yil}</Text>
                  <Text style={[s.kaynakAciklama, { color: colors.textSecondary }]}>{item.aciklama}</Text>
                </View>
              );
            })}

            {/* Kavramlar */}
            {aktifKat === 'kavramlar' && KAVRAMLAR.map((item, i) => {
              const et = etiketRenk(item.etiket);
              return (
                <View key={i} style={[s.kavramKart, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                  <View style={[s.badge, { backgroundColor: et.bg }]}>
                    <Text style={[s.badgeText, { color: et.renk }]}>{item.etiket}</Text>
                  </View>
                  <Text style={[s.kavramBaslik, { color: colors.textPrimary }]}>{item.baslik}</Text>
                  <Text style={[s.kavramAciklama, { color: colors.textSecondary }]}>{item.aciklama}</Text>
                </View>
              );
            })}

            {/* SSS */}
            {aktifKat === 'sss' && SSS.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={[s.sssKart, { backgroundColor: colors.surface, borderColor: colors.border }]}
                onPress={() => setAcikSSS(acikSSS === i ? null : i)} activeOpacity={0.8}
              >
                <View style={s.sssUst}>
                  <Text style={[s.sssSoru, { color: colors.textPrimary }]}>{item.soru}</Text>
                  <Text style={[s.sssOk, { color: colors.textMuted }]}>{acikSSS === i ? '↑' : '↓'}</Text>
                </View>
                {acikSSS === i && <Text style={[s.sssCevap, { color: colors.textSecondary }]}>{item.cevap}</Text>}
              </TouchableOpacity>
            ))}
          </View>

          <Footer navigation={navigation} />
        </ScrollView>
      </ScreenFadeIn>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:   { flex: 1 },
  scroll: { alignItems: 'center', paddingBottom: 24, paddingTop: 22 },

  hero:        { alignItems: 'center', gap: 10, paddingHorizontal: 24, maxWidth: MAX, width: '100%', marginBottom: 20 },
  heroIcon:    { width: 60, height: 60, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  heroIconText:{ fontSize: 28 },
  heroTitle:   { fontSize: isDesktop ? 26 : 22, fontWeight: '800', fontFamily: FONT, textAlign: 'center' },
  heroSub:     { fontSize: 14, fontFamily: FONT, textAlign: 'center', lineHeight: 22, maxWidth: 400 },

  katScroll: { maxWidth: MAX, width: '100%' },
  katRow:    { paddingHorizontal: 20, gap: 8, paddingBottom: 20 },
  katBtn:    { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 10, borderWidth: 1.5 },
  katEmoji:  { fontSize: 14 },
  katBtnText:{ fontSize: 13, fontFamily: FONT, fontWeight: '500' },

  liste: { maxWidth: MAX, width: '100%', paddingHorizontal: 20, gap: 10 },

  kaynakKart: { borderRadius: 14, borderWidth: 1.5, borderBottomWidth: 4, padding: 16, gap: 6 },
  badgeRow:   { flexDirection: 'row', gap: 8, marginBottom: 2 },
  badge:      { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  badgeText:  { fontSize: 11, fontWeight: '600', fontFamily: FONT },
  kaynakBaslik:   { fontSize: 15, fontWeight: '800', fontFamily: FONT, lineHeight: 22 },
  kaynakYazar:    { fontSize: 12, fontWeight: '600', fontFamily: FONT },
  kaynakAciklama: { fontSize: 13, lineHeight: 20, fontFamily: FONT },

  kavramKart:   { borderRadius: 14, borderWidth: 1.5, borderBottomWidth: 4, padding: 16, gap: 8 },
  kavramBaslik: { fontSize: 15, fontWeight: '800', fontFamily: FONT, lineHeight: 22 },
  kavramAciklama:{ fontSize: 13, lineHeight: 20, fontFamily: FONT },

  sssKart: { borderRadius: 14, borderWidth: 1.5, padding: 16, gap: 10 },
  sssUst:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 },
  sssSoru: { flex: 1, fontSize: 14, fontWeight: '600', fontFamily: FONT, lineHeight: 21 },
  sssOk:   { fontSize: 14 },
  sssCevap:{ fontSize: 13, lineHeight: 20, fontFamily: FONT },
});
