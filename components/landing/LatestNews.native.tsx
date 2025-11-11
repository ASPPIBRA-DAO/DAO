
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Placeholder LatestNews for native platforms
const LatestNews = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LatestNews (Native)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1E1E1E',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LatestNews;
