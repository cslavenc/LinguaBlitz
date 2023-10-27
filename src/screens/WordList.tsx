import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
      <View style={styles.information}>
        <View>
          <View style={{ height: '33%' }}>
            <Text style={styles.heading}>Description</Text>
            <Text>description goes here</Text>
          </View>
          <View style={{ height: '33%' }}>
            <Text style={styles.heading}>Example</Text>
            <Text>examples go here</Text>
          </View>
          <View style={{ height: '33%' }}>
            <Text style={styles.heading}>Synonyms</Text>
            <Text>synonyms go here</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity>
          <Text style={[styles.button, { backgroundColor: color }]}>
            Previous
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.button, { backgroundColor: color }]}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 26,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  title: {
    height: 150,
    elevation: 5,
    marginVertical: 12,
    marginBottom: 25,
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
  information: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 100,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    fontSize: 28,
    width: 147,
    height: 45,
    borderRadius: 10,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
});
