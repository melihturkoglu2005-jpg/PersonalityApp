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

// ─── Modern Dark tema ─────────────────────────────────────────────────────────
export const darkColors = {
  background:    '#0F0F0F',   // derin siyah arka plan
  surface:       '#1A1A1A',   // koyu gri yüzey
  surfaceLight:  '#2A2A2A',   // biraz daha açık yüzey
  surfaceHover:  '#333333',   // hover durumu

  // Modern yeşil
  primary:       '#10B981',
  primaryLight:  '#059669',
  primaryDark:   '#047857',
  primaryText:   '#10B981',

  // Modern mavi
  secondary:     '#3B82F6',
  secondaryLight:'#0EA5E9',
  secondaryDark: '#2563EB',

  // Modern turuncu
  accent:        '#F59E0B',
  accentLight:   '#F97316',
  accentDark:    '#DC2626',

  // Modern mor
  violet:        '#8B5CF6',
  violetLight:   '#7C3AED',
  violetDark:    '#6D28D9',

  textPrimary:   '#F8FAFC',
  textSecondary: '#CBD5E1',
  textMuted:     '#6B7280',

  success:       '#10B981',
  error:         '#EF4444',
  errorDark:     '#B91C1C',
  warning:       '#F59E0B',

  border:        '#333333',
  borderLight:   '#404040',
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
