import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { HomeIcon } from './Icons';
import { theme } from '../theme';
import { useNavigation } from '@react-navigation/native';

// TODO : find a suitable ui component library
export const CourseItem = ({ course }) => {
  const navigation = useNavigation();
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
    <View>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.container, { backgroundColor: color }]}
        onPress={() => navigation.navigate('Course', { course, color })}>
        <HomeIcon size={64} />
        <Text style={styles.name}>{course}</Text>
      </TouchableOpacity>
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
