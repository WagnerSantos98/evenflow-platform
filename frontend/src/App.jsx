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
import Auth from './pages/Auth';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Dashboard from './pages/Dashboard';

//Páginas Content
import EventoDetalhes from './pages/content/EventoDetalhes';
import ComprarIngresso from './pages/content/ComprarIngresso';
import FAQ from './pages/content/FAQ';
import TermosPoliticas from './pages/content/TermosPolitica';
import CentralAjuda from './pages/content/CentralAjuda';
import RecursosOrganizadores from './pages/content/RecursosOrganizadores';
import Suporte from './pages/content/Suporte';
import Blog from './pages/content/Blog';
import SejaParceiro from './pages/content/SejaParceiro';
import Chat from './pages/content/Chat';


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
              <Route path="/eventos/:id" element={<EventoDetalhes />} />
              <Route path="/comprar-ingresso/:id" element={<ComprarIngresso/>}/>
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/faq" element={<FAQ />} />
              <Route path="/termos-e-politicas" element={<TermosPoliticas />} />
              <Route path="/central-ajuda" element={<CentralAjuda />} />
              <Route path="/recursos" element={<RecursosOrganizadores />} />
              <Route path="/suporte" element={<Suporte />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/seja-parceiro" element={<SejaParceiro />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </Layout>
        </Router>
      </StyledThemeProvider>
    </ThemeProvider>
  );
}

export default App;
