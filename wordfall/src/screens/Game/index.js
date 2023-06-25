import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateWords } from '../../utils/word/random';
import Keyboard from '../../utils/keyboard';
import { styles } from './styles';
import { getFirestore, collection, doc, setDoc, getDoc, deleteDoc, query, where, getDocs } from 'firebase/firestore';

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
  const [userNickname, setUserNickname] = useState('');

  useEffect(() => {
    setWords(generateWords(5));
  }, []);

  // temporizador de contagem regressiva
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

  // temporizador do jogo
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

  // Manipulador de pressionar tecla
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

  // Obter nickname do usuário
  useEffect(() => {
    const fetchUserNickname = async () => {
      const userId = await AsyncStorage.getItem('userId');
      const firestore = getFirestore();
      const userRef = doc(collection(firestore, 'teste'), userId);

      try {
        const userDocSnap = await getDoc(userRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserNickname(userData.nickname);
        }
      } catch (error) {
        console.error('Erro ao obter o nickname do usuário:', error);
      }
    };

    fetchUserNickname();
  }, []);

 // Salvar pontuações no Firestore
 useEffect(() => {
  const saveScores = async () => {
    if (isGameOver) {
      const userId = await AsyncStorage.getItem('userId');

      try {
        const firestore = getFirestore();
        const userRef = doc(collection(firestore, 'teste'), userId);
        const scoresCollection = collection(userRef, 'pontuacoes');

        const newScoreDocRef = doc(scoresCollection);
        await setDoc(newScoreDocRef, {
          nickname: userNickname,
          score: score.toString(),
          wpm: wpm.toString(),
          accuracy: accuracy.toString(),
        });

        console.log('Pontuação salva no Firestore com sucesso!');

        // Vasculhar e excluir arquivos vazios
        const querySnapshot = await getDocs(scoresCollection);
        querySnapshot.forEach(async (doc) => {
          const scoreData = doc.data();
          if (!scoreData.nickname || scoreData.nickname.trim() === '') {
            // Arquivo vazio encontrado, exclua-o
            await deleteDoc(doc.ref);
            console.log('Arquivo vazio excluído:', doc.id);
          }
        });
      } catch (error) {
        console.error('Erro ao salvar a pontuação no Firestore:', error);
      }
    }
  };

  saveScores();
}, [isGameOver, score, wpm, accuracy, userNickname]);


  // Renderização do componente
  return (
    <View style={styles.container}>
      {countdown >= 0 && (
        <Text style={[styles.countdownText, countdown === 0 && styles.countdownHighlight]}>
          {countdown}
        </Text>
      )}
      {isGameStarted && <Text style={styles.timerText}>{gameTimer}</Text>}
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
      {showKeyboard && <Keyboard onPress={handleKeyPress} />}
    </View>
  );
};

export default Play;
