import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { mbtiHesapla } from '../utils/mbtiCalculator';
import { enneagramHesapla } from '../utils/enneagramCalculator';
import ResultCard from '../components/ResultCard';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;

const MBTI_DETAYLI_ACIKLAMALAR = {
  INTJ: 'Sen vizyoner bir lider olarak öne çıkıyorsun. Büyük resmi görme yeteneğin ve stratejik düşünceyle, karmaşık problemleri çözme konusunda uzmansın. Mükemmeliyetçi doğan, kaliteli sonuçlar elde etmeni sağlıyor. İnsanlarla ilişkilerinde seçici davransan da, doğru insanlara karşı sadık kalıyorsun. Kariyerinde uzun vadeli hedefler belirlemek ve bunlara adım adım ulaşmak senin gücün.',
  INTP: 'Sen meraklı bir düşünürsün. Soyut konuları derinlemesine analiz etme ve yenilikçi çözümler üretme yeteneğine sahipsin. Teorik bilgilerle pratik uygulamaları birleştirmekten keyif alıyorsun. Sosyal ortamlarda biraz çekingen olsan da, ilgi duyduğun konularda saatlerce konuşabilirsin. Yaratıcılığın ve mantıklı yaklaşımın, seni problem çözmede etkili kılıyor.',
  ENTJ: 'Sen doğal bir lidersin. Kararlılığın ve stratejik bakış açın, hedeflere ulaşmak için gereken yolu çizmeni sağlıyor. İnsanları motive etme ve organize etme konusunda yeteneklisin. Zorluklar karşısında asla pes etmiyorsun. Hırslı doğan, başarıyı getirse de, bazen aceci kararlar almana neden olabiliyor. İnsan ilişkilerinde daha sabırlı olmanı tavsiye ederim.',
  ENTP: 'Sen zeki ve yenilikçi bir tartışmacısın. Farklı bakış açıları sunma ve alışılmışın dışında düşünme yeteneğinle çevrendekileri etkiliyorsun. Yeni fikirler keşfetmek seni heyecanlandırıyor. Tartışmalarda kendini ifade etmeyi seversin ama bazen başladığın işleri bitirmekte zorlanabilirsin. Esnekliğin ve hızlı düşünmen, sana avantaj sağlıyor.',
  INFJ: 'Sen derin sezgilere sahip idealist birisin. İnsanların potansiyelini görme ve onlara ilham verme konusunda uzmansın. Değerlerine bağlı yaşaman ve başkalarına yardım etme arzun, seni özel kılıyor. Az konuşsan da, söyledikleri anlam taşıyor. Kariyerinde insanlığa hizmet edebileceğin bir rol bulmak seni mutlu edecektir.',
  INFP: 'Sen empatik ve yaratıcı bir arabulucusun. İnsanların duygularını anlama ve onlara destek olma konusunda doğal yeteneğe sahipsin. Değerlerine bağlı yaşaman ve içsel dünyanın zenginliği, seni farklı kılıyor. Sanatsal ifadelerle kendini ifade etmekten keyif alıyorsun. Bazen gerçek dünyada kendini ifade etmekte zorlansan da, içsel gücün seni taşıyor.',
  ENFJ: 'Sen ilham verici bir lider ve empatik bir dinleyicisin. İnsanları bir araya getirme ve onlara destek olma konusunda uzmansın. Başkalarının potansiyelini görme ve onları geliştirme konusunda tutkulusun. Sosyal ortamlarda parlıyorsun ama bazen başkalarının ihtiyaçlarını kendi ihtiyaçlarından önde tutuyorsun. İnsan ilişkilerindeki başarın, seni doğal bir lider yapıyor.',
  ENFP: 'Sen enerjik ve yaratıcı bir kampanyacısın. İnsanları heyecanlandırma ve yeni fikirler üretme konusunda yeteneklisin. Özgürlüğüne düşkün olman, yeniliklere açık olmanı sağlıyor. Sosyal çevrende popüler olsan da, dikkatini dağıtan çok fazla projeyle uğraşma eğilimindesin. İnsanlara ilham verme yeteneğin, seni özel kılıyor.',
  ISTJ: 'Sen güvenilir ve sorumluluk sahibi bir lojistikçisin. Geleneklere saygın ve düzenli yapın, seni güvenilir bir kişi yapıyor. Verilen görevleri zamanında ve eksiksiz yerine getirme konusunda uzmansın. Değişime biraz yavaş adapte olsan da, sabrın ve istikrarın başarıyı getiriyor. Kariyerinde istikrarlı bir yükseliş seni bekliyor.',
  ISFJ: 'Sen sadık ve koruyucu birisisin. Başkalarının ihtiyaçlarını görme ve onlara destek olma konusunda doğal yeteneğe sahipsin. Aile ve arkadaşlarına karşı duyduğun sadakat takdir ediliyor. Sessiz ve sakin doğan, seni iyi bir dinleyici yapıyor. Kendi ihtiyaçlarını bazen ihmal etsen de, başkalarına hizmet etmekten büyük keyif alıyorsun.',
  ESTJ: 'Sen düzenli ve kararlı bir yöneticisin. Kurallara ve geleneklere saygın, seni güvenilir bir lider yapıyor. İnsanları organize etme ve hedeflere ulaşma konusunda uzmansın. Pratik yaklaşımın ve sorumluluk duygun, başarıyı getiriyor. Bazen esnek olmaktan zorlansan da, liderlik yeteneklerin takdir ediliyor.',
  ESFJ: 'Sen sıcakkanlı ve toplum odaklı bir konsülsün. İnsanları bir araya getirme ve onlara destek olma konusunda uzmansın. Sosyal çevrende popüler ve seviliyorsun. Başkalarının duygularını anlama ve onlara yardımcı olma konusunda yeteneklisin. Bazen başkalarının beklentilerini kendi isteklerinden önde tutsan da, bu özelliğin seni değerli kılıyor.',
  ISTP: 'Sen pratik ve bağımsız bir virtüözsün. Soyut teorilerden çok, uygulamalı çözümlerle ilgileniyorsun. Araçları kullanma ve teknik konuları anlama konusunda yeteneklisin. Anı yaşama ve esnek olman, seni zor durumlarda etkili kılıyor. İnsan ilişkilerinde biraz mesafeli olsan da, doğru zamanda doğru müdahaleyi yapabiliyorsun.',
  ISFP: 'Sen estetik duyarlılığı yüksek ve sakin bir maceracısın. Sanat ve güzellik senin için önemli. İçsel dünyan zengin ve yaratıcılığın yüksek. İnsanlarla ilişkilerde sakin ve anlayışlısın. Bazen duygularını ifade etmekte zorlansan da, sanatsal ifadelerle kendini gösteriyorsun. Barışçıl doğan, çevrende huzur yayıyor.',
  ESTP: 'Sen enerjik ve pratik bir girişimcisin. Anı yaşama ve risk alma konusunda cesursun. İnsanlarla kolay iletişim kurma ve ortamları neşelendirme yeteneğine sahipsin. Hızlı kararlar alıp eyleme geçme konusunda uzmansın. Bazen uzun vadeli planlardan çok, anlık heyecanlara odaklansan da, bu özelliğin seni dinamik kılıyor.',
  ESFP: 'Sen spontane ve hayat dolu bir eğlendiricisin. İnsanları neşelendirme ve ortamlara enerji katma konusunda uzmansın. Sosyal çevrende popüler ve seviliyorsun. Duygularını özgürce ifade ediyor ve başkalarını da buna teşvik ediyorsun. Bazen planlı hareket etmekten hoşlanmasan da, pozitif enerjin insanları etkiliyor.',
};

