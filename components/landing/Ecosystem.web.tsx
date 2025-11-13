import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions, TouchableOpacity, Platform } from 'react-native';

const theme = {
  card: {
    backgroundDark: '#1A1A1A',
    text: '#FFFFFF',
    textTertiary: '#CCCCCC',
  },
  text: '#111111',
  background: '#FFFFFF',
  border: '#E0E0E0',
  codeBackground: '#0D1117',
  codeHeader: '#161B22',
  codeBorder: '#30363D',
};

const EcosystemCard = ({ style, cardColor, title, text, image, isDark, children }) => (
  <View style={[styles.card, { backgroundColor: cardColor }, style]}>
    {image && (
      <Image
        source={{ uri: image }}
        style={styles.cardImage}
        resizeMode="cover"
      />
    )}
    <Text style={[styles.cardTitle, isDark && { color: theme.card.text }]}>
      {title}
    </Text>
    <Text style={[styles.cardText, isDark && { color: theme.card.textTertiary }]}>
      {text}
    </Text>
    {children}
    <Text style={[styles.cardLink, isDark && { color: theme.card.text }]}>
      Leia mais →
    </Text>
  </View>
);

const Ecosystem = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width > 992;

  const handleCopy = () => {
    if (Platform.OS === 'web') {
        const codeToCopy = `import { Evergan } from 'nexera-sdk';\n\nconst evergan = new Evergan({\n  mobileOptimized: true,\n  secureRelay: true\n});`;
        const textArea = document.createElement('textarea');
        textArea.value = codeToCopy;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Falha ao copiar o código: ', err);
        }
        document.body.removeChild(textArea);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tokenomics</Text>

      <View style={[styles.columnLayout, !isDesktop && styles.columnLayoutMobile]}>
        {/* Left Column */}
        <View style={styles.leftColumn}>
          <EcosystemCard
            title="ASPPIBRA-DAO v 1.00"
            text="O Evergan v0.14 da Nexera é uma otimização de alta performance para dispositivos móveis, com página segura para relayers, acesso a help desk e um item avançado NRC-20 atualizável com o padrão ERC-20."
            cardColor={theme.card.backgroundDark}
            image="https://placehold.co/600x400/1A1A1A/FFFFFF?text=ASPPIBRA-DAO"
            isDark
          >
            {/* Code Snippet Section */}
            <View style={styles.codeSnippetContainer}>
              <View style={styles.codeHeader}>
                <Text style={styles.codeFileName}>example.js</Text>
                <TouchableOpacity onPress={handleCopy}>
                   <Text style={styles.copyButtonText}>[□]</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.codeBody}>
                <Text style={styles.codeText}>
                  <Text style={{color: '#C994FF'}}>import</Text>
                  <Text> {'{'} </Text>
                  <Text style={{color: '#79B8FF'}}>Evergan</Text>
                  <Text> {'}'} </Text>
                  <Text style={{color: '#C994FF'}}>from</Text>
                  <Text style={{color: '#FFAB70'}}> 'nexera-sdk'</Text>
                  <Text>;</Text>
                  { '\n\n'}
                  <Text style={{color: '#8B949E'}}>{ '// Inicializa o módulo Evergan'}</Text>
                  { '\n'}
                  <Text style={{color: '#C994FF'}}>const</Text>
                  <Text> evergan = </Text>
                  <Text style={{color: '#FFD372'}}>new</Text>
                  <Text style={{color: '#A5D6FF'}}> Evergan</Text>
                  <Text>({'{'})</Text>
                  { '\n'}
                  <Text>  mobileOptimized: </Text>
                  <Text style={{color: '#79B8FF'}}>true</Text>
                  <Text>,</Text>
                  { '\n'}
                  <Text>  secureRelay: </Text>
                  <Text style={{color: '#79B8FF'}}>true</Text>
                  { '\n'}
                  <Text>});</Text>
                </Text>
              </View>
            </View>
          </EcosystemCard>
        </View>

        {/* Right Column */}
        <View style={styles.rightColumn}>
          <EcosystemCard
            title="Indexação Completa e Relatórios"
            text="O Evergan v0.13 possui indexação completa on-chain, recuperação de forma livre, relatórios de minting sem gás e cargas de trabalho auditadas para maior transparência e segurança."
            cardColor={theme.card.backgroundDark}
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
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 60, 
    backgroundColor: theme.background,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 48,
    textAlign: 'left',
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
  },
  card: {
    borderRadius: 16,
    padding: 28,
    height: '100%',
    borderWidth: 1,
    borderColor: theme.border,
    flex: 1,
  },
  cardImage: {
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  cardLink: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 'auto',
    paddingTop: 20,
  },
  codeSnippetContainer: {
    marginVertical: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: theme.codeBackground,
    borderWidth: 1,
    borderColor: theme.codeBorder,
  },
  codeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: theme.codeHeader,
    borderBottomWidth: 1,
    borderBottomColor: theme.codeBorder,
  },
  codeFileName: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#8B949E',
  },
copyButtonText: {
      color: '#8B949E',
      fontSize: 18,
  },
  codeBody: {
    padding: 16,
  },
  codeText: {
    fontFamily: 'monospace',
    color: '#E6EDF3',
    fontSize: 14,
  }
});

export default Ecosystem;
