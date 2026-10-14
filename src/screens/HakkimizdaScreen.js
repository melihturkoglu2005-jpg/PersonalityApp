import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, Linking } from 'react-native';
import { Screen, Wrap, PageHeader, PillButton } from '../components/ui';
import { useTheme } from '../theme/ThemeContext';
import { FONT, SERIF } from '../theme/constants';
import { useLayout } from '../theme/useLayout';

const BOLUMLER = [
  {
    title: 'Meraktan doğan bağımsız bir proje',
    paragraphs: [
      'Indoles, kişilik üzerine düşünmeyi sevenler için hazırlanmış bağımsız bir test ve keşif sitesidir. MBTI ve Enneagram çerçevelerini, psikoloji ve tipoloji literatürünün temel eserlerinden esinlenerek herkesin ulaşabileceği bir deneyime dönüştürmeyi amaçlar.',
      'Proje, psikolog ya da psikoloji öğrencisi olmayan bağımsız bir geliştirici tarafından, yapay zekâ destekli kodlamayla (vibe coding) bir test sitesi kurma merakıyla geliştirilmiştir. Resmî bir akademik araştırma, klinik değerlendirme ya da danışmanlık hizmeti değildir.',
      'Sitenin kodu, soru metinleri, tip açıklamaları ve kariyer önerileri dâhil tüm içerikleri yapay zekâ yardımıyla hazırlanmıştır; bu içerikler hata veya eksiklik içerebilir.',
    ],
  },
  {
    title: 'Adımız ve işaretimiz',
    paragraphs: [
      'Indoles, Latincede insanın doğuştan gelen karakteri ve öz yapısı anlamına gelir. Logomuz bu fikri dokuz uçlu bir yıldız ve ortasında bir yıldız daha ile anlatır.',
      'Dokuz uç, Enneagram’ın dokuz tipini temsil eder. Uçlar birbirinin kopyası değildir; her biri biraz daha uzun, biraz daha eğik ve biraz daha kendine hastır, çünkü kişilik de tek bir kalıba dökülmüş değildir. İçteki yıldız, dıştaki biçim ne olursa olsun bize ait bir çekirdek bulunduğunu; ortadaki boşluk da bu çekirdeğe duyulan merakı simgeler. Hatları bilerek yumuşak çizdik: kendini tanımak yargılanmak değil, merakla yola çıkmak olmalı.',
    ],
  },
  {
    title: 'Bağımsızlık ve sınırlarımız',
    paragraphs: [
      'Indoles herhangi bir üniversiteye, sağlık kuruluşuna, meslek örgütüne, şirkete ya da başka bir kurum ve kuruluşa bağlı değildir. Resmî MBTI veya Enneagram sağlayıcılarını temsil etmez. MBTI ve Myers-Briggs adları ilgili hak sahiplerinin markası olabilir; bu isimler yalnızca hangi çerçeveden söz edildiğini belirtmek için kullanılır.',
      'Sitedeki testler, bu çerçevelerin resmî ölçekleri değil, onlardan esinlenen bağımsız uygulamalardır. Sonuçlar yalnızca yanıtlarınıza dayalı bir öz değerlendirme ve keşif başlangıcıdır. Psikolojik tanı niteliği taşımaz; profesyonel psikolojik değerlendirmenin, danışmanlığın ya da tedavinin yerini tutmaz. Bir kişilik tipi, kimliğinizin tamamını tanımlamaz.',
    ],
  },
  {
    title: 'Bilimsel olarak neredeyiz?',
    paragraphs: [
      'MBTI ve Enneagram popülerdir ve kişilik üzerine düşünmek için verimli araçlar olabilir; ancak bilimsel geçerlilikleri akademik literatürde tartışmalıdır. İnsanları kesin sınırlarla ayrı tiplere bölmek tartışmalı bir varsayımdır ve aynı kişi testi farklı zamanlarda çözdüğünde farklı sonuçlar alabilir. Araştırmalarda en çok desteklenen kişilik modeli ise Beş Büyük’tür.',
      'Bu yüzden sonuçlarınıza bir hüküm olarak değil, kendinize bakmak için bir başlangıç noktası olarak yaklaşmanızı öneririz.',
    ],
  },
  {
    title: 'Nasıl denedik, neyi biliyoruz?',
    paragraphs: [
      'Soruların anlaşılabilirliğini ve sonuçların katılımcıların kendileriyle ilgili yorumlarıyla ne ölçüde örtüştüğünü değerlendirmek için, MBTI ve Enneagram ile gerçekten ilgilenen 5 kişilik küçük bir grupla testler denendi ve geri bildirim alındı.',
      'Bu deneme bir kullanıcı geri bildirimi çalışmasıdır. Küçük bir grubun deneyimi, testlerin doğruluğunu, bilimsel geçerliliğini ya da güvenilirliğini kanıtlamaz. Indoles testleri için kapsamlı bir psikometrik doğrulama yapılmamıştır; bu nedenle kesinlik ya da doğruluk garantisi sunulmaz.',
    ],
  },
  {
    title: 'Yararlanılan kaynaklar',
    paragraphs: [
      'Sitedeki içerik ve yaklaşımın başlıca referansları şunlardır: Carl Gustav Jung’un Psikolojik Tipler, Isabel Briggs Myers’ın Gifts Differing, David Keirsey’nin Please Understand Me II ve Don Richard Riso ile Russ Hudson’ın The Wisdom of the Enneagram eserleri. Enneagram okumaları arasında Richard Rohr ve Andreas Ebert’in, Hristiyan manevi bakışıyla yazılmış The Enneagram: A Christian Perspective kitabı da yer alır.',
      'MBTI tarafında bilişsel fonksiyonlar ve içedönüklük–dışadönüklük tercihleri; Enneagram tarafında tipler, motivasyonlar ve kanatlar ele alınır. Kaynaklar sayfasında ayrıca kişilik modellerinin ölçüm özelliklerini tartışan araştırmalar ve Beş Büyük modelle ilgili okumalar listelenir.',
      'Bu kaynaklara yer vermek, Indoles’in soru setinin ya da puanlama yönteminin bu yazarlar tarafından onaylandığı veya bilimsel olarak doğrulandığı anlamına gelmez.',
    ],
  },
  {
    title: 'Karakter rehberi hakkında',
    paragraphs: [
      'Karakter rehberindeki tanınmış kişilerin tip eşleştirmeleri yoruma dayanır. Bu kişiler genellikle kendileri bir test çözmüş ya da bir tipi onaylamış değildir; eşleştirmeler resmî ya da kesin değildir ve bu kişilerle Indoles arasında bir bağlantı ya da onay ilişkisi yoktur. Rehber, bir tanıma ve merak aracıdır.',
      'Fotoğraflar Wikipedia ve Wikimedia Commons kaynaklarından alınmıştır; her görsel kendi lisans koşullarına tabidir. Kayıtlı kaynak bağlantıları ve atıf bilgilerinin mevcut durumu Görsel kaynakları ve atıflar sayfasında açıklanır.',
    ],
  },
  {
    title: 'Verileriniz',
    paragraphs: [
      'Test yanıtları ve sonuçlar cihazınızda hesaplanır. Web sürümünde yanıtlar açık sayfanın belleğinde tutulur; Indoles tarafından bir sunucuya gönderilmez veya kalıcı olarak kaydedilmez. Sayfayı yenilediğinizde ya da kapattığınızda bu test oturumu kaybolur.',
      'Otomatik ilerleme tercihiniz ve seçerseniz “bu uyarıyı bir daha gösterme” ayarınız cihazınızda saklanır. Web sürümünde bunun için tarayıcının yerel depolaması kullanılır. Mevcut uygulama kodunda analitik izleme veya reklam çerezi bulunmaz.',
      'Yazı tipleri Google Fonts’tan, ana sayfa videosu bir içerik dağıtım hizmetinden yüklenir. Yerel fotoğraf yüklenemediğinde Wikimedia’ya istek yapılabilir. Bu hizmetler içerik yüklenirken IP adresi ve tarayıcı bilgisi gibi teknik bağlantı verilerini alabilir; test yanıtlarınız bu isteklere eklenmez.',
    ],
  },
];

function LogoMeaning({ isNarrow, paragraphs }) {
  const { colors, isDark } = useTheme();
  return (
    <View style={[s.logoCard, isNarrow && s.logoCardNarrow, { backgroundColor: colors.surfaceLight, borderColor: colors.border }]}>
      <View style={[s.logoVisual, isNarrow && s.logoVisualNarrow]}>
        <View style={[s.markFrame, { borderColor: colors.border }]}>
          <Image source={isDark ? require('../../assets/brand-mark-white.png') : require('../../assets/brand-mark.png')} resizeMode="contain" style={s.mark} accessibilityLabel="Indoles’in dokuz uçlu yıldız logosu" />
        </View>
        <Text style={[s.wordmark, { color: colors.textPrimary }]}>Indoles</Text>
        <Text style={[s.markCaption, { color: colors.textSecondary }]}>Dokuz uç, tek çekirdek.</Text>
      </View>
      <View style={[s.logoCopy, isNarrow && { flex: undefined }]}>
        {paragraphs.map((paragraph) => <Text key={paragraph} style={[s.body, { color: colors.textSecondary }]}>{paragraph}</Text>)}
      </View>
    </View>
  );
}

export default function HakkimizdaScreen({ navigation }) {
  const { colors } = useTheme();
  const { isNarrow } = useLayout();
  return (
    <Screen navigation={navigation} active="Hakkimizda">
      <PageHeader title="Hakkımızda" sub="Indoles’in nasıl ortaya çıktığı, neye dayandığı ve nerede bittiği." />
      <Wrap max={900}>
        {BOLUMLER.map(({ title, paragraphs }) => (
          <View key={title} style={[s.section, { borderTopColor: colors.border }]}>
            <Text accessibilityRole="header" style={[s.title, { color: colors.textPrimary }]}>{title}</Text>
            {title === 'Adımız ve işaretimiz' ? <LogoMeaning isNarrow={isNarrow} paragraphs={paragraphs} /> : paragraphs.map((paragraph) => <Text key={paragraph} style={[s.body, { color: colors.textSecondary }]}>{paragraph}</Text>)}
            {title === 'Karakter rehberi hakkında' && <Pressable accessibilityRole="link" onPress={() => navigation.navigate('GorselKaynaklar')}><Text style={[s.email, { color: colors.textPrimary }]}>Görsel kaynakları ve atıflar →</Text></Pressable>}
          </View>
        ))}
        <View style={[s.support, { borderTopColor: colors.border }]}>
          <Text accessibilityRole="header" style={[s.title, { color: colors.textPrimary }]}>Destek ve geri bildirim</Text>
          <Text style={[s.body, { color: colors.textSecondary }]}>Kendinizi zor bir dönemde hissediyorsanız, bir test sonucu yerine bir ruh sağlığı uzmanından destek almak daha doğru bir adımdır. Acil bir durumda 112’yi arayın.</Text>
          <Pressable onPress={() => Linking.openURL('mailto:destek@indoles.com')} accessibilityRole="link">
            <Text style={[s.body, { color: colors.textSecondary }]}>Düzeltme, öneri ya da eleştirileriniz için: <Text style={[s.email, { color: colors.textPrimary }]}>destek@indoles.com</Text></Text>
          </Pressable>
        </View>
        <PillButton label="Kaynakları incele" onPress={() => navigation.navigate('Kaynaklar')} style={{ alignSelf: 'flex-start', marginTop: 24 }} />
      </Wrap>
    </Screen>
  );
}

const s = StyleSheet.create({
  section: { borderTopWidth: 1, paddingVertical: 28, gap: 16 },
  title: { fontFamily: SERIF, fontSize: 32, lineHeight: 38 },
  body: { fontFamily: FONT, fontSize: 15, lineHeight: 25 },
  support: { borderTopWidth: 1, paddingTop: 28, marginTop: 4, gap: 16 },
  email: { fontFamily: FONT, fontSize: 15, textDecorationLine: 'underline' },
  logoCard: { borderWidth: 1, borderRadius: 18, padding: 28, marginVertical: 4, gap: 32, flexDirection: 'row', alignItems: 'center' },
  logoCardNarrow: { flexDirection: 'column', alignItems: 'stretch', padding: 20 },
  logoVisual: { width: 200, alignItems: 'center', gap: 10 },
  logoVisualNarrow: { width: '100%' },
  markFrame: { width: 184, height: 184, borderRadius: 92, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  mark: { width: 142, height: 142 },
  wordmark: { fontFamily: SERIF, fontSize: 42, lineHeight: 46 },
  markCaption: { fontFamily: FONT, fontSize: 12, lineHeight: 18 },
  logoCopy: { flex: 1, minWidth: 0, gap: 16 },
});
