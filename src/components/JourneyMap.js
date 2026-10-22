import React from 'react';

const stops = [
  { label: 'Testler', title: 'Kendine bir soru sor.', body: 'MBTI ve Enneagram testleriyle düşünme biçimine ve motivasyonlarına bak.', target: 'Testler' },
  { label: 'Kişilik tipleri', title: 'Birden fazla yanını gör.', body: '16 MBTI ve 9 Enneagram tipinin farklı özelliklerini karşılaştır.', target: 'KisilikTipleri' },
  { label: 'Karakter rehberi', title: 'Başkalarının hikâyesine bak.', body: 'Tanınmış isimlerin yorumlara dayalı tip eşleştirmelerini keşfet.', target: 'CharacterGuide' },
  { label: 'Kaynaklar', title: 'Dayandığımız fikirleri oku.', body: 'Kişilik literatürünü, araştırmaları ve testlerin sınırlarını incele.', target: 'Kaynaklar' },
];

// Hikâyenin ardından alttan gelip manzarayı örten "rota" sayfası.
// Soldaki yol çizgisi scroll ile ilerler; duraklar sitenin gerçek sayfalarıdır.
// HomeScreen, çizgiyi ve durakları routeRef üzerinden günceller.
export default function JourneyMap({ navigation, routeRef }) {
  return (
    <section className="route" ref={routeRef} aria-labelledby="route-title">
      <div className="route__inner">
        <div className="route__opening">
          <h2 id="route-title"><span>Keşif, tek bir</span> <em>sonuçta bitmez.</em></h2>
          <p>İstersen bir testle başla, istersen önce fikirleri tanı. Burada yolunu kendin seçersin.</p>
        </div>
        <div className="route__list" data-route-list>
          {stops.map((stop) => (
            <button type="button" className="route__item" data-route-item data-active="false" key={stop.target} onClick={() => navigation.navigate(stop.target)}>
              <span className="route__label">{stop.label}</span>
              <span className="route__title">{stop.title}</span>
              <span className="route__body">{stop.body}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
