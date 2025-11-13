
import React from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/theme'; // Importa as cores centralizadas

// Para simplificar, vamos usar o tema 'light' por enquanto.
const theme = Colors.light;

const FinalCTA = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const titleFontSize = isMobile ? 36 : 48;

  return (
    <View style={styles.outerContainer}>
      <LinearGradient
        colors={theme.gradient.cta} // Cor do tema
        style={styles.container}
      >
        <Text style={[styles.title, { fontSize: titleFontSize }]}>Construa o Futuro, Hoje.</Text>
        <Text style={styles.subtitle}>
          Com a ASPFIBRA-DAO, você não apenas investe, mas também participa ativamente da construção de uma infraestrutura descentralizada. Nosso <Text style={{fontWeight: 'bold'}}>Digital World v 1.0</Text> é a prova de que estamos prontos para Web3, DeFi, RWA e AI.
        </Text>
        <Pressable style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Junte-se a Nós na Pré-Venda</Text>
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
    maxWidth: 1160,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
    borderRadius: 24,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: theme.textSecondary, // Cor do tema
    textAlign: 'center',
    maxWidth: 600,
    marginBottom: 24,
    fontSize: 48,
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
    backgroundColor: '#7B3EFC',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default FinalCTA;
