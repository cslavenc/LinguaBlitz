import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getCategoryIcon } from '../../utils';
import { theme } from '../../theme';

export const CategoryItem = ({ category }) => {
  const navigation = useNavigation();
  const categoryIcon = getCategoryIcon(category);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.image}
        onPress={() => navigation.navigate('Category', { category })}>
        <View style={{ alignSelf: 'center' }}>{categoryIcon}</View>
      </TouchableOpacity>
      <Text style={styles.name}>{category}</Text>
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
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    color: theme.dark,
  },
});
