import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { theme } from '../theme';
import {
  EditIcon,
  RightArrow,
  UserIcon,
  VocabularyIcon,
} from '../components/Icons';
import { useNavigation } from '@react-navigation/native';
import { CUSTOM_WORDS_KEY } from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCOUNT_NAME_KEY, LEVEL_KEY, Levels } from './welcome/Welcome';
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

// TODO : add a dropdown where the level is chosen is saved into localStorage
export const Home = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');

  const getName = async () => {
    const rawName = await AsyncStorage.getItem(ACCOUNT_NAME_KEY);
    return rawName ? JSON.parse(rawName) : '';
  };

  const getLevel = async () => {
    const rawLevel = await AsyncStorage.getItem(LEVEL_KEY);
    return rawLevel ? JSON.parse(rawLevel) : '';
  };

  useEffect(() => {
    getName().then((name) => setName(name));
    getLevel().then((level) => setLevel(level));
  }, []);

  const saveName = async (name: string) => {
    setName(name);
    await AsyncStorage.setItem(ACCOUNT_NAME_KEY, JSON.stringify(name));
  };

  const saveLevel = async (level: string) => {
    setLevel(level);
    await AsyncStorage.setItem(LEVEL_KEY, JSON.stringify(level));
  };

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <UserIcon size={100} color="grey" />
      </View>
      <View style={styles.edit}>
        <TextInput
          style={styles.name}
          value={name}
          underlineColorAndroid="transparent"
          onChangeText={(name) => saveName(name)}
        />
        <View style={styles.editIcon}>
          <EditIcon />
        </View>
      </View>
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.navigate('My Vocabulary', {
            databaseKey: CUSTOM_WORDS_KEY,
          });
        }}>
        <View style={styles.icon}>
          <VocabularyIcon />
        </View>
        <Text style={styles.text}>My Vocabulary</Text>
        <View style={styles.arrow}>
          <RightArrow />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.navigate('My Flashcards', {
            color: 'white',
            databaseKey: CUSTOM_WORDS_KEY,
          });
        }}>
        <View style={styles.icon}>
          <VocabularyIcon />
        </View>
        <Text style={styles.text}>My Flashcards</Text>
        <View style={styles.arrow}>
          <RightArrow />
        </View>
      </TouchableOpacity>
      <View style={[styles.card, { justifyContent: 'flex-start' }]}>
        <View style={styles.icon}>
          <VocabularyIcon />
        </View>
        <Dropdown
          data={Levels}
          style={styles.level}
          labelField="value"
          valueField="label"
          search={false}
          onChange={(item) => saveLevel(item.value)}
          placeholder={level}
          placeholderStyle={{ fontSize: 22, paddingLeft: 5 }}
          selectedTextStyle={{ fontSize: 22, paddingLeft: 5 }}
          iconColor={theme.dark}
          itemContainerStyle={styles.level}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 12,
  },
  user: { alignSelf: 'center' },
  edit: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  editIcon: {
    paddingTop: 10,
  },
  name: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    paddingRight: 8,
    paddingBottom: 18,
  },
  card: {
    height: 48,
    backgroundColor: theme.white,
    marginHorizontal: 24,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 12,
  },
  text: {
    marginLeft: -108, // TODO : is there a better way to move text to the left?
    fontSize: 22,
  },
  arrow: {
    marginRight: 12,
  },
  level: {
    width: '85%',
    textAlign: 'center',
    borderBottomColor: theme.dark,
    paddingHorizontal: 12,
  },
});
