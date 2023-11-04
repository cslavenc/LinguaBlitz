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

  const handleSave = (values: FormikValues) => {
    console.log('save button pressed');
    console.log('my formdata: ', values);
  };

  // TODO : use a form
  return (
    <View style={styles.container}>
      <Formik
        style={styles.form}
        initialValues={{
          word: '', // TODO : move object into variable
          partOfSpeech: '',
          description: '',
          example: '',
          category: '',
        }}
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
              <Text style={styles.text}>Word</Text>
              {/* TODO : move error text up*/}
              <View>
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  name="word"
                  onChangeText={handleChange('word')}
                  onBlur={handleBlur('word')}
                  value={values.word}
                />
                {errors.word && (
                  <Text
                    style={{
                      backgroundColor: 'aliceblue',
                      fontSize: 14,
                      color: 'red',
                    }}>
                    {errors.word}
                  </Text>
                )}
              </View>
            </View>
            <View>
              <Text style={styles.text}>Part of speech</Text>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                name="partOfSpeech"
                onChangeText={handleChange('partOfSpeech')}
                onBlur={handleBlur('partOfSpeech')}
                value={values.partOfSpeech}
              />
            </View>
            <View>
              <Text style={styles.text}>Description</Text>
              <TextInput
                textAlignVertical="top"
                multiline={true}
                style={[styles.input, { height: 120 }]}
                underlineColorAndroid="transparent"
                name="description"
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
              />
            </View>
            <View>
              <Text style={styles.text}>Example</Text>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                name="example"
                onChangeText={handleChange('example')}
                onBlur={handleBlur('example')}
                value={values.example}
              />
            </View>
            <View>
              {/* TODO : use a dropdown or modal */}
              <Text style={styles.text}>Category</Text>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                name="category"
                onChangeText={handleChange('category')}
                onBlur={handleBlur('category')}
                value={values.category}
              />
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
