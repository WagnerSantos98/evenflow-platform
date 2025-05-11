import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme } from './styles/themes/darkTheme';
import { GlobalStyles } from './styles/global/GlobalStyles';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Eventos from './pages/Eventos';
import EventoDetalhes from './pages/content/EventoDetalhes';
import Auth from './pages/Auth';
import Sobre from './pages/Sobre';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <StyledThemeProvider theme={darkTheme}>
        <CssBaseline />
        <GlobalStyles />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/eventos" element={<Eventos />} />
              <Route path="/evento/:id" element={<EventoDetalhes />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Layout>
        </Router>
      </StyledThemeProvider>
    </ThemeProvider>
  );
}

export default App;
