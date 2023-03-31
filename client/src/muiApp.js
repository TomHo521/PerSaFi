
import React, { useState } from 'react';
import TemporaryDrawer from './muicomponents/temporaryDrawer';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export function MUIApp() {
  return (
  
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <TemporaryDrawer/>
      </ThemeProvider>

  );
}