import React from 'react';
import {
    Box, Typography, Grid, Paper, TextField, Button,
    Switch, FormControlLabel, Divider, Alert, Snackbar,
    Select, MenuItem, InputLabel, FormControl, Card,
    CardContent, CardHeader, IconButton, Tooltip
} from '@mui/material';
import { 
    Save, Security, Payment, Notifications, 
    Event, Settings, Palette, IntegrationInstructions,
    Info, Lock, Timer, Password
} from '@mui/icons-material';
import useConfiguracoes from '../../../hook/dashboard/useConfiguracoes';

const Configuracoes = ({ mostrarMensagem }) => {
    const {
        configuracoes,
        loading,
        snackbar,
        handleInputChange,
        handleSubmit,
        handleCloseSnackbar,
        temPermissao
    } = useConfiguracoes(mostrarMensagem);

    const renderSecao = (titulo, icone, secao, children) => {
        if (!temPermissao(secao)) return null;

        return (
            <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {icone}
                        <Typography variant="h6" sx={{ ml: 1 }}>
                            {titulo}
                        </Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    {children}
                </Paper>
            </Grid>
        );
    };

    return (
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
                {/* Informações Gerais */}
                {renderSecao('Informações Gerais', <Info color="primary" />, 'gerais',
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
                )}

                {/* Configurações Financeiras */}
                {renderSecao('Configurações Financeiras', <Payment color="primary" />, 'financeiro',
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
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
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="comissaoOrganizador"
                                label="Comissão Organizador (%)"
                                type="number"
                                value={configuracoes.comissaoOrganizador}
                                onChange={handleInputChange}
                                fullWidth
                                InputProps={{
                                    inputProps: { min: 0, max: 100, step: 0.1 },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="limitePagamento"
                                label="Limite de Pagamento (R$)"
                                type="number"
                                value={configuracoes.limitePagamento}
                                onChange={handleInputChange}
                                fullWidth
                                InputProps={{
                                    inputProps: { min: 0, step: 0.01 },
                                }}
                            />
                        </Grid>
                    </Grid>
                )}

                {/* Configurações de Notificações */}
                {renderSecao('Configurações de Notificações', <Notifications color="primary" />, 'notificacoes',
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
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
                        <Grid item xs={12} sm={4}>
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
                        <Grid item xs={12} sm={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={configuracoes.notificacoesMarketing}
                                        onChange={handleInputChange}
                                        name="notificacoesMarketing"
                                    />
                                }
                                label="Notificações de Marketing"
                            />
                        </Grid>
                    </Grid>
                )}

                {/* Configurações de Eventos */}
                {renderSecao('Configurações de Eventos', <Event color="primary" />, 'eventos',
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="limiteEventosSimultaneos"
                                label="Limite de Eventos Simultâneos"
                                type="number"
                                value={configuracoes.limiteEventosSimultaneos}
                                onChange={handleInputChange}
                                fullWidth
                                InputProps={{
                                    inputProps: { min: 1 },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="prazoCancelamento"
                                label="Prazo de Cancelamento (dias)"
                                type="number"
                                value={configuracoes.prazoCancelamento}
                                onChange={handleInputChange}
                                fullWidth
                                InputProps={{
                                    inputProps: { min: 0 },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="taxaCancelamento"
                                label="Taxa de Cancelamento (%)"
                                type="number"
                                value={configuracoes.taxaCancelamento}
                                onChange={handleInputChange}
                                fullWidth
                                InputProps={{
                                    inputProps: { min: 0, max: 100, step: 0.1 },
                                }}
                            />
                        </Grid>
                    </Grid>
                )}

                {/* Configurações de Segurança */}
                {renderSecao('Configurações de Segurança', <Security color="primary" />, 'seguranca',
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={configuracoes.autenticacaoDoisFatores}
                                        onChange={handleInputChange}
                                        name="autenticacaoDoisFatores"
                                    />
                                }
                                label="Autenticação em Dois Fatores"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                name="tempoSessao"
                                label="Tempo de Sessão (minutos)"
                                type="number"
                                value={configuracoes.tempoSessao}
                                onChange={handleInputChange}
                                fullWidth
                                InputProps={{
                                    inputProps: { min: 5, max: 1440 },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel>Política de Senha</InputLabel>
                                <Select
                                    name="politicaSenha"
                                    value={configuracoes.politicaSenha}
                                    onChange={handleInputChange}
                                    label="Política de Senha"
                                >
                                    <MenuItem value="baixa">Baixa</MenuItem>
                                    <MenuItem value="media">Média</MenuItem>
                                    <MenuItem value="alta">Alta</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                )}

                {/* Configurações de Integração */}
                {renderSecao('Configurações de Integração', <IntegrationInstructions color="primary" />, 'integracao',
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card variant="outlined">
                                <CardHeader
                                    title="Stripe"
                                    subheader="Configurações de pagamento via cartão de crédito"
                                />
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={configuracoes.stripeEnabled}
                                                        onChange={handleInputChange}
                                                        name="stripeEnabled"
                                                    />
                                                }
                                                label="Habilitar Stripe"
                                            />
                                        </Grid>
                                        {configuracoes.stripeEnabled && (
                                            <>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        name="stripePublicKey"
                                                        label="Chave Pública"
                                                        value={configuracoes.stripePublicKey}
                                                        onChange={handleInputChange}
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        name="stripeSecretKey"
                                                        label="Chave Secreta"
                                                        type="password"
                                                        value={configuracoes.stripeSecretKey}
                                                        onChange={handleInputChange}
                                                        fullWidth
                                                    />
                                                </Grid>
                                            </>
                                        )}
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card variant="outlined">
                                <CardHeader
                                    title="PIX"
                                    subheader="Configurações de pagamento via PIX"
                                />
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={configuracoes.pixEnabled}
                                                        onChange={handleInputChange}
                                                        name="pixEnabled"
                                                    />
                                                }
                                                label="Habilitar PIX"
                                            />
                                        </Grid>
                                        {configuracoes.pixEnabled && (
                                            <Grid item xs={12}>
                                                <TextField
                                                    name="pixChave"
                                                    label="Chave PIX"
                                                    value={configuracoes.pixChave}
                                                    onChange={handleInputChange}
                                                    fullWidth
                                                />
                                            </Grid>
                                        )}
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                )}

                {/* Configurações do Sistema */}
                {renderSecao('Configurações do Sistema', <Settings color="primary" />, 'sistema',
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
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
                        <Grid item xs={12} sm={4}>
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
                        <Grid item xs={12} sm={4}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={configuracoes.temaEscuro}
                                        onChange={handleInputChange}
                                        name="temaEscuro"
                                    />
                                }
                                label="Tema Escuro"
                            />
                        </Grid>
                        {configuracoes.manutencao && (
                            <Grid item xs={12}>
                                <Alert severity="warning">
                                    O modo de manutenção está ativo. A plataforma estará indisponível para os usuários.
                                </Alert>
                            </Grid>
                        )}
                        {configuracoes.modoTeste && (
                            <Grid item xs={12}>
                                <Alert severity="info">
                                    O modo de teste está ativo. As transações não serão processadas.
                                </Alert>
                            </Grid>
                        )}
                    </Grid>
                )}
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