// mbtiCalculator.js
// Harold Grant fonksiyon yığını modeline dayalı gelişmiş MBTI hesaplama.
//
// v3 Güncellemesi (kaynaklar):
//
// IPIP Kılavuzu (Goldberg / openpsychometrics.org):
//   - Ters kodlanmış soruları desteklemek için `soru.ters` alanı eklendi.
//     Ters sorularda efektif puan = 6 - ham_puan (1-5 skala).
//   - Bu, acquiescence bias'ı (hepsine aynı cevabı verme eğilimi) kırar.
//
// SWCPQ Makale (Jorgenson / openpsychometrics.org):
//   - Aks ayarı measurement invariance sorununu hafifletmek için korundu.
//   - Güven skoru: top-3 mutlak fark (v2'den devam).
//   - 6. adımdaki ağırlık tutarsızlığı giderildi: artık tek bir AGIRLIKLAR
//     sabiti var, her iki hesaplama da bunu kullanıyor.
//
// Diğer değişiklikler:
//   - Normalize edilmiş maks puan güncellendi: 5 soru × 5 puan = 25 sabit
//     (ters sorular da 1-5 aralığında kalır, sadece yönü ters döner).

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

// Tek ağırlık sabiti — hem en iyi tip seçiminde hem de sıralama/güven hesabında
// aynı değerler kullanılır (v2'deki tutarsızlık giderildi).
//
// Dominant: 0.45  — en belirleyici; bu fonksiyon baskınsa tip çok güçlü işaret eder
// Auxiliary: 0.28 — ikinci güçlü
// Tertiary: 0.12  — yarı bilinçli, fazla ağırlıklandırılmamalı
// Inferior: 0.10  — bilinçdışı ama varlığı tanınır
// Gölge 5-8: negatif katkı — kullanıcı gölge fonksiyonu yüksek skorladıysa
//             o tip için uyumsuzluk artar
const AGIRLIKLAR = [0.45, 0.28, 0.12, 0.10, 0.05, 0.04, 0.03, 0.03];

export function mbtiHesapla(cevaplar) {
  // 1. Her fonksiyonun ham skorunu hesapla
  //    Ters kodlanmış soru (soru.ters === true): efektif puan = 6 - ham_puan
  //    Normal soru: efektif puan = ham_puan
  //    Maks puan her fonksiyon için: 5 soru × 5 puan = 25
  const hamSkorlar = {};
  mbtiQuestions.forEach((soru) => {
    const hamPuan = cevaplar[soru.id] || 0;
    const efektifPuan = soru.ters ? (6 - hamPuan) : hamPuan;
    hamSkorlar[soru.fonksiyon] = (hamSkorlar[soru.fonksiyon] || 0) + efektifPuan;
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
    // v2: artış miktarı 5→10 olarak güncellendi, ayrım gücü artırıldı
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
  let enIyiTip  = 'INTP';
  let enIyiUyum = -1;

  Object.entries(FONKSIYON_YIGINI).forEach(([tip, yigin]) => {
    let uyumSkoru = 0;
    yigin.forEach((fonksiyon, index) => {
      if (index < 4) {
        uyumSkoru += aksAyarli[fonksiyon] * AGIRLIKLAR[index];
      } else {
        uyumSkoru -= aksAyarli[fonksiyon] * AGIRLIKLAR[index];
      }
    });
    if (uyumSkoru > enIyiUyum) {
      enIyiUyum = uyumSkoru;
      enIyiTip  = tip;
    }
  });

  // 6. Tüm tipleri sırala (güven skoru için) — artık 5. adımla aynı AGIRLIKLAR kullanılıyor
  const tipUyumlari = Object.entries(FONKSIYON_YIGINI)
    .map(([tip, yigin]) => {
      let skor = 0;
      yigin.forEach((f, i) => {
        skor += i < 4
          ? aksAyarli[f] * AGIRLIKLAR[i]
          : -aksAyarli[f] * AGIRLIKLAR[i];
      });
      return { tip, skor: Math.round(skor) };
    })
    .sort((a, b) => b.skor - a.skor);

  // 7. Güven skoru hesapla (v2)
  // Sadece 1.-2. tip farkına değil, 1.-3. tip ortalamasına bakıyoruz
  // Bu, gerçekten baskın bir profil ile belirsiz profil arasındaki farkı daha iyi yansıtır
  const birinci = tipUyumlari[0].skor;
  const ikinci  = tipUyumlari[1].skor;
  const ucuncu  = tipUyumlari[2]?.skor ?? ikinci;

  // 1. tip ile 2-3. tiplerin ortalaması arasındaki mutlak fark
  const rakipOrtalama = (ikinci + ucuncu) / 2;
  const mutlakFark = birinci - rakipOrtalama;

  // Mutlak fark 0→50 arasını 50→100 güven aralığına map et
  const guvenSkoru = Math.min(100, Math.max(50, 50 + mutlakFark));

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