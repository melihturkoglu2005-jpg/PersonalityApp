import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { mbtiHesapla } from '../utils/mbtiCalculator';
import { enneagramHesapla } from '../utils/enneagramCalculator';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;

// ─── MBTI Açıklamaları ────────────────────────────────────────────────────────
const MBTI_DETAYLI_ACIKLAMALAR = {
  INTJ: 'Sen vizyoner bir lider olarak öne çıkıyorsun. Büyük resmi görme yeteneğin ve stratejik düşünceyle, karmaşık problemleri çözme konusunda uzmansın. Mükemmeliyetçi doğan, kaliteli sonuçlar elde etmeni sağlıyor.',
  INTP: 'Sen meraklı bir düşünürsün. Soyut konuları derinlemesine analiz etme ve yenilikçi çözümler üretme yeteneğine sahipsin. Teorik bilgilerle pratik uygulamaları birleştirmekten keyif alıyorsun.',
  ENTJ: 'Sen doğal bir lidersin. Kararlılığın ve stratejik bakış açın, hedeflere ulaşmak için gereken yolu çizmeni sağlıyor. İnsanları motive etme ve organize etme konusunda yeteneklisin.',
  ENTP: 'Sen zeki ve yenilikçi bir tartışmacısın. Farklı bakış açıları sunma ve alışılmışın dışında düşünme yeteneğinle çevrendekileri etkiliyorsun. Yeni fikirler keşfetmek seni heyecanlandırıyor.',
  INFJ: 'Sen derin sezgilere sahip idealist birisin. İnsanların potansiyelini görme ve onlara ilham verme konusunda uzmansın. Değerlerine bağlı yaşaman ve başkalarına yardım etme arzun, seni özel kılıyor.',
  INFP: 'Sen empatik ve yaratıcı bir arabulucusun. İnsanların duygularını anlama ve onlara destek olma konusunda doğal yeteneğe sahipsin. Değerlerine bağlı yaşaman ve içsel dünyanın zenginliği, seni farklı kılıyor.',
  ENFJ: 'Sen ilham verici bir lider ve empatik bir dinleyicisin. İnsanları bir araya getirme ve onlara destek olma konusunda uzmansın. Sosyal ortamlarda parlıyorsun.',
  ENFP: 'Sen enerjik ve yaratıcı bir kampanyacısın. İnsanları heyecanlandırma ve yeni fikirler üretme konusunda yeteneklisin. Özgürlüğüne düşkün olman, yeniliklere açık olmanı sağlıyor.',
  ISTJ: 'Sen güvenilir ve sorumluluk sahibi bir lojistikçisin. Geleneklere saygın ve düzenli yapın, seni güvenilir bir kişi yapıyor. Verilen görevleri zamanında ve eksiksiz yerine getirme konusunda uzmansın.',
  ISFJ: 'Sen sadık ve koruyucu birisisin. Başkalarının ihtiyaçlarını görme ve onlara destek olma konusunda doğal yeteneğe sahipsin. Sessiz ve sakin doğan, seni iyi bir dinleyici yapıyor.',
  ESTJ: 'Sen düzenli ve kararlı bir yöneticisin. Kurallara ve geleneklere saygın, seni güvenilir bir lider yapıyor. Pratik yaklaşımın ve sorumluluk duygun, başarıyı getiriyor.',
  ESFJ: 'Sen sıcakkanlı ve toplum odaklı birisin. İnsanları bir araya getirme ve onlara destek olma konusunda uzmansın. Başkalarının duygularını anlama ve onlara yardımcı olma konusunda yeteneklisin.',
  ISTP: 'Sen pratik ve bağımsız bir virtüözsün. Soyut teorilerden çok, uygulamalı çözümlerle ilgileniyorsun. Araçları kullanma ve teknik konuları anlama konusunda yeteneklisin.',
  ISFP: 'Sen estetik duyarlılığı yüksek ve sakin bir maceracısın. Sanat ve güzellik senin için önemli. İnsanlarla ilişkilerde sakin ve anlayışlısın.',
  ESTP: 'Sen enerjik ve pratik bir girişimcisin. Anı yaşama ve risk alma konusunda cesursun. İnsanlarla kolay iletişim kurma ve ortamları neşelendirme yeteneğine sahipsin.',
  ESFP: 'Sen spontane ve hayat dolu bir eğlendiricisin. İnsanları neşelendirme ve ortamlara enerji katma konusunda uzmansın. Duygularını özgürce ifade ediyor ve başkalarını da buna teşvik ediyorsun.',
};

// ─── Tipe Özel Güçlü Yönler ──────────────────────────────────────────────────
const MBTI_GUCLU_YONLER = {
  INTJ: '• Uzun vadeli stratejik planlama\n• Karmaşık sistemleri analiz etme\n• Bağımsız ve verimli çalışma\n• Yüksek standartlar belirleme',
  INTP: '• Teorik problem çözme\n• Yaratıcı ve özgün düşünce\n• Nesnel analiz yapma\n• Derin odaklanma kapasitesi',
  ENTJ: '• Liderlik ve organizasyon\n• Hedef odaklı karar alma\n• İnsanları motive etme\n• Stratejik vizyon geliştirme',
  ENTP: '• Yenilikçi fikir üretme\n• Hızlı ve esnek düşünme\n• Tartışma ve ikna\n• Kalıpları kırma yeteneği',
  INFJ: '• Derin empati ve sezgi\n• Uzun vadeli vizyon\n• İnsan potansiyelini görme\n• Kararlı değer sistemi',
  INFP: '• Güçlü empati ve anlayış\n• Yaratıcı ifade\n• Değerlere derin bağlılık\n• Özgün bakış açısı',
  ENFJ: '• Karizmatik liderlik\n• İnsanları bir araya getirme\n• İletişim becerileri\n• Başkalarını geliştirme',
  ENFP: '• Yüksek enerji ve coşku\n• Yaratıcılık ve hayal gücü\n• İnsanlarla kolay bağ kurma\n• Yeni olasılıkları görme',
  ISTJ: '• Güvenilirlik ve tutarlılık\n• Detaylara dikkat\n• Sistematik çalışma\n• Söz verdiğini yerine getirme',
  ISFJ: '• Sadakat ve özveri\n• Başkalarına destek olma\n• Detay odaklı çalışma\n• Güven veren varlık',
  ESTJ: '• Güçlü organizasyon\n• Net karar alma\n• Liderlik ve yönetim\n• Geleneklere saygı',
  ESFJ: '• Sosyal uyum sağlama\n• Sıcak iletişim\n• Başkalarının ihtiyaçlarını görme\n• Güvenilir destek',
  ISTP: '• Pratik problem çözme\n• Teknik yetenek\n• Sakin ve mantıklı yaklaşım\n• Verimli eylem odaklılık',
  ISFP: '• Estetik duyarlılık\n• Anlık adaptasyon\n• Derin empati\n• Sanatsal ifade',
  ESTP: '• Hızlı eylem alma\n• Risk yönetimi\n• Sosyal enerji\n• Pratik çözümler üretme',
  ESFP: '• Spontane enerji\n• İnsanları neşelendirme\n• Esnek ve uyumlu olma\n• Anı değerlendirme',
};

// ─── Tipe Özel Kariyer Önerileri ─────────────────────────────────────────────
const MBTI_KARIYER = {
  INTJ: '• Strateji ve danışmanlık\n• Yazılım mimarliği\n• Akademik araştırma\n• Finansal analiz',
  INTP: '• Yazılım geliştirme\n• Bilimsel araştırma\n• Felsefe ve akademi\n• Sistem tasarımı',
  ENTJ: '• Üst düzey yöneticilik\n• Girişimcilik\n• Hukuk ve avukatlık\n• Proje yönetimi',
  ENTP: '• Girişimcilik\n• Ürün yönetimi\n• Hukuk\n• Yaratıcı direktörlük',
  INFJ: '• Psikoloji ve danışmanlık\n• Yazarlık\n• Eğitim\n• Sosyal hizmetler',
  INFP: '• Yaratıcı yazarlık\n• Grafik tasarım\n• Psikoloji\n• Sosyal hizmetler',
  ENFJ: '• Eğitim ve koçluk\n• İnsan kaynakları\n• Psikoloji\n• Sosyal liderlik',
  ENFP: '• Pazarlama ve reklamcılık\n• Koçluk\n• Gazetecilik\n• Sanat yönetimi',
  ISTJ: '• Muhasebe ve finans\n• Hukuk\n• Mühendislik\n• Kamu yönetimi',
  ISFJ: '• Hemşirelik ve sağlık\n• Eğitim\n• Sosyal hizmetler\n• İdari yönetim',
  ESTJ: '• Yöneticilik\n• Hukuk\n• Askerlik ve güvenlik\n• Finans yönetimi',
  ESFJ: '• Sağlık hizmetleri\n• Eğitim\n• Etkinlik yönetimi\n• İnsan kaynakları',
  ISTP: '• Mühendislik\n• Pilotluk ve teknik meslekler\n• Adli bilimler\n• Yazılım geliştirme',
  ISFP: '• Sanat ve tasarım\n• Veterinerlik\n• Moda\n• Fotoğrafçılık',
  ESTP: '• Girişimcilik\n• Satış ve pazarlama\n• Acil tıp\n• Spor yönetimi',
  ESFP: '• Sahne sanatları\n• Etkinlik yönetimi\n• Turizm\n• Çocuk eğitimi',
};

// ─── Enneagram Açıklamaları ───────────────────────────────────────────────────
const ENNEAGRAM_DETAYLI_ACIKLAMALAR = {
  1: 'Sen bir reformcusun. Mükemmeliyetçi doğan, her işi en iyi şekilde yapma arzunu taşıyor. Doğru ve yanlış arasında net bir ayrım yapma yeteneğine sahipsin.',
  2: 'Sen bir yardımseversin. Başkalarına destek olma ve onları mutlu etme konusunda doğal yeteneğe sahipsin. Empatik doğan, insanların ihtiyaçlarını anlamanı sağlıyor.',
  3: 'Sen bir başarıcısın. Hırslı ve rekabetçi yapın, hedeflerine ulaşmanda etkili oluyor. Başarıyı kanıtlama ve takdir edilme arzun, seni motive ediyor.',
  4: 'Sen bir bireycisin. Özgünlüğe ve derinliğe değer veriyorsun. Sanatsal ifadelerle kendini gösterme konusunda yeteneklisin.',
  5: 'Sen bir gözlemcisin. Bilgiye ve anlayışa değer veriyorsun. Analitik zekan, karmaşık konuları çözmeni sağlıyor.',
  6: 'Sen bir sadıksın. Güvenlik ve istikrar sana önemli. Sorumluluk sahibi olman ve verilen sözleri tutman, çevrende güven yaratıyor.',
  7: 'Sen bir meraklısın. Yeni deneyimler ve keşifler seni heyecanlandırıyor. Pozitif enerjin ve coşkun, insanları etkiliyor.',
  8: 'Sen bir meydan okuyucusun. Güçlü ve kararlı yapın, zorluklarla yüzleşmende etkili oluyor. Liderlik yeteneklerin ve cesaretin, seni doğal bir koruyucu yapıyor.',
  9: 'Sen bir barışçılsın. Uyum ve huzur sana önemli. Sakin ve anlayışlı doğan, çevrende huzur yayıyor.',
};

const ENNEAGRAM_KANAT_ACIKLAMALARI = {
  '1w2':'Mükemmeliyetçi yanında yardımsever bir kanadın var. İdealistik doğan, insanlığa hizmet etme arzunu taşıyor.',
  '1w9':'Mükemmeliyetçi yanında barışçıl bir kanadın var. İdeallerine ulaşma konusunda kararlısın ama bunu sakin bir şekilde yapıyorsun.',
  '2w1':'Yardımsever yanında mükemmeliyetçi bir kanadın var. İnsanlara yardım ederken doğru ve ilkeli olmaya çalışıyorsun.',
  '2w3':'Yardımsever yanında başarıcı bir kanadın var. İnsanlara yardım ederken başarılı ve takdir edilmek de istiyorsun.',
  '3w2':'Başarıcı yanında yardımsever bir kanadın var. Hedeflerine ulaşırken başkalarıyla iyi ilişkiler kuruyorsun.',
  '3w4':'Başarıcı yanında bireyci bir kanadın var. Başarılı olmaya çalışırken özgün olma ihtiyacın da var.',
  '4w3':'Bireyci yanında başarıcı bir kanadın var. Özgünlüğünü ifade ederken takdir edilmek de istiyorsun.',
  '4w5':'Bireyci yanında gözlemci bir kanadın var. Duygusal derinliğinin yanında entelektüel merakın da var.',
  '5w4':'Gözlemci yanında bireyci bir kanadın var. Bilgiye olan merakının yanında yaratıcılığın da var.',
  '5w6':'Gözlemci yanında sadık bir kanadın var. Bilgiye değer verirken güvenlik ve istikrar da arıyorsun.',
  '6w5':'Sadık yanında gözlemci bir kanadın var. Güvenlik ararken bilgi ve analiz de önemsiyorsun.',
  '6w7':'Sadık yanında meraklı bir kanadın var. Hem dikkatli hem coşkulu bir yapın var.',
  '7w6':'Meraklı yanında sadık bir kanadın var. Coşkulu yapınla birlikte dikkatli bir yanın var.',
  '7w8':'Meraklı yanında meydan okuyucu bir kanadın var. Enerjik ve liderlik özelliklerin var.',
  '8w7':'Meydan okuyucu yanında meraklı bir kanadın var. Hem koruyucu hem de yenilikçi olabiliyorsun.',
  '8w9':'Meydan okuyucu yanında barışçıl bir kanadın var. Gücünü kontrollü bir şekilde kullanıyorsun.',
  '9w1':'Barışçıl yanında mükemmeliyetçi bir kanadın var. Dengeli ve ahlaklı bir kişiliğe sahipsin.',
  '9w8':'Barışçıl yanında meydan okuyucu bir kanadın var. Sakin yapının altında güçlü bir yan saklı.',
};

function guvenRengi(skor) {
  if (skor >= 80) return colors.success;
  if (skor >= 60) return colors.secondary;
  return colors.error;
}
function guvenEtiketi(skor) {
  if (skor >= 80) return 'Yüksek güven';
  if (skor >= 60) return 'Orta güven';
  return 'Düşük güven';
}

export default function ResultScreen({ route, navigation }) {
  const { mbtiCevaplari, enneagramCevaplari } = route.params || {};

  const mbtiSonuc = useMemo(() => {
    if (!mbtiCevaplari) return null;
    try { return mbtiHesapla(mbtiCevaplari); } catch (e) { return null; }
  }, [mbtiCevaplari]);

  const enneagramSonuc = useMemo(() => {
    if (!enneagramCevaplari) return null;
    try { return enneagramHesapla(enneagramCevaplari); } catch (e) { return null; }
  }, [enneagramCevaplari]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.icerik}>

        <Text style={styles.baslik}>Sonuçların</Text>
        <Text style={styles.altBaslik}>Araştırma bazlı kişilik analizi</Text>

        {/* MBTI Kartı */}
        {mbtiSonuc && (
          <View style={[styles.kart, { borderColor: colors.primary + '55' }]}>
            <Text style={[styles.etiket, { color: colors.primary }]}>BİLİŞSEL FONKSİYONLAR</Text>
            <Text style={styles.buyukTip}>{mbtiSonuc.tip}</Text>
            <Text style={styles.aciklama}>{MBTI_DETAYLI_ACIKLAMALAR[mbtiSonuc.tip] || ''}</Text>

            <Text style={styles.altBaslikKutu}>Güçlü Yönlerin</Text>
            <Text style={styles.ozellikText}>{MBTI_GUCLU_YONLER[mbtiSonuc.tip] || ''}</Text>

            <Text style={styles.altBaslikKutu}>Kariyer Önerileri</Text>
            <Text style={styles.ozellikText}>{MBTI_KARIYER[mbtiSonuc.tip] || ''}</Text>

            <Text style={styles.altBaslikKutu}>Harold Grant Fonksiyon Yığını</Text>
            <View style={styles.yiginSatir}>
              {mbtiSonuc.yigin.slice(0, 4).map((f, i) => (
                <View key={f} style={[styles.yiginKutu, i === 0 && { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}>
                  <Text style={[styles.yiginF, i === 0 && { color: colors.primary }]}>{f}</Text>
                  <Text style={styles.yiginE}>{['Dom', 'Aux', 'Ter', 'Inf'][i]}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.altBaslikKutu}>Yakın Alternatifler</Text>
            <View style={styles.alternatifSatir}>
              {mbtiSonuc.alternatifler.map((t) => (
                <View key={t} style={styles.alternatifKutu}>
                  <Text style={styles.alternatifYazi}>{t}</Text>
                </View>
              ))}
            </View>

            <View style={styles.guvenSatir}>
              <Text style={styles.guvenYazi}>Algoritma güveni</Text>
              <View style={[styles.guvenBadge, { backgroundColor: guvenRengi(mbtiSonuc.guvenSkoru) + '22' }]}>
                <Text style={[styles.guvenBadgeYazi, { color: guvenRengi(mbtiSonuc.guvenSkoru) }]}>
                  {guvenEtiketi(mbtiSonuc.guvenSkoru)} · %{mbtiSonuc.guvenSkoru}
                </Text>
              </View>
            </View>

            <Text style={styles.altBaslikKutu}>Fonksiyon Skorları</Text>
            {Object.entries(mbtiSonuc.aksAyarliSkorlar).sort((a, b) => b[1] - a[1]).map(([f, skor]) => (
              <View key={f} style={styles.skorSatir}>
                <Text style={styles.skorEtiket}>{f}</Text>
                <View style={styles.barArka}>
                  <View style={[styles.barDolu, { width: skor + '%', backgroundColor: colors.primary }]} />
                </View>
                <Text style={styles.skorSayi}>{skor}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Enneagram Kartı */}
        {enneagramSonuc && (
          <View style={[styles.kart, { borderColor: colors.secondary + '55' }]}>
            <Text style={[styles.etiket, { color: colors.secondary }]}>ENNEAGRAM</Text>
            <Text style={styles.buyukTip}>{enneagramSonuc.kanatYazisi}</Text>
            <Text style={styles.aciklama}>{ENNEAGRAM_DETAYLI_ACIKLAMALAR[enneagramSonuc.tip] || ''}</Text>

            {enneagramSonuc.kanatYazisi !== enneagramSonuc.tip.toString() && (
              <Text style={[styles.aciklama, { marginTop: 12, fontStyle: 'italic' }]}>
                {ENNEAGRAM_KANAT_ACIKLAMALARI[enneagramSonuc.kanatYazisi] || ''}
              </Text>
            )}

            <Text style={styles.altBaslikKutu}>Temel Motivasyonların</Text>
            <Text style={styles.ozellikText}>
              {'• İçsel değerlere ve ilkelere bağlılık\n• Anlamlı ilişkiler kurma arzusu\n• Kişisel gelişim ve kendini gerçekleştirme\n• Dünya üzerinde olumlu etki bırakma'}
            </Text>

            <Text style={styles.altBaslikKutu}>Gelişim Alanların</Text>
            <Text style={styles.ozellikText}>
              {'• Duygusal zeka ve empati\n• Esneklik ve uyum sağlama\n• İletişim becerileri\n• Stres yönetimi'}
            </Text>

            <Text style={styles.altBaslikKutu}>Entegrasyon Yönleri</Text>
            <View style={styles.alternatifSatir}>
              <View style={[styles.alternatifKutu, { borderColor: colors.success + '66' }]}>
                <Text style={[styles.alternatifYazi, { color: colors.success }]}>
                  Güvenlik: {enneagramSonuc.entegrasyon.guvenlik}
                </Text>
              </View>
              <View style={[styles.alternatifKutu, { borderColor: colors.error + '66' }]}>
                <Text style={[styles.alternatifYazi, { color: colors.error }]}>
                  Stres: {enneagramSonuc.entegrasyon.stres}
                </Text>
              </View>
            </View>

            <View style={styles.guvenSatir}>
              <Text style={styles.guvenYazi}>Algoritma güveni</Text>
              <View style={[styles.guvenBadge, { backgroundColor: guvenRengi(enneagramSonuc.guvenSkoru) + '22' }]}>
                <Text style={[styles.guvenBadgeYazi, { color: guvenRengi(enneagramSonuc.guvenSkoru) }]}>
                  {guvenEtiketi(enneagramSonuc.guvenSkoru)} · %{enneagramSonuc.guvenSkoru}
                </Text>
              </View>
            </View>

            <Text style={styles.altBaslikKutu}>Tip Skorları</Text>
            {Object.entries(enneagramSonuc.kanatAyarliSkorlar).sort((a, b) => b[1] - a[1]).map(([tip, skor]) => (
              <View key={tip} style={styles.skorSatir}>
                <Text style={styles.skorEtiket}>Tip {tip}</Text>
                <View style={styles.barArka}>
                  <View style={[styles.barDolu, { width: skor + '%', backgroundColor: colors.secondary }]} />
                </View>
                <Text style={styles.skorSayi}>{skor}</Text>
              </View>
            ))}
          </View>
        )}

        {!mbtiSonuc && !enneagramSonuc && (
          <View style={styles.kart}>
            <Text style={styles.aciklama}>Sonuç yüklenemedi. Lütfen testi tekrar deneyin.</Text>
          </View>
        )}

        <TouchableOpacity style={styles.donButon} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.donButonYazi}>Ana Sayfaya Dön</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:            { flex: 1, backgroundColor: colors.background },
  icerik:          { padding: isDesktop ? 48 : 24, paddingBottom: 48, maxWidth: isDesktop ? 800 : '100%', alignSelf: 'center', width: '100%' },
  baslik:          { fontSize: isDesktop ? 40 : 32, fontWeight: '700', color: colors.textPrimary, marginTop: 16 },
  altBaslik:       { fontSize: 14, color: colors.textSecondary, marginTop: 6, marginBottom: 24 },
  kart:            { backgroundColor: colors.surface, borderRadius: 20, padding: isDesktop ? 28 : 22, borderWidth: 1, marginBottom: 16 },
  etiket:          { fontSize: 11, fontWeight: '700', letterSpacing: 2, marginBottom: 8 },
  buyukTip:        { fontSize: isDesktop ? 48 : 38, fontWeight: '700', color: colors.textPrimary, marginBottom: 6 },
  aciklama:        { fontSize: 14, color: colors.textSecondary, lineHeight: 22, marginBottom: 18 },
  altBaslikKutu:   { fontSize: 12, color: colors.textMuted, marginBottom: 10, marginTop: 6, fontWeight: '500' },
  ozellikText:     { fontSize: 14, color: colors.textSecondary, lineHeight: 22, marginBottom: 16 },
  yiginSatir:      { flexDirection: 'row', gap: 8, marginBottom: 14 },
  yiginKutu:       { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceLight },
  yiginF:          { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  yiginE:          { fontSize: 10, color: colors.textMuted, marginTop: 2 },
  alternatifSatir: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 14 },
  alternatifKutu:  { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: colors.border },
  alternatifYazi:  { fontSize: 13, color: colors.textSecondary, fontWeight: '500' },
  guvenSatir:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  guvenYazi:       { fontSize: 13, color: colors.textSecondary },
  guvenBadge:      { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  guvenBadgeYazi:  { fontSize: 12, fontWeight: '600' },
  skorSatir:       { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  skorEtiket:      { fontSize: 12, color: colors.textSecondary, width: 38, fontWeight: '500' },
  barArka:         { flex: 1, height: 6, backgroundColor: colors.border, borderRadius: 3 },
  barDolu:         { height: 6, borderRadius: 3 },
  skorSayi:        { fontSize: 12, color: colors.textMuted, width: 28, textAlign: 'right' },
  donButon:        { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
  donButonYazi:    { color: colors.textSecondary, fontSize: 15, fontWeight: '500' },
});