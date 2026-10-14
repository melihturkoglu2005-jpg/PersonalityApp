import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { FONT, SERIF } from '../theme/constants';
import { useLayout, COL, COL_GAP } from '../theme/useLayout';
import { mbtiHesapla } from '../utils/mbtiCalculator';
import { enneagramHesapla } from '../utils/enneagramCalculator';
import { getCharactersByType, MBTI_TYPE_COLORS } from '../data/personalityData';
import { Screen, Wrap, PageHeader, Tabs, Rule, PillButton, TextButton } from '../components/ui';
import Portrait from '../components/Portrait';
import { prefetchChars } from '../data/characterImage';
import EnneagramFigure from '../components/EnneagramFigure';

// ─── MBTI Açıklamaları ────────────────────────────────────────────────────────
const MBTI_DETAYLI_ACIKLAMALAR = {
  INTJ: 'INTJ\'ler, "Mimar" olarak bilinir — zihinleri sürekli büyük resmi görmeye çalışır ve gördükleri her şeyi bir sisteme oturtmak ister. Kaos gibi görünen yerde bile bir düzen ve strateji ararsın. Pek çok insan sezgisel kararlar verirken sen genellikle saatlerce ya da günlerce düşündükten sonra, adım adım kurulmuş bir planla hareket edersin.\n\nSosyal ortamlarda seni sessiz biri olarak tanırlar, ama bu içinde bir şey olmadığı anlamına gelmez — tam tersine, içinde sürekli bir zihinsel aktivite vardır. Eleştiri almayı sevmezsin çünkü zaten kendi kendinin en sert eleştirmenisin. Bir işe giriştiğinde mükemmeli hedefler, yarım bırakmak sana zor gelir.',
  INTP: 'INTP\'ler, "Mantıkçı" olarak bilinir — merakları onları her şeyin altında yatan mantığı anlamaya iter. Bir konuya takıldığında saatlerce araştırabilir, hiç farkına varmadan sabahı etmiş olabilirsin. Sosyal kuralları bazen yapay bulursun; sana göre fikirler insanlardan daha az karmaşıktır.\n\nFikirleri tartışmayı seversin ama tartışma sırasında karşındakinin duygularını gözden kaçırabilirsin — niyetin kötü değil, sadece gerçeği aramakla meşgulsün. Başladığın projeleri bitirmekte zorlanabilirsin; çünkü bir fikir henüz "mükemmel" değilken devam etmek içinden gelmez. Ama o kıvılcım anları — her şeyin birden oturduğu o an — senin için en büyük ödüldür.',
  ENTJ: 'ENTJ\'ler, "Komutan" olarak bilinir — odaya girdiklerinde genellikle kim olduklarını hissettirirler. Bu bir kibir meselesi değil; doğal olarak liderlik rolüne geçersin çünkü işlerin daha iyi yapılabileceğini görürsün ve bunu gerçekleştirme kapasitene güvenirsin.\n\nHedefe odaklandığında etrafındaki her şeyi bu hedefe hizmet edecek şekilde organize edersin. Verimsizlik ve tembellik seni içten içe rahatsız eder. Duygusal konuşmalar yerine çözüm odaklı konuşmaları tercih edersin — bu zaman zaman soğuk görünmeni sağlayabilir, oysa içinde insanlara karşı derin bir bağlılık vardır.',
  ENTP: 'ENTP\'ler, "Tartışmacı" olarak bilinir — fikirleri birbirine bağlama ve kimsenin düşünmediği açıdan bir konuya yaklaşma konusunda gerçekten yeteneklisindir. Tartışmayı seviyorsun, ama bu sadece haklı çıkmak için değil — farklı bakış açılarını anlamak, fikirlerin sınırlarını test etmek senin için entelektüel bir oyun gibi.\n\nBaşladığın projelere olan heyecanın bazen sonunu görmeden azalabilir; çünkü senin için asıl eğlenceli olan keşif sürecidir, uygulama kısmı daha az ilginç gelir. Çevrende seni "hep bir fikri olan ama yarısını bitirmeyen" biri olarak tanıyan olabilir — bu bir eksiklik değil, sadece hâlâ keşfetmeye devam ettiğinin işareti.',
  INFJ: 'INFJ\'ler, "Savunucu" olarak bilinir — ve dünyada en nadir bulunan kişilik tiplerinden birisin. İnsanları çok iyi okursun; birileri sana bir şey anlatmadan önce ne hissettiğini sezebilirsin. Bu güçlü bir yetenek ama aynı zamanda yorucu olabilir — başkalarının duygularını çok derinden hissedersin.\n\nDeğerlerine son derece bağlısın ve onlarla çatışan durumlarla baş etmekte zorlanırsın. Uzun vadeli düşünürsün — sadece bugün değil, yıllar sonrasını hayal ederek hareket edersin. Çevrenden daha fazla yalnız zaman isteyebilirsin; bu içe dönüklüğün değil, şarj olmana olan ihtiyacının göstergesi.',
  INFP: 'INFP\'ler, "Arabulucu" olarak bilinir — içlerinde derin bir değerler haritası taşırlar ve hayatlarının bu haritayla uyumlu olmasını isterler. Bir şeyin doğru olduğuna inandığında çok güçlü bir kararlılık gösterebilirsin; bu kararlılık dışarıdan görünmüyor olsa bile içinde son derece net ve keskindir.\n\nYaratıcı ifadeye ihtiyaç duyarsın — yazı, müzik, sanat ya da başka bir form. Empatin çok güçlüdür; bazen kendi duygularınla başkalarının duygularını ayırt etmekte güçlük çekebilirsin. Eleştiriye hassassın ama bu bir zayıflık değil — önem verdiğin şeylere derin bağlılığının bir yansıması.',
  ENFJ: 'ENFJ\'ler, "Kahraman" olarak bilinir — insanları ilham vererek değiştirme konusunda doğal bir yeteneğe sahipsin. Bir odaya girdiğinde oradaki tüm insanların ihtiyacını sezebilir, kimi rahatlatman gerektiğini, kime daha fazla yer vermeni gerektiğini anlarsın.\n\nBaşkalarına bu kadar çok odaklandığın için kendi ihtiyaçlarını ikinci plana atmak kolaylaşır. Onay görmek seni motive eder — eleştirildiğinde dışarıdan olduğundan çok daha derinden etkilenebilirsin. Liderlik sana doğal gelir; en iyi liderliği insanlar kendi güçlerini keşfettiğinde yaptığını fark etmek seni bir adım öteye taşıyabilir.',
  ENFP: 'ENFP\'ler, "Kampanyacı" olarak bilinir — enerjileri ve coşkuları çevrelerine bulaşıcıdır. Yeni bir fikre ya da projeye heyecanlandığında bu heyecanla başkalarını da kolayca harekete geçirebilirsin. İnsan bağlantısına değer verirsin; yüzeysel ilişkilerden çabuk sıkılır, derinlik ararsın.\n\nRutin seni yorar. Aynı şeyi tekrar tekrar yapmak içinde bir sıkıntı yaratır; bu yüzden değişim ve çeşitlilik senin için bir tercih değil, bir ihtiyaçtır. Karar vermek bazen zor gelebilir — çünkü olasılıkların hepsini görürsün ve her biri cazip görünür. Bu aslında hayal gücünün zenginliğinin işaretidir.',
  ISTJ: 'ISTJ\'ler, "Lojistikçi" olarak bilinir — söz verdiklerini yerine getirirler, nokta. Güvenilirlik senin için sadece bir erdem değil, temel bir değer. Başladığın işi bitirmek, taahhütlerini tutmak, planlandığı gibi hareket etmek senin için doğaldır.\n\nDeğişim seni tedirgin edebilir — yeni bir yöntem önerildiğinde "bu şimdiye kadar işe yarıyordu, neden değiştirelim?" sorusunu sormak sana mantıklı gelir. Bu muhafazakârlık değil, istikrara olan derin bağlılığının göstergesidir. Duygusal konuşmalar yerine somut adımları ve gerçekleri konuşmayı tercih edersin.',
  ISFJ: 'ISFJ\'ler, "Koruyucu" olarak bilinir — önem verdikleri insanlar için sessiz sedasız ama derin bir bağlılıkla oradadırlar. Yardım etmek sana doğal gelir; birisine ihtiyacı olduğunda bunu genellikle söylenmeden fark edersin.\n\nSınır koymakta zorlanabilirsin — "hayır" demek sana ihanet gibi gelebilir. Çevrenden aldığın takdir ve teşekkür seni motive eder; görülmediğini hissettiğinde içinde sessizce bir hayal kırıklığı birikebilir. Geçmişe değer verirsin; anılar, gelenekler ve köklere bağlılık senin için duygusal bir güvenlik zemini oluşturur.',
  ESTJ: 'ESTJ\'ler, "Yönetici" olarak bilinir — düzeni ve kuralları ciddiye alırlar, çünkü toplumun işleyişini bu unsurların sağladığına inanırlar. Bir grupta sorumluluk almak sana doğal gelir; liderlik etmek, organize etmek, net kurallar koymak senin için rahatlık sağlar.\n\nEsneklikten ziyade netliği seversin — "bakalım nasıl olacak" cevapları seni tatmin etmez. Kararlarını hızlı ve kararlı verirsin. Duygusal konular yerine pratik çözümlere odaklanırsın; bu zaman zaman sert görünmeni sağlasa da aslında güvenilir ve tutarlı olmayı derinlemesine önemsiyorsun.',
  ESFJ: 'ESFJ\'ler, "Konsül" olarak bilinir — sosyal ağların yapıştırıcısıdırlar. Etrafındakilerin nasıl hissettiğini sürekli takip edersin; bir uyumsuzluk olduğunda bunu düzeltmek için elinden geleni yaparsın. Uyumu korumak senin için hem bir beceri hem de bir ihtiyaçtır.\n\nÇevrenden onay almak seni motive eder; eleştirildiğinde ya da dışlandığında bu derin bir etki bırakabilir. Başkalarına hizmet etmekten gerçek bir tatmin duyarsın, ama bazen bu hizmetin karşılıksız kaldığını hissetmek seni yorabilir. Gelenek ve aile sana çok şey ifade eder.',
  ISTP: 'ISTP\'ler, "Virtüöz" olarak bilinir — elleri ne kadar ustaysa kafaları da o kadar hızlıdır. Bir şeyi nasıl çalıştığını anlamak için onu söküp yeniden monte etmek istersin — mecazi ya da gerçek anlamda. Teori değil, uygulama senin alanındır.\n\nBağımsızlığına çok değer verirsin; sürekli denetlenmek ya da yönlendirilmek içinde bir rahatsızlık yaratır. Duygusal konuşmalarda ne söyleneceğini bilmek zor gelebilir. Ama kriz anlarında genellikle en sakin ve pratik sen olursun; panik yapmak yerine çözüm ararsın.',
  ISFP: 'ISFP\'ler, "Maceracı" olarak bilinir — değerlerini yüksek sesle dile getirmezler ama içlerinde derin bir ahlaki pusulası vardır. Sanat, müzik, doğa ya da başka bir estetik alan — güzellik senin için soyut değil, somut ve hissedilen bir şeydir.\n\nAn\'da yaşamayı seversin; uzun vadeli planlar yerine şu anda önünde olan fırsata odaklanırsın. Eleştiriye hassassın çünkü kimliğini ve değerlerini yaptıklarınla özdeşleştirirsin. Sosyal ortamlarda aktif görünmeyebilirsin ama yakın ilişkilerinde son derece sıcak ve sadıksın.',
  ESTP: 'ESTP\'ler, "Girişimci" olarak bilinir — hızlı düşünür, hızlı hareket ederler. Teorik tartışmalar yerine "şimdi ne yapabiliriz?" sorusu daha anlamlı gelir. Risk almak seni korkutmaz; aksine biraz belirsizlik seni daha canlı hissettirilebilir.\n\nSosyal ortamlarda doğal ve karizmatiksin; insanlarla bağ kurmak sana çaba gerektirmez. Uzun vadeli planlama ve rutin işler seni yorar — en iyi performansını baskı altında ve değişken ortamlarda gösterirsin. Başkalarının duygularını her zaman ilk önce görmeyebilirsin; bu bir ihmal değil, odağının başka bir yerde olmasının sonucu.',
  ESFP: 'ESFP\'ler, "Eğlendirici" olarak bilinir — hayatı tam kapasite yaşarlar ve bunu çevrelerine de yaymayı severler. Bir ortama girerken dikkat çekmek istersin — hem de çaba harcamadan, çünkü bu senin doğal halin. Spontane olmayı seversin; aşırı planlama eğlenceyi öldürüyor gibi hissettirilebilir.\n\nBaşkalarının ne hissettiğine karşı yüksek bir duyarlılığın var; birinin mutsuz olduğunu anında fark edersin ve onu güldürmek için elinden geleni yaparsın. Bu an\'a olan bağlılığın aynı zamanda hayatın küçük güzelliklerini fark etmeni sağlar — pek çok insanın gözünden kaçan şeyleri sen görürsün.',
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
  INTJ: '• Strateji ve danışmanlık\n• Yazılım mimarlığı\n• Akademik araştırma\n• Finansal analiz',
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
  9: 'Sen bir barışçısın. Uyum ve huzur sana önemli. Sakin ve anlayışlı doğan, çevrende huzur yayıyor.',
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

// ─── Görünüm yardımcıları (yalnızca etiketleme; hesaplama değil) ─────────────
// MBTI kodunun her harfinin Türkçe karşılığı
const HARF_ADI = {
  I: 'İçe dönük', E: 'Dışa dönük',
  S: 'Duyumsayan', N: 'Sezgisel',
  T: 'Düşünen', F: 'Hisseden',
  J: 'Yargılayan', P: 'Algılayan',
};

// "• madde\n• madde" biçimindeki metni madde dizisine çevirir
function maddeler(metin) {
  return (metin || '').split('\n').map((m) => m.replace(/^•\s*/, '').trim()).filter(Boolean);
}

function Liste({ baslik, metin, style }) {
  const { colors } = useTheme();
  return (
    <View style={[{ width: '100%' }, style]}>
      <Text style={[s.altBaslik, { color: colors.textPrimary }]}>{baslik}</Text>
      {maddeler(metin).map((m) => (
        <Text key={m} style={[s.madde, { color: colors.textSecondary, borderTopColor: colors.border }]}>{m}</Text>
      ))}
    </View>
  );
}

// ─── Aynı tipteki tanınmış isimler: tek satırlık yatay şerit ──────────────────
function IsimlerSerit({ mbtiType, navigation }) {
  const { colors } = useTheme();
  const { isNarrow } = useLayout();
  const characters = useMemo(() => getCharactersByType(mbtiType, 5), [mbtiType]);
  const tc = MBTI_TYPE_COLORS[mbtiType] || { primary: colors.primary };

  useEffect(() => { prefetchChars(characters); }, [characters]);

  if (!characters.length) return null;

  return (
    <View style={{ marginTop: 56 }}>
      <Rule />
      <View style={s.seritUst}>
        <View style={{ flex: 1, minWidth: 220 }}>
          <Text style={[s.bolumBaslik, { color: colors.textPrimary, fontSize: 28 }]}>Aynı tipteki isimler</Text>
          <Text style={[s.govde, { color: colors.textSecondary, marginTop: 6 }]}>
            {mbtiType} tipini paylaştığı söylenen tanınmış kişiler.
          </Text>
        </View>
        <TextButton label="Tümünü gör →" color={colors.textPrimary} onPress={() => navigation?.navigate('CharacterGuide', { initialType: mbtiType })} />
      </View>

      <View style={s.serit}>
        {characters.map((char) => (
          <Pressable
            key={char.id}
            onPress={() => navigation?.navigate('CharacterGuide', { initialType: mbtiType })}
            accessibilityRole="button"
            accessibilityLabel={`${char.name}, ${char.category}`}
            style={[s.seritOge, { width: isNarrow ? '46%' : '18%' }]}
          >
            <Portrait char={char} size={76} ring={tc.primary} />
            <Text style={[s.isimAd, { color: colors.textPrimary }]} numberOfLines={2}>{char.name}</Text>
            <Text style={[s.isimKat, { color: colors.textSecondary }]} numberOfLines={1}>{char.category}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

// ─── MBTI paneli ─────────────────────────────────────────────────────────────
function MbtiPanel({ sonuc, navigation }) {
  const { colors } = useTheme();
  const { isNarrow, isDesktop } = useLayout();
  const tipRenk = MBTI_TYPE_COLORS[sonuc.tip] || {};
  const paragraflar = (MBTI_DETAYLI_ACIKLAMALAR[sonuc.tip] || '').split('\n\n').filter(Boolean);

  return (
    <View>
      <View style={[s.mbtiSatir, isDesktop && { flexDirection: 'row', alignItems: 'flex-start', gap: COL_GAP }]}>
        {/* Sol: harfler, takma ad, açıklama */}
        <View style={{ flex: 1, minWidth: 0 }}>
          <View style={s.harfler}>
            {sonuc.tip.split('').map((h, i) => (
              <View key={i} style={s.harfKolon}>
                <Text style={[s.harf, { color: colors.primary, fontSize: isNarrow ? 72 : 120, lineHeight: isNarrow ? 76 : 116 }]}>{h}</Text>
                <Text style={[s.harfAdi, { color: colors.textSecondary }]}>{HARF_ADI[h]}</Text>
              </View>
            ))}
          </View>

          {!!tipRenk.label && <Text style={[s.takmaAd, { color: colors.textPrimary }]}>{tipRenk.label}</Text>}

          <View style={{ marginTop: 20, gap: 16 }}>
            {paragraflar.map((p, i) => (
              <Text key={i} style={[s.govde, { color: colors.textSecondary, maxWidth: 620, fontSize: 16, lineHeight: 27 }]}>{p}</Text>
            ))}
          </View>
        </View>

        {/* Sağ: enerji ekseni + güçlü yönler + kariyer (masaüstünde yan yana, böylece sayfa kısalır) */}
        <View style={{ width: isDesktop ? COL : '100%', marginTop: isDesktop ? 0 : 40, gap: 36 }}>
          {sonuc.eiYuzde !== undefined && (
            <View>
              <Text style={[s.altBaslik, { color: colors.textPrimary }]}>Enerji yönelimi</Text>
              <View style={[s.eksen, { backgroundColor: colors.border }]}>
                <View style={[s.eksenIsaret, { left: `${sonuc.eiYuzde}%`, backgroundColor: colors.primary }]} />
              </View>
              <View style={s.eksenUclar}>
                <Text style={[s.govde, { color: colors.textSecondary }]}>İçe dönük %{100 - sonuc.eiYuzde}</Text>
                <Text style={[s.govde, { color: colors.textSecondary }]}>Dışa dönük %{sonuc.eiYuzde}</Text>
              </View>
            </View>
          )}
          <Liste baslik="Güçlü yönlerin" metin={MBTI_GUCLU_YONLER[sonuc.tip]} />
          <Liste baslik="Kariyer önerileri" metin={MBTI_KARIYER[sonuc.tip]} />
        </View>
      </View>

      <IsimlerSerit mbtiType={sonuc.tip} navigation={navigation} />
    </View>
  );
}

// ─── Enneagram paneli ────────────────────────────────────────────────────────
function EnneagramPanel({ sonuc }) {
  const { colors } = useTheme();
  const { isNarrow, isDesktop } = useLayout();

  return (
    <View style={[s.ennSatir, isDesktop && { flexDirection: 'row-reverse', alignItems: 'flex-start', gap: COL_GAP }]}>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text style={[s.ennBuyuk, { color: colors.secondary, fontSize: isNarrow ? 96 : 148, lineHeight: isNarrow ? 96 : 140 }]}>
          {sonuc.kanatYazisi}
        </Text>

        <Text style={[s.govde, { color: colors.textSecondary, maxWidth: 520, fontSize: 16, lineHeight: 27, marginTop: 16 }]}>
          {ENNEAGRAM_DETAYLI_ACIKLAMALAR[sonuc.tip] || ''}
        </Text>

        {sonuc.kanatYazisi !== sonuc.tip.toString() && (
          <Text style={[s.govde, { color: colors.textSecondary, maxWidth: 520, fontSize: 16, lineHeight: 27, marginTop: 14, fontStyle: 'italic' }]}>
            {ENNEAGRAM_KANAT_ACIKLAMALARI[sonuc.kanatYazisi] || ''}
          </Text>
        )}

        <View style={[s.yonler, { borderTopColor: colors.border }]}>
          <View style={s.yon}>
            <Text style={[s.yonEtiket, { color: colors.textSecondary }]}>Güvenlik yönü</Text>
            <Text style={[s.yonDeger, { color: colors.secondary }]}>Tip {sonuc.entegrasyon.guvenlik}</Text>
          </View>
          <View style={[s.yon, { borderLeftColor: colors.border, borderLeftWidth: 1, paddingLeft: 20 }]}>
            <Text style={[s.yonEtiket, { color: colors.textSecondary }]}>Stres yönü</Text>
            <Text style={[s.yonDeger, { color: colors.textPrimary }]}>Tip {sonuc.entegrasyon.stres}</Text>
          </View>
        </View>
      </View>

      <View style={{ alignItems: 'flex-start', marginTop: isDesktop ? 0 : 32, width: isDesktop ? COL : undefined }}>
        <EnneagramFigure
          selected={sonuc.tip}
          security={sonuc.entegrasyon.guvenlik}
          stress={sonuc.entegrasyon.stres}
          size={isNarrow ? 290 : COL}
          accent={colors.secondary}
        />
        {isDesktop || !isNarrow ? (
          <Text style={[s.govde, { color: colors.textSecondary, marginTop: 8, fontSize: 12 }]}>
            Düz çizgi güvenlik, kesikli çizgi stres yönünü gösterir.
          </Text>
        ) : null}
      </View>
    </View>
  );
}

// ─── Ekran ───────────────────────────────────────────────────────────────────
export default function ResultScreen({ route, navigation }) {
  const { colors } = useTheme();
  const { mbtiCevaplari, enneagramCevaplari } = route.params || {};
  const [sekme, setSekme] = useState('mbti');

  const mbtiSonuc = useMemo(() => {
    if (!mbtiCevaplari) return null;
    try { return mbtiHesapla(mbtiCevaplari); } catch (e) { return null; }
  }, [mbtiCevaplari]);

  const enneagramSonuc = useMemo(() => {
    if (!enneagramCevaplari) return null;
    try { return enneagramHesapla(enneagramCevaplari); } catch (e) { return null; }
  }, [enneagramCevaplari]);

  // İki test de çözüldüyse alt alta dizmek yerine sekmeyle ayırıyoruz: sayfa yarı yarıya kısalır.
  const ikisiVar = !!mbtiSonuc && !!enneagramSonuc;
  const aktif = ikisiVar ? sekme : (mbtiSonuc ? 'mbti' : 'enneagram');

  return (
    <Screen navigation={navigation} active="Result">
      <PageHeader title="Sonuçların" sub="Yanıtlarına dayalı keşif özeti; psikolojik tanı değildir." />

      <Wrap>
        {ikisiVar && (
          <>
            <Tabs
              accent={aktif === 'mbti' ? colors.primary : colors.secondary}
              value={aktif}
              onChange={setSekme}
              items={[{ id: 'mbti', label: `MBTI, ${mbtiSonuc.tip}` }, { id: 'enneagram', label: `Enneagram, ${enneagramSonuc.kanatYazisi}` }]}
            />
            <Rule style={{ marginBottom: 32 }} />
          </>
        )}

        {aktif === 'mbti' && mbtiSonuc && <MbtiPanel sonuc={mbtiSonuc} navigation={navigation} />}
        {aktif === 'enneagram' && enneagramSonuc && <EnneagramPanel sonuc={enneagramSonuc} />}

        {!mbtiSonuc && !enneagramSonuc && (
          <View>
            <Text style={[s.govde, { color: colors.textSecondary, fontSize: 16 }]}>
              Sonuçları görmek için seçtiğin testteki tüm soruları yanıtlamalısın.
            </Text>
          </View>
        )}

        {/* ── Alt eylemler ── */}
        <View style={s.eylemler}>
          {ikisiVar && (
            <PillButton
              label={aktif === 'mbti' ? 'Enneagram sonucunu gör' : 'MBTI sonucunu gör'}
              onPress={() => setSekme(aktif === 'mbti' ? 'enneagram' : 'mbti')}
            />
          )}
          {mbtiSonuc && !enneagramSonuc && (
            <PillButton label="Enneagram testini çöz" onPress={() => navigation.navigate('Enneagram', route.params)} />
          )}
          {enneagramSonuc && !mbtiSonuc && (
            <PillButton label="MBTI testini çöz" onPress={() => navigation.navigate('MBTI', route.params)} />
          )}
          <TextButton label="Ana sayfaya dön" color={colors.textPrimary} onPress={() => navigation.navigate('Home')} />
        </View>
      </Wrap>
    </Screen>
  );
}

const s = StyleSheet.create({
  bolumBaslik: { fontFamily: SERIF, fontSize: 32, letterSpacing: -0.6 },
  altBaslik:   { fontFamily: FONT, fontSize: 14, fontWeight: '600', marginBottom: 12 },
  govde:       { fontFamily: FONT, fontSize: 14, lineHeight: 22 },

  mbtiSatir: { marginTop: 4 },
  harfler:   { flexDirection: 'row', gap: 4 },
  harfKolon: { flex: 1, maxWidth: 170 },
  harf:      { fontFamily: SERIF, fontWeight: '400', letterSpacing: -3 },
  harfAdi:   { fontFamily: FONT, fontSize: 13, marginTop: 8 },
  takmaAd:   { fontFamily: SERIF, fontSize: 36, fontStyle: 'italic', letterSpacing: -0.6, marginTop: 24 },

  eksen:       { height: 2, borderRadius: 1, marginTop: 8, marginBottom: 14, position: 'relative' },
  eksenIsaret: { position: 'absolute', top: -7, width: 16, height: 16, borderRadius: 8, marginLeft: -8 },
  eksenUclar:  { flexDirection: 'row', justifyContent: 'space-between' },

  madde:    { fontFamily: FONT, fontSize: 15, lineHeight: 22, paddingVertical: 11, borderTopWidth: 1 },

  seritUst:  { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', paddingTop: 36 },
  serit:     { flexDirection: 'row', flexWrap: 'wrap', columnGap: 16, rowGap: 28, marginTop: 28 },
  seritOge:  { gap: 6 },
  isimAd:    { fontFamily: SERIF, fontSize: 21, letterSpacing: -0.3, lineHeight: 24, marginTop: 8 },
  isimKat:   { fontFamily: FONT, fontSize: 13 },

  ennSatir:  { marginTop: 4 },
  ennBuyuk:  { fontFamily: SERIF, fontWeight: '400', letterSpacing: -5 },
  yonler:    { flexDirection: 'row', gap: 20, marginTop: 36, paddingTop: 20, borderTopWidth: 1, maxWidth: 420 },
  yon:       { flex: 1, gap: 4 },
  yonEtiket: { fontFamily: FONT, fontSize: 13 },
  yonDeger:  { fontFamily: SERIF, fontSize: 30, letterSpacing: -0.5 },

  eylemler: { marginTop: 56, flexDirection: 'row', alignItems: 'center', gap: 24, flexWrap: 'wrap' },
});
