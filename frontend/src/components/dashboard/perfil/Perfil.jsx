import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  IconButton,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';
import { PhotoCamera, Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { useAuth } from '../../../hook/auth/useAuth';
import styled from 'styled-components';

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

const Perfil = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nome: user?.nome || '',
    email: user?.email || '',
    telefone: user?.telefone || '',
    documento: user?.documento || '',
    endereco: {
      cep: user?.endereco?.cep || '',
      rua: user?.endereco?.rua || '',
      numero: user?.endereco?.numero || '',
      bairro: user?.endereco?.bairro || '',
      cidade: user?.endereco?.cidade || '',
      estado: user?.endereco?.estado || '',
    },
  });
  const [previewUrl, setPreviewUrl] = useState(user?.foto || '');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        ...formData,
        foto: previewUrl
      });
      setSnackbar({
        open: true,
        message: 'Perfil atualizado com sucesso!',
        severity: 'success'
      });
      setIsEditing(false);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erro ao atualizar perfil',
        severity: 'error', error
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      nome: user?.nome || '',
      email: user?.email || '',
      telefone: user?.telefone || '',
      documento: user?.documento || '',
      endereco: {
        cep: user?.endereco?.cep || '',
        rua: user?.endereco?.rua || '',
        numero: user?.endereco?.numero || '',
        bairro: user?.endereco?.bairro || '',
        cidade: user?.endereco?.cidade || '',
        estado: user?.endereco?.estado || '',
      },
    });
    setPreviewUrl(user?.foto || '');
    setIsEditing(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Meu Perfil
          </Typography>
          {!isEditing ? (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => setIsEditing(true)}
            >
              Editar Perfil
            </Button>
          ) : (
            <Box>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
                sx={{ mr: 1 }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSubmit}
              >
                Salvar
              </Button>
            </Box>
          )}
        </Box>
        <Divider sx={{ mb: 3 }} />

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Foto do Perfil */}
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Avatar
                  src={previewUrl}
                  sx={{ width: 100, height: 100, mb: 2 }}
                />
                {isEditing && (
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
                    <VisuallyHiddenInput type="file" onChange={handleFotoChange} accept="image/*" />
                  </IconButton>
                )}
              </Box>
            </Grid>

            {/* Informações Pessoais */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                disabled={!isEditing}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={!isEditing}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Documento"
                name="documento"
                value={formData.documento}
                onChange={handleChange}
                required
                disabled={!isEditing}
              />
            </Grid>

            {/* Endereço */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Endereço
              </Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="CEP"
                name="endereco.cep"
                value={formData.endereco.cep}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>

            <Grid item xs={12} md={7}>
              <TextField
                fullWidth
                label="Rua"
                name="endereco.rua"
                value={formData.endereco.rua}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Número"
                name="endereco.numero"
                value={formData.endereco.numero}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Bairro"
                name="endereco.bairro"
                value={formData.endereco.bairro}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Cidade"
                name="endereco.cidade"
                value={formData.endereco.cidade}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Estado"
                name="endereco.estado"
                value={formData.endereco.estado}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Perfil; 