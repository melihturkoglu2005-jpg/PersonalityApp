import React, { createContext, useContext, useState } from 'react';

// ─── Açık tema (mevcut Duolingo paleti) ───────────────────────────────────────
export const lightColors = {
  background:    '#FFFFFF',
  surface:       '#FFFFFF',
  surfaceLight:  '#F7F8FA',
  surfaceHover:  '#F0F2F5',

  primary:       '#58CC02',
  primaryLight:  '#D7FFB8',
  primaryDark:   '#46A302',
  primaryText:   '#3A8700',

  secondary:     '#1CB0F6',
  secondaryLight:'#DDF4FF',
  secondaryDark: '#0099D6',

  accent:        '#FFC800',
  accentLight:   '#FFF5CC',
  accentDark:    '#E6B400',

  violet:        '#CE82FF',
  violetLight:   '#F3E6FF',
  violetDark:    '#A560D8',

  textPrimary:   '#3C3C3C',
  textSecondary: '#777777',
  textMuted:     '#AFAFAF',

  success:       '#58CC02',
  error:         '#FF4B4B',
  errorDark:     '#EA2B2B',
  warning:       '#FFC800',

  border:        '#E5E5E5',
  borderLight:   '#F0F0F0',
};

// ─── Dark tema — derin gece paleti ───────────────────────────────────────────
export const darkColors = {
  background:    '#0F1117',   // derin siyah-lacivert
  surface:       '#1A1D27',   // koyu yüzey
  surfaceLight:  '#222535',   // biraz daha açık yüzey
  surfaceHover:  '#2A2E42',   // hover durumu

  // Canlı neon yeşil (light'taki parlak yeşilin dark versiyonu)
  primary:       '#4ADE80',
  primaryLight:  '#14231C',
  primaryDark:   '#22C55E',
  primaryText:   '#4ADE80',

  // Elektrik mavi (light'taki açık mavinin dark versiyonu)
  secondary:     '#38BDF8',
  secondaryLight:'#0C1F2E',
  secondaryDark: '#0EA5E9',

  // Altın sarı (light'taki sarının dark versiyonu)
  accent:        '#FBBF24',
  accentLight:   '#231A08',
  accentDark:    '#F59E0B',

  // Lila/mor (aynı tatlılıkta ama dark uyumlu)
  violet:        '#C084FC',
  violetLight:   '#1F1030',
  violetDark:    '#A855F7',

  textPrimary:   '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted:     '#475569',

  success:       '#4ADE80',
  error:         '#F87171',
  errorDark:     '#EF4444',
  warning:       '#FBBF24',

  border:        '#2A2E42',
  borderLight:   '#1E2233',
};

// ─── Context ──────────────────────────────────────────────────────────────────
const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
  colors: lightColors,
});

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);
  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
