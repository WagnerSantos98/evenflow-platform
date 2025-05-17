const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        dialectOptions: process.env.DB_SSL === 'true' ? {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        } : {}, // Desativa SSL para dev
    }
);

// Teste de conexão
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conectado ao banco de dados com sucesso!');
        
        // Sincroniza os modelos (opcional)
        if (process.env.NODE_ENV === 'development') {
            await sequelize.sync();
            console.log('Modelos sincronizados com sucesso!');
        }
    } catch (error) {
        console.error('Erro ao conectar/sincronizar banco de dados:', error);
    }
})();

module.exports = { sequelize };