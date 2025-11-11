
import React from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions, Image } from 'react-native';

const COLORS = {
  darkText: '#333333',
  lightText: '#555555',
  white: '#FFFFFF',
  borderColor: '#E0E0E0',
  cardBackground: '#FFFFFF',
  tagBackground: '#EFEBFF', // Light purple for tags
  tagText: '#6A4CFF',
};

const newsItems = [
  {
    tag: 'Produto',
    title: 'Nexera x Evergon Lançamento v0.14: Prontidão para Dispositivos Móveis,...',
    image: 'https://placehold.co/400x250/FFC107/FFFFFF?text=Notícia+1',
    link: '#',
  },
  {
    tag: 'Produto',
    title: 'Nexera x Evergon Lançamento v0.13: Indexação Completa, Fractio...',
    image: 'https://placehold.co/400x250/F44336/FFFFFF?text=Notícia+2',
    link: '#',
  },
  {
    tag: 'Parceria',
    title: 'Nexera e GraphAI se unem para trazer consultas de IA Offchain...',
    image: 'https://placehold.co/400x250/2196F3/FFFFFF?text=Notícia+3',
    link: '#',
  },
  {
    tag: 'Anúncio',
    title: 'Lançamento Suave da Mainnet da Nexera Chain Já Disponível',
    image: 'https://placehold.co/400x250/9C27B0/FFFFFF?text=Notícia+4',
    link: '#',
  },
];

const NewsCard = ({ item }) => (
  <View style={styles.newsCard}>
    <Image source={{ uri: item.image }} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <Text style={styles.cardTag}>{item.tag}</Text>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardLink}>Leia mais →</Text>
    </View>
  </View>
);

const LatestNews = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width > 992;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Últimas Notícias</Text>
      
      {/* TODO: Add filter buttons */}
      
      <View style={[styles.newsGrid, !isDesktop && styles.newsGridMobile]}>
        {newsItems.map((item, index) => (
          <NewsCard key={index} item={item} />
        ))}
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
    backgroundColor: '#F9FAFB', // A very light gray background for the section
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.darkText,
    marginBottom: 48,
    alignSelf: 'flex-start',
  },
  newsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    width: '100%',
  },
  newsGridMobile: {
    flexDirection: 'column',
  },
  newsCard: {
    flexBasis: 'calc(25% - 18px)', // For a 4-column layout with 24px gap
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 20,
  },
  cardTag: {
    color: COLORS.tagText,
    backgroundColor: COLORS.tagBackground,
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkText,
    marginBottom: 12,
  },
  cardLink: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.darkText,
    marginTop: 'auto',
  },
});

export default LatestNews;
