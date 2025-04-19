const { DataTypes, UUIDV4 } = require('sequelize');
const { sequelize } = require('../config/database');
const Usuario = require('./Usuario');
const Ingresso = require('./Ingresso');

const CheckoutSession = sequelize.define('CheckoutSession', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    idCheckout : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    checkoutUrl : {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate :{
            isUrl: true
        }
    },
    status: {
        type: DataTypes.ENUM('pendente', 'pago', 'cancelado', 'expirado'),
        defaultValue: 'pendente',
        allowNull: false
    },
    valorTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    payment_method_types :{
        type: DataTypes.STRING,
        allowNull: false,
    },
    usuarioId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    ingressoId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Ingresso,
            key: 'id'
        }
    }
}, {
    timestamps: true, // Adiciona campos createdAt e updatedAt automaticamente
});

module.exports = CheckoutSession;
