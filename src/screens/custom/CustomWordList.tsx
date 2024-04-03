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
import { useEffect, useState } from 'react';
import { SearchIcon } from '../../components/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WordDetail } from '../category/WordDetail';
import { styles } from '../category/WordList';
import { theme } from '../../theme';
import { PRELOADED_WORDS_KEY } from '../../utils';

export const CustomWordList = ({ route }) => {
  const { databaseKey } = route.params;
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [filteredWords, setFilteredWords] = useState([]);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    let parsed: WordDetail[];
    let preloadedParsed: WordDetail[];
    if (databaseKey) {
      const result = await AsyncStorage.getItem(databaseKey);
      parsed = result ? JSON.parse(result) : [];

      const preloaded = await AsyncStorage.getItem(PRELOADED_WORDS_KEY);
      preloadedParsed = preloaded ? JSON.parse(preloaded) : [];
      preloadedParsed = preloadedParsed.filter((item) => item.bookmark);

      parsed.push(...preloadedParsed);
    } else {
      parsed = [];
      preloadedParsed = [];
    }
    setData(parsed);
    setFilteredWords(parsed);
  };

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  const handleSetFilteredWords = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    if (event.nativeEvent.text.length > 1) {
      let filtered = data.filter((item: WordDetail) =>
        item.word.toLowerCase().startsWith(event.nativeEvent.text.toLowerCase())
      );
      setFilteredWords(filtered);
    } else {
      setFilteredWords(data); // reset
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
      {data.length > 0 ? (
        <FlatList
          data={filteredWords}
          keyExtractor={(item: WordDetail) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: ListRenderItemInfo<WordDetail>) => (
            <View>
              <TouchableOpacity
                style={styles.item}
                onPress={() =>
                  navigation.navigate('Word', { item, data: data })
                }>
                <Text style={styles.word}>{item.word}</Text>
                <Text style={styles.partOfSpeech}>{item.partOfSpeech}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <View>
          <Text style={noWordsStyles.text}>
            You haven't added any words yet. Add your first word!
          </Text>
          <TouchableOpacity
            style={[
              noWordsStyles.button,
              { marginBottom: -40, marginRight: 14 },
            ]}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Custom word')}>
            <Text style={noWordsStyles.plus}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const noWordsStyles = StyleSheet.create({
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    width: 50,
    height: 50,
    elevation: 3,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    bottom: 0,
    borderRadius: 45,
    color: 'black',
    backgroundColor: theme.primaryButton,
  },
  plus: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
