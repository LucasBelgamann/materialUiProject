import Header from "./ui/Header";
import { ThemeProvider } from '@mui/material/styles';
import theme from './ui/Theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      Hello!
    </ThemeProvider>
  );
}

export default App;
