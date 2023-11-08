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
import { theme } from '../../theme';
import { SearchIcon } from '../../components/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormData } from './CustomWord';

export const CustomWordList = ({ route }) => {
  const { color, databaseKey } = route.params;
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [filteredWords, setFilteredWords] = useState([]);

  const fetchData = async () => {
    if (databaseKey) {
      const result = await AsyncStorage.getItem(databaseKey);
      data = result ? JSON.parse(result) : [];
    } else {
      data = [];
    }
    setFilteredWords(data);
  };

  let data: FormData[];
  useEffect(() => {
    fetchData();
  }, [isFocused]);

  const handleSetFilteredWords = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    if (event.nativeEvent.text.length > 1) {
      let filtered = data.filter((item: FormData) =>
        item.word.startsWith(event.nativeEvent.text)
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
      <FlatList
        data={filteredWords}
        keyExtractor={(item: FormData) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: ListRenderItemInfo<FormData>) => (
          <View>
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                navigation.navigate('Word', { color, item, data: data })
              }>
              <Text style={styles.word}>{item.word}</Text>
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
    borderColor: 'black',
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