const ENNEAGRAM_DETAYLI_ACIKLAMALAR = {
  1: 'Sen bir reformcusun. Mükemmeliyetçi doğan, her işi en iyi şekilde yapma arzunu taşıyor. Doğru ve yanlış arasında net bir ayrım yapma yeteneğine sahipsin. İlkeli yaşam tarzın, çevrende güven uyandırıyor. Kendinden ve başkalarından yüksek beklentiler içinde olman bazen seni zorlasa da, bu özelliğin kaliteli sonuçlar elde etmeni sağlıyor. Dünya daha iyi bir yer olsun istiyorsun.',
  2: 'Sen bir yardımseversin. Başkalarına destek olma ve onları mutlu etme konusunda doğal yeteneğe sahipsin. Empatik doğan, insanların ihtiyaçlarını anlamanı sağlıyor. İlişkilerde fedakârlık yapmaktan çekinmiyorsun. Bazen kendi ihtiyaçlarını ihmal etsen de, başkalarına hizmet etmekten büyük keyif alıyorsun. Sevgi ve takdir görmek seni motive ediyor.',
  3: 'Sen bir başarıcısın. Hıslı ve rekabetçi yapın, hedeflerine ulaşmanda etkili oluyor. Başarıyı kanıtlama ve takdir edilme arzun, seni motive ediyor. Çok yönlü yeteneğinle farklı alanlarda başarılı olabilirsin. İmajın önemli olsa da, gerçek değerini biliyorsun. Hayatta başarılı olmak ve bunu başkalarına göstermek senin gücün.',
  4: 'Sen bir bireycisin. Özgünlüğe ve derinliğe değer veriyorsun. Sanatsal ifadelerle kendini gösterme konusunda yeteneklisin. Duygusal derinliğin, seni farklı kılıyor. Bazen kendini anlaşılmamış hissetsen de, bu özelliğin yaratıcılığını besliyor. Anlamlı ilişkiler ve estetik güzellik seni mutlu ediyor.',
  5: 'Sen bir gözlemcisin. Bilgiye ve anlayışa değer veriyorsun. Analitik zekan, karmaşık konuları çözmeni sağlıyor. Bağımsız doğan, kendi başına çalışmaktan keyif almanı sağlıyor. Sosyal ortamlardan çok, zihinsel keşiflere ilgi duyuyorsun. Derinlemesine öğrenme ve anlama yeteneğin, seni uzman yapıyor.',
  6: 'Sen bir sadıksın. Güvenlik ve istikrar sana önemli. Sorumluluk sahibi olman ve verilen sözleri tutman, çevrende güven yaratıyor. Potansiyel tehlikeleri öngörme ve hazırlık yapma konusunda yeteneklisin. Bazen endişelen olsan da, bu özelliğin seni dikkatli yapıyor. Güvenilir ilişkiler ve istikrarlı ortamlar seni rahatlatıyor.',
  7: 'Sen bir meraklısın. Yeni deneyimler ve keşifler seni heyecanlandırıyor. Çok yönlü yeteneğinle farklı ilgi alanlarına sahipsin. Pozitif enerjin ve coşkun, insanları etkiliyor. Seçenekleri açık tutma ve esnek olma konusunda uzmansın. Bazen başladığın işleri bitirmekte zorlansan da, yaşam dolu doğan seni özel kılıyor.',
  8: 'Sen bir meydan okuyucusun. Güçlü ve kararlı yapın, zorluklarla yüzleşmende etkili oluyor. Adaleti koruma ve zayıf olanı savunma konusunda tutkulusun. Liderlik yeteneklerin ve cesaretin, seni doğal bir koruyucu yapıyor. Kontrolü ele alma konusunda uzmansın. Bazen sert görünse de, altında şefkatli bir yatar.',
  9: 'Sen bir barışçılsın. Uyum ve huzur sana önemli. Çatışmalardan kaçınma ve farklı görüşleri birleştirme konusunda yeteneklisin. Sakin ve anlayışlı doğan, çevrende huzur yayıyor. Başkalarının bakış açılarını anlama ve onları kabul etme konusunda uzmansın. Bazen kendi isteklerini ertelesen de, bu özelliğin seni iyi bir arabulucu yapıyor.',
};

