/**
 * SEOMeta — Her sayfa için dinamik meta tag yönetimi.
 * react-helmet alternatifi olarak doğrudan document.head manipülasyonu kullanır
 * (expo-web ortamında helmet kurmadan çalışır).
 */
import { useEffect } from 'react';
import { Platform } from 'react-native';

const BASE_TITLE = 'Indoles';
const BASE_URL   = 'https://indoles.com';

const DEFAULTS = {
  title:       'Indoles — Ücretsiz MBTI ve Enneagram Kişilik Testi',
  description: 'Bilişsel fonksiyonlara dayanan Harold Grant modeli ile MBTI tipinizi ve Enneagram yapınızı keşfedin. Akademik kaynaklar, ücretsiz, kayıt gerektirmez.',
  canonical:   BASE_URL,
  og: {
    type:  'website',
    image: `${BASE_URL}/og-default.jpg`,
  },
};

function setMeta(name, content, attr = 'name') {
  if (Platform.OS !== 'web') return;
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel, href) {
  if (Platform.OS !== 'web') return;
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function SEOMeta({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogType,
  noIndex = false,
}) {
  const fullTitle = title ? `${title} — ${BASE_TITLE}` : DEFAULTS.title;
  const desc      = description  || DEFAULTS.description;
  const canon     = canonical    || DEFAULTS.canonical;

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    // Title
    document.title = fullTitle;

    // Basic meta
    setMeta('description',        desc);
    setMeta('robots',             noIndex ? 'noindex,nofollow' : 'index,follow');

    // Open Graph
    setMeta('og:title',           ogTitle       || fullTitle, 'property');
    setMeta('og:description',     ogDescription || desc,      'property');
    setMeta('og:type',            ogType        || DEFAULTS.og.type, 'property');
    setMeta('og:url',             canon,                        'property');
    setMeta('og:image',           DEFAULTS.og.image,            'property');
    setMeta('og:site_name',       BASE_TITLE,                   'property');

    // Twitter Card
    setMeta('twitter:card',        'summary_large_image');
    setMeta('twitter:title',       ogTitle       || fullTitle);
    setMeta('twitter:description', ogDescription || desc);

    // Canonical
    setLink('canonical', canon);
  }, [fullTitle, desc, canon, noIndex, ogTitle, ogDescription, ogType]);

  return null;
}
