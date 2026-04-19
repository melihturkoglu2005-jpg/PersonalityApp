import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { mbtiHesapla } from '../utils/mbtiCalculator';
import { enneagramHesapla } from '../utils/enneagramCalculator';
import TopNav from '../components/TopNav';
import AppBackground from '../components/AppBackground';
import ScreenFadeIn from '../components/ScreenFadeIn';
import Footer from '../components/Footer';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;
const FONT = Platform.select({ ios: 'System', android: 'sans-serif', web: "'Inter', system-ui, sans-serif" });

// ─── MBTI Açıklamaları ────────────────────────────────────────────────────────
const MBTI_DETAYLI_ACIKLAMALAR = {
  INTJ: 'Stratejik düşünce ve bağımsız yargının güçlü biçimde bir araya geldiği bir profil. Karmaşık sistemleri analiz etme ve uzun vadeli vizyon geliştirme konusunda belirgin bir yatkınlık görülüyor.',
  INTP: 'Teorik merak ve analitik derinliğin öne çıktığı bir profil. Soyut kavramları parçalara ayırma ve kendi mantık çerçevesini oluşturma isteği belirgin.',
  ENTJ: 'Organizasyon ve hedef odaklılığın ön planda olduğu bir profil. İnsanları harekete geçirme ve kaynakları verimli biçimde yönetme konusunda güçlü bir eğilim var.',
  ENTP: 'Fikir üretme ve olasılıkları keşfetme konusunda belirgin bir istek. Yerleşik kalıpları sorgulamak ve alternatif bakış açıları geliştirmek doğal bir eğilim olarak öne çıkıyor.',
  INFJ: 'Uzun vadeli vizyon ve insan odaklı sezginin birleştiği bir profil. İnsanların potansiyelini görme ve anlam taşıyan projelere adanma eğilimi belirgin.',
  INFP: 'İçsel değer sistemi ve yaratıcı ifadenin güçlü olduğu bir profil. Otantiklik ve anlam arayışı, kararları belirleyen temel bir etken olarak öne çıkıyor.',
  ENFJ: 'Sosyal bağ kurma ve başkalarını geliştirme konusunda belirgin bir istek. Grup dinamiklerini okuma ve uyum sağlama becerileri öne çıkıyor.',
  ENFP: 'Yüksek sosyal enerji ve yeni olasılıklara açıklık. İnsanlarla bağlantı kurma ve yaratıcı fikirleri hayata geçirme konusunda güçlü bir motivasyon var.',
  ISTJ: 'Güvenilirlik, tutarlılık ve sistematik çalışmanın öne çıktığı bir profil. Verilen taahhütleri yerine getirme ve düzen oluşturma konusunda belirgin bir yatkınlık görülüyor.',
  ISFJ: 'Başkalarını destekleme ve koruma isteğinin güçlü olduğu bir profil. Detaylara dikkat ve sadakat, ilişkilerdeki temel örüntüler olarak öne çıkıyor.',
  ESTJ: 'Organizasyon ve liderlik eğiliminin belirgin olduğu bir profil. Süreçleri düzene sokma ve sonuç üretme konusunda güçlü bir motivasyon görülüyor.',
  ESFJ: 'Sosyal uyum ve başkalarının ihtiyaçlarına duyarlılığın öne çıktığı bir profil. Çevresindeki insanlar için destek ve sıcaklık kaynağı olma eğilimi belirgin.',
  ISTP: 'Pratik problem çözme ve sistemleri anlama isteğinin güçlü olduğu bir profil. Somut, elle tutulur sonuçlara odaklanma ve teknik alanlarda derin merak öne çıkıyor.',
  ISFP: 'Estetik duyarlılık ve anlık deneyime açıklığın birleştiği bir profil. Değerlere bağlılık ve sanatsal ifade önemli motivasyon kaynakları.',
  ESTP: 'Anlık değerlendirme ve pratik eyleme yatkınlığın öne çıktığı bir profil. Sosyal enerji ve risk alma konusunda belirgin bir eğilim görülüyor.',
  ESFP: 'Yüksek sosyal enerji ve anı değerlendirme isteğinin güçlü olduğu bir profil. İnsanları bir araya getirme ve ortama canlılık katma eğilimi belirgin.',
};

