import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Rating,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Chip,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../../../hook/auth/useAuth';
import dashboardService from '../../../services/dashboard/dashboardService';

const Avaliacoes = () => {
  const { user } = useAuth();
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarAvaliacoes();
  }, []);

  const carregarAvaliacoes = async () => {
    try {
      const response = await dashboardService.avaliacoes.listarAvaliacoesUsuario(user.id);
      setAvaliacoes(response);
    } catch (error) {
      console.error('Erro ao carregar avaliações:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Minhas Avaliações
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {avaliacoes.length === 0 ? (
          <Box textAlign="center" py={4}>
            <Typography variant="body1" color="text.secondary">
              Você ainda não fez nenhuma avaliação
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {avaliacoes.map((avaliacao) => (
              <Grid item xs={12} key={avaliacao.id}>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={3}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={avaliacao.evento.imagem}
                          alt={avaliacao.evento.nome}
                          sx={{ borderRadius: 1 }}
                        />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="h6">
                            {avaliacao.evento.nome}
                          </Typography>
                          <Chip
                            label={avaliacao.evento.status}
                            color={avaliacao.evento.status === 'concluido' ? 'success' : 'warning'}
                            size="small"
                          />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Rating value={avaliacao.nota} readOnly precision={0.5} />
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            {avaliacao.nota.toFixed(1)}
                          </Typography>
                        </Box>
                        <Typography variant="body1" color="text.secondary">
                          {avaliacao.comentario}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                          Avaliado em {new Date(avaliacao.dataAvaliacao).toLocaleDateString()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default Avaliacoes; 