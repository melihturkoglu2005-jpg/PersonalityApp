import React, { createContext, useContext, useState } from 'react';

// ─── Açık tema — "tipoloji defteri" paleti ───────────────────────────────────
// Kâğıt beyazı + mürekkep siyahı (ana sayfayla aynı), iki sistem için iki vurgu:
//   primary   → MBTI (ultramarin mürekkep)
//   secondary → Enneagram (kökboya kırmızısı)
export const lightColors = {
  background:    '#FFFFFF',
  surface:       '#FFFFFF',
  surfaceLight:  '#F7F6F3',
  surfaceHover:  '#EFEDE8',

  primary:       '#2F3FBF',
  primaryLight:  '#E9EBFA',
  primaryDark:   '#222E94',
  primaryText:   '#2F3FBF',

  secondary:     '#B4452F',
  secondaryLight:'#F7E8E3',
  secondaryDark: '#8F3524',

  accent:        '#A97A12',
  accentLight:   '#F6EEDA',
  accentDark:    '#86600C',

  violet:        '#6B4FA0',
  violetLight:   '#EFEAF7',
  violetDark:    '#52397F',

  textPrimary:   '#000000',
  textSecondary: '#6F6F6F',
  textMuted:     '#9A9893',

  success:       '#2E7D4F',
  error:         '#B3261E',
  errorDark:     '#8E1D17',
  warning:       '#A97A12',

  border:        '#E6E4DF',
  borderLight:   '#F0EEE9',
};

// ─── Koyu tema (arayüzde şu an tetikleyen bir düğme yok; uyumluluk için duruyor)
export const darkColors = {
  background:    '#0C0C0D',
  surface:       '#151516',
  surfaceLight:  '#1D1D1F',
  surfaceHover:  '#262628',

  primary:       '#8E9BFF',
  primaryLight:  '#1A1D3A',
  primaryDark:   '#6F7DF0',
  primaryText:   '#8E9BFF',

  secondary:     '#F08A73',
  secondaryLight:'#3A1E18',
  secondaryDark: '#E06E55',

  accent:        '#E0B54A',
  accentLight:   '#2E2610',
  accentDark:    '#C99A2E',

  violet:        '#B79CEB',
  violetLight:   '#241B38',
  violetDark:    '#9E80DB',

  textPrimary:   '#F5F4F0',
  textSecondary: '#A3A19B',
  textMuted:     '#6E6C67',

  success:       '#6CCB8F',
  error:         '#F28B82',
  errorDark:     '#E5675D',
  warning:       '#E0B54A',

  border:        '#2A2A2C',
  borderLight:   '#1F1F21',
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
