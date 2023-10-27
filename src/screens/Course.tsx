import { Text } from 'react-native';

export const Course = ({ route }) => {
  const { course, color } = route.params;
  return (
    <Text>
      {course} with color {color}
    </Text>
  );
};
