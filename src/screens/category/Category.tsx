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
  const { category, color } = route.params;

  useEffect(() => {
    navigation.setOptions({ headerTitle: category });
  }, [category]);

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
    marginHorizontal: 20,
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
  },
});
