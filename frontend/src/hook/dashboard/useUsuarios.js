import { useState, useEffect } from 'react';
import { formatarDocumento, formatarTelefone } from '../../utils/fomatters';
import { generatePassword, buscarCep } from '../../utils/helpers';
import dashboardService from '../../services/dashboard/dashboardService'; 

//Constantes inciais
const ITENS_POR_PAGINA = 5;

const INITIAL_FORM_DATA = {
    nome: '',
    email: '',
    senha: '',
    foto: null,
    tipoDocumento: '',
    documento: '',
    nivelAcesso: '',
    dataNascimento: null,
    telefone: '',
    endereco: {
        cep: '',
        rua: '',
        bairro: '',
        numero: '',
        complemento: '',
        cidade: '',
        estado: ''
    },
};

const INITIAL_CAMPOS_DESABILITADOS = {
    rua: true,
    bairro: true,
    cidade: true,
    estado: true
};

const useUsuarios = (mostrarMensagem) => {
    const [usuarios, setUsuarios] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUsuario, setSelectedUsuario] = useState(null);
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [showPassword, setShowPassword] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [camposDesabilitados, setCamposDesabilitados] =  useState(INITIAL_CAMPOS_DESABILITADOS);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [loading, setLoading] = useState(false);

    //Carregar usuários ao iniciar
    useEffect(() => {
        carregarUsuarios(pagina);
    }, [pagina]);



    //Funções auxiliares
    const carregarUsuarios = async (paginaAtual = 1) => {
        try{
            setLoading(true);
            const data = await dashboardService.usuarios.listarUsuarios(paginaAtual, ITENS_POR_PAGINA);
            setUsuarios(data.usuarios); 
            setTotalPaginas(data.totalPaginas);
            setPagina(paginaAtual);
        }catch(error){
            mostrarMensagem('Erro ao carregar usuário', error);
        }finally {
        setLoading(false);
        }
    };

    //Manipulação de Formulário
    const handleChange = (e) => {
        const { name, value } = e.target;

        if(name === 'documento'){
            const documentoFormatado = formatarDocumento(value, formData.tipoDocumento);
            setFormData(prev => ({
                ...prev,
                documento: documentoFormatado
            }));
        }else if(name === 'telefone'){
            const telefoneFormatado = formatarTelefone(value);
            setFormData(prev => ({
                ...prev,
                telefone: telefoneFormatado
            }));
        }else if(name.startsWith('endereco.')){
            const enderecoField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                endereco: { ...prev.endereco, [enderecoField]: value }
            }));
        }else{
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            dataNascimento: date
        }));
    };

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setFormData(prev => ({
                ...prev,
                foto: file
            }));
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleGeneratePassword = () => {
    const newPassword = generatePassword(); // Agora retorna a senha
    setFormData(prev => ({
        ...prev,
        senha: newPassword
    }));
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

    const handlePageChange = (event, newPage) => {
        if (newPage >= 1 && newPage <= totalPaginas) {
            setPagina(newPage);
        }
    };

    //CRUD de usuários
    const handleOpenDialog = (usuario = null) => {
        if(usuario){
            setSelectedUsuario(usuario);
            setFormData({
                ...usuario,
                senha: '',
                foto: null,
                endereco: usuario.endereco || INITIAL_FORM_DATA.endereco
            });
        }else{
            setSelectedUsuario(null);
            setFormData(INITIAL_FORM_DATA);
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedUsuario(null);
        setPreviewUrl(null);
        setFormData(INITIAL_FORM_DATA);
    };

    const handleSubmit = async(e) => {
        e?.preventDefault();
        setLoading(true);

        const camposObrigatorios = ['nome', 'email', 'senha', 'tipoDocumento', 'documento', 'nivelAcesso', 'telefone'];
        const camposFaltantes = camposObrigatorios.filter(campo => !formData[campo]);

        if(camposFaltantes.length > 0){
            mostrarMensagem(`Por favor, preencha os campos: ${camposFaltantes.join(', ')}`, 'error');
            return;
        }

        const camposEnderecoObrigatorios = ['cep', 'rua', 'bairro', 'numero', 'cidade', 'estado'];
        const camposEnderecoFaltantes = camposEnderecoObrigatorios.filter(campo => !formData.endereco[campo]);

        if (camposEnderecoFaltantes.length > 0) {
            mostrarMensagem(`Por favor, preencha os campos do endereço: ${camposEnderecoFaltantes.join(', ')}`, 'error');
            return;
        }

        try{
            if(selectedUsuario){
                await dashboardService.usuarios.atualizarUsuario(selectedUsuario.id, formData);
                mostrarMensagem('Usuario atualizado com sucesso!', 'success');
            }else{
                await dashboardService.usuarios.criarUsuario(formData);
                mostrarMensagem('Usuário cadastrado com sucesso!', 'success');
            }
            
            carregarUsuarios();
            handleCloseDialog();
        }catch(error){
            mostrarMensagem('Erro ao salvar usuário', 'error', error);
        }
    };

    const handleDeleteUsuario = async(id) => {
        const result = await alertService.usuarios.confirmar();
        if(result.isConfirmed){
                try{
                    await dashboardService.usuarios.excluirUsuario(id);
                    carregarUsuarios();
                }catch(error){
                    mostrarMensagem('Erro ao excluir usuário', 'error', error);
                }
            }
    };

    const handleToggleStatus = async(id, novoStatus) => {
        try{
            await dashboardService.usuarios.atualizarStatusUsuario(id, novoStatus);
            mostrarMensagem('Status atualizado com sucesso!', 'success');
            carregarUsuarios();
        }catch(error){  
            mostrarMensagem('Erro ao atualizar status', 'error', error)
        }
    };

    return{
        usuarios,
        openDialog,
        selectedUsuario,
        formData,
        showPassword,
        previewUrl,
        camposDesabilitados,
        pagina,
        totalPaginas,
        loading,


        
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
    };
};


    

export default useUsuarios;