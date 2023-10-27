import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { HomeIcon } from './Icons';
import { theme } from '../theme';
import { useNavigation } from '@react-navigation/native';

export const CourseItem = ({ course }) => {
  const navigation = useNavigation();
  let color = 'blue';
  let imageUrl;

  // TODO : split these switch assignment into utility functions
  // TODO : add a bottom type in case new things are added so nothing goes forgotten
  switch (course) {
    case 'Business':
      color = theme.turquoise;
      imageUrl = require('../../assets/category_business.png');
      break;
    case 'Health':
      color = theme.autumngreen;
      imageUrl = require('../../assets/category_health.png');
      break;
    case 'Environment':
      color = theme.green;
      imageUrl = require('../../assets/category_environment.png');
      break;
    case 'Science & Technology':
      color = theme.violet;
      imageUrl = require('../../assets/category_science.png');
      break;
    case 'Feelings & Emotions':
      color = theme.orange;
      imageUrl = require('../../assets/category_feelings.png');
      break;
  }
  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.container, { backgroundColor: color }]}
        onPress={() => navigation.navigate('Course', { course, color })}>
        <View style={styles.image}>
          <Image style={styles.image} resizeMode="stretch" source={imageUrl} />
        </View>
        <Text style={styles.name}>{course}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    marginVertical: 12,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    flex: 3,
    // make image fit left card content properly
    width: undefined,
    height: undefined,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 5,
    textAlign: 'center',
  },
});
