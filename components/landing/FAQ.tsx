
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Colors } from '@/constants/theme';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const theme = Colors.light;

const faqData = [
  {
    question: 'O que é o Cultiva Agro e qual problema ele resolve?',
    answer: `O Cultiva Agro é uma plataforma que tokeniza ativos agrícolas, permitindo que produtores rurais acessem financiamento de forma mais direta e que investidores participem do agronegócio de maneira transparente e descentralizada. Resolvemos o problema da falta de liquidez e do acesso restrito a investimentos no setor.`,
  },
  {
    question: 'Como eu participo da pré-venda?',
    answer: `1. Conecte sua carteira digital (ex: MetaMask) em nosso site. 
2. Certifique-se de ter saldo em ETH ou USDT na rede Base. 
3. Insira o valor desejado, aprove a transação e confirme a compra dos seus tokens CULT.`,
  },
  {
    question: 'Qual a utilidade do token Cultiva Agro?',
    answer: `O token CULT é o coração do nosso ecossistema. Ele serve para: 
- Governança: Detentores de CULT podem votar em decisões importantes da plataforma. 
- Staking: Você pode bloquear seus tokens para receber recompensas. 
- Acesso: Garante acesso a oportunidades de investimento exclusivas na plataforma.`,
  },
  {
    question: 'O contrato da pré-venda foi auditado?',
    answer: `Sim. A segurança é nossa prioridade máxima. O contrato inteligente da pré-venda foi auditado pela [Nome da Empresa de Auditoria], uma firma renomada em segurança de blockchain. O relatório completo da auditoria pode ser encontrado aqui: [Link para o Relatório].`,
  },
  {
    question: 'Quando e como receberei meus tokens?',
    answer: `Os tokens CULT serão distribuídos diretamente em sua carteira após o encerramento da pré-venda. O processo de resgate (claim) será liberado em nosso site 24 horas após o término do período de venda.`,
  },
  {
    question: 'Existe algum período de bloqueio (vesting) para os tokens?',
    answer: `Sim, para garantir o alinhamento de longo prazo, os tokens da equipe e dos investidores iniciais possuem um período de vesting. Os tokens adquiridos na pré-venda, no entanto, estarão 100% líquidos e disponíveis para resgate após o encerramento.`,
  },
];

const FaqItem = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  return (
    <ThemedView style={styles.faqContainer}>
      <TouchableOpacity onPress={toggleOpen} style={styles.questionButton}>
        <ThemedText style={styles.questionText}>{item.question}</ThemedText>
        <Text style={styles.toggleIcon}>{isOpen ? '-' : '+'}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.answerContainer}>
          <ThemedText style={styles.answerText}>{item.answer}</ThemedText>
        </View>
      )}
    </ThemedView>
  );
};

export function FAQ() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Perguntas Frequentes</ThemedText>
      {faqData.map((item, index) => (
        <FaqItem key={index} item={item} index={index} />
      ))}
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
    marginBottom: 32,
  },
  faqContainer: {
    marginBottom: 12,
    width: '100%',
    maxWidth: 800,
    ...Colors.light.glassmorphism, // Aplicando o Glassmorphism
    borderWidth: 0, // Removendo a borda padrão se não quisermos
    overflow: 'hidden', // Garante que os cantos arredondados sejam aplicados
  },
  questionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.text,
    flex: 1, // Permite que o texto quebre a linha
  },
  toggleIcon: {
    fontSize: 24,
    color: theme.primary,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  answerContainer: {
    paddingTop: 0,
    paddingBottom: 18,
    paddingHorizontal: 24,
  },
  answerText: {
    fontSize: 16,
    color: theme.textSecondary,
    lineHeight: 24,
  },
});
