import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Dimensions, TextInput } from 'react-native';
import Keyboard from './keyboard';

const { height, width } = Dimensions.get('window');
const center = width / 2;

const Word = ({ word, index }) => {
  const [position, setPosition] = useState({ x: Math.random() * (width - 100), y: -50 });
  const [velocity, setVelocity] = useState(3);
  const [falling, setFalling] = useState(true);

  useEffect(() => {
    if (falling) {
      const intervalId = setInterval(() => {
        setPosition(prevState => ({
          x: prevState.x + (center - prevState.x) / 100,
          y: prevState.y + velocity
        }));
      }, 100);

      // Verifica se a posição y da palavra é maior ou igual à altura da tela
      if (position.y >= 600) {
        setFalling(false);
      }

      return () => clearInterval(intervalId);
    }
  }, [falling, velocity, position, center, height]);

  return (
    <View style={{ position: 'absolute', left: position.x, top: position.y + (index * 20) }}>
      <Text>{word}</Text>
    </View>
  );
};
const handleKeyPress = (key) => {
  console.log(key);
  // implementar a logica
};

const Play = () => {
  const [words, setWords] = useState(['hello', 'world']);
  const inputRef = useRef(null);
  <Keyboard onPress={(key) => handleKeyPress(key)} />

  const addWord = () => {
    setWords(prevState => [...prevState, 'random']);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Keyboard onPress={handleKeyPress} />
      {words.map((word, index) => (
        <Word key={index} word={word} index={index} />
      ))}
    </View>
  );
};

export default Play;

