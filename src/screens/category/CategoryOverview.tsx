import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CategoryItem } from './CategoryItem';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';
import { Category } from '../../utils';

export const CategoryOverview = () => {
  const navigation = useNavigation();
  const categories = Object.values(Category);

  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.list}>
          {categories
            // categories with even index for left column
            .filter((elem, index) => index % 2 === 0)
            .map((category) => (
              <View style={styles.item}>
                <CategoryItem category={category} key={category} />
              </View>
            ))}
        </View>
        <View style={styles.list}>
          {categories
            // categories with odd index for right column
            .filter((elem, index) => index % 2 !== 0)
            .map((category) => (
              <View style={styles.item} key={category}>
                <CategoryItem category={category} />
              </View>
            ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, { marginBottom: 28, marginRight: 14 }]}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('Custom word')}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '50%',
  },
  item: {
    marginVertical: 24,
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
    backgroundColor: theme.secondaryButton,
  },
  plus: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
