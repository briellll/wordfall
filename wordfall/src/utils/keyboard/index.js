import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './styles';

const keyboardRows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

const Keyboard = ({ onPress }) => {

  const renderRow = (row, index) => {
    return (
      <View key={index} style={styles.row}>
        {row.map((letter) => (
          <TouchableOpacity key={letter} style={styles.key} onPress={() => onPress(letter)}>
            <Text style={styles.text}>{letter}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.keyboard}>
      {keyboardRows.map((row, index) => renderRow(row, index))}
    </View>
  );
};



export default Keyboard;
