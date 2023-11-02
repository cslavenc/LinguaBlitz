import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export interface WordDetail {
  id: string;
  word: string;
  level: string; // TODO : use an enum?
  description: string;
  example: string;
  partOfSpeech: string;
}

export const WordDetail = ({ route }) => {
  const { color, item, data } = route.params;
  const navigation = useNavigation();

  const word = item.word;
  const partOfSpeech = item.partOfSpeech;
  const description = item.description;
  const example = item.example.trim();

  console.log('my description: ', description.split('\n'));
  const descriptions = description.split('\n');

  useEffect(() => {
    navigation.setOptions({ headerTitle: word.split(' (')[0] });
  }, [word]);

  const handleNext = () => {
    const idx = data.findIndex((current: WordDetail) => current.id === item.id);
    const next = idx + 1 < data.length ? data[idx + 1] : data[0];
    navigation.navigate('Word', { color, item: next, data });
  };

  const handlePrevious = () => {
    const idx = data.findIndex((current: WordDetail) => current.id === item.id);
    const previous = idx - 1 > 0 ? data[idx - 1] : data[data.length - 1];
    navigation.navigate('Word', { color, item: previous, data });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.title, { backgroundColor: color }]}>
        <Text style={styles.name}>{word}</Text>
        <Text style={[styles.name, { fontStyle: 'italic' }]}>
          ({partOfSpeech})
        </Text>
      </View>
      <View style={styles.information}>
        <View>
          <View style={{ height: '33%' }}>
            <Text style={styles.heading}>Description</Text>
            {descriptions.map((content) => (
              <View style={{ flexDirection: 'row' }}>
                <Text>{'\u2022'}</Text>
                <Text style={{ flex: 1, paddingLeft: 5 }}>
                  {content.trim()}
                </Text>
              </View>
            ))}
          </View>
          <View style={{ height: '37%' }}>
            <Text style={styles.heading}>Example</Text>
            <Text style={styles.text}>{example}</Text>
          </View>
          <View style={{ height: '30%' }}>
            <Text style={styles.heading}>Synonyms</Text>
            <Text style={styles.text}>synonyms go here</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={() => handlePrevious()}>
          <Text style={[styles.button, { backgroundColor: color }]}>
            Previous
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNext()}>
          <Text style={[styles.button, { backgroundColor: color }]}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 26,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  title: {
    height: 150,
    elevation: 5,
    marginVertical: 12,
    marginBottom: 25,
    padding: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  name: {
    textAlign: 'center',
    fontSize: 24,
  },
  text: {
    fontSize: 18,
  },
  information: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 100,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    fontSize: 28,
    width: 147,
    height: 45,
    borderRadius: 10,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
});
