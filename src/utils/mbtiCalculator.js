// mbtiCalculator.js
// Harold Grant fonksiyon yığını modeline dayalı gelişmiş MBTI hesaplama.
//
// TEMEL MANTIK:
// Basit E/I, N/S harfi saymak yerine 8 fonksiyonu doğrudan skorlayıp
// hangi fonksiyonun dominant (baskın) olduğuna bakıyoruz.
// Sonra o dominant fonksiyona göre tam 8'li yığını (stack) belirliyoruz.
//
// Harold Grant Yığın Modeli:
// Her MBTI tipinin 8 fonksiyonu belirli bir sırada kullanır:
// 1. Dominant  (en güçlü, bilinçli)
// 2. Auxiliary (ikinci güçlü, bilinçli)
// 3. Tertiary  (üçüncü, yarı bilinçli)
// 4. Inferior  (en zayıf, bilinçdışı)
// 5-8. Gölge fonksiyonlar (bilinçdışı, "karanlık taraf")

import { mbtiQuestions } from '../data/mbtiQuestions';

// Harold Grant'in 16 tip için tam fonksiyon yığınları
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

// MBTI-Enneagram korelasyon verileri (araştırma bazlı olasılıklar)
// Kaynak: Naomi Quenk, Michael Daniels ve çeşitli tipologi araştırmaları
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

// Fonksiyon aksları — zıt fonksiyonlar her zaman çift çalışır
// Ni güçlüyse Se de bir miktar aktiftir (bilinçdışında), bunlar "aks" oluşturur
const AKSLAR = [
  ['Ni', 'Se'], // Sezgi/Duyum iç aksı
  ['Ne', 'Si'], // Sezgi/Duyum dış aksı
  ['Ti', 'Fe'], // Düşünme/Hissetme iç aksı
  ['Te', 'Fi'], // Düşünme/Hissetme dış aksı
];

export function mbtiHesapla(cevaplar) {
  // 1. Her fonksiyonun ham skorunu hesapla (maks 25 puan = 5 soru × 5 puan)
  const hamSkorlar = {};
  mbtiQuestions.forEach((soru) => {
    const puan = cevaplar[soru.id] || 0;
    hamSkorlar[soru.fonksiyon] = (hamSkorlar[soru.fonksiyon] || 0) + puan;
  });

  // 2. Normalize et (0-100 arası yüzdeye çevir)
  const normalize = {};
  Object.entries(hamSkorlar).forEach(([f, skor]) => {
    normalize[f] = Math.round((skor / 25) * 100);
  });

  // 3. Aks analizi — çakışan cevapları dengele
  // Örnek: Ti=90 ve Te=85 → ikisi de çok yüksekse "nüans faktörü" devreye girer
  const aksAyarli = { ...normalize };
  AKSLAR.forEach(([a, b]) => {
    const fark = Math.abs(aksAyarli[a] - aksAyarli[b]);
    // Fark 15 puandan azsa (belirsiz aks) → güçlü olanı %10 artır, zayıfı %10 azalt
    if (fark < 15) {
      if (aksAyarli[a] >= aksAyarli[b]) {
        aksAyarli[a] = Math.min(100, aksAyarli[a] + 5);
        aksAyarli[b] = Math.max(0,   aksAyarli[b] - 5);
      } else {
        aksAyarli[b] = Math.min(100, aksAyarli[b] + 5);
        aksAyarli[a] = Math.max(0,   aksAyarli[a] - 5);
      }
    }
  });

  // 4. Çakışma tespiti ve nüans faktörü
  // Ti ve Te ikisi de yüksekse → soruların bağlamına göre çözümle
  // (Dışa dönük fonksiyonlar: Te, Fe, Se, Ne — bunlar "dış dünyaya" yönelir)
  const disaDonus = ['Te', 'Fe', 'Se', 'Ne'];
  const iceDonus  = ['Ti', 'Fi', 'Si', 'Ni'];

  let disaToplam = 0;
  let iceToplam  = 0;
  disaDonus.forEach((f) => (disaToplam += aksAyarli[f]));
  iceDonus.forEach( (f) => (iceToplam  += aksAyarli[f]));

  // 5. En uygun tipi bul — her tipin yığınıyla kullanıcı skorlarını karşılaştır
  // Dominant + Auxiliary fonksiyonlar en önemli iki fonksiyondur
  let enIyiTip  = 'INTP';
  let enIyiUyum = -1;

  Object.entries(FONKSIYON_YIGINI).forEach(([tip, yigin]) => {
    // Dominant (1.) fonksiyon en ağırlıklı, Auxiliary (2.) ikinci, Tertiary (3.) üçüncü
    const agirliklar = [0.40, 0.30, 0.15, 0.10, 0.02, 0.01, 0.01, 0.01];
    let uyumSkoru = 0;

    yigin.forEach((fonksiyon, index) => {
      // İlk 4 fonksiyon (bilinçli yığın) pozitif katkı sağlar
      // 5-8 fonksiyon (gölge) negatif etki yapar — çünkü bunlar bilinçdışıdır
      if (index < 4) {
        uyumSkoru += aksAyarli[fonksiyon] * agirliklar[index];
      } else {
        // Gölge fonksiyonlar çok yüksekse bu tip için uyumsuzluk artar
        uyumSkoru -= aksAyarli[fonksiyon] * agirliklar[index];
      }
    });

    if (uyumSkoru > enIyiUyum) {
      enIyiUyum = uyumSkoru;
      enIyiTip  = tip;
    }
  });

  // 6. İkinci ve üçüncü en yakın tipleri de bul (güven skoru için)
  const tipUyumlari = Object.entries(FONKSIYON_YIGINI)
    .map(([tip, yigin]) => {
      const agirliklar = [0.40, 0.30, 0.15, 0.10, 0.02, 0.01, 0.01, 0.01];
      let skor = 0;
      yigin.forEach((f, i) => {
        skor += i < 4
          ? aksAyarli[f] * agirliklar[i]
          : -aksAyarli[f] * agirliklar[i];
      });
      return { tip, skor: Math.round(skor) };
    })
    .sort((a, b) => b.skor - a.skor);

  // 7. Güven skoru hesapla
  // 1. ve 2. tip arası fark büyükse sonuç daha güvenilir
  const birinci = tipUyumlari[0].skor;
  const ikinci  = tipUyumlari[1].skor;
  const farkOrani = birinci > 0
    ? Math.round(((birinci - ikinci) / birinci) * 100)
    : 0;
  const guvenSkoru = Math.min(100, 50 + farkOrani);

  return {
    tip:          enIyiTip,
    skorlar:      normalize,
    aksAyarliSkorlar: aksAyarli,
    yigin:        FONKSIYON_YIGINI[enIyiTip],
    alternatifler: tipUyumlari.slice(1, 3).map((t) => t.tip),
    guvenSkoru,
    disaIceOran:  { disa: Math.round(disaToplam / 4), ice: Math.round(iceToplam / 4) },
  };
}