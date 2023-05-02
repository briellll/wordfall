import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ImageBackground } from 'react-native';

export default function Home() {
  return (
    <ImageBackground source={require('../../../assets/background.png')} style={styles.background}>
         <View style={styles.overlay} />
    <View style={styles.container}>
      <Text style={styles.title}>wordfall</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() =>{
          //adicionar o codigo para iniciar/ir para um novo jogo
        }}>
          <Text style={styles.buttonText}> Novo Jogo </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() =>{
          //adicionar o codigo para abrir configurações
        }}>
          <Text style={styles.buttonText}> Configurações </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>{
          //adicionar o codigo para carregar seu próprio texto
        }}>
          <Text style={styles.buttonText}> Carregar seu próprio texto </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: '#FFFFFF'
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
  title: {
    backgroundColor: 'transparent',
    position:'absolute',
    top: '12%',
    textAlign: 'center',
    width: '100%',
    fontSize: 90,
    fontWeight: 'bold',
    color: '#FAEBD7',
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: '15%',
    height: '18%',
  },
  button: {
    backgroundColor: '#00FFFF',
    padding: 15,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
