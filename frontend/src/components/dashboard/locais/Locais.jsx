import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import dashboardService from '../../../services/dashboard/dashboardService';
import { formatarTelefone, formatarDocumento } from '../../../utils/fomatters';
import { buscarCep } from '../../../utils/helpers';

const Locais = ({ mostrarMensagem }) => {
  const [locais, setLocais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [localSelecionado, setLocalSelecionado] = useState(null);
  const [camposDesabilitados, setCamposDesabilitados] = useState({
    rua: false,
    bairro: false,
    cidade: false,
    estado: false
  });
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipoDocumento: 'cnpj',
    documento: '',
    endereco: {
      cep: '',
      rua: '',
      bairro: '',
      numero: '',
      cidade: '',
      estado: '',
    },
    capacidade: '',
    descricao: '',
  });

  useEffect(() => {
    carregarLocais();
  }, []);

  const carregarLocais = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.locais.listarLocais();
      setLocais(Array.isArray(response.locais) ? response.locais : []);
    } catch (error) {
      console.error('Erro ao carregar locais:', error);
      mostrarMensagem('Erro ao carregar locais. Por favor, tente novamente.', 'error');
      setLocais([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (local = null) => {
    if (local) {
      setLocalSelecionado(local);
      setFormData({
        nome: local.nome || '',
        email: local.email || '',
        telefone: local.telefone || '',
        tipoDocumento: local.tipoDocumento || 'cnpj',
        documento: local.documento || '',
        endereco: {
          cep: local.endereco?.cep || '',
          rua: local.endereco?.rua || '',
          bairro: local.endereco?.bairro || '',
          numero: local.endereco?.numero || '',
          cidade: local.endereco?.cidade || '',
          estado: local.endereco?.estado || ''
        },
        capacidade: local.capacidade || '',
        descricao: local.descricao || ''
      });
    } else {
      setLocalSelecionado(null);
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        tipoDocumento: 'cnpj',
        documento: '',
        endereco: {
          cep: '',
          rua: '',
          bairro: '',
          numero: '',
          cidade: '',
          estado: ''
        },
        capacidade: '',
        descricao: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setLocalSelecionado(null);
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      tipoDocumento: 'cnpj',
      documento: '',
      endereco: {
        cep: '',
        rua: '',
        bairro: '',
        numero: '',
        cidade: '',
        estado: '',
      },
      capacidade: '',
      descricao: '',
    });
    setCamposDesabilitados({
      rua: false,
      bairro: false,
      cidade: false,
      estado: false
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'telefone') {
      const telefoneFormatado = formatarTelefone(value);
      setFormData(prev => ({
        ...prev,
        telefone: telefoneFormatado
      }));
    } else if (name === 'documento') {
      const documentoFormatado = formatarDocumento(value, 'CNPJ');
      setFormData(prev => ({
        ...prev,
        documento: documentoFormatado
      }));
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCepChange = async (e) => {
    const { value } = e.target;
    const cepFormatado = value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2');
    
    setFormData(prev => ({
      ...prev,
      endereco: { ...prev.endereco, cep: cepFormatado },
    }));

    if (value.replace(/\D/g, '').length === 8) {
      await buscarCep(value, setFormData, setCamposDesabilitados);
    }
  };

  const handleSubmit = async () => {
    try {
      const dadosParaEnviar = {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        tipoDocumento: formData.tipoDocumento,
        documento: formData.documento,
        endereco: {
          cep: formData.endereco.cep,
          rua: formData.endereco.rua,
          bairro: formData.endereco.bairro,
          numero: formData.endereco.numero,
          cidade: formData.endereco.cidade,
          estado: formData.endereco.estado
        },
        capacidade: formData.capacidade,
        descricao: formData.descricao
      };

      if (localSelecionado?.id) {
        await dashboardService.locais.atualizarLocal(localSelecionado.id, dadosParaEnviar);
        mostrarMensagem('Local atualizado com sucesso!', 'success');
      } else {
        await dashboardService.locais.criarLocal(dadosParaEnviar);
        mostrarMensagem('Local criado com sucesso!', 'success');
      }
      await carregarLocais();
      handleCloseDialog();
    } catch (error) {
      console.error('Erro ao salvar local:', error);
      mostrarMensagem(
        `Erro ao ${localSelecionado?.id ? 'atualizar' : 'criar'} local. Por favor, tente novamente.`,
        'error'
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await dashboardService.locais.deletarLocal(id);
      await carregarLocais();
      mostrarMensagem('Local excluído com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao deletar local:', error);
      mostrarMensagem('Erro ao excluir local. Por favor, tente novamente.', 'error');
    }
  };

  const formatarEndereco = (endereco) => {
    return `${endereco.rua}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}`;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Locais
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Novo Local
        </Button>
      </Box>

      {locais.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="textSecondary">
            Nenhum local cadastrado
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Endereço</TableCell>
                <TableCell>Capacidade</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locais.map((local) => (
                <TableRow key={local.id}>
                  <TableCell>{local.nome}</TableCell>
                  <TableCell>{local.email}</TableCell>
                  <TableCell>{local.telefone}</TableCell>
                  <TableCell>{formatarEndereco(local.endereco)}</TableCell>
                  <TableCell>{local.capacidade} pessoas</TableCell>
                  <TableCell>
                    <Chip 
                      label={local.status === 'ativo' ? 'Ativo' : 'Inativo'} 
                      color={local.status === 'ativo' ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <IconButton 
                        size="small" 
                        color="primary"
                        onClick={() => handleOpenDialog(local)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleDelete(local.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {localSelecionado ? 'Editar Local' : 'Novo Local'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="nome"
                  label="Nome do Local"
                  fullWidth
                  required
                  value={formData.nome}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  name="telefone"
                  label="Telefone"
                  fullWidth
                  required
                  value={formData.telefone}
                  onChange={handleInputChange}
                  inputProps={{ maxLength: 15 }}
                  helperText="Formato: (XX)XXXXX-XXXX"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  name="documento"
                  label="CNPJ"
                  fullWidth
                  required
                  value={formData.documento}
                  onChange={handleInputChange}
                  inputProps={{ maxLength: 18 }}
                  helperText="Formato: XX.XXX.XXX/XXXX-XX"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  name="capacidade"
                  label="Capacidade"
                  type="number"
                  fullWidth
                  required
                  value={formData.capacidade}
                  onChange={handleInputChange}
                  inputProps={{ min: 1 }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Endereço
                </Typography>
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  name="endereco.cep"
                  label="CEP"
                  fullWidth
                  required
                  value={formData.endereco.cep}
                  onChange={handleCepChange}
                  inputProps={{ maxLength: 9 }}
                  helperText="Digite o CEP para preenchimento automático"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  name="endereco.rua"
                  label="Rua"
                  fullWidth
                  required
                  value={formData.endereco.rua}
                  onChange={handleInputChange}
                  disabled={camposDesabilitados.rua}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  name="endereco.numero"
                  label="Número"
                  fullWidth
                  required
                  value={formData.endereco.numero}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  name="endereco.bairro"
                  label="Bairro"
                  fullWidth
                  required
                  value={formData.endereco.bairro}
                  onChange={handleInputChange}
                  disabled={camposDesabilitados.bairro}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  name="endereco.cidade"
                  label="Cidade"
                  fullWidth
                  required
                  value={formData.endereco.cidade}
                  onChange={handleInputChange}
                  disabled={camposDesabilitados.cidade}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  name="endereco.estado"
                  label="Estado"
                  fullWidth
                  required
                  value={formData.endereco.estado}
                  onChange={handleInputChange}
                  disabled={camposDesabilitados.estado}
                  inputProps={{ maxLength: 2 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="descricao"
                  label="Descrição"
                  multiline
                  rows={4}
                  fullWidth
                  value={formData.descricao}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Locais; 