require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');
const cors = require('cors');
const { sequelize } = require('./src/config/database');

//Importação das rotas
const authRoutes = require('./src/routes/auth.routes');
const usuarioRoutes = require('./src/routes/usuario.routes');
const localRoutes = require('./src/routes/local.routes');
const eventoRoutes = require('./src/routes/evento.routes');
const ingressoRoutes = require('./src/routes/ingresso.routes');
const avaliacaoRoutes = require('./src/routes/avaliacao.routes');
const notificacoesRoutes = require('./src/routes/notificacao.routes');
const checkoutSessionRoutes = require('./src/routes/checkoutSession.routes');
const webhookRoutes = require('./src/routes/webhook.routes'); // Nova rota do webhook

require('./src/docs')



const app = express();

//Middlewares
app.use(cors({
    origin: ['http://localhost:5173', 'https://evenflow-platform.vercel.app']
}));
app.use(
    '/api/webhook',
    express.raw({ type: 'application/json' }), // Middleware exclusivo para o webhook da stripe (Precisa ficar antes do express.json)
    webhookRoutes
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Rotas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/locais', localRoutes);
app.use('/api/eventos', eventoRoutes);
app.use('/api/ingressos', ingressoRoutes);
app.use('/api/avaliacoes', avaliacaoRoutes);
app.use('/api/notificacoes', notificacoesRoutes);
app.use('/api/checkout-sessions', checkoutSessionRoutes);



//Rota de confirmação de teste
app.get('/', (req, res) => {
    res.json({ message: 'Bem-vindo à API do Evenflow'});
});

//Sincronização com o banco de dados
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Banco de dados sincronizado');
    })
    .catch(err => {
        console.error('Erro ao sincronizar banco de dados:', err);
    })

//Porta
const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    })
