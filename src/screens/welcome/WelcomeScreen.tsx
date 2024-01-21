import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { theme } from '../../theme';
import { useNavigation } from '@react-navigation/native';

export interface DropdownData {
  label: string;
  value: string;
}

const Levels: any[] = [
  { label: 'a1', value: 'A1' },
  { label: 'a2', value: 'A2' },
  { label: 'b1', value: 'B1' },
  { label: 'b2', value: 'B2' },
  { label: 'c1', value: 'C1' },
  { label: 'c2', value: 'C2' },
];

export const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to LinguaBlitz!</Text>
      <Text style={styles.welcome}>Time to setup your account!</Text>
      <TouchableOpacity onPress={navigation.navigate('Name')}>
        <Text style={styles.button}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export const NameScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Add your name</Text>
      <TextInput />
      <TouchableOpacity onPress={navigation.navigate('Name')}>
        <Text style={styles.button}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export const LevelScreen = () => {
  const navigation = useNavigation();

  const saveLevel = (level: string) => {
    console.log('level saved: ', level);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Choose your level</Text>
      <Dropdown
        data={Levels}
        labelField="label"
        valueField="value"
        onChange={(item) => saveLevel(item.value)}
      />
      <TouchableOpacity onPress={navigation.navigate('Name')}>
        <Text style={styles.button}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
  },
  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: theme.primaryButton,
    fontSize: 28,
    width: 147,
    height: 45,
    borderRadius: 10,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
});
