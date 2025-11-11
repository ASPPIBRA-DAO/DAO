
import React from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { Colors } from '@/constants/theme'; // Importa as cores centralizadas

// Para simplificar, vamos usar o tema 'light' por enquanto.
const theme = Colors.light;

const Hero = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const titleFontSize = isMobile ? 32 : 56;

  return (
    <View style={styles.heroContainer}>
      <Text style={styles.eyebrow}>ECOSSISTEMA</Text>
      <Text style={[styles.title, { fontSize: titleFontSize }]}>Impulsionando um ecossistema dinâmico e em crescimento</Text>
      <Text style={styles.subtitle}>
        A ASPPIBRA-DAO potencializa um ecossistema próspero, conectando empresas, instituições e desenvolvedores para criar o futuro das aplicações baseadas em blockchain.
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
    backgroundColor: theme.background, // Cor do tema
    paddingHorizontal: 20,
  },
  eyebrow: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.primaryAlt, // Cor do tema (Roxo)
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    color: theme.textSecondary, // Cor do tema
    textAlign: 'center',
    maxWidth: 800,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 18,
    color: theme.textTertiary, // Cor do tema
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 650,
    marginBottom: 32,
  },
  ctaButton: {
    backgroundColor: theme.background, // Cor do tema (Branco)
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.border, // Cor do tema
  },
  ctaButtonText: {
    color: theme.textSecondary, // Cor do tema
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Hero;
