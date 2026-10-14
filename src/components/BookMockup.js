import React from 'react';
import { View, Text, Platform } from 'react-native';
import { SERIF } from '../theme/constants';

// Kapak temaları: etikete göre renk. (MBTI = ultramarin, Enneagram = kökboya, kaynak eser = mürekkep)
const TEMALAR = {
  'Kaynak Eser': { bg: '#1B1B1D', fg: '#F2EFE8', vurgu: '#C9A96A', motif: 'daire' },
  MBTI:          { bg: '#2F3FBF', fg: '#FFFFFF', vurgu: '#AEB6F5', motif: 'harf' },
  Enneagram:     { bg: '#B4452F', fg: '#FBEAE5', vurgu: '#F3C1B3', motif: 'ennea' },
};
const VARSAYILAN = TEMALAR['Kaynak Eser'];

const W = 140;
const H = 200;
const T = 20; // kitabın kalınlığı

// Kapağın ortasındaki küçük çizim: kitabın konusunu çağrıştırır
function Motif({ tur, renk }) {
  if (tur === 'harf') {
    return (
      <svg width="64" height="64" viewBox="0 0 86 86" aria-hidden="true">
        {['E', 'I', 'S', 'N'].map((h, i) => (
          <text key={h} x={(i % 2) * 44 + 4} y={Math.floor(i / 2) * 44 + 34} fontFamily={SERIF} fontSize="38" fill={renk} opacity={i === 0 ? 1 : 0.55}>{h}</text>
        ))}
      </svg>
    );
  }
  if (tur === 'ennea') {
    const c = 43; const R = 36;
    const pt = (n) => { const a = ((n * 40 - 90) * Math.PI) / 180; return [c + R * Math.cos(a), c + R * Math.sin(a)]; };
    const yol = (arr) => arr.map((n, i) => { const [x, y] = pt(n); return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`; }).join(' ') + ' Z';
    return (
      <svg width="64" height="64" viewBox="0 0 86 86" aria-hidden="true" fill="none" stroke={renk} strokeWidth="1">
        <circle cx={c} cy={c} r={R} />
        <path d={yol([1, 4, 2, 8, 5, 7])} />
        <path d={yol([9, 3, 6])} />
      </svg>
    );
  }
  return (
    <svg width="64" height="64" viewBox="0 0 86 86" aria-hidden="true" fill="none" stroke={renk} strokeWidth="1">
      <circle cx="43" cy="43" r="38" />
      <circle cx="43" cy="43" r="26" opacity="0.7" />
      <circle cx="43" cy="43" r="14" opacity="0.5" />
      <circle cx="43" cy="43" r="3" fill={renk} />
    </svg>
  );
}

// Kitap kapağı mockup'ı. Gerçek kapak görseli verirsen (kitap.kapak = 'https://…jpg') onu kullanır;
// vermezsen yazı ve motifle tasarlanmış bir kapak çizer.
export default function BookMockup({ kitap }) {
  const tema = TEMALAR[kitap.etiket] || VARSAYILAN;
  const baslikBoyu = kitap.baslik.length > 30 ? 14 : kitap.baslik.length > 18 ? 17 : 20;

  if (Platform.OS !== 'web') {
    return (
      <View style={{ width: W * 0.7, height: H * 0.7, backgroundColor: tema.bg, padding: 12, justifyContent: 'space-between', borderRadius: 4 }}>
        <Text style={{ fontFamily: SERIF, fontSize: 17, color: tema.fg }}>{kitap.baslik}</Text>
        <Text style={{ fontSize: 11, color: tema.vurgu }}>{kitap.yazar}</Text>
      </View>
    );
  }

  const stil = { '--w': `${W}px`, '--h': `${H}px`, '--t': `${T}px`, '--bg': tema.bg, '--fg': tema.fg };

  return (
    <div className="bk-stage">
      <div className="bk-scene" style={stil}>
        <div className="bk">
          <div className="bk-back" />
          <div className="bk-spine" />
          <div className="bk-front">
            {kitap.kapak ? (
              <img src={kitap.kapak} alt={`${kitap.baslik} kapağı`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : (
              <div className="bk-cover-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter, system-ui, sans-serif', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: tema.vurgu }}>
                  <span>{kitap.etiket}</span>
                  <span>{kitap.yil}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Motif tur={tema.motif} renk={tema.vurgu} />
                </div>
                <div>
                  <div style={{ fontFamily: `${SERIF}`, fontSize: baslikBoyu, lineHeight: 1.05, letterSpacing: '-0.4px' }}>{kitap.baslik}</div>
                  <div style={{ width: 24, height: 1, background: tema.vurgu, margin: '10px 0 8px' }} />
                  <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 9.5, letterSpacing: '0.04em', color: tema.vurgu }}>{kitap.yazar}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
