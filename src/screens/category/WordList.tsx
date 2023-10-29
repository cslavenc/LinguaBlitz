import {
  FlatList,
  ListRenderItemInfo,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import c1Data from '../../../data/C1_english_vocabulary.json';
import { WordDetail } from './WordDetail';
import { useState } from 'react';

export const WordList = ({ route }) => {
  const { color } = route.params;
  const navigation = useNavigation();
  const [filteredWords, setFilteredWords] = useState(c1Data);

  const handleSetFilteredWords = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    if (event.nativeEvent.text.length > 1) {
      let filtered = c1Data.filter((item: WordDetail) =>
        item.word.startsWith(event.nativeEvent.text)
      );
      setFilteredWords(filtered);
    } else {
      setFilteredWords(c1Data); // reset
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChange={handleSetFilteredWords}
        underlineColorAndroid="transparent"
      />
      <FlatList
        data={filteredWords}
        keyExtractor={(item: WordDetail) =>
          item.id + item.partOfSpeech + item.word
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: ListRenderItemInfo<WordDetail>) => (
          <View style={styles.item}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Word', { color, item, data: c1Data })
              }>
              <Text style={styles.word}>{item.word}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  input: {
    borderWidth: 0.1,
    borderStyle: 'solid',
    borderRadius: 10,
    marginBottom: 24,
    paddingHorizontal: 12,
    fontSize: 18,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 0.25,
    borderStyle: 'solid',
    borderColor: 'black',
    display: 'flex',
    flexDirection: 'column',
  },
  word: { textAlign: 'center', fontSize: 18 },
});
