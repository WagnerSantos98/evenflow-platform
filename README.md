# EvenFlow Platform

**EvenFlow** é uma plataforma de gerenciamento de eventos que visa facilitar a criação, organização e acompanhamento de eventos de maneira eficiente e acessível. Este repositório contém tanto o código do back-end quanto do front-end para o desenvolvimento completo da aplicação.

## Funcionalidades

- **Gestão de eventos**: Criação, edição e visualização de eventos.
- **Cadastro de participantes**: Permite que os participantes se inscrevam e visualizem eventos.
- **Notificações**: Envio de notificações para os participantes sobre atualizações e mudanças nos eventos.
- **Autenticação de usuários**: Sistema de login e gerenciamento de contas de usuários.

## Tecnologias

Este projeto é construído utilizando as seguintes tecnologias:

- **Back-end**:
  - Node.js
  - Express.js
  - PostgreSQL (ou outra base de dados, dependendo da escolha)
  - JWT (JSON Web Tokens) para autenticação

- **Front-end**:
  - React.js
  - Redux (para gerenciamento de estado, se necessário)
  - CSS/SCSS ou outras bibliotecas de estilização (Bootstrap, Tailwind, etc.)

- **Outras**:
  - Docker (para containerização do ambiente de desenvolvimento e produção)
  - Git (controle de versão)

## Estrutura do Repositório
<pre> ```text evenflow-platform/ │ ├── backend/ │ ├── server.js │ ├── package.json │ └── src/ │ ├── config/ # Configurações (DB, Swagger, etc) │ ├── controllers/ # Lógica das rotas │ ├── docs/ # Documentação Swagger │ ├── middlewares/ # Middlewares (auth, upload, etc) │ ├── models/ # Modelos do banco de dados │ ├── routes/ # Definição das rotas da API │ ├── services/ # Integrações com serviços externos (S3, Stripe) │ ├── utils/ # Funções utilitárias │ └── validators/ # Validação dos dados │ └── frontend/ ├── index.html ├── package.json └── src/ ├── assets/ # Imagens e ícones ├── components/ # Componentes reutilizáveis (auth, layout, dashboard, etc) ├── hooks/ # Hooks personalizados ├── pages/ # Páginas principais e de conteúdo ├── services/ # Consumo de APIs ├── styles/ # Estilização global e temática └── utils/ # Funções utilitárias ``` </pre>


## Como Executar o Projeto

--
