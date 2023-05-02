import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.9)', // altere aqui para uma cor mais escura, se necessário
    opacity: 0.5,
  }
});
