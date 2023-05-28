import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import logoIcon from '../../../assets/user.png';
import Firebase from '../../config';


export default function Login() {

  return (
    <>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.form}>
          <Image source={logoIcon} style={[styles.logo, { marginBottom: 20 }]} />

          <TouchableOpacity style={styles.buttonSubmit}>
            <Text style={styles.submitText}>Acessar com Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonRegister}>
            <Text style={styles.registerText}>Criar conta gratuita</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
