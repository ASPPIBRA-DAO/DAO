
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '../../components/landing/Header';
import Hero from '../../components/landing/Hero';
import Ecosystem from '../../components/landing/Ecosystem';
import Community from '../../components/landing/Community';
import LatestNews from '../../components/landing/LatestNews';
import FinalCTA from '../../components/landing/FinalCTA';
import Footer from '../../components/landing/Footer';

const COLORS = {
  background: '#FFFFFF',
};

const HEADER_HEIGHT = 80;

export default function WebHomeScreen() {
  return (
    <View style={styles.container}>
      <Header />

      <ScrollView>
        {/* Adiciona padding ao topo para não ficar atrás do header */}
        <View style={styles.content}>
          <Hero />
          <Ecosystem />
          <Community />
          <LatestNews />
          <FinalCTA />
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingTop: HEADER_HEIGHT, // Evita que o conteúdo comece por baixo do cabeçalho
  },
});
