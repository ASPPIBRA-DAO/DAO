
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Usando os mesmos dados da versão web para consistência
const timelineData = [
  {
    id: 1,
    year: '2024',
    color: '#f39c12',
    title: 'YOUR TITLE',
    text: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
  },
  {
    id: 2,
    year: '2025',
    color: '#e74c3c',
    title: 'YOUR TITLE',
    text: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
  },
  {
    id: 3,
    year: '2026',
    color: '#2ecc71',
    title: 'YOUR TITLE',
    text: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
  },
  {
    id: 4,
    year: '2027',
    color: '#3498db',
    title: 'YOUR TITLE',
    text: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
  },
  {
    id: 5,
    year: '2028',
    color: '#9b59b6',
    title: 'YOUR TITLE',
    text: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
  },
  {
    id: 6,
    year: '2029',
    color: '#1abc9c',
    title: 'YOUR TITLE',
    text: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.",
  },
];

// Componente para cada item da timeline vertical
const TimelineItem = ({ item, isLast }) => (
  <View style={styles.itemContainer}>
    <View style={styles.lineArea}>
      {/* O ponto, agora usando a cor do item */}
      <View style={[styles.dot, { backgroundColor: item.color, borderColor: item.color }]} />
      {/* A linha vertical, que não aparece no último item */}
      {!isLast && <View style={styles.line} />}
    </View>
    <View style={[styles.card, { borderColor: item.color }]}>
      <Text style={styles.year}>{item.year}</Text>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardText}>{item.text}</Text>
      {/* O número, estilizado de forma similar à web */}
      <View style={[styles.cardNumber, { backgroundColor: item.color }]}>
        <Text style={styles.cardNumberText}>{item.id}</Text>
      </View>
    </View>
  </View>
);

// Componente principal do Roadmap Nativo
export function Roadmap() {
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Roadmap</Text>
      <FlatList
        data={timelineData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <TimelineItem item={item} isLast={index === timelineData.length - 1} />
        )}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
    </View>
  );
}

// Estilos para o componente nativo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingVertical: 50,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  lineArea: {
    alignItems: 'center',
    marginRight: 15,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    zIndex: 1,
  },
  line: {
    flex: 1,
    width: 3,
    backgroundColor: '#ddd',
    marginTop: -2, // Leve sobreposição para conectar com o ponto
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderRadius: 15,
    padding: 20,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    paddingTop: 30, // Espaço para o número
  },
  year: {
    fontSize: 20,
    fontWeight: '700',
    color: '#555',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  cardNumber: {
    position: 'absolute',
    top: -18,
    left: '50%',
    transform: [{ translateX: -18 }],
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  cardNumberText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default Roadmap;
