
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const COLORS = {
  primary: '#6A4CFF', // A vibrant purple for the main CTA
  lightGray: '#F0F2F5',
  darkText: '#333333',
  lightText: '#555555',
  white: '#FFFFFF',
  borderColor: '#E0E0E0',
};

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>nexera</Text>
        </View>
        <View style={styles.navContainer}>
          <Text style={styles.navLink}>Builder</Text>
          <Text style={styles.navLink}>Business</Text>
          <Text style={styles.navLink}>Community</Text>
          <Text style={styles.navLink}>Ecosystem</Text>
          <Text style={styles.navLink}>Resources</Text>
        </View>
        <Pressable style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Let's build</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderColor: COLORS.borderColor,
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: 1200,
    paddingHorizontal: 20,
    height: 80,
  },
  logoContainer: {
    // Logo styles
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.darkText,
  },
  navContainer: {
    flexDirection: 'row',
    gap: 30,
  },
  navLink: {
    fontSize: 16,
    color: COLORS.lightText,
    fontWeight: '500',
  },
  ctaButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Header;
