import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

// 1. CORRIGINDO A IMPORTAÇÃO PARA USAR O TEMA GLOBAL EXISTENTE
import { Colors } from '../../constants/theme'; 

// DADOS DAS NOTÍCIAS
const newsItems = [
  {
    tag: 'ETHGlobal',
    title: 'ASPFIBRA-DAO Apresenta o Cultiva Agro no ETHGlobal HackFS 2024',
    text: 'Integrando IPFS, DeFi, RWA e IA para fortalecer o financiamento descentralizado na produção agrícola.',
    image: 'https://placehold.co/400x250/FFC107/FFFFFF?text=Cultiva+Agro',
    link: '#',
  },
  {
    tag: 'RWA / Parceria',
    title: 'ASPFIBRA-DAO e AAPOP lançam modelo de Agro Sustentável com Blockchain em Paraty',
    text: 'Uma parceria para fortalecer a agricultura familiar e sustentável em Paraty, utilizando a tecnologia blockchain.',
    image: 'https://placehold.co/400x250/F44336/FFFFFF?text=Parceria+AAPOP',
    link: '#',
  },
  {
    tag: 'IA / Produto',
    title: 'Cultiva Agro Lança Módulo de IA para Análise de Risco Agrícola',
    text: 'A nova funcionalidade usa IA para análise preditiva de safras, otimizando o financiamento descentralizado.',
    image: 'https://placehold.co/400x250/2196F3/FFFFFF?text=Módulo+IA',
    link: '#',
  },
  {
    tag: 'Mainnet / Infra',
    title: 'Mainnet da ASPFIBRA-DAO Chain Lançada: A Base do Cultiva Agro',
    text: 'Nossa mainnet própria entra em operação, garantindo a escalabilidade e segurança para o Cultiva Agro.',
    image: 'https://placehold.co/400x250/9C27B0/FFFFFF?text=Mainnet',
    link: '#',
  },
  {
    tag: 'Segurança / Auditoria',
    title: 'Contratos do Cultiva Agro Auditados com Sucesso pela [Nome da Empresa]',
    text: 'A [Nome da Empresa], líder em segurança, concluiu a auditoria, garantindo a proteção dos fundos e a integridade do protocolo para a pré-venda.',
    image: 'https://placehold.co/400x250/4CAF50/FFFFFF?text=Auditoria+Concluída',
    link: '#',
  },
  {
    tag: 'DAO / Governança',
    title: 'Governança da ASPFIBRA-DAO Ativada: Detentores de Token Votam na 1ª Proposta',
    text: 'O portal de governança está no ar. Detentores do nosso token agora podem criar e votar em propostas que definem o futuro do ecossistema.',
    image: 'https://placehold.co/400x250/FF9800/FFFFFF?text=Governança+Ativa',
    link: '#',
  },
];

// O componente do cartão de notícias permanece o mesmo
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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Últimas Notícias</Text>
      
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={true} 
        initialSlide={3} 
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Navigation]}
        navigation={true}
        style={{ width: '100%', paddingVertical: 50 }}
      >
        {newsItems.map((item, index) => (
          <SwiperSlide key={index} style={{ width: 350, height: 500 }}>
            <NewsCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </View>
  );
};

// 2. ATUALIZANDO OS ESTILOS PARA USAR O OBJETO 'Colors'
const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 1200,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 80,
    backgroundColor: Colors.light.background, // Usando a cor de fundo correta
    alignSelf: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.light.text, // Usando a cor de texto correta
    marginBottom: 48,
    alignSelf: 'flex-start',
  },
  newsCard: {
    backgroundColor: Colors.light.background, // Usando a cor de fundo do cartão
    borderColor: Colors.light.tint, // Usando uma cor de borda do tema
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: 480,
    width: '100%',
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
    color: Colors.light.tint, // Usando a cor de destaque do tema
    backgroundColor: 'rgba(52, 199, 89, 0.1)', // Um fundo verde claro para a tag
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
    color: Colors.light.text, // Cor de texto
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: Colors.light.text, // Cor de texto
    marginBottom: 12,
    flex: 1, 
  },
  cardLink: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.tint, // Cor de destaque para o link
    marginTop: 'auto', 
  },
});

export default LatestNews;
