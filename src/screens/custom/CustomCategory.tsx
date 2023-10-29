import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SpeechBubbleIcon } from '../../components/Icons';
import { theme } from '../../theme';

export const CustomCategory = ({ route }) => {
  const navigation = useNavigation();
  const { color } = route.params;

  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Add custom words' });
  }, []);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.container, { backgroundColor: color }]}
        onPress={() =>
          navigation.navigate('Custom word', { color: theme.lightblue })
        }>
        <SpeechBubbleIcon />
        <Text style={styles.name}>Add new word</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    elevation: 5,
    marginHorizontal: 20,
    marginVertical: 18,
    padding: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  name: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
