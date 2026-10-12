// Karakter fotoğraflarını Wikipedia'dan bir kez indirir ve public/characters/ altına koyar.
// Böylece site, her ziyaretçide Wikimedia'ya gitmek yerine kendi sunucusundan küçük dosyalar yükler.
//
// Kullanım (internet gerekir, Node 18+):   npm run images
// Çıktı:  public/characters/*.jpg  +  src/data/characterImages.json  (id → dosya yolu)
// Bulunamayan isimleri sonda listeler; onlar için aşağıdaki OVERRIDES'a Wikipedia sayfa başlığını yaz.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const KOK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const VERI = path.join(KOK, 'src/data/personalityData.js');
const CIKTI = path.join(KOK, 'public/characters');
const MANIFEST = path.join(KOK, 'src/data/characterImages.json');
const UA = 'IndolesApp/1.0 (destek@indoles.com)';
const GENISLIK = 330; // Wikimedia'nın izin verdiği standart küçük boyutlardan biri

// İsim → Wikipedia (İngilizce) sayfa başlığı. Otomatik bulunamayanlar için elle düzeltme.
const OVERRIDES = {
  // 'Tina Fey': 'Tina_Fey',
};

const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const bekle = (ms) => new Promise((r) => setTimeout(r, ms));

async function getir(url, { json = false, deneme = 4 } = {}) {
  for (let i = 0; i < deneme; i++) {
    const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: json ? 'application/json' : '*/*' } });
    if (res.status === 429 || res.status >= 500) { await bekle(1500 * (i + 1)); continue; }
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return json ? res.json() : Buffer.from(await res.arrayBuffer());
  }
  throw new Error(`Zaman aşımı/limit: ${url}`);
}

const kaynak = await fs.readFile(VERI, 'utf8');
const kisiler = [...kaynak.matchAll(/id:\s*'([^']+)',\s*name:\s*'((?:[^'\\]|\\.)*)'/g)].map((m) => ({ id: m[1], ad: m[2].replace(/\\'/g, "'") }));
const benzersiz = [...new Set(kisiler.map((k) => k.ad))];

await fs.mkdir(CIKTI, { recursive: true });
const dosyaOf = {};
const basarisiz = [];

for (const ad of benzersiz) {
  const temel = slug(ad);
  let mevcut = null;
  for (const uzanti of ['jpg', 'png', 'webp']) {
    try {
      await fs.access(path.join(CIKTI, `${temel}.${uzanti}`));
      mevcut = `${temel}.${uzanti}`;
      break;
    } catch { /* diğer uzantıya bak */ }
  }
  if (mevcut) {
    dosyaOf[ad] = `/characters/${mevcut}`;
    console.log(`= ${ad} (zaten var)`);
    continue;
  }

  try {
    const baslik = (OVERRIDES[ad] || ad).replace(/ /g, '_');
    const ozet = await getir(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(baslik)}?redirect=true`, { json: true });
    const kucuk = ozet.thumbnail?.source;
    if (!kucuk) throw new Error('sayfada görsel yok');
    const istenen = kucuk.replace(/\/\d+px-/, `/${GENISLIK}px-`);
    let veri;
    try { veri = await getir(istenen); } catch { veri = await getir(kucuk); }
    const uzanti = veri[0] === 0xff && veri[1] === 0xd8 ? 'jpg'
      : veri.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) ? 'png'
      : veri.toString('ascii', 0, 4) === 'RIFF' && veri.toString('ascii', 8, 12) === 'WEBP' ? 'webp'
      : null;
    if (!uzanti) throw new Error('desteklenmeyen görsel biçimi');
    const dosya = `${temel}.${uzanti}`;
    const hedef = path.join(CIKTI, dosya);
    await fs.writeFile(hedef, veri);
    dosyaOf[ad] = `/characters/${dosya}`;
    console.log(`✓ ${ad}`);
  } catch (e) {
    basarisiz.push(`${ad} → ${e.message}`);
    console.log(`✗ ${ad}: ${e.message}`);
  }
  await bekle(700); // Wikimedia'yı yormamak için
}

const manifest = {};
for (const k of kisiler) if (dosyaOf[k.ad]) manifest[k.id] = dosyaOf[k.ad];
await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');

console.log(`\nBitti: ${Object.keys(dosyaOf).length}/${benzersiz.length} isim indirildi.`);
if (basarisiz.length) {
  console.log('\nBulunamayanlar (OVERRIDES içine doğru Wikipedia başlığını ekleyip tekrar çalıştır):');
  basarisiz.forEach((b) => console.log('  - ' + b));
}
