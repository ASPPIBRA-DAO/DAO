
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions, Linking, Image } from 'react-native';
import { Colors } from '@/constants/theme';

const theme = Colors.light;

const CommunityCard = ({ name, members, color, url, ctaText, iconUrl }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      onPress={() => Linking.openURL(url)}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      style={[
        styles.communityCard,
        { backgroundColor: color },
        isHovered && styles.cardHover,
      ]}
    >
      <View>
        <Image source={{ uri: iconUrl }} style={styles.cardIconImage} />
        <Text style={styles.cardName}>{name}</Text>
        <Text style={styles.cardMembers}>{members}</Text>
      </View>
      <Text style={styles.cardAction}>{ctaText}</Text>
    </Pressable>
  );
};

const Community = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isDesktop = width > 992;

  const titleFontSize = isMobile ? 36 : 48;

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>COMUNIDADE</Text>
      <Text style={[styles.title, { fontSize: titleFontSize }]}>Uma comunidade moldando o futuro, juntos</Text>
      <Text style={styles.subtitle}>
        Construtores, investidores e contribuidores estão impulsionando a inovação em blockchain na ASPPIBRA-DAO. Junte-se à conversa, compartilhe ideias e participe da governança.
      </Text>

      <View style={[styles.cardGrid, !isDesktop && styles.cardGridMobile]}>
        <CommunityCard
          name="ASPPIBRA-DAO no X"
          members="[Número de seguidores] seguidores"
          color={theme.card.community.lightBlue}
          url="https://x.com/ASPPIBRA_ORG"
          ctaText="Seguir →"
          iconUrl="https://simpleicons.org/icons/x.svg"
        />
        <CommunityCard
          name="ASPPIBRA-DAO no LinkedIn"
          members="[Número de conexões] conexões"
          color={theme.card.community.lightPink}
          url="https://www.linkedin.com/company/asppibra-dao/"
          ctaText="Conectar →"
          iconUrl="https://simpleicons.org/icons/linkedin.svg"
        />
        <CommunityCard
          name="Comunidade (BR)"
          members="[Número de membros] membros"
          color={theme.card.community.lightOrange}
          url="https://t.me/Mundo_Digital_BR"
          ctaText="Entrar →"
          iconUrl="https://simpleicons.org/icons/telegram.svg"
        />
        <CommunityCard
          name="Comunidade (EUA/Global)"
          members="[Número de membros] membros"
          color={theme.card.community.lightGreen}
          url="https://t.me/Mundo_Digital_EUA"
          ctaText="Entrar →"
          iconUrl="https://simpleicons.org/icons/telegram.svg"
        />
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
  },
  eyebrow: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.primaryAlt,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    color: theme.textSecondary,
    textAlign: 'center',
    maxWidth: 700,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 18,
    color: theme.textTertiary,
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 650,
    marginBottom: 32,
  },
  cardGrid: {
    flexDirection: 'row',
    gap: 24,
    width: '100%',
  },
  cardGridMobile: {
    flexDirection: 'column',
  },
  communityCard: {
    flex: 1,
    borderRadius: 16,
    padding: 24,
    minHeight: 180,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.2s ease-in-out',
  },
  cardHover: {
    transform: [{ scale: 1.02 }],
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
  },
  cardIconImage: {
    width: 32,
    height: 32,
    marginBottom: 16,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.textSecondary,
    marginBottom: 8,
  },
  cardMembers: {
    fontSize: 16,
    color: theme.textTertiary,
  },
  cardAction: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.textSecondary,
    marginTop: 16,
  }
});

export default Community;