// ─── Tipe Özel Güçlü Yönler ──────────────────────────────────────────────────
const MBTI_GUCLU_YONLER = {
  INTJ: '• Uzun vadeli stratejik planlama\n• Karmaşık sistemleri analiz etme\n• Bağımsız ve verimli çalışma\n• Yüksek standartlar belirleme ve sürdürme',
  INTP: '• Teorik problem çözme ve modelleme\n• Yaratıcı ve özgün düşünce üretme\n• Nesnel, tarafsız analiz yapma\n• Derin odaklanma ve fikir geliştirme',
  ENTJ: '• Liderlik, organizasyon ve delegasyon\n• Hedef odaklı stratejik karar alma\n• İnsanları motive etme ve yönlendirme\n• Kaynakları verimli yönetme',
  ENTP: '• Yenilikçi ve alışılmışın dışında fikir üretme\n• Hızlı ve esnek düşünce bağlantıları kurma\n• Tartışma ve alternatif perspektif sunma\n• Kalıpları kırma ve sistemi sorgulama',
  INFJ: '• Derin empati ve insan sezgisi\n• Uzun vadeli vizyon ve anlam yaratma\n• İnsan potansiyelini görme ve geliştirme\n• Kararlı ve tutarlı değer sistemi',
  INFP: '• Güçlü empati ve anlayış\n• Yaratıcı ve özgün ifade\n• Değerlere derin bağlılık ve bütünlük\n• Anlam taşıyan projelere tam adanma',
  ENFJ: '• Karizmatik liderlik ve ilham verme\n• İnsanları bir araya getirme\n• Güçlü iletişim ve empati becerileri\n• Başkalarının gelişimini kolaylaştırma',
  ENFP: '• Yüksek enerji ve coşku\n• Yaratıcılık ve hayal gücü\n• İnsanlarla kolayca samimi bağ kurma\n• Yeni olasılıkları ve fırsatları görme',
  ISTJ: '• Güvenilirlik ve tutarlılık\n• Detaylara dikkat ve özen\n• Sistematik ve verimli çalışma\n• Verilen söz ve taahhütleri yerine getirme',
  ISFJ: '• Sadakat ve özveri\n• Başkalarının ihtiyaçlarını fark etme ve karşılama\n• Detay odaklı ve özenli çalışma\n• Güven veren, istikrarlı bir varlık',
  ESTJ: '• Güçlü organizasyon ve yapı kurma\n• Net ve kararlı karar alma\n• Liderlik, yönetim ve koordinasyon\n• Standartları belirleme ve koruma',
  ESFJ: '• Sosyal uyum ve köprü kurma\n• Sıcak, samimi iletişim\n• Başkalarının ihtiyaçlarını görme ve karşılama\n• Güvenilir ve destekleyici varlık',
  ISTP: '• Pratik ve verimli problem çözme\n• Teknik yetenek ve sistem anlama\n• Sakin ve mantıklı yaklaşım\n• Somut, elle tutulur sonuçlar üretme',
  ISFP: '• Estetik duyarlılık ve güzellik algısı\n• Anlık adaptasyon ve esneklik\n• Derin empati ve insancıl ilgi\n• Sanatsal ifade ve yaratıcılık',
  ESTP: '• Hızlı ve etkili eylem alma\n• Pratik risk değerlendirmesi\n• Sosyal enerji ve kolayca bağ kurma\n• Anlık çözümler ve fırsatları görme',
  ESFP: '• Spontane enerji ve canlılık\n• İnsanları neşelendirme ve bir araya getirme\n• Esnek ve uyumlu olma\n• Anı tam olarak değerlendirme',
};

