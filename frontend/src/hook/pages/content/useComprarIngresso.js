import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    const { id } = useParams();
    const navigate = useNavigate();
    const [evento, setEvento] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [formData, setFormData] = useState(INITIAL_DATA_PAYMENT);
    const [creditCardData, setCreditCardData] = useState(INITIAL_CARD_DATA);
    const { showSuccess, showError } = useSnackbar();

    useEffect(() => {
        carregarEvento();
        carregarDadosUsuario();
    }, [id]);

    const carregarEvento = async () => {
        try {
            setLoading(true);
            const response = await dashboardService.eventos.buscarEvento(id);
            setEvento(response);
        } catch (error) {
            console.error('Erro ao carregar evento:', error);
            showError(MESSAGES.EVENTO.ERRO_CARREGAR);
        } finally {
            setLoading(false);
        }
    };

    const carregarDadosUsuario = async () => {
        try {
            const usuario = await dashboardService.usuarios.buscarUsuarioLogado();
            if (usuario) {
                setFormData(prev => ({
                    ...prev,
                    nome: usuario.nome || '',
                    email: usuario.email || '',
                    cpf: usuario.cpf || '',
                    telefone: usuario.telefone || ''
                }));
            }
        } catch (error) {
            console.error('Erro ao carregar dados do usuário:', error);
        }
    };

    const handleQuantityChange = (value) => {
        if (value >= 1 && value <= evento?.ingressosDisponiveis) {
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

    const handleSubmit = async (e) => {
        e?.preventDefault();

        try {
            // Primeiro, criar o ingresso
            const ingressoResponse = await dashboardService.ingressos.criarIngresso({
                eventoId: id,
                quantidade: quantity,
                tipo: 'inteira',
                preco: evento.precoIngresso
            });

            // Depois, criar a sessão de checkout
            const checkoutResponse = await dashboardService.pagamentos.criarCheckoutSession({
                eventoId: id,
                quantidade: quantity,
                ingressoId: ingressoResponse.id
            });
            
            showSuccess(MESSAGES.INGRESSO.SUCESSO_CHECKOUT);
            
            // Redirecionar para a página de checkout do Stripe
            window.location.href = checkoutResponse.checkoutUrl;
            
        } catch (error) {
            console.error('Erro ao processar pagamento:', error);
            showError(MESSAGES.INGRESSO.ERRO_CHECKOUT);
        }
    };

    return {
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
    };
};

export default useComprarIngresso;