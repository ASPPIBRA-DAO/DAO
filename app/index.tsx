
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Community,
  Ecosystem,
  FAQ,
  FinalCTA,
  Footer,
  Header,
  Hero,
  LatestNews,
  Roadmap,
  Team,
} from '@/components/landing';
import { Colors } from '@/constants/theme';

const theme = Colors.light;

export default function WebHomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Header />
        <View style={styles.content}>
          <Hero />
          <Ecosystem />
          <Community />
          <Team />
          <LatestNews />
          <Roadmap />
          <FAQ />
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
    backgroundColor: theme.background,
  },
  content: {
    alignItems: 'center',
    backgroundColor: theme.background,
  },
});
