import React from 'react';
import { Platform } from 'react-native';
import { SERIF } from '../theme/constants';

// Enneagram simgesi: çember + altıgen akış (1-4-2-8-5-7) + üçgen (3-6-9).
// Yalnızca web'de çizilir (SVG); mobilde null döner, ekranlarda numara seçici zaten var.
//   selected    → vurgulanan tip
//   onSelect    → verilirse noktalar tıklanabilir
//   security    → seçili tipten bu tipe düz çizgi (güvenlik yönü)
//   stress      → seçili tipten bu tipe kesikli çizgi (stres yönü)
const HEXAGRAM = [1, 4, 2, 8, 5, 7];
const TRIANGLE = [9, 3, 6];

export default function EnneagramFigure({
  selected, onSelect, security, stress, size = 320, accent = '#B4452F', ink = '#000000', hair = '#CFCBC3', paper = '#FFFFFF',
}) {
  if (Platform.OS !== 'web') return null;

  const c = size / 2;
  const R = size / 2 - 26;
  const pt = (n) => {
    const a = ((n * 40 - 90) * Math.PI) / 180; // 9 üstte, saat yönünde
    return { x: c + R * Math.cos(a), y: c + R * Math.sin(a) };
  };
  const line = (a, b, props) => {
    const p = pt(a); const q = pt(b);
    return <line key={`${a}-${b}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} {...props} />;
  };

  const loop = (arr) => arr.map((n, i) => line(n, arr[(i + 1) % arr.length], { stroke: hair, strokeWidth: 1 }));
  const interactive = typeof onSelect === 'function';

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Enneagram simgesi" style={{ maxWidth: '100%', height: 'auto' }}>
      <circle cx={c} cy={c} r={R} fill="none" stroke={hair} strokeWidth="1" />
      {loop(HEXAGRAM)}
      {loop(TRIANGLE)}

      {selected && security ? line(selected, security, { stroke: accent, strokeWidth: 2 }) : null}
      {selected && stress ? line(selected, stress, { stroke: ink, strokeWidth: 2, strokeDasharray: '5 5' }) : null}

      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
        const { x, y } = pt(n);
        const on = n === selected;
        const rel = n === security || n === stress;
        return (
          <g
            key={n}
            onClick={interactive ? () => onSelect(n) : undefined}
            onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(n); } } : undefined}
            tabIndex={interactive ? 0 : undefined}
            role={interactive ? 'button' : undefined}
            aria-label={interactive ? `Tip ${n}` : undefined}
            style={{ cursor: interactive ? 'pointer' : 'default', outline: 'none' }}
          >
            <circle cx={x} cy={y} r={on ? 20 : 17} fill={on ? accent : paper} stroke={on ? accent : rel ? ink : hair} strokeWidth={rel && !on ? 1.5 : 1} />
            <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle" fontFamily={SERIF} fontSize={on ? 22 : 19} fill={on ? '#FFFFFF' : ink}>
              {n}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
