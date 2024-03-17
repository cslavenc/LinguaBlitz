import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlashcardsIcon, VocabularyListIcon } from './CategoryIcons';
import { theme } from '../../theme';
import {
  Category as CategoryEnum,
  categoryValues,
  CUSTOM_WORDS_KEY,
} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CATEGORY_KEY } from './CategoryItem';

export const Category = () => {
  const navigation = useNavigation();
  const [category, setCategory] = useState('');

  useEffect(() => {
    const getCurrentCategory = async () => {
      try {
        const currentCategory = await AsyncStorage.getItem(CATEGORY_KEY);
        if (currentCategory != null) {
          setCategory(currentCategory);
          navigation.setOptions({ headerTitle: category });
        }
      } catch (e) {
        console.error(e);
      }
    };
    getCurrentCategory();
  }, [category]);

  const handleNavigate = async (location, newCategory) => {
    await AsyncStorage.setItem(CATEGORY_KEY, newCategory);
    setCategory(newCategory);
    navigation.navigate(location, { category: newCategory });
  };

  const handleNext = () => {
    const idx = categoryValues.findIndex((current) => current === category);
    const next =
      idx + 1 < categoryValues.length
        ? categoryValues[idx + 1]
        : categoryValues[0];
    handleNavigate('Category', next);
  };

  const handlePrevious = () => {
    const idx = categoryValues.findIndex((current) => current === category);
    const previous =
      idx - 1 >= 0
        ? categoryValues[idx - 1]
        : categoryValues[categoryValues.length - 1];
    handleNavigate('Category', previous);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.wordList}
        onPress={() =>
          category !== CategoryEnum.MY_VOCABULARY ||
          category !== CategoryEnum.OTHERS
            ? handleNavigate('Word list', category)
            : navigation.navigate('My Vocabulary', {
                databaseKey: CUSTOM_WORDS_KEY,
              })
        }>
        <VocabularyListIcon />
        <Text style={[styles.text, { color: theme.primaryBlue }]}>
          Vocabulary
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.wordList}
        onPress={() => navigation.navigate('Word list')}>
        <FlashcardsIcon />
        <Text style={[styles.text, { color: theme.primaryRed }]}>
          Flashcards
        </Text>
      </TouchableOpacity>
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
  wordList: {
    height: 120,
    elevation: 5,
    marginVertical: 18,
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme.white,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  container: {
    marginHorizontal: 28,
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
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
