import React, { useState } from 'react';
import { KeyboardAvoidingView, View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import styles from './styles';
import logoIcon from '../../../assets/user.png';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../config';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Conta Criada!');
        const user = userCredential.user;
        console.log(user);
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  const handleSign = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Logado!');
        const user = userCredential.user;
        console.log(user);
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  return (
    <>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.form}>
          <Image source={logoIcon} style={[styles.logo, { marginBottom: 20 }]} />

          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
          />

          <TouchableOpacity onPress={handleSign} style={styles.buttonSubmit}>
            <Text style={styles.submitText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCreateAccount} style={styles.buttonRegister}>
            <Text style={styles.registerText}>Criar conta gratuita</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
