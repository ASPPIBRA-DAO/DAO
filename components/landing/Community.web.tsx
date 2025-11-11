
import React from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { Colors } from '@/constants/theme'; // Importa as cores centralizadas

// Para simplificar, vamos usar o tema 'light' por enquanto.
const theme = Colors.light;

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
  const isMobile = width < 768;
  const isDesktop = width > 992;

  const titleFontSize = isMobile ? 36 : 48;

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>COMUNIDADE</Text>
      <Text style={[styles.title, { fontSize: titleFontSize }]}>Uma comunidade moldando o futuro, juntos</Text>
      <Text style={styles.subtitle}>
        Construtores, investidores e contribuidores estão impulsionando a inovação em blockchain na Nexera Chain. Junte-se à conversa, compartilhe ideias e participe da governança.
      </Text>
      <Pressable style={styles.ctaButton}>
        <Text style={styles.ctaButtonText}>Junte-se às nossas comunidades</Text>
      </Pressable>

      <View style={[styles.cardGrid, !isDesktop && styles.cardGridMobile]}>
        <CommunityCard icon="X" name="Nexera Oficial" members="40.000+ seguidores" color={theme.card.community.lightBlue} />
        <CommunityCard icon="B" name="Fundação Nexera" members="20.000+ membros" color={theme.card.community.lightOrange} />
        <CommunityCard icon="C" name="Comunidade Nexera" members="10.000+ membros" color={theme.card.community.lightGreen} />
        <CommunityCard icon="in" name="Fundação Nexera" members="5.000+ conexões" color={theme.card.community.lightPink} />
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
    color: theme.primaryAlt, // Cor do tema (Roxo)
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    color: theme.textSecondary, // Cor do tema
    textAlign: 'center',
    maxWidth: 700,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 18,
    color: theme.textTertiary, // Cor do tema
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 650,
    marginBottom: 32,
  },
  ctaButton: {
    backgroundColor: theme.background, // Cor do tema
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.border, // Cor do tema
    marginBottom: 48,
  },
  ctaButtonText: {
    color: theme.textSecondary, // Cor do tema
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
    minHeight: 180,
  },
  cardIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.textSecondary, // Cor do tema
    marginBottom: 8,
  },
  cardMembers: {
    fontSize: 16,
    color: theme.textTertiary, // Cor do tema
  },
});

export default Community;
