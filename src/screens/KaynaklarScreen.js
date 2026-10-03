import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { FONT, SERIF } from '../theme/constants';
import { useLayout, COL, COL_GAP } from '../theme/useLayout';
import { Screen, Wrap, PageHeader, Tabs, Rule } from '../components/ui';

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
  const { isNarrow, isDesktop } = useLayout();
  const paramKat = route?.params?.initialKat;
  const [aktifKat, setAktifKat] = useState(() => KAT_IDS.includes(paramKat) ? paramKat : 'kitaplar');
  const [acikSSS,  setAcikSSS]  = useState(null);

  useEffect(() => {
    const k = route?.params?.initialKat;
    if (KAT_IDS.includes(k)) { setAktifKat(k); setAcikSSS(null); }
  }, [route?.params?.initialKat]);

  const veri = aktifKat === 'kitaplar' ? KITAPLAR : aktifKat === 'arastirmalar' ? ARASTIRMALAR : aktifKat === 'kavramlar' ? KAVRAMLAR : SSS;

  return (
    <Screen navigation={navigation} active="Kaynaklar">
      <PageHeader
        title="Kaynaklar"
        sub="Kişilik psikolojisinin temel eserleri, akademik araştırmaları ve kavramları. Testlerin dayandığı literatür burada."
      />

      <Wrap>
        <Tabs
          accent={colors.textPrimary}
          value={aktifKat}
          onChange={(id) => { setAktifKat(id); setAcikSSS(null); }}
          items={KATEGORILER.map((k) => ({ id: k.id, label: k.label }))}
        />
        <Rule />

        {(aktifKat === 'kitaplar' || aktifKat === 'arastirmalar') && veri.map((item, i) => (
          <View key={i} style={[s.kayit, { borderBottomColor: colors.border }, isDesktop && s.kayitGenis]}>
            <View style={[s.sol, isDesktop && { width: COL }]}>
              <Text style={[s.baslik, { color: colors.textPrimary, fontSize: isNarrow ? 26 : 30 }]}>{item.baslik}</Text>
              <Text style={[s.kunye, { color: colors.textPrimary }]}>{item.yazar}, {item.yil}</Text>
            </View>
            <View style={s.sag}>
              <Text style={[s.metin, { color: colors.textSecondary }]}>{item.aciklama}</Text>
              <Text style={[s.etiket, { color: colors.textSecondary }]}>{item.etiket}, {item.seviye}</Text>
            </View>
          </View>
        ))}

        {aktifKat === 'kavramlar' && KAVRAMLAR.map((item, i) => (
          <View key={i} style={[s.kayit, { borderBottomColor: colors.border }, isDesktop && s.kayitGenis]}>
            <View style={[s.sol, isDesktop && { width: COL }]}>
              <Text style={[s.baslik, { color: colors.textPrimary, fontSize: isNarrow ? 26 : 30 }]}>{item.baslik}</Text>
            </View>
            <View style={s.sag}>
              <Text style={[s.metin, { color: colors.textSecondary }]}>{item.aciklama}</Text>
              <Text style={[s.etiket, { color: colors.textSecondary }]}>{item.etiket}</Text>
            </View>
          </View>
        ))}

        {aktifKat === 'sss' && SSS.map((item, i) => {
          const acik = acikSSS === i;
          return (
            <Pressable
              key={i}
              onPress={() => setAcikSSS(acik ? null : i)}
              accessibilityRole="button"
              accessibilityState={{ expanded: acik }}
              style={[s.sss, { borderBottomColor: colors.border }]}
            >
              <View style={[s.sssUst, isDesktop && { gap: COL_GAP }]}>
                <Text style={[s.sssSoru, { color: colors.textPrimary, fontSize: isNarrow ? 22 : 26 }, isDesktop && { flex: 0, width: COL }]}>{item.soru}</Text>
                {isDesktop && (
                  <View style={{ flex: 1 }}>
                    {acik && <Text style={[s.metin, { color: colors.textSecondary }]}>{item.cevap}</Text>}
                  </View>
                )}
                <Text style={[s.sssIsaret, { color: colors.textPrimary }, !isDesktop && { marginLeft: 'auto' }]}>{acik ? '\u2212' : '+'}</Text>
              </View>
              {!isDesktop && acik && <Text style={[s.metin, { color: colors.textSecondary, marginTop: 12 }]}>{item.cevap}</Text>}
            </Pressable>
          );
        })}
      </Wrap>
    </Screen>
  );
}

const s = StyleSheet.create({
  kayit:  { paddingVertical: 28, borderBottomWidth: 1, gap: 12 },
  kayitGenis: { flexDirection: 'row', alignItems: 'flex-start', gap: COL_GAP },
  sol:    { gap: 8 },
  sag:    { flex: 1, minWidth: 0, gap: 8 },
  baslik: { fontFamily: SERIF, letterSpacing: -0.6, lineHeight: 36 },
  kunye:  { fontFamily: FONT, fontSize: 14, fontWeight: '500' },
  metin:  { fontFamily: FONT, fontSize: 15, lineHeight: 24, maxWidth: 640 },
  etiket: { fontFamily: FONT, fontSize: 13, marginTop: 4 },

  sss:       { paddingVertical: 24, borderBottomWidth: 1 },
  sssUst:    { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 },
  sssSoru:   { flex: 1, fontFamily: SERIF, letterSpacing: -0.4, lineHeight: 30 },
  sssIsaret: { fontFamily: FONT, fontSize: 24, lineHeight: 30, width: 20, textAlign: 'right' },
});
