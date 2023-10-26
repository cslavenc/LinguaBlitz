import { Platform, UIManager } from 'react-native';
import { BottomTabsNavigator } from './src/screens/BottomTabs.navigator';
import { NavigationContainer } from '@react-navigation/native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabsNavigator />
    </NavigationContainer>
  );
}
