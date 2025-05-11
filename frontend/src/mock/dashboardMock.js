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
    
  }
];