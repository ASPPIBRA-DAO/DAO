
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Platform, StyleSheet, TextInput, Button, ActivityIndicator, Text } from 'react-native';
import { useState } from 'react';
import { PaymentGateway } from '@/components/payment/PaymentGateway';

export default function PaymentGatewayScreen() {

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Pagamento Seguro</ThemedText>
      <PaymentGateway tokenName="Paraty Token" tokenSymbol="PARTY" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    // Adaptação para web
    ...(Platform.OS === 'web' && {
      backgroundColor: '#fff',
      color: '#000',
    }),
  },
});
