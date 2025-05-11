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
            const data = await dashboardService
        }catch(error){

        }
    }
};

export default useConfiguracoes;