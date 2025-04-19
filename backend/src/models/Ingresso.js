const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Evento = require('./Evento');
const Usuario = require('./Usuario');
const { v4: uuidv4 } = require('uuid'); // Importa o UUID para gerar códigos únicos


const Ingresso = sequelize.define('Ingresso', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    codigo:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,

    },
    preco:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM('pendente','disponivel', 'reservado', 'vendido', 'utilizado', 'cancelado'),
        defaultValue: 'disponivel',
        allowNull: false
    },
    tipo:{
        type: DataTypes.ENUM('inteira', 'meia', 'promocional'),
        defaultValue: 'inteira',
        allowNull: false
    },
    dataCompra:{
        type: DataTypes.DATE,
        allowNull: true
    },
    dataUtilização:{
        type: DataTypes.DATE,
        allowNull: true
    },
    eventoId:{
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model: Evento,
            key: 'id'
        }
    },
    compradorId:{
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model: Usuario,
            key: 'id'
        }
    }
}, {
    hooks: {
        beforeCreate: async (ingresso) => {
            // Gera um código único para o ingresso
            ingresso.codigo = `ING-${uuidv4().split('-')[0].toUpperCase()}`;
        }
    }
});

module.exports = Ingresso;