import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen          from './src/screens/HomeScreen';
import MBTIScreen          from './src/screens/MBTIScreen';
import EnneagramScreen     from './src/screens/EnneagramScreen';
import ResultScreen        from './src/screens/ResultScreen';
import KisilikTipleriScreen from './src/screens/KisilikTipleriScreen';
import KaynaklarScreen     from './src/screens/KaynaklarScreen';
import CharacterGuideScreen from './src/screens/CharacterGuideScreen';
import { ThemeProvider } from './src/theme/ThemeContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade_from_bottom', animationDuration: 260 }}>
          <Stack.Screen name="Home"           component={HomeScreen} />
          <Stack.Screen name="MBTI"           component={MBTIScreen} />
          <Stack.Screen name="Enneagram"      component={EnneagramScreen} />
          <Stack.Screen name="Result"         component={ResultScreen} />
          <Stack.Screen name="KisilikTipleri" component={KisilikTipleriScreen} />
          <Stack.Screen name="Kaynaklar"      component={KaynaklarScreen} />
          <Stack.Screen name="CharacterGuide" component={CharacterGuideScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
