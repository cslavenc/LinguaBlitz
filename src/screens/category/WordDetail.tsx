import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  BookmarkFilledIcon,
  BookmarkPlusIcon,
  FlashcardFilledIcon,
  FlashcardIcon,
} from '../../components/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../../theme';
import { CUSTOM_WORDS_KEY, PRELOADED_WORDS_KEY } from '../../utils';

export interface WordDetail {
  id: string;
  word: string;
  level: string;
  description: string;
  example: string;
  partOfSpeech: string;
  category: string;
  synonyms: string[];
  flashcard: boolean;
  bookmark: boolean;
}

export const WordDetail = ({ route }) => {
  const { item, data } = route.params;
  const navigation = useNavigation();

  const word = item.word;
  const partOfSpeech = item.partOfSpeech;
  const descriptions = item.description.split('\n');
  const example = item.example.trim();
  const synonyms = item.synonyms;
  const [bookmark, setBookmark] = useState<boolean>(false);
  const [flashcard, setFlashcard] = useState<boolean>(false);

  useEffect(() => {
    const getBookmarkAndFlashcard = async () => {
      try {
        const rawWords = await AsyncStorage.getItem(PRELOADED_WORDS_KEY);
        const words: WordDetail[] = rawWords ? JSON.parse(rawWords) : [];
        const wordIdx = words.findIndex((word) => word.id === item.id);

        if (wordIdx >= 0) {
          // if bookmarks or flashcards were saved previously
          setFlashcard(words[wordIdx].flashcard);
          setBookmark(words[wordIdx].bookmark);
        } else {
          setFlashcard(item.flashcard);
          setBookmark(item.bookmark);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getBookmarkAndFlashcard();
  }, [route]);

  useEffect(() => {
    navigation.setOptions({ headerTitle: word.split(' (')[0] });
  }, [word]);

  const handleNext = () => {
    const idx = data.findIndex((current: WordDetail) => current.id === item.id);
    const next = idx + 1 < data.length ? data[idx + 1] : data[0];
    navigation.navigate('Word', { item: next, data });
  };

  const handlePrevious = () => {
    const idx = data.findIndex((current: WordDetail) => current.id === item.id);
    const previous = idx - 1 >= 0 ? data[idx - 1] : data[data.length - 1];
    navigation.navigate('Word', { item: previous, data });
  };

  const handleBookmark = async () => {
    setBookmark(!bookmark);

    if (item.level.toLowerCase().includes('custom')) {
      try {
        const rawWords = await AsyncStorage.getItem(CUSTOM_WORDS_KEY);
        const words: WordDetail[] = rawWords ? JSON.parse(rawWords) : [];

        words.map((word) => {
          if (word.id === item.id) {
            word.bookmark = !bookmark;
          }
        });

        await AsyncStorage.setItem(CUSTOM_WORDS_KEY, JSON.stringify(words));
      } catch (error) {
        throw new Error(error);
      }
    } else {
      try {
        const rawWords = await AsyncStorage.getItem(PRELOADED_WORDS_KEY);
        const words: WordDetail[] = rawWords ? JSON.parse(rawWords) : [];

        const present = words.find((word) => word.id === item.id);
        if (!present) {
          item.bookmark = !bookmark;
          item.flashcard = flashcard;
          words.push(item);
        } else {
          words.map((word) => {
            if (word.id === item.id) {
              word.bookmark = !bookmark;
            }
          });
        }

        await AsyncStorage.setItem(PRELOADED_WORDS_KEY, JSON.stringify(words));
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  const handleFlashcard = async () => {
    setFlashcard(!flashcard);

    if (item.level.toLowerCase().includes('custom')) {
      try {
        const rawCustomWords = await AsyncStorage.getItem(CUSTOM_WORDS_KEY);
        const customWords: WordDetail[] = rawCustomWords
          ? JSON.parse(rawCustomWords)
          : [];

        customWords.map((word) => {
          if (word.id === item.id) {
            word.flashcard = !flashcard;
          }
        });

        await AsyncStorage.setItem(
          CUSTOM_WORDS_KEY,
          JSON.stringify(customWords)
        );
      } catch (error) {
        throw new Error(error);
      }
    } else {
      try {
        const rawWords = await AsyncStorage.getItem(PRELOADED_WORDS_KEY);
        const words: WordDetail[] = rawWords ? JSON.parse(rawWords) : [];

        const present = words.find((word) => word.id === item.id);
        if (!present) {
          item.bookmark = !bookmark;
          item.flashcard = flashcard;
          words.push(item);
        } else {
          words.map((word) => {
            if (word.id === item.id) {
              word.flashcard = !flashcard;
            }
          });
        }

        await AsyncStorage.setItem(PRELOADED_WORDS_KEY, JSON.stringify(words));
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.title, { backgroundColor: theme.secondaryBlue }]}>
        <View style={styles.icons}>
          <TouchableOpacity
            onPress={handleFlashcard}
            activeOpacity={1}
            style={{ paddingRight: 4 }}>
            {flashcard ? <FlashcardFilledIcon /> : <FlashcardIcon />}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBookmark} activeOpacity={1}>
            {bookmark ? <BookmarkFilledIcon /> : <BookmarkPlusIcon />}
          </TouchableOpacity>
        </View>
        <Text style={styles.word}>{word}</Text>
        <Text style={styles.partOfSpeech}>
          {partOfSpeech ? `(${partOfSpeech})` : ''}
        </Text>
      </View>
      <View style={styles.information}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {descriptions.length > 0 ? (
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
          ) : null}
          {example !== '' ? (
            <View style={{ paddingBottom: 24 }}>
              <Text style={styles.heading}>Example</Text>
              <Text style={styles.text}>{example}</Text>
            </View>
          ) : null}
          {synonyms !== null ? (
            <View style={{ paddingBottom: 24 }}>
              <Text style={styles.heading}>Synonyms</Text>
              {synonyms.map((synonym) => (
                <View style={{ flexDirection: 'row' }} key={synonym}>
                  <Text style={styles.text}>{'\u2022'}</Text>
                  <Text style={[styles.text, styles.unorderedList]}>
                    {synonym.trim()}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}
        </ScrollView>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={() => handlePrevious()}>
          <Text
            style={[styles.button, { backgroundColor: theme.primaryButton }]}>
            Previous
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNext()}>
          <Text
            style={[styles.button, { backgroundColor: theme.primaryButton }]}>
            Next
          </Text>
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
