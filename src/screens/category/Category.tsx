import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import {
  FlashcardsIcon,
  VocabularyListIcon,
} from '../../components/CategoryIcons';
import { theme } from '../../theme';

export const Category = ({ route }) => {
  const navigation = useNavigation();
  const { category } = route.params;
  const categories = Object.values(Category);

  useEffect(() => {
    navigation.setOptions({ headerTitle: category });
  }, [category]);

  const handleNext = () => {};

  const handlePrevious = () => {};

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.wordList}
        onPress={() => navigation.navigate('Word list', { color })}>
        <VocabularyListIcon />
        <Text style={[styles.text, { color: theme.primaryBlue }]}>
          Vocabulary
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.wordList}
        onPress={() => navigation.navigate('Word list', { color })}>
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
