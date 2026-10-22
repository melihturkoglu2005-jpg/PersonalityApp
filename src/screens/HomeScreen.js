import React, { useCallback, useEffect, useRef } from 'react';
import { View, Text, Image, Platform, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';
import JourneyMap from '../components/JourneyMap';
import BrandLogo from '../components/BrandLogo';

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4';
const LANDSCAPE = require('../../assets/journey/frame-1.jpg');

// Sitenin kendi renkleri (ThemeContext): MBTI → ultramarin, Enneagram → kökboya kırmızısı.
const MBTI_INK = '#2F3FBF';
const ENN_INK = '#B4452F';

// ─── Scroll zaman çizelgesi (0 → 1, sahnenin tamamı) ────────────────────────
//  0.00–0.13  Hero: metin çıkar, pencere açılıp ekranı kaplar
//  0.14–0.30  "Biraz dur"          (manzara)
//  0.30–0.50  MBTI paneli          (alttan yükselir)
//  0.50–0.70  Enneagram paneli     (MBTI'nin üstüne yükselir)
//  0.72–0.86  "Bir sonuçtan daha fazlası" (manzara)
//  0.86–1.00  Kapanış, ardından rota sayfası alttan gelip sahneyi örter
const CHAPTERS = [
  { start: .14, end: .30, title: <>Biraz dur.<br /><em>Başka bir yerden bak.</em></>, text: 'Aynı manzarada hepimiz başka bir ayrıntıyı fark ederiz.', position: 'left' },
  { start: .30, end: .50, title: <>Düşüncelerinin<br /><em>izini sür.</em></>, text: 'Önce bütünü mü görürsün, ayrıntıları mı? Karar verirken nelere kulak verirsin?', position: 'right', button: 'MBTI ile keşfet', route: 'MBTI', accent: MBTI_INK, concept: true },
  { start: .50, end: .70, title: <>Seni harekete<br /><em>geçiren ne?</em></>, text: 'Seçimlerinin ardındaki istekleri, kaygıları ve tekrar eden alışkanlıkları merak et.', position: 'left', button: 'Enneagram ile keşfet', route: 'Enneagram', accent: ENN_INK, concept: true },
  { start: .72, end: .86, title: <>Bir sonuçtan<br /><em>daha fazlasısın.</em></>, text: 'Bir kişilik tipi hikâyenin tamamı olamaz. Kendine dair fark ettiklerin zamanla değişebilir.', position: 'center' },
];
const ENDING_START = .86;
const STEPS = [
  { label: 'Başlangıç', at: .02, until: .135 },
  { label: 'Başka bir yerden bak', at: .22, until: .30 },
  { label: 'MBTI', at: .40, until: .50 },
  { label: 'Enneagram', at: .60, until: .70 },
  { label: 'Bir sonuçtan daha fazlası', at: .80, until: 2 },
];

// MBTI: her ikilik bir ikili seçim değil, bir yelpaze. Noktalar örnek konumlardır.
const PAIRS = [
  ['E', 'Dışadönüklük', 'I', 'İçedönüklük', '24%'],
  ['S', 'Duyum', 'N', 'Sezgi', '-28%'],
  ['T', 'Düşünme', 'F', 'Hissetme', '8%'],
  ['J', 'Yargılama', 'P', 'Algılama', '-17%'],
];

// Enneagram: 9 üstte, saat yönünde. Hexagram 1-4-2-8-5-7, üçgen 9-3-6.
const ENN_WORDS = ['Doğruluk', 'Sevilmek', 'Başarmak', 'Özgünlük', 'Anlamak', 'Güven', 'Özgürlük', 'Özerklik', 'Huzur'];
const ennPoint = (n, r) => {
  const a = ((n * 40 - 90) * Math.PI) / 180;
  return [300 + Math.cos(a) * r, 300 + Math.sin(a) * r];
};
const ennPath = (order) => order.map((n, i) => { const [x, y] = ennPoint(n, 190); return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`; }).join(' ') + ' Z';
const HEXAGRAM_PATH = ennPath([1, 4, 2, 8, 5, 7]);
const TRIANGLE_PATH = ennPath([9, 3, 6]);

const clamp = (value) => Math.max(0, Math.min(1, value));
const smooth = (value) => { const x = clamp(value); return x * x * (3 - 2 * x); };

function WebHome({ navigation }) {
  const scrollRef = useRef(null);
  const flowRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const navRef = useRef(null);
  const routeRef = useRef(null);
  const introRef = useRef(null);
  const endingRef = useRef(null);
  const stepsRef = useRef(null);
  const videoRef = useRef(null);
  const mbtiRef = useRef(null);
  const ennRef = useRef(null);
  const ennLinesRef = useRef([]);
  const chapterRefs = useRef([]);
  const rafRef = useRef(null);
  const tweenRef = useRef(null);
  const scrollYRef = useRef(0);
  const lastYRef = useRef(0);

  const getNode = () => scrollRef.current?.getScrollableNode?.() || null;

  const updateStory = useCallback(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const vh = window.innerHeight;
    const y = scrollYRef.current;
    const flowTop = flowRef.current ? flowRef.current.offsetTop : 0;
    const distance = Math.max(1, track.offsetHeight - vh);
    const p = clamp((y - flowTop) / distance);
    const routeCovering = y - flowTop > distance + vh * .7;

    const setLayer = (element, opacity, shift = 0) => {
      if (!element) return;
      element.style.opacity = String(opacity);
      element.style.pointerEvents = opacity > .12 ? 'auto' : 'none';
      element.inert = opacity <= .12;
      element.setAttribute('aria-hidden', String(opacity <= .12));
      element.style.setProperty('--chapter-shift', `${reduced ? 0 : shift}px`);
    };

    // Hero: metin çıkar → pencere açılır
    const introOpacity = reduced ? Number(p < .08) : 1 - smooth(p / .05);
    setLayer(introRef.current, introOpacity);
    introRef.current?.style.setProperty('--intro-x', `${reduced ? 0 : (1 - introOpacity) * -36}px`);
    const expand = reduced ? Number(p >= .06) : smooth((p - .02) / .11);
    stage.style.setProperty('--t', expand.toFixed(4));
    stage.style.setProperty('--zoom', (reduced ? 0 : smooth((p - .1) / .3)).toFixed(4));
    stage.style.setProperty('--shade', (smooth((p - .04) / .12) * .3).toFixed(4));

    // Metin bölümleri
    CHAPTERS.forEach((chapter, index) => {
      const enter = smooth((p - chapter.start) / .04);
      const exit = 1 - smooth((p - (chapter.end - .04)) / .04);
      const opacity = reduced ? Number(p >= chapter.start && p < chapter.end) : enter * exit;
      setLayer(chapterRefs.current[index], opacity, (1 - enter) * 34 - (1 - exit) * 26);
    });
    setLayer(endingRef.current, reduced ? Number(p >= ENDING_START) : smooth((p - ENDING_START) / .04), (1 - smooth((p - ENDING_START) / .04)) * 30);

    // Konsept panelleri: alttan yükselir, MBTI'yi Enneagram örter, Enneagram yukarı çekilip gider
    const mbti = mbtiRef.current;
    const enn = ennRef.current;
    const e1 = reduced ? Number(p >= .3) : smooth((p - .29) / .04);
    const e2 = reduced ? Number(p >= .5) : smooth((p - .49) / .04);
    const x2 = reduced ? Number(p >= .7) : smooth((p - .69) / .04);
    if (mbti) {
      mbti.style.clipPath = `inset(${((1 - e1) * 100).toFixed(2)}% 0 0 0)`;
      mbti.style.visibility = e1 > 0 && e2 < 1 ? 'visible' : 'hidden';
      mbti.style.setProperty('--k', (reduced ? 1 : smooth((p - .33) / .1)).toFixed(4));
    }
    if (enn) {
      enn.style.clipPath = `inset(${((1 - e2) * 100).toFixed(2)}% 0 ${(x2 * 100).toFixed(2)}% 0)`;
      enn.style.visibility = e2 > 0 && x2 < 1 ? 'visible' : 'hidden';
      const draw = reduced ? 1 : smooth((p - .52) / .12);
      ennLinesRef.current.forEach((line) => { if (line) line.style.strokeDashoffset = String(1 - draw); });
    }

    // Sahne tonu + adım göstergesi
    stage.dataset.tone = p > .305 && p < .715 ? 'dark' : 'light';
    const steps = stepsRef.current;
    if (steps) {
      const visible = p > .125 && !routeCovering && y - flowTop < distance + vh * .35;
      steps.style.opacity = visible ? '1' : '0';
      steps.style.pointerEvents = visible ? 'auto' : 'none';
      const current = STEPS.findIndex((step) => p < step.until);
      Array.from(steps.children).forEach((child, i) => {
        if (i === current) child.setAttribute('aria-current', 'step'); else child.removeAttribute('aria-current');
      });
    }

    // Video: panel ya da rota sayfası örtüyorsa dur
    const video = videoRef.current;
    const covered = (p > .335 && p < .72) || routeCovering;
    if (video && (reduced || covered)) video.pause();
    else if (video?.paused && !document.hidden) video.play().catch(() => {});

    // Rota sayfası: yol çizgisi scroll ile ilerler
    const route = routeRef.current;
    if (route && y - flowTop > distance - vh) {
      const list = route.querySelector('[data-route-list]');
      if (list) {
        const rect = list.getBoundingClientRect();
        const line = vh * .72;
        list.style.setProperty('--route-p', clamp((line - rect.top - 30) / Math.max(1, rect.height - 60)).toFixed(4));
        list.querySelectorAll('[data-route-item]').forEach((item) => {
          item.dataset.active = String(item.getBoundingClientRect().top + 40 < line);
        });
      }
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const node = getNode();
    if (node) scrollYRef.current = node.scrollTop;
    const refresh = () => updateStory();
    const visibility = () => { if (document.hidden) videoRef.current?.pause(); else refresh(); };
    const cancelTween = () => { if (tweenRef.current) cancelAnimationFrame(tweenRef.current); tweenRef.current = null; };
    window.addEventListener('resize', refresh);
    media.addEventListener('change', refresh);
    document.addEventListener('visibilitychange', visibility);
    node?.addEventListener('wheel', cancelTween, { passive: true });
    node?.addEventListener('touchstart', cancelTween, { passive: true });
    const startVideo = () => {
      const video = videoRef.current;
      if (!video || media.matches || document.hidden) return;
      video.muted = true;
      video.play().catch(() => {});
    };
    startVideo();
    const retryEvents = ['pointerdown', 'touchstart', 'keydown', 'wheel'];
    const retry = () => { startVideo(); retryEvents.forEach((name) => window.removeEventListener(name, retry)); };
    retryEvents.forEach((name) => window.addEventListener(name, retry, { passive: true }));
    updateStory();
    return () => {
      retryEvents.forEach((name) => window.removeEventListener(name, retry));
      window.removeEventListener('resize', refresh);
      media.removeEventListener('change', refresh);
      document.removeEventListener('visibilitychange', visibility);
      node?.removeEventListener('wheel', cancelTween);
      node?.removeEventListener('touchstart', cancelTween);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      cancelTween();
    };
  }, [updateStory]);

  const onScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    const dy = y - lastYRef.current;
    lastYRef.current = y;
    scrollYRef.current = y;
    // Üst çubuk: sayfa başında şeffaf; kaydırınca buzlu cam; aşağı inerken saklanır, yukarı çıkarken döner
    const nav = navRef.current;
    if (nav) {
      nav.dataset.solid = String(y > 24);
      if (y > 160 && dy > 3) nav.dataset.hidden = 'true';
      else if (dy < -3 || y <= 160) nav.dataset.hidden = 'false';
    }
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => { updateStory(); rafRef.current = null; });
  };

  const tweenTo = (target, base = 700) => {
    const node = getNode();
    if (!node) return;
    if (tweenRef.current) cancelAnimationFrame(tweenRef.current);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const from = node.scrollTop;
    const delta = target - from;
    if (reduced || Math.abs(delta) < 4) { node.scrollTop = target; return; }
    const duration = Math.min(1700, base + Math.abs(delta) * .1);
    const started = performance.now();
    const ease = (x) => (x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
    const step = (now) => {
      const k = clamp((now - started) / duration);
      node.scrollTop = from + delta * ease(k);
      tweenRef.current = k < 1 ? requestAnimationFrame(step) : null;
    };
    tweenRef.current = requestAnimationFrame(step);
  };
  const storyDistance = () => Math.max(1, (trackRef.current?.offsetHeight || 0) - window.innerHeight);
  const goToStep = (index) => tweenTo((flowRef.current?.offsetTop || 0) + storyDistance() * STEPS[index].at);
  const goToJourney = () => tweenTo((flowRef.current?.offsetTop || 0) + (trackRef.current?.offsetHeight || 0) - 40, 900);

  return (
    <ScrollView ref={scrollRef} style={{ flex: 1, backgroundColor: '#FFFFFF' }} contentContainerStyle={{ flexGrow: 1 }} onScroll={onScroll} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
      <div className="home-nav" ref={navRef} data-solid="false" data-hidden="false">
        <TopNav navigation={navigation} active="Home" seffaf />
      </div>
      <main>
        <div className="home-flow" ref={flowRef}>
          <section className="home-story__stage" ref={stageRef} data-tone="light" aria-label="Indoles ile keşfe başla">
            <div className="home-story__visual" aria-hidden="true">
              <div className="home-story__media">
                <div className="home-story__fallback"><Image source={LANDSCAPE} style={{ width: '100%', height: '100%' }} resizeMode="cover" /></div>
                <video ref={videoRef} src={VIDEO_URL} muted playsInline autoPlay loop preload="metadata" onCanPlay={(e) => e.currentTarget.classList.add('is-ready')} onPlaying={(e) => e.currentTarget.classList.add('is-ready')} />
              </div>
              <div className="home-story__sky" />
              <div className="home-story__wash" />
            </div>

            <div className="home-concept home-concept--mbti" ref={mbtiRef} aria-hidden="true" style={{ visibility: 'hidden', clipPath: 'inset(100% 0 0 0)' }}>
              <div className="preference-atlas">
                {PAIRS.map(([a, aText, b, bText, offset]) => (
                  <div className="preference-atlas__row" key={a} style={{ '--off': offset }}>
                    <div className="preference-atlas__end"><span>{a}</span><small>{aText}</small></div>
                    <div className="preference-atlas__track"><i /></div>
                    <div className="preference-atlas__end preference-atlas__end--right"><span>{b}</span><small>{bText}</small></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="home-concept home-concept--enneagram" ref={ennRef} aria-hidden="true" style={{ visibility: 'hidden', clipPath: 'inset(100% 0 0 0)' }}>
              <div className="motivation-atlas">
                <svg viewBox="0 0 600 600" role="presentation">
                  <circle cx="300" cy="300" r="190" fill="none" stroke="currentColor" strokeWidth="1.25" opacity=".3" />
                  <path ref={(el) => { ennLinesRef.current[0] = el; }} d={HEXAGRAM_PATH} pathLength="1" className="motivation-atlas__line" />
                  <path ref={(el) => { ennLinesRef.current[1] = el; }} d={TRIANGLE_PATH} pathLength="1" className="motivation-atlas__line" />
                  {ENN_WORDS.map((word, i) => {
                    const [dx, dy] = ennPoint(i + 1, 190);
                    const [x, y] = ennPoint(i + 1, 242);
                    return (
                      <g key={word}>
                        <circle cx={dx} cy={dy} r="6" fill="currentColor" />
                        <text x={x} y={y + 4} textAnchor="middle" className="motivation-atlas__number">{i + 1}</text>
                        <text x={x} y={y + 30} textAnchor="middle" className="motivation-atlas__word">{word}</text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            <div className="home-story__intro" ref={introRef}>
              <div className="home-story__intro-inner">
                <h1><span>Kendini tanımanın</span> <em>tek bir yolu yok.</em></h1>
                <p className="home-story__lead">Düşünme biçimine ve seni harekete geçiren şeylere iki farklı yerden bak. Kendinle ilgili yeni sorulara yer aç.</p>
                <div className="home-story__actions">
                  <button className="home-story__button home-story__button--dark" onClick={() => navigation.navigate('Testler')}>Testleri keşfet</button>
                  <button className="home-story__text-link" onClick={goToJourney}>Rotayı gör</button>
                </div>
              </div>
              <div className="home-story__cue" aria-hidden="true">
                <span>Kaydırarak keşfet</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5v10M2.5 7.5 7 12l4.5-4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>

            {CHAPTERS.map((chapter, index) => (
              <div
                key={index}
                className={`home-story__chapter home-story__chapter--${chapter.position}${chapter.concept ? ' home-story__chapter--concept' : ''}`}
                ref={(element) => { chapterRefs.current[index] = element; }}
                aria-hidden="true"
                style={{ opacity: 0, pointerEvents: 'none', ...(chapter.accent ? { '--accent': chapter.accent } : null) }}
              >
                <h2>{chapter.title}</h2>
                <p>{chapter.text}</p>
                {chapter.button && <button className="home-story__chapter-button" onClick={() => navigation.navigate(chapter.route)}>{chapter.button}</button>}
              </div>
            ))}

            <div className="home-story__chapter home-story__chapter--ending" ref={endingRef} aria-hidden="true" style={{ opacity: 0, pointerEvents: 'none' }}>
              <h2>Merak ettiğin yerden <em>başla.</em></h2>
              <div className="home-story__end-actions">
                <button onClick={() => navigation.navigate('MBTI')}>MBTI testini çöz</button>
                <button onClick={() => navigation.navigate('Enneagram')}>Enneagram testini çöz</button>
              </div>
              <p className="home-story__disclaimer">Bu testler psikolojik tanı değildir; kendini keşfetmen için hazırlanmıştır.</p>
            </div>

            <div className="home-story__steps" ref={stepsRef} role="group" aria-label="Hikâye bölümleri" style={{ opacity: 0, pointerEvents: 'none' }}>
              {STEPS.map((step, index) => (
                <button key={step.label} type="button" aria-label={step.label} title={step.label} onClick={() => goToStep(index)} />
              ))}
            </div>
          </section>

          <div className="home-flow__track" ref={trackRef} aria-hidden="true" />
          <JourneyMap navigation={navigation} routeRef={routeRef} />
        </div>
      </main>
      <Footer navigation={navigation} />
    </ScrollView>
  );
}

export default function HomeScreen({ navigation }) {
  if (Platform.OS === 'web') return <WebHome navigation={navigation} />;
  return (
    <View style={s.nativeFallback}>
      <View style={s.nativeTitle}><BrandLogo size={38} /></View>
      <Text style={s.nativeSubtitle}>MBTI ve Enneagram testleriyle kişiliğini keşfet.</Text>
      <TouchableOpacity style={s.nativeButton} onPress={() => navigation.navigate('Testler')}>
        <Text style={s.nativeButtonText}>Testleri gör</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  nativeFallback: { flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  nativeTitle: { marginBottom: 12 },
  nativeSubtitle: { color: '#6F6F6F', fontSize: 15, textAlign: 'center', marginBottom: 28 },
  nativeButton: { borderRadius: 999, paddingHorizontal: 24, paddingVertical: 12, backgroundColor: '#000000' },
  nativeButtonText: { color: '#FFFFFF', fontSize: 14 },
});
