
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Placeholder Header for native platforms
const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Header (Native)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    paddingTop: 40,
    backgroundColor: '#151718',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;
