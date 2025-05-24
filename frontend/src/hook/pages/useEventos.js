import { useState, useEffect } from 'react';
import useSnackbar from '../useSnackbar';
import { MESSAGES } from '../../utils/alerts/messages';
import dashboardService from '../../services/dashboard/dashboardService';

//Constantes iniciais
const ITENS_POR_PAGINA = 6;

const INITIAL_FILTER_DATA =  {
    nome: '',
    categoria: '',
    cidade: '',
    data: null,
    
};

const useEventos = () => {
    const [eventos, setEventos] = useState([]);
    const [locais, setLocais] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [filtros, setFiltros] = useState(INITIAL_FILTER_DATA);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [loading, setLoading] = useState(false);
    const { snackbar, showError, hideSnackbar } = useSnackbar();

    useEffect(() => {
        carregarDados();
    }, [pagina, filtros]);

    //Funções auxiliares
    const carregarDados = async () => {
        try{
            setLoading(true);

            const params = {
                pagina,
                itensPorPagina: ITENS_POR_PAGINA,
            };

            if(filtros.categoria) params.categoria = filtros.categoria;
            if(filtros.data) params.data = new Date(filtros.data).toISOString();

            const [eventosResponse, locaisResponse] = await Promise.all([
                dashboardService.eventos.listarEventos(params),
                dashboardService.locais.listarLocais()
            ]);



            setEventos(eventosResponse.eventos);
            setTotalPaginas(eventosResponse.totalPaginas);
            setPagina(pagina);
            setLocais(locaisResponse);

            const cidadesUnicas = [...new Set(eventosResponse.eventos
                .map(evento => evento.local?.endereco?.cidade)
                .filter(Boolean))];
            setCidades(cidadesUnicas);
        }catch(error){
            showError(MESSAGES.EVENTO.ERRO_LISTAR, error);
        }finally{
            setLoading(false);
        }
    };

    const buscarEventoId = async (id) => {
        try{
            setLoading(true);
            
            const evento = await dashboardService.eventos.buscarEventoId(id);
            return evento;
        }catch(error){
            showError(MESSAGES.EVENTO.ERRO_LISTAR, error);
            return null;
        }finally{
            setLoading(false);
        }
    };

    //Manipulação de Detalhes
    const handleFiltroChange = (e) => {
        const { name, value } = e.target;
        setFiltros(prev => ({
            ...prev,
            [name]:value
        }));
        setPagina(1);
    };

    const handleDataChange = (newDate) => {
        setFiltros(prev => ({
            ...prev,
            data: newDate
        }));
        setPagina(1);
    };

    const handlePageChange = (event, newPage) => {
        if(newPage >= 1 && newPage <= totalPaginas){
            setPagina(newPage);
        }
    };

    return{
        eventos,
        locais,
        cidades,
        filtros,
        pagina,
        totalPaginas,
        loading,
        snackbar,
        hideSnackbar,

        //Manipuladores
        handleFiltroChange,
        handleDataChange,
        handlePageChange,
        buscarEventoId
    }
};



export default useEventos;