import React from 'react';
import { KeiboardAvoidingView, View, Image, TextInput, TouchableOpacity,Text, ImageBackground } from 'react-native';
import styles from './styles';

export default function Login() {
  return (
    <ImageBackground source={require('../../../assets/background.png')} style={styles.background}>
        <View style={styles.overlay} />
        <View  style={styles.background}>
            <TextInput placeholder='Email' autoCorrect={false}
            onChangeText={()=>{}}/>

            <TextInput placeholder='Senha' autoCorrect={false}
            onChangeText={()=>{}}/>

            <TouchableOpacity>
                <Text>Acessar</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text>Criar Conta</Text>
            </TouchableOpacity>

        </View>
        </ImageBackground>
  );
}

