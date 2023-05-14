import {Text, View, StatusBar, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function Home() {
  const navigation = useNavigation();
  return (
    <ImageBackground source={require('../../../assets/background.png')} style={styles.background}>
         <View style={styles.overlay} />
    <View style={styles.container}>
      <Text style={styles.title}>wordfall</Text>


      <View style={styles.buttonsContainer}>


        <TouchableOpacity style={styles.button} onPress={() =>{
          navigation.navigate('Play')
        }}>
          <Text style={styles.buttonText}> Novo Jogo </Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.button} onPress={() =>{
          //adicionar o codigo para abrir score
        }}>
          <Text style={styles.buttonText}> Score </Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.button} onPress={() =>{
          navigation.navigate('Settings')
        }}>
          <Text style={styles.buttonText}> Configurações </Text>
        </TouchableOpacity>


      </View>
      <StatusBar style="auto" />
    </View>
    </ImageBackground>
  );
}

