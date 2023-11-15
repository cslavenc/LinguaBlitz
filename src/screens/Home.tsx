import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../theme';
import { RightArrow, UserIcon, VocabularyIcon } from '../components/Icons';
import { useNavigation } from '@react-navigation/native';
import { CUSTOM_WORDS_KEY } from './custom/CustomWord';

export const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <UserIcon size={100} color="black" />
      </View>
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.navigate('My Vocabulary', {
            color: 'white',
            databaseKey: CUSTOM_WORDS_KEY,
          });
        }}>
        <View style={styles.icon}>
          <VocabularyIcon />
        </View>
        <Text style={styles.text}>My Vocabulary</Text>
        <View style={styles.arrow}>
          <RightArrow />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.navigate('My Flashcards', {
            color: 'yellow',
            databaseKey: CUSTOM_WORDS_KEY,
          });
        }}>
        <View style={styles.icon}>
          <VocabularyIcon />
        </View>
        <Text style={styles.text}>My Flashcards</Text>
        <View style={styles.arrow}>
          <RightArrow />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 12,
  },
  user: { alignSelf: 'center', paddingBottom: 24 },
  card: {
    height: 48,
    backgroundColor: theme.white,
    marginHorizontal: 24,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 12,
  },
  text: {
    marginLeft: -108, // TODO : is there a better way to move text to the left?
    fontSize: 22,
  },
  arrow: {
    marginRight: 12,
  },
});
