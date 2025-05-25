import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    Grid,
    TextField,
    Button,
    Box,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Divider,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@mui/material';
import useComprarIngresso from '../../hook/pages/content/useComprarIngresso';
import { formatarMoeda, formatarNumeroCartao } from '../../utils/fomatters';

const ComprarIngresso = () => {
    const navigate = useNavigate();
    const {
        evento,
        loading,
        quantity,
        paymentMethod,
        formData,
        creditCardData,
        setPaymentMethod,
        handleQuantityChange,
        handleInputChange,
        handleCreditCardChange,
        handleSubmit
    } = useComprarIngresso();

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!evento) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h5" color="error">
                        Evento não encontrado
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/eventos')}
                        sx={{ mt: 2 }}
                    >
                        Voltar para Eventos
                    </Button>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Comprar Ingresso - {evento.nome}
                </Typography>

                <Grid container spacing={3}>
                    {/* Informações do Evento */}
                    <Grid item xs={12}>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Informações do Evento
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography>
                                        <strong>Data:</strong> {new Date(evento.data).toLocaleDateString()}
                                    </Typography>
                                    <Typography>
                                        <strong>Horário:</strong> {evento.horario}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography>
                                        <strong>Local:</strong> {evento.local?.nome || 'Local não definido'}
                                    </Typography>
                                    <Typography>
                                        <strong>Endereço:</strong> {evento.local?.endereco?.logradouro || 'Endereço não definido'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Seleção de Quantidade */}
                    <Grid item xs={12}>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Quantidade de Ingressos
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                    disabled={quantity <= 1}
                                >
                                    -
                                </Button>
                                <Typography variant="h6">{quantity}</Typography>
                                <Button
                                    variant="outlined"
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                    disabled={quantity >= evento.ingressosDisponiveis}
                                >
                                    +
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Dados Pessoais */}
                    <Grid item xs={12}>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Dados Pessoais
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Nome Completo"
                                        name="nome"
                                        value={formData.nome}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="E-mail"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="CPF"
                                        name="cpf"
                                        value={formData.cpf}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Telefone"
                                        name="telefone"
                                        value={formData.telefone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Método de Pagamento */}
                    <Grid item xs={12}>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Método de Pagamento
                            </Typography>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                >
                                    <FormControlLabel
                                        value="cartao"
                                        control={<Radio />}
                                        label="Cartão de Crédito"
                                    />
                                    <FormControlLabel
                                        value="boleto"
                                        control={<Radio />}
                                        label="Boleto Bancário"
                                    />
                                    <FormControlLabel
                                        value="pix"
                                        control={<Radio />}
                                        label="PIX"
                                    />
                                </RadioGroup>
                            </FormControl>

                            {paymentMethod === 'cartao' && (
                                <Grid container spacing={2} sx={{ mt: 2 }}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Número do Cartão"
                                            name="numero"
                                            value={creditCardData.numero}
                                            onChange={(e) => {
                                                const formattedValue = formatarNumeroCartao(e.target.value);
                                                handleCreditCardChange({
                                                    target: {
                                                        name: 'numero',
                                                        value: formattedValue
                                                    }
                                                });
                                            }}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Nome no Cartão"
                                            name="nome"
                                            value={creditCardData.nome}
                                            onChange={handleCreditCardChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Validade"
                                            name="validade"
                                            value={creditCardData.validade}
                                            onChange={handleCreditCardChange}
                                            placeholder="MM/AA"
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="CVV"
                                            name="cvv"
                                            value={creditCardData.cvv}
                                            onChange={handleCreditCardChange}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel>Parcelas</InputLabel>
                                            <Select
                                                name="parcelas"
                                                value={creditCardData.parcelas}
                                                onChange={handleCreditCardChange}
                                                label="Parcelas"
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                                                    <MenuItem key={num} value={num.toString()}>
                                                        {num}x de {formatarMoeda(evento.precoIngresso / num)}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            )}
                        </Paper>
                    </Grid>

                    {/* Resumo do Pedido */}
                    <Grid item xs={12}>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Resumo do Pedido
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography>Quantidade de Ingressos:</Typography>
                                        <Typography>{quantity}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography>Valor Unitário:</Typography>
                                        <Typography>{formatarMoeda(evento.precoIngresso)}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="h6">Total:</Typography>
                                        <Typography variant="h6" color="primary">
                                            {formatarMoeda(evento.precoIngresso * quantity)}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Botão de Finalizar Compra */}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            onClick={handleSubmit}
                            disabled={!formData.nome || !formData.email || !formData.cpf || !formData.telefone || !paymentMethod}
                        >
                            Finalizar Compra
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default ComprarIngresso; 