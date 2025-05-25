import { useState, useEffect } from 'react';
import useSnackbar from '../useSnackbar';
import { MESSAGES } from '../../utils/alerts/messages';
import dashboardService from '../../services/dashboard/dashboardService';

//Constantes inciais
const ITEMS_POR_PAGINA = 5;

const INITIAL_FORM_DATA = {
    nome: '',
    descricao: '',
    data: null,
    hora: null,
    precoIngresso: '',
    ingressosDisponiveis: '',
    tipoEvento: 'presencial',
    categoria: 'outros',
    classificacaoEtaria: 'L',
    status: 'em cartaz',
    localId: '',
    foto: null,
    galeria: []
};

const useEventos = () => {
    const [eventos, setEventos] = useState([]);
    const [locais, setLocais] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [loading, setLoading] = useState(true);
    const [formOpen, setFormOpen] = useState(false);
    const [eventoSelecionado, setEventoSelecionado] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [eventoParaDeletar, setEventoParaDeletar] = useState(null);
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [capaPreview, setCapaPreview] = useState('');
    const [galeriaPreviews, setGaleriaPreviews] = useState([]);
    const [imagemEditando, setImagemEditando] = useState(null);
    const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar();

    const MESSAGES = {
        EVENTO: {
            TITULO_EXCLUSAO: 'Excluir Evento',
            CONFIRMAR_EXCLUSAO: 'Tem certeza que deseja excluir o evento {nome}?',
            BOTAO_EXCLUIR: 'Excluir',
            BOTAO_CANCELAR: 'Cancelar',
            SUCESSO_CRIAR: 'Evento criado com sucesso!',
            SUCESSO_ATUALIZAR: 'Evento atualizado com sucesso!',
            SUCESSO_EXCLUIR: 'Evento excluído com sucesso!',
            ERRO_CRIAR: 'Erro ao criar evento!',
            ERRO_ATUALIZAR: 'Erro ao atualizar evento!',
            ERRO_EXCLUIR: 'Erro ao excluir evento!',
            ERRO_CARREGAR: 'Erro ao carregar eventos!',
            ERRO_SALVAR: 'Erro ao salvar evento!'
        }
    };

    //Carregar usuários ao iniciar
    useEffect(() => {
        carregarDados();
    }, []);

    //Funções auxiliares
    const carregarDados = async (paginaAtual = 1) => {
        try{
            setLoading(true);
            
            const params = {
                pagina,
                itensPorPagina: ITEMS_POR_PAGINA,
            }

            const [eventosResponse, locaisResponse] = await Promise.all([
                dashboardService.eventos.listarEventos(params),
                dashboardService.locais.listarLocais()
            ]);
            setEventos(eventosResponse.eventos);
            setTotalPaginas(eventosResponse.totalPaginas);
            setPagina(paginaAtual);
            setLocais(locaisResponse.locais || []);
        }catch(error){
            showError(MESSAGES.EVENTO.ERRO_CARREGAR, error);
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

    const handleEditarEvento = (evento) => {
        setEventoSelecionado(evento);
        setFormData({
            ...evento,
            data: new Date(evento.data),
            endereco: evento.endereco || {
                cep: '',
                rua: '',
                bairro: '',
                numero: '',
                cidade: '',
                estado: ''
            }
        });
        setCapaPreview(evento.foto || '');
        setGaleriaPreviews(evento.galeria || []);
        setFormOpen(true);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            data: date
        }));
    };

    const handleTimeChange = (time) => {
        setFormData(prev => ({
            ...prev,
            hora: time
        }));
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            
            // Adiciona os campos básicos
            Object.keys(formData).forEach(key => {
                if (key === 'data' && formData.data) {
                    const dataHora = new Date(formData.data);
                    if (formData.hora) {
                        dataHora.setHours(formData.hora.getHours());
                        dataHora.setMinutes(formData.hora.getMinutes());
                    }
                    // Formata a data para 'YYYY-MM-DD HH:mm:ss'
                    const formattedDate = `${dataHora.getFullYear()}-${('0' + (dataHora.getMonth() + 1)).slice(-2)}-${('0' + dataHora.getDate()).slice(-2)} ${('0' + dataHora.getHours()).slice(-2)}:${('0' + dataHora.getMinutes()).slice(-2)}:00`;
                    formDataToSend.append('data', formattedDate);
                } else if (key === 'precoIngresso') {
                    formDataToSend.append(key, parseFloat(formData[key]));
                } else if (key === 'ingressosDisponiveis') {
                    formDataToSend.append(key, parseInt(formData[key]));
                } else if (key === 'localId' && formData.tipoEvento === 'presencial') {
                    formDataToSend.append(key, formData[key]);
                } else if (key !== 'foto' && key !== 'galeria' && key !== 'hora' && key !== 'localId') {
                    formDataToSend.append(key, formData[key]);
                }
            });

            // Adiciona a capa se houver
            if (formData.foto) {
                if (typeof formData.foto === 'string' && formData.foto.startsWith('data:')) {
                    // Se for uma string base64, converte para File
                    const response = await fetch(formData.foto);
                    const blob = await response.blob();
                    const file = new File([blob], 'capa.jpg', { type: 'image/jpeg' });
                    formDataToSend.append('capa', file);
                } else {
                    formDataToSend.append('capa', formData.foto);
                }
            }

            // Adiciona as imagens da galeria
            if (formData.galeria && formData.galeria.length > 0) {
                for (const imagem of formData.galeria) {
                    if (typeof imagem === 'string' && imagem.startsWith('data:')) {
                        // Se for uma string base64, converte para File
                        const response = await fetch(imagem);
                        const blob = await response.blob();
                        const file = new File([blob], 'galeria.jpg', { type: 'image/jpeg' });
                        formDataToSend.append('galeria', file);
                    } else {
                        formDataToSend.append('galeria', imagem);
                    }
                }
            }

            // Log dos dados que serão enviados
            console.log('Dados do formulário:', formData);
            for (let pair of formDataToSend.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            if (eventoSelecionado) {
                await dashboardService.eventos.atualizarEvento(eventoSelecionado.id, formDataToSend);
                showSuccess(MESSAGES.EVENTO.SUCESSO_ATUALIZAR);
            } else {
                await dashboardService.eventos.criarEvento(formDataToSend);
                showSuccess(MESSAGES.EVENTO.SUCESSO_CRIAR);
            }

            setFormOpen(false);
            carregarDados();
        } catch (error) {
            console.error('Erro ao salvar evento:', error);
            if (error.response) {
                console.error('Resposta do servidor:', error.response.data);
            }
            showError(MESSAGES.EVENTO.ERRO_SALVAR, error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (evento) => {
        setEventoParaDeletar(evento);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        setEventos(prev => prev.filter(evento => evento.id !== eventoParaDeletar.id));
        setTotalPaginas(Math.ceil((eventos.length - 1) / ITEMS_POR_PAGINA));
        showSuccess(MESSAGES.EVENTO.SUCESSO_EXCLUIR);
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
        setCapaPreview,
        setFormData,

        //Manipuladores
        handleImagemCapaChange,
        handleGaleriaChange,
        handleRemoverImagemGaleria,
        handlePageChange,

        //Métodos
        handleNovoEvento,
        handleEditarEvento,
        handleSubmit,
        handleDeleteClick,
        handleConfirmDelete,
        handleCancelDelete,
        getStatusColor,
        setImagemEditando,
        setFormOpen,
        handleChange,
        handleDateChange,
        handleTimeChange
    }
};

export default useEventos;