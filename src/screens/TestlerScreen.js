import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { FONT, SERIF } from '../theme/constants';
import { useLayout } from '../theme/useLayout';
import { Screen, Wrap, TextButton } from '../components/ui';

// ─── İçerik ────────────────────────────────────────────────────────────────
// Süreler yaklaşık değerdir (soru başına ~10 sn); gerçek ölçümle güncellenebilir.
const TESTS = [
  {
    id: 'MBTI',
    name: 'MBTI',
    intro: 'Dünyayı nasıl algıladığını ve kararlarını nasıl verdiğini keşfet.',
    detail: 'Bilişsel tercihlerine bakar. Sonuçta yakın olduğun tipin, güçlü yönlerin ve üzerine düşünebileceğin alanlar yer alır.',
    stats: [['50', 'soru'], ['≈ 8', 'dakika'], ['16', 'kişilik tipi']],
    button: 'MBTI testine başla',
    ink: '#2F3FBF',
    bg: '#E3E7FB',
    muted: '#5B63B3',
  },
  {
    id: 'Enneagram',
    name: 'Enneagram',
    intro: 'Seni neyin harekete geçirdiğine ve zorlandığında neye yöneldiğine bak.',
    detail: 'Temel motivasyonlarını ele alır. Sonuçta yakın olduğun tipi, kanadını ve stres ile güvenlik yönlerini görürsün.',
    stats: [['45', 'soru'], ['≈ 7', 'dakika'], ['9', 'kişilik tipi']],
    button: 'Enneagram testine başla',
    ink: '#B4452F',
    bg: '#F6E2DB',
    muted: '#9A5A4B',
  },
];

const STEPS = [
  { title: 'Kısa bir uyarıyı onaylarsın', body: 'Sonuçların tanı olmadığını hatırlatan tek bir ekran. İstersen bir daha gösterilmesini kapatabilirsin.' },
  { title: 'İfadeleri puanlarsın', body: 'Her ifade için “Kesinlikle katılmıyorum”dan “Kesinlikle katılıyorum”a uzanan beş seçenek var. Doğru ya da yanlış cevap yok.', scale: true },
  { title: 'Sonucunu okursun', body: 'Yakın olduğun tipi ve yorumunu görürsün. İstersen diğer testi de çözüp sonuçları yan yana düşünebilirsin.' },
];

// Gerçek testteki 1-5 ölçeğiyle aynı renkler ve boyut düzeni (QuestionCard)
const SCALE = [['#CE777C', 38], ['#D99A68', 28], ['#969BA5', 20], ['#78AD8B', 28], ['#7E9FCB', 38]];

// MBTI: her ikilik bir yelpaze; nokta üzerine gelince yeni konuma kayar
const SPECTRA = [['E', 'I', '24%', '-20%'], ['S', 'N', '-28%', '18%'], ['T', 'F', '8%', '-26%'], ['J', 'P', '-17%', '24%']];

