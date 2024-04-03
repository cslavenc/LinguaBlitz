/*
 * Copyright (c) 2024 LinguaBlitz.
 */

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
import { CATEGORY_KEY } from './CategoryItem';
import { CUSTOM_WORDS_KEY } from '../../utils';

export const WordList = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [level, setLevel] = useState('');
  const [category, setCategory] = useState('');
  const [vocabulary, setVocabulary] = useState([]);
  const [filteredWords, setFilteredWords] = useState([]);
  const maxWordLength = 32;

  useEffect(() => {
    const getCurrentCategory = async () => {
      try {
        const currentCategory = await AsyncStorage.getItem(CATEGORY_KEY);
        if (currentCategory != null) {
          setCategory(currentCategory);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getCurrentCategory();
  }, [category, isFocused]);

  useEffect(() => {
    const getCurrentLevel = async () => {
      try {
        const currentLevel = await AsyncStorage.getItem(LEVEL_KEY);
        if (currentLevel != null) {
          setLevel(JSON.parse(currentLevel).split(' ')[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getCurrentLevel();
  }, [level, isFocused]);

  const getCustomWords = async () => {
    try {
      const raw = await AsyncStorage.getItem(CUSTOM_WORDS_KEY);
      const words: WordDetail[] = raw ? JSON.parse(raw) : [];
      return words;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const initializeVocabulary = async () => {
      if (!!allVocabularyData) {
        const filteredVocabulary: WordDetail[] = allVocabularyData
          .filter((word: WordDetail) =>
            word?.level.includes(level.split(' ')[0])
          )
          .filter((word: WordDetail) => word?.category?.includes(category));

        const customWords = await getCustomWords();
        filteredVocabulary.push(...customWords);

        setFilteredWords(filteredVocabulary);
        setVocabulary(filteredVocabulary);
      } else {
        console.error('Failed to load vocabulary data');
      }
    };
    initializeVocabulary();
  }, [level, category]);

  const handleSetFilteredWords = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    if (event.nativeEvent.text.length > 1) {
      let filtered = filteredWords.filter((item: WordDetail) =>
        item.word.toLowerCase().startsWith(event.nativeEvent.text.toLowerCase())
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

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  searchBox: {
    borderRadius: 10,
    marginBottom: 24,
    paddingVertical: 6,
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
