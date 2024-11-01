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
import { Dropdown } from 'react-native-element-dropdown';
import { theme } from '../../theme';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export const LEVEL_KEY = 'CURRENT_LEVEL';
export const ACCOUNT_NAME_KEY = 'CURRENT_ACCOUNT_NAME';

export const Levels: any[] = [
  { label: 'A1', value: 'A1 (Beginner)' },
  { label: 'A2', value: 'A2 (Elementary)' },
  { label: 'B1', value: 'B1 (Intermediate)' },
  { label: 'B2', value: 'B2 (Upper-Intermediate)' },
  { label: 'C1', value: 'C1 (Advanced)' },
  { label: 'C2', value: 'C2 (Expert)' },
];

export const Welcome = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to LinguaBlitz!</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Choose Name')}>
        <Text style={styles.button}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export const Name = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const maxNameLength = 15;

  const saveName = async (name: string) => {
    setName(name);
    await AsyncStorage.setItem(ACCOUNT_NAME_KEY, JSON.stringify(name));
  };

  const handleSave = (name: string) => {
    if (name.length <= maxNameLength) {
      setErrorMessage('');
      saveName(name);
    } else {
      setErrorMessage('Name is too long');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Enter your name</Text>
      <TextInput
        style={styles.name}
        underlineColorAndroid="transparent"
        onChangeText={(name) => handleSave(name)}
      />
      {errorMessage !== '' && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}

      <TouchableOpacity
        disabled={name === ''}
        onPress={() => navigation.navigate('Choose Level')}>
        <Text
          style={[styles.button, errorMessage !== '' ? styles.disabled : null]}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Function to reset the navigation stack
function resetNavigationStack(navigation, screenName) {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: screenName }],
  });
  navigation.dispatch(resetAction);
}

export const Level = () => {
  const navigation = useNavigation();
  const [level, setLevel] = useState('');

  const handleNavigation = () => {
    navigation.navigate('Overview');
    resetNavigationStack(navigation, 'Overview');
  };

  const saveLevel = async (level: string) => {
    setLevel(level);
    await AsyncStorage.setItem(LEVEL_KEY, JSON.stringify(level));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Choose your level</Text>
      <Dropdown
        data={Levels}
        style={styles.level}
        labelField="value"
        valueField="label"
        search={false}
        onChange={(item) => saveLevel(item.value)}
        placeholder={'Level'}
        placeholderStyle={{ color: 'grey', fontSize: 22, paddingLeft: 5 }}
        selectedTextStyle={{ fontSize: 22, paddingLeft: 5 }}
        itemTextStyle={{ fontSize: 20 }}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity onPress={() => handleNavigation()}>
        <Text style={[styles.button, level === '' ? styles.disabled : null]}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: '15%',
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
  errorMessage: {
    marginTop: -18,
    color: theme.primaryRed,
  },
  disabled: {
    backgroundColor: theme.disabled,
    color: 'grey',
  },
  name: {
    width: 120,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.dark,
    paddingHorizontal: 12,
    fontSize: 18,
  },
  level: {
    width: 290,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.dark,
    paddingHorizontal: 12,
    fontSize: 18,
  },
});
