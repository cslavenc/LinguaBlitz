import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './Home';

const BottomTabs = createBottomTabNavigator();

export const BottomTabsNavigator = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        // tabBarActiveTintColor
        // tabBarInactiveTintColor
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'Home':
              return;
            case 'Courses':
              return;
            default:
              return null;
          }
        },
      })}>
      <BottomTabs.Screen name={'Home'} component={Home}></BottomTabs.Screen>
      <BottomTabs.Screen
        name={'Courses'}
        component={Courses}></BottomTabs.Screen>
    </BottomTabs.Navigator>
  );
};