// Enneagram: 9 üstte, saat yönünde
const ennPoint = (n, r) => { const a = ((n * 40 - 90) * Math.PI) / 180; return [120 + Math.cos(a) * r, 120 + Math.sin(a) * r]; };
const ennPath = (order) => order.map((n, i) => { const [x, y] = ennPoint(n, 82); return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`; }).join(' ') + ' Z';
const HEX = ennPath([1, 4, 2, 8, 5, 7]);
const TRI = ennPath([9, 3, 6]);

function MbtiViz() {
  return (
    <div className="tst-viz tst-viz--mbti" aria-hidden="true">
      {SPECTRA.map(([a, b, from, to]) => (
        <div className="tst-viz__row" key={a} style={{ '--from': from, '--to': to }}>
          <span>{a}</span><div className="tst-viz__track"><i /></div><span>{b}</span>
        </div>
      ))}
    </div>
  );
}

function EnneagramViz() {
  return (
    <div className="tst-viz tst-viz--enn" aria-hidden="true">
      <svg viewBox="12 12 216 216" role="presentation">
        <circle cx="120" cy="120" r="82" fill="none" stroke="currentColor" strokeWidth="1" opacity=".3" />
        <path d={HEX} className="tst-viz__line" />
        <path d={TRI} className="tst-viz__line" />
        {Array.from({ length: 9 }, (_, i) => {
          const [x, y] = ennPoint(i + 1, 82);
          const [tx, ty] = ennPoint(i + 1, 104);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="4" fill="currentColor" className="tst-viz__dot" />
              <text x={tx} y={ty + 4.5} textAnchor="middle" className="tst-viz__num">{i + 1}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function WebTestler({ navigation }) {
  return (
    <Screen navigation={navigation} active="Testler">
      <div className="tst">
        <header className="tst__head">
          <h1><span>Nereden başlamak</span> <em>istersin?</em></h1>
          <p>İki ayrı test, iki ayrı mercek. Birini seçebilir veya ikisini de çözüp sonuçlarını birlikte değerlendirebilirsin.</p>
        </header>

        <div className="tst-cards">
          {TESTS.map((test) => (
            <article className="tst-card" key={test.id} style={{ '--ink': test.ink, '--bg': test.bg, '--muted': test.muted }} aria-labelledby={`tst-${test.id}`}>
              <div className="tst-card__top">
                <h2 id={`tst-${test.id}`}>{test.name}</h2>
                {test.id === 'MBTI' ? <MbtiViz /> : <EnneagramViz />}
              </div>
              <p className="tst-card__intro">{test.intro}</p>
              <p className="tst-card__detail">{test.detail}</p>
              <dl className="tst-card__stats">
                {test.stats.map(([value, label]) => (
                  <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                ))}
              </dl>
              <button type="button" className="tst-card__cta" onClick={() => navigation.navigate(test.id)}>
                <span>{test.button}</span>
              </button>
            </article>
          ))}
        </div>

        <section className="tst-steps" aria-labelledby="tst-steps-title">
          <h2 id="tst-steps-title">Test nasıl <em>ilerler?</em></h2>
          <ol className="tst-steps__list">
            {STEPS.map((step, index) => (
              <li key={step.title}>
                <span className="tst-steps__no" aria-hidden="true">{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                {step.scale && (
                  <div className="tst-scale" aria-hidden="true">
                    <div className="tst-scale__dots">{SCALE.map(([color, size], i) => <i key={i} style={{ background: color, width: size, height: size }} />)}</div>
                    <div className="tst-scale__ends"><span>Katılmıyorum</span><span>Katılıyorum</span></div>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>

        <section className="tst-note" aria-labelledby="tst-note-title">
          <div>
            <h2 id="tst-note-title">Hangisini seçmeli?</h2>
            <p>MBTI düşünme biçimine, Enneagram motivasyonlarına odaklanır. Sonuçların kesin bir tanı veya değişmez bir kimlik tanımı olmadığını aklında tut.</p>
          </div>
          <button type="button" className="tst-note__link" onClick={() => navigation.navigate('Kaynaklar', { initialKat: 'sss' })}>Kaynakları ve sınırları oku</button>
        </section>
      </div>
    </Screen>
  );
}

// ─── Mobil uygulama (web dışı) için sade yedek ────────────────────────────
function NativeTestler({ navigation }) {
  const { isNarrow } = useLayout();
  return (
    <Screen navigation={navigation} active="Testler">
      <Wrap>
        <View style={{ paddingTop: isNarrow ? 38 : 66, paddingBottom: 28 }}>
          <Text style={[s.title, { fontSize: isNarrow ? 48 : 72, lineHeight: isNarrow ? 50 : 72 }]}>Nereden başlamak istersin?</Text>
          <Text style={s.copy}>İki ayrı test, iki ayrı mercek. Birini seçebilir veya ikisini de çözüp sonuçlarını birlikte değerlendirebilirsin.</Text>
        </View>
        <View style={{ gap: 14 }}>
          {TESTS.map((test) => (
            <View key={test.id} style={[s.card, { backgroundColor: test.bg }]}>
              <Text style={[s.name, { color: '#000' }]}>{test.name}</Text>
              <Text style={s.intro}>{test.intro}</Text>
              <Text style={[s.detail, { color: test.muted }]}>{test.detail}</Text>
              <Text style={[s.detail, { color: test.muted }]}>{test.stats.map(([v, l]) => `${v} ${l}`).join('  ')}</Text>
              <Pressable accessibilityRole="button" accessibilityLabel={test.button} onPress={() => navigation.navigate(test.id)} style={[s.button, { backgroundColor: test.ink }]}>
                <Text style={s.buttonText}>{test.button}</Text>
              </Pressable>
            </View>
          ))}
        </View>
        <View style={{ paddingVertical: 38 }}>
          <Text style={s.noteTitle}>Hangisini seçmeli?</Text>
          <Text style={s.copy}>MBTI düşünme biçimine, Enneagram motivasyonlarına odaklanır. Sonuçların kesin bir tanı veya değişmez bir kimlik tanımı olmadığını aklında tut.</Text>
          <TextButton label="Kaynakları ve sınırları oku" color="#151515" onPress={() => navigation.navigate('Kaynaklar', { initialKat: 'sss' })} />
        </View>
      </Wrap>
    </Screen>
  );
}

export default function TestlerScreen({ navigation }) {
  return Platform.OS === 'web' ? <WebTestler navigation={navigation} /> : <NativeTestler navigation={navigation} />;
}

const s = StyleSheet.create({
  title: { fontFamily: SERIF, color: '#000', fontWeight: '400', letterSpacing: -1.4 },
  copy: { fontFamily: FONT, color: '#5F5F5F', fontSize: 16, lineHeight: 26, marginTop: 14, marginBottom: 8 },
  card: { borderRadius: 24, padding: 26, gap: 10 },
  name: { fontFamily: SERIF, fontSize: 56, letterSpacing: -1.2 },
  intro: { fontFamily: SERIF, fontSize: 24, lineHeight: 28, color: '#000' },
  detail: { fontFamily: FONT, fontSize: 15, lineHeight: 24 },
  button: { alignSelf: 'flex-start', borderRadius: 100, paddingHorizontal: 24, paddingVertical: 15, marginTop: 8 },
  buttonText: { fontFamily: FONT, fontSize: 15, fontWeight: '600', color: '#fff' },
  noteTitle: { fontFamily: SERIF, fontSize: 32, color: '#0A0A0A', marginBottom: 6 },
});
