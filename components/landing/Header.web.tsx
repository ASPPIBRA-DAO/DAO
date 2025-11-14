
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme'; // Importa as cores centralizadas

// Para simplificar, vamos usar o tema 'light' por enquanto.
const theme = Colors.light;

const Header = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const openPaymentModal = () => {
    router.push('/payment');
  };

  const DesktopNav = () => (
    <>
      <View style={styles.navContainer}>
        <Text style={styles.navLink}>Início</Text>
        <Text style={styles.navLink}>Sobre</Text>
        <Text style={styles.navLink}>Propostas</Text>
        <Text style={styles.navLink}>Contato</Text>
      </View>
      <Pressable onPress={openPaymentModal} style={styles.ctaButton} accessibilityLabel="Abrir pagamento" accessibilityRole="button">
        <Text style={styles.ctaButtonText}>Pagar</Text>
      </Pressable>
    </>
  );

  const MobileNav = () => (
    <>
      <Pressable onPress={() => setMenuOpen(true)} style={styles.hamburgerButton} accessibilityLabel="Abrir menu de navegação" accessibilityRole="button">
        <Text style={styles.hamburgerIcon}>☰</Text>
      </Pressable>
      <Modal
        transparent={true}
        visible={menuOpen}
        animationType="fade"
        onRequestClose={() => setMenuOpen(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setMenuOpen(false)} accessibilityLabel="Fechar menu de navegação">
            <View style={styles.mobileMenuContainer}>
                <Pressable onPress={() => setMenuOpen(false)} style={styles.closeButton} accessibilityLabel="Fechar menu">
                    <Text style={styles.closeButtonText}>×</Text>
                </Pressable>
                <Text style={styles.mobileNavLink} onPress={() => setMenuOpen(false)}>Início</Text>
                <Text style={styles.mobileNavLink} onPress={() => setMenuOpen(false)}>Sobre</Text>
                <Text style={styles.mobileNavLink} onPress={() => setMenuOpen(false)}>Propostas</Text>
                <Text style={styles.mobileNavLink} onPress={() => setMenuOpen(false)}>Contato</Text>
                 <Pressable 
                   onPress={() => {
                     setMenuOpen(false);
                     openPaymentModal();
                   }}
                   style={[styles.ctaButton, { marginTop: 30 }]} 
                   accessibilityLabel="Abrir pagamento" 
                   accessibilityRole="button"
                 >
                    <Text style={styles.ctaButtonText}>Pagar</Text>
                </Pressable>
            </View>
        </Pressable>
      </Modal>
    </>
  );

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <Text style={styles.logo}>ASPPIBRA-DAO</Text>
        {isMobile ? <MobileNav /> : <DesktopNav />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    // @ts-ignore - position sticky é específico para web
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backgroundColor: theme.header.background, // Cor do tema
    borderBottomWidth: 1,
    borderColor: theme.header.border, // Cor do tema
    alignItems: 'center',
    paddingVertical: 10,
    // @ts-ignore - backdropFilter é uma propriedade web
    backdropFilter: 'blur(10px)',
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
    color: theme.textSecondary, // Cor do tema
  },
  navContainer: {
    flexDirection: 'row',
    gap: 40,
  },
  navLink: {
    fontSize: 16,
    color: theme.textSecondary, // Cor do tema
    fontWeight: '500',
  },
  ctaButton: {
    backgroundColor: theme.primary, // Cor do tema
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: Colors.light.background, // Cor do tema (Branco)
    fontSize: 16,
    fontWeight: 'bold',
  },
  hamburgerButton: {
      padding: 10,
  },
  hamburgerIcon: {
      fontSize: 24,
      color: theme.textSecondary, // Cor do tema
  },
  overlay: {
    flex: 1,
    backgroundColor: theme.overlay, // Cor do tema
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  mobileMenuContainer: {
    backgroundColor: theme.mobileMenu.background, // Cor do tema
    width: '80%',
    height: '100%',
    padding: 40,
    // @ts-ignore - backdropFilter é uma propriedade web
    backdropFilter: 'blur(10px)',
  },
  closeButton: {
      alignSelf: 'flex-end',
      marginBottom: 30,
  },
  closeButtonText: {
      fontSize: 30,
      color: theme.textSecondary, // Cor do tema
  },
  mobileNavLink: {
    fontSize: 22,
    color: theme.textSecondary, // Cor do tema
    fontWeight: 'bold',
    marginBottom: 30,
  },
});

export default Header;
