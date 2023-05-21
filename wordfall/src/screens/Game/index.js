import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { generateWords } from '../../utils/word/random';
import Keyboard from '../../utils/keyboard';

const Play = () => {
  const [words, setWords] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [highlightLetters, setHighlightLetters] = useState([]);

  useEffect(() => {
    setWords(generateWords(5));
  }, []);

  const handleKeyPress = (key) => {
    const currentWord = words[highlightIndex];

    if (key === currentWord.charAt(highlightLetters.length)) {
      setHighlightLetters((prevLetters) => [...prevLetters, key]);

      if (highlightLetters.length + 1 === currentWord.length) {
        if (highlightIndex + 1 < words.length) {
          setHighlightIndex((prevIndex) => prevIndex + 1);
          setHighlightLetters([]);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wordsContainer}>
        {words.map((word, index) => {
          const isHighlighted = index === highlightIndex;
          const isCompleted = index < highlightIndex || (index === highlightIndex && highlightLetters.length === word.length);

          return (
            <Text key={index} style={styles.word}>
              {word.split('').map((letter, letterIndex) => {
                const isCorrect = isHighlighted && letterIndex < highlightLetters.length;
                const isHighlightLetter = isHighlighted && letterIndex === highlightLetters.length;

                return (
                  <Text
                    key={letterIndex}
                    style={[
                      styles.letter,
                      isCorrect && styles.correct,
                      isHighlightLetter && styles.highlight,
                      isCompleted && styles.completed,
                    ]}
                  >
                    {letter}
                  </Text>
                );
              })}
              {' '}
            </Text>
          );
        })}
      </View>
      <Keyboard onPress={handleKeyPress} />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  word: {
    fontSize: 16,
    marginBottom: 8,
  },
  letter: {
    fontSize: 16,
    marginRight: 8,
  },
  correct: {
    color: 'green',
  },
  highlight: {
    color: 'orange',
  },
  completed: {
    color: 'green',
  },
});

export default Play;



































 //const handleKeyPress = (key) => {
   // console.log(key); // Exemplo de ação ao pressionar uma tecla
  //};

  //return (
   // <View style={styles.container}>
     // <Keyboard onPress={handleKeyPress} />
    //</View>
 // );
