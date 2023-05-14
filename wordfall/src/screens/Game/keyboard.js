import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
  keyboard: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: '#f2f2f2'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5
  },
  key: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5
  }
});

export default Keyboard;
