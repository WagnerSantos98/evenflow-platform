import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { dashboardService } from '../../../services/dashboard/dashboardService';

const ConfiguracoesAvaliacoes = () => {
  const [configuracoes, setConfiguracoes] = useState({
    moderacaoAutomatica: false,
    limiteCaracteres: 500,
    tempoMinimoAvaliacao: 24, // em horas
    notificacaoEmail: true,
    statusPadrao: 'pendente',
    permitirEdicao: true,
    tempoEdicao: 24, // em horas
    permitirExclusao: true,
    tempoExclusao: 24 // em horas
  });

  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    carregarConfiguracoes();
  }, []);

  const carregarConfiguracoes = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.configuracoes.buscarConfiguracoesAvaliacoes();
      setConfiguracoes(response.data);
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      setSnackbar({
        open: true,
        message: 'Erro ao carregar configurações',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setConfiguracoes(prev => ({
      ...prev,
      [name]: event.target.type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    try {
      await dashboardService.configuracoes.atualizarConfiguracoesAvaliacoes(configuracoes);
      setSnackbar({
        open: true,
        message: 'Configurações salvas com sucesso!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      setSnackbar({
        open: true,
        message: 'Erro ao salvar configurações',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Configurações de Avaliações
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Moderação
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={configuracoes.moderacaoAutomatica}
                  onChange={handleChange}
                  name="moderacaoAutomatica"
                />
              }
              label="Moderação Automática"
            />
            <Typography variant="caption" color="text.secondary" display="block">
              Aprovar automaticamente avaliações que não contenham palavras inapropriadas
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Status Padrão</InputLabel>
              <Select
                name="statusPadrao"
                value={configuracoes.statusPadrao}
                onChange={handleChange}
                label="Status Padrão"
              >
                <MenuItem value="aprovado">Aprovado</MenuItem>
                <MenuItem value="pendente">Pendente</MenuItem>
                <MenuItem value="rejeitado">Rejeitado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Limites e Restrições
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Limite de Caracteres"
              name="limiteCaracteres"
              value={configuracoes.limiteCaracteres}
              onChange={handleChange}
              InputProps={{ inputProps: { min: 100, max: 2000 } }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Tempo Mínimo para Avaliar (horas)"
              name="tempoMinimoAvaliacao"
              value={configuracoes.tempoMinimoAvaliacao}
              onChange={handleChange}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Edição e Exclusão
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={configuracoes.permitirEdicao}
                  onChange={handleChange}
                  name="permitirEdicao"
                />
              }
              label="Permitir Edição"
            />
            <TextField
              fullWidth
              type="number"
              label="Tempo para Edição (horas)"
              name="tempoEdicao"
              value={configuracoes.tempoEdicao}
              onChange={handleChange}
              disabled={!configuracoes.permitirEdicao}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={configuracoes.permitirExclusao}
                  onChange={handleChange}
                  name="permitirExclusao"
                />
              }
              label="Permitir Exclusão"
            />
            <TextField
              fullWidth
              type="number"
              label="Tempo para Exclusão (horas)"
              name="tempoExclusao"
              value={configuracoes.tempoExclusao}
              onChange={handleChange}
              disabled={!configuracoes.permitirExclusao}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Notificações
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={configuracoes.notificacaoEmail}
                  onChange={handleChange}
                  name="notificacaoEmail"
                />
              }
              label="Enviar notificações por e-mail"
            />
            <Typography variant="caption" color="text.secondary" display="block">
              Notificar administradores sobre novas avaliações
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={loading}
        >
          Salvar Configurações
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
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

export default ConfiguracoesAvaliacoes; 