
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const COLORS = {
  primary: '#6A4CFF', // A vibrant purple for the main CTA
  darkText: '#333333',
  lightText: '#555555',
  white: '#FFFFFF',
  borderColor: '#E0E0E0',
};

const Hero = () => {
  return (
    <View style={styles.heroContainer}>
      <Text style={styles.eyebrow}>ECOSSISTEMA</Text>
      <Text style={styles.title}>Impulsionando um ecossistema dinâmico e em crescimento</Text>
      <Text style={styles.subtitle}>
        A Nexera Chain potencializa um ecossistema próspero, conectando empresas, instituições e desenvolvedores para criar o futuro das aplicações baseadas em blockchain.
      </Text>
      <Pressable style={styles.ctaButton}>
        <Text style={styles.ctaButtonText}>Explorar ecossistema</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  heroContainer: {
    paddingVertical: 80,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
  },
  eyebrow: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    color: COLORS.darkText,
    textAlign: 'center',
    maxWidth: 800,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.lightText,
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 650,
    marginBottom: 32,
  },
  ctaButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  ctaButtonText: {
    color: COLORS.darkText,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Hero;
