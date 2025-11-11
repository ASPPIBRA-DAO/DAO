
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Ecosystem from '@/components/landing/Ecosystem';
import Community from '@/components/landing/Community';
import LatestNews from '@/components/landing/LatestNews';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/landing/Footer';

const COLORS = {
  background: '#FFFFFF',
};

// Um wrapper para facilitar a aplicação do estilo de snap
const SnapSection = ({ children }) => <View style={styles.snapSection}>{children}</View>;

export default function WebHomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollContainer}>
        <SnapSection><Hero /></SnapSection>
        <SnapSection><Ecosystem /></SnapSection>
        <SnapSection><Community /></SnapSection>
        <SnapSection><LatestNews /></SnapSection>
        <SnapSection><FinalCTA /></SnapSection>
        <SnapSection><Footer /></SnapSection>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // Estilos para o Scroll Snap
  scrollContainer: {
    // @ts-ignore - Propriedades web para scroll snap
    scrollSnapType: 'y mandatory',
    scrollPaddingTop: 80, // Garante que o header não sobreponha a seção
  },
  snapSection: {
    // @ts-ignore - Propriedades web para scroll snap
    scrollSnapAlign: 'start',
    width: '100%',
    // As seções precisam de uma altura definida para o snap funcionar corretamente.
    // Usamos minHeight para garantir que seções maiores não sejam cortadas.
    minHeight: '100vh', 
    justifyContent: 'center', // Centraliza o conteúdo da seção verticalmente
    alignItems: 'center', // Centraliza o conteúdo da seção horizontalmente
  },
});
