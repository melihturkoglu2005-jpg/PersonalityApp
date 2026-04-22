// mbtiCalculator.js — v4: Harold Grant fonksiyon yığını + doğrudan E/I ölçümü
//
// v4 Değişiklikleri:
//   - 10 yeni EI sorusu (id 41-50) için ayrı bir EI ekseni hesaplanır.
//   - EI skoru, fonksiyon yığını uyum hesabına %35 ağırlıkla entegre edilir.
//   - Fonksiyon yığını katkısı %65 ağırlık taşır (v3'te %100'dü).
//   - Güven skoru formülü güncellendi: EI farkı da hesaba katılır.
//   - Tüm diğer mantık (aks ayarı, normalize, gölge cezası) v3'ten korundu.
//
// Araştırma temeli:
//   - Myers & McCaulley (1985): E/I'nın MBTI'daki belirleyici rolü
//   - Fleeson & Gallagher (2009): E/I'ın enerji yönetimiyle ilişkisi
//   - Grant (1965): Bilişsel fonksiyon yığınları
//   - McCrae & Costa (1989): Big Five N/E ile MBTI E/I korelasyonu

import { mbtiQuestions } from '../data/mbtiQuestions';

// Harold Grant'in 16 tip için tam fonksiyon yığınları
// Her tip: [Dominant, Auxiliary, Tertiary, Inferior, Gölge5, Gölge6, Gölge7, Gölge8]
const FONKSIYON_YIGINI = {
  INTJ: ['Ni', 'Te', 'Fi', 'Se', 'Ne', 'Ti', 'Fe', 'Si'],
  INTP: ['Ti', 'Ne', 'Si', 'Fe', 'Te', 'Ni', 'Se', 'Fi'],
  ENTJ: ['Te', 'Ni', 'Se', 'Fi', 'Ti', 'Ne', 'Si', 'Fe'],
  ENTP: ['Ne', 'Ti', 'Fe', 'Si', 'Ni', 'Te', 'Fi', 'Se'],
  INFJ: ['Ni', 'Fe', 'Ti', 'Se', 'Ne', 'Fi', 'Te', 'Si'],
  INFP: ['Fi', 'Ne', 'Si', 'Te', 'Fe', 'Ni', 'Se', 'Ti'],
  ENFJ: ['Fe', 'Ni', 'Se', 'Ti', 'Fi', 'Ne', 'Si', 'Te'],
  ENFP: ['Ne', 'Fi', 'Te', 'Si', 'Ni', 'Fe', 'Ti', 'Se'],
  ISTJ: ['Si', 'Te', 'Fi', 'Ne', 'Se', 'Ti', 'Fe', 'Ni'],
  ISFJ: ['Si', 'Fe', 'Ti', 'Ne', 'Se', 'Fi', 'Te', 'Ni'],
  ESTJ: ['Te', 'Si', 'Ne', 'Fi', 'Ti', 'Se', 'Ni', 'Fe'],
  ESFJ: ['Fe', 'Si', 'Ne', 'Ti', 'Fi', 'Se', 'Ni', 'Te'],
  ISTP: ['Ti', 'Se', 'Ni', 'Fe', 'Te', 'Si', 'Ne', 'Fi'],
  ISFP: ['Fi', 'Se', 'Ni', 'Te', 'Fe', 'Si', 'Ne', 'Ti'],
  ESTP: ['Se', 'Ti', 'Fe', 'Ni', 'Si', 'Te', 'Fi', 'Ne'],
  ESFP: ['Se', 'Fi', 'Te', 'Ni', 'Si', 'Fe', 'Ti', 'Ne'],
};

// Her tipin E veya I olduğunu belirtir.
// Fonksiyon yığınında dominant dışa dönük ise E, içe dönük ise I.
const TIP_EI = {
  INTJ: 'I', INTP: 'I', ENTJ: 'E', ENTP: 'E',
  INFJ: 'I', INFP: 'I', ENFJ: 'E', ENFP: 'E',
  ISTJ: 'I', ISFJ: 'I', ESTJ: 'E', ESFJ: 'E',
  ISTP: 'I', ISFP: 'I', ESTP: 'E', ESFP: 'E',
};

// MBTI-Enneagram korelasyon verileri (araştırma bazlı olasılıklar)
export const MBTI_ENNEAGRAM_KORELASYON = {
  INTJ: { yuksek: [1, 5, 3], orta: [6, 8] },
  INTP: { yuksek: [5, 4, 9], orta: [1, 7] },
  ENTJ: { yuksek: [8, 3, 1], orta: [5, 6] },
  ENTP: { yuksek: [7, 5, 3], orta: [8, 4] },
  INFJ: { yuksek: [4, 1, 2], orta: [5, 9] },
  INFP: { yuksek: [4, 9, 5], orta: [2, 1] },
  ENFJ: { yuksek: [2, 1, 3], orta: [4, 9] },
  ENFP: { yuksek: [7, 4, 2], orta: [9, 3] },
  ISTJ: { yuksek: [1, 6, 5], orta: [3, 9] },
  ISFJ: { yuksek: [2, 6, 1], orta: [9, 4] },
  ESTJ: { yuksek: [1, 3, 8], orta: [6, 2] },
  ESFJ: { yuksek: [2, 3, 6], orta: [1, 9] },
  ISTP: { yuksek: [5, 9, 8], orta: [6, 4] },
  ISFP: { yuksek: [9, 4, 6], orta: [2, 7] },
  ESTP: { yuksek: [7, 8, 3], orta: [6, 9] },
  ESFP: { yuksek: [7, 2, 9], orta: [3, 6] },
};

// Fonksiyon aksları — zıt fonksiyonlar çift çalışır
const AKSLAR = [
  ['Ni', 'Se'],
  ['Ne', 'Si'],
  ['Ti', 'Fe'],
  ['Te', 'Fi'],
];

// Fonksiyon yığını uyum ağırlıkları (v3'ten aynı)
const AGIRLIKLAR = [0.45, 0.28, 0.12, 0.10, 0.05, 0.04, 0.03, 0.03];

// ─── EI yüzdesini ham cevaplardan hesapla ────────────────────────────────────
// EI soruları: ters:true  → yüksek puan = Introvert
//              ters:false → yüksek puan = Extrovert
// Sonuç: eiYuzde > 50 → Extrovert eğilim, < 50 → Introvert eğilim
function eiYuzdeHesapla(cevaplar) {
  const eiSorular = mbtiQuestions.filter((s) => s.ei === true);
  if (eiSorular.length === 0) return 50; // Veri yoksa nötr

  let eToplam = 0;
  let maxPuan = 0;

  eiSorular.forEach((soru) => {
    const ham = cevaplar[soru.id] || 3; // Yanıt yoksa orta değer
    // ters:true → düşük ham puan = Extrovert (6 - ham = E katkısı)
    // ters:false → yüksek ham puan = Extrovert (ham = E katkısı)
    const eKatkisi = soru.ters ? (6 - ham) : ham;
    eToplam += eKatkisi;
    maxPuan += 5;
  });

  return Math.round((eToplam / maxPuan) * 100);
}

// ─── Ana hesaplama fonksiyonu ─────────────────────────────────────────────────
export function mbtiHesapla(cevaplar) {

  // 1. Her bilişsel fonksiyonun ham skorunu hesapla (EI soruları hariç)
  const hamSkorlar = {};
  const fonksiyonSoruSayisi = {}; // Normalizasyon için dinamik soru sayısı
  mbtiQuestions.forEach((soru) => {
    if (soru.ei) return; // EI soruları ayrıca işleniyor
    const hamPuan = cevaplar[soru.id] || 3; // Yanıt yoksa orta değer (0 yerine 3 — tarafsız başlangıç)
    const efektifPuan = soru.ters ? (6 - hamPuan) : hamPuan;
    hamSkorlar[soru.fonksiyon] = (hamSkorlar[soru.fonksiyon] || 0) + efektifPuan;
    fonksiyonSoruSayisi[soru.fonksiyon] = (fonksiyonSoruSayisi[soru.fonksiyon] || 0) + 1;
  });

  // 2. Normalize et (0-100) — dinamik max puan (soru sayısı * 5)
  const normalize = {};
  Object.entries(hamSkorlar).forEach(([f, skor]) => {
    const maxPuan = (fonksiyonSoruSayisi[f] || 5) * 5;
    normalize[f] = Math.round((skor / maxPuan) * 100);
  });

  // 3. Aks analizi — belirsiz aksları güçlendir
  const aksAyarli = { ...normalize };
  AKSLAR.forEach(([a, b]) => {
    const fark = Math.abs(aksAyarli[a] - aksAyarli[b]);
    if (fark < 15) {
      if (aksAyarli[a] >= aksAyarli[b]) {
        aksAyarli[a] = Math.min(100, aksAyarli[a] + 10);
        aksAyarli[b] = Math.max(0,   aksAyarli[b] - 10);
      } else {
        aksAyarli[b] = Math.min(100, aksAyarli[b] + 10);
        aksAyarli[a] = Math.max(0,   aksAyarli[a] - 10);
      }
    }
  });

  // 4. Dışa/içe dönük fonksiyon toplamlarını hesapla
  const disaDonus = ['Te', 'Fe', 'Se', 'Ne'];
  const iceDonus  = ['Ti', 'Fi', 'Si', 'Ni'];

  let disaToplam = 0;
  let iceToplam  = 0;
  disaDonus.forEach((f) => (disaToplam += aksAyarli[f]));
  iceDonus.forEach( (f) => (iceToplam  += aksAyarli[f]));

  // 5. Doğrudan E/I skoru (yeni — 10 soru bazlı)
  const eiYuzde = eiYuzdeHesapla(cevaplar);
  // eiYuzde: 0-100 arası; 50 = nötr, >50 = Extrovert, <50 = Introvert

  // 6. Her tipin uyum skorunu hesapla
  //    Fonksiyon yığını katkısı: %65
  //    EI uyumu katkısı:         %35
  //
  //    Rationale: EI soruları doğrudan davranışsal/enerji boyutunu ölçer.
  //    Fonksiyon yığını ise bilişsel stili ölçer. İkisi birlikte daha güvenilir.
  const YIGIN_AGIRLIGI = 0.65;
  const EI_AGIRLIGI    = 0.35;

  const tipUyumlari = Object.entries(FONKSIYON_YIGINI).map(([tip, yigin]) => {
    // 6a. Fonksiyon yığını skoru (v3 ile aynı)
    let yiginSkoru = 0;
    yigin.forEach((f, i) => {
      yiginSkoru += i < 4
        ? aksAyarli[f] * AGIRLIKLAR[i]
        : -aksAyarli[f] * AGIRLIKLAR[i];
    });
    // yiginSkoru tipik olarak 0-100 aralığında değil; normalize için bölüyoruz
    // Maksimum teorik yiginSkoru ≈ 100*0.45 + 100*0.28 + 100*0.12 + 100*0.10 = 95
    const yiginNorm = yiginSkoru / 95;

    // 6b. EI uyumu skoru
    // Bu tip E mi I mi? Kullanıcının EI yüzdesiyle ne kadar uyuşuyor?
    // E tipler için: eiYuzde ne kadar yüksekse o kadar iyi uyum
    // I tipler için: eiYuzde ne kadar düşükse o kadar iyi uyum
    const tipEI = TIP_EI[tip];
    // eiUyum: 0-1 arası; 1 = mükemmel uyum
    const eiUyum = tipEI === 'E'
      ? eiYuzde / 100          // E tip: yüksek eiYuzde → iyi
      : (100 - eiYuzde) / 100; // I tip: düşük eiYuzde → iyi

    // 6c. Birleşik skor
    const birlesikSkor = (yiginNorm * YIGIN_AGIRLIGI + eiUyum * EI_AGIRLIGI) * 100;

    return { tip, skor: Math.round(birlesikSkor) };
  }).sort((a, b) => b.skor - a.skor);

  const enIyiTip = tipUyumlari[0].tip;

  // 7. Güven skoru
  // v4: Hem sıralama farkını hem EI netliğini hesaba kat
  const birinci = tipUyumlari[0].skor;
  const ikinci  = tipUyumlari[1].skor;
  const ucuncu  = tipUyumlari[2]?.skor ?? ikinci;
  const rakipOrtalama = (ikinci + ucuncu) / 2;
  const siralamaDfark = birinci - rakipOrtalama;

  // EI netliği: 50'den uzaklık (0-50 arası) → ne kadar net E veya I
  const eiNetlik = Math.abs(eiYuzde - 50); // 0=belirsiz, 50=kesin

  // Güven: sıralama farkı + EI netliği birlikte
  const guvenBaz = 50 + siralamaDfark * 0.7 + eiNetlik * 0.3;
  const guvenSkoru = Math.min(100, Math.max(50, Math.round(guvenBaz)));

  return {
    tip:              enIyiTip,
    skorlar:          normalize,
    aksAyarliSkorlar: aksAyarli,
    yigin:            FONKSIYON_YIGINI[enIyiTip],
    alternatifler:    tipUyumlari.slice(1, 3).map((t) => t.tip),
    guvenSkoru,
    eiYuzde,         // 0-100; >50 = Extrovert, <50 = Introvert
    eiNetlik,        // 0-50; ne kadar net E/I olduğu
    disaIceOran: {
      disa: Math.round(disaToplam / 4),
      ice:  Math.round(iceToplam / 4),
    },
  };
}
