import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { HomeIcon } from '../components/Icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';

export const Course = ({ route }) => {
  const navigation = useNavigation();
  const { course, color } = route.params;

  let imageUrl;
  switch (course) {
    case 'Business':
      imageUrl = require('../../assets/category_business.png');
      break;
    case 'Health':
      imageUrl = require('../../assets/category_health.png');
      break;
    case 'Environment':
      imageUrl = require('../../assets/category_environment.png');
      break;
    case 'Science & Technology':
      imageUrl = require('../../assets/category_science.png');
      break;
    case 'Feelings & Emotions':
      imageUrl = require('../../assets/category_feelings.png');
      break;
  }

  return (
    <View>
      <Image resizeMode="contain" source={imageUrl} />
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
    fontWeight: 'bold',
  },
});
