import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SpeechBubbleIcon } from '../components/Icons';
import { useNavigation } from '@react-navigation/native';
import { getImageUrl } from '../utils';
import { useEffect } from 'react';

export const Course = ({ route }) => {
  const navigation = useNavigation();
  const { course, color } = route.params;
  let imageUrl = getImageUrl(course);

  useEffect(() => {
    navigation.setOptions({ headerTitle: course });
  }, [course]);

  return (
    <View>
      <Image resizeMode="contain" source={imageUrl} />
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.container, { backgroundColor: color }]}
        onPress={() => navigation.navigate('Word list', { color })}>
        <SpeechBubbleIcon />
        <Text style={styles.name}>Word list</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    elevation: 5,
    marginHorizontal: 20,
    marginVertical: 18,
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
