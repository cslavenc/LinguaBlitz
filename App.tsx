import 'react-native-gesture-handler';
import { Platform, UIManager } from 'react-native';
import { BottomTabsNavigator } from './src/screens/BottomTabs.navigator';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { theme } from './src/theme';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function App() {
  return (
    <NavigationContainer theme={globalTheme}>
      <BottomTabsNavigator />
    </NavigationContainer>
  );
}

const globalTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.white,
  },
};
