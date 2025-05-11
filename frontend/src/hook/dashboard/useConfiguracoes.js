import { useState, useEffect } from 'react';
import dashboardService from '../../services/tests/dashboardService';

//Constantes inciais
const INITIAL_FORM_DATA = {
    nomePlataforma: '',
    emailContato: '',
    telefone: '',
    endereco: '',
    cnpj: '',
    taxaServico: '',
    notificacoesEmail: true,
    notificacoesPush: true,
    manutencao: false,
    modoTeste: false,
};

const useConfiguracoes = (mostrarMensagem) => {
    const [configuracoes, setConfiguracoes] = useState(INITIAL_FORM_DATA);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        carregarConfiguracoes();
    }, []);

    //Carregar configurações
    const carregarConfiguracoes = async () => {
        try{
            setLoading(true);
            const data = await dashboardService.configuracoes.obterConfiguracoes();
            setConfiguracoes(data);
        }catch(error){
            mostrarMensagem('Erro ao carregar configurações', error);
        }finally{
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
        try{
            setLoading(true);
            await dashboardService.configuracoes.atualizarConfiguracoes(configuracoes);
            mostrarMensagem('Configurações atualizadas com sucesso!');
        }catch(error){
            mostrarMensagem('Erro ao salvar configurações', error);
        }finally{
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({
            ...prev,
            open: false
        }));
    };

    return{
        configuracoes,
        loading,
        snackbar,
        handleInputChange,
        handleSubmit,
        handleCloseSnackbar
    }
};

export default useConfiguracoes;