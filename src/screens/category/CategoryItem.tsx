import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getColor, getImageUrl } from '../../utils';

export const CategoryItem = ({ category }) => {
  const navigation = useNavigation();
  const color = getColor(category);
  const imageUrl = getImageUrl(category);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.image}
        onPress={() => navigation.navigate('Category', { category, color })}>
        <Text style={{ textAlign: 'center' }}>ICON HERE</Text>
      </TouchableOpacity>
      <Text style={styles.name}>{category}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: 120,
    marginVertical: 32,
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
    fontSize: 20,
    color: '#1520A6',
  },
});
