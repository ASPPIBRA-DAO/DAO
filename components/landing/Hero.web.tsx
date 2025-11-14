
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  Pressable 
} from 'react-native';
import { Colors } from '@/constants/theme'; // Caminho ajustado para consistência

// --- NOTA: Coloque a URL da sua imagem de fundo aqui ---
// (Sugestão: uma foto de cidade/campo do Brasil)
const backgroundImage = { uri: 'https://images.unsplash.com/photo-1503221342240-6D83434d3e32?q=80&w=2670&auto=format&fit=crop' };

export default function Hero() {
  return (
    <View style={styles.wrapper}>
      <ImageBackground 
        source={backgroundImage} 
        style={styles.imageBackground} 
        resizeMode="cover"
      >
        {/* Camada escura para dar contraste ao texto */}
        <View style={styles.overlay} />

        {/* Container do Conteúdo */}
        <View style={styles.contentContainer}>
          
          <Text style={styles.title}>
            Defendendo o Futuro da Propriedade no Brasil.
          </Text>
          
          <Text style={styles.subtitle}>
            Somos a associação que une proprietários de imóveis à segurança jurídica e à inovação tecnológica (Blockchain, DeFi e IA) para criar um setor imobiliário mais transparente, ágil e justo.
          </Text>
          
          {/* Botões CTA */}
          <View style={styles.buttonContainer}>
            <Pressable style={[styles.button, styles.buttonPrimary]}>
              <Text style={styles.buttonTextPrimary}>Associe-se Agora</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.buttonSecondary]}>
              <Text style={styles.buttonTextSecondary}>Conheça a Proposta</Text>
            </Pressable>
          </View>

          {/* Prova Social */}
          <Text style={styles.socialProof}>
            Entidade sem fins lucrativos. Fundada em 2016. CNPJ: 26.325.396/0001-30
          </Text>

        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: '#000', // Fundo de fallback caso a imagem falhe
  },
  imageBackground: {
    width: '100%',
    // Este é o nosso "padrão de tamanho consistente" para o Hero
    // (Altura automática baseada no padding)
    paddingVertical: 180, // Aumente ou diminua para mais/menos altura
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Cobre todo o ImageBackground
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Sobreposição escura (60%)
  },
  contentContainer: {
    width: '100%',
    maxWidth: 1200,
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1, // Garante que o conteúdo fique sobre a camada 'overlay'
    backgroundColor: 'transparent', // Garante que o iOS não tenha problemas
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 700, // Limita a largura do subtítulo para melhor leitura
    marginBottom: 32,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap', // Permite que os botões quebrem a linha em telas pequenas
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    margin: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  buttonPrimary: {
    backgroundColor: Colors.light.tint, // Cor de destaque do seu tema
    borderColor: Colors.light.tint,
  },
  buttonTextPrimary: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
  },
  buttonTextSecondary: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  socialProof: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)', // Cor branca com 70% de opacidade
    marginTop: 32,
  },
});
