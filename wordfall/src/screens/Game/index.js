import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';

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
          x: prevState.x + (center - prevState.x) / 100, // atualiza a posição x em direção ao centro
          y: prevState.y + velocity // atualiza a posição y com base na velocidade
        }));
      }, 100);

      return () => clearInterval(intervalId);
    }
  }, [falling, velocity]);

  useEffect(() => {
    if (position.y >= height - (index + 1) * 20) {
      setFalling(false);
    }
  }, [position.y]);

  return (
    <View style={{ position: 'absolute', left: position.x, top: position.y + (index * 20) }}>
      <Text>{word}</Text>
    </View>
  );
};

const Play = () => {
  const [words, setWords] = useState(['hello', 'world']);

  const addWord = () => {
    setWords(prevState => [...prevState, 'random']);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {words.map((word, index) => (
        <Word key={index} word={word} index={index} />
      ))}
    </View>
  );
};


export default Play;
