import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
  const [countdown, setCountdown] = useState(3);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameTimer, setGameTimer] = useState(5);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(true);

  useEffect(() => {
    setWords(generateWords(5));
  }, []);

  useEffect(() => {
    let countdownTimer;

    if (countdown > 0) {
      countdownTimer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCountdown(-1);
      setGameTimer(5);
      setIsGameStarted(true);
      setStartTime(Date.now());
    }

    return () => clearTimeout(countdownTimer);
  }, [countdown]);

  useEffect(() => {
    let gameTimerInterval;

    if (isGameStarted && gameTimer > 0) {
      gameTimerInterval = setInterval(() => {
        setGameTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (gameTimer === 0) {
      clearInterval(gameTimerInterval);
      setIsGameStarted(false);
      setIsGameOver(true);
      setShowKeyboard(false);
    }

    return () => clearInterval(gameTimerInterval);
  }, [gameTimer, isGameStarted]);

  const handleKeyPress = (key) => {
    if (!isGameStarted) {
      return; // Ignorar as teclas pressionadas até o início do jogo
    }

    const currentWord = words[highlightIndex];

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
      {countdown >= 0 && (
        <Text style={[styles.countdownText, countdown === 0 && styles.countdownHighlight]}>
          {countdown}
        </Text>
      )}
      {isGameStarted && (
        <Text style={styles.timerText}>{gameTimer}</Text>
      )}
      {isGameStarted && (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Score: {score}</Text>
          <Text style={styles.scoreText}>WPM: {wpm}</Text>
          <Text style={styles.scoreText}>Accuracy: {accuracy}%</Text>
        </View>
      )}
      {!isGameOver && (
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
      )}
      {isGameOver && (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Game Over</Text>
          <Text style={styles.scoreText}>Score: {score}</Text>
          <Text style={styles.scoreText}>WPM: {wpm}</Text>
          <Text style={styles.scoreText}>Accuracy: {accuracy}%</Text>
        </View>
      )}
      {showKeyboard && (
        <Keyboard onPress={handleKeyPress} />
      )}
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
