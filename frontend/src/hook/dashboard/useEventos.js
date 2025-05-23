import { useState, useEffect } from 'react';
import useSnackbar  from '../useSnackbar';
import { MESSAGES } from '../../utils/alerts/messages';
import dashboardService from '../../services/dashboard/dashboardService'; 

//Constantes inciais
const ITEMS_POR_PAGINA = 5;

const INITIAL_FORM_DATA = {
    nome: '',
    descricao: '',
    data: null,
    precoIngresso: '',
    ingressosDisponiveis: '',
    tipoEvento: '',
    categoria: '',
    classificacaoEtaria: '',
    status: '',
    localId: '',
    foto: null,
    galeria: []
};

const useEventos = () => {
    const [eventos, setEventos] = useState([]);
    const [locais, setLocais] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [eventoSelecionado, setEventoSelecionado] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [eventoParaDeletar, setEventoParaDeletar] = useState(null);
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [capaPreview, setCapaPreview] = useState('');
    const [galeriaPreviews, setGaleriaPreviews] = useState([]);
    const [imagemEditando, setImagemEditando] = useState(null);
    const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar();


    //Carregar usuários ao iniciar
    useEffect(() => {
        carregarDadosIniciais();
    }, []);

    //Funções auxiliares
    const carregarDadosIniciais = async (paginaAtual = 1) => {
        try{
            setLoading(true);
            
            const [eventosResponse, locaisResponse] = await Promise.all([
                dashboardService.eventos.listarEventosAll(paginaAtual, ITEMS_POR_PAGINA),
                dashboardService.locais.listarLocais()
            ]);
            setEventos(eventosResponse.eventos);
            setTotalPaginas(eventosResponse.totalPaginas);
            setPagina(paginaAtual);

            setLocais(locaisResponse)
        }catch(error){
            showError(MESSAGES.EVENTO.ERRO_LISTAR, error);
            showError(MESSAGES.LOCAL.ERRO_LISTAR, error);
        }finally{
            setLoading(false);
        }
    };
    
    //Manipulação de Formulário
    const handleImagemCapaChange = (event) => {
        const file = event.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onloadend = () => {
                setCapaPreview(reader.result);
                setFormData(prev => ({
                    ...prev,
                    foto: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGaleriaChange = (event) => {
        const files = Array.from(event.target.files);
        const newPreviews = [...galeriaPreviews];

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if(imagemEditando !== null){
                    newPreviews[imagemEditando] = reader.result;
                    setImagemEditando(null);
                }else{
                    newPreviews.push(reader.result);
                }
                setGaleriaPreviews(newPreviews);
                setFormData(prev => ({
                    ...prev,
                    galeria: newPreviews
                }));
            };
            reader.readAsDataURL(file)
        });
    };

    const handleRemoverImagemGaleria = (index) => {
        const newPreviews = galeriaPreviews.filter((_, i) => i !== index);
        setGaleriaPreviews(newPreviews);
        setFormData(prev => ({
            ...prev,
            galeria: newPreviews
        }));
    };

    const handlePageChange = (event, newPage) => {
        if(newPage >= 1 && newPage <= totalPaginas){
            setPagina(newPage);
        }
    };
    
    //CRUD de eventos
    const handleNovoEvento = () => {
        setEventoSelecionado(null);
        setFormData(INITIAL_FORM_DATA);
        setCapaPreview('');
        setGaleriaPreviews([]);
        setFormOpen(true);
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        setLoading(true);

        try{
            if(eventoSelecionado){
                setEventos(prev => prev.map(evento => 
                    evento.id === eventoSelecionado.id ? { ...formData, id: evento.id } : evento
                ));
                showSuccess(MESSAGES.EVENTO.ATUALIZADO);
            }else{
                const novoEvento = {
                    ...formData,
                    id: String(eventos.length + 1)
                };
                setEventos(prev => [...prev, novoEvento]);
                setTotalPaginas(Math.ceil((eventos.length + 1) - ITEMS_POR_PAGINA));
                showSuccess(MESSAGES.EVENTO.CRIADO);
            }
            setFormOpen(false);
        }catch(error){
            showError(MESSAGES.EVENTO.ERRO_SALVAR, error);
        }finally{
            setLoading(true);
        }
    };

    const handleEditarEvento = (evento) => {
        setEventoSelecionado(evento);
        setFormData({
            ...evento,
            data: new Date(evento.data)
        });
        setCapaPreview(evento.foto || '');
        setGaleriaPreviews(evento.galeria || []);
        setFormOpen(true);
    };

    const handleDeleteClick = (evento) => {
        setEventoParaDeletar(evento);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        setEventos(prev => prev.filter(evento => evento.id !== eventoParaDeletar.id));
        setTotalPaginas(Math.ceil((eventos.length - 1) / ITEMS_POR_PAGINA));
        showSuccess(MESSAGES.EVENTO.EXCLUIDO);
        setDeleteDialogOpen(false);
        setEventoParaDeletar(null);
    };

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
        setEventoParaDeletar(null);
    };

    const getStatusColor = (status) => {
        const cores = {
            'em cartaz': 'success',
            'cancelado': 'error',
            'encerrado': 'default',
            'agendado': 'info'
        };
        return cores[status] || 'default';
    }

    return{
        eventos,
        locais,
        pagina,
        totalPaginas,
        loading,
        formOpen,
        eventoSelecionado,
        eventoParaDeletar,
        deleteDialogOpen,
        formData,
        capaPreview,
        galeriaPreviews,
        imagemEditando,
        snackbar,
        hideSnackbar,
        MESSAGES,

        //Manipuladores
        handleImagemCapaChange,
        handleGaleriaChange,
        handleRemoverImagemGaleria,
        handlePageChange,

        //Métodos
        handleNovoEvento,
        handleSubmit,
        handleEditarEvento,
        handleDeleteClick,
        handleConfirmDelete,
        handleCancelDelete,
        getStatusColor,
        setImagemEditando,
        setFormOpen

    }
};

export default useEventos;