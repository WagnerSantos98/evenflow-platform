import { useState, useEffect } from 'react';
import dashboardService from '../../services/dashboard/dashboardService';
import { useAuth } from '../../hook/auth/useAuth.jsx';

//Constantes iniciais
const INITIAL_FORM_DATA = {
    // Configurações Gerais
    nomePlataforma: '',
    emailContato: '',
    telefone: '',
    endereco: '',
    cnpj: '',
    
    // Configurações Financeiras
    taxaServico: '',
    comissaoOrganizador: '',
    limitePagamento: '',
    
    // Configurações de Notificações
    notificacoesEmail: true,
    notificacoesPush: true,
    notificacoesMarketing: false,
    
    // Configurações de Eventos
    limiteEventosSimultaneos: '',
    prazoCancelamento: '',
    taxaCancelamento: '',
    
    // Configurações do Sistema
    manutencao: false,
    modoTeste: false,
    temaEscuro: false,
    
    // Configurações de Segurança
    autenticacaoDoisFatores: false,
    tempoSessao: '30',
    politicaSenha: 'media',
    
    // Configurações de Integração
    stripeEnabled: false,
    stripePublicKey: '',
    stripeSecretKey: '',
    pixEnabled: false,
    pixChave: '',
};

const useConfiguracoes = (mostrarMensagem) => {
    const { user } = useAuth();
    const [configuracoes, setConfiguracoes] = useState(INITIAL_FORM_DATA);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        carregarConfiguracoes();
    }, []);

    //Carregar configurações
    const carregarConfiguracoes = async () => {
        try {
            setLoading(true);
            const data = await dashboardService.configuracoes.obterConfiguracoes();
            setConfiguracoes(data);
        } catch (error) {
            mostrarMensagem('Erro ao carregar configurações', 'error', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, checked } = e.target;
        setConfiguracoes((prev) => ({
            ...prev,
            [name]: e.target.type === 'checkbox' ? checked : value
        }));
    };

    //Salvar alterações
    const handleSubmit = async () => {
        try {
            setLoading(true);
            await dashboardService.configuracoes.atualizarConfiguracoes(configuracoes);
            mostrarMensagem('Configurações atualizadas com sucesso!', 'success');
        } catch (error) {
            mostrarMensagem('Erro ao salvar configurações', 'error', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({
            ...prev,
            open: false
        }));
    };

    // Verificar permissões baseado no nível de acesso
    const temPermissao = (secao) => {
        switch (user?.nivelAcesso) {
            case 'admin':
                return true; // Admin tem acesso a tudo
            case 'organizador':
                return ['gerais', 'eventos', 'notificacoes'].includes(secao);
            case 'usuario':
                return ['gerais', 'notificacoes'].includes(secao);
            default:
                return false;
        }
    };

    return {
        configuracoes,
        loading,
        snackbar,
        handleInputChange,
        handleSubmit,
        handleCloseSnackbar,
        temPermissao
    };
};

export default useConfiguracoes;