import { useEffect, useState } from 'react';
import useSnackbar from '../../useSnackbar';
import { MESSAGES } from '../../../utils/alerts/messages';
import dashboardService from '../../../services/dashboard/dashboardService';

const INITIAL_DATA_PAYMENT = {
    nome: '',
    email: '',
    cpf: '',
    telefone: ''
};

const INITIAL_CARD_DATA = {
    numero: '',
        nome: '',
        validade: '',
        cvv: '',
        parcelas: '1'
};

const useComprarIngresso = () => {
    const [evento, setEvento] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [formData, setFormData] = useState(INITIAL_DATA_PAYMENT);
    const [creditCardData, setCreditCardData] = useState(INITIAL_CARD_DATA)
    const [eventoSelecionado, setEventoSelecionado] = useState(null);

    const handleTicketSelect = (ticket) => {
        setSelectedTicket(ticket);
        setQuantity(1);
    };

    const handleQuantityChange = (value) => {
        if(value >= 1 && value <= selectedTicket.disponiveis){
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

    const handleSubmit = (e) => {
        e?.preventDefault();

        console.log('Dados do pedido:', {
            evento: evento.nome,
            ingresso: selectedTicket,
            quantidade: quantity,
            metodoPagamento: paymentMethod,
            dadosPessoais: formData,
            valorTotal: selectedTicket.preco * quantity
        });
    };



    return{
        evento,
        eventoSelecionado,
        formData,
        quantity,
        paymentMethod,
        creditCardData,
        selectedTicket,
        setEventoSelecionado,
        setPaymentMethod,

        handleTicketSelect,
        handleQuantityChange,
        handleInputChange,
        handleCreditCardChange,
        handleSubmit


    }
};

export default useComprarIngresso;