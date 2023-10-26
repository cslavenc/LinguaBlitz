import { StyleSheet, Text, View } from 'react-native';
import { CourseItem } from '../components/CourseItem';

export const Courses = () => {
  const courses = [
    'Business',
    'Health',
    'Environment',
    'Science & Technology',
    'Feelings & Emotions',
  ];
  return (
    <View style={styles.container}>
      {courses.map((course) => (
        <CourseItem course={course} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 26,
  },
});
