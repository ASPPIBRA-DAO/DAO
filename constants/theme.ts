
/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    textSecondary: '#343A40',
    textTertiary: '#555555',
    textMuted: '#888',
    textOnPrimary: '#FFFFFF', // Texto para botões com fundo primário
    background: '#fff',
    tint: tintColorLight,
    primary: '#007BFF',
    primaryAlt: '#6A4CFF',
    border: '#E0E0E0',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    gradient: {
      cta: ['#F2F4FF', '#E6E9FF'],
    },
    header: {
      background: 'rgba(255, 255, 255, 0.8)',
      border: 'rgba(255, 255, 255, 0.2)',
    },
    mobileMenu: {
      background: 'rgba(255, 255, 255, 0.9)',
    },
    card: {
      background: '#FFFFFF',
      backgroundBlue: '#E9EFFF',
      backgroundDark: '#1A1A1A',
      text: '#FFFFFF',
      community: {
        lightBlue: '#E3F2FD',
        lightOrange: '#FFE0B2',
        lightGreen: '#D7FFD9',
        lightPink: '#FCE4EC',
      },
    },
    overlay: 'rgba(0, 0, 0, 0.5)',
    glassmorphism: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 16,
      borderColor: 'rgba(255, 255, 255, 0.3)',
      borderWidth: 1,
    },
  },
  dark: {
    text: '#ECEDEE',
    textSecondary: '#CED2D6',
    textTertiary: '#B0B0B0',
    textMuted: '#999',
    textOnPrimary: '#FFFFFF',
    background: '#151718',
    tint: tintColorDark,
    primary: '#007BFF',
    primaryAlt: '#6A4CFF',
    border: '#444444',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    gradient: {
      cta: ['#1A1D2A', '#202438'],
    },
    header: {
      background: 'rgba(20, 20, 20, 0.8)',
      border: 'rgba(255, 255, 255, 0.1)',
    },
    mobileMenu: {
      background: 'rgba(20, 20, 20, 0.9)',
    },
    card: {
      background: '#1E1E1E',
      backgroundBlue: '#2A3A4A',
      backgroundDark: '#1A1A1A',
      text: '#FFFFFF',
      community: {
        lightBlue: '#2A3A4A',
        lightOrange: '#4A3A2A',
        lightGreen: '#2A4A2A',
        lightPink: '#4A2A3A',
      },
    },
    overlay: 'rgba(0, 0, 0, 0.7)',
    glassmorphism: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      borderRadius: 16,
      borderColor: 'rgba(0, 0, 0, 0.3)',
      borderWidth: 1,
    },
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
