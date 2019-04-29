import { createContext } from 'react';

export const SnackbarContext = createContext({
  snackBarVisible: false,
  setSnackBarText: (text) => {},
  toggleSnackBar: (value, time) => {}
});