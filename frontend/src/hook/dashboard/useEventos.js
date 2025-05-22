import { useState, useEffect } from 'react';
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
    capa: '',
    galeria: []
};

const useEventos = (mostrarMensagem) => {
    const [eventos, setEventos] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(Math.ceil(eventos.length / ITEMS_POR_PAGINA));
    const [loading, setLoading] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [eventoSelecionado, setEventoSelecionado] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [eventoParaDeletar, setEventoParaDeletar] = useState(null);
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [capaPreview, setCapaPreview] = useState('');
    const [galeriaPreviews, setGaleriaPreviews] = useState([]);
    const [imagemEditando, setImagemEditando] = useState(null);

    //Carregar usuários ao iniciar
    useEffect(() => {
        carregarEventos();
    }, []);

    //Funções auxiliares
    const carregarEventos = async () => {
        try{
            const data = await dashboardService.eventos.listarEventosAll();
            setEventos(data.eventos);
        }catch(error){
            mostrarMensagem('Erro ao carregar usuário', error);
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
                    imagemCapa: reader.result
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

    const handleRemoveImagemGaleria = (index) => {
        const newPreviews = galeriaPreviews.filter((_, i) => i !== index);
        setGaleriaPreviews(newPreviews);
        setFormData(prev => ({
            ...prev,
            galeria: newPreviews
        }));
    };

    const handlePageChange = (event, newPage) => {
        setPagina(newPage);
    }
    
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
                mostrarMensagem('Evento atualizado com sucesso!', 'success');
            }else{
                const novoEvento = {
                    ...formData,
                    id: String(eventos.length + 1)
                };
                setEventos(prev => [...prev, novoEvento]);
                setTotalPaginas(Math.ceil((eventos.length + 1) - ITEMS_POR_PAGINA));
                mostrarMensagem('Evento criado com sucesso!', 'success');
            }
            setFormOpen(false);
        }catch(error){
            mostrarMensagem('Erro ao salvar evento', 'error', error);
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
        setCapaPreview(evento.capa || '');
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
        mostrarMensagem('Evento excluído com sucesso!', 'success');
        setDeleteDialogOpen(false);
        setEventoParaDeletar(null);
    }

    return{
        eventos,
        pagina,
        totalPaginas,
        loading,
        formOpen,
        eventoSelecionado,
        deleteDialogOpen,
        formData,
        capaPreview,
        galeriaPreviews,
        imagemEditando,

        //Manipuladores
        handleImagemCapaChange,
        handleGaleriaChange,
        handleRemoveImagemGaleria,
        handlePageChange,

        //Métodos
        handleNovoEvento,
        handleSubmit,
        handleEditarEvento,
        handleDeleteClick,
        handleConfirmDelete

    }
};

export default useEventos;