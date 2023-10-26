import { StyleSheet, View } from 'react-native';

export const CourseItem = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    marginVertical: 5,
    padding: 10,
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
