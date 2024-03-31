import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Category, getCategoryIcon } from '../../utils';
import { theme } from '../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CATEGORY_KEY = 'currentCategory';

export const CategoryItem = ({ category }) => {
  const navigation = useNavigation();
  const categoryIcon = getCategoryIcon(category);

  const handleNavigate = async (category: string) => {
    await AsyncStorage.setItem(CATEGORY_KEY, category);
    navigation.navigate('Category');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.image}
        onPress={() => handleNavigate(category)}>
        <View style={{ alignSelf: 'center' }}>{categoryIcon}</View>
      </TouchableOpacity>
      {category !== Category.MY_VOCABULARY || category !== Category.OTHERS ? (
        <Text style={styles.name}>{category}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: 120,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    backgroundColor: theme.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    color: theme.dark,
  },
});
