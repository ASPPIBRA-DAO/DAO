import React from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, TouchableOpacity } from 'react-native';
import { Image as ExpoImage } from 'expo-image';

// Theme and Syntax Highlighting Colors
const theme = {
  card: {
    backgroundDark: '#1A1A1A',
    text: '#FFFFFF',
    textTertiary: '#CCCCCC',
  },
  text: '#111111',
  background: '#FFFFFF',
  border: '#E0E0E0',
  code: {
    background: '#0D1117',
    header: '#161B22',
    border: '#30363D',
    default: '#E6EDF3',
    comment: '#8B949E',
    keyword: '#FF79C6',
    function: '#50FA7B',
    string: '#F1FA8C',
    type: '#8BE9FD',
    number: '#BD93F9',
    punctuation: '#E6EDF3',
  }
};

const solidityCode = `/**
 *Submitted for verification at BscScan.com on 2021-08-04
*/

/**

 * Web: https://asppibra.com.br
 *
 */
pragma solidity 0.5.16;

interface IBEP20 {
  function totalSupply() external view returns (uint256);
  function decimals() external view returns (uint8);
  function symbol() external view returns (string memory);
  function name() external view returns (string memory);
  function getOwner() external view returns (address);
  function balanceOf(address account) external view returns (uint256);
  function transfer(address recipient, uint256 amount) external returns (bool);
  function allowance(address _owner, address spender) external view returns (uint256);
  function approve(address spender, uint256 amount) external returns (bool);
  function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract Ownable is Context {
  address private _owner;

  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

  constructor () internal {
    _owner = msg.sender;
    emit OwnershipTransferred(address(0), msg.sender);
  }

  function owner() public view returns (address) {
    return _owner;
  }

  modifier onlyOwner() {
    require(_owner == msg.sender, "Ownable: caller is not the owner");
    _;
  }
}
`;

// --- Syntax Highlighting Logic ---
const keywords = ['pragma', 'solidity', 'interface', 'contract', 'function', 'external', 'view', 'returns', 'event', 'modifier', 'require', 'emit', 'public', 'internal', 'private', 'is', 'using', 'for', 'if', 'constructor'];
const types = ['uint256', 'uint8', 'string', 'memory', 'address', 'bool', 'bytes', 'mapping'];

const SyntaxHighlighter = ({ code }) => {
  const renderToken = (token, index) => {
    if (keywords.includes(token)) {
      return <Text key={index} style={styles.codeKeyword}>{token}</Text>;
    }
    if (types.includes(token)) {
      return <Text key={index} style={styles.codeType}>{token}</Text>;
    }
    if (!isNaN(parseFloat(token)) && isFinite(token as any) && !token.toLowerCase().includes('e')) {
      return <Text key={index} style={styles.codeNumber}>{token}</Text>;
    }
    if (/^".*"$/.test(token)) {
      return <Text key={index} style={styles.codeString}>{token}</Text>;
    }
    if (/^(totalSupply|decimals|symbol|name|getOwner|balanceOf|transfer|allowance|approve|transferFrom|owner|onlyOwner|OwnershipTransferred|msg|sender|_owner)$/.test(token)) {
      return <Text key={index} style={styles.codeFunction}>{token}</Text>;
    }
    return <Text key={index} style={styles.codeDefault}>{token}</Text>;
  };

  const renderLine = (line, index) => {
    // Handle single and multi-line comments
    if (line.trim().startsWith('//') || line.trim().startsWith('/**') || line.trim().startsWith('*') || line.trim().endsWith('*/')) {
      return <Text key={index} style={styles.codeComment}>{line}</Text>;
    }

    const parts = line.split(/([\s.,;(){}\[\]])/); // Split by delimiters and whitespace, keeping them

    return (
      <Text key={index} style={styles.codeLine}>
        {parts.map(renderToken)}
      </Text>
    );
  };

  return <>{code.split('\n').map(renderLine)}</>;
};


// --- Main Components ---
const EcosystemCard = ({ style, cardColor, title, text, isDark, children }) => (
  <View style={[styles.card, { backgroundColor: cardColor }, style]}>
    <Text style={[styles.cardTitle, isDark && { color: theme.card.text }]}>{title}</Text>
    <Text style={[styles.cardText, isDark && { color: theme.card.textTertiary }]}>{text}</Text>
    {children}
    <Text style={[styles.cardLink, isDark && { color: theme.card.text }]}>Leia mais →</Text>
  </View>
);

const Ecosystem = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width > 992;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(solidityCode).then(() => {
        alert('Código copiado para a área de transferência!');
      }).catch(err => {
        console.error('Falha ao copiar código: ', err);
        alert('Falha ao copiar o código.');
      });
    } else {
      alert('A função de cópia não é suportada neste navegador.');
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
            isDark
          >
            <View style={styles.codeSnippetContainer}>
              <View style={styles.codeHeader}>
                <Text style={styles.codeFileName}>ASPPBR.sol</Text>
                <TouchableOpacity onPress={handleCopy}>
                  <Text style={styles.copyButtonText}>[□]</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.codeBody} nestedScrollEnabled>
                 <SyntaxHighlighter code={solidityCode} />
              </ScrollView>
            </View>
          </EcosystemCard>
        </View>

        {/* Right Column */}
        <View style={styles.rightColumn}>
          <ExpoImage
            source={{ uri: 'https://storage.googleapis.com/nftimagebucket/bsc/tokens/0x7b8a01b39d58278b5de7e48c8449c9f4f5170613/TVRjMU1ETTVOakV6TWc9PV8xNzYyNzE=.svg' }}
            style={styles.nftImage}
            contentFit="contain"
          />
        </View>
      </View>
    </View>
  );
};

// --- Styles ---
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
  columnLayout: { flexDirection: 'row', width: '100%', gap: 24, alignItems: 'stretch' },
  columnLayoutMobile: { flexDirection: 'column' },
  leftColumn: { flex: 2 },
  rightColumn: { flex: 1, justifyContent: 'center' },
  card: {
    borderRadius: 16,
    padding: 28,
    height: 580, // Or adjust as needed
    borderWidth: 1,
    borderColor: theme.border,
    flexDirection: 'column',
  },
  cardTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: theme.text },
  cardText: { fontSize: 16, lineHeight: 24, marginBottom: 20, color: theme.text },
  cardLink: { fontSize: 16, fontWeight: 'bold', marginTop: 'auto', paddingTop: 20, color: theme.text },
  codeSnippetContainer: {
    marginVertical: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: theme.code.background,
    borderWidth: 1,
    borderColor: theme.code.border,
    flex: 1,
    flexDirection: 'column',
  },
  codeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: theme.code.header,
    borderBottomWidth: 1,
    borderBottomColor: theme.code.border,
  },
  codeFileName: { fontFamily: 'monospace', fontSize: 12, color: theme.code.comment },
  copyButtonText: { color: theme.code.comment, fontSize: 18 },
  codeBody: { padding: 16, },
  codeLine: { fontFamily: 'monospace', fontSize: 14, whiteSpace: 'pre-wrap' }, // Ensures line breaks and wrapping
  codeDefault: { color: theme.code.default },
  codeKeyword: { color: theme.code.keyword },
  codeType: { color: theme.code.type },
  codeComment: { color: theme.code.comment, fontStyle: 'italic' },
  codeString: { color: theme.code.string },
  codeNumber: { color: theme.code.number },
  codeFunction: { color: theme.code.function },
  nftImage: { width: '100%', height: '100%', borderRadius: 16 },
});

export default Ecosystem;
