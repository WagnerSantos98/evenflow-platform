const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Evento = require('./Evento');

const GaleriaEvento = sequelize.define('GaleriaEvento', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    urlImagem:{
        type: DataTypes.STRING,
        allowNull: false
    },
    eventoId:{
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model: Evento,
            key: 'id'
        }
    }
});

module.exports = GaleriaEvento;