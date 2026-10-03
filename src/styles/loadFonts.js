// Web'de Instrument Serif + Inter'i garanti yükler.
// CSS @import bazı geliştirme/derleme akışlarında düşebildiği için <link> ile de eklenir.
const HREF =
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap';

if (typeof document !== 'undefined' && !document.getElementById('indoles-fonts')) {
  const pre1 = document.createElement('link');
  pre1.rel = 'preconnect';
  pre1.href = 'https://fonts.googleapis.com';
  const pre2 = document.createElement('link');
  pre2.rel = 'preconnect';
  pre2.href = 'https://fonts.gstatic.com';
  pre2.crossOrigin = 'anonymous';
  const css = document.createElement('link');
  css.id = 'indoles-fonts';
  css.rel = 'stylesheet';
  css.href = HREF;
  document.head.appendChild(pre1);
  document.head.appendChild(pre2);
  document.head.appendChild(css);
}
