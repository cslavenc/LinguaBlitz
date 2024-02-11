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
import { CUSTOM_WORDS_KEY } from '../../utils';

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const initialState: WordDetail = {
  id: '',
  word: '',
  partOfSpeech: '',
  description: '',
  example: '',
  category: '',
  level: 'custom',
  synonyms: [],
  bookmark: true,
  flashcard: true,
};

export const Flashcard = ({ route }) => {
  const { color } = route.params;
  const databaseKey = CUSTOM_WORDS_KEY;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [seenFlashcards, setSeenFlashcards] = useState([]);
  const [currentFlashcard, setCurrentFlashcard] =
    useState<WordDetail>(initialState);
  let word;
  let partOfSpeech;
  let descriptions;
  let example;
  const [bookmark, setBookmark] = useState<boolean>(false);
  const [flashcard, setFlashcard] = useState<boolean>(true);

  const fetchData = async () => {
    let parsed: WordDetail[];
    if (databaseKey) {
      const result = await AsyncStorage.getItem(databaseKey);
      parsed = result ? JSON.parse(result) : [];
      parsed = parsed.filter((item) => item.flashcard);
      console.log('my parsed data: ', parsed);
    } else {
      parsed = [];
    }
    setData(parsed);
    return parsed;
  };

  useEffect(() => {
    console.log('called useeffect');
    fetchData().then((data) => {
      console.log('my res', data);
      console.log('data after fetching: ', data);
      const randomIdx = getRandomInteger(0, data.length - 1);
      console.log(randomIdx);
      console.log('my first random flashcard: ', data[randomIdx]);
      setCurrentFlashcard(data[randomIdx]);
      setSeenFlashcards([data[randomIdx]]);
      word = data[randomIdx].word;
      partOfSpeech = data[randomIdx].partOfSpeech;
      console.log('my description: ', data[randomIdx].word.split('\n'));
      descriptions = data[randomIdx].description.split('\n');
      example = data[randomIdx].example.trim();
    });
  }, [isFocused]);

  useEffect(() => {
    console.log('data in next useeffect: ', data);
  });

  useEffect(() => {
    console.log(currentFlashcard);
    navigation.setOptions({
      headerTitle: currentFlashcard.word.split(' (')[0],
    });
  }, [word]);

  const handleNext__ = () => {
    const idx = data.findIndex(
      (current: WordDetail) => current.id === currentFlashcard.id
    );
    const next = idx + 1 < data.length ? data[idx + 1] : data[0];
    navigation.navigate('Word', { color, item: next, data });
  };

  const handleNext = () => {
    let nextFlashcard: WordDetail;
    do {
      let idx = getRandomInteger(0, data.length - 1);
      nextFlashcard = data[idx];
    } while (seenFlashcards.some((card) => card.id === nextFlashcard.id));
    console.log('my next valid flashcard: ', nextFlashcard);
    console.log('which was not found in seen flashcards: ', seenFlashcards);
    setSeenFlashcards(seenFlashcards.push(nextFlashcard));
    setCurrentFlashcard(nextFlashcard);
  };

  const handlePrevious = () => {
    const idx = data.findIndex(
      (current: WordDetail) => current.id === currentFlashcard.id
    );
    const previous = idx - 1 > 0 ? data[idx - 1] : data[data.length - 1];
    navigation.navigate('Word', { color, item: previous, data });
  };

  const handlePrevious_ = () => {
    const idx = seenFlashcards.findIndex(
      (current: WordDetail) => current.id === currentFlashcard.id
    );
    const previous =
      idx - 1 > 0
        ? seenFlashcards[idx - 1]
        : seenFlashcards[seenFlashcards.length - 1];
    navigation.navigate('Word', { color, item: previous, seenFlashcards });
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
    }
  };

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
      <View style={[styles.title, { backgroundColor: color }]}>
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
          {partOfSpeech ? `(${currentFlashcard.partOfSpeech})` : ''}
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