// ─── Tipe Özel Kariyer Önerileri ─────────────────────────────────────────────
const MBTI_KARIYER = {
  INTJ: '• Strateji ve yönetim danışmanlığı\n• Yazılım mimarliği ve sistem tasarımı\n• Akademik araştırma ve analiz\n• Finansal analiz ve yatırım',
  INTP: '• Yazılım geliştirme ve mühendislik\n• Bilimsel araştırma ve akademi\n• Felsefe, matematik, mantık\n• Sistem ve veri tasarımı',
  ENTJ: '• Üst düzey yöneticilik ve liderlik\n• Girişimcilik ve iş geliştirme\n• Hukuk ve kurumsal avukatlık\n• Proje ve program yönetimi',
  ENTP: '• Girişimcilik ve ürün yönetimi\n• Hukuk ve stratejik danışmanlık\n• Yaratıcı direktörlük ve inovasyon\n• Araştırma ve geliştirme',
  INFJ: '• Psikoloji, terapi ve danışmanlık\n• Yazarlık ve içerik üretimi\n• Eğitim ve koçluk\n• Sosyal hizmetler ve sivil toplum',
  INFP: '• Yaratıcı yazarlık ve içerik üretimi\n• Grafik tasarım ve sanat\n• Psikoloji ve danışmanlık\n• Sosyal hizmetler ve insan hakları',
  ENFJ: '• Eğitim ve liderlik koçluğu\n• İnsan kaynakları ve organizasyon geliştirme\n• Psikoloji ve terapötik hizmetler\n• Sosyal liderlik ve sivil toplum',
  ENFP: '• Pazarlama, reklam ve marka yönetimi\n• Koçluk ve kişisel gelişim\n• Gazetecilik ve medya\n• Sanat yönetimi ve kültürel projeler',
  ISTJ: '• Muhasebe, denetim ve finans\n• Hukuk ve uyumluluk\n• Mühendislik ve teknik yönetim\n• Kamu yönetimi ve idare',
  ISFJ: '• Hemşirelik ve sağlık hizmetleri\n• Eğitim ve öğretmenlik\n• Sosyal hizmetler ve toplum çalışması\n• İdari yönetim ve koordinasyon',
  ESTJ: '• Yöneticilik ve operasyonel liderlik\n• Hukuk ve yargı\n• Güvenlik, ordu ve kamu düzeni\n• Finans yönetimi ve bütçeleme',
  ESFJ: '• Sağlık hizmetleri ve hasta bakımı\n• Eğitim ve sınıf yönetimi\n• Etkinlik yönetimi ve koordinasyon\n• İnsan kaynakları ve çalışan ilişkileri',
  ISTP: '• Mühendislik ve teknik alanlar\n• Pilotluk, mekanik ve zanaatkârlık\n• Adli bilimler ve soruşturma\n• Yazılım geliştirme ve sistem yönetimi',
  ISFP: '• Sanat, tasarım ve fotoğrafçılık\n• Veterinerlik ve hayvan bakımı\n• Moda tasarımı ve el sanatları\n• Müzik ve sahne sanatları',
  ESTP: '• Girişimcilik ve satış liderliği\n• Pazarlama ve iş geliştirme\n• Acil tıp ve kriz yönetimi\n• Spor yönetimi ve performans koçluğu',
  ESFP: '• Sahne sanatları ve eğlence\n• Etkinlik yönetimi ve organizasyon\n• Turizm ve konaklama\n• Çocuk eğitimi ve pedagoji',
};

// ─── Enneagram — Tipe Özgü Açıklamalar ───────────────────────────────────────
const ENNEAGRAM_DETAYLI_ACIKLAMALAR = {
  1: 'İçsel bir adalet pusulası ve "doğru olanı yapma" isteği belirgin biçimde öne çıkıyor. Standartlarını düşürmeye karşı güçlü bir direnç ve hataya yönelik eleştirel bir iç ses dikkat çekiyor.',
  2: 'Başkalarının ihtiyaçlarına duyarlılık ve bağlantı kurma isteği baskın bir örüntü olarak öne çıkıyor. Sevilmek ve değerli hissetmek için verilen çaba, kendi ihtiyaçlarını ikinci plana itme eğilimi yaratıyor.',
  3: 'Başarı ve takdir, motivasyonun merkezinde yer alıyor. Sonuç üretme ve olumlu bir imaj sürdürme isteği güçlü; başarısız görünme kaygısı belirgin bir örüntü.',
  4: 'Özgünlük ve derinlik için güçlü bir istek öne çıkıyor. Sahip olunmayana duyulan özlem ve "eksik olan bir şey" hissi, duygusal dünyayı şekillendiren temel bir tema.',
  5: 'Bilgi, anlayış ve yetkinlik isteği belirgin. Enerji ve kaynakları koruma ihtiyacı, sosyal dünyadan zaman zaman geri çekilmeye yol açıyor.',
  6: 'Güvenlik ve öngörülebilirlik temel bir ihtiyaç olarak öne çıkıyor. Risk ve tehditleri önceden görme çabası, hem dikkatli hem de sadakat odaklı bir kişilik ortaya koyuyor.',
  7: 'Yeni deneyimler ve olasılıklar güçlü bir çekim gücü taşıyor. Acı ve sınırlılıktan kaçınma isteği, seçenekleri açık tutma ve bağlanmaktan kaçınma eğilimi yaratıyor.',
  8: 'Güç, kontrol ve korunma isteği belirgin. Zayıflık veya savunmasızlık görünmemeye yönelik güçlü bir eğilim ve haksızlığa sert tepki verme örüntüsü dikkat çekiyor.',
  9: 'Uyum ve iç huzur, baskın değerler olarak öne çıkıyor. Çatışmadan kaçınma ve başkalarının ihtiyaçlarına göre şekillenme eğilimi, kendi önceliklerini arka plana itmesine yol açıyor.',
};

