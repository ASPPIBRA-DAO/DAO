// Estas são as cores do seu logo
const PALETTE = {
  azulCobalto: '#0A4A90', // (Ajuste o HEX)
  dourado: '#FFD700',      // (Ajuste o HEX)
  verdeEscuro: '#3A5A40',   // (Ajuste o HEX)
  branco: '#FFFFFF',
  preto: '#333333',
  cinzaClaro: '#F9FAFB',
};

// Estas são as cores "semânticas" do seu app
export const COLORS = {
  primary: PALETTE.azulCobalto,
  accent: PALETTE.dourado,
  text: PALETTE.preto,
  textSecondary: PALETTE.verdeEscuro,
  background: PALETTE.cinzaClaro,
  cardBackground: PALETTE.branco,
  tagText: PALETTE.azulCobalto,
  tagBackground: 'rgba(10, 74, 144, 0.1)', // Fundo da tag (azul 10%)
};

// Estes são os estilos reutilizáveis
export const STYLES = {
  glassmorphism: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
  },
};