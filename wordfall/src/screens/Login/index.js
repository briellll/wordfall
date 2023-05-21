import React from 'react';
import { KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

import styles from './styles';
import logoIcon from '../../../assets/user.png';


export default function Login() {
  return (
    <>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.form}>
          <Image source={logoIcon} style={[styles.logo, { marginBottom: 20 }]} />

          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
            onChangeText={() => {}}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            //keyboardType="visible-password"
            textContentType="password"
            autoCapitalize="none"
            autoCompleteType="password"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={() => {}}
          />

          <TouchableOpacity style={styles.buttonSubmit}>
            <Text style={styles.submitText}>Acessar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonRegister}>
            <Text style={styles.registerText}>Criar conta gratuita</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
