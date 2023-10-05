import React from "react";
import Header from "./components/ui/Header";
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/ui/Theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
    </ThemeProvider>
  );
}

export default App;
