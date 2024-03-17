import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  BookmarkFilledIcon,
  BookmarkPlusIcon,
  FlashcardFilledIcon,
  FlashcardIcon,
} from '../../components/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WordDetail } from '../category/WordDetail';
import { CUSTOM_WORDS_KEY, PRELOADED_WORDS_KEY } from '../../utils';
import { theme } from '../../theme';

const initialState: WordDetail = {
  id: '',
  word: '',
  partOfSpeech: '',
  description: '',
  example: '',
  category: '',
  level: 'custom',
  synonyms: [],
  bookmark: false,
  flashcard: true,
};

export const shuffle = (original) => {
  let array = [...original]; // preserve the original array
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// TODO : if there are no flashcards, add a hint to go to a word list and flashcard some of them (add the icon as a hint)
export const Flashcard = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [seenFlashcards, setSeenFlashcards] = useState<WordDetail[]>([]);
  const [currentFlashcard, setCurrentFlashcard] =
    useState<WordDetail>(initialState);
  const [bookmark, setBookmark] = useState<boolean>(false);
  const [flashcard, setFlashcard] = useState<boolean>(true);

  useEffect(() => {
    const initializeData = async () => {
      let customWords: WordDetail[];
      let preloadedWords: WordDetail[];

      const rawCustomWords = await AsyncStorage.getItem(CUSTOM_WORDS_KEY);
      customWords = rawCustomWords ? JSON.parse(rawCustomWords) : [];
      customWords = customWords.filter((word) => word.flashcard);

      const rawPreloadedWords = await AsyncStorage.getItem(PRELOADED_WORDS_KEY);
      preloadedWords = rawPreloadedWords ? JSON.parse(rawPreloadedWords) : [];
      preloadedWords = preloadedWords.filter((word) => word.flashcard);

      preloadedWords.push(...customWords);
      const shuffledWords = shuffle(preloadedWords);

      setData(shuffledWords);
      setCurrentFlashcard(shuffledWords[0]);
      setSeenFlashcards([shuffledWords[0]]);
    };
    initializeData();
  }, [isFocused]);

  useEffect(() => {
    // executes only when pressing "Next" or "Previous" button
    if (item) {
      setCurrentFlashcard(item);
      if (!seenFlashcards.find((flashcard) => flashcard.id === item.id)) {
        seenFlashcards.push(item);
        setSeenFlashcards(seenFlashcards);
      }
    }
  }, [item]);

  const handleNext = () => {
    const idx = data.findIndex(
      (current: WordDetail) => current.id === currentFlashcard.id
    );
    const next = idx + 1 < data.length ? data[idx + 1] : data[0];
    navigation.navigate('My Flashcards', { item: next });
  };

  const handlePrevious = () => {
    const idx = data.findIndex(
      (current: WordDetail) => current.id === currentFlashcard.id
    );
    const previous = idx - 1 >= 0 ? data[idx - 1] : data[data.length - 1];
    navigation.navigate('My Flashcards', { item: previous });
  };

  const handleBookmark = async () => {
    setBookmark(!bookmark);

    if (currentFlashcard.level.toLowerCase().includes('custom')) {
      try {
        const rawCustomWords = await AsyncStorage.getItem(CUSTOM_WORDS_KEY);
        const customWords: WordDetail[] = rawCustomWords
          ? JSON.parse(rawCustomWords)
          : [];

        customWords.map((word) => {
          if (word.id === currentFlashcard.id) {
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
    } else {
      try {
        const rawPreloadedWords =
          await AsyncStorage.getItem(PRELOADED_WORDS_KEY);
        const preloadedWords: WordDetail[] = rawPreloadedWords
          ? JSON.parse(rawPreloadedWords)
          : [];

        preloadedWords.map((word) => {
          if (word.id === currentFlashcard.id) {
            word.bookmark = !bookmark;
          }
        });

        await AsyncStorage.setItem(
          PRELOADED_WORDS_KEY,
          JSON.stringify(preloadedWords)
        );
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  const handleFlashcard = async () => {
    setFlashcard(!flashcard);

    if (currentFlashcard.level.toLowerCase().includes('custom')) {
      try {
        const rawCustomWords = await AsyncStorage.getItem(CUSTOM_WORDS_KEY);
        const customWords: WordDetail[] = rawCustomWords
          ? JSON.parse(rawCustomWords)
          : [];

        customWords.map((word) => {
          if (word.id === currentFlashcard.id) {
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
        const rawPreloadedWords =
          await AsyncStorage.getItem(PRELOADED_WORDS_KEY);
        const preloadedWords: WordDetail[] = rawPreloadedWords
          ? JSON.parse(rawPreloadedWords)
          : [];

        preloadedWords.map((word) => {
          if (word.id === currentFlashcard.id) {
            word.flashcard = !flashcard;
          }
        });

        await AsyncStorage.setItem(
          PRELOADED_WORDS_KEY,
          JSON.stringify(preloadedWords)
        );
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  // TODO : use shuffle function
  const resetFlashcards = () => {
    setSeenFlashcards([]);
    let nextFlashcard: WordDetail;
    do {
      let idx = getRandomInteger(0, data.length - 1);
      nextFlashcard = data[idx];
    } while (seenFlashcards.some((card) => card.id === nextFlashcard.id));
    setSeenFlashcards(seenFlashcards.push(nextFlashcard));
    setCurrentFlashcard(nextFlashcard);
  };

  return (
    <View style={styles.container}>
      <Text>
        {seenFlashcards.length}/{data.length}
      </Text>
      <View style={styles.title}>
        <View style={styles.icons}>
          <TouchableOpacity onPress={handleFlashcard} activeOpacity={1}>
            {currentFlashcard.flashcard ? (
              <FlashcardFilledIcon />
            ) : (
              <FlashcardIcon />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBookmark} activeOpacity={1}>
            {currentFlashcard.bookmark ? (
              <BookmarkFilledIcon />
            ) : (
              <BookmarkPlusIcon />
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.word}>{currentFlashcard.word}</Text>
        <Text style={styles.partOfSpeech}>
          {currentFlashcard.partOfSpeech
            ? `(${currentFlashcard.partOfSpeech})`
            : ''}
        </Text>
      </View>
      <View style={styles.information}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/*<View style={{ paddingBottom: 18 }}>*/}
          {/*  <Text style={styles.heading}>Description</Text>*/}
          {/*  {descriptions.map((content) => (*/}
          {/*    <View style={{ flexDirection: 'row' }} key={content}>*/}
          {/*      <Text style={styles.text}>{'\u2022'}</Text>*/}
          {/*      <Text style={[styles.text, styles.unorderedList]}>*/}
          {/*        {content.trim()}*/}
          {/*      </Text>*/}
          {/*    </View>*/}
          {/*  ))}*/}
          {/*</View>*/}
          <View style={{ paddingBottom: 24 }}>
            <Text style={styles.heading}>Example</Text>
            <Text style={styles.text}>{currentFlashcard.example}</Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={() => handlePrevious()}>
          <Text style={styles.button}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNext()}>
          <Text style={styles.button}>Next</Text>
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
    backgroundColor: theme.secondaryBlue,
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
    backgroundColor: theme.primaryButton,
    fontSize: 28,
    width: 147,
    height: 45,
    borderRadius: 10,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
});
