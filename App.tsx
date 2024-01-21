import 'react-native-gesture-handler';
import {
  Dimensions,
  ImageBackground,
  Platform,
  UIManager,
  View,
} from 'react-native';
import { BottomTabsNavigator } from './src/screens/BottomTabs.navigator';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { WelcomeScreen } from './src/screens/welcome/WelcomeScreen';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function App() {
  const backgroundImageUrl = require('./assets/background.png');

  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('isFirstLaunch').then((result) => {
      if (result !== null) {
        setIsFirstLaunch(true); // TODO : uncomment to skip launch screen
      } else {
        AsyncStorage.setItem('isFirstLaunch', 'true');
      }
    });
  }, []);

  return (
    <NavigationContainer theme={globalTheme}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={backgroundImageUrl}
          style={{
            flex: 1,
            justifyContent: 'center',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
          resizeMode="cover">
          {isFirstLaunch ? <WelcomeScreen /> : <BottomTabsNavigator />}
        </ImageBackground>
      </View>
    </NavigationContainer>
  );
}

const globalTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};
