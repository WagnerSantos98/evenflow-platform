import { useState, useEffect } from 'react';
import dashboardService from '../../services/tests/dashboardService'; //Dados mockados

//Constantes inciais
const INITIAL_FORM_DATA = {
    titulo: '',
    data: '',
    local: '',
    descricao: '',
    preco: '',
    quantidadeIngressos: '',
    categoria: '',
    status: 'rascunho'
};

const useEventos = (mostrarMensagem) => {
    const [eventos, setEventos] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedEvento, setSelectedEvento] = useState(null);
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);

    useEffect(() => {
        carregarEventos();
    }, []);

    const carregarEventos = async (periodo, dataInico, dataFim) => {
        try {
            const data = await dashboardService.eventos.listarEventos(periodo, dataInico, dataFim);
            setEventos(data);
        } catch (error) {
            mostrarMensagem('Erro ao carregar eventos', error);
        }
    };

    const handleOpenDialog = (evento = null) => {
        if(evento){
            setSelectedEvento(evento);
            setFormData({
                titulo: evento.titulo,
                data: evento.data,
                local: evento.local,
                descricao: evento.descricao,
                quantidadeIngressos: evento.quantidadeIngressos,
                categoria: evento.categoria,
                status: evento.status
            });
        }else{
            setSelectedEvento(null);
            setFormData(INITIAL_FORM_DATA);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedEvento(null);
        setFormData(INITIAL_FORM_DATA);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try{
            if(selectedEvento){
                await dashboardService.eventos.criarEvento(formData);
                mostrarMensagem('Evento criado com sucesso!');
            }else{
                await dashboardService.eventos.atualizarEvento(selectedEvento.id, formData);
                mostrarMensagem('Evento atualizado com sucesso!');
            }
            handleCloseDialog();
            carregarEventos();
        }catch(error){
            mostrarMensagem('Erro ao salvar evento', error);
        }
    };

    const handleDeleteEvento = async (id) => {
        if(window.confirm('Tem certeza que deseja excluir este evento?')){
            try{
                await dashboardService.eventos.excluirEvento(id);
                mostrarMensagem('Evento excluído com sucesso!');
                carregarEventos();
            }catch(error){
                mostrarMensagem('Erro ao excluir evento', error);
            }
        }
    };

    return{
        eventos,
        openDialog,
        selectedEvento,
        formData,
        handleOpenDialog,
        handleCloseDialog,
        handleInputChange,
        handleSubmit,
        handleDeleteEvento
    }
};

export default useEventos;