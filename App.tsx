/*
 * Copyright (c) 2024 LinguaBlitz.
 */

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
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function App() {
  const backgroundImageUrl = require('./assets/background.png');

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while the app is loading
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    async function hideSplashScreen() {
      try {
        // Hide the splash screen after a delay or when the app is ready
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    }
    // use a timeout to avoid calling it instantly
    setTimeout(() => hideSplashScreen(), 700);
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
          <BottomTabsNavigator />
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
