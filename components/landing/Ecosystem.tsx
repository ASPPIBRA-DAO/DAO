
import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Image } from 'react-native';

const COLORS = {
  primary: '#6A4CFF',
  darkText: '#333333',
  lightText: '#555555',
  white: '#FFFFFF',
  cardBorder: '#E0E0E0',
  cardBackground: '#FFFFFF',
  blueCardBackground: '#E9EFFF',
  darkCardBackground: '#1A1A1A',
};

// Placeholder Card Component
const EcosystemCard = ({ style, cardColor, title, text, image, isDark }) => (
  <View style={[styles.card, { backgroundColor: cardColor }, style]}>
    {image && <Image source={{ uri: image }} style={styles.cardImage} />}
    <Text style={[styles.cardTitle, isDark && { color: COLORS.white }]}>{title}</Text>
    <Text style={[styles.cardText, isDark && { color: COLORS.lightText }]}>{text}</Text>
    <Text style={[styles.cardLink, isDark && { color: COLORS.white }]}>Leia mais →</Text>
  </View>
);

const Ecosystem = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width > 992;

  return (
    <View style={styles.container}>
      <View style={[styles.columnLayout, !isDesktop && styles.columnLayoutMobile]}>
        {/* Coluna da Esquerda (Card Grande) */}
        <View style={styles.leftColumn}>
          <EcosystemCard 
            title="Lançamento Evergan v0.14"
            text="O Evergan v0.14 da Nexera é uma otimização de alta performance para dispositivos móveis, com página segura para relayers, acesso a help desk e um item avançado NRC-20 atualizável com o padrão ERC-20."
            cardColor={COLORS.darkCardBackground}
            image="https://placehold.co/600x400/1A1A1A/FFFFFF?text=Evergan"
            isDark
          />
        </View>

        {/* Coluna da Direita (Card Pequeno) */}
        <View style={styles.rightColumn}>
          <EcosystemCard 
            title="Indexação Completa e Relatórios"
            text="O Evergan v0.13 possui indexação completa on-chain, recuperação de forma livre, relatórios de minting sem gás e cargas de trabalho auditadas para maior transparência e segurança."
            cardColor={COLORS.darkCardBackground}
            isDark
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
    marginTop: -40, // Puxa a seção para cima, sobrepondo-se ao fundo do Hero
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
  },
  cardImage: {
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
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
    color: COLORS.darkText,
    marginTop: 'auto',
  },
});

export default Ecosystem;
