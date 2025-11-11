
import React from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';

const COLORS = {
  primary: '#6A4CFF',
  darkText: '#333333',
  lightText: '#555555',
  white: '#FFFFFF',
  borderColor: '#E0E0E0',
  // Card specific colors from the design
  lightBlue: '#E3F2FD',
  lightOrange: '#FFE0B2',
  lightGreen: '#D7FFD9',
  lightPink: '#FCE4EC',
};

// Placeholder for community cards
const CommunityCard = ({ icon, name, members, color }) => (
  <View style={[styles.communityCard, { backgroundColor: color }]}>
    <Text style={styles.cardIcon}>{icon}</Text>
    <Text style={styles.cardName}>{name}</Text>
    <Text style={styles.cardMembers}>{members}</Text>
  </View>
);

const Community = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width > 992;

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>COMUNIDADE</Text>
      <Text style={styles.title}>Uma comunidade moldando o futuro, juntos</Text>
      <Text style={styles.subtitle}>
        Construtores, investidores e contribuidores estão impulsionando a inovação em blockchain na Nexera Chain. Junte-se à conversa, compartilhe ideias e participe da governança.
      </Text>
      <Pressable style={styles.ctaButton}>
        <Text style={styles.ctaButtonText}>Junte-se às nossas comunidades</Text>
      </Pressable>

      <View style={[styles.cardGrid, !isDesktop && styles.cardGridMobile]}>
        <CommunityCard icon="X" name="Nexera Oficial" members="40.000+ seguidores" color={COLORS.lightBlue} />
        <CommunityCard icon="B" name="Fundação Nexera" members="20.000+ membros" color={COLORS.lightOrange} />
        <CommunityCard icon="C" name="Comunidade Nexera" members="10.000+ membros" color={COLORS.lightGreen} />
        <CommunityCard icon="in" name="Fundação Nexera" members="5.000+ conexões" color={COLORS.lightPink} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 1200,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 80,
  },
  eyebrow: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.darkText,
    textAlign: 'center',
    maxWidth: 700,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.lightText,
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 650,
    marginBottom: 32,
  },
  ctaButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    marginBottom: 48,
  },
  ctaButtonText: {
    color: COLORS.darkText,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardGrid: {
    flexDirection: 'row',
    gap: 24,
    width: '100%',
  },
  cardGridMobile: {
    flexDirection: 'column',
  },
  communityCard: {
    flex: 1,
    borderRadius: 16,
    padding: 24,
    height: 180,
  },
  cardIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkText,
    marginBottom: 8,
  },
  cardMembers: {
    fontSize: 16,
    color: COLORS.lightText,
  },
});

export default Community;