const ENNEAGRAM_KANAT_ACIKLAMALARI = {
  '1w2': 'Mükemmeliyetçi yanında yardımsever bir kanadın var. İdealistik doğan, insanlığa hizmet etme arzunu taşıyor. Doğruyu yapmaya çalışırken başkalarına da yardım etmek istiyorsun. Bu dengeli yaklaşım, seni hem ilkeli hem de şefkatli kılıyor.',
  '1w9': 'Mükemmeliyetçi yanında barışçıl bir kanadın var. İdeallerine ulaşma konusunda kararlısın ama bunu sakin ve kontrollü bir şekilde yapıyorsun. Sakin doğan, tepkilerini ölçülü olmanı sağlıyor. Dengeli ve istikrarlı bir kişiliğe sahipsin.',
  '2w1': 'Yardımsever yanında mükemmeliyetçi bir kanadın var. İnsanlara yardım ederken doğru ve ilkeli olmaya çalışıyorsun. Fedakârlığınla dikkat çekerken, ahlaki değerlerine bağlı kalman seni güvenilir kılıyor.',
  '2w3': 'Yardımsever yanında başarıcı bir kanadın var. İnsanlara yardım ederken başarılı ve takdir edilmek de istiyorsun. Sosyal yeteneklerin ve hırsın, başkalarına etkili bir şekilde yardım etmeni sağlıyor.',
  '3w2': 'Başarıcı yanında yardımsever bir kanadın var. Hedeflerine ulaşırken başkalarıyla iyi ilişkiler kuruyorsun. Karizmatik ve sosyal yapın, seni etkili bir lider yapıyor. Başarıyı paylaşmaktan keyif alıyorsun.',
  '3w4': 'Başarıcı yanında bireyci bir kanadın var. Başarılı olmaya çalışırken kendini ifade etme ve özgün olma ihtiyacın da var. Yaratıcılığın ve hırsın, seni farklı kılıyor. İmajına önem veriyor ama özgünlüğünden de vazgeçmiyorsun.',
  '4w3': 'Bireyci yanında başarıcı bir kanadın var. Özgünlüğünü ifade ederken takdir edilmek de istiyorsun. Sanatsal yeteneğin ve sosyal becerilerin, seni çekici kılıyor. Duygusal derinliğinle birlikte dış görünümüne de önem veriyorsun.',
  '4w5': 'Bireyci yanında gözlemci bir kanadın var. Duygusal derinliğinin yanında entelektüel merakın da var. İç dünyan zengin ve yaratıcılığın yüksek. Kendini anlama ve ifade etme konusunda derin bir arzun var.',
  '5w4': 'Gözlemci yanında bireyci bir kanadın var. Bilgiye olan merakının yanında yaratıcılığın da var. Analitik zekanla birlikte sanatsal ifadelerle kendini gösteriyorsun. Farklı ve derin bir kişiliğe sahipsin.',
  '5w6': 'Gözlemci yanında sadık bir kanadın var. Bilgiye değer verirken güvenlik ve istikrar da arıyorsun. Analitik yapınla birlikte dikkatli ve planlı bir yaklaşımın var. Hem entelektüel hem de pratik birisisin.',
  '6w5': 'Sadık yanında gözlemci bir kanadın var. Güvenlik ararken bilgi ve analiz de önemsiyorsun. Dikkatli ve planlı yapın, seni hazırlıklı kılıyor. Hem pratik hem de düşünceli bir kişiliğe sahipsin.',
  '6w7': 'Sadık yanında meraklı bir kanadın var. Güvenlik ararken yeni deneyimler de istiyorsun. Hem dikkatli hem coşkulu bir yapın var. İlişkilerde hem sadık hem de eğlenceli olabiliyorsun.',
  '7w6': 'Meraklı yanında sadık bir kanadın var. Yeni deneyimler peşinde koşarken güvenlik de arıyorsun. Coşkulu yapınla birlikte dikkatli bir yanın var. Hem maceracı hem de sorumlu birisisin.',
  '7w8': 'Meraklı yanında meydan okuyucu bir kanadın var. Yeni deneyimler peşinde koşarken güçlü ve kararlı da olabiliyorsun. Enerjik ve liderlik özelliklerin var. Hem eğlenceli hem de etkili birisisin.',
  '8w7': 'Meydan okuyucu yanında meraklı bir kanadın var. Güçlü yapının yanında maceracı bir yanın da var. Hem koruyucu hem de yenilikçi olabiliyorsun. Enerjik ve cesur bir lidersin.',
  '8w9': 'Meydan okuyucu yanında barışçıl bir kanadın var. Güçlü yapının yanında sakin ve kontrollü bir yanın var. Hem koruyucu hem de dengeli birisisin. Gücünü kontrollü bir şekilde kullanıyorsun.',
  '9w1': 'Barışçıl yanında mükemmeliyetçi bir kanadın var. Uyum ararken doğru ve ilkeli olmaya da çalışıyorsun. Sakin yapınla birlikte idealist bir yanın var. Dengeli ve ahlaklı bir kişiliğe sahipsin.',
  '9w8': 'Barışçıl yanında meydan okuyucu bir kanadın var. Uyum ararken gerektiğinde güçlü ve kararlı da olabiliyorsun. Sakin yapının altında güçlü bir yan saklı. Hem barışçıl hem de koruyucu birisisin.',
};

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

        {/* MBTI Sonucu - Yeni ResultCard Bileşeni ile */}
        {mbtiSonuc && (
          <ResultCard
            baslik="BİLİŞSEL FONKSİYONLAR"
            sonuc={mbtiSonuc.tip}
            aciklama={MBTI_DETAYLI_ACIKLAMALAR[mbtiSonuc.tip] || ''}
            guvenSkor={mbtiSonuc.guvenSkor}
            renk={colors.primary}
          />
        )}

        {/* Enneagram Sonucu - Yeni ResultCard Bileşeni ile */}
        {enneagramSonuc && (
          <ResultCard
            baslik="ENNEAGRAM"
            sonuc={enneagramSonuc.tip}
            aciklama={ENNEAGRAM_DETAYLI_ACIKLAMALAR[enneagramSonuc.tip] || ''}
            guvenSkor={enneagramSonuc.guvenSkor}
            renk={colors.secondary}
            kanatAciklamasi={ENNEAGRAM_KANAT_ACIKLAMALARI[enneagramSonuc.tipVeKanadi]}
          />
        )}

        {/* Eğer hiçbir sonuç yoksa hata mesajı */}
        {!mbtiSonuc && !enneagramSonuc && (
          <View style={styles.hataMesaji}>
            <Text style={styles.hataMesajiYazi}>
              ⚠️ Sonuçlar yüklenemiyor. Lütfen testi tekrar deneyin.
            </Text>
          </View>
        )}

        {/* Geri Al Butonu */}
        <TouchableOpacity
          style={styles.geriButonu}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.geriButonuYazi}>🏠 Ana Sayfaya Dön</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  icerik: {
    paddingHorizontal: isDesktop ? 48 : 24,
    paddingVertical: isDesktop ? 48 : 32,
    paddingBottom: isDesktop ? 64 : 48,
  },
  baslik: {
    fontSize: isDesktop ? 48 : 36,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  altBaslik: {
    fontSize: isDesktop ? 18 : 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: isDesktop ? 48 : 32,
  },
  hataMesaji: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 3,
    borderLeftColor: colors.error,
    marginBottom: 24,
  },
  hataMesajiYazi: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  geriButonu: {
    marginTop: isDesktop ? 32 : 24,
    paddingVertical: isDesktop ? 16 : 14,
    paddingHorizontal: 24,
    backgroundColor: colors.surface,
    borderRadius: isDesktop ? 14 : 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  geriButonuYazi: {
    fontSize: isDesktop ? 16 : 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});
