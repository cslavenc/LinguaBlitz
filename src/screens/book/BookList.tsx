import { StyleSheet, View } from 'react-native';
import { BookItem } from './BookItem';
import { BookData } from './BookData';

export const BookList = () => {
  return (
    <View style={styles.container}>
      {BookData.map((book) => (
        <BookItem
          description={book.description}
          imageUrl={book.imageUrl}
          bookUrl={book.bookUrl}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 24,
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
