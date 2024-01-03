import {
  Image,
  ImageSourcePropType,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

export interface BookItem {
  description: string;
  imageUrl: ImageSourcePropType;
  bookUrl: string;
}

export const BookItem: React.FC<BookItem> = ({
  description,
  imageUrl,
  bookUrl,
}) => {
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
