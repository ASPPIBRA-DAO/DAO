
import React from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';

const COLORS = {
  primary: '#6A4CFF',
  darkText: '#333333',
  lightText: '#555555',
  white: '#FFFFFF',
  borderColor: '#E0E0E0',
  background: '#F9FAFB',
};

const Footer = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width > 768; // Adjusted breakpoint for better responsiveness

  const linkSections = {
    Product: ['Builder', 'Business', 'Community', 'Ecosystem'],
    Resources: ['Documentation', 'SDKs', 'Brand Assets'],
    Community: ['X (Twitter)', 'LinkedIn', 'Discord'],
  };

  return (
    <View style={styles.container}>
      <View style={[styles.footerContent, !isDesktop && styles.footerContentMobile]}>
        {/* Logo and Copyright */}
        <View style={styles.logoSection}>
          <Text style={styles.logo}>nexera</Text>
          <Text style={styles.copyright}>© 2024 Nexera. All rights reserved.</Text>
        </View>

        {/* Links Section */}
        <View style={[styles.linksContainer, !isDesktop && styles.linksContainerMobile]}>
          {Object.entries(linkSections).map(([title, links]) => (
            <View key={title} style={styles.linkColumn}>
              <Text style={styles.linkTitle}>{title}</Text>
              {links.map(link => (
                <Pressable key={link}>
                  <Text style={styles.link}>{link}</Text>
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderColor: COLORS.borderColor,
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  footerContent: {
    width: '100%',
    maxWidth: 1200,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerContentMobile: {
    flexDirection: 'column',
  },
  logoSection: {
    marginRight: 60,
    marginBottom: 40, // Add space below logo on mobile
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.darkText,
    marginBottom: 16,
  },
  copyright: {
    fontSize: 14,
    color: COLORS.lightText,
  },
  linksContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    gap: 60,
  },
  linksContainerMobile: {
    flexDirection: 'column',
    gap: 30,
    justifyContent: 'flex-start',
  },
  linkColumn: {
    // No changes needed here
  },
  linkTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.darkText,
    marginBottom: 16,
  },
  link: {
    fontSize: 16,
    color: COLORS.lightText,
    marginBottom: 12,
  },
});

export default Footer;
