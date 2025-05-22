import React from 'react';
import{
    Box, Typography, Grid, Paper, Button, List, ListItem, ListItemText,
    ListItemIcon, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Divider, Chip, MenuItem, InputAdornment, Avatar, FormControl, InputLabel, Select,
    CircularProgress,
    Pagination,
} from '@mui/material';
import{ PhotoCamera, Visibility, VisibilityOff, Refresh, Person, Add, Edit, Delete, Block, CheckCircle } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import ptBR from 'date-fns/locale/pt-BR';
import useUsuarios from '../../../hook/dashboard/useUsuarios';
import styled from 'styled-components';

const Usuarios = ({ mostrarMensagem }) => {
    const{
        openDialog,
        selectedUsuario,
        formData,
        showPassword,
        previewUrl,
        camposDesabilitados,
        pagina,
        totalPaginas,
        loading,
        usuariosPaginados,

        
        //Manipuladores
        handleChange,
        handleDateChange,
        handleFotoChange,
        handleGeneratePassword,
        handleCepChange,
        handlePageChange,

        //Métodos
        handleOpenDialog,
        handleCloseDialog,
        handleSubmit,
        handleDeleteUsuario,
        handleToggleStatus,
        setShowPassword
    } = useUsuarios(mostrarMensagem);

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
                <Typography variant="h6">Usuários</Typography>
                <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={() => handleOpenDialog()}
                >
                Novo Usuário
                </Button>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                <Paper>
                    <List>
                    {usuariosPaginados.map((usuario) => (
                        <React.Fragment key={usuario.id}>
                        <ListItem
                            secondaryAction={
                            <Box>
                                <IconButton
                                edge="end"
                                aria-label="status"
                                onClick={() =>
                                    handleToggleStatus(
                                    usuario.id,
                                    usuario.status === 'ativo' ? 'inativo' : 'ativo'
                                    )
                                }
                                >
                                {usuario.status === 'ativo' ? (
                                    <CheckCircle color="success" />
                                ) : (
                                    <Block color="error" />
                                )}
                                </IconButton>
                                <IconButton
                                edge="end"
                                aria-label="edit"
                                onClick={() => handleOpenDialog(usuario)}
                                >
                                <Edit />
                                </IconButton>
                                <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => handleDeleteUsuario(usuario.id)}
                                >
                                <Delete />
                                </IconButton>
                            </Box>
                            }
                        >
                            <ListItemIcon>
                            <Person />
                            </ListItemIcon>
                            <ListItemText
                            primary={usuario.nome}
                            secondary={
                                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                                <Typography variant="body2">
                                    Email: {usuario.email}
                                </Typography>
                                <Chip
                                    label={usuario.nivelAcesso}
                                    color={usuario.nivelAcesso === 'admin' ? 'error' :    // vermelho
                                        usuario.nivelAcesso === 'organizador' ? 'warning' :  // amarelo
                                        usuario.nivelAcesso === 'usuario' ? 'success' :   // verde
                                        'default'}
                                    size="small"
                                />
                                <Chip
                                    label={usuario.status}
                                    color={usuario.status === 'ativo' ? 'success' : 'error'}
                                    size="small"
                                />
                                </Box>
                            }
                            />
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
                </Grid>
            </Grid>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                {selectedUsuario ? 'Editar Usuário' : 'Novo Usuário'}
                </DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <Grid container spacing={3}>
                        {/* Foto do Usuário */}
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <Box sx={{ position: 'relative', display: 'inline-block' }}>
                            <Avatar
                                src={previewUrl || (selectedUsuario?.fotoUrl) || ''}
                                sx={{ width: 100, height: 100, mb: 2 }}
                            />
                            <IconButton
                                component="label"
                                sx={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                backgroundColor: 'primary.main',
                                '&:hover': { backgroundColor: 'primary.dark' },
                                }}
                            >
                                <PhotoCamera />
                                <VisuallyHiddenInput type="file" name="foto" onChange={handleFotoChange} accept="image/*" />
                            </IconButton>
                            </Box>
                        </Grid>

                        {/* Informações Básicas */}
                        <Grid item xs={12} md={6}>
                            <TextField
                            fullWidth
                            label="Nome Completo"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                            fullWidth
                            label="E-mail"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                            fullWidth
                            label="Senha"
                            name="senha"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.senha}
                            onChange={handleChange}
                            onFocus={handleGeneratePassword}
                            required
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                    <IconButton onClick={handleGeneratePassword}>
                                    <Refresh />
                                    </IconButton>
                                </InputAdornment>
                                ),
                            }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Tipo de Documento</InputLabel>
                                <Select
                                    name="tipoDocumento"
                                    value={formData.tipoDocumento}
                                    onChange={handleChange}
                                    label="Tipo de Documento"
                                >
                                    <MenuItem value="CPF">CPF</MenuItem>
                                    <MenuItem value="CNPJ">CNPJ</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid> 

                        <Grid item xs={12} md={6}>
                            <TextField
                            fullWidth
                            label="Documento"
                            name="documento"
                            value={formData.documento}
                            onChange={handleChange}
                            required
                            inputProps={{
                                maxLength: formData.tipoDocumento === 'CPF' ? 14 : 18,
                            }}
                            helperText={
                                formData.tipoDocumento === 'CPF' 
                                ? 'Formato: XXX.XXX.XXX-XX' 
                                : formData.tipoDocumento === 'CNPJ' 
                                    ? 'Formato: XX.XXX.XXX/XXXX-XX'
                                    : ''
                            }
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required>
                            <InputLabel>Nível de Acesso</InputLabel>
                            <Select
                                name="nivelAcesso"
                                value={formData.nivelAcesso}
                                onChange={handleChange}
                                label="Nível de Acesso"
                            >
                                <MenuItem value="admin">Administrador</MenuItem>
                                <MenuItem value="organizador">Organizador</MenuItem>
                                <MenuItem value="usuario">Usuário</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                            <DatePicker
                                label="Data de Nascimento"
                                value={formData.dataNascimento}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} fullWidth required />}
                            />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                            fullWidth
                            label="Telefone"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                            required
                            inputProps={{ maxLength: 15 }}
                            helperText="Formato: (XX)XXXXX-XXXX"
                            />
                        </Grid>

                        {/* Endereço */}
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                            Endereço
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <TextField
                            fullWidth
                            label="CEP"
                            name="endereco.cep"
                            value={formData.endereco.cep}
                            onChange={handleCepChange}
                            required
                            inputProps={{ maxLength: 9 }}
                            helperText="Digite o CEP para preenchimento automático"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                            fullWidth
                            label="Rua"
                            name="endereco.rua"
                            value={formData.endereco.rua}
                            onChange={handleChange}
                            required
                            disabled={camposDesabilitados.rua}
                            />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <TextField
                            fullWidth
                            label="Número"
                            name="endereco.numero"
                            value={formData.endereco.numero}
                            onChange={handleChange}
                            required
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                            fullWidth
                            label="Bairro"
                            name="endereco.bairro"
                            value={formData.endereco.bairro}
                            onChange={handleChange}
                            required
                            disabled={camposDesabilitados.bairro}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                            fullWidth
                            label="Complemento"
                            name="endereco.complemento"
                            value={formData.endereco.complemento}
                            onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                            fullWidth
                            label="Cidade"
                            name="endereco.cidade"
                            value={formData.endereco.cidade}
                            onChange={handleChange}
                            required
                            disabled={camposDesabilitados.cidade}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                            fullWidth
                            label="Estado"
                            name="endereco.estado"
                            value={formData.endereco.estado}
                            onChange={handleChange}
                            required
                            inputProps={{ maxLength: 2 }}
                            helperText="Digite a sigla do estado (ex: SP)"
                            disabled={camposDesabilitados.estado}
                            />
                        </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                <Button variant='outlined'  color='inherit' onClick={handleCloseDialog}>Cancelar</Button>
                <Button disabled={loading} onClick={handleSubmit} variant="contained" color="primary">
                    {loading ? 'Salvando...' : 'Salvar'}
                </Button>
                </DialogActions>
            </Dialog>
        </Box>
  );
};

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default Usuarios;