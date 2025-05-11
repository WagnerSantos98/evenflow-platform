import React from 'react';
import{
    Box, Typography, Grid, Paper, Button, List, ListItem, ListItemText,
    ListItemIcon, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Divider, Chip, MenuItem,Switch
} from '@mui/material';
import{ Person, Add, Edit, Delete, Block, CheckCircle } from '@mui/icons-material';
import useUsuarios from '../../../hook/dashboard/useUsuarios';

const Usuarios = ({ mostrarMensagem }) => {
    const{
        usuarios,
        openDialog,
        selectedUsuario,
        formData,
        handleOpenDialog,
        handleCloseDialog,
        handleInputChange,
        handleSubmit,
        handleDeleteUsuario,
        handleToggleStatus
    } = useUsuarios(mostrarMensagem);

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
                    {usuarios.map((usuario) => (
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
                                    label={usuario.tipo}
                                    color={usuario.tipo === 'admin' ? 'primary' : 'default'}
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
                </Grid>
            </Grid>

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                {selectedUsuario ? 'Editar Usuário' : 'Novo Usuário'}
                </DialogTitle>
                <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    <TextField
                    name="nome"
                    label="Nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    />
                    <TextField
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    />
                    <TextField
                    name="tipo"
                    label="Tipo"
                    select
                    value={formData.tipo}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    >
                    <MenuItem value="consumidor">Consumidor</MenuItem>
                    <MenuItem value="admin">Administrador</MenuItem>
                    </TextField>
                    <TextField
                    name="status"
                    label="Status"
                    select
                    value={formData.status}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    >
                    <MenuItem value="ativo">Ativo</MenuItem>
                    <MenuItem value="inativo">Inativo</MenuItem>
                    </TextField>
                </Box>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseDialog}>Cancelar</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    {selectedUsuario ? 'Atualizar' : 'Criar'}
                </Button>
                </DialogActions>
            </Dialog>
            </Box>
    );
};

export default Usuarios;