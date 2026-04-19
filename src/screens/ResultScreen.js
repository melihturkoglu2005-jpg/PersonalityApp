import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions, Platform } from 'react-native';
import { colors, space, shadows, radius } from '../theme/colors';
import { mbtiHesapla }       from '../utils/mbtiCalculator';
import { enneagramHesapla }  from '../utils/enneagramCalculator';
import TopNav from '../components/TopNav';
import AppBackground from '../components/AppBackground';
import ScreenFadeIn from '../components/ScreenFadeIn';
import Footer from '../components/Footer';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;
const FONT = Platform.select({ ios: 'System', android: 'sans-serif', web: "'Inter', system-ui, sans-serif" });

// ─── Veri (orijinalden taşındı) ───────────────────────────────────────────────
const MBTI_DETAYLI_ACIKLAMALAR = {
  INTJ:'Sen vizyoner bir lider olarak öne çıkıyorsun. Büyük resmi görme yeteneğin ve stratejik düşünceyle, karmaşık problemleri çözme konusunda uzmansın. Mükemmeliyetçi doğan, kaliteli sonuçlar elde etmeni sağlıyor.',
  INTP:'Sen meraklı bir düşünürsün. Soyut konuları derinlemesine analiz etme ve yenilikçi çözümler üretme yeteneğine sahipsin. Teorik bilgilerle pratik uygulamaları birleştirmekten keyif alıyorsun.',
  ENTJ:'Sen doğal bir lidersin. Kararlılığın ve stratejik bakış açın, hedeflere ulaşmak için gereken yolu çizmeni sağlıyor. İnsanları motive etme ve organize etme konusunda yeteneklisin.',
  ENTP:'Sen zeki ve yenilikçi bir tartışmacısın. Farklı bakış açıları sunma ve alışılmışın dışında düşünme yeteneğinle çevrendekileri etkiliyorsun. Yeni fikirler keşfetmek seni heyecanlandırıyor.',
  INFJ:'Sen derin sezgilere sahip idealist birisin. İnsanların potansiyelini görme ve onlara ilham verme konusunda uzmansın. Değerlerine bağlı yaşaman ve başkalarına yardım etme arzun, seni özel kılıyor.',
  INFP:'Sen empatik ve yaratıcı bir arabulucusun. İnsanların duygularını anlama ve onlara destek olma konusunda doğal yeteneğe sahipsin. Değerlerine bağlı yaşaman ve içsel dünyanın zenginliği, seni farklı kılıyor.',
  ENFJ:'Sen ilham verici bir lider ve empatik bir dinleyicisin. İnsanları bir araya getirme ve onlara destek olma konusunda uzmansın. Sosyal ortamlarda parlıyorsun.',
  ENFP:'Sen enerjik ve yaratıcı bir kampanyacısın. İnsanları heyecanlandırma ve yeni fikirler üretme konusunda yeteneklisin. Özgürlüğüne düşkün olman, yeniliklere açık olmanı sağlıyor.',
  ISTJ:'Sen güvenilir ve sorumluluk sahibi bir lojistikçisin. Geleneklere saygın ve düzenli yapın, seni güvenilir bir kişi yapıyor. Verilen görevleri zamanında ve eksiksiz yerine getirme konusunda uzmansın.',
  ISFJ:'Sen sadık ve koruyucu birisisin. Başkalarının ihtiyaçlarını görme ve onlara destek olma konusunda doğal yeteneğe sahipsin. Sessiz ve sakin doğan, seni iyi bir dinleyici yapıyor.',
  ESTJ:'Sen düzenli ve kararlı bir yöneticisin. Kurallara ve geleneklere saygın, seni güvenilir bir lider yapıyor. Pratik yaklaşımın ve sorumluluk duygun, başarıyı getiriyor.',
  ESFJ:'Sen sıcakkanlı ve toplum odaklı birisin. İnsanları bir araya getirme ve onlara destek olma konusunda uzmansın. Başkalarının duygularını anlama ve onlara yardımcı olma konusunda yeteneklisin.',
  ISTP:'Sen pratik ve bağımsız bir virtüözsün. Soyut teorilerden çok, uygulamalı çözümlerle ilgileniyorsun. Araçları kullanma ve teknik konuları anlama konusunda yeteneklisin.',
  ISFP:'Sen estetik duyarlılığı yüksek ve sakin bir maceracısın. Sanat ve güzellik senin için önemli. İnsanlarla ilişkilerde sakin ve anlayışlısın.',
  ESTP:'Sen enerjik ve pratik bir girişimcisin. Anı yaşama ve risk alma konusunda cesursun. İnsanlarla kolay iletişim kurma ve ortamları neşelendirme yeteneğine sahipsin.',
  ESFP:'Sen spontane ve hayat dolu bir eğlendiricisin. İnsanları neşelendirme ve ortamlara enerji katma konusunda uzmansın. Duygularını özgürce ifade ediyor ve başkalarını da buna teşvik ediyorsun.',
};
const MBTI_GUCLU_YONLER = {
  INTJ:'• Uzun vadeli stratejik planlama\n• Karmaşık sistemleri analiz etme\n• Bağımsız ve verimli çalışma\n• Yüksek standartlar belirleme',
  INTP:'• Teorik problem çözme\n• Yaratıcı ve özgün düşünce\n• Nesnel analiz yapma\n• Derin odaklanma kapasitesi',
  ENTJ:'• Liderlik ve organizasyon\n• Hedef odaklı karar alma\n• İnsanları motive etme\n• Stratejik vizyon geliştirme',
  ENTP:'• Yenilikçi fikir üretme\n• Hızlı ve esnek düşünme\n• Tartışma ve ikna\n• Kalıpları kırma yeteneği',
  INFJ:'• Derin empati ve sezgi\n• Uzun vadeli vizyon\n• İnsan potansiyelini görme\n• Kararlı değer sistemi',
  INFP:'• Güçlü empati ve anlayış\n• Yaratıcı ifade\n• Değerlere derin bağlılık\n• Özgün bakış açısı',
  ENFJ:'• Karizmatik liderlik\n• İnsanları bir araya getirme\n• İletişim becerileri\n• Başkalarını geliştirme',
  ENFP:'• Yüksek enerji ve coşku\n• Yaratıcılık ve hayal gücü\n• İnsanlarla kolay bağ kurma\n• Yeni olasılıkları görme',
  ISTJ:'• Güvenilirlik ve tutarlılık\n• Detaylara dikkat\n• Sistematik çalışma\n• Söz verdiğini yerine getirme',
  ISFJ:'• Sadakat ve özveri\n• Başkalarına destek olma\n• Detay odaklı çalışma\n• Güven veren varlık',
  ESTJ:'• Güçlü organizasyon\n• Net karar alma\n• Liderlik ve yönetim\n• Geleneklere saygı',
  ESFJ:'• Sosyal uyum sağlama\n• Sıcak iletişim\n• Başkalarının ihtiyaçlarını görme\n• Güvenilir destek',
  ISTP:'• Pratik problem çözme\n• Teknik yetenek\n• Sakin ve mantıklı yaklaşım\n• Verimli eylem odaklılık',
  ISFP:'• Estetik duyarlılık\n• Anlık adaptasyon\n• Derin empati\n• Sanatsal ifade',
  ESTP:'• Hızlı eylem alma\n• Risk yönetimi\n• Sosyal enerji\n• Pratik çözümler üretme',
  ESFP:'• Spontane enerji\n• İnsanları neşelendirme\n• Esnek ve uyumlu olma\n• Anı değerlendirme',
};
const MBTI_KARIYER = {
  INTJ:'• Strateji ve danışmanlık\n• Yazılım mimarliği\n• Akademik araştırma\n• Finansal analiz',
  INTP:'• Yazılım geliştirme\n• Bilimsel araştırma\n• Felsefe ve akademi\n• Sistem tasarımı',
  ENTJ:'• Üst düzey yöneticilik\n• Girişimcilik\n• Hukuk ve avukatlık\n• Proje yönetimi',
  ENTP:'• Girişimcilik\n• Ürün yönetimi\n• Hukuk\n• Yaratıcı direktörlük',
  INFJ:'• Psikoloji ve danışmanlık\n• Yazarlık\n• Eğitim\n• Sosyal hizmetler',
  INFP:'• Yaratıcı yazarlık\n• Grafik tasarım\n• Psikoloji\n• Sosyal hizmetler',
  ENFJ:'• Eğitim ve koçluk\n• İnsan kaynakları\n• Psikoloji\n• Sosyal liderlik',
  ENFP:'• Pazarlama ve reklamcılık\n• Koçluk\n• Gazetecilik\n• Sanat yönetimi',
  ISTJ:'• Muhasebe ve finans\n• Hukuk\n• Mühendislik\n• Kamu yönetimi',
  ISFJ:'• Hemşirelik ve sağlık\n• Eğitim\n• Sosyal hizmetler\n• İdari yönetim',
  ESTJ:'• Yöneticilik\n• Hukuk\n• Askerlik ve güvenlik\n• Finans yönetimi',
  ESFJ:'• Sağlık hizmetleri\n• Eğitim\n• Etkinlik yönetimi\n• İnsan kaynakları',
  ISTP:'• Mühendislik\n• Pilotluk ve teknik meslekler\n• Adli bilimler\n• Yazılım geliştirme',
  ISFP:'• Sanat ve tasarım\n• Veterinerlik\n• Moda\n• Fotoğrafçılık',
  ESTP:'• Girişimcilik\n• Satış ve pazarlama\n• Acil tıp\n• Spor yönetimi',
  ESFP:'• Sahne sanatları\n• Etkinlik yönetimi\n• Turizm\n• Çocuk eğitimi',
};
const ENNEAGRAM_DETAYLI_ACIKLAMALAR = {
  1:'Sen bir reformcusun. Mükemmeliyetçi doğan, her işi en iyi şekilde yapma arzunu taşıyor. Doğru ve yanlış arasında net bir ayrım yapma yeteneğine sahipsin.',
  2:'Sen bir yardımseversin. Başkalarına destek olma ve onları mutlu etme konusunda doğal yeteneğe sahipsin. Empatik doğan, insanların ihtiyaçlarını anlamanı sağlıyor.',
  3:'Sen bir başarıcısın. Hırslı ve rekabetçi yapın, hedeflerine ulaşmanda etkili oluyor. Başarıyı kanıtlama ve takdir edilme arzun, seni motive ediyor.',
  4:'Sen bir bireycisin. Özgünlüğe ve derinliğe değer veriyorsun. Sanatsal ifadelerle kendini gösterme konusunda yeteneklisin.',
  5:'Sen bir gözlemcisin. Bilgiye ve anlayışa değer veriyorsun. Analitik zekan, karmaşık konuları çözmeni sağlıyor.',
  6:'Sen bir sadıksın. Güvenlik ve istikrar sana önemli. Sorumluluk sahibi olman ve verilen sözleri tutman, çevrende güven yaratıyor.',
  7:'Sen bir meraklısın. Yeni deneyimler ve keşifler seni heyecanlandırıyor. Pozitif enerjin ve coşkun, insanları etkiliyor.',
  8:'Sen bir meydan okuyucusun. Güçlü ve kararlı yapın, zorluklarla yüzleşmende etkili oluyor. Liderlik yeteneklerin ve cesaretin, seni doğal bir koruyucu yapıyor.',
  9:'Sen bir barışçılsın. Uyum ve huzur sana önemli. Sakin ve anlayışlı doğan, çevrende huzur yayıyor.',
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

function guvenRengi(skor) { return skor >= 80 ? colors.success : skor >= 60 ? colors.secondary : colors.error; }
function guvenEtiketi(skor) { return skor >= 80 ? 'Yüksek güven' : skor >= 60 ? 'Orta güven' : 'Düşük güven'; }

export default function ResultScreen({ route, navigation }) {
  const { mbtiCevaplari, enneagramCevaplari } = route.params || {};

  const mbtiSonuc = useMemo(() => {
    if (!mbtiCevaplari) return null;
    try { return mbtiHesapla(mbtiCevaplari); } catch { return null; }
  }, [mbtiCevaplari]);

  const enneagramSonuc = useMemo(() => {
    if (!enneagramCevaplari) return null;
    try { return enneagramHesapla(enneagramCevaplari); } catch { return null; }
  }, [enneagramCevaplari]);

  return (
    <SafeAreaView style={s.safe}>
      <AppBackground />
      <ScreenFadeIn>
        <TopNav navigation={navigation} />
        <ScrollView contentContainerStyle={s.icerik}>

          <Text style={s.baslik}>Sonuçların</Text>
          <Text style={s.altBaslik}>Araştırma bazlı kişilik analizi</Text>

          {/* MBTI Kartı */}
          {mbtiSonuc && (
            <View style={[s.kart, { borderLeftColor: colors.primary, borderLeftWidth: 4 }]}>
              <View style={s.kartHeader}>
                <View>
                  <View style={[s.kartBadge, { backgroundColor: colors.primaryLight }]}>
                    <Text style={[s.etiket, { color: colors.primaryDark }]}>BİLİŞSEL FONKSİYONLAR</Text>
                  </View>
                  <Text style={s.buyukTip}>{mbtiSonuc.tip}</Text>
                </View>
                <View style={[s.guvenBadge, { backgroundColor: guvenRengi(mbtiSonuc.guvenSkoru) + '22' }]}>
                  <Text style={[s.guvenBadgeYazi, { color: guvenRengi(mbtiSonuc.guvenSkoru) }]}>
                    {guvenEtiketi(mbtiSonuc.guvenSkoru)} · %{mbtiSonuc.guvenSkoru}
                  </Text>
                </View>
              </View>

              <Text style={s.aciklama}>{MBTI_DETAYLI_ACIKLAMALAR[mbtiSonuc.tip] || ''}</Text>

              <Text style={s.altBaslikKutu}>Güçlü Yönlerin</Text>
              <Text style={s.ozellikText}>{MBTI_GUCLU_YONLER[mbtiSonuc.tip] || ''}</Text>

              <Text style={s.altBaslikKutu}>Kariyer Önerileri</Text>
              <Text style={s.ozellikText}>{MBTI_KARIYER[mbtiSonuc.tip] || ''}</Text>

              <Text style={s.altBaslikKutu}>Harold Grant Fonksiyon Yığını</Text>
              <View style={s.yiginSatir}>
                {mbtiSonuc.yigin.slice(0, 4).map((f, i) => (
                  <View key={f} style={[s.yiginKutu, i === 0 && {
                    backgroundColor: colors.primaryLight, borderColor: colors.primary,
                    ...shadows.colored(colors.primary),
                  }]}>
                    <Text style={[s.yiginF, i === 0 && { color: colors.primary }]}>{f}</Text>
                    <Text style={s.yiginE}>{['Dom','Aux','Ter','Inf'][i]}</Text>
                  </View>
                ))}
              </View>

              <Text style={s.altBaslikKutu}>Yakın Alternatifler</Text>
              <View style={s.alternatifSatir}>
                {mbtiSonuc.alternatifler.map(t => (
                  <View key={t} style={s.alternatifKutu}>
                    <Text style={s.alternatifYazi}>{t}</Text>
                  </View>
                ))}
              </View>

              <View style={s.guvenSatir}>
                <Text style={s.guvenYazi}>Algoritma güveni</Text>
                <View style={[s.guvenBadge, { backgroundColor: guvenRengi(mbtiSonuc.guvenSkoru) + '22' }]}>
                  <Text style={[s.guvenBadgeYazi, { color: guvenRengi(mbtiSonuc.guvenSkoru) }]}>
                    {guvenEtiketi(mbtiSonuc.guvenSkoru)} · %{mbtiSonuc.guvenSkoru}
                  </Text>
                </View>
              </View>

              <Text style={s.altBaslikKutu}>Fonksiyon Skorları</Text>
              {Object.entries(mbtiSonuc.aksAyarliSkorlar).sort((a,b) => b[1]-a[1]).map(([f, skor]) => (
                <View key={f} style={s.skorSatir}>
                  <Text style={s.skorEtiket}>{f}</Text>
                  <View style={s.barArka}>
                    <View style={[s.barDolu, { width: skor + '%', backgroundColor: colors.primary }]} />
                  </View>
                  <Text style={s.skorSayi}>{skor}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Enneagram Kartı */}
          {enneagramSonuc && (
            <View style={[s.kart, { borderLeftColor: colors.secondary, borderLeftWidth: 4 }]}>
              <View style={s.kartHeader}>
                <View>
                  <View style={[s.kartBadge, { backgroundColor: colors.secondaryLight }]}>
                    <Text style={[s.etiket, { color: colors.secondaryDark }]}>ENNEAGRAM</Text>
                  </View>
                  <Text style={[s.buyukTip, { color: colors.secondary }]}>{enneagramSonuc.kanatYazisi}</Text>
                </View>
                <View style={[s.guvenBadge, { backgroundColor: guvenRengi(enneagramSonuc.guvenSkoru) + '22' }]}>
                  <Text style={[s.guvenBadgeYazi, { color: guvenRengi(enneagramSonuc.guvenSkoru) }]}>
                    {guvenEtiketi(enneagramSonuc.guvenSkoru)} · %{enneagramSonuc.guvenSkoru}
                  </Text>
                </View>
              </View>

              <Text style={s.aciklama}>{ENNEAGRAM_DETAYLI_ACIKLAMALAR[enneagramSonuc.tip] || ''}</Text>
              {enneagramSonuc.kanatYazisi !== enneagramSonuc.tip.toString() && (
                <Text style={[s.aciklama, { marginTop: -space[3], fontStyle: 'italic' }]}>
                  {ENNEAGRAM_KANAT_ACIKLAMALARI[enneagramSonuc.kanatYazisi] || ''}
                </Text>
              )}

              <Text style={s.altBaslikKutu}>Temel Motivasyonların</Text>
              <Text style={s.ozellikText}>{'• İçsel değerlere ve ilkelere bağlılık\n• Anlamlı ilişkiler kurma arzusu\n• Kişisel gelişim ve kendini gerçekleştirme\n• Dünya üzerinde olumlu etki bırakma'}</Text>

              <Text style={s.altBaslikKutu}>Gelişim Alanların</Text>
              <Text style={s.ozellikText}>{'• Duygusal zeka ve empati\n• Esneklik ve uyum sağlama\n• İletişim becerileri\n• Stres yönetimi'}</Text>

              <Text style={s.altBaslikKutu}>Entegrasyon Yönleri</Text>
              <View style={s.alternatifSatir}>
                <View style={[s.alternatifKutu, { borderColor: colors.success + '66' }]}>
                  <Text style={[s.alternatifYazi, { color: colors.success }]}>Güvenlik: {enneagramSonuc.entegrasyon.guvenlik}</Text>
                </View>
                <View style={[s.alternatifKutu, { borderColor: colors.error + '66' }]}>
                  <Text style={[s.alternatifYazi, { color: colors.error }]}>Stres: {enneagramSonuc.entegrasyon.stres}</Text>
                </View>
              </View>

              <View style={s.guvenSatir}>
                <Text style={s.guvenYazi}>Algoritma güveni</Text>
                <View style={[s.guvenBadge, { backgroundColor: guvenRengi(enneagramSonuc.guvenSkoru) + '22' }]}>
                  <Text style={[s.guvenBadgeYazi, { color: guvenRengi(enneagramSonuc.guvenSkoru) }]}>
                    {guvenEtiketi(enneagramSonuc.guvenSkoru)} · %{enneagramSonuc.guvenSkoru}
                  </Text>
                </View>
              </View>

              <Text style={s.altBaslikKutu}>Tip Skorları</Text>
              {Object.entries(enneagramSonuc.kanatAyarliSkorlar).sort((a,b) => b[1]-a[1]).map(([tip, skor]) => (
                <View key={tip} style={s.skorSatir}>
                  <Text style={s.skorEtiket}>Tip {tip}</Text>
                  <View style={s.barArka}>
                    <View style={[s.barDolu, { width: skor + '%', backgroundColor: colors.secondary }]} />
                  </View>
                  <Text style={s.skorSayi}>{skor}</Text>
                </View>
              ))}
            </View>
          )}

          {!mbtiSonuc && !enneagramSonuc && (
            <View style={s.kart}>
              <Text style={s.aciklama}>Sonuç yüklenemedi. Lütfen testi tekrar deneyin.</Text>
            </View>
          )}

          <TouchableOpacity style={s.donButon} onPress={() => navigation.navigate('Home')}>
            <Text style={s.donButonYazi}>Ana Sayfaya Dön</Text>
          </TouchableOpacity>

          <Footer navigation={navigation} />
        </ScrollView>
      </ScreenFadeIn>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: colors.background },
  icerik:  { padding: isDesktop ? space[12] : space[6], paddingBottom: 0, maxWidth: isDesktop ? 800 : '100%', alignSelf: 'center', width: '100%' },
  baslik:  { fontSize: isDesktop ? 44 : 34, fontWeight: '800', color: colors.textPrimary, fontFamily: FONT, letterSpacing: -1, marginTop: space[4] },
  altBaslik: { fontSize: 14, color: colors.textSecondary, fontFamily: FONT, marginTop: space[1], marginBottom: space[6] },

  kart: {
    backgroundColor: colors.surface,
    borderRadius: radius.xxl,
    padding: isDesktop ? space[7] : space[6],
    borderWidth: 1, borderColor: colors.border,
    marginBottom: space[4],
    ...shadows.lg,
  },
  kartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: space[4] },
  kartBadge:  { borderRadius: radius.full, paddingHorizontal: space[3], paddingVertical: 4, alignSelf: 'flex-start', marginBottom: space[2] },
  etiket:     { fontSize: 10, fontWeight: '800', letterSpacing: 1.5, fontFamily: FONT },
  buyukTip:   { fontSize: isDesktop ? 56 : 44, fontWeight: '800', color: colors.textPrimary, fontFamily: FONT, letterSpacing: -2 },
  aciklama:   { fontSize: 14, color: colors.textSecondary, fontFamily: FONT, lineHeight: 23, marginBottom: space[5] },

  altBaslikKutu: { fontSize: 11, fontWeight: '700', color: colors.textMuted, fontFamily: FONT, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: space[3], marginTop: space[1] },
  ozellikText:   { fontSize: 14, color: colors.textSecondary, fontFamily: FONT, lineHeight: 23, marginBottom: space[4] },

  yiginSatir: { flexDirection: 'row', gap: space[3], marginBottom: space[4] },
  yiginKutu:  {
    flex: 1, alignItems: 'center', paddingVertical: space[4],
    borderRadius: radius.lg, borderWidth: 1.5, borderColor: colors.border,
    backgroundColor: colors.surfaceLight, ...shadows.sm,
  },
  yiginF: { fontSize: 18, fontWeight: '800', color: colors.textPrimary, fontFamily: FONT },
  yiginE: { fontSize: 10, color: colors.textMuted, marginTop: space[1], fontFamily: FONT, fontWeight: '600' },

  alternatifSatir: { flexDirection: 'row', gap: space[2], flexWrap: 'wrap', marginBottom: space[4] },
  alternatifKutu:  { paddingHorizontal: space[4], paddingVertical: space[2], borderRadius: radius.full, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.surfaceLight },
  alternatifYazi:  { fontSize: 13, color: colors.textSecondary, fontWeight: '500', fontFamily: FONT },

  guvenSatir:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: space[4] },
  guvenYazi:     { fontSize: 13, color: colors.textSecondary, fontFamily: FONT },
  guvenBadge:    { borderRadius: radius.full, paddingHorizontal: space[4], paddingVertical: space[2] },
  guvenBadgeYazi:{ fontSize: 12, fontWeight: '600', fontFamily: FONT },

  skorSatir:  { flexDirection: 'row', alignItems: 'center', gap: space[3], marginBottom: space[2] },
  skorEtiket: { fontSize: 12, color: colors.textSecondary, width: 40, fontWeight: '600', fontFamily: FONT },
  barArka:    { flex: 1, height: 8, backgroundColor: colors.borderLight, borderRadius: radius.full, overflow: 'hidden' },
  barDolu:    { height: 8, borderRadius: radius.full },
  skorSayi:   { fontSize: 12, color: colors.textMuted, width: 28, textAlign: 'right', fontFamily: FONT },

  donButon:     { backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.border, borderRadius: radius.xl, paddingVertical: space[5], alignItems: 'center', marginTop: space[2], ...shadows.sm },
  donButonYazi: { color: colors.textSecondary, fontSize: 15, fontWeight: '500', fontFamily: FONT },
});
