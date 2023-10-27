import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  unstable_batchedUpdates,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const WordList = ({ route }) => {
  const { color } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={[styles.title, { backgroundColor: color }]}>
        <Text style={styles.name}>Word</Text>
        <Text style={styles.name}>(part of speech)</Text>
      </View>
      <Text style={styles.heading}>Description</Text>
      <Text style={styles.heading}>Example</Text>
      <Text style={styles.heading}>Synonyms</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.button]}>
          <Button title="Previous" color={color} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]}>
          <Button title="Next" color={color} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 26,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 50,
  },
  title: {
    height: 150,
    marginVertical: 12,
    padding: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  name: {
    textAlign: 'center',
    fontSize: 24,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 147,
    height: 45,
    borderRadius: 10,
    textAlign: 'center',
  },
});
