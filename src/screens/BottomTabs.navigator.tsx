import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './Home';
import { Courses } from './Courses';
import { AnalyticsTab, HomeIcon } from '../components/Icons';
import { theme } from '../theme';

const BottomTabs = createBottomTabNavigator();

export const BottomTabsNavigator = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: true,
        tabBarActiveTintColor: theme.blue,
        tabBarInactiveTintColor: theme.grey,
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'Home':
              return <HomeIcon size={size} color={color} />;
            case 'Courses':
              return <AnalyticsTab size={size} color={color} />;
            default:
              return null;
          }
        },
      })}>
      <BottomTabs.Screen
        name="Home"
        component={Home}
        options={{ headerTitleAlign: 'center' }}
      />
      <BottomTabs.Screen
        name="Courses"
        component={Courses}
        options={{ headerTitleAlign: 'center' }}
      />
    </BottomTabs.Navigator>
  );
};
