
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const COLORS = {
  primary: '#6A4CFF',
  white: '#FFFFFF',
  darkText: '#333333',
  lightText: '#555555', // Standardized light text color
};

const FinalCTA = () => {
  return (
    <View style={styles.outerContainer}>
      <LinearGradient
        colors={['#F2F4FF', '#E6E9FF']}
        style={styles.container}
      >
        <Text style={styles.title}>Build the future with Nexera</Text>
        <Text style={styles.subtitle}>
          Build your vision with Nexera's powerful infrastructure, seamless interoperability, and compliance-ready solutions.
        </Text>
        <Pressable style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Let's build</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 80,
  },
  container: {
    width: '100%',
    maxWidth: 1160, 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
    borderRadius: 24,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.darkText,
    textAlign: 'center',
    maxWidth: 600,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.lightText, // Updated for consistency
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 650,
    marginBottom: 32,
  },
  ctaButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FinalCTA;
