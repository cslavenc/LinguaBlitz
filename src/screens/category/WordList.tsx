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
import { useIsFocused, useNavigation } from '@react-navigation/native';
import allVocabularyData from '../../../data/all_levels_english_vocabulary.json';
import { WordDetail } from './WordDetail';
import { useEffect, useState } from 'react';
import { theme } from '../../theme';
import { SearchIcon } from '../../components/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LEVEL_KEY } from '../welcome/Welcome';

export const WordList = ({ route }) => {
  const { category } = route.params;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [level, setLevel] = useState('');
  const [vocabulary, setVocabulary] = useState([]);
  const [filteredWords, setFilteredWords] = useState([]);
  const maxWordLength = 32;

  useEffect(() => {
    const getCurrentLevel = async () => {
      try {
        const currentLevel = await AsyncStorage.getItem(LEVEL_KEY);
        if (currentLevel != null) {
          setLevel(JSON.parse(currentLevel).split(' ')[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentLevel();
  }, [level, isFocused]);

  useEffect(() => {
    const filteredVocabulary = allVocabularyData
      .filter((word: WordDetail) => word?.level.includes(level.split(' ')[0]))
      .filter((word: WordDetail) => word?.category.includes(category));

    setFilteredWords(filteredVocabulary);
    setVocabulary(filteredVocabulary);
  }, [level, category]);

  const handleSetFilteredWords = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    if (event.nativeEvent.text.length > 1) {
      let filtered = filteredWords.filter((item: WordDetail) =>
        item.word.startsWith(event.nativeEvent.text)
      );
      setFilteredWords(filtered);
    } else {
      setFilteredWords(vocabulary); // reset
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <View style={{ paddingRight: 4 }}>
          <SearchIcon />
        </View>
        <TextInput
          style={styles.input}
          onChange={handleSetFilteredWords}
          underlineColorAndroid="transparent"
          placeholder="Search for a word"
        />
      </View>
      <FlatList
        data={filteredWords}
        keyExtractor={(item: WordDetail) => item.id + item.word}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: ListRenderItemInfo<WordDetail>) => (
          <View>
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                navigation.navigate('Word', { item, data: vocabulary })
              }>
              <Text style={styles.word}>
                {item.word.length < maxWordLength
                  ? item.word
                  : item.word.split(' (')[0]}
              </Text>
              <Text style={styles.partOfSpeech}>{item.partOfSpeech}</Text>
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
  searchBox: {
    borderRadius: 10,
    marginBottom: 24,
    paddingHorizontal: 12,
    backgroundColor: theme.white,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 0.25,
    borderStyle: 'solid',
    borderColor: theme.dark,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  word: { textAlign: 'left', fontSize: 18, fontWeight: 'normal' },
  partOfSpeech: {
    color: theme.grey,
    fontStyle: 'italic',
  },
});
