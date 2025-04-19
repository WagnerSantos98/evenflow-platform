const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Local = require('./Local');

const Evento = sequelize.define('Evento', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    data:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    foto:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    precoIngresso:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    ingressosDisponiveis:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tipoEvento: {
        type: DataTypes.ENUM('presencial', 'online'), // Corrigido aqui
        allowNull: false,
    },
    categoria:{
        type: DataTypes.ENUM('comedia', 'infantil', 'familia', 'musical', 'teatro', 'esporte', 'outros'),
        allowNull: false,
        defaultValue: 'outros'
    },
    classificacaoEtaria:{
        type: DataTypes.ENUM('L', '14', '16', '18'),
        allowNull: false,
        defaultValue: 'L'
    },
    status:{
        type: DataTypes.ENUM('em cartaz', 'cancelado', 'encerrado', 'ativo'),
        allowNull: false,
        defaultValue: 'em cartaz'
    },
    localId:{
        type: DataTypes.UUID,
        allowNull: true,
        references:{
            model: Local,
            key: 'id'
        }
    },
    organizadorId:{
        type: DataTypes.UUID,
        allowNull: true,
    },
    stripeProductId : {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    stripePriceId : {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    }

}, {
    hooks:{
        beforeValidate: async(evento) => {
            //Se o evento for online, não precisa de local
            if(evento.tipoEvento === 'online'){
                evento.localId = null;
            }
            // Se o preço do ingresso for menor que 0, os campos Stripe devem ser nulos
            if (evento.precoIngresso < 0) {
                evento.stripeProductId = null;
                evento.stripePriceId = null;
            }
        }
    }
});


module.exports = Evento;