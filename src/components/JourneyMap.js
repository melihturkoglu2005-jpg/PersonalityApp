import React from 'react';
import { personalityData } from '../data/personalityData';

// Ana sayfadaki "keşif rotası": sitenin dört bölümünü bir yolculuğun durakları olarak anlatır.
// Böylece açılıştaki manzara ("keşfe çıkıyorsun") sitenin gerçek içeriğine bağlanır.
// Yalnızca web'de çizilir (HomeScreen web dalı içinde kullanılır).
function duraklar(toplamIsim) {
  return [
    { no: '01', etiket: 'Testler', baslik: 'Yola çık', metin: '50 soruluk MBTI ve 45 soruluk Enneagram. Üyelik yok, birkaç dakikanı alır.', hedef: 'Testler', cta: 'Testlere git' },
    { no: '02', etiket: 'Kişilik Tipleri', baslik: 'Haritayı oku', metin: "MBTI'nin 16 ve Enneagram'ın 9 tipini gör; kendi konumunu bul.", hedef: 'KisilikTipleri', cta: 'Tipleri keşfet' },
    { no: '03', etiket: 'Karakter Rehberi', baslik: 'Yol arkadaşlarını tanı', metin: `Aynı tipi paylaştığı söylenen ${toplamIsim} tanınmış isim.`, hedef: 'CharacterGuide', cta: 'Rehbere bak' },
    { no: '04', etiket: 'Kaynaklar', baslik: 'Pusulanı ayarla', metin: "Jung'dan Beş Büyük modele, testlerin dayandığı kitaplar ve araştırmalar.", hedef: 'Kaynaklar', cta: 'Kaynakları aç' },
  ];
}

const TOPLAM_ISIM = Object.values(personalityData).reduce((n, t) => n + t.characters.length, 0);

export default function JourneyMap({ navigation }) {
  return (
    <section className="journey" aria-labelledby="journey-title">
      <div className="journey__inner">
        <div className="journey__head">
          <p className="journey__kicker">Keşif rotası</p>
          <h2 id="journey-title" className="journey__title">
            Dört durakta <em>kendine</em> doğru.
          </h2>
        </div>

        <div className="journey__track">
          {/* Masaüstünde durakları birbirine bağlayan kesikli patika */}
          <svg className="journey__path" viewBox="0 0 1000 80" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M125 28 C250 28 250 52 375 52 C500 52 500 28 625 28 C750 28 750 52 875 52"
              fill="none"
              stroke="#CFCBC3"
              strokeWidth="1.5"
              strokeDasharray="6 7"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <ol className="journey__list">
            {duraklar(TOPLAM_ISIM).map((d) => (
              <li key={d.no} className="journey__stop">
                <button type="button" className="journey__card" onClick={() => navigation.navigate(d.hedef)}>
                  <span className="journey__node">{d.no}</span>
                  <span className="journey__tag">{d.etiket}</span>
                  <span className="journey__h">{d.baslik}</span>
                  <span className="journey__p">{d.metin}</span>
                  <span className="journey__cta">{d.cta} →</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