// ─── Tipe Özgü Motivasyonlar ──────────────────────────────────────────────────
const ENNEAGRAM_MOTIVASYONLAR = {
  1: '• Doğru ve ahlaki olanı yapma isteği\n• Dünyayı daha iyi bir yer haline getirme\n• Kendi standartlarını karşılama ve içsel tutarlılık\n• Hatalardan ve suçluluktan kaçınma',
  2: '• Sevilme ve takdir edilme ihtiyacı\n• Başkalarına değer katma ve fark yaratma\n• Derin ve anlamlı bağlantılar kurma\n• Reddedilme ve gereksiz hissinden kaçınma',
  3: '• Değerli ve başarılı görünme isteği\n• Somut hedeflere ulaşma ve ilerleme\n• Takdir, prestij ve tanınma\n• Başarısızlık ve değersizlik hissinden kaçınma',
  4: '• Özgün, kendine özgü bir kimlik oluşturma\n• Derin duygusal deneyim ve anlam arama\n• Sanatsal ya da yaratıcı ifade yoluyla var olma\n• Sıradan ve kimliksiz hisseden bir yaşamdan kaçınma',
  5: '• Bilgi, anlayış ve yetkinlik geliştirme\n• Bağımsız düşünce ve kendi içindeki netlik\n• Yeterli kaynağa ve alana sahip hissetme\n• Yetersizlik ve ele geçirilme hissinden kaçınma',
  6: '• Güvenli, öngörülebilir bir ortam yaratma\n• Güvendiği kişi ve kurumlarla bağ kurma\n• Olası tehlikeleri önceden fark etme\n• Terk edilme ve desteksiz kalmaktan kaçınma',
  7: '• Yeni deneyimler, maceralar ve keşifler\n• Seçenekleri ve olasılıkları açık tutma\n• Neşe, heyecan ve anlık doyum\n• Acı, can sıkıntısı ve sınırlılıktan kaçınma',
  8: '• Kendi hayatı üzerinde güç ve kontrol\n• Savunmasız kalmama ve koruma\n• Önemsediği kişileri güçlendirme ve koruma\n• Kontrol kaybından ve zayıf görünmekten kaçınma',
  9: '• İç huzur ve çevreyle uyum içinde olma\n• Çatışmadan uzak, sakin bir ortam\n• Herkesi kapsayan, bütünleştirici bir bakış açısı\n• Parçalanma ve bağlantı kaybından kaçınma',
};

// ─── Tipe Özgü Gelişim Alanları ──────────────────────────────────────────────
const ENNEAGRAM_GELISIM = {
  1: '• Kendini ve başkalarını olduğu gibi kabul etme\n• İç eleştirmen sesini fark etme ve yumuşatma\n• Mükemmel olmadan da yeterli olunabileceğini içselleştirme\n• Öfkeyi üretken biçimde ifade etme',
  2: '• Kendi ihtiyaçlarını tanıma ve dile getirme\n• Yardım etme ile karşılıklılık beklentisini ayırt etme\n• Sınır koyma becerisini geliştirme\n• Kendi değerini başkalarının onayından bağımsız hissetme',
  3: '• Başarının ötesinde değerini fark etme\n• Yavaşlamak ve gerçek duyguları keşfetmek\n• Kimliğini ne yaptığından bağımsız tanımlamak\n• Başarısızlığı bir tehdit değil, öğrenme fırsatı görmek',
  4: '• Şimdiki anı ve sahip olunanları takdir etme\n• İdealleştirilmiş olanla değil, gerçekle bağ kurma\n• Duygulara boğulmadan onları gözlemleme\n• Sıradan olmaktan korkmadan var olabilme',
  5: '• Duygularına daha fazla alan açma\n• Başkalarıyla bağlantıya izin verme\n• Bilgi ve hazırlık olmadan da harekete geçebilme\n• "Yeterince bilmiyorum" kaygısını serbest bırakma',
  6: '• Kendi yargı ve sezgilerine güvenme\n• Endişeyi eylemden ayırt etme\n• Belirsizlikle daha az dirençle durabilme\n• Desteği hak ettiğini ve güvende olduğunu içselleştirme',
  7: '• Olumsuz duyguları kaçmadan deneyimleme\n• Derinliğe ve bağlılığa izin verme\n• Anı sakince yaşarken geleceği planlamayı bırakma\n• Sınırlılıkların da anlam taşıyabileceğini kabul etme',
  8: '• Savunmasızlığı zayıflık değil, güç olarak görme\n• Kontrolü bırakma ve güvenme pratiği\n• Öfkenin altındaki duyguları keşfetme\n• Yumuşak gücü ve inceliği geliştirme',
  9: '• Kendi önceliklerini ve arzularını netleştirme\n• Çatışmadan kaçınmak yerine doğrudan ifade etme\n• Eylemsizlik ve ertelemeyle farkındalıkla çalışma\n• Kendi varlığının ve sesinin değerini fark etme',
};

const ENNEAGRAM_KANAT_ACIKLAMALARI = {
  '1w2':'Mükemmeliyetçi bir yapının yanında güçlü bir yardım etme isteği var. Standartlarını korurken insani bağa önem veriyor.',
  '1w9':'Mükemmeliyetçi yapı, barışçıl ve sakin bir kanatla dengeleniyor. Değişimi temkinli, adım adım tercih ediyor.',
  '2w1':'Yardım etme isteğinin yanında ilkeli ve ahlaklı olmaya önem veriliyor. Destek sunarken doğru olanı da gözetme eğilimi var.',
  '2w3':'Yardımseverlik, başarı ve takdirle iç içe geçmiş durumda. İnsanlara destek olurken aynı zamanda tanınmak ve değer görmek istiyor.',
  '3w2':'Başarı odaklılık, sıcak insan ilişkileriyle destekleniyor. Hedeflere ulaşırken çevresindekileri de yanına almayı önemsiyor.',
  '3w4':'Başarı arzusunun yanında özgün ve farklı olmak da güçlü bir motivasyon. Başarıyı kendine özgü bir tarzla ifade etme eğiliminde.',
  '4w3':'Özgünlük ve derinliğin yanında tanınma ve takdir isteği de var. Yaratıcı ifadesini dünyayla paylaşmak istiyor.',
  '4w5':'Duygusal derinliğin yanında güçlü bir entelektüel merak var. İçsel dünyayı hem hissederek hem düşünerek keşfediyor.',
  '5w4':'Analitik zihnin yanında yaratıcı ve benzersiz bakış açısı geliyor. Bilgiyi özgün bir ifadeyle birleştirme eğiliminde.',
  '5w6':'Bilgi ve yetkinlik arayışının yanında güvenlik ve öngörülebilirlik ihtiyacı var. Sistematik ve hazırlıklı olmayı tercih ediyor.',
  '6w5':'Güvenlik arayışı, derinlemesine analiz ve bilgiyle destekleniyor. Risk ve tehditleri dikkatle değerlendiriyor.',
  '6w7':'Dikkatli ve sadık yapının yanında bir coşku ve merak da var. Endişelerini heyecanla dengelemeye çalışıyor.',
  '7w6':'Coşkulu keşif isteği, sadakat ve temkinlilikle dengeleniyor. Maceralarına güven duyduğu insanlarla çıkmayı tercih ediyor.',
  '7w8':'Enerji ve coşkuya güçlü bir liderlik ve bağımsızlık eşlik ediyor. Hem maceracı hem de belirleyici bir kişilik profili.',
  '8w7':'Koruyucu güç, enerjik ve yenilikçi bir yapıyla birleşiyor. Hem güçlü hem de heyecan arayan bir profil.',
  '8w9':'Güç ve kararlılığın yanında barışçıl bir derinlik var. Gücünü sessizce ve kontrollü biçimde kullanıyor.',
  '9w1':'Barışçıl yapıya ilkeli ve ahlaklı bir kanat eşlik ediyor. Hem uyumlu hem de etik olmaya önem veriyor.',
  '9w8':'Sakin yüzeyin altında güçlü bir irade ve kararlılık var. Gerektiğinde net sınırlar koyabiliyor.',
};

