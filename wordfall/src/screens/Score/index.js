import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { getFirestore, collection, getDocs, doc, collectionGroup } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const Score = () => {
  const [activeTab, setActiveTab] = useState('local');
  const [localScores, setLocalScores] = useState([]);
  const [globalScores, setGlobalScores] = useState([]);
  const [userId, setUserId] = useState(null); // Estado para armazenar o ID do usuário atual

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchLocalScores = async () => {
      try {
        const firestore = getFirestore();

        // Obtém o ID do documento específico do usuário atual da AsyncStorage
        const storedUserId = await AsyncStorage.getItem('userId');
        setUserId(storedUserId);

        const scoresSnapshot = await getDocs(collection(firestore, 'teste', storedUserId, 'pontuacoes'));

        const scores = scoresSnapshot.docs.map((doc) => {
          const data = doc.data();
          const average = (data.wpm + data.accuracy + data.score) / 3;
          return { ...data, average };
        });

        scores.sort((a, b) => b.average - a.average); // Ordena as pontuações com base na média (da maior para a menor)

        setLocalScores(scores);
      } catch (error) {
        console.error('Erro ao obter as pontuações locais:', error);
      }
    };


    const fetchGlobalScores = async () => {
      try {
        const firestore = getFirestore();
        const scoresSnapshot = await getDocs(collectionGroup(firestore, 'pontuacoes'));

        // Objeto para armazenar as pontuações máximas por usuário
        const userScores = {};

        scoresSnapshot.docs.forEach((doc) => {
          const data = doc.data();
          const userId = doc.ref.parent.parent.id; // Obtém o ID do usuário a partir do documento

          // Verifica se já existe uma pontuação máxima para o usuário
          if (userScores[userId]) {
            // Compara a pontuação atual com a pontuação máxima existente
            if (data.score > userScores[userId].score) {
              userScores[userId] = data; // Atualiza a pontuação máxima
            }
          } else {
            userScores[userId] = data; // Define a pontuação como a máxima inicial
          }
        });

        const scores = Object.values(userScores); // Converte o objeto de pontuações em uma matriz de pontuações

        setGlobalScores(scores);
      } catch (error) {
        console.error('Erro ao obter as pontuações globais:', error);
      }
    };

    if (activeTab === 'local') {
      fetchLocalScores();
    } else if (activeTab === 'global') {
      fetchGlobalScores();
    }
  }, [activeTab]);

  const renderScoreItem = ({ item }) => (
    <View style={styles.scoreItem}>
      <Text style={styles.scoreText}>{item.nickname}</Text>
      <Text style={styles.scoreText}>{item.wpm}</Text>
      <Text style={styles.scoreText}>{item.accuracy}</Text>
      <Text style={styles.scoreText}>{item.score}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'local' && styles.activeTab]}
          onPress={() => handleTabChange('local')}
        >
          <Text style={styles.tabText}>Pontuação Local</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'global' && styles.activeTab]}
          onPress={() => handleTabChange('global')}
        >
          <Text style={styles.tabText}>Rank Global</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'local' && (
        <View style={styles.scoreTable}>
          <Text style={styles.tableHeader}> Sua Pontuação</Text>
          <View style={styles.tableRow}>
            <Text style={styles.columnHeader}>Nick</Text>
            <Text style={styles.columnHeader}>WPM</Text>
            <Text style={styles.columnHeader}>Accuracy</Text>
            <Text style={styles.columnHeader}>Score</Text>
          </View>
          <FlatList
            data={localScores}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderScoreItem}
          />
        </View>
      )}

      {activeTab === 'global' && (
        <View style={styles.scoreTable}>
          <Text style={styles.tableHeader}>Rank Global</Text>
          <View style={styles.tableRow}>
            <Text style={styles.columnHeader}>Nick</Text>
            <Text style={styles.columnHeader}>WPM</Text>
            <Text style={styles.columnHeader}>Accuracy</Text>
            <Text style={styles.columnHeader}>Score</Text>
          </View>
          <FlatList
            data={globalScores}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderScoreItem}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Score;
