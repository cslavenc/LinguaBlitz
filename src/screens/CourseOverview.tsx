import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CourseItem } from '../components/CourseItem';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';

export const CourseOverview = () => {
  const navigation = useNavigation();

  const courses = [
    'Business',
    'Health',
    'Environment',
    'Science & Technology',
    'Feelings & Emotions',
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {courses.map((course) => (
          <CourseItem course={course} key={course} />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate('Custom', { color: theme.lightblue })
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
