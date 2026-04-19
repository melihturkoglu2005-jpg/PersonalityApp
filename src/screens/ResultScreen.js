import React, { useMemo } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Dimensions, Platform,
} from 'react-native';
import { colors, space, shadows, radius } from '../theme/colors';
import { mbtiHesapla }        from '../utils/mbtiCalculator';
import { enneagramHesapla }   from '../utils/enneagramCalculator';
import TopNav from '../components/TopNav';
import AppBackground from '../components/AppBackground';
import ScreenFadeIn from '../components/ScreenFadeIn';
import Footer from '../components/Footer';
import AdPlaceholder from '../components/AdPlaceholder';
import SEOMeta from '../components/SEOMeta';

const { width } = Dimensions.get('window');
const isWeb     = Platform.OS === 'web';
const isDesktop = width >= 1024 && isWeb;
const FONT = Platform.select({ ios:'System', android:'sans-serif', web:"'Inter',system-ui,sans-serif" });

// ─── Veri ────────────────────────────────────────────────────────────────────
const MBTI_ACIKLAMALAR = {
  INTJ:'Sen vizyoner bir lider olarak öne çıkıyorsun. Büyük resmi görme yeteneğin ve stratejik düşünceyle, karmaşık problemleri çözme konusunda uzmansın.',
  INTP:'Sen meraklı bir düşünürsün. Soyut konuları derinlemesine analiz etme ve yenilikçi çözümler üretme yeteneğine sahipsin.',
  ENTJ:'Sen doğal bir lidersin. Kararlılığın ve stratejik bakış açın, hedeflere ulaşmak için gereken yolu çizmeni sağlıyor.',
  ENTP:'Sen zeki ve yenilikçi bir tartışmacısın. Farklı bakış açıları sunma ve alışılmışın dışında düşünme yeteneğin var.',
  INFJ:'Sen derin sezgilere sahip idealist birisin. İnsanların potansiyelini görme ve onlara ilham verme konusunda uzmansın.',
  INFP:'Sen empatik ve yaratıcı bir arabulucusun. İnsanların duygularını anlama ve onlara destek olma konusunda doğal yeteneğe sahipsin.',
  ENFJ:'Sen ilham verici bir lider ve empatik bir dinleyicisin. İnsanları bir araya getirme konusunda uzmansın.',
  ENFP:'Sen enerjik ve yaratıcı bir kampanyacısın. İnsanları heyecanlandırma ve yeni fikirler üretme konusunda yeteneklisin.',
  ISTJ:'Sen güvenilir ve sorumluluk sahibi birisin. Verilen görevleri zamanında ve eksiksiz yerine getirme konusunda uzmansın.',
  ISFJ:'Sen sadık ve koruyucu birisisin. Başkalarının ihtiyaçlarını görme ve onlara destek olma konusunda doğal yeteneğin var.',
  ESTJ:'Sen düzenli ve kararlı bir yöneticisin. Pratik yaklaşımın ve sorumluluk duygun başarıyı getiriyor.',
  ESFJ:'Sen sıcakkanlı ve toplum odaklı birisin. İnsanları bir araya getirme ve onlara destek olma konusunda uzmansın.',
  ISTP:'Sen pratik ve bağımsız bir virtüözsün. Uygulamalı çözümlerle ilgileniyorsun; araçları ve teknik konuları anlama konusunda yeteneklisin.',
  ISFP:'Sen estetik duyarlılığı yüksek ve sakin bir maceracısın. Sanat ve güzellik senin için önemli.',
  ESTP:'Sen enerjik ve pratik bir girişimcisin. Anı yaşama ve risk alma konusunda cesursun.',
  ESFP:'Sen spontane ve hayat dolu bir eğlendiricisin. İnsanları neşelendirme konusunda uzmansın.',
};

const MBTI_GUCLU = {
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

const ENNEA_ACIKLAMALAR = {
  1:'Sen bir reformcusun. Mükemmeliyetçi doğan, her işi en iyi şekilde yapma arzunu taşıyor.',
  2:'Sen bir yardımseversin. Başkalarına destek olma ve onları mutlu etme konusunda doğal yeteneğe sahipsin.',
  3:'Sen bir başarıcısın. Hırslı ve rekabetçi yapın, hedeflerine ulaşmanda etkili oluyor.',
  4:'Sen bir bireycisin. Özgünlüğe ve derinliğe değer veriyorsun.',
  5:'Sen bir gözlemcisin. Bilgiye ve anlayışa değer veriyorsun.',
  6:'Sen bir sadıksın. Güvenlik ve istikrar sana önemli.',
  7:'Sen bir meraklısın. Yeni deneyimler ve keşifler seni heyecanlandırıyor.',
  8:'Sen bir meydan okuyucusun. Güçlü ve kararlı yapın zorluklarla yüzleşmende etkili.',
  9:'Sen bir barışçılsın. Uyum ve huzur sana önemli.',
};

const ENNEA_KANAT = {
  '1w2':'Mükemmeliyetçi yanında yardımsever bir kanadın var.','1w9':'Mükemmeliyetçi yanında barışçıl bir kanadın var.',
  '2w1':'Yardımsever yanında mükemmeliyetçi bir kanadın var.','2w3':'Yardımsever yanında başarıcı bir kanadın var.',
  '3w2':'Başarıcı yanında yardımsever bir kanadın var.','3w4':'Başarıcı yanında bireyci bir kanadın var.',
  '4w3':'Bireyci yanında başarıcı bir kanadın var.','4w5':'Bireyci yanında gözlemci bir kanadın var.',
  '5w4':'Gözlemci yanında bireyci bir kanadın var.','5w6':'Gözlemci yanında sadık bir kanadın var.',
  '6w5':'Sadık yanında gözlemci bir kanadın var.','6w7':'Sadık yanında meraklı bir kanadın var.',
  '7w6':'Meraklı yanında sadık bir kanadın var.','7w8':'Meraklı yanında meydan okuyucu bir kanadın var.',
  '8w7':'Meydan okuyucu yanında meraklı bir kanadın var.','8w9':'Meydan okuyucu yanında barışçıl bir kanadın var.',
  '9w1':'Barışçıl yanında mükemmeliyetçi bir kanadın var.','9w8':'Barışçıl yanında meydan okuyucu bir kanadın var.',
};

function guvenRengi(s) { return s >= 80 ? colors.success : s >= 60 ? colors.primary : colors.error; }
function guvenEtiketi(s) { return s >= 80 ? 'Yüksek güven' : s >= 60 ? 'Orta güven' : 'Düşük güven'; }

// ─── Sub-bileşenler ───────────────────────────────────────────────────────────
function SectionLabel({ text }) {
  return (
    <View style={sub.sectionLabelRow}>
      <View style={sub.sectionLabelLine} />
      <Text style={sub.sectionLabelText}>{text}</Text>
      <View style={sub.sectionLabelLine} />
    </View>
  );
}

const sub = StyleSheet.create({
  sectionLabelRow:  { flexDirection:'row', alignItems:'center', gap: space[3], marginBottom: space[3], marginTop: space[2] },
  sectionLabelLine: { flex:1, height:1, backgroundColor: colors.border },
  sectionLabelText: { fontSize: 11, fontWeight:'700', color: colors.textMuted, fontFamily: FONT, letterSpacing:1, textTransform:'uppercase' },
});

// ─── Ana Ekran ────────────────────────────────────────────────────────────────
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

  const seoTitle = mbtiSonuc
    ? `${mbtiSonuc.tip} Kişilik Sonucu`
    : enneagramSonuc
    ? `Enneagram Tip ${enneagramSonuc.tip} Sonucu`
    : 'Test Sonucu';

  return (
    <SafeAreaView style={s.safe}>
      <SEOMeta
        title={seoTitle}
        description="Kişilik testi sonucunuz hazır. MBTI ve Enneagram analizinizi, güçlü yönlerinizi ve kariyer önerilerinizi inceleyin."
        noIndex={true}
      />
      <AppBackground />
      <ScreenFadeIn>
        <TopNav navigation={navigation} />

        <ScrollView contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>

          {/* ── Başlık bloğu ── */}
          <View style={s.heroSection}>
            <Text style={s.heroTitle}>Sonuçların</Text>
            <Text style={s.heroSub}>Araştırma bazlı kişilik analizi</Text>
          </View>

          {/* ── Yan sütunlu düzen (desktop) ── */}
          <View style={s.mainLayout}>

            {/* Sol: sonuç kartları */}
            <View style={s.mainContent}>

              {/* MBTI Kartı */}
              {mbtiSonuc && (
                <View style={[s.kart, { borderLeftColor: colors.primary, borderLeftWidth: 4 }]}>
                  <View style={s.kartHeader}>
                    <View>
                      <View style={[s.kartBadge, { backgroundColor: colors.primaryLight }]}>
                        <Text style={[s.kartBadgeText, { color: colors.primaryDark }]}>BİLİŞSEL FONKSİYONLAR</Text>
                      </View>
                      <Text style={s.buyukTip}>{mbtiSonuc.tip}</Text>
                    </View>
                    <View style={[s.guvenBadge, { backgroundColor: guvenRengi(mbtiSonuc.guvenSkoru) + '22' }]}>
                      <Text style={[s.guvenBadgeText, { color: guvenRengi(mbtiSonuc.guvenSkoru) }]}>
                        {guvenEtiketi(mbtiSonuc.guvenSkoru)} · %{mbtiSonuc.guvenSkoru}
                      </Text>
                    </View>
                  </View>

                  <Text style={s.aciklama}>{MBTI_ACIKLAMALAR[mbtiSonuc.tip] || ''}</Text>

                  <SectionLabel text="Harold Grant Fonksiyon Yığını" />
                  <View style={s.yiginRow}>
                    {mbtiSonuc.yigin.slice(0, 4).map((f, i) => (
                      <View key={f} style={[s.yiginKart, i === 0 && {
                        backgroundColor: colors.primaryLight, borderColor: colors.primary,
                        ...shadows.colored(colors.primary),
                      }]}>
                        <Text style={[s.yiginF, i === 0 && { color: colors.primary }]}>{f}</Text>
                        <Text style={s.yiginLabel}>{['Dom','Aux','Ter','Inf'][i]}</Text>
                      </View>
                    ))}
                  </View>

                  <SectionLabel text="Güçlü Yönlerin" />
                  <Text style={s.listeText}>{MBTI_GUCLU[mbtiSonuc.tip] || ''}</Text>

                  <SectionLabel text="Kariyer Önerileri" />
                  <Text style={s.listeText}>{MBTI_KARIYER[mbtiSonuc.tip] || ''}</Text>

                  <SectionLabel text="Yakın Alternatifler" />
                  <View style={s.chipRow}>
                    {mbtiSonuc.alternatifler.map(t => (
                      <View key={t} style={s.chip}>
                        <Text style={s.chipText}>{t}</Text>
                      </View>
                    ))}
                  </View>

                  <SectionLabel text="Fonksiyon Skorları" />
                  {Object.entries(mbtiSonuc.aksAyarliSkorlar).sort((a,b) => b[1]-a[1]).map(([f, skor]) => (
                    <View key={f} style={s.skorRow}>
                      <Text style={s.skorLabel}>{f}</Text>
                      <View style={s.barBg}>
                        <View style={[s.barFill, { width:`${skor}%`, backgroundColor: colors.primary }]} />
                      </View>
                      <Text style={s.skorNum}>{skor}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Inline reklam (kartlar arası) */}
              {mbtiSonuc && enneagramSonuc && (
                <AdPlaceholder variant="inline" style={{ marginVertical: space[4] }} />
              )}

              {/* Enneagram Kartı */}
              {enneagramSonuc && (
                <View style={[s.kart, { borderLeftColor: colors.secondary, borderLeftWidth: 4 }]}>
                  <View style={s.kartHeader}>
                    <View>
                      <View style={[s.kartBadge, { backgroundColor: colors.secondaryLight }]}>
                        <Text style={[s.kartBadgeText, { color: colors.secondaryDark }]}>ENNEAGRAM</Text>
                      </View>
                      <Text style={[s.buyukTip, { color: colors.secondary }]}>{enneagramSonuc.kanatYazisi}</Text>
                    </View>
                    <View style={[s.guvenBadge, { backgroundColor: guvenRengi(enneagramSonuc.guvenSkoru) + '22' }]}>
                      <Text style={[s.guvenBadgeText, { color: guvenRengi(enneagramSonuc.guvenSkoru) }]}>
                        {guvenEtiketi(enneagramSonuc.guvenSkoru)} · %{enneagramSonuc.guvenSkoru}
                      </Text>
                    </View>
                  </View>

                  <Text style={s.aciklama}>{ENNEA_ACIKLAMALAR[enneagramSonuc.tip] || ''}</Text>
                  {enneagramSonuc.kanatYazisi !== String(enneagramSonuc.tip) && (
                    <Text style={[s.aciklama, { fontStyle:'italic', marginTop: -space[3] }]}>
                      {ENNEA_KANAT[enneagramSonuc.kanatYazisi] || ''}
                    </Text>
                  )}

                  <SectionLabel text="Entegrasyon Yönleri" />
                  <View style={s.chipRow}>
                    <View style={[s.chip, { borderColor: colors.success + '55' }]}>
                      <Text style={[s.chipText, { color: colors.success }]}>Güvenlik: {enneagramSonuc.entegrasyon.guvenlik}</Text>
                    </View>
                    <View style={[s.chip, { borderColor: colors.error + '55' }]}>
                      <Text style={[s.chipText, { color: colors.error }]}>Stres: {enneagramSonuc.entegrasyon.stres}</Text>
                    </View>
                  </View>

                  <SectionLabel text="Tip Skorları" />
                  {Object.entries(enneagramSonuc.kanatAyarliSkorlar).sort((a,b) => b[1]-a[1]).map(([tip, skor]) => (
                    <View key={tip} style={s.skorRow}>
                      <Text style={s.skorLabel}>Tip {tip}</Text>
                      <View style={s.barBg}>
                        <View style={[s.barFill, { width:`${skor}%`, backgroundColor: colors.secondary }]} />
                      </View>
                      <Text style={s.skorNum}>{skor}</Text>
                    </View>
                  ))}
                </View>
              )}

              {!mbtiSonuc && !enneagramSonuc && (
                <View style={s.kart}>
                  <Text style={s.aciklama}>Sonuç yüklenemedi. Lütfen testi tekrar deneyin.</Text>
                </View>
              )}

              {/* CTA butonlar */}
              <View style={s.actionRow}>
                <TouchableOpacity style={s.primaryBtn} onPress={() => navigation.navigate('Home')}>
                  <Text style={s.primaryBtnText}>Ana Sayfaya Dön</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.secondaryBtn} onPress={() => navigation.navigate('KisilikTipleri')}>
                  <Text style={s.secondaryBtnText}>Tipleri İncele →</Text>
                </TouchableOpacity>
              </View>

              {/* SEO bloğu: Sonuç sayfasında açıklama */}
              <View style={s.seoBlock}>
                <Text style={s.seoTitle}>Sonucunuzu Nasıl Yorumlamalısınız?</Text>
                <Text style={s.seoText}>
                  MBTI tipolojisi kesin sınıflandırma değil, tercihler spektrumu sunar. Algoritma güveni yüksekse
                  fonksiyon yığınınız nettir; düşükse birden fazla tipi araştırmanızı öneririz. Enneagram ile MBTI
                  sonuçlarını birlikte değerlendirmek daha bütünsel bir öz-farkındalık sağlar. Bu sonuçlar
                  profesyonel psikolojik değerlendirmenin yerini tutmaz.
                </Text>
              </View>
            </View>

            {/* Sağ: sidebar reklam (yalnızca desktop) */}
            {isDesktop && (
              <View style={s.sidebar}>
                <AdPlaceholder variant="sidebar" />
              </View>
            )}
          </View>

          <Footer navigation={navigation} />
        </ScrollView>
      </ScreenFadeIn>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex:1, backgroundColor: colors.background },

  scrollContent: { paddingBottom: 0 },

  heroSection: {
    maxWidth: isDesktop ? 1040 : '100%',
    alignSelf:'center', width:'100%',
    paddingHorizontal: isDesktop ? space[6] : space[5],
    paddingTop: isDesktop ? space[10] : space[6],
    paddingBottom: space[6],
  },
  heroTitle: {
    fontSize: isDesktop ? 44 : 32,
    fontWeight:'800', color: colors.textPrimary,
    fontFamily: FONT, letterSpacing:-1, marginBottom: space[1],
  },
  heroSub: { fontSize: 15, color: colors.textSecondary, fontFamily: FONT },

  mainLayout: {
    maxWidth: isDesktop ? 1040 : '100%',
    alignSelf:'center', width:'100%',
    paddingHorizontal: isDesktop ? space[6] : space[5],
    flexDirection: isDesktop ? 'row' : 'column',
    gap: space[6], alignItems:'flex-start',
    paddingBottom: space[4],
  },
  mainContent: { flex: 1, gap: space[4] },
  sidebar: { width: 320, flexShrink:0 },

  // Kartlar
  kart: {
    backgroundColor: colors.surface,
    borderRadius: radius.xxl,
    padding: isDesktop ? space[7] : space[6],
    borderWidth: 1, borderColor: colors.border,
    ...shadows.lg,
  },
  kartHeader: {
    flexDirection:'row', justifyContent:'space-between',
    alignItems:'flex-start', marginBottom: space[4],
  },
  kartBadge: {
    borderRadius: radius.full,
    paddingHorizontal: space[3], paddingVertical: 4,
    alignSelf:'flex-start', marginBottom: space[2],
  },
  kartBadgeText: { fontSize: 10, fontWeight:'800', letterSpacing:1.5, fontFamily: FONT },
  buyukTip: {
    fontSize: isDesktop ? 56 : 44,
    fontWeight:'800', color: colors.textPrimary,
    fontFamily: FONT, letterSpacing:-2, lineHeight: isDesktop ? 60 : 50,
  },
  guvenBadge:     { borderRadius: radius.full, paddingHorizontal: space[4], paddingVertical: space[2], alignSelf:'flex-start' },
  guvenBadgeText: { fontSize: 12, fontWeight:'600', fontFamily: FONT },
  aciklama:       { fontSize: 15, color: colors.textSecondary, fontFamily: FONT, lineHeight:24, marginBottom: space[4] },

  // Fonksiyon yığını
  yiginRow: { flexDirection:'row', gap: space[3], marginBottom: space[4] },
  yiginKart: {
    flex:1, alignItems:'center', paddingVertical: space[4],
    borderRadius: radius.lg, borderWidth: 1.5, borderColor: colors.border,
    backgroundColor: colors.surfaceLight, ...shadows.sm,
  },
  yiginF:     { fontSize: 18, fontWeight:'800', color: colors.textPrimary, fontFamily: FONT },
  yiginLabel: { fontSize: 10, color: colors.textMuted, marginTop: 4, fontFamily: FONT, fontWeight:'600' },

  listeText: { fontSize: 14, color: colors.textSecondary, fontFamily: FONT, lineHeight:24, marginBottom: space[4] },

  chipRow: { flexDirection:'row', gap: space[2], flexWrap:'wrap', marginBottom: space[4] },
  chip: {
    paddingHorizontal: space[4], paddingVertical: space[2],
    borderRadius: radius.full, borderWidth: 1.5, borderColor: colors.border,
    backgroundColor: colors.surfaceLight,
  },
  chipText: { fontSize: 13, color: colors.textSecondary, fontWeight:'500', fontFamily: FONT },

  skorRow:   { flexDirection:'row', alignItems:'center', gap: space[3], marginBottom: space[2] },
  skorLabel: { fontSize: 12, color: colors.textSecondary, width: 40, fontWeight:'600', fontFamily: FONT },
  barBg:     { flex:1, height: 8, backgroundColor: colors.borderLight, borderRadius: radius.full, overflow:'hidden' },
  barFill:   { height: 8, borderRadius: radius.full },
  skorNum:   { fontSize: 12, color: colors.textMuted, width: 28, textAlign:'right', fontFamily: FONT },

  // Butonlar
  actionRow:      { flexDirection: isDesktop ? 'row' : 'column', gap: space[3], marginTop: space[2] },
  primaryBtn: {
    flex: isDesktop ? 1 : undefined,
    backgroundColor: colors.surface,
    borderWidth: 1.5, borderColor: colors.border,
    borderRadius: radius.xl, paddingVertical: space[4],
    alignItems:'center', ...shadows.sm,
  },
  primaryBtnText: { color: colors.textSecondary, fontSize: 15, fontWeight:'500', fontFamily: FONT },
  secondaryBtn: {
    flex: isDesktop ? 1 : undefined,
    backgroundColor: colors.primary,
    borderRadius: radius.xl, paddingVertical: space[4],
    alignItems:'center', ...shadows.colored(colors.primary),
  },
  secondaryBtnText: { color:'#fff', fontSize: 15, fontWeight:'600', fontFamily: FONT },

  seoBlock: {
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.xl, borderWidth:1, borderColor: colors.border,
    padding: space[6], marginTop: space[2],
  },
  seoTitle: { fontSize: 15, fontWeight:'700', color: colors.textPrimary, fontFamily: FONT, marginBottom: space[3] },
  seoText:  { fontSize: 13, color: colors.textSecondary, fontFamily: FONT, lineHeight:22 },
});
