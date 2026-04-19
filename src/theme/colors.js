export const colors = {
  background:    '#F4F6FA',
  surface:       '#FFFFFF',
  surfaceLight:  '#F8FAFC',
  surfaceHover:  '#F1F5F9',

  primary:       '#0EA5E9',
  primaryLight:  '#E0F2FE',
  primaryDark:   '#0369A1',

  secondary:     '#EC4899',
  secondaryLight:'#FDF2F8',
  secondaryDark: '#BE185D',

  accent:        '#10B981',
  accentLight:   '#D1FAE5',

  violet:        '#8B5CF6',
  violetLight:   '#EDE9FE',

  textPrimary:   '#0F172A',
  textSecondary: '#475569',
  textMuted:     '#94A3B8',
  textXMuted:    '#CBD5E1',

  success:       '#10B981',
  error:         '#EF4444',
  warning:       '#F59E0B',

  border:        '#E2E8F0',
  borderLight:   '#F1F5F9',
  borderStrong:  '#CBD5E1',
};

// 8px Grid Spacing
export const space = {
  1:  4,
  2:  8,
  3:  12,
  4:  16,
  5:  20,
  6:  24,
  7:  28,
  8:  32,
  9:  36,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
};

// Shadow System
export const shadows = {
  sm: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
  xl: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.14,
    shadowRadius: 40,
    elevation: 12,
  },
  colored: (color) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.26,
    shadowRadius: 18,
    elevation: 8,
  }),
};

// Border Radius Tokens
export const radius = {
  sm:  8,
  md:  12,
  lg:  16,
  xl:  20,
  xxl: 24,
  full: 999,
};
