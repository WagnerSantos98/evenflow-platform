import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Chip,
  CircularProgress,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useAuth } from '../../../hook/auth/useAuth';
import dashboardService from '../../../services/dashboard/dashboardService';
import { formatarMoeda } from '../../../utils/fomatters';

const Compras = () => {
  const { user } = useAuth();
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarCompras();
  }, []);

  const carregarCompras = async () => {
    try {
      const response = await dashboardService.compras.listarComprasUsuario(user.id);
      setCompras(response);
    } catch (error) {
      console.error('Erro ao carregar compras:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'aprovado':
        return 'success';
      case 'pendente':
        return 'warning';
      case 'cancelado':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'aprovado':
        return 'Aprovado';
      case 'pendente':
        return 'Pendente';
      case 'cancelado':
        return 'Cancelado';
      default:
        return status;
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
          Minhas Compras
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {compras.length === 0 ? (
          <Box textAlign="center" py={4}>
            <Typography variant="body1" color="text.secondary">
              Você ainda não fez nenhuma compra
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {compras.map((compra) => (
              <Grid item xs={12} key={compra.id}>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={3}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={compra.evento.imagem}
                          alt={compra.evento.nome}
                          sx={{ borderRadius: 1 }}
                        />
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="h6">
                            {compra.evento.nome}
                          </Typography>
                          <Chip
                            label={getStatusLabel(compra.status)}
                            color={getStatusColor(compra.status)}
                            size="small"
                          />
                        </Box>

                        <TableContainer>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Ingresso</TableCell>
                                <TableCell align="right">Quantidade</TableCell>
                                <TableCell align="right">Valor Unitário</TableCell>
                                <TableCell align="right">Total</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {compra.itens.map((item) => (
                                <TableRow key={item.id}>
                                  <TableCell>{item.nome}</TableCell>
                                  <TableCell align="right">{item.quantidade}</TableCell>
                                  <TableCell align="right">{formatarMoeda(item.valorUnitario)}</TableCell>
                                  <TableCell align="right">{formatarMoeda(item.valorTotal)}</TableCell>
                                </TableRow>
                              ))}
                              <TableRow>
                                <TableCell colSpan={3} align="right">
                                  <strong>Total</strong>
                                </TableCell>
                                <TableCell align="right">
                                  <strong>{formatarMoeda(compra.valorTotal)}</strong>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>

                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="caption" color="text.secondary">
                            Compra realizada em {new Date(compra.dataCompra).toLocaleDateString()}
                          </Typography>
                          {compra.status === 'aprovado' && (
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              onClick={() => window.open(compra.comprovante, '_blank')}
                            >
                              Ver Comprovante
                            </Button>
                          )}
                        </Box>
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

export default Compras; 