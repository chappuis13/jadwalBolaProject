import { DefaultTheme } from 'react-native-paper';

export const COLORS = {
  primary: '#1877F2',       
  secondary: '#F0F2F5',     
  accent: '#09AB54',        
  background: '#FFFFFF',    
  card: '#FFFFFF',          
  text: '#1C1E21',          
  subtext: '#65676B',       
  border: '#E0E0E0',        
  danger: '#EF4444',        
  success: '#28A745',       
};

export const SIZES = {
  h1: 28, h2: 24, h3: 20,
  body1: 18, body2: 16, body3: 14, body4: 12, body5: 10,
};

export const FONTS = {
  h1: { fontFamily: 'System', fontSize: SIZES.h1, fontWeight: 'bold' },
  h2: { fontFamily: 'System', fontSize: SIZES.h2, fontWeight: 'bold' },
  h3: { fontFamily: 'System', fontSize: SIZES.h3, fontWeight: 'bold' },
  body1: { fontFamily: 'System', fontSize: SIZES.body1 },
  body2: { fontFamily: 'System', fontSize: SIZES.body2 },
  body3: { fontFamily: 'System', fontSize: SIZES.body3 },
  body4: { fontFamily: 'System', fontSize: SIZES.body4 },
  body5: { fontFamily: 'System', fontSize: SIZES.body5 },
};

export const PaperTheme = {
  ...DefaultTheme,
  roundness: 8, 
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,     
    accent: COLORS.accent,       
    background: COLORS.background, 
    text: COLORS.text,           
    placeholder: COLORS.subtext, 
    onSurface: COLORS.text,      
    surface: COLORS.card,        
  },
};