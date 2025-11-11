
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const COLORS = {
  primary: '#007BFF', // Um azul para diferenciar da versão nativa
  white: '#FFFFFF',
  darkText: '#343A40',
  borderColor: '#DEE2E6',
};

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <Text style={styles.logo}>ASPPIBRA-DAO</Text>
        <View style={styles.navContainer}>
          <Text style={styles.navLink}>Início</Text>
          <Text style={styles.navLink}>Sobre</Text>
          <Text style={styles.navLink}>Propostas</Text>
          <Text style={styles.navLink}>Contato</Text>
        </View>
        <Pressable style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Conectar Carteira</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderColor: COLORS.borderColor,
    alignItems: 'center',
    paddingVertical: 10,
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
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.darkText,
  },
  navContainer: {
    flexDirection: 'row',
    gap: 40,
  },
  navLink: {
    fontSize: 16,
    color: COLORS.darkText,
    fontWeight: '500',
  },
  ctaButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Header;
