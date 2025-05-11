import React from 'react';
import {
    Box, Typography, Grid, Paper, TextField, Button,
    Switch, FormControlLabel, Divider, Alert, Snackbar
} from '@mui/material';
import { Save } from '@mui/icons-material';
import useConfiguracoes from '../../../hook/dashboard/useConfiguracoes';

const Configuracoes = (mostrarMensagem) => {
    const{
        configuracoes,
        loading,
        snackbar,
        handleInputChange,
        handleSubmit,
        handleCloseSnackbar
    } = useConfiguracoes(mostrarMensagem);

    return(
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Configurações da Plataforma</Typography>
                <Button
                variant="contained"
                color="primary"
                startIcon={<Save />}
                onClick={handleSubmit}
                disabled={loading}
                >
                Salvar Alterações
                </Button>
            </Box>

            <Grid container spacing={3}>
                {/* Informações Básicas */}
                <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                    Informações Básicas
                    </Typography>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        name="nomePlataforma"
                        label="Nome da Plataforma"
                        value={configuracoes.nomePlataforma}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        name="emailContato"
                        label="Email de Contato"
                        type="email"
                        value={configuracoes.emailContato}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        name="telefone"
                        label="Telefone"
                        value={configuracoes.telefone}
                        onChange={handleInputChange}
                        fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        name="cnpj"
                        label="CNPJ"
                        value={configuracoes.cnpj}
                        onChange={handleInputChange}
                        fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        name="endereco"
                        label="Endereço"
                        value={configuracoes.endereco}
                        onChange={handleInputChange}
                        fullWidth
                        multiline
                        rows={2}
                        />
                    </Grid>
                    </Grid>
                </Paper>
                </Grid>

                {/* Configurações Financeiras */}
                <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                    Configurações Financeiras
                    </Typography>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        name="taxaServico"
                        label="Taxa de Serviço (%)"
                        type="number"
                        value={configuracoes.taxaServico}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        InputProps={{
                            inputProps: { min: 0, max: 100, step: 0.1 },
                        }}
                        />
                    </Grid>
                    </Grid>
                </Paper>
                </Grid>

                {/* Configurações de Notificações */}
                <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                    Configurações de Notificações
                    </Typography>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormControlLabel
                        control={
                            <Switch
                            checked={configuracoes.notificacoesEmail}
                            onChange={handleInputChange}
                            name="notificacoesEmail"
                            />
                        }
                        label="Notificações por Email"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControlLabel
                        control={
                            <Switch
                            checked={configuracoes.notificacoesPush}
                            onChange={handleInputChange}
                            name="notificacoesPush"
                            />
                        }
                        label="Notificações Push"
                        />
                    </Grid>
                    </Grid>
                </Paper>
                </Grid>

                {/* Configurações do Sistema */}
                <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                    Configurações do Sistema
                    </Typography>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormControlLabel
                        control={
                            <Switch
                            checked={configuracoes.manutencao}
                            onChange={handleInputChange}
                            name="manutencao"
                            />
                        }
                        label="Modo de Manutenção"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControlLabel
                        control={
                            <Switch
                            checked={configuracoes.modoTeste}
                            onChange={handleInputChange}
                            name="modoTeste"
                            />
                        }
                        label="Modo de Teste"
                        />
                    </Grid>
                    </Grid>
                    {configuracoes.manutencao && (
                    <Alert severity="warning" sx={{ mt: 2 }}>
                        O modo de manutenção está ativo. A plataforma estará indisponível para os usuários.
                    </Alert>
                    )}
                    {configuracoes.modoTeste && (
                    <Alert severity="info" sx={{ mt: 2 }}>
                        O modo de teste está ativo. As transações não serão processadas.
                    </Alert>
                    )}
                </Paper>
                </Grid>
            </Grid>

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

export default Configuracoes;