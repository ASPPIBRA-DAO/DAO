
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

export default function WebHomeScreen() {
  return (
    <View style={styles.container}>
      {/* O Header agora está fora do ScrollView para ficar fixo no topo */}
      <Header />

      {/* O ScrollView contém todo o conteúdo que pode ser rolado */}
      <ScrollView>
        {/* Um container para o conteúdo principal com padding no topo */}
        <View style={styles.content}>
          {/* The hero section with the main title */}
          <Hero />

          {/* A seção de ecossistema com os cards */}
          <Ecosystem />

          {/* A seção da comunidade */}
          <Community />

          {/* A seção de últimas notícias */}
          <LatestNews />

          {/* A seção final de CTA */}
          <FinalCTA />
        </View>

        {/* O novo rodapé */}
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
    paddingTop: 80, // Espaço para não sobrepor o conteúdo pelo Header
  },
});
