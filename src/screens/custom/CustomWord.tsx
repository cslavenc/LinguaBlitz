import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { theme } from '../../theme';
import { Formik } from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface FormData {
  id: string;
  word: string;
  partOfSpeech: string;
  description: string;
  example: string;
  category: string;
  level: string;
  bookmark: boolean;
  flashcard: boolean;
}

const customWordValidationSchema = yup.object().shape({
  word: yup.string().required('Word is required'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
});

export const CUSTOM_WORDS_KEY = 'custom:words';

export const CustomWord = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Add your own word' });
  }, []);

  const initialValues: FormData = {
    id: '',
    word: '',
    partOfSpeech: '',
    description: '',
    example: '',
    category: '',
    level: 'custom',
    bookmark: true,
    flashcard: false,
  };

  const handleSave = async (values: FormData) => {
    values.id = uuid();
    try {
      const rawCustomWords = await AsyncStorage.getItem(CUSTOM_WORDS_KEY);
      const customWords: FormData[] = rawCustomWords
        ? JSON.parse(rawCustomWords)
        : [];
      customWords.push(values);
      await AsyncStorage.setItem(CUSTOM_WORDS_KEY, JSON.stringify(customWords));
    } catch (error) {
      throw new Error(error);
    } finally {
      values.id = ''; // reset so that the next entry does not carry the id over
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Formik<FormData>
        style={styles.form}
        initialValues={initialValues}
        validationSchema={customWordValidationSchema}
        onSubmit={(values) => handleSave(values)}>
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.heading}>Word</Text>
              <TextInput
                style={[styles.input, errors.word ? styles.errorInput : null]}
                underlineColorAndroid="transparent"
                name="word"
                onChangeText={handleChange('word')}
                onBlur={handleBlur('word')}
                value={values.word}
              />
              {errors.word && <Text style={styles.error}>{errors.word}</Text>}
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.heading}>Part of speech</Text>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                name="partOfSpeech"
                onChangeText={handleChange('partOfSpeech')}
                onBlur={handleBlur('partOfSpeech')}
                value={values.partOfSpeech}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.heading}>Description</Text>
              <TextInput
                textAlignVertical="top"
                multiline={true}
                style={[
                  styles.input,
                  errors.description ? styles.errorInput : null,
                  { height: 120 },
                ]}
                underlineColorAndroid="transparent"
                name="description"
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
              />
              {errors.description && (
                <Text style={styles.error}>{errors.description}</Text>
              )}
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.heading}>Example</Text>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                name="example"
                onChangeText={handleChange('example')}
                onBlur={handleBlur('example')}
                value={values.example}
              />
            </View>
            <View style={styles.inputGroup}>
              {/* TODO : use a dropdown or modal */}
              <Text style={styles.heading}>Category</Text>
              <TextInput
                style={[
                  styles.input,
                  errors.category ? styles.errorInput : null,
                ]}
                underlineColorAndroid="transparent"
                name="category"
                onChangeText={handleChange('category')}
                onBlur={handleBlur('category')}
                value={values.category}
              />
              {errors.category && (
                <Text style={styles.error}>{errors.category}</Text>
              )}
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text
                  style={[styles.button, { backgroundColor: theme.cancel }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmit}>
                <Text style={[styles.button, { backgroundColor: theme.save }]}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
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
    justifyContent: 'flex-start',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputGroup: {
    marginBottom: 18,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 18,
  },
  errorInput: {
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'red',
  },
  error: {
    fontStyle: 'italic',
    fontSize: 14,
    color: 'red',
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
