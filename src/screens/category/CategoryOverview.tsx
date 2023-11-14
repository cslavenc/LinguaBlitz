import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CategoryItem } from '../../components/CategoryItem';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';
import { Category } from '../../utils';

export const CategoryOverview = () => {
  const navigation = useNavigation();

  const categories = Object.values(Category);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {categories.map((category) => (
          <CategoryItem category={category} key={category} />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate('Custom word', { color: theme.lightblue })
        }>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 26,
    marginBottom: 12,
  },
  button: {
    width: 50,
    height: 50,
    elevation: 3,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    bottom: 0,
    borderRadius: 45,
    color: 'black',
    backgroundColor: 'yellow',
  },
  plus: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
