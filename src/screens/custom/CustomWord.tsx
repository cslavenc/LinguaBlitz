import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { theme } from '../../theme';
import { Formik } from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import { CategoryData, CUSTOM_WORDS_KEY } from '../../utils';
import { WordDetail } from '../category/WordDetail';

const customWordValidationSchema = yup.object().shape({
  word: yup.string().required('Word is required'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
  hint: yup.string().max(50, 'Hint is too long'),
});

const initialValues: WordDetail = {
  id: '',
  word: '',
  partOfSpeech: '',
  description: '',
  example: '',
  hint: '',
  category: '',
  level: 'custom',
  synonyms: [],
  bookmark: false,
  flashcard: false,
};

export const CustomWord = () => {
  const navigation = useNavigation();
  const [categoryValue, setCategoryValue] = useState(null);
  const [isCategoryFocused, setIsCategoryFocused] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Add your own word' });
  }, []);

  const handleSave = async (values: WordDetail, resetForm) => {
    values.id = uuid();
    Object.keys(values).map((key) => {
      if (typeof values[key] === 'string') {
        values[key] = values[key].trim();
      }
    });

    try {
      const rawCustomWords = await AsyncStorage.getItem(CUSTOM_WORDS_KEY);
      const customWords = rawCustomWords ? JSON.parse(rawCustomWords) : [];
      customWords.push(values);
      const item = values;
      await AsyncStorage.setItem(CUSTOM_WORDS_KEY, JSON.stringify(customWords));

      navigation.navigate('Word', {
        item: item,
        data: customWords,
      });
    } catch (error) {
      throw new Error(error);
    } finally {
      // reset so that the next entry does not carry over the values
      resetForm();
      setCategoryValue(null);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Formik<WordDetail>
        style={styles.form}
        initialValues={initialValues}
        validationSchema={customWordValidationSchema}
        onSubmit={(values, { resetForm }) => handleSave(values, resetForm)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
          setFieldValue,
          setFieldTouched,
        }) => (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.heading}>Word</Text>
              <TextInput
                style={[
                  styles.input,
                  errors.word && touched.word ? styles.errorInput : null,
                ]}
                underlineColorAndroid="transparent"
                name="word"
                onChangeText={handleChange('word')}
                onBlur={handleBlur('word')}
                value={values.word}
              />
              {errors.word && touched.word && (
                <Text style={styles.error}>{errors.word}</Text>
              )}
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
                  errors.description && touched.description
                    ? styles.errorInput
                    : null,
                  { height: 120 },
                ]}
                underlineColorAndroid="transparent"
                name="description"
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
              />
              {errors.description && touched.description && (
                <Text style={styles.error}>{errors.description}</Text>
              )}
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.heading}>Hint for Flashcard</Text>
              <TextInput
                textAlignVertical="top"
                multiline={true}
                style={[
                  styles.input,
                  errors.hint && touched.hint
                    ? styles.errorInput
                    : null,
                ]}
                underlineColorAndroid="transparent"
                name="hint"
                onChangeText={handleChange('hint')}
                onBlur={handleBlur('hint')}
                value={values.hint}
              />
              {errors.hint && touched.hint && (
                <Text style={styles.error}>{errors.hint}</Text>
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
              <Text style={styles.heading}>Category</Text>
              <Dropdown
                style={[
                  styles.input,
                  errors.category && touched.category && !values.category
                    ? styles.errorInput
                    : null,
                ]}
                name="category"
                data={CategoryData()}
                labelField="label"
                valueField="value"
                search={false}
                placeholder={!isCategoryFocused ? 'Select Category' : ''}
                placeholderStyle={{ color: 'grey' }}
                value={categoryValue}
                onBlur={() => {
                  setFieldTouched('category', true);
                }}
                onChange={(item) => {
                  setCategoryValue(item.value);
                  setFieldValue('category', item.label);
                  setIsCategoryFocused(false);
                }}
              />
              {errors.category && touched.category && !values.category && (
                <Text style={styles.error}>{errors.category}</Text>
              )}
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text
                  style={[
                    styles.button,
                    { backgroundColor: theme.secondaryRed },
                  ]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmit}>
                <Text
                  style={[
                    styles.button,
                    { backgroundColor: theme.secondaryBlue },
                  ]}>
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
    marginHorizontal: 26,
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
    backgroundColor: theme.white,
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
