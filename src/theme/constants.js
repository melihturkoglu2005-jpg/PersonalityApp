import { Platform } from 'react-native';

export const FONT = Platform.select({
  ios:     'System',
  android: 'sans-serif',
  web:     "'Inter', system-ui, sans-serif",
});
