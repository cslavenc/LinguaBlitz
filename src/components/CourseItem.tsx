import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getColor, getImageUrl } from '../utils';

export const CourseItem = ({ course }) => {
  const navigation = useNavigation();
  const color = getColor(course);
  const imageUrl = getImageUrl(course);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.container, { backgroundColor: color }]}
        onPress={() => navigation.navigate('Course', { course, color })}>
        <View style={styles.image}>
          <Image style={styles.image} resizeMode="stretch" source={imageUrl} />
        </View>
        <Text style={styles.name}>{course}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    height: 100,
    marginVertical: 12,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    flex: 3,
    // make image fit left card content properly
    width: undefined,
    height: undefined,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 5,
    textAlign: 'center',
  },
});
