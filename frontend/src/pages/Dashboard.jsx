import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Snackbar,
  Alert,
} from '@mui/material';
import Eventos from '../components/dashboard/eventos/Eventos';
import Usuarios from '../components/dashboard/usuarios/Usuarios';
//import Relatorios from '../components/dashboard/relatorios/Relatorios';
import Configuracoes from '../components/dashboard/configuracoes/Configuracoes';
import Locais from '../components/dashboard/locais/Locais';
import Perfil from '../components/dashboard/perfil/Perfil';
import Avaliacoes from '../components/dashboard/avaliacoes/Avaliacoes';
import Compras from '../components/dashboard/compras/Compras';
import { useAuth } from '../hook/auth/useAuth';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const { user } = useAuth();

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const mostrarMensagem = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const getTabsByUserRole = () => {
    switch (user?.nivelAcesso) {
      case 'admin':
        return [
          { label: 'Eventos', component: <Eventos mostrarMensagem={mostrarMensagem} /> },
          { label: 'Usuários', component: <Usuarios mostrarMensagem={mostrarMensagem} /> },
          { label: 'Locais', component: <Locais mostrarMensagem={mostrarMensagem} /> },
          { label: 'Configurações', component: <Configuracoes mostrarMensagem={mostrarMensagem} /> }
        ];
      case 'organizador':
        return [
          { label: 'Eventos', component: <Eventos mostrarMensagem={mostrarMensagem} /> },
          { label: 'Locais', component: <Locais mostrarMensagem={mostrarMensagem} /> },
          { label: 'Configurações', component: <Configuracoes mostrarMensagem={mostrarMensagem} /> }
        ];
      case 'usuario':
        return [
          { label: 'Perfil', component: <Perfil /> },
          { label: 'Avaliações', component: <Avaliacoes /> },
          { label: 'Compras', component: <Compras /> },
          { label: 'Configurações', component: <Configuracoes mostrarMensagem={mostrarMensagem} /> }
        ];
      default:
        return [];
    }
  };

  const tabs = getTabsByUserRole();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          {tabs[selectedTab]?.component}
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard; 