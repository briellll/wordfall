import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { generateWords } from '../../utils/word/random';
import Keyboard from '../../utils/keyboard';
import { styles } from './styles';

const Play = () => {
  const [words, setWords] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [highlightLetters, setHighlightLetters] = useState([]);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  useEffect(() => {
    setWords(generateWords(5));
  }, []);

  const handleKeyPress = (key) => {
    const currentWord = words[highlightIndex];

    if (!startTime) {
      setStartTime(Date.now());
    }

    if (key === currentWord.charAt(highlightLetters.length)) {
      setHighlightLetters((prevLetters) => [...prevLetters, key]);

      if (highlightLetters.length + 1 === currentWord.length) {
        if (highlightIndex + 1 < words.length) {
          setHighlightIndex((prevIndex) => prevIndex + 1);
          setHighlightLetters([]);
          setScore((prevScore) => prevScore + 1);
          setWordCount((prevCount) => prevCount + 1);
        } else {
          setScore((prevScore) => prevScore + 1);
          setWordCount((prevCount) => prevCount + 1);
        }

        if (highlightLetters.length === currentWord.length - 1) {
          setWords((prevWords) => {
            const updatedWords = [...prevWords];
            updatedWords[highlightIndex] = `${updatedWords[highlightIndex]} `;
            return updatedWords;
          });
        }
      }
    } else {
      setAccuracy((prevAccuracy) => prevAccuracy - 1);
    }

    const durationInMinutes = (Date.now() - startTime) / 60000.0;
    setWpm(((wordCount + 1) / durationInMinutes).toFixed(2));
  };

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        <Text style={styles.scoreText}>WPM: {wpm}</Text>
        <Text style={styles.scoreText}>Accuracy: {accuracy}%</Text>
      </View>
      <View style={styles.wordsContainer}>
        {words.map((word, index) => {
          const isHighlighted = index === highlightIndex;
          const isCompleted =
            index < highlightIndex ||
            (index === highlightIndex && highlightLetters.length === word.length);

          return (
            <Text key={index} style={[styles.word, isCompleted && styles.wordCompleted]}>
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

export default Play;










 //const handleKeyPress = (key) => {
   // console.log(key); // Exemplo de ação ao pressionar uma tecla
  //};

  //return (
   // <View style={styles.container}>
     // <Keyboard onPress={handleKeyPress} />
    //</View>
 // );
