import React, { useState } from 'react';
import { KeyboardAvoidingView, View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import styles from './styles';
import logoIcon from '../../../assets/user.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../config';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, doc, setDoc, query, where, getDocs, deleteDoc } from 'firebase/firestore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const navigation = useNavigation();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = async () => {
    try {
      // Verificar se o nickname já está em uso no Firestore (case-insensitive)
      const lowercaseNickname = nickname.toLowerCase();
      const firestore = getFirestore();
      const usersRef = collection(firestore, "teste");
      const nicknameQuery = query(usersRef, where("nickname", "==", lowercaseNickname));
      const nicknameSnapshot = await getDocs(nicknameQuery);
      if (!nicknameSnapshot.empty) {
        Alert.alert('Erro', 'O nickname já está em uso.');
        return;
      }

      // Criar a conta de usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Salvar ID do usuário e nickname em letra minúscula no Cloud Firestore
      const userRef = doc(collection(firestore, "teste"), user.uid);
      const scoresCollection = collection(userRef, "pontuacoes"); // Subcoleção de pontuações do jogador

      setDoc(userRef, {
        id: user.uid,
        nickname: lowercaseNickname // Salvar o nickname em letras minúsculas
      });

      // Criar um documento vazio com ID aleatório na subcoleção de pontuações
      const newScoreDocRef = doc(scoresCollection);
      setDoc(newScoreDocRef, {});

      // Exibir alerta de conta criada com sucesso
      Alert.alert(
        'Sucesso',
        'Sua conta foi criada com sucesso!',
        [
          { text: 'Voltar para o Login', onPress: () => setIsLoginScreen(true) }
        ]
      );
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', error.message);
    }
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
        Alert.alert('Erro', error.message);
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
