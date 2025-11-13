
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { Colors } from '@/constants/theme';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
// Você pode usar um ícone real de uma biblioteca como @expo/vector-icons
import { FontAwesome } from '@expo/vector-icons';

const theme = Colors.light;

const teamData = [
  {
    name: 'Nome do Fundador',
    role: 'CEO & Fundador',
    image: 'https://via.placeholder.com/150', // Substitua pela URL da imagem real
    social: {
      linkedin: 'https://www.linkedin.com/',
      twitter: 'https://twitter.com/',
    },
  },
  {
    name: 'Nome do CTO',
    role: 'CTO & Arquiteto Blockchain',
    image: 'https://via.placeholder.com/150',
    social: {
      linkedin: 'https://www.linkedin.com/',
      twitter: 'https://twitter.com/',
    },
  },
  {
    name: 'Nome do Especialista',
    role: 'Especialista em RWA',
    image: 'https://via.placeholder.com/150',
    social: {
      linkedin: 'https://www.linkedin.com/',
      twitter: 'https://twitter.com/',
    },
  },
];

const openLink = (url) => {
  Linking.openURL(url).catch((err) => console.error('An error occurred', err));
};

const TeamMemberCard = ({ member }) => (
  <View style={[styles.card, theme.glassmorphism]}>
    <Image source={{ uri: member.image }} style={styles.image} />
    <Text style={styles.name}>{member.name}</Text>
    <Text style={styles.role}>{member.role}</Text>
    <View style={styles.socialContainer}>
      <TouchableOpacity onPress={() => openLink(member.social.linkedin)}>
        <FontAwesome name="linkedin-square" size={24} color={theme.primary} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openLink(member.social.twitter)}>
        <FontAwesome name="twitter-square" size={24} color={theme.primary} style={{ marginLeft: 15 }} />
      </TouchableOpacity>
    </View>
  </View>
);

export function Team() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Quem Nós Somos</ThemedText>
      <View style={styles.grid}>
        {teamData.map((member, index) => (
          <TeamMemberCard key={index} member={member} />
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: theme.background,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
  },
  card: {
    width: 280,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: theme.primary,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: theme.primary,
    fontWeight: '600',
    marginBottom: 16,
  },
  socialContainer: {
    flexDirection: 'row',
  },
});
