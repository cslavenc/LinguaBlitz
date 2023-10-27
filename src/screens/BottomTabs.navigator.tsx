import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './Home';
import { CourseOverview } from './CourseOverview';
import { CourseOverviewTab, HomeIcon } from '../components/Icons';
import { theme } from '../theme';
import { Course } from './Course';
import { createStackNavigator } from '@react-navigation/stack';
import { CourseItem } from '../components/CourseItem';

// for stack based navigation, the navigator has to be informed about the screens
const HomeStack = createStackNavigator();
const CourseStack = createStackNavigator();

export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
};

export const CourseStackScreen = () => {
  return (
    <CourseStack.Navigator>
      <CourseStack.Screen name="CoursesOverview" component={CourseOverview} />
      <CourseStack.Screen name="CourseItem" component={CourseItem} />
      <CourseStack.Screen name="Course" component={Course} />
    </CourseStack.Navigator>
  );
};

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
              return <CourseOverviewTab size={size} color={color} />;
            default:
              return null;
          }
        },
      })}>
      <BottomTabs.Screen
        name="Home"
        component={HomeStackScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <BottomTabs.Screen
        name="Courses"
        component={CourseStackScreen}
        options={{ headerTitleAlign: 'center' }}
      />
    </BottomTabs.Navigator>
  );
};
