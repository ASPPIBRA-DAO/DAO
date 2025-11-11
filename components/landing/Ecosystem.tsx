
import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';

const COLORS = {
  primary: '#6A4CFF',
  darkText: '#333333',
  lightText: '#555555',
  cardBackground: '#F5F5F5',
  cardBorder: '#E0E0E0',
};

// Ecosystem Card Component
const EcosystemCard = ({ title, text }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardText}>{text}</Text>
    <Text style={styles.cardLink}>Read more →</Text>
  </View>
);

const Ecosystem = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width > 992;

  return (
    <View style={styles.container}>
      <View style={[styles.columnLayout, !isDesktop && styles.columnLayoutMobile]}>
        {/* Left Column (Large Card) */}
        <View style={styles.leftColumn}>
          <EcosystemCard 
            title="Evergan v0.14 Release"
            text="Nexera's Evergan v0.14 is a high-mobile optimization, relayer safe page, help desk access, and an upgradeable NRC-20 Adance Item with the ERC-20 standard."
          />
        </View>

        {/* Right Column (2 Small Cards) */}
        <View style={styles.rightColumn}>
          <EcosystemCard 
            title="Full Indexation & Reports"
            text="Evergan v0.13 has full on-chain indexation, free-form recovery, gas-free minting reports, and audited workloads for greater transparency and security."
          />
          <EcosystemCard 
            title="GraphAI Integration"
            text="GraphAI and Nexera unlock query mining by turning AI-driven natural language queries into on-chain verifiable results using the NRC-720B standard."
          />
        </View>
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
    marginTop: -40, 
    marginBottom: 60,
  },
  columnLayout: {
    flexDirection: 'row',
    width: '100%',
    gap: 24,
  },
  columnLayoutMobile: {
    flexDirection: 'column',
  },
  leftColumn: {
    flex: 2,
  },
  rightColumn: {
    flex: 1,
    gap: 24,
  },
  card: {
    borderRadius: 16,
    padding: 28,
    height: '100%',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.cardBackground,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkText,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.lightText,
    marginBottom: 20,
  },
  cardLink: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary, // Changed to primary color for emphasis
    marginTop: 'auto',
  },
});

export default Ecosystem;
