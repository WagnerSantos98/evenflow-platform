const { DataTypes, UUIDV4 } = require('sequelize');
const { sequelize } = require('../config/database');
const Usuario = require('../models/Usuario');

const Notificacao = sequelize.define('Notificacao', {
    id : {
        type : DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull : false,
    },
    icone :{
        type: DataTypes.STRING,
        allowNull: true
    },
    texto : {
        type: DataTypes.STRING,
        allowNull: false
    },
    foiLidoPeloUsuario : {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    dataCriacao: {
        type: DataTypes.DATE,
        allowNull : false
    },
    usuarioId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    }
    
});
module.exports = Notificacao;

