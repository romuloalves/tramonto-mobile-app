import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(30, 45, 62)',
    accent: 'rgb(220, 64, 69)'
  }
};

export default function Theme({ children }) {
  return (
    <PaperProvider theme={theme}>
      { children }
    </PaperProvider>
  );
}