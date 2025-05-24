import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Divider,
    IconButton
} from '@mui/material';
import {
    ArrowBack,
    Add,
    Remove,
    CreditCard,
    LocalAtm,
    QrCode
} from '@mui/icons-material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import styled from 'styled-components';

const TicketType = styled(Paper)`
    padding: 20px;
    margin-bottom: 16px;
    border: 1px solid ${props => props.selected ? props.theme.palette.primary.main : '#e0e0e0'};
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        border-color: ${props => props.theme.palette.primary.main};
    }
`;

const QuantityControl = styled(Box)`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const PaymentMethod = styled(Paper)`
    padding: 20px;
    margin-bottom: 16px;
    border: 1px solid ${props => props.selected ? props.theme.palette.primary.main : '#e0e0e0'};
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        border-color: ${props => props.theme.palette.primary.main};
    }
`;

const CreditCardForm = styled(Box)`
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin-top: 16px;
`;

const PixQRCode = styled(Box)`
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin-top: 16px;
    text-align: center;
`;

const ComprarIngresso = ({ evento = {
    nome: "Festival de Música Rock in Rio",
    data: "2024-09-15",
    horario: "14:00",
    local: "Parque Olímpico do Rio de Janeiro",
    ingressos: [
        {
            id: 1,
            tipo: "Pista",
            preco: 450.00,
            disponiveis: 1000,
            descricao: "Acesso à área pista do festival"
        },
        {
            id: 2,
            tipo: "Camarote",
            preco: 1200.00,
            disponiveis: 200,
            descricao: "Acesso ao camarote com open bar e área vip"
        },
        {
            id: 3,
            tipo: "Front Stage",
            preco: 800.00,
            disponiveis: 500,
            descricao: "Acesso à área mais próxima do palco"
        }
    ]
}, onClose }) => {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        cpf: '',
        telefone: ''
    });
    const [creditCardData, setCreditCardData] = useState({
        numero: '',
        nome: '',
        validade: '',
        cvv: '',
        parcelas: '1'
    });

    const handleTicketSelect = (ticket) => {
        setSelectedTicket(ticket);
        setQuantity(1);
    };

    const handleQuantityChange = (value) => {
        if (value >= 1 && value <= selectedTicket.disponiveis) {
            setQuantity(value);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreditCardChange = (e) => {
        const { name, value } = e.target;
        setCreditCardData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    const formatExpiryDate = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 3) {
            return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
        }
        return v;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você implementaria a lógica de pagamento
        console.log('Dados do pedido:', {
            evento: evento.nome,
            ingresso: selectedTicket,
            quantidade: quantity,
            metodoPagamento: paymentMethod,
            dadosPessoais: formData,
            valorTotal: selectedTicket.preco * quantity
        });
    };

    const { id } = useParams();

    const renderPaymentDetails = () => {
        switch (paymentMethod) {
            case 'credit':
                return (
                    <CreditCardForm>
                        <Typography variant="h6" gutterBottom>
                            Dados do Cartão
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Número do Cartão"
                                    name="numero"
                                    value={creditCardData.numero}
                                    onChange={(e) => {
                                        const formatted = formatCardNumber(e.target.value);
                                        setCreditCardData(prev => ({
                                            ...prev,
                                            numero: formatted
                                        }));
                                    }}
                                    inputProps={{ maxLength: 19 }}
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
                                    onChange={(e) => {
                                        const formatted = formatExpiryDate(e.target.value);
                                        setCreditCardData(prev => ({
                                            ...prev,
                                            validade: formatted
                                        }));
                                    }}
                                    placeholder="MM/AA"
                                    inputProps={{ maxLength: 5 }}
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
                                    inputProps={{ maxLength: 3 }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>Parcelas</InputLabel>
                                    <Select
                                        value={creditCardData.parcelas}
                                        name="parcelas"
                                        onChange={handleCreditCardChange}
                                        label="Parcelas"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                                            <MenuItem key={num} value={String(num)}>
                                                {num}x de R$ {(selectedTicket.preco * quantity / num).toFixed(2)}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </CreditCardForm>
                );
            case 'pix':
                return (
                    <PixQRCode>
                        <Typography variant="h6" gutterBottom>
                            Pagamento via PIX
                        </Typography>
                        <Box sx={{ 
                            width: 200, 
                            height: 200, 
                            margin: '0 auto',
                            backgroundColor: '#f5f5f5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2
                        }}>
                            <QrCode sx={{ fontSize: 150, color: '#666' }} />
                        </Box>
                        <Typography variant="body2" color="text.secondary" paragraph>
                            Escaneie o QR Code acima com o aplicativo do seu banco
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Valor: R$ {(selectedTicket.preco * quantity).toFixed(2)}
                        </Typography>
                    </PixQRCode>
                );
            case 'boleto':
                return (
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Typography variant="body1" paragraph>
                            O boleto será gerado após a confirmação do pedido.
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Prazo de validade: 3 dias úteis
                        </Typography>
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
            <Button
                startIcon={<ArrowBack />}
                onClick={onClose}
                sx={{ mb: 3 }}
            >
                Voltar 
            </Button>

            <Typography variant="h4" gutterBottom>
                Comprar Ingresso - {evento.nome} {id}
            </Typography>

            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {format(new Date(evento.data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })} às {evento.horario}
            </Typography>

            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {evento.local}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <form onSubmit={handleSubmit}>
                <Typography variant="h6" gutterBottom>
                    Selecione o Tipo de Ingresso
                </Typography>

                <Grid container spacing={2} sx={{ mb: 4 }}>
                    {evento.ingressos.map((ticket) => (
                        <Grid item xs={12} key={ticket.id}>
                            <TicketType
                                selected={selectedTicket?.id === ticket.id}
                                onClick={() => handleTicketSelect(ticket)}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant="h6">
                                            {ticket.tipo}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" paragraph>
                                            {ticket.descricao}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Disponíveis: {ticket.disponiveis}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="h5" color="primary" align="right">
                                            R$ {ticket.preco.toFixed(2)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </TicketType>
                        </Grid>
                    ))}
                </Grid>

                {selectedTicket && (
                    <>
                        <Typography variant="h6" gutterBottom>
                            Quantidade
                        </Typography>
                        <QuantityControl sx={{ mb: 4 }}>
                            <IconButton
                                onClick={() => handleQuantityChange(quantity - 1)}
                                disabled={quantity <= 1}
                            >
                                <Remove />
                            </IconButton>
                            <Typography variant="h6">{quantity}</Typography>
                            <IconButton
                                onClick={() => handleQuantityChange(quantity + 1)}
                                disabled={quantity >= selectedTicket.disponiveis}
                            >
                                <Add />
                            </IconButton>
                        </QuantityControl>

                        <Typography variant="h6" gutterBottom>
                            Dados Pessoais
                        </Typography>
                        <Grid container spacing={2} sx={{ mb: 4 }}>
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

                        <Typography variant="h6" gutterBottom>
                            Forma de Pagamento
                        </Typography>
                        <Grid container spacing={2} sx={{ mb: 4 }}>
                            <Grid item xs={12} sm={4}>
                                <PaymentMethod
                                    selected={paymentMethod === 'credit'}
                                    onClick={() => setPaymentMethod('credit')}
                                >
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <CreditCard />
                                        <Typography>Cartão de Crédito</Typography>
                                    </Box>
                                </PaymentMethod>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <PaymentMethod
                                    selected={paymentMethod === 'pix'}
                                    onClick={() => setPaymentMethod('pix')}
                                >
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <QrCode />
                                        <Typography>PIX</Typography>
                                    </Box>
                                </PaymentMethod>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <PaymentMethod
                                    selected={paymentMethod === 'boleto'}
                                    onClick={() => setPaymentMethod('boleto')}
                                >
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <LocalAtm />
                                        <Typography>Boleto</Typography>
                                    </Box>
                                </PaymentMethod>
                            </Grid>
                        </Grid>

                        {paymentMethod && renderPaymentDetails()}

                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h6" gutterBottom>
                                Resumo do Pedido
                            </Typography>
                            <Paper sx={{ p: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1">
                                            {selectedTicket.tipo} x {quantity}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" color="primary">
                                            Total: R$ {(selectedTicket.preco * quantity).toFixed(2)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            disabled={!paymentMethod}
                        >
                            Finalizar Compra
                        </Button>
                    </>
                )}
            </form>
        </Box>
    );
};

export default ComprarIngresso; 