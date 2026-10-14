import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import HomeScreen          from './src/screens/HomeScreen';
import TestlerScreen       from './src/screens/TestlerScreen';
import MBTIScreen          from './src/screens/MBTIScreen';
import EnneagramScreen     from './src/screens/EnneagramScreen';
import ResultScreen        from './src/screens/ResultScreen';
import KisilikTipleriScreen from './src/screens/KisilikTipleriScreen';
import KaynaklarScreen     from './src/screens/KaynaklarScreen';
import CharacterGuideScreen from './src/screens/CharacterGuideScreen';
import HakkimizdaScreen from './src/screens/HakkimizdaScreen';
import GorselKaynaklarScreen from './src/screens/GorselKaynaklarScreen';
import { ThemeProvider } from './src/theme/ThemeContext';

if (Platform.OS === 'web') {
  require('./src/styles/loadFonts');
  require('./src/styles/fonts.css');
  require('./src/styles/theme.css');
}

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    if (Platform.OS !== 'web') return;

    for (const [rel, href] of [
      ['icon', '/favicon.ico'],
      ['apple-touch-icon', '/apple-touch-icon.png'],
    ]) {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
    }
  }, []);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade_from_bottom', animationDuration: 260 }}>
          <Stack.Screen name="Home"           component={HomeScreen} />
          <Stack.Screen name="Testler"        component={TestlerScreen} />
          <Stack.Screen name="MBTI"           component={MBTIScreen} />
          <Stack.Screen name="Enneagram"      component={EnneagramScreen} />
          <Stack.Screen name="Result"         component={ResultScreen} />
          <Stack.Screen name="KisilikTipleri" component={KisilikTipleriScreen} />
          <Stack.Screen name="Kaynaklar"      component={KaynaklarScreen} />
          <Stack.Screen name="CharacterGuide" component={CharacterGuideScreen} />
          <Stack.Screen name="Hakkimizda" component={HakkimizdaScreen} />
          <Stack.Screen name="GorselKaynaklar" component={GorselKaynaklarScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
