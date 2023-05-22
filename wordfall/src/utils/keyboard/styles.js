import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  keyboard: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: '#f2f2f2'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5
  },
  key: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 9.5,
    marginHorizontal: 5
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5
  },
  spaceKey: {
    width: 360,
  }
});

export default styles;
