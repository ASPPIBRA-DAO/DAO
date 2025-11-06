
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '../../components/landing/Header';
import Hero from '../../components/landing/Hero';
import Ecosystem from '../../components/landing/Ecosystem';
import Community from '../../components/landing/Community';
import LatestNews from '../../components/landing/LatestNews';
import FinalCTA from '../../components/landing/FinalCTA';

const COLORS = {
  background: '#FFFFFF',
};

export default function WebHomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* O novo, modern header */}
      <Header />

      {/* The main content area */}
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
    </ScrollView>
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
  },
});
