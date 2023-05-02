import React from 'react';
import { KeiboardAvoidingView, View, Image, TextInput, TouchableOpacity,Text, ImageBackground } from 'react-native';
import styles from './styles';

export default function Login() {
  return (
    <ImageBackground source={require('../../../assets/background.png')} style={styles.background}>
        <View style={styles.overlay} />
        <View  style={styles.background}>
            <TextInput style={styles.input} placeholder='Email' autoCorrect={false}
            onChangeText={()=>{}}/>

            <TextInput style={styles.input} placeholder='Senha' autoCorrect={false}
            onChangeText={()=>{}}/>
    
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Acessar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Criar Conta</Text>
            </TouchableOpacity>

        </View>
        </ImageBackground>
  );
}

