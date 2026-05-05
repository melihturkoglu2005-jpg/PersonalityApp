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

// ─── Pastel Dark tema ─────────────────────────────────────────────────────────
export const darkColors = {
  background:    '#1A1A2E',   // derin lacivert arka plan
  surface:       '#22223B',   // koyu mor-lacivert yüzey
  surfaceLight:  '#2D2D44',   // biraz daha açık yüzey
  surfaceHover:  '#33334F',   // hover durumu

  // Pastel yeşil
  primary:       '#A8E6A3',
  primaryLight:  '#1E3A1E',
  primaryDark:   '#7BC97A',
  primaryText:   '#A8E6A3',

  // Pastel mavi
  secondary:     '#A3C4E6',
  secondaryLight:'#1A2B3A',
  secondaryDark: '#7AAFD4',

  // Pastel sarı
  accent:        '#F0D98A',
  accentLight:   '#2E2A1A',
  accentDark:    '#D4BB6E',

  // Pastel mor
  violet:        '#D4A8E8',
  violetLight:   '#2A1A35',
  violetDark:    '#B88FCC',

  textPrimary:   '#E8E8F0',
  textSecondary: '#A0A0C0',
  textMuted:     '#666688',

  success:       '#A8E6A3',
  error:         '#F0A0A0',
  errorDark:     '#D08080',
  warning:       '#F0D98A',

  border:        '#33334F',
  borderLight:   '#2A2A42',
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
