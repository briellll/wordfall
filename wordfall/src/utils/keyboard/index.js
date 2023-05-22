import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const keyboardRows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  [' '], // Adicionando uma linha separada com um único elemento vazio para a barra de espaço
];

const Keyboard = ({ onPress }) => {
  const renderRow = (row, index) => {
    return (
      <View key={index} style={styles.row}>
        {row.map((letter) => (
          <TouchableOpacity
            key={letter}
            style={[styles.key, letter === ' ' && styles.spaceKey]}
            onPress={() => onPress(letter)}
          >
            <Text style={styles.text}>{letter}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return <View style={styles.keyboard}>{keyboardRows.map((row, index) => renderRow(row, index))}</View>;
};

export default Keyboard;
