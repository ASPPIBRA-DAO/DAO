
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Assuming expo-linear-gradient is installed

const COLORS = {
  primary: '#6A4CFF',
  white: '#FFFFFF',
  darkText: '#333333',
  lightText: '#F0F2F5',
};

const FinalCTA = () => {
  return (
    <View style={styles.outerContainer}>
      <LinearGradient
        colors={['#F2F4FF', '#E6E9FF']}
        style={styles.container}
      >
        <Text style={styles.title}>Construa o futuro com a Nexera</Text>
        <Text style={styles.subtitle}>
          Construa sua visão com a infraestrutura poderosa da Nexera, interoperabilidade perfeita e soluções prontas para conformidade.
        </Text>
        <Pressable style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Vamos Construir</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 80,
  },
  container: {
    width: '100%',
    maxWidth: 1160, // max-width of the inner container
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
    borderRadius: 24,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.darkText,
    textAlign: 'center',
    maxWidth: 600,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 650,
    marginBottom: 32,
  },
  ctaButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FinalCTA;
