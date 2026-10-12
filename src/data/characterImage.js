import { Image, Platform } from 'react-native';
import manifest from './characterImages.json';

// Görsel kaynakları, sırayla denenecek şekilde döner:
//   1) public/characters/ altına indirilmiş yerel kopya (npm run images ile üretilir) — en hızlısı
//   2) Wikimedia'nın küçük (thumbnail) sürümü — orijinal dosya yerine ~240 px'lik görsel
// Eski kod doğrudan orijinal (çoğu zaman birkaç MB'lık) dosyayı çekiyordu; yavaşlığın ana sebebi buydu.
export function kucukResim(url, genislik = 240) {
  if (!url) return null;
  if (!/wikimedia\.org/.test(url)) return url;
  if (/[?&]width=/.test(url)) return url;
  return `${url}${url.includes('?') ? '&' : '?'}width=${genislik}`;
}

export function getCharImageUris(char) {
  const liste = [];
  if (Platform.OS === 'web' && manifest[char.id]) liste.push(manifest[char.id]);
  const uzak = kucukResim(char.imageUrl);
  if (uzak) liste.push(uzak);
  return liste;
}

// Görünür olmadan önce tarayıcı önbelleğine aldırır (grup/sekme değişince anında açılır).
export function prefetchChars(chars) {
  (chars || []).forEach((c) => {
    const uri = getCharImageUris(c)[0];
    if (!uri) return;
    try {
      const p = Image.prefetch(uri);
      if (p && p.catch) p.catch(() => {});
    } catch (e) {
      // önemli değil: yalnızca ön yükleme
    }
  });
}
