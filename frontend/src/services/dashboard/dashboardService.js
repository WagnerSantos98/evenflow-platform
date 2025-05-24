import api from '../api';
import { toFormData } from '../../utils/formDataHelper';

//Módulo de Estatíticas
const estatisticas = {
    getEstatisticas: async () => {
        const response = await api.get('/dashboard/estatisticas');
        return response.data;
    }
};

//Método de Eventos - Listagem, Criação, Edição e Exclusão
const eventos = {
    listarEventos: async (params = {}) => {
        const response = await api.get('/eventos', { params });
        return response.data;
    },
    buscarEventoId: async (id) => {
      const response = await api.get(`/eventos/${id}`);
      return response.data; 
    },
    criarEvento: async (evento) => {
        const response = await api.post('/eventos', evento);
        return response.data;
    },
    atualizarEvento: async (id, evento) => {
        const response = await api.put(`/eventos/${id}`, evento);
        return response.data;
    },
    excluirEvento: async (id) => {
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
        const formData = toFormData(usuario);

        const response = await api.post('/usuarios', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data
    },


    /*atualizarUsuario: async (id, usuario) => {
        const response = await api.put(`/usuarios/${id}`, usuario);
        return response.data;
    },*/
    excluirUsuario: async (id) => {
        const response = await api.delete(`/usuarios/${id}`);
        return response.data;
    }
};

const locais = {
    listarLocais: async () => {
        const response = await api.get('/locais');
        return response.data.locais;
    }
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
    atualizarConfiguracoes: async(configuracao) => {
        const response = await api.put('/configuracoes', configuracao);
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
    configuracoes
};

export default dashboardService;


