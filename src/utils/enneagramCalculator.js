// enneagramCalculator.js — v2
// Ters kodlama desteği eklendi (soru.ters === true → efektif puan = 6 - ham_puan).

import { enneagramQuestions } from '../data/enneagramQuestions';
import { MBTI_ENNEAGRAM_KORELASYON } from './mbtiCalculator';

const KANATLAR = {
  1: [9, 2], 2: [1, 3], 3: [2, 4],
  4: [3, 5], 5: [4, 6], 6: [5, 7],
  7: [6, 8], 8: [7, 9], 9: [8, 1],
};

const ENTEGRASYON = {
  1: { stres: 4, guvenlik: 7 },
  2: { stres: 8, guvenlik: 4 },
  3: { stres: 9, guvenlik: 6 },
  4: { stres: 2, guvenlik: 1 },
  5: { stres: 7, guvenlik: 8 },
  6: { stres: 3, guvenlik: 9 },
  7: { stres: 1, guvenlik: 5 },
  8: { stres: 5, guvenlik: 2 },
  9: { stres: 6, guvenlik: 3 },
};

export function enneagramHesapla(cevaplar) {
  // 1. Ham skorlar — ters kodlama dahil
  const hamSkorlar = {};
  for (let tip = 1; tip <= 9; tip++) hamSkorlar[tip] = 0;

  enneagramQuestions.forEach((soru) => {
    const hamPuan = cevaplar[soru.id] || 0;
    const efektifPuan = soru.ters ? (6 - hamPuan) : hamPuan;
    hamSkorlar[soru.tip] += efektifPuan;
  });

  // 2. Normalize (0-100)
  const normalize = {};
  Object.entries(hamSkorlar).forEach(([tip, skor]) => {
    normalize[Number(tip)] = Math.round((skor / 25) * 100);
  });

  // 3. Kanat analizi
  const kanatAyarli = { ...normalize };
  Object.entries(KANATLAR).forEach(([tip, kanatlar]) => {
    const tipNo = Number(tip);
    const kanatEtkisi = (normalize[kanatlar[0]] + normalize[kanatlar[1]]) * 0.075;
    kanatAyarli[tipNo] = Math.round(normalize[tipNo] + kanatEtkisi);
  });

  // 4. En yüksek tip
  let enYuksekTip = 1;
  let enYuksekSkor = 0;
  Object.entries(kanatAyarli).forEach(([tip, skor]) => {
    if (skor > enYuksekSkor) {
      enYuksekSkor = skor;
      enYuksekTip = Number(tip);
    }
  });

  // 5. Baskın kanat
  const [kanat1, kanat2] = KANATLAR[enYuksekTip];
  const baskınKanat = normalize[kanat1] >= normalize[kanat2] ? kanat1 : kanat2;

  // 6. Sıralı tip listesi
  const siraliTipler = Object.entries(kanatAyarli)
    .map(([tip, skor]) => ({ tip: Number(tip), skor }))
    .sort((a, b) => b.skor - a.skor);

  // 7. Güven skoru
  const birinci = siraliTipler[0].skor;
  const ikinci  = siraliTipler[1].skor;
  const fark    = birinci > 0
    ? Math.round(((birinci - ikinci) / birinci) * 100)
    : 0;
  const guvenSkoru = Math.min(100, 50 + fark);

  return {
    tip:          enYuksekTip,
    kanat:        baskınKanat,
    kanatYazisi:  `${enYuksekTip}w${baskınKanat}`,
    skorlar:      normalize,
    kanatAyarliSkorlar: kanatAyarli,
    entegrasyon:  ENTEGRASYON[enYuksekTip],
    alternatifler: siraliTipler.slice(1, 3).map((t) => t.tip),
    guvenSkoru,
  };
}

export function hibritGuvenSkoru(mbtiTip, enneagramTip) {
  const korelasyon = MBTI_ENNEAGRAM_KORELASYON[mbtiTip];
  if (!korelasyon) return 50;
  if (korelasyon.yuksek.includes(enneagramTip)) return 90;
  if (korelasyon.orta.includes(enneagramTip))   return 70;
  return 45;
}
