
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Placeholder Footer for native platforms
const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>© 2024 Your Company. (Native)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
  },
  text: {
    color: '#999',
  },
});

export default Footer;
