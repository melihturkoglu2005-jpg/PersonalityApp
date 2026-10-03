// Sitenin tek menü kaynağı: üst çubuk, mobil kaydırmalı menü ve ana sayfa bunu kullanır.
// Menüde yalnızca gerçekten var olan sayfalar bulunur; test sayfaları "Testler" altında toplanır.
export const NAV_LINKS = [
  { id: 'Home',           label: 'Ana Sayfa',        screen: 'Home' },
  { id: 'Testler',        label: 'Testler',          screen: 'Testler' },
  { id: 'KisilikTipleri', label: 'Kişilik Tipleri',  screen: 'KisilikTipleri' },
  { id: 'CharacterGuide', label: 'Karakter Rehberi', screen: 'CharacterGuide' },
  { id: 'Kaynaklar',      label: 'Kaynaklar',        screen: 'Kaynaklar' },
];

// Test ekranları ve sonuç sayfası "Testler" menü öğesinin altında sayılır.
export function navAktifMi(itemId, active) {
  if (itemId === 'Testler') return ['Testler', 'MBTI', 'Enneagram', 'Result'].includes(active);
  return itemId === active;
}
