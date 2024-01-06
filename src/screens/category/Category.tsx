import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SpeechBubbleIcon } from '../../components/Icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export const Category = ({ route }) => {
  const navigation = useNavigation();
  const { category, color } = route.params;

  useEffect(() => {
    navigation.setOptions({ headerTitle: category });
  }, [category]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.wordList, { backgroundColor: color }]}
        onPress={() => navigation.navigate('Word list', { color })}>
        <SpeechBubbleIcon />
        <Text style={styles.name}>Word list</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wordList: {
    height: 150,
    elevation: 5,
    marginVertical: 18,
    padding: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  container: {
    marginHorizontal: 20,
  },
  name: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
