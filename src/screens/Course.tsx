import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { HomeIcon } from '../components/Icons';
import { useNavigation } from '@react-navigation/native';

export const Course = ({ route }) => {
  const navigation = useNavigation();
  const { course, color } = route.params;
  return (
    <View>
      <Text style={styles.name}>{course}</Text>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.container, { backgroundColor: color }]}
        onPress={() => navigation.navigate('Word list', { color })}>
        <HomeIcon size={64} />
        <Text style={styles.name}>Word list</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    marginHorizontal: 20,
    marginVertical: 12,
    padding: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  name: {
    textAlign: 'center',
    fontSize: 24,
  },
});
