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
import { Formik, FormikValues } from 'formik';
import * as yup from 'yup';

// TODO : use in formik if possible
export interface FormData {
  word: string;
  partOfSpeech: string;
  description: string;
  example: string;
  category: string;
}

const customWordValidationSchema = yup.object().shape({
  word: yup.string().required('Word is required'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
});

export const CustomWord = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Add your own word' });
  }, []);

  const initialValues: FormData = {
    word: '',
    partOfSpeech: '',
    description: '',
    example: '',
    category: '',
  };

  // TODO : save it to AsyncStorage
  const handleSave = (values: FormikValues) => {
    console.log('save button pressed');
    console.log('my formdata: ', values);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Formik
        style={styles.form}
        initialValues={initialValues}
        validationSchema={customWordValidationSchema}
        onSubmit={(values) => handleSave(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            <View>
              <Text style={styles.heading}>Word</Text>
              <View style={styles.input}>
                <TextInput
                  style={styles.text}
                  underlineColorAndroid="transparent"
                  name="word"
                  onChangeText={handleChange('word')}
                  onBlur={handleBlur('word')}
                  value={values.word}
                />
                {errors.word && <Text style={styles.error}>{errors.word}</Text>}
              </View>
            </View>
            <View style={styles.input}>
              <Text style={styles.heading}>Part of speech</Text>
              <TextInput
                style={styles.text}
                underlineColorAndroid="transparent"
                name="partOfSpeech"
                onChangeText={handleChange('partOfSpeech')}
                onBlur={handleBlur('partOfSpeech')}
                value={values.partOfSpeech}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.heading}>Description</Text>
              <TextInput
                textAlignVertical="top"
                multiline={true}
                style={[styles.text, { height: 120 }]}
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
            <View style={styles.input}>
              <Text style={styles.heading}>Example</Text>
              <TextInput
                style={styles.text}
                underlineColorAndroid="transparent"
                name="example"
                onChangeText={handleChange('example')}
                onBlur={handleBlur('example')}
                value={values.example}
              />
            </View>
            <View style={styles.input}>
              {/* TODO : use a dropdown or modal */}
              <Text style={styles.heading}>Category</Text>
              <TextInput
                style={styles.text}
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
  input: {
    marginBottom: 24,
  },
  text: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 18,
  },
  error: {
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
