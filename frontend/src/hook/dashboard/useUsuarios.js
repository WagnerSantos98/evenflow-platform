import { useState, useEffect } from 'react';
import dashboardService from '../../services/tests/dashboardService'; //Dados mockados

//Constantes inciais
const INITIAL_FORM_DATA = {
    nome: '',
    email: '',
    nivelAcesso: 'admin',
    status: 'ativo'
};