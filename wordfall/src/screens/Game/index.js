import React from 'react';
import { View } from 'react-native';
import Keyboard from '../../utils/keyboard';
import styles from './styles';

const Play = () => {
  const handleKeyPress = (key) => {
    console.log(key); // Exemplo de ação ao pressionar uma tecla
  };

  return (
    <View style={styles.container}>
      <Keyboard onPress={handleKeyPress} />
    </View>
  );
};

export default Play;

