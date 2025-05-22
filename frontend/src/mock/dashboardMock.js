export const mockEventos = [
    {
    id: 1,
    titulo: 'Show de Rock',
    data: new Date().toISOString(),
    local: 'Estádio Municipal',
    descricao: 'Grande show com banda de rock.',
    preco: 100,
    quantidadeIngressos: 500,
    categoria: 'Música',
    status: 'ativo'
  },
  {
    id: 2,
    titulo: 'Feira de Tecnologia',
    data: new Date().toISOString(),
    local: 'Centro de Convenções',
    descricao: 'Exposição de startups e gadgets.',
    preco: 50,
    quantidadeIngressos: 300,
    categoria: 'Tecnologia',
    status: 'rascunho'
  }
];

export const mockUsuarios = [
    {
        id: 1,
        nome: 'Vanessa',
        email: 'vanessa.cormack@geradornv.com.br',
        nivelAcesso: 'admin',
        status: 'ativo'
    },
    {
        id: 2,
        nome: 'Elias',
        email: 'elias.meyer@geradornv.com.br',
        nivelAcesso: 'cliente',
        status: 'inativo'
    }
];

export const mockConfiguracoes = [
  {
    nomePlataforma: 'Evenflow',
    emailContato: 'evenflow@evenflow.com',
    telefone: '(11)4032-1234',
    endereco: 'Rua Marcolino Lino de Novaes',
    cnpj: '12.368.187/0001-60',
    taxaServico: '10',
    notificacoesEmail: true,
    notificacoesPush: true,
    manutencao: false,
    modoTeste: false
  }
];

export const mockResumoFinanceiro = {
  totalVendas: 2500,         
  totalIngressos: 250,       
  mediaTicket: 25,           
  taxaConversao: 0.10        // decimal entre 0 e 1
};

export const mockVendasPorPeriodo = [
  { periodo: 'Semana 1', valor: 500 },
  { periodo: 'Semana 2', valor: 700 },
  { periodo: 'Semana 3', valor: 800 },
  { periodo: 'Semana 4', valor: 500 },
];

export const mockVendasPorCategoria = [
  { categoria: 'Show', valor: 1500 },
  { categoria: 'Teatro', valor: 600 },
  { categoria: 'Cinema', valor: 400 },
];

export const mockVendasPorEvento = [
  {
    id: '1',
    nome: 'Rock in Rio',
    ingressosVendidos: 120,
    valorTotal: 1800,
    ticketMedio: 15,
  },
  {
    id: '2',
    nome: 'Teatro Municipal',
    ingressosVendidos: 80,
    valorTotal: 800,
    ticketMedio: 10,
  },
  {
    id: '3',
    nome: 'Sessão de Cinema',
    ingressosVendidos: 50,
    valorTotal: 500,
    ticketMedio: 10,
  },
];

