import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 10,
    padding: 20,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.9)', // altere aqui para uma cor mais escura, se necessário
    opacity: 0.5,
  },
  button: {
    backgroundColor: '#7645BF',
    padding: 8,
    borderRadius: 10,
    margin: 9,
    marginBottom: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: 350,
    height: 40,
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    marginBottom: 10,
    opacity: 0.8,
  },

});
