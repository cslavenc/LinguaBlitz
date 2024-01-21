import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './Home';
import { CategoryOverview } from './category/CategoryOverview';
import { BookIcon, CategoryOverviewTab, HomeIcon } from '../components/Icons';
import { theme } from '../theme';
import { Category } from './category/Category';
import { createStackNavigator } from '@react-navigation/stack';
import { CategoryItem } from './category/CategoryItem';
import { WordList } from './category/WordList';
import { WordDetail } from './category/WordDetail';
import { CustomWord } from './custom/CustomWord';
import { CustomWordList } from './custom/CustomWordList';
import { Flashcard } from './flashcard/Flashcard';
import { BookList } from './book/BookList';
import { Level, Name, Welcome } from './welcome/Welcome';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// for stack based navigation, the navigator has to be informed about the screens
const HomeStack = createStackNavigator();
const CategoryStack = createStackNavigator();
const BookStack = createStackNavigator();
const WelcomeStack = createStackNavigator();

export const FIRST_LAUNCH_KEY = 'isFirstLaunch';

export const HomeStackScreen = () => {
  // TODO : if initial state is true, it shows welcome screen for a short moment, if false, then no
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(FIRST_LAUNCH_KEY).then((result) => {
      if (result !== null) {
        setIsFirstLaunch(true); // TODO : set to false for proper behaviour
      } else {
        AsyncStorage.setItem(FIRST_LAUNCH_KEY, 'true');
      }
    });
  }, []);

  return (
    <HomeStack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: theme.background } }}>
      {isFirstLaunch ? (
        <HomeStack.Screen name="Welcome" component={Welcome} />
      ) : null}
      {isFirstLaunch ? (
        <HomeStack.Screen name="Choose Name" component={Name} />
      ) : null}
      {isFirstLaunch ? (
        <HomeStack.Screen name="Choose Level" component={Level} />
      ) : null}
      <HomeStack.Screen name="Overview" component={Home} />
      <HomeStack.Screen name="My Vocabulary" component={CustomWordList} />
      <HomeStack.Screen name="My Flashcards" component={Flashcard} />
      <HomeStack.Screen name="Word" component={WordDetail} />
    </HomeStack.Navigator>
  );
};
export const CategoryStackScreen = () => {
  return (
    <CategoryStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.background },
      }}>
      <CategoryStack.Screen
        name="Categories"
        component={CategoryOverview}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: 'bold',
            color: theme.dark,
          },
        }}
      />
      <CategoryStack.Screen name="CategoryItem" component={CategoryItem} />
      <CategoryStack.Screen
        name="Category"
        component={Category}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: 'bold',
            color: theme.dark,
          },
        }}
      />
      <CategoryStack.Screen name="Word list" component={WordList} />
      <CategoryStack.Screen name="Word" component={WordDetail} />
      <CategoryStack.Screen name="Custom word" component={CustomWord} />
      <CategoryStack.Screen name="My Vocabulary" component={CustomWordList} />
    </CategoryStack.Navigator>
  );
};

export const BookStackScreen = () => {
  return (
    <BookStack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: theme.background } }}>
      <BookStack.Screen name="English Study Books" component={BookList} />
    </BookStack.Navigator>
  );
};

export const WelcomeStackScreen = () => {
  return (
    <WelcomeStack.Navigator>
      <WelcomeStack.Screen name="Welcome" component={Welcome} />
      <WelcomeStack.Screen name="Name" component={Name} />
      <WelcomeStack.Screen name="Level" component={Level} />
    </WelcomeStack.Navigator>
  );
};

const BottomTabs = createBottomTabNavigator();

export const BottomTabsNavigator = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: true,
        tabBarActiveTintColor: theme.primaryBlue,
        tabBarInactiveTintColor: theme.grey,
        tabBarStyle: { backgroundColor: theme.background },
        headerStyle: { backgroundColor: theme.background },
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'Home':
              return <HomeIcon size={size} color={color} />;
            case 'Categories':
              return <CategoryOverviewTab size={size} color={color} />;
            case 'Recommended Books':
              return <BookIcon size={size} color={color} />;
            default:
              return null;
          }
        },
      })}>
      {/*<BottomTabs.Screen name="WELCOME" component={WelcomeStackScreen} />*/}
      <BottomTabs.Screen
        name="Home"
        component={HomeStackScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <BottomTabs.Screen
        name="Categories"
        component={CategoryStackScreen}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: { color: 'transparent' },
        }}
      />
      <BottomTabs.Screen
        name="Recommended Books"
        component={BookStackScreen}
        options={{ headerTitleAlign: 'center' }}
      />
    </BottomTabs.Navigator>
  );
};
