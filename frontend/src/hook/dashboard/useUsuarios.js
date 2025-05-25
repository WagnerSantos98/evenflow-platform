import { useState, useEffect } from 'react';
import dashboardService from '../../services/dashboard/dashboardService';
import { formatarTelefone, formatarDocumento } from '../../utils/fomatters';
import { buscarCep } from '../../utils/helpers';

const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [usuarioParaDeletar, setUsuarioParaDeletar] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipoDocumento: 'CPF',
    documento: '',
    nivelAcesso: 'usuario',
    dataNascimento: null,
    senha: '',
    endereco: {
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: ''
    }
  });
  const [showPassword, setShowPassword] = useState(false);
  const [camposDesabilitados, setCamposDesabilitados] = useState({
    rua: false,
    bairro: false,
    cidade: false,
    estado: false
  });
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const MESSAGES = {
    USUARIO: {
      TITULO_EXCLUSAO: 'Excluir Usuário',
      CONFIRMAR_EXCLUSAO: 'Tem certeza que deseja excluir o usuário {nome}?',
      BOTAO_EXCLUIR: 'Excluir',
      BOTAO_CANCELAR: 'Cancelar',
      SUCESSO_CRIAR: 'Usuário criado com sucesso!',
      SUCESSO_ATUALIZAR: 'Usuário atualizado com sucesso!',
      SUCESSO_EXCLUIR: 'Usuário excluído com sucesso!',
      ERRO_CRIAR: 'Erro ao criar usuário!',
      ERRO_ATUALIZAR: 'Erro ao atualizar usuário!',
      ERRO_EXCLUIR: 'Erro ao excluir usuário!',
      ERRO_CARREGAR: 'Erro ao carregar usuários!'
    }
  };

  const carregarUsuarios = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.usuarios.listarUsuarios();
      if (Array.isArray(response.usuarios)) {
        setUsuarios(response.usuarios);
      } else {
        setUsuarios([]);
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      setUsuarios([]);
      showSnackbar(MESSAGES.USUARIO.ERRO_CARREGAR, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'telefone') {
      const telefoneFormatado = formatarTelefone(value);
      setFormData(prev => ({
        ...prev,
        [name]: telefoneFormatado
      }));
    } else if (name === 'documento') {
      const documentoFormatado = formatarDocumento(value, formData.tipoDocumento);
      setFormData(prev => ({
        ...prev,
        [name]: documentoFormatado
      }));
    } else if (name.startsWith('endereco.')) {
      const campo = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          [campo]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleDateChange = (newValue) => {
    setFormData(prev => ({
      ...prev,
      dataNascimento: newValue
    }));
  };

  const handleCepChange = async (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      try {
        const endereco = await buscarCep(cep);
        setFormData(prev => ({
          ...prev,
          endereco: {
            ...prev.endereco,
            cep: cep,
            rua: endereco.logradouro,
            bairro: endereco.bairro,
            cidade: endereco.localidade,
            estado: endereco.uf
          }
        }));
        setCamposDesabilitados({
          rua: true,
          bairro: true,
          cidade: true,
          estado: true
        });
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        showSnackbar('Erro ao buscar CEP', 'error');
      }
    } else {
      setFormData(prev => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          cep: cep
        }
      }));
    }
  };

  const handleGeneratePassword = () => {
    const senha = Math.random().toString(36).slice(-8);
    setFormData(prev => ({
      ...prev,
      senha
    }));
  };

  const handlePageChange = (event, newPage) => {
    setPagina(newPage);
  };

  const handleOpenDialog = (usuario = null) => {
    if (usuario) {
      setSelectedUsuario(usuario);
      setFormData({
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
        tipoDocumento: usuario.tipoDocumento,
        documento: usuario.documento,
        nivelAcesso: usuario.nivelAcesso,
        dataNascimento: new Date(usuario.dataNascimento),
        senha: '',
        endereco: {
          cep: usuario.endereco.cep,
          rua: usuario.endereco.rua,
          numero: usuario.endereco.numero,
          bairro: usuario.endereco.bairro,
          cidade: usuario.endereco.cidade,
          estado: usuario.endereco.estado
        }
      });
    } else {
      setSelectedUsuario(null);
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        tipoDocumento: 'CPF',
        documento: '',
        nivelAcesso: 'usuario',
        dataNascimento: null,
        senha: '',
        endereco: {
          cep: '',
          rua: '',
          numero: '',
          bairro: '',
          cidade: '',
          estado: ''
        }
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUsuario(null);
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      tipoDocumento: 'CPF',
      documento: '',
      nivelAcesso: 'usuario',
      dataNascimento: null,
      senha: '',
      endereco: {
        cep: '',
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: ''
      }
    });
    setCamposDesabilitados({
      rua: false,
      bairro: false,
      cidade: false,
      estado: false
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      const camposAlterados = {};
      
      // Compara os valores atuais com os valores originais
      Object.keys(formData).forEach(key => {
        if (key === 'endereco') {
          // Verifica se algum campo do endereço foi alterado
          const enderecoAlterado = {};
          let enderecoModificado = false;
          
          Object.keys(formData.endereco).forEach(campo => {
            if (formData.endereco[campo] !== selectedUsuario?.endereco?.[campo]) {
              enderecoAlterado[campo] = formData.endereco[campo];
              enderecoModificado = true;
            }
          });

          if (enderecoModificado) {
            formDataToSend.append('endereco', JSON.stringify(enderecoAlterado));
          }
        } else if (key === 'dataNascimento' && formData[key]) {
          const dataOriginal = selectedUsuario?.dataNascimento ? new Date(selectedUsuario.dataNascimento) : null;
          const dataNova = formData[key];
          
          if (!dataOriginal || dataOriginal.getTime() !== dataNova.getTime()) {
            formDataToSend.append(key, dataNova.toISOString());
          }
        } else if (key === 'senha' && formData[key]) {
          // Só envia a senha se foi alterada
          formDataToSend.append(key, formData[key]);
        } else if (formData[key] !== selectedUsuario?.[key]) {
          // Só envia campos que foram alterados
          formDataToSend.append(key, formData[key]);
        }
      });

      // Adiciona a foto se houver
      if (formData.foto instanceof File) {
        formDataToSend.append('foto', formData.foto);
      }

      // Não envia os campos documento e endereco na atualização
      Object.keys(formDataToSend).forEach(key => {
        if (selectedUsuario && (key === 'documento' || key === 'endereco')) {
          delete formDataToSend[key];
        }
      });

      if (selectedUsuario) {
        // Atualizar usuário existente
        await dashboardService.usuarios.atualizarUsuario(selectedUsuario.id, formDataToSend);
        showSnackbar(MESSAGES.USUARIO.SUCESSO_ATUALIZAR);
      } else {
        // Criar novo usuário
        await dashboardService.usuarios.criarUsuario(formDataToSend);
        showSnackbar(MESSAGES.USUARIO.SUCESSO_CRIAR);
      }

      handleCloseDialog();
      carregarUsuarios();
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      showSnackbar(
        selectedUsuario ? MESSAGES.USUARIO.ERRO_ATUALIZAR : MESSAGES.USUARIO.ERRO_CRIAR,
        'error'
      );
    }
  };

  const handleDeleteClick = (usuario) => {
    setUsuarioParaDeletar(usuario);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await dashboardService.usuarios.excluirUsuario(usuarioParaDeletar.id);
      showSnackbar(MESSAGES.USUARIO.SUCESSO_EXCLUIR, 'success');
      carregarUsuarios();
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      showSnackbar(MESSAGES.USUARIO.ERRO_EXCLUIR, 'error');
    } finally {
      setDeleteDialogOpen(false);
      setUsuarioParaDeletar(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setUsuarioParaDeletar(null);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const hideSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  return {
    usuarios,
    openDialog,
    selectedUsuario,
    usuarioParaDeletar,
    deleteDialogOpen,
    formData,
    showPassword,
    camposDesabilitados,
    pagina,
    totalPaginas,
    loading,
    snackbar,
    MESSAGES,

    //Manipuladores
    handleChange,
    handleDateChange,
    handleCepChange,
    handleGeneratePassword,
    handlePageChange,

    //Métodos
    handleOpenDialog,
    handleCloseDialog,
    handleSubmit,
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    hideSnackbar,
    setShowPassword
  };
};

export default useUsuarios;