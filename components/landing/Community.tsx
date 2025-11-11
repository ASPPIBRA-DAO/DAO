
import React from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';

const COLORS = {
  primary: '#6A4CFF',
  darkText: '#333333',
  lightText: '#555555',
  white: '#FFFFFF',
  borderColor: '#E0E0E0',
  cardBackground: '#F5F5F5', // Standardized card color
};

// Community Card Component
const CommunityCard = ({ icon, name, members }) => (
  <View style={styles.communityCard}>
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
      <Text style={styles.eyebrow}>COMMUNITY</Text>
      <Text style={styles.title}>A community shaping the future, together</Text>
      <Text style={styles.subtitle}>
        Builders, investors, and contributors are driving blockchain innovation on Nexera Chain. Join the conversation, share ideas, and participate in governance.
      </Text>
      <Pressable style={styles.ctaButton}>
        <Text style={styles.ctaButtonText}>Join our communities</Text>
      </Pressable>

      <View style={[styles.cardGrid, !isDesktop && styles.cardGridMobile]}>
        <CommunityCard icon="X" name="Nexera Official" members="40,000+ followers" />
        <CommunityCard icon="B" name="Nexera Foundation" members="20,000+ members" />
        <CommunityCard icon="C" name="Nexera Community" members="10,000+ members" />
        <CommunityCard icon="in" name="Nexera Foundation" members="5,000+ connections" />
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
    color: COLORS.primary, // Standardized color
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
    backgroundColor: COLORS.cardBackground, // Standardized background
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  cardIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: COLORS.primary, // Themed icon color
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
