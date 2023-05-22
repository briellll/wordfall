import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import styles from './styles';

const Score = () => {
  const [activeTab, setActiveTab] = React.useState('local');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const localScores = [
    { nick: 'Nick1', wpm: 100, accuracy: '95%', score: 500 },
    { nick: 'Nick2', wpm: 90, accuracy: '85%', score: 400 },
    { nick: 'Nick3', wpm: 80, accuracy: '75%', score: 300 },
    { nick: 'Nick4', wpm: 70, accuracy: '65%', score: 200 },
    { nick: 'Nick5', wpm: 60, accuracy: '55%', score: 100 },
  ];

  const globalScores = [
    { nick: 'Nick1', wpm: 200, accuracy: '98%', score: 1500 },
    { nick: 'Nick2', wpm: 180, accuracy: '96%', score: 1400 },
    { nick: 'Nick3', wpm: 160, accuracy: '94%', score: 1300 },
    { nick: 'Nick4', wpm: 140, accuracy: '92%', score: 1200 },
    { nick: 'Nick5', wpm: 120, accuracy: '90%', score: 1100 },
  ];

  const renderScoreItem = ({ item }) => (
    <View style={styles.scoreItem}>
      <Text style={styles.scoreText}>{item.nick}</Text>
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
