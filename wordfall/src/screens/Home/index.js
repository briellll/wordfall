import React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import logoIcon from '../../../assets/logohome.png';





export default function Home() {
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image source={logoIcon} style={[styles.logo]} />


      <View style={styles.form}>

        <TouchableOpacity style={styles.button} onPress={() =>{navigation
        .navigate('Play')}}>
          <Text style={styles.submitText}>Novo Jogo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.submitText}>Pontuação</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
}
