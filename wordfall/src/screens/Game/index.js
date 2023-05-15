import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Keyboard from './keyboard';

const { height, width } = Dimensions.get('window');
const center = width / 2;

const Word = ({ word, index, targetIndex }) => {
  const [position, setPosition] = useState({ x: Math.random() * (width - 100), y: -50 });
  const [velocity, setVelocity] = useState(3);
  const [falling, setFalling] = useState(true);

  // Usando um estilo condicional para mudar a cor da palavra alvo
  const style = index === targetIndex ? { color: 'orange' } : { color: 'black' };

  useEffect(() => {
    if (falling) {
      const intervalId = setInterval(() => {
        setPosition((prevState) => ({
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
    <View style={{ position: 'absolute', left: position.x, top: position.y + index * 20 }}>
      <Text style={style}>{word}</Text>
    </View>
  );
};

const Play = () => {
  const [words, setWords] = useState(['hello', 'world']);
  const [currentWord, setCurrentWord] = useState('');
  const [targetIndex, setTargetIndex] = useState(-1);
  // Criando um estado para armazenar um booleano que indica se o usuário já escolheu uma palavra ou não
  const [chosen, setChosen] = useState(false);

  const handleKeyPress = (key) => {
    // Criando uma condição para verificar se o usuário já escolheu uma palavra
    if (!chosen) {
      // Verificando se a tecla corresponde à primeira letra de alguma palavra
      const matchIndex = words.findIndex((word) => word[0] === key);
      if (matchIndex !== -1) {
        // Atualizando o estado da palavra atual e do índice do alvo
        setCurrentWord(key);
        setTargetIndex(matchIndex);
        // Removendo a primeira letra da palavra na tela
        setWords((prevState) => {
          const newWords = [...prevState];
          newWords[matchIndex] = newWords[matchIndex].slice(1);
          return newWords;
        });
        // Mudando o estado do booleano para true
        setChosen(true);
      }
    } else {
      // Verificando se a tecla corresponde à próxima letra da palavra alvo
      if (words[targetIndex] && words[targetIndex][0] === key) {
        // Atualizando o estado da palavra atual
        setCurrentWord((prevState) => prevState + key);
        // Removendo a primeira letra da palavra na tela
        setWords((prevState) => {
          const newWords = [...prevState];
          newWords[targetIndex] = newWords[targetIndex].slice(1);
          return newWords;
        });
      }
    }
    // Verificando se a palavra atual é igual à palavra alvo
    if (currentWord + key === words[targetIndex]) {
      // Removendo a palavra alvo do array de palavras
      setWords((prevState) => prevState.filter((word, index) => index !== targetIndex));
      // Resetando o estado da palavra atual e do índice do alvo
      setCurrentWord('');
      setTargetIndex(-1);
      // Mudando o estado do booleano para false
      setChosen(false);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Keyboard onPress={handleKeyPress} />
      {words.map((word, index) => (
        <Word key={index} word={word} index={index} targetIndex={targetIndex} />
      ))}
    </View>
  );
};

export default Play;