function guvenRengi(skor) {
  if (skor >= 75) return colors.success;
  if (skor >= 60) return colors.primary;
  return colors.warning;
}
function guvenEtiketi(skor) {
  if (skor >= 75) return 'Güçlü profil';
  if (skor >= 60) return 'Orta netlik';
  return 'Karma profil';
}

// ─── Disclaimer bileşeni ─────────────────────────────────────────────────────
function Disclaimer() {
  return (
    <View style={ds.kutu}>
      <Text style={ds.ikon}>ℹ</Text>
      <Text style={ds.metin}>
        Bu sonuçlar kişisel farkındalık ve keşif amacıyla hazırlanmıştır. Klinik bir tanı, mesleki yönlendirme ya da psikolojik değerlendirme aracı değildir. MBTI ve Enneagram modelleri sınırlı psikometrik desteğe sahiptir; sonuçlarınız mutlak veya kalıcı değildir. Kariyer, ilişki veya yaşam kararları için bir uzman psikolog ya da kariyer danışmanına başvurmanızı öneririz.
      </Text>
    </View>
  );
}

const ds = StyleSheet.create({
  kutu: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: colors.warningLight,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.warning + '55',
    padding: 16,
    marginBottom: 24,
  },
  ikon: { fontSize: 16, color: colors.warning, marginTop: 1, flexShrink: 0 },
  metin: { fontSize: 13, color: '#78350F', lineHeight: 20, flex: 1, fontFamily: FONT },
});

