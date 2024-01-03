import { StyleSheet, View } from 'react-native';
import { BookItem } from './BookItem';

export const Book = () => {
  return (
    <View style={styles.container}>
      <BookItem />
      <BookItem />
      <BookItem />
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
