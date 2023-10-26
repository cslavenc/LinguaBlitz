import { Text } from 'react-native';

export const Course = ({ course, color }) => {
  return (
    <Text>
      {course} with color {color}
    </Text>
  );
};
