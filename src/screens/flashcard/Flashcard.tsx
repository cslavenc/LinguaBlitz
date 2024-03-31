import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
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
  hint: '',
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

export const Flashcard = ({ route }) => {
  const { item, category } = route.params;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [seenFlashcards, setSeenFlashcards] = useState<WordDetail[]>([]);
  const [currentFlashcard, setCurrentFlashcard] =
    useState<WordDetail>(initialState);
  const [endIsReached, setEndIsReached] = useState(false)

  // card flip animation states
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const [isFlipped, setIsFlipped] = useState(false);

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
      if (category) {
        preloadedWords = preloadedWords.filter(word => word.category === category)
      }
      const shuffledWords: WordDetail[] = shuffle(preloadedWords);

      setData(shuffledWords);
      if (shuffledWords.length > 0) {
        setCurrentFlashcard(shuffledWords[0]);
        setSeenFlashcards([shuffledWords[0]]);
      }
    };
    initializeData();
  }, [isFocused]);

  useEffect(() => {
    // executes only when pressing "Next" or "Previous" button
    if (item) {
      flipToFront(0);
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

    if (idx + 1 < data.length) {
      const next = data[idx + 1];
      navigation.navigate('My Flashcards', { item: next });
    } else {
      setEndIsReached(true)
    }
  };

  const handlePrevious = () => {
    const idx = seenFlashcards.findIndex(
      (seen: WordDetail) => seen.id === currentFlashcard.id
    );
    const previous = idx - 1 >= 0 ? seenFlashcards[idx - 1] : seenFlashcards[0];
    navigation.navigate('My Flashcards', { item: previous });
  };

  const flipToFront = (duration: number) => {
    Animated.timing(flipAnimation, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    }).start();
    setIsFlipped(false);
  };

  const flipToBack = () => {
    Animated.timing(flipAnimation, {
      toValue: 180,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsFlipped(true);
  };

  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };

  const backAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };

  const restart = () => {
    const shuffled = shuffle(seenFlashcards);
    setData(shuffled);
    setCurrentFlashcard(shuffled[0])
    setSeenFlashcards([shuffled[0]]);
    flipToFront(0);
    setEndIsReached(false);
    navigation.navigate('My Flashcards', { item: shuffled[0] });
  }

  return (
    <View>
      {!endIsReached ?
      data.length > 0 ? (
        <View style={styles.container}>
          <Text>
            {seenFlashcards.findIndex(
              (seen: WordDetail) => seen.id === currentFlashcard.id
            ) + 1}/{data.length}
          </Text>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              isFlipped ? flipToFront(300) : flipToBack();
            }}>
            <Animated.View
              style={[
                styles.animation,
                backAnimatedStyle,
                { position: 'absolute', width: '100%' },
              ]}>
              <View style={styles.title}>
                <Text style={styles.word}>{currentFlashcard.word}</Text>
                <Text style={styles.partOfSpeech}>
                  {currentFlashcard.partOfSpeech
                    ? `(${currentFlashcard.partOfSpeech})`
                    : ''}
                </Text>
              </View>
            </Animated.View>
            <Animated.View style={[styles.animation, frontAnimatedStyle]}>
              <View style={styles.title}>
                <Text style={styles.word}>
                  {currentFlashcard.hint ? (
                    <Text style={styles.hint}>{currentFlashcard.hint}</Text>
                  ) : (
                    <Text style={{ fontStyle: 'italic', fontSize: 24, }}>
                      no hint available
                    </Text>
                  )}
                </Text>
                <Text style={styles.partOfSpeech}>
                  {currentFlashcard.partOfSpeech
                    ? `(${currentFlashcard.partOfSpeech})`
                    : ''}
                </Text>
              </View>
            </Animated.View>
          </TouchableOpacity>
          <View style={styles.information}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ paddingBottom: 24 }}>
                <Text style={styles.heading}>Example</Text>
                <Text style={styles.text}>{currentFlashcard.example}</Text>
              </View>
            </ScrollView>
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity onPress={() => handlePrevious()}>
              <Text allowFontScaling={false} style={styles.button}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNext()}>
              <Text allowFontScaling={false} style={styles.button}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.noFlashcardsContainer}>
          <Text allowFontScaling={false} style={styles.noFlashcards}>
            You haven't added any flashcards yet! Head over to <Text style={{fontWeight: 'bold'}}>Categories</Text> and
            add flashcards from a word list.
          </Text>
        </View>
      )
      : <View style={[styles.container, { marginTop: 12 }]}>
          <Text allowFontScaling={false} style={styles.text}>You have reached the end! Do you want to try again?</Text>
          <View style={[styles.buttonGroup, { justifyContent: "center", marginTop: 24 }]}>
            <TouchableOpacity onPress={restart}>
              <Text allowFontScaling={false} style={[styles.button, { width: 160 }]}>Start again</Text>
            </TouchableOpacity>
          </View>
      </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 26,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  animation: {
    backfaceVisibility: 'hidden',
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
  hint: {
    fontWeight: "normal",
    fontSize: 24,
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
  noFlashcardsContainer: {
    height: '75%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  noFlashcards: {
    lineHeight: 30,
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 12,
  },
});
