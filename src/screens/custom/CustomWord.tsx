import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { theme } from '../../theme';

export const CustomWord = ({ route }) => {
  const navigation = useNavigation();
  const { color } = route.params;

  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Add your own word' });
  }, []);

  const handleSave = () => {
    console.log('save button pressed');
  };

  // TODO : use a form
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View>
          <Text style={styles.text}>Word</Text>
          <TextInput style={styles.input} underlineColorAndroid="transparent" />
        </View>
        <View>
          <Text style={styles.text}>Part of speech</Text>
          <TextInput style={styles.input} underlineColorAndroid="transparent" />
        </View>
        <View>
          <Text style={styles.text}>Description</Text>
          <TextInput
            textAlignVertical="top"
            multiline={true}
            style={[styles.input, { height: 120 }]}
            underlineColorAndroid="transparent"
          />
        </View>
        <View>
          <Text style={styles.text}>Example</Text>
          <TextInput style={styles.input} underlineColorAndroid="transparent" />
        </View>
        <View>
          {/* TODO : use a dropdown or modal */}
          <Text style={styles.text}>Category</Text>
          <TextInput style={styles.input} underlineColorAndroid="transparent" />
        </View>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.button, { backgroundColor: theme.cancel }]}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave}>
          <Text style={[styles.button, { backgroundColor: theme.save }]}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginHorizontal: 36,
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 24,
    paddingHorizontal: 12,
    fontSize: 18,
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