// ─── Ana ekran ────────────────────────────────────────────────────────────────
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
      <AppBackground />
      <ScreenFadeIn>
        <TopNav navigation={navigation} />
        <ScrollView contentContainerStyle={styles.icerik} showsVerticalScrollIndicator={false}>

          {/* Başlık */}
          <View style={styles.baslikWrap}>
            <Text style={styles.baslik}>Profilinin Sonuçları</Text>
            <Text style={styles.altBaslik}>Kişisel farkındalık ve keşif aracı</Text>
          </View>

          {/* Disclaimer */}
          <Disclaimer />

          {/* MBTI Kartı */}
          {mbtiSonuc && (
            <View style={[styles.kart, { borderTopColor: colors.primary, borderTopWidth: 3 }]}>
              <View style={styles.kartHeader}>
                <View style={[styles.kartEtiketBg, { backgroundColor: colors.primaryLight }]}>
                  <Text style={[styles.kartEtiket, { color: colors.primaryDark }]}>BİLİŞSEL FONKSİYONLAR</Text>
                </View>
                <View style={[styles.guvenBadge, { backgroundColor: guvenRengi(mbtiSonuc.guvenSkoru) + '18' }]}>
                  <Text style={[styles.guvenBadgeYazi, { color: guvenRengi(mbtiSonuc.guvenSkoru) }]}>
                    {guvenEtiketi(mbtiSonuc.guvenSkoru)}
                  </Text>
                </View>
              </View>

              <Text style={styles.buyukTip}>{mbtiSonuc.tip}</Text>
              <Text style={styles.aciklama}>{MBTI_DETAYLI_ACIKLAMALAR[mbtiSonuc.tip] || ''}</Text>

              <View style={styles.bolum}>
                <Text style={styles.bolumBaslik}>Güçlü Yönlerin</Text>
                <Text style={styles.ozellikText}>{MBTI_GUCLU_YONLER[mbtiSonuc.tip] || ''}</Text>
              </View>

              <View style={styles.bolum}>
                <Text style={styles.bolumBaslik}>Kariyer Alanları — Örnek Öneriler</Text>
                <Text style={styles.kariyer_uyari}>Bu alanlar senin profiliyle sık örtüşen alanlardır; kesin bir yönlendirme değildir.</Text>
                <Text style={styles.ozellikText}>{MBTI_KARIYER[mbtiSonuc.tip] || ''}</Text>
              </View>

              <View style={styles.bolum}>
                <Text style={styles.bolumBaslik}>Bilişsel Fonksiyon Yığını</Text>
                <View style={styles.yiginSatir}>
                  {mbtiSonuc.yigin.slice(0, 4).map((f, i) => (
                    <View key={f} style={[styles.yiginKutu, i === 0 && { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}>
                      <Text style={[styles.yiginF, i === 0 && { color: colors.primaryDark }]}>{f}</Text>
                      <Text style={styles.yiginE}>{['Dom', 'Aux', 'Ter', 'Inf'][i]}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.bolum}>
                <Text style={styles.bolumBaslik}>Yakın Alternatifler</Text>
                <View style={styles.alternatifSatir}>
                  {mbtiSonuc.alternatifler.map((t) => (
                    <View key={t} style={styles.alternatifKutu}>
                      <Text style={styles.alternatifYazi}>{t}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.bolum}>
                <Text style={styles.bolumBaslik}>Profil Tutarlılığı</Text>
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
            </View>
          )}

          {/* Enneagram Kartı */}
          {enneagramSonuc && (
            <View style={[styles.kart, { borderTopColor: colors.enneagram, borderTopWidth: 3 }]}>
              <View style={styles.kartHeader}>
                <View style={[styles.kartEtiketBg, { backgroundColor: colors.enneagramLight }]}>
                  <Text style={[styles.kartEtiket, { color: colors.enneagram }]}>ENNEAGRAM</Text>
                </View>
                <View style={[styles.guvenBadge, { backgroundColor: guvenRengi(enneagramSonuc.guvenSkoru) + '18' }]}>
                  <Text style={[styles.guvenBadgeYazi, { color: guvenRengi(enneagramSonuc.guvenSkoru) }]}>
                    {guvenEtiketi(enneagramSonuc.guvenSkoru)}
                  </Text>
                </View>
              </View>

              <Text style={styles.buyukTip}>{enneagramSonuc.kanatYazisi}</Text>
              <Text style={styles.aciklama}>{ENNEAGRAM_DETAYLI_ACIKLAMALAR[enneagramSonuc.tip] || ''}</Text>

              {enneagramSonuc.kanatYazisi !== enneagramSonuc.tip.toString() && (
                <Text style={[styles.aciklama, { marginTop: -8, fontStyle: 'italic', color: colors.textMuted }]}>
                  {ENNEAGRAM_KANAT_ACIKLAMALARI[enneagramSonuc.kanatYazisi] || ''}
                </Text>
              )}

              <View style={styles.bolum}>
                <Text style={styles.bolumBaslik}>Temel Motivasyonların</Text>
                <Text style={styles.ozellikText}>{ENNEAGRAM_MOTIVASYONLAR[enneagramSonuc.tip] || ''}</Text>
              </View>

              <View style={styles.bolum}>
                <Text style={styles.bolumBaslik}>Gelişim Alanların</Text>
                <Text style={styles.ozellikText}>{ENNEAGRAM_GELISIM[enneagramSonuc.tip] || ''}</Text>
              </View>

              <View style={styles.bolum}>
                <Text style={styles.bolumBaslik}>Entegrasyon Yönleri</Text>
                <View style={styles.alternatifSatir}>
                  <View style={[styles.alternatifKutu, { borderColor: colors.success + '66', backgroundColor: colors.successLight }]}>
                    <Text style={[styles.alternatifYazi, { color: colors.success }]}>
                      Güvenlikte → Tip {enneagramSonuc.entegrasyon.guvenlik}
                    </Text>
                  </View>
                  <View style={[styles.alternatifKutu, { borderColor: colors.error + '66', backgroundColor: colors.errorLight }]}>
                    <Text style={[styles.alternatifYazi, { color: colors.error }]}>
                      Stres altında → Tip {enneagramSonuc.entegrasyon.stres}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.bolum}>
                <Text style={styles.bolumBaslik}>Tip Skorları</Text>
                {Object.entries(enneagramSonuc.kanatAyarliSkorlar).sort((a, b) => b[1] - a[1]).map(([tip, skor]) => (
                  <View key={tip} style={styles.skorSatir}>
                    <Text style={styles.skorEtiket}>Tip {tip}</Text>
                    <View style={styles.barArka}>
                      <View style={[styles.barDolu, { width: skor + '%', backgroundColor: colors.enneagram }]} />
                    </View>
                    <Text style={styles.skorSayi}>{skor}</Text>
                  </View>
                ))}
              </View>
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

          <Footer navigation={navigation} />
        </ScrollView>
      </ScreenFadeIn>
    </SafeAreaView>
  );
}

const PAD = isDesktop ? 48 : 24;

const styles = StyleSheet.create({
  safe:            { flex: 1, backgroundColor: colors.background },
  icerik:          { padding: PAD, paddingBottom: 0, maxWidth: isDesktop ? 800 : '100%', alignSelf: 'center', width: '100%' },

  baslikWrap:      { marginBottom: 24 },
  baslik:          { fontSize: isDesktop ? 36 : 28, fontWeight: '700', color: colors.textPrimary, fontFamily: FONT, letterSpacing: -0.5 },
  altBaslik:       { fontSize: 14, color: colors.textMuted, marginTop: 6, fontFamily: FONT },

  kart:            { backgroundColor: colors.surface, borderRadius: 20, padding: isDesktop ? 32 : 24, borderWidth: 1, borderColor: colors.border, marginBottom: 24,
                     shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 12, elevation: 2 },

  kartHeader:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  kartEtiketBg:    { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  kartEtiket:      { fontSize: 11, fontWeight: '700', letterSpacing: 1.5, fontFamily: FONT },

  guvenBadge:      { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  guvenBadgeYazi:  { fontSize: 12, fontWeight: '600', fontFamily: FONT },

  buyukTip:        { fontSize: isDesktop ? 52 : 40, fontWeight: '700', color: colors.textPrimary, marginBottom: 8, fontFamily: FONT, letterSpacing: -1 },
  aciklama:        { fontSize: 15, color: colors.textSecondary, lineHeight: 24, marginBottom: 24, fontFamily: FONT },

  bolum:           { marginBottom: 24 },
  bolumBaslik:     { fontSize: 12, color: colors.textMuted, fontWeight: '600', letterSpacing: 0.5, marginBottom: 12, fontFamily: FONT, textTransform: 'uppercase' },

  kariyer_uyari:   { fontSize: 12, color: colors.warning, backgroundColor: colors.warningLight, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6, marginBottom: 10, fontFamily: FONT },

  ozellikText:     { fontSize: 14, color: colors.textSecondary, lineHeight: 24, fontFamily: FONT },

  yiginSatir:      { flexDirection: 'row', gap: 8 },
  yiginKutu:       { flex: 1, alignItems: 'center', paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceLight },
  yiginF:          { fontSize: 16, fontWeight: '700', color: colors.textPrimary, fontFamily: FONT },
  yiginE:          { fontSize: 10, color: colors.textMuted, marginTop: 4, fontFamily: FONT },

  alternatifSatir: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  alternatifKutu:  { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surfaceLight },
  alternatifYazi:  { fontSize: 13, color: colors.textSecondary, fontWeight: '500', fontFamily: FONT },

  skorSatir:       { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  skorEtiket:      { fontSize: 12, color: colors.textSecondary, width: 40, fontWeight: '600', fontFamily: FONT },
  barArka:         { flex: 1, height: 6, backgroundColor: colors.borderLight, borderRadius: 4, overflow: 'hidden' },
  barDolu:         { height: 6, borderRadius: 4 },
  skorSayi:        { fontSize: 12, color: colors.textMuted, width: 32, textAlign: 'right', fontFamily: FONT },

  donButon:        { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 14, paddingVertical: 18, alignItems: 'center', marginTop: 8 },
  donButonYazi:    { color: colors.textSecondary, fontSize: 15, fontWeight: '500', fontFamily: FONT },
});
