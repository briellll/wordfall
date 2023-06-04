import React, { useState } from 'react';
import { KeyboardAvoidingView, View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import styles from './styles';
import logoIcon from '../../../assets/user.png';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importe AsyncStorage

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../config';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const navigation = useNavigation();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Salvar ID do usuário e nickname no Cloud Firestore
        const firestore = getFirestore();
        const userRef = doc(collection(firestore, "teste"), user.uid);
        setDoc(userRef, {
          id: user.uid,
          nickname: nickname
        });

        // Exibir alerta de conta criada com sucesso
        Alert.alert(
          'Sucesso',
          'Sua conta foi criada com sucesso!',
          [
            { text: 'Voltar para o Login', onPress: () => setIsLoginScreen(true) }
          ]
        );
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

        // Salvar o ID do usuário no AsyncStorage
        AsyncStorage.setItem('userId', user.uid)
          .then(() => {
            navigation.navigate('Home');
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  const handleModeToggle = () => {
    setIsLoginScreen(!isLoginScreen);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.form}>
        <Image source={logoIcon} style={[styles.logo, { marginBottom: 20 }]} />

        {isLoginScreen ? (
          <>
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

            <TouchableOpacity onPress={handleModeToggle} style={styles.buttonRegister}>
              <Text style={styles.registerText}>Não possui uma conta? Crie uma gratuita aqui</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
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

            <TextInput
              style={styles.input}
              placeholder="Nickname"
              onChangeText={(text) => setNickname(text)}
              value={nickname}
            />

            <TouchableOpacity onPress={handleCreateAccount} style={styles.buttonSubmit}>
              <Text style={styles.submitText}>Gerar acesso</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleModeToggle} style={styles.buttonRegister}>
              <Text style={styles.registerText}>Voltar para o Login</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
