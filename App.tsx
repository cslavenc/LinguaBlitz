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

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function App() {
  const backgroundImageUrl = require('./assets/background.png');

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
