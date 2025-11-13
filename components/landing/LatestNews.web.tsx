
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Slider from 'react-slick';

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
    tag: 'Eventos',
    title: 'ASPFIBRA-DAO Apresenta o Cultiva Agro no ETHGlobal HackFS 2024',
    text: 'Integrando IPFS, DeFi, RWA e IA para fortalecer o financiamento descentralizado na produção agrícola.',
    image: 'https://placehold.co/400x250/FFC107/FFFFFF?text=Notícia+1',
    link: '#',
  },
  {
    tag: 'RWA / Parceria',
    title: 'ASPFIBRA-DAO e AAPOP lançam modelo de Agro Sustentável com Blockchain em Paraty',
    text: 'Uma parceria para fortalecer a agricultura familiar e sustentável em Paraty, utilizando a tecnologia blockchain para garantir transparência e rastreabilidade.',
    image: 'https://placehold.co/400x250/F44336/FFFFFF?text=Notícia+2',
    link: '#',
  },
  {
    tag: 'Parceria',
    title: 'Nexera e GraphAI se unem para trazer consultas de IA Offchain...',
    text: 'A colaboração visa permitir que contratos inteligentes consultem IAs de forma descentralizada e segura.',
    image: 'https://placehold.co/400x250/2196F3/FFFFFF?text=Notícia+3',
    link: '#',
  },
  {
    tag: 'Anúncio',
    title: 'Lançamento Suave da Mainnet da Nexera Chain Já Disponível',
    text: 'A nova mainnet promete maior escalabilidade e segurança para os aplicativos descentralizados da rede.',
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
      <Text style={styles.cardText}>{item.text}</Text>
      <Text style={styles.cardLink}>Leia mais →</Text>
    </View>
  </View>
);

const LatestNews = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "40px",
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
        }
      }
    ]
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Últimas Notícias</Text>
      
      <View style={styles.carouselContainer}>
        <Slider {...settings}>
          {newsItems.map((item, index) => (
            <NewsCard key={index} item={item} />
          ))}
        </Slider>
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
    backgroundColor: '#F9FAFB',
    alignSelf: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.darkText,
    marginBottom: 48,
    alignSelf: 'flex-start',
  },
  carouselContainer: {
    width: '100%',
  },
  newsCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    marginHorizontal: 15, // Add horizontal margin for spacing between cards
    display: 'flex',
    flexDirection: 'column',
    height: 480, 
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 20,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
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
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: COLORS.lightText,
    marginBottom: 12,
    flex: 1, // Allow text to take available space
  },
  cardLink: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.darkText,
    marginTop: 'auto', // Push to the bottom
  },
});

export default LatestNews;
