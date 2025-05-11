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
//import GerenciarUsuarios from '../components/dashboard/usuarios/GerenciarUsuarios';
//import RelatoriosFinanceiros from '../components/dashboard/relatorios/RelatoriosFinanceiros';
//import Configuracoes from '../components/dashboard/configuracoes/Configuracoes';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

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

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return <Eventos mostrarMensagem={mostrarMensagem} />;
      case 1:
        return <GerenciarUsuarios mostrarMensagem={mostrarMensagem} />;
      case 2:
        return <RelatoriosFinanceiros mostrarMensagem={mostrarMensagem} />;
      case 3:
        return <Configuracoes mostrarMensagem={mostrarMensagem} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Eventos" />
          {/*<Tab label="Usuários" />
          <Tab label="Relatórios" />
          <Tab label="Configurações" />*/}
        </Tabs>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          {renderTabContent()}
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