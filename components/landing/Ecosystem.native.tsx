
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '@/constants/theme';

const theme = Colors.light;

const EcosystemCard = ({ style, cardColor, title, text, image, isDark }) => (
  <View style={[styles.card, { backgroundColor: cardColor }, style]}>
    {image && <Image source={{ uri: image }} style={styles.cardImage} />}
    <Text style={[styles.cardTitle, isDark && { color: theme.card.text }]}>{title}</Text>
    <Text style={[styles.cardText, isDark && { color: theme.textTertiary }]}>{text}</Text>
    <Text style={[styles.cardLink, isDark && { color: theme.card.text }]}>Leia mais →</Text>
  </View>
);

const Ecosystem = () => {
  return (
    <View style={styles.container}>
      {/* Title Added as requested */}
      <Text style={styles.title}>Tokenomics</Text>

      {/* Original Card Structure Restored for Native (Vertical Stack) */}
      <View style={styles.cardContainer}>
        <EcosystemCard
          title="Lançamento Evergan v0.14"
          text="O Evergan v0.14 da Nexera é uma otimização de alta performance para dispositivos móveis, com página segura para relayers, acesso a help desk e um item avançado NRC-20 atualizável com o padrão ERC-20."
          cardColor={theme.card.backgroundDark}
          image="https://placehold.co/600x400/1A1A1A/FFFFFF?text=Evergan"
          isDark
        />
      </View>

      <View style={styles.cardContainer}>
        <EcosystemCard
          title="Indexação Completa e Relatórios"
          text="O Evergan v0.13 possui indexação completa on-chain, recuperação de forma livre, relatórios de minting sem gás e cargas de trabalho auditadas para maior transparência e segurança."
          cardColor={theme.card.backgroundDark}
          isDark
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: theme.background,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 32,
    textAlign: 'left',
  },
  cardContainer: {
    marginBottom: 24, // Space between cards
  },
  card: {
    borderRadius: 16,
    padding: 28,
    height: '100%',
    borderWidth: 1,
    borderColor: theme.border,
  },
  cardImage: {
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.card.text,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.textTertiary,
    marginBottom: 20,
  },
  cardLink: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.card.text,
    marginTop: 'auto',
  },
});

export default Ecosystem;
