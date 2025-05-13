import { useState, useEffect } from 'react';
import dashboarService from '../../services/tests/dashboardService';

//Constantes inciais
const INITIAL_FORM_DATA = {
    totalVendas: '',
    totalIngressos: '',
    mediaTicket: '',
    taxaConversao: '',
};

const useRelatorios = (mostrarMensagem) => {
    const [periodo, setPeriodo] = useState('mes');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [vendasPorPeriodo, setVendasPorPeriodo] = useState([]);
    const [vendasPorEvento, setVendasPorEvento] = useState([]);
    const [vendasPorCategoria, setVendasPorCategoria] = useState([]);
    const [resumoFinanceiro, setResumoFinanceiro] = useState(INITIAL_FORM_DATA);

    //Cores do charts
    const COLORS = ['#0088fe', '#00c49f', '#ffbb28', '#ff8042', '#8884d8'];

    useEffect(() => {
        carregarDados();
    }, [periodo, dataInicio, dataFim]);

    const carregarDados = async () => {
        try{
            const [vendasPeriodo, vendasEvento, vendasCategoria, resumo] = await Promise.all([
                dashboarService.relatoriosFinanceiros.vendasPorPeriodo(periodo, dataInicio, dataFim),
                dashboarService.relatoriosFinanceiros.vendasPorEvento(periodo, dataInicio, dataFim),
                dashboarService.relatoriosFinanceiros.vendasPorCategoria(periodo, dataInicio, dataFim),
                dashboarService.relatoriosFinanceiros.resumoFinanceiro(periodo, dataInicio, dataFim)
            ]);

            setVendasPorPeriodo(vendasPeriodo);
            setVendasPorEvento(vendasEvento);
            setVendasPorCategoria(vendasCategoria);
            setResumoFinanceiro({
                totalVendas: Number(resumo?.totalVendas || 0),
                totalIngressos: Number(resumo?.totalIngressos || 0),
                mediaTicket: Number(resumo?.mediaTicket || 0),
                taxaConversao: Number(resumo?.taxaConversao || 0),
            });
        }catch(error){
            mostrarMensagem('Erro ao carregar dados financeiros', error);
        }
    };

    return{
        COLORS,
        periodo,
        dataInicio,
        dataFim,
        vendasPorPeriodo,
        vendasPorEvento,
        vendasPorCategoria,
        resumoFinanceiro,
        setPeriodo,
        setDataInicio,
        setDataFim,
        carregarDados,
    };
};

export default useRelatorios;