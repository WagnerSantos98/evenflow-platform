import { useState, useEffect } from 'react';
import dashboardService from '../../services/tests/dashboardService'; //Dados mockados

//Constantes inciais
const INITIAL_FORM_DATA = {
    nome: '',
    email: '',
    nivelAcesso: 'admin',
    status: 'ativo'
};

const useUsuarios = (mostrarMensagem) => {
    const [usuarios, setUsuarios] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUsuario, setSelectedUsuario] = useState(null);
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);

    useEffect(() => {
        carregarUsuarios();
    }, []);

    //Listar usuários
    const carregarUsuarios = async () => {
        try{
            const data = await dashboardService.usuarios.listarUsuarios();
            setUsuarios(data);
        }catch(error){
            mostrarMensagem('Erro ao carregar usuário', error);
        }
    };

    //Abrir caixa de diálogo
    const handleOpenDialog = (usuario = null) => {
        if(usuario){
            setSelectedUsuario(usuario);
            setFormData({
                nome: usuario.nome,
                email: usuario.email,
                nivelAcesso: usuario.nivelAcesso,
                status: usuario.status
            });
        }else{
            setSelectedUsuario(null);
            setFormData(INITIAL_FORM_DATA);
        }
        setOpenDialog(true);
    };

    //Fechar caixa de diálogo
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedUsuario(null);
        setFormData(INITIAL_FORM_DATA);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    //Envio de cadastro e atualização
    const handleSubmit = async () => {
        try{ 
            if(selectedUsuario){
                await dashboardService.usuarios.listarUsuarios(selectedUsuario.id, formData);
                mostrarMensagem('Usuário atualizado com sucesso!');
            }else{
                await dashboardService.criarUsuario(formData);
                mostrarMensagem('Usuário criado com sucesso!');
            }
            handleCloseDialog();
            carregarUsuarios();
        }catch(error){ 
            mostrarMensagem('Erro ao salvar usuário', error);
        }
    };

    //Deletar usuário
    const handleDeleteUsuario = async (id) => {
        if(window.confirm('Tem certeza que deseja excluir este usuário?')){
            try{
                await dashboardService.usuarios.excluirUsuario(id);
                mostrarMensagem('Usuário excluído com sucesso!');
                carregarUsuarios();
            }catch(error){
                mostrarMensagem('Erro ao salvar usuário', error);
            }
        }
    };

    const handleToggleStatus = async (id, novoStatus) => {
    try {
      await dashboardService.atualizarStatusUsuario(id, novoStatus);
      mostrarMensagem('Status do usuário atualizado com sucesso!');
      carregarUsuarios();
    } catch (error) {
      mostrarMensagem('Erro ao atualizar status do usuário', error);
    }
  };


    return{
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
    }
};

export default useUsuarios;