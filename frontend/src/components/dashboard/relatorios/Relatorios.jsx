import React from 'react';
import {
  Box, Typography, Grid, Paper, TextField, MenuItem,
  Button, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Card, CardContent, CircularProgress
} from '@mui/material';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { formatarMoeda, formatarPercentual } from '../../../utils/fomatters';
import useRelatorios from '../../../hook/dashboard/useRelatorios';

const Relatorios = ({ mostrarMensagem }) => {
    const {
        COLORS,
        periodo,
        dataInicio,
        dataFim,
        vendasPorPeriodo,
        vendasPorEvento,
        vendasPorCategoria,
        resumoFinanceiro,
        loading,
        setPeriodo,
        setDataInicio,
        setDataFim,
        carregarDados
    } = useRelatorios(mostrarMensagem);

    const renderLoading = () => (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
            <CircularProgress />
        </Box>
    );

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Relatórios Financeiros
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3}>
                        <TextField
                            select
                            label="Período"
                            value={periodo}
                            onChange={(e) => setPeriodo(e.target.value)}
                            fullWidth
                            disabled={loading}
                        >
                            <MenuItem value="dia">Hoje</MenuItem>
                            <MenuItem value="semana">Última Semana</MenuItem>
                            <MenuItem value="mes">Último Mês</MenuItem>
                            <MenuItem value="ano">Último Ano</MenuItem>
                            <MenuItem value="personalizado">Personalizado</MenuItem>
                        </TextField>
                    </Grid>
                    {periodo === 'personalizado' && (
                        <>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    type="date"
                                    label="Data Início"
                                    value={dataInicio}
                                    onChange={(e) => setDataInicio(e.target.value)}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    disabled={loading}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    type="date"
                                    label="Data Fim"
                                    value={dataFim}
                                    onChange={(e) => setDataFim(e.target.value)}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    disabled={loading}
                                />
                            </Grid>
                        </>
                    )}
                    <Grid item xs={12} sm={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={carregarDados}
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? 'Carregando...' : 'Atualizar'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {loading ? (
                renderLoading()
            ) : (
                <Grid container spacing={3}>
                    {/* Resumo Financeiro */}
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card>
                                    <CardContent>
                                        <Typography color="textSecondary" gutterBottom>
                                            Total de Vendas
                                        </Typography>
                                        <Typography variant="h5">
                                            {formatarMoeda(resumoFinanceiro.totalVendas)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card>
                                    <CardContent>
                                        <Typography color="textSecondary" gutterBottom>
                                            Total de Ingressos
                                        </Typography>
                                        <Typography variant="h5">
                                            {resumoFinanceiro.totalIngressos}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card>
                                    <CardContent>
                                        <Typography color="textSecondary" gutterBottom>
                                            Ticket Médio
                                        </Typography>
                                        <Typography variant="h5">
                                            {formatarMoeda(resumoFinanceiro.mediaTicket)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Card>
                                    <CardContent>
                                        <Typography color="textSecondary" gutterBottom>
                                            Taxa de Conversão
                                        </Typography>
                                        <Typography variant="h5">
                                            {formatarPercentual(resumoFinanceiro.taxaConversao)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Gráfico de Vendas por Período */}
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Vendas por Período
                            </Typography>
                            <Box sx={{ height: 300 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={vendasPorPeriodo}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="periodo" />
                                        <YAxis />
                                        <Tooltip
                                            formatter={(value) => formatarMoeda(value)}
                                            labelFormatter={(label) => `Período: ${label}`}
                                        />
                                        <Legend />
                                        <Bar dataKey="valor" name="Vendas" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Gráfico de Vendas por Categoria */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Vendas por Categoria
                            </Typography>
                            <Box sx={{ height: 300 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={vendasPorCategoria}
                                            dataKey="valor"
                                            nameKey="categoria"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            label
                                        >
                                            {vendasPorCategoria.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={COLORS[index % COLORS.length]}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => formatarMoeda(value)} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Tabela de Vendas por Evento */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Vendas por Evento
                            </Typography>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Evento</TableCell>
                                            <TableCell align="right">Ingressos Vendidos</TableCell>
                                            <TableCell align="right">Valor Total</TableCell>
                                            <TableCell align="right">Ticket Médio</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {vendasPorEvento.map((evento) => (
                                            <TableRow key={evento.id}>
                                                <TableCell>{evento.nome}</TableCell>
                                                <TableCell align="right">
                                                    {evento.ingressosVendidos}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {formatarMoeda(evento.valorTotal)}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {formatarMoeda(evento.ticketMedio)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default Relatorios;