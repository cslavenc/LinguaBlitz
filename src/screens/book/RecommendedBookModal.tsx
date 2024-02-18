import {
  Image,
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BookData } from './BookData';
import { useState } from 'react';

export const RecommendedBookModal = () => {
  const [visibility, setVisibility] = useState(true);

  const scale = 9; // transform to single digit integers
  const bookIdx = Math.floor(
    (Math.random().toPrecision(1) * scale) / BookData.length
  );
  const { description, imageUrl, bookUrl } =
    BookData[bookIdx < BookData.length ? bookIdx : BookData.length - 1];

  const closeModal = () => {
    setVisibility(false);
  };

  return (
    <Modal
      style={styles.container}
      visible={visibility}
      animationType="slide"
      transparent={false}>
      <View style={styles.modal}>
        <TouchableOpacity
          onPress={closeModal}
          style={styles.crossButton}
          activeOpacity={1}>
          <View style={styles.crossLine} />
          <View style={[styles.crossLine, styles.crossLineVertical]} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => Linking.openURL(bookUrl)}>
          <Image resizeMode="cover" source={imageUrl} style={styles.image} />
          <Text style={styles.text}>{description}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    marginTop: '35%',
    marginHorizontal: 32,
    gap: 16,
    borderRadius: 10,
  },
  crossButton: {
    width: 24,
    height: 24,
    alignSelf: 'flex-end',
    display: 'flex',
    textAlign: 'right',
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossLine: {
    position: 'absolute',
    width: 16,
    height: 2,
    backgroundColor: 'black',
    transform: [{ rotate: '45deg' }],
  },
  crossLineVertical: {
    transform: [{ rotate: '-45deg' }],
  },
  touchable: {
    gap: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: { height: 180, width: 120 },
  text: {
    fontSize: 16,
    flexShrink: 1,
    textAlign: 'justify',
  },
});
