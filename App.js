import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen       from './src/screens/HomeScreen';
import MBTIScreen       from './src/screens/MBTIScreen';
import EnneagramScreen  from './src/screens/EnneagramScreen';
import ResultScreen     from './src/screens/ResultScreen';
import CydenzScreen     from './src/screens/CydenzScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const linking = {
    prefixes: ['https://personalityapp.vercel.app', 'http://localhost:19006'],
    config: {
      screens: {
        Home: '',
        MBTI: 'mbti',
        Enneagram: 'enneagram',
        Result: 'result',
        Cydenz: 'cydenz',
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home"       component={HomeScreen} />
        <Stack.Screen name="MBTI"       component={MBTIScreen} />
        <Stack.Screen name="Enneagram"  component={EnneagramScreen} />
        <Stack.Screen name="Result"     component={ResultScreen} />
        <Stack.Screen name="Cydenz"     component={CydenzScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}