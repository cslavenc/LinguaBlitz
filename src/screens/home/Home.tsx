/*
 * Copyright (c) 2024 LinguaBlitz.
 */

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { theme } from '../../theme';
import {
  BookmarkFilledIcon,
  DownArrow,
  EditIcon,
  FlashcardFilledIcon,
  LevelIcon,
  RightArrow,
  UserIcon,
} from '../../components/Icons';
import { useNavigation } from '@react-navigation/native';
import { CUSTOM_WORDS_KEY } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCOUNT_NAME_KEY, LEVEL_KEY, Levels } from '../welcome/Welcome';
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

export const Home = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const maxNameLength = 15;

  const getName = async () => {
    const rawName = await AsyncStorage.getItem(ACCOUNT_NAME_KEY);
    return rawName ? JSON.parse(rawName) : '';
  };

  const getLevel = async () => {
    const rawLevel = await AsyncStorage.getItem(LEVEL_KEY);
    if (rawLevel) {
      setLevel(JSON.parse(rawLevel));
    } else {
      const placeholderLevel = 'B2 (Upper-Intermediate)';
      await AsyncStorage.setItem(LEVEL_KEY, JSON.stringify(placeholderLevel));
      setLevel(placeholderLevel);
    }
  };

  useEffect(() => {
    getName().then((name) => setName(name));
    getLevel();
  }, []);

  const saveName = async (name: string) => {
    if (name.length === 0) {
      setErrorMessage('Enter a name');
      setName(name);
      await AsyncStorage.setItem(ACCOUNT_NAME_KEY, JSON.stringify(name));
    } else if (name.length <= maxNameLength) {
      setErrorMessage('');
      setName(name);
      await AsyncStorage.setItem(ACCOUNT_NAME_KEY, JSON.stringify(name));
    } else {
      setErrorMessage('Name is too long');
    }
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
      {errorMessage !== '' && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
      <TouchableOpacity
        style={[styles.card, { justifyContent: 'flex-start' }]}
        onPress={() => {
          navigation.navigate('My Vocabulary', {
            databaseKey: CUSTOM_WORDS_KEY,
          });
        }}>
        <View style={styles.icon}>
          <BookmarkFilledIcon color={theme.primaryButton} />
        </View>
        <Text style={styles.text}>My Vocabulary</Text>
        <View style={styles.arrow}>
          <RightArrow />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.card, { justifyContent: 'flex-start' }]}
        onPress={() => {
          navigation.navigate('My Flashcards', {
            color: 'white',
            databaseKey: CUSTOM_WORDS_KEY,
          });
        }}>
        <View style={styles.icon}>
          <FlashcardFilledIcon color={theme.primaryButton} />
        </View>
        <Text style={styles.text}>My Flashcards</Text>
        <View style={styles.arrow}>
          <RightArrow />
        </View>
      </TouchableOpacity>
      <View style={[styles.card, { justifyContent: 'flex-start' }]}>
        <View style={styles.icon}>
          <LevelIcon />
        </View>
        <Dropdown
          data={Levels}
          style={styles.level}
          labelField="value"
          valueField="label"
          search={false}
          onChange={(item) => saveLevel(item.value)}
          placeholder={level}
          placeholderStyle={{ fontSize: 22, paddingLeft: 0 }}
          selectedTextStyle={{ fontSize: 22, paddingLeft: 0 }}
          iconColor={theme.dark}
          itemContainerStyle={[
            styles.level,
            { width: '100%', paddingHorizontal: 0 },
          ]}
          itemTextStyle={{ fontSize: 20 }}
          showsVerticalScrollIndicator={false}
          renderRightIcon={DownArrow}
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
    marginHorizontal: 18, // previously: 24
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: '12%',
    paddingLeft: 12,
    paddingRight: 12,
  },
  text: {
    width: '80%',
    fontSize: 22,
  },
  arrow: {
    width: '5%',
  },
  level: {
    width: '88%',
    textAlign: 'center',
    borderBottomColor: theme.dark,
    paddingRight: 12,
  },
  errorMessage: {
    textAlign: 'center',
    marginTop: -32,
    color: theme.primaryRed,
  },
});
