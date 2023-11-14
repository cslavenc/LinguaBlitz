import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { BookmarkFilledIcon, BookmarkPlusIcon } from '../../components/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CUSTOM_WORDS_KEY, FormData } from '../custom/CustomWord';

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
  const descriptions = item.description.split('\n');
  const example = item.example.trim();
  const [bookmark, setBookmark] = useState<boolean>(item.bookmark);

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

  const handleBookmark = async () => {
    setBookmark(!bookmark);

    if (item.level.toLowerCase().includes('custom')) {
      try {
        const rawCustomWords = await AsyncStorage.getItem(CUSTOM_WORDS_KEY);
        const customWords: FormData[] = rawCustomWords
          ? JSON.parse(rawCustomWords)
          : [];

        customWords.map((word) => {
          if (word.id === item.id) {
            word.bookmark = !bookmark;
          }
        });

        await AsyncStorage.setItem(
          CUSTOM_WORDS_KEY,
          JSON.stringify(customWords)
        );
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.title, { backgroundColor: color }]}>
        <View style={styles.icons}>
          <TouchableOpacity onPress={handleBookmark} activeOpacity={1}>
            {bookmark ? <BookmarkFilledIcon /> : <BookmarkPlusIcon />}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBookmark} activeOpacity={1}>
            <BookmarkPlusIcon />
          </TouchableOpacity>
        </View>
        <Text style={styles.word}>{word}</Text>
        <Text style={styles.partOfSpeech}>
          {partOfSpeech ? `(${partOfSpeech})` : ''}
        </Text>
      </View>
      <View style={styles.information}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingBottom: 18 }}>
            <Text style={styles.heading}>Description</Text>
            {descriptions.map((content) => (
              <View style={{ flexDirection: 'row' }} key={content}>
                <Text style={styles.text}>{'\u2022'}</Text>
                <Text style={[styles.text, styles.unorderedList]}>
                  {content.trim()}
                </Text>
              </View>
            ))}
          </View>
          <View style={{ paddingBottom: 24 }}>
            <Text style={styles.heading}>Example</Text>
            <Text style={styles.text}>{example}</Text>
          </View>
          <View style={{ paddingBottom: 24 }}>
            <Text style={styles.heading}>Synonyms</Text>
            <Text style={styles.text}>synonyms go here</Text>
          </View>
        </ScrollView>
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
  icons: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: '7%',
    right: '4%',
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
    fontSize: 22,
    fontWeight: 'bold',
  },
  name: {
    paddingTop: 18,
    fontSize: 24,
  },
  word: {
    paddingTop: 18,
    fontSize: 28,
    fontWeight: 'bold',
  },
  partOfSpeech: {
    paddingTop: 18,
    fontSize: 24,
    fontStyle: 'italic',
  },
  information: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 100,
  },
  text: {
    fontSize: 18,
  },
  unorderedList: {
    flex: 1,
    paddingLeft: 5,
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
