const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition:{
        openapi: '3.0.0',
        info:{
            title: 'Documentação da API',
            version: '1.0.0',
            description: 'Documentação da API do sistema de eventos com Swagger'
        },
        servers:[
            {
                url: 'http://localhost:3000'
            }
            
        ]
    },
    apis: ['src/docs/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;