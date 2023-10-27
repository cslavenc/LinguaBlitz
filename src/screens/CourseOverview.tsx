import { ScrollView, StyleSheet, View } from 'react-native';
import { CourseItem } from '../components/CourseItem';

export const CourseOverview = () => {
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 26,
  },
});
