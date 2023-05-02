import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';

export default function Home() {
  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    position:'absolute',
    top: '12%',
    textAlign: 'center',
    width: '100%',
    fontSize: 80,
    fontWeight: 'bold',
    color: '#FAEBD7',
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: '20%',
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
