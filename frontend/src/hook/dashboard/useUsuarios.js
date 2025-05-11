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
    const [formData. setFormData] = useState(INITIAL_FORM_DATA);

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const carregarUsuarios = async () => {
        try{
            const data = await dashboardService.usuarios
        }catch(error){

        }
    }
};

export default useUsuarios;