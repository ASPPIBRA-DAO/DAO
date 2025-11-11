
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const COLORS = {
  background: '#F8F9FA',
  text: '#6C757D',
  darkText: '#343A40',
  borderColor: '#DEE2E6',
};

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerContent}>
        <Text style={styles.footerText}>© 2024 nexera. Todos os direitos reservados.</Text>
        <View style={styles.footerLinks}>
          <Text style={styles.link}>Termos de Serviço</Text>
          <Text style={styles.link}>Política de Privacidade</Text>
          <Text style={styles.link}>Contato</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderColor: COLORS.borderColor,
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 40,
  },
  footerContent: {
    width: '100%',
    maxWidth: 1200,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 14,
    color: COLORS.text,
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
  },
  link: {
    fontSize: 14,
    color: COLORS.darkText,
    fontWeight: '500',
  },
});

export default Footer;
