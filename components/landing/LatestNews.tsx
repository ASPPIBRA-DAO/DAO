
import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';

const COLORS = {
  primary: '#6A4CFF',
  darkText: '#333333',
  lightText: '#555555',
  white: '#FFFFFF',
  borderColor: '#E0E0E0',
  cardBackground: '#FFFFFF',
  sectionBackground: '#F9FAFB',
  tagBackground: '#EFEBFF', 
  tagText: '#6A4CFF',
};

const newsItems = [
  {
    tag: 'Product',
    title: 'Nexera x Evergon Release v0.14: Mobile Readiness,...',
    link: '#',
  },
  {
    tag: 'Product',
    title: 'Nexera x Evergon Release v0.13: Full Indexation, Fractio...',
    link: '#',
  },
  {
    tag: 'Partnership',
    title: 'Nexera and GraphAI Partner to Bring Offchain AI Queries...',
    link: '#',
  },
  {
    tag: 'Announcement',
    title: 'Nexera Chain Mainnet Soft Launch Is Now Live',
    link: '#',
  },
];

const NewsCard = ({ item }) => (
  <View style={styles.newsCard}>
    <View style={styles.cardContent}>
      <Text style={styles.cardTag}>{item.tag}</Text>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardLink}>Read more →</Text>
    </View>
  </View>
);

const LatestNews = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width > 992;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest News</Text>
      
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
    backgroundColor: COLORS.sectionBackground,
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
    flexBasis: 'calc(25% - 18px)',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    justifyContent: 'space-between',
  },
  cardContent: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
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
    marginBottom: 24, // Added more space
  },
  cardLink: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary, // Changed to primary color
    marginTop: 'auto',
  },
});

export default LatestNews;
