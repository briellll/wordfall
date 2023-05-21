import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292c34',
    alignItems: 'center',
    justifyContent: 'center',
  },
  character: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  characterOut: {
    color: 'white',
    fontSize: 16,
    marginRight: 5,
  },
  characterCurrent: {
    color: 'green',
    fontSize: 16,
    marginRight: 5,
  },
});

export default styles;

