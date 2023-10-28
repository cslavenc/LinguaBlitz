import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import c1Data from '../../data/C1_english_vocabulary.json';
import { WordDetail } from './WordDetail';

export const WordList = ({ route }) => {
  const { color } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={c1Data}
        renderItem={({ item }: ListRenderItemInfo<WordDetail>) => (
          <View style={styles.item}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Word', { color, item })}>
              <Text style={styles.word}>
                {item.partOfSpeech === 'verb' ? 'to ' : ''}
                {item.word}
              </Text>
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
  item: {
    paddingVertical: 10,
    borderBottomWidth: 0.25,
    borderStyle: 'solid',
    borderColor: 'black',
    display: 'flex',
    flexDirection: 'column',
  },
  word: { textAlign: 'center', fontSize: 18 },
});
