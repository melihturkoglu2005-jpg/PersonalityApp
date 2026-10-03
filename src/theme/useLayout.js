import { useWindowDimensions } from 'react-native';

// Ortak grid: tüm sayfalar (ana sayfa dahil) aynı 1280 px'lik kolonu kullanır.
//   GRID    → içerik kolonu genişliği (ana sayfadaki 80rem)
//   COL     → iki kolonlu satırlarda sol kolon genişliği
//   COL_GAP → kolonlar arası boşluk
export const GRID = 1280;
export const COL = 360;
export const COL_GAP = 48;

// Ekran genişliğine göre düzen bilgisi (yeniden boyutlandırmada güncellenir)
export function useLayout() {
  const { width } = useWindowDimensions();
  return {
    width,
    isNarrow:  width < 640,
    isDesktop: width >= 900,
    gutter:    width < 640 ? 20 : 32,
  };
}
