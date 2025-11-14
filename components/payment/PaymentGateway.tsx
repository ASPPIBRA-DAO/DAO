
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Clipboard, ActivityIndicator, Alert } from 'react-native';
import { Timer } from './Timer';

// --- Constantes (Simulação) ---
const COTACAO_USD_BRL = 5.25;
const PRECO_TOKEN_USD = 0.10;
const PIX_EXPIRATION_SECONDS = 600;

type PaymentStep = 'selection' | 'payment' | 'success';

interface PaymentGatewayProps {
  tokenName: string;
  tokenSymbol: string;
}

export const PaymentGateway: React.FC<PaymentGatewayProps> = ({ tokenName, tokenSymbol }) => {
  const [step, setStep] = useState<PaymentStep>('selection');
  const [usdAmount, setUsdAmount] = useState<string>('');
  
  const [brlAmount, setBrlAmount] = useState<number>(0);
  const [tokenAmount, setTokenAmount] = useState<number>(0);
  
  const [pixCode, setPixCode] = useState<string>('');
  const [pixQrCode, setPixQrCode] = useState<string>('');
  const [copyButtonText, setCopyButtonText] = useState('Copiar Código PIX');
  const [isPixExpired, setIsPixExpired] = useState(false);

  useEffect(() => {
    const usdValue = parseFloat(usdAmount) || 0;
    const brlValue = usdValue * COTACAO_USD_BRL;
    const tokenValue = usdValue / PRECO_TOKEN_USD;

    setBrlAmount(brlValue);
    setTokenAmount(tokenValue);
  }, [usdAmount]);
  
  useEffect(() => {
    if (step === 'payment' && !isPixExpired) {
      const monitoringTimeout = setTimeout(() => {
        console.log('PAGAMENTO RECEBIDO (simulado)!');
        setStep('success');
      }, 8000);

      return () => {
        clearTimeout(monitoringTimeout);
      };
    }
  }, [step, isPixExpired]);

  const handleUsdChange = (text: string) => {
    setUsdAmount(text);
  };

  const handleGeneratePix = async () => {
    if (brlAmount <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido.');
      return;
    }

    console.log(`BACKEND CALL: Gerar PIX para ${brlAmount.toFixed(2)} BRL`);
    Alert.alert('Simulação', 'Chamada simulada ao backend para gerar PIX. \nValor: ' + formatCurrency(brlAmount, 'BRL'));
    setPixCode('00020126... (código pix simulado da sua api)...5303986');
    setPixQrCode('[Simulação de QR Code. Use um componente de QR Code real aqui]');
    setIsPixExpired(false);
    setStep('payment');
  };

  const handleCopyPix = () => {
    Clipboard.setString(pixCode);
    setCopyButtonText('Copiado!');
    setTimeout(() => setCopyButtonText('Copiar Código PIX'), 2000);
  };
  
  const handlePixExpired = () => {
    setIsPixExpired(true);
  };

  const formatCurrency = (value: number, currency: string) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: currency
    });
  };

  return (
    <View style={styles.paymentCard}>
      {step === 'selection' && (
        <View style={styles.stepSelection}>
          <View style={styles.paymentCardHeader}>
            <Text style={styles.headerTitle}>Comprar {tokenName}</Text>
          </View>
          <View style={styles.paymentCardBody}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Valor da Compra (USD)</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputAdornment}>USD</Text>
                <TextInput
                  style={styles.input}
                  placeholder="100.00"
                  keyboardType="numeric"
                  value={usdAmount}
                  onChangeText={handleUsdChange}
                />
              </View>
            </View>

            <View style={styles.conversionDetails}>
              <View style={styles.detailRow}>
                <Text>Cotação (USD/BRL):</Text>
                <Text style={styles.strong}>{formatCurrency(COTACAO_USD_BRL, 'BRL')}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text>Você receberá:</Text>
                <Text style={styles.strong}>~ {tokenAmount.toLocaleString('pt-BR')} {tokenSymbol}</Text>
              </View>
              <View style={styles.hr} />
              <View style={[styles.detailRow, styles.total]}>
                <Text>Total a pagar (PIX):</Text>
                <Text style={[styles.strong, styles.totalBrl]}>
                  {formatCurrency(brlAmount, 'BRL')}
                </Text>
              </View>
            </View>

            <Pressable
              style={({ pressed }) => [styles.btnPrimary, { opacity: pressed ? 0.8 : 1 }]}
              onPress={handleGeneratePix}
              disabled={brlAmount <= 0}
            >
              <Text style={styles.btnText}>Gerar PIX para Pagamento</Text>
            </Pressable>
          </View>
        </View>
      )}

      {step === 'payment' && (
        <View style={styles.stepPayment}>
          <View style={styles.paymentCardHeader}>
            <Text style={styles.headerTitle}>Pague com PIX</Text>
          </View>
          <View style={styles.paymentCardBody}>
            <Text style={styles.h3}>Escaneie o QR Code</Text>
            
            <View style={styles.qrCodeContainer}>
              <Text>{pixQrCode}</Text>
            </View>
            
            <Text>Ou copie o código abaixo:</Text>
            
            <TextInput value={pixCode} style={styles.pixCodeInput} multiline editable={false} />
            <Pressable style={({ pressed }) => [styles.btnCopy, { opacity: pressed ? 0.8 : 1 }]} onPress={handleCopyPix}>
              <Text style={styles.btnText}>{copyButtonText}</Text>
            </Pressable>

            {isPixExpired ? (
              <Text style={styles.pixExpired}>Código PIX Expirado!</Text>
            ) : (
              <>
                <Timer
                  initialSeconds={PIX_EXPIRATION_SECONDS}
                  onExpire={handlePixExpired}
                />
                <View style={styles.waitingPayment}>
                  <ActivityIndicator size="small" color="#007bff" />
                  <Text style={styles.waitingText}>Aguardando pagamento...</Text>
                </View>
              </>
            )}
          </View>
        </View>
      )}
      
      {step === 'success' && (
        <View style={styles.stepSuccess}>
          <View style={styles.paymentCardBody}>
            <Text style={styles.successIcon}>✅</Text>
            <Text style={styles.successTitle}>Pagamento Recebido!</Text>
            <Text style={styles.successText}>
              Seus <Text style={styles.strong}>~{tokenAmount.toLocaleString('pt-BR')} {tokenSymbol}</Text> tokens
              foram creditados em sua conta.
            </Text>
            <Pressable
              style={({ pressed }) => [styles.btnPrimary, { opacity: pressed ? 0.8 : 1 }]}
              onPress={() => Alert.alert('Redirecionando', 'Redirecionando para o Dashboard...')}
            >
              <Text style={styles.btnText}>Ir para Meu Dashboard</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  paymentCard: {
    width: 380,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 5,
    overflow: 'hidden',
  },
  paymentCardHeader: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    backgroundColor: '#f4f7f6',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    margin: 0,
    color: '#333',
    fontSize: 20,
  },
  paymentCardBody: {
    padding: 25,
  },
  stepSelection: {},
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 14.4,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputAdornment: {
    position: 'absolute',
    left: 15,
    fontWeight: '600',
    color: '#aaa',
    fontSize: 17.6,
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 15,
    paddingLeft: 50,
    fontSize: 17.6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  conversionDetails: {
    backgroundColor: '#f4f7f6',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  total: {
    marginBottom: 0,
  },
  strong: {
    fontWeight: 'bold',
  },
  totalBrl: {
    fontSize: 19.2,
    fontWeight: '700',
    color: '#007bff',
  },
hr: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginVertical: 15,
},
stepPayment: {
    alignItems: 'center',
},
h3: {
    marginTop: 0,
    color: '#333',
    fontSize: 18,
    textAlign: 'center',
},
qrCodeContainer: {
    width: 220,
    height: 220,
    backgroundColor: '#eee',
    marginVertical: 20,
    marginHorizontal: 'auto',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
},
pixCodeInput: {
    width: '100%',
    fontSize: 12.8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f4f7f6',
    borderRadius: 8,
    textAlignVertical: 'top',
    marginBottom: 10,
    color: '#555',
},
pixExpired: {
    fontWeight: '700',
    color: '#d9534f',
    marginTop: 15,
    fontSize: 16,
    textAlign: 'center',
},
waitingPayment: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
},
waitingText: {
    fontWeight: '600',
    color: '#007bff',
    marginLeft: 8,
},
stepSuccess: {
    alignItems: 'center',
},
successIcon: {
    fontSize: 64,
    color: '#28a745',
    lineHeight: 64,
    textAlign: 'center',
},
successTitle: {
    color: '#28a745',
    marginTop: 15,
    marginBottom: 10,
    fontSize: 24,
    textAlign: 'center',
},
successText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    textAlign: 'center',
},
btnPrimary: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#007bff',
    marginTop: 20,
},
btnCopy: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#6c757d',
    marginBottom: 15,
},
btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
},
});
