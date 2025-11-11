
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions, Modal } from 'react-native';

const COLORS = {
  primary: '#007BFF',
  white: '#FFFFFF',
  darkText: '#343A40',
  // Adicionando cores para o efeito de vidro
  glassBackground: 'rgba(255, 255, 255, 0.8)',
  glassBorder: 'rgba(255, 255, 255, 0.2)',
  overlay: 'rgba(0, 0, 0, 0.5)', // Overlay um pouco mais claro
};

const Header = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [menuOpen, setMenuOpen] = useState(false);

  const DesktopNav = () => (
    <>
      <View style={styles.navContainer}>
        <Text style={styles.navLink}>Início</Text>
        <Text style={styles.navLink}>Sobre</Text>
        <Text style={styles.navLink}>Propostas</Text>
        <Text style={styles.navLink}>Contato</Text>
      </View>
      <Pressable style={styles.ctaButton}>
        <Text style={styles.ctaButtonText}>Conectar Carteira</Text>
      </Pressable>
    </>
  );

  const MobileNav = () => (
    <>
      <Pressable onPress={() => setMenuOpen(true)} style={styles.hamburgerButton}>
        <Text style={styles.hamburgerIcon}>☰</Text>
      </Pressable>
      <Modal
        transparent={true}
        visible={menuOpen}
        animationType="fade"
        onRequestClose={() => setMenuOpen(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setMenuOpen(false)}>
            <View style={styles.mobileMenuContainer}>
                <Pressable onPress={() => setMenuOpen(false)} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>×</Text>
                </Pressable>
                <Text style={styles.mobileNavLink} onPress={() => setMenuOpen(false)}>Início</Text>
                <Text style={styles.mobileNavLink} onPress={() => setMenuOpen(false)}>Sobre</Text>
                <Text style={styles.mobileNavLink} onPress={() => setMenuOpen(false)}>Propostas</Text>
                <Text style={styles.mobileNavLink} onPress={() => setMenuOpen(false)}>Contato</Text>
                 <Pressable style={[styles.ctaButton, { marginTop: 30 }]}>
                    <Text style={styles.ctaButtonText}>Conectar Carteira</Text>
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
    position: 'fixed', // Fixo no topo
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: COLORS.glassBackground, // Fundo de vidro
    borderBottomWidth: 1,
    borderColor: COLORS.glassBorder, // Borda de vidro
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
  hamburgerButton: {
      padding: 10,
  },
  hamburgerIcon: {
      fontSize: 24,
      color: COLORS.darkText,
  },
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  mobileMenuContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fundo de vidro mais opaco
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
      color: COLORS.darkText,
  },
  mobileNavLink: {
    fontSize: 22,
    color: COLORS.darkText,
    fontWeight: 'bold',
    marginBottom: 30,
  },
});

export default Header;
