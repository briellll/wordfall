import {Text, View, StatusBar, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './styles';

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

