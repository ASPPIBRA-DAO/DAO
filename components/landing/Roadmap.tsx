
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors } from '@/constants/theme';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const theme = Colors.light;

const roadmapData = [
  {
    quarter: 'Q4 2025',
    milestones: [
      '✅ Lançamento do Projeto Cultiva Agro',
      '✅ Auditoria de Contrato Concluída',
      '🚀 Início da Pré-Venda',
    ],
  },
  {
    quarter: 'Q1 2026',
    milestones: [
      '🏦 Listagem em Exchanges (CEX/DEX)',
      '🗳️ Ativação Total da Governança da DAO',
      '🤝 Expansão de Parcerias RWA',
    ],
  },
  {
    quarter: 'Q2 2026',
    milestones: [
      '📈 Lançamento do Módulo 2.0 (Staking / Financiamento com IA)',
      '🌐 Expansão para novas cadeias (multi-chain)',
    ],
  },
];

const RoadmapItem = ({ item, isLast }) => (
  <View style={styles.itemContainer}>
    <View style={styles.lineArea}>
      <View style={styles.dot} />
      {!isLast && <View style={styles.line} />}
    </View>
    <View style={[styles.card, theme.glassmorphism]}>
      <Text style={styles.quarter}>{item.quarter}</Text>
      {item.milestones.map((milestone, index) => (
        <Text key={index} style={styles.milestone}>{
          milestone
        }</Text>
      ))}
    </View>
  </View>
);

export function Roadmap() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Roadmap</ThemedText>
      <FlatList
        data={roadmapData}
        keyExtractor={(item) => item.quarter}
        renderItem={({ item, index }) => (
          <RoadmapItem item={item} isLast={index === roadmapData.length - 1} />
        )}
      />
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
  itemContainer: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 800,
    marginBottom: 20,
  },
  lineArea: {
    alignItems: 'center',
    marginRight: 20,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'gold', // Cor Dourada
    borderWidth: 2,
    borderColor: theme.primary,
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: theme.primary,
  },
  card: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
  },
  quarter: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 12,
  },
  milestone: {
    fontSize: 16,
    color: theme.textSecondary,
    marginBottom: 8,
    lineHeight: 22,
  },
});
