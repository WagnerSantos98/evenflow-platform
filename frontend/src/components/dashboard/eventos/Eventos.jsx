import React from 'react';
import{
    Box, Paper, Typography, Chip, IconButton, Pagination, CircularProgress, Button,
    List, ListItem, ListItemText, ListItemSecondaryAction, Divider, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, Grid, MenuItem, Autocomplete
} from '@mui/material';
import{ Edit, Delete, LocationOn, CalendarToday, AttachMoney, People, CloudUpload, Add } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { formatarData, formatarMoeda } from '../../../utils/fomatters';
import ptBR from 'date-fns/locale/pt-BR';
import CustomSnackbar from '../../common/CustomSnackbar';
import ConfirmDialog from '../../common/ConfirmDialog';
import useEventos from '../../../hook/dashboard/useEventos';

const Eventos = () => {
    const{
        eventos,
        setFormData,
        pagina,
        totalPaginas,
        loading,
        formOpen,
        eventoSelecionado,
        deleteDialogOpen,
        formData,
        capaPreview,
        galeriaPreviews,
        snackbar,
        hideSnackbar,

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
    } = useEventos([]);


    if(loading){
        return(
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress/>
            </Box>
        );
    }

    return(
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Eventos</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNovoEvento}
                >
                    Novo Evento
                </Button>
            </Box>

            <Paper>
                <List>
                    {eventosPaginados.map((evento) => (
                        <React.Fragment key={evento.id}>
                            <ListItem>
                                <ListItemText
                                    primary={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <Typography variant="h6">{evento.nome}</Typography>
                                            <Chip
                                                label={evento.status}
                                                color={getStatusColor(evento.status)}
                                                size="small"
                                            />
                                        </Box>
                                    }
                                    secondary={
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                {evento.descricao}
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <CalendarToday sx={{ mr: 1, fontSize: 16 }} />
                                                    <Typography variant="body2">
                                                        {formatarData(evento.data)}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <LocationOn sx={{ mr: 1, fontSize: 16 }} />
                                                    <Typography variant="body2">
                                                        {evento.local.nome}, {evento.local.endereco.cidade}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <AttachMoney sx={{ mr: 1, fontSize: 16 }} />
                                                    <Typography variant="body2">
                                                        {formatarMoeda(evento.precoIngresso)}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <People sx={{ mr: 1, fontSize: 16 }} />
                                                    <Typography variant="body2">
                                                        {evento.ingressosDisponiveis} ingressos
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        onClick={() => handleEditarEvento(evento)}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        onClick={() => handleDeleteClick(evento)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Paper>

            {totalPaginas > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                        count={totalPaginas}
                        page={pagina}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Box>
            )}

            {/* Formulário de Evento */}
            <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    {eventoSelecionado ? 'Editar Evento' : 'Novo Evento'}
                </DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <Grid container spacing={3}>
                            {/* Imagem de Capa */}
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Imagem de Capa
                                </Typography>
                                {capaPreview ? (
                                    <ImagePreview>
                                        <img src={capaPreview} alt="Capa do evento" />
                                        <Box className="edit-overlay">
                                            <IconButton
                                                color="primary"
                                                onClick={() => document.getElementById('imagemCapa').click()}
                                            >
                                                <Edit />
                                            </IconButton>
                                        </Box>
                                    </ImagePreview>
                                ) : (
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        fullWidth
                                        startIcon={<CloudUpload />}
                                    >
                                        Upload da Imagem de Capa
                                        <input
                                            id="imagemCapa"
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={handleImagemCapaChange}
                                        />
                                    </Button>
                                )}
                            </Grid>

                            {/* Campos do Formulário */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Nome do Evento"
                                    value={formData.nome}
                                    onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Descrição"
                                    value={formData.descricao}
                                    onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
                                    required
                                    multiline
                                    rows={4}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                                    <DatePicker
                                        label="Data do Evento"
                                        value={formData.data}
                                        onChange={(newValue) => setFormData(prev => ({ ...prev, data: newValue }))}
                                        renderInput={(params) => <TextField {...params} fullWidth required />}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Preço do Ingresso"
                                    type="number"
                                    value={formData.precoIngresso}
                                    onChange={(e) => setFormData(prev => ({ ...prev, precoIngresso: e.target.value }))}
                                    required
                                    InputProps={{
                                        startAdornment: <AttachMoney />
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Ingressos Disponíveis"
                                    type="number"
                                    value={formData.ingressosDisponiveis}
                                    onChange={(e) => setFormData(prev => ({ ...prev, ingressosDisponiveis: e.target.value }))}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Tipo de Evento"
                                    value={formData.tipoEvento}
                                    onChange={(e) => setFormData(prev => ({ ...prev, tipoEvento: e.target.value }))}
                                    required
                                >
                                    {tiposEvento.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Categoria"
                                    value={formData.categoria}
                                    onChange={(e) => setFormData(prev => ({ ...prev, categoria: e.target.value }))}
                                    required
                                >
                                    {categorias.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Classificação Etária"
                                    value={formData.classificacaoEtaria}
                                    onChange={(e) => setFormData(prev => ({ ...prev, classificacaoEtaria: e.target.value }))}
                                    required
                                >
                                    {classificacoesEtarias.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Status"
                                    value={formData.status}
                                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                                    required
                                >
                                    {status.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <Autocomplete
                                    options={locais}
                                    getOptionLabel={(option) => `${option.nome} - ${option.endereco.cidade}`}
                                    value={locais.find(local => local.id === formData.localId) || null}
                                    onChange={(_, newValue) => setFormData(prev => ({ ...prev, localId: newValue?.id || '' }))}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Local"
                                            required
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Galeria de Imagens */}
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Galeria de Imagens
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                                    {galeriaPreviews && galeriaPreviews.length > 0 ? (
                                        galeriaPreviews.map((preview, index) => (
                                            <GalleryImage key={index}>
                                                <img src={preview} alt={`Imagem ${index + 1}`} />
                                                <Box className="edit-overlay">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => {
                                                            document.getElementById('galeria').click();
                                                            setImagemEditando(index);
                                                        }}
                                                    >
                                                        <Edit />
                                                    </IconButton>
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => handleRemoverImagemGaleria(index)}
                                                        sx={{ ml: 1 }}
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </Box>
                                            </GalleryImage>
                                        ))
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">
                                            Nenhuma imagem na galeria
                                        </Typography>
                                    )}
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        sx={{ width: 100, height: 100 }}
                                        startIcon={<Add />}
                                    >
                                        Adicionar
                                        <input
                                            id="galeria"
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            multiple
                                            onChange={handleGaleriaChange}
                                        />
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setFormOpen(false)}>Cancelar</Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        onClick={handleSubmit}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Salvar'}
                    </Button>
                </DialogActions>
            </Dialog>

            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={hideSnackbar}
            />

            <ConfirmDialog
                open={deleteDialogOpen}
                title={MESSAGES.EVENTO.TITULO_EXCLUSAO}
                message={MESSAGES.EVENTO.CONFIRMAR_EXCLUSAO.replace('{nome}', eventoParaDeletar?.nome)}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                confirmText={MESSAGES.EVENTO.BOTAO_EXCLUIR}
                cancelText={MESSAGES.EVENTO.BOTAO_CANCELAR}
                confirmColor="error"
                icon="error"
            />
        </Box>
    );
};

export default Eventos;