import api from '../api';

//Módulo de Estatíticas
const estatisticas = {
    getEstatisticas: async () => {
        const response = await api.get('/dashboard/estatisticas');
        return response.data;
    },
    obterEstatisticasPorPeriodo: async (periodo) => {
        const response = await api.get(`/dashboard/estatisticas/${periodo}`);
        return response.data;
    }
};

//Método de Eventos - Listagem, Criação, Edição e Exclusão
const eventos = {
    listarEventos: async (params) => {
        const response = await api.get('/eventos', { params });
        return response.data;
    },

    buscarEvento: async (id) => {
        const response = await api.get(`/eventos/${id}`);
        return response.data;
    },

    criarEvento: async (dados) => {
        const response = await api.post('/eventos', dados, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    atualizarEvento: async (id, dados) => {
        const response = await api.put(`/eventos/${id}`, dados, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    deletarEvento: async (id) => {
        const response = await api.delete(`/eventos/${id}`);
        return response.data;
    }
};

//Método de Usuários - Listagem, Criação, Edição e Exclusão
const usuarios = {
    listarUsuarios: async (pagina = 1, limite = 5) => {
        const response = await api.get('/usuarios', {
            params: {
                pagina,
                limite
            }
        });
        return response.data;
    },
    criarUsuario: async (usuario) => {
        const response = await api.post('/usuarios', usuario, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    buscarUsuarioLogado: async () => {
        const response = await api.get('/auth/verificar');
        return response.data.usuario;
    },
    atualizarUsuario: async (id, usuario) => {
        const response = await api.put(`/usuarios/${id}`, usuario, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    excluirUsuario: async (id) => {
        const response = await api.delete(`/usuarios/${id}`);
        return response.data;
    }
};

const locais = {
    listarLocais: async () => {
        const response = await api.get('/locais');
        return response.data;
    },
    criarLocal: async (local) => {
        const response = await api.post('/locais', local);
        return response.data;
    },
    atualizarLocal: async (id, local) => {
        const response = await api.put(`/locais/${id}`, local);
        return response.data;
    },
    deletarLocal: async (id) => {
        const response = await api.delete(`/locais/${id}`);
        return response.data;
    },
};

//Método de Relatórios Financeiros - Listagem das vendas (Período, Evento, Categoria e Resumo)
const relatoriosFinanceiros = {
    vendasPorPeriodo: async (periodo, dataInicio, dataFim) => {
        const response = await api.get('/relatorios/vendas/periodo', {
            params: { periodo, dataInicio, dataFim }
        });
        return response.data;
    },
    vendasPorEvento: async (periodo, dataInicio, dataFim) => {
        const response = await api.get('/relatorios/vendas/evento', {
            params: { periodo, dataInicio, dataFim }
        });
        return response.data;
    },
    vendarPorCategoria: async (periodo, dataInicio, dataFim) => {
        const response = await api.get('/relatorios/vendas/categoria', {
            params: { periodo, dataInicio, dataFim }
        });
        return response.data;
    },
    resumoFinanceiro: async (periodo, dataInicio, dataFim) => {
        const response = await api.get('/relatorios/resumo', {
            params: { periodo, dataInicio, dataFim }
        });
        return response.data;
    }
};
//Método de Relatórios - Listagem pelo filtro de Perído
const periodos = {
    periodoVendas: async (periodo) => {
        const response = await api.get(`dashboard/relatioro-vendas?periodo=${periodo}`);
        return response.data;
    },
    periodoIngressos: async (periodo) => {
        const response = await api.get(`dashboard/relatioro-ingressos?periodo=${periodo}`);
        return response.data;
    }
};

//Módulo de Configurações - Obter e atualizar
const configuracoes = {
    obterConfiguracoes: async () => {
        const response = await api.get('/configuracoes');
        return response.data;
    },
    atualizarConfiguracoes: async (dados) => {
        const response = await api.put('/configuracoes', dados);
        return response.data;
    }
};

const ingressos = {
    criarIngresso: async (dados) => {
        try {
            const response = await api.post('/ingressos', dados);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    listarIngressos: async () => {
        try {
            const response = await api.get('/ingressos');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    buscarIngresso: async (id) => {
        try {
            const response = await api.get(`/ingressos/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    atualizarIngresso: async (id, dados) => {
        try {
            const response = await api.put(`/ingressos/${id}`, dados);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deletarIngresso: async (id) => {
        try {
            const response = await api.delete(`/ingressos/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

const pagamentos = {
    criarCheckoutSession: async (dados) => {
        try {
            const response = await api.post('/checkout-sessions', dados);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    listarCheckoutSessions: async () => {
        try {
            const response = await api.get('/checkout-sessions');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    buscarCheckoutSession: async (id) => {
        try {
            const response = await api.get(`/checkout-sessions/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    atualizarStatusCheckout: async (id, status) => {
        try {
            const response = await api.put(`/checkout-sessions/${id}/status`, { status });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

//Método de Avaliações
const avaliacoes = {
    listarAvaliacoesUsuario: async (usuarioId) => {
        const response = await api.get(`/avaliacoes/usuario/${usuarioId}`);
        return response.data;
    },

    criarAvaliacao: async (dados) => {
        const response = await api.post('/avaliacoes', dados);
        return response.data;
    },

    atualizarAvaliacao: async (id, dados) => {
        const response = await api.put(`/avaliacoes/${id}`, dados);
        return response.data;
    },

    deletarAvaliacao: async (id) => {
        const response = await api.delete(`/avaliacoes/${id}`);
        return response.data;
    }
};

//Método de Compras
const compras = {
    listarComprasUsuario: async (usuarioId) => {
        const response = await api.get(`/compras/usuario/${usuarioId}`);
        return response.data;
    },

    buscarCompra: async (id) => {
        const response = await api.get(`/compras/${id}`);
        return response.data;
    },

    criarCompra: async (dados) => {
        const response = await api.post('/compras', dados);
        return response.data;
    },

    cancelarCompra: async (id) => {
        const response = await api.put(`/compras/${id}/cancelar`);
        return response.data;
    }
};

//Método de Autenticação
const auth = {
    login: async (email, senha) => {
        const response = await api.post('/auth/login', { email, senha });
        return response.data;
    },

    verificarToken: async () => {
        const response = await api.get('/auth/verificar');
        return response.data;
    },

    registrar: async (userData) => {
        const response = await api.post('/auth/registrar', userData);
        return response.data;
    },

    atualizarUsuario: async (userData) => {
        const response = await api.put('/auth/usuario', userData);
        return response.data;
    }
};

//Serviço unificado
const dashboardService = {
    estatisticas,
    eventos,
    usuarios,
    locais,
    relatoriosFinanceiros,
    periodos,
    configuracoes,
    ingressos,
    pagamentos,
    avaliacoes,
    compras,
    auth
};

export default dashboardService;


