import { StyleSheet, View, Text } from 'react-native';
import { HomeIcon } from './Icons';
import { theme } from '../theme';

export const CourseItem = ({ course }) => {
  let color = 'blue';

  switch (course) {
    case 'Business':
      color = theme.turquoise;
      break;
    case 'Health':
      color = theme.autumngreen;
      break;
    case 'Environment':
      color = theme.green;
      break;
    case 'Science & Technology':
      color = theme.violet;
      break;
    case 'Feelings & Emotions':
      color = theme.orange;
      break;
  }
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <HomeIcon size={64} />
      <Text style={styles.name}>{course}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    marginVertical: 12,
    padding: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
  },
});
