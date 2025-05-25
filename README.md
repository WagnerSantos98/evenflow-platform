# EvenFlow Platform

**EvenFlow** é uma plataforma de gerenciamento de eventos que visa facilitar a criação, organização e acompanhamento de eventos de maneira eficiente e acessível. Este repositório contém tanto o código do back-end quanto do front-end para o desenvolvimento completo da aplicação.

## Funcionalidades

- **Gestão de eventos**: Criação, edição e visualização de eventos.
- **Cadastro de participantes**: Permite que os participantes se inscrevam e visualizem eventos.
- **Notificações**: Envio de notificações para os participantes sobre atualizações e mudanças nos eventos.
- **Autenticação de usuários**: Sistema de login e gerenciamento de contas de usuários.

## Tecnologias
Este projeto é construído utilizando as seguintes tecnologias:

| Backend               | Frontend           | Infra       |
|-----------------------|--------------------|-------------|
| Node.js + Express     | React + Vite       | Render      |
| PostgreSQL            | Redux Toolkit      | Cloudflare  |
| JWT + Bcrypt          | Tailwind CSS       | Stripe      |


## Estrutura do Repositório
```text
evenflow-platform/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── src/
│       ├── config/             # Configurações (DB, Swagger, etc)
│       ├── controllers/        # Lógica das rotas
│       ├── docs/               # Documentação Swagger
│       ├── middlewares/       # Middlewares (auth, upload, etc)
│       ├── models/            # Modelos do banco de dados
│       ├── routes/            # Definição das rotas da API
│       ├── services/          # Integrações com serviços externos (S3, Stripe)
│       ├── utils/             # Funções utilitárias
│       └── validators/        # Validação dos dados
│
└── frontend/
    ├── index.html
    ├── package.json
    └── src/
        ├── assets/            # Imagens e ícones
        ├── components/        # Componentes reutilizáveis (auth, layout, dashboard, etc)
        ├── hooks/            # Hooks personalizados
        ├── pages/            # Páginas principais e de conteúdo
        ├── services/         # Consumo de APIs
        ├── styles/          # Estilização global e temática
        └── utils/           # Funções utilitárias
```
## Documentação do Backend - API
A API está documentada via Swagger. Confira os endpoints em: 
[evenflow-platform/api-docs](https://evenflow-platform.onrender.com/api-docs/)

O projeto segue uma estrutura modular com pastas organizadas por contexto (auth, eventos, usuários, etc), facilitando a escalabilidade e manutenção.


## Como Executar o Projeto

Pré-requisitos
 - Node.js >= 18
 - PostgreSQL

Executando Manualmente

## Backend
```cd backend && npm install```
```npm run dev```

## Frontend
```cd frontend && yarn```
```yarn run dev```

## Segurança
 - JWT para autenticação
 - Validação de dados com middlewares
 - Upload de arquivos com controle de tipos
 - Regras de acesso com rotas protegidas

 ## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

 ![GitHub license](https://img.shields.io/github/license/WagnerSantos98/evenflow-platform)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![React](https://img.shields.io/badge/React-18-blue)

## Autores
- [Wagner Santos](https://github.com/WagnerSantos98)
- [Igor Bertelli](https://github.com/igor-bertelli)
- [Bruna Sementino](https://github.com/BrunaSementino)