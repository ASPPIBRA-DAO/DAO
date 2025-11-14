
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme'; // Importa as cores centralizadas

// Usa o tema 'light' para consistência com a versão web
const theme = Colors.light;

const Header = () => {
  const router = useRouter();

  const openPaymentModal = () => {
    router.push('/payment');
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <Text style={styles.logo}>ASPPIBRA-DAO</Text>
        <Pressable onPress={openPaymentModal} style={styles.ctaButton} accessibilityLabel="Abrir pagamento" accessibilityRole="button">
          <Text style={styles.ctaButtonText}>Pagar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    backgroundColor: theme.header.background, // Cor do tema
    borderBottomWidth: 1,
    borderColor: theme.header.border, // Cor do tema
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40, // Espaço para a barra de status
    height: 90, // Altura do header
    zIndex: 1000,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: 1200, 
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 22, // Ajustado para mobile
    fontWeight: 'bold',
    color: theme.textSecondary, // Cor do tema
  },
  ctaButton: {
    backgroundColor: theme.primary, // Cor do tema
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: Colors.light.background, // Cor do tema (Branco)
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Header;
