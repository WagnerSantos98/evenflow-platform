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
    MenuItem,
    Switch
} from '@mui/material';
import{
    Person,
    Add,
    Edit,
    Delete,
    Block,
    CheckCircle
} from '@mui/icons-material';
import dashboardService from '../../../services/tests/dashboardService'; //Dados mockados

const Usuarios = ({ mostrarMensagem }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUsuario, setSelectedUsuario] = useState(null);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        nivelAcesso: 'admin',
        status: 'ativo'
    });

    useEffect(() => {
        carregarUsuarios();
    }, []);

    
}