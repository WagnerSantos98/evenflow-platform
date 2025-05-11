import React, { useState, useEffect } from 'react';
import{
    Box,
    Typography,
    Grid,
    Paper,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Divider,
    Chip,
    MenuItem
} from '@mui/material';
import{
    Event,
    Add,
    Edit,
    Delete,
    Visibility
} from '@mui/icons-material';
import dashboardService from '../../../services/dashboard/dashboardService';

const Eventos = ({ mostrarMensagem }) => {
    const [eventos, setEventos] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedEvento, setSelectedEvento] = useState(null);
    const [formData, setFormData] = useState({
       titulo: '',
       data: '',
       local: '',
       descricao: '',
       preco: '',
       quantidadeIngressos: '',
       categoria: '',
       status: 'rascunho' 
    });

    useEffect(() => {
        carregarEventos();
    }, []);

    //Função de carregamento de eventos
    const carregarEventos = async (periodo, dataInico, dataFim) => {
        try{
            const data = await dashboardService.eventos.listarEventos(periodo, dataInico, dataFim);
            setEventos(data);
        }catch(error){
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
            setFormData({
                titulo: '',
                data: '',
                local: '',
                descricao: '',
                preco: '',
                quantidadeIngressos: '',
                categoria: '',
                status: 'rascunho' 
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedEvento(null);
        setFormData({
            titulo: '',
            data: '',
            local: '',
            descricao: '',
            preco: '',
            quantidadeIngressos: '',
            categoria: '',
            status: 'rascunho' 
        });
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
                mostrarMensagem('Evenot cluído com sucesso!');
                carregarEventos();
            }catch(error){
                mostrarMensagem('Erro ao ecluir evento', error);
            }
        }
    };

    const formatarData = (data) => {
        return new Date(data).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatarMoeda = (valor) => {
        return new Intl.Numberformat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valor);
    };

    return(
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Eventos</Typography>
                <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={() => handleOpenDialog()}
                >
                Novo Evento
                </Button>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                <Paper>
                    <List>
                    {eventos.map((evento) => (
                        <React.Fragment key={evento.id}>
                        <ListItem
                            secondaryAction={
                            <Box>
                                <IconButton
                                edge="end"
                                aria-label="view"
                                onClick={() => window.open(`/eventos/${evento.id}`, '_blank')}
                                >
                                <Visibility />
                                </IconButton>
                                <IconButton
                                edge="end"
                                aria-label="edit"
                                onClick={() => handleOpenDialog(evento)}
                                >
                                <Edit />
                                </IconButton>
                                <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => handleDeleteEvento(evento.id)}
                                >
                                <Delete />
                                </IconButton>
                            </Box>
                            }
                        >
                            <ListItemIcon>
                            <Event />
                            </ListItemIcon>
                            <ListItemText
                            primary={evento.titulo}
                            secondary={
                                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                                <Chip
                                    label={evento.status}
                                    color={
                                    evento.status === 'ativo'
                                        ? 'success'
                                        : evento.status === 'rascunho'
                                        ? 'warning'
                                        : 'error'
                                    }
                                    size="small"
                                />
                                <Typography variant="body2">
                                    Data: {formatarData(evento.data)}
                                </Typography>
                                <Typography variant="body2">
                                    Local: {evento.local}
                                </Typography>
                                <Typography variant="body2">
                                    Preço: {formatarMoeda(evento.preco)}
                                </Typography>
                                <Typography variant="body2">
                                    Ingressos: {evento.ingressosVendidos}/{evento.quantidadeIngressos}
                                </Typography>
                                </Box>
                            }
                            />
                        </ListItem>
                        <Divider />
                        </React.Fragment>
                    ))}
                    </List>
                </Paper>
                </Grid>
            </Grid>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                {selectedEvento ? 'Editar Evento' : 'Novo Evento'}
                </DialogTitle>
                <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    <TextField
                    name="titulo"
                    label="Título"
                    value={formData.titulo}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    />
                    <TextField
                    name="data"
                    label="Data"
                    type="datetime-local"
                    value={formData.data}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                    name="local"
                    label="Local"
                    value={formData.local}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    />
                    <TextField
                    name="descricao"
                    label="Descrição"
                    value={formData.descricao}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    rows={4}
                    />
                    <TextField
                    name="preco"
                    label="Preço"
                    type="number"
                    value={formData.preco}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    />
                    <TextField
                    name="quantidadeIngressos"
                    label="Quantidade de Ingressos"
                    type="number"
                    value={formData.quantidadeIngressos}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    />
                    <TextField
                    name="categoria"
                    label="Categoria"
                    value={formData.categoria}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    />
                    <TextField
                    name="status"
                    label="Status"
                    select
                    value={formData.status}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    >
                    <MenuItem value="rascunho">Rascunho</MenuItem>
                    <MenuItem value="ativo">Ativo</MenuItem>
                    <MenuItem value="cancelado">Cancelado</MenuItem>
                    </TextField>
                </Box>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseDialog}>Cancelar</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    {selectedEvento ? 'Atualizar' : 'Criar'}
                </Button>
                </DialogActions>
            </Dialog>
            </Box>
    );
};