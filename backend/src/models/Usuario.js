const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    stripeCustomerId : {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
        set(value) {
            this.setDataValue('email', value.toLowerCase());
        }
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false
    },
    foto:{
        type: DataTypes.STRING,
        allowNull: true
    },
    tipoDocumento:{
        type: DataTypes.ENUM('cpf', 'cnpj'),
        allowNull: false
    },
    documento:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nivelAcesso:{
        type: DataTypes.ENUM('admin', 'organizador', 'usuario'),
        defaultValue: 'usuario'
    },
    dataNascimento:{
        type: DataTypes.DATE,
        allowNull: false
    },
    telefone:{
        type: DataTypes.STRING,
        allowNull: true
    },
    endereco:{
        type: DataTypes.JSON,
        allowNull: true,
        validate: {
            enderecoValido(value) {
                if (value && typeof value === 'object') {
                    const camposObrigatorios = ['cep', 'rua', 'bairro', 'numero', 'cidade', 'estado'];
                    for (const campo of camposObrigatorios) {
                        if (!value[campo]) {
                            throw new Error(`O campo ${campo} é obrigatório.`);
                        }
                    }
                    if (value.estado.length !== 2) {
                        throw new Error('Estado deve ter 2 caracteres.');
                    }
                }
            }
        }        
    }
}, {
    hooks:{
        beforeSave: async (usuario) => {
            if(usuario.changed('senha')){
                usuario.senha = await bcrypt.hash(usuario.senha, 10);
            }
        }
    }
});

Usuario.prototype.verificarSenha = function(senha){
    return bcrypt.compare(senha, this.senha);
}

module.exports = Usuario;