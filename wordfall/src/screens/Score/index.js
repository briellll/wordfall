import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import styles from './styles';

const Score = () => {
  const [activeTab, setActiveTab] = useState('local');
  const [localScores, setLocalScores] = useState([]);
  const [globalScores, setGlobalScores] = useState([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchLocalScores = async () => {
      try {
        const firestore = getFirestore();
        const scoresSnapshot = await getDocs(collection(firestore, 'teste'));

        const scores = scoresSnapshot.docs.map((doc) => doc.data());
        setLocalScores(scores);
      } catch (error) {
        console.error('Erro ao obter as pontuações locais:', error);
      }
    };

    const fetchGlobalScores = async () => {
      try {
        const firestore = getFirestore();
        const scoresSnapshot = await getDocs(collection(firestore, 'teste'));

        const scores = scoresSnapshot.docs.map((doc) => doc.data());
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
