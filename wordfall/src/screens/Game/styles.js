import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  word: {
    fontSize: 16,
    marginBottom: 8,
  },
  letter: {
    fontSize: 16,
    marginRight: 8,
  },
  correct: {
    color: 'green',
  },
  highlight: {
    color: 'orange',
  },
  completed: {
    color: 'green',
  },
});


