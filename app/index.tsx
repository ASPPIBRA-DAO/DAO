
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Community,
  Ecosystem,
  FinalCTA,
  Footer,
  Header,
  Hero,
  LatestNews,
} from '@/components/landing';
import { Colors } from '@/constants/theme'; // Importa as cores centralizadas

// Para simplificar, vamos usar o tema 'light' por enquanto.
const theme = Colors.light;

export default function WebHomeScreen() {
  return (
    <View style={styles.container}>
      {/* O ScrollView agora envolve toda a página, incluindo o Header */}
      <ScrollView>
        <Header />
        {/* O conteúdo principal da página */}
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
    backgroundColor: theme.background, // Cor do tema
  },
  content: {
    alignItems: 'center',
    backgroundColor: theme.background, // Cor do tema
    // O paddingTop foi removido, pois o Header agora faz parte do fluxo de rolagem
  },
});
