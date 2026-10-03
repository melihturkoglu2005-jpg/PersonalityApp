import { Platform } from 'react-native';

// Gövde yazısı: Inter (ana sayfayla aynı)
export const FONT = Platform.select({
  ios:     'System',
  android: 'sans-serif',
  web:     "'Inter', system-ui, sans-serif",
});

// Başlık yazısı: Instrument Serif (ana sayfadaki logo ve manşet ile aynı)
export const SERIF = Platform.select({
  ios:     'Georgia',
  android: 'serif',
  web:     "'Instrument Serif', Georgia, serif",
});
