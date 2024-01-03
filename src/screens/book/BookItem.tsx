import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

export interface BookItem {
  description: string;
  imageUrl: string;
  bookUrl: string;
}

export const BookItem = () => {
  let description =
    "A three-level (B1+ to C1) integrated skills course for higher education students at university or on foundation courses. The C1 Advanced Student's Book consolidates academic study skills. Students' analytical skills are challenged with an increased range of authentic written and spoken academic texts.";
  let imageUrl = require('../../../assets/lb-recommended-book-c1.jpg');
  let bookUrl =
    'https://www.amazon.com/Cambridge-Academic-English-Advanced-Students/dp/0521165210/ref=sr_1_1?keywords=cambridge+english+c1&sr=8-1';

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => Linking.openURL(bookUrl)}>
      <Image resizeMode="cover" source={imageUrl} style={styles.image} />
      <Text style={styles.text}>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: { height: 150, width: 100 },
  text: {
    flexShrink: 1,
  },
});
