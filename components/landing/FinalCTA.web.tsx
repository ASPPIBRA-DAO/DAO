
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
        <Text style={[styles.title, { fontSize: titleFontSize }]}>Construa o futuro com a Nexera</Text>
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
    backgroundColor: theme.primaryAlt, // Cor do tema (Roxo)
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: theme.textOnPrimary, // Cor do tema (Branco)
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FinalCTA;
