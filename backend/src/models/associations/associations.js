const Usuario = require('../Usuario');
const Evento = require('../Evento');
const Local = require('../Local');
const Ingresso = require('../Ingresso');
const Avaliacao = require('../Avaliacao');
const Notificacao = require('../Notificacao'); 
//const LinkPagamento = require('../LinkPagamento');
const CheckoutSession = require('../CheckoutSession');


const setupAssociations = () => {
    //Relacionamento entre Evento e Local
    Evento.belongsTo(Local, { as: 'local', foreignKey: 'localId', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    Local.hasMany(Evento, { as: 'eventos', foreignKey: 'localId', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

    //Relacionamento entre Evento e Usuário
    Evento.belongsTo(Usuario, { as: 'organizador', foreignKey: 'organizadorId', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    Usuario.hasMany(Evento, { as: 'eventos', foreignKey: 'organizadorId', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

    //Relacionamento entre Evento e Ingresso
    Ingresso.belongsTo(Evento, { as: 'evento', foreignKey: 'eventoId', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    Evento.hasMany(Ingresso, { as: 'ingressos', foreignKey: 'eventoId', onUpdate: 'SET NULL', onDelete: 'CASCADE' });

    //Relacionamento entre Ingresso e Usuário
    Ingresso.belongsTo(Usuario, { as: 'comprador', foreignKey: 'compradorId', onUpdate: 'SET NULL', onDelete: 'CASCADE' });
    Usuario.hasMany(Ingresso, { as: 'ingressosComprados', foreignKey: 'compradorId', onUpdate: 'SET NULL', onDelete: 'CASCADE' });

    // Relacionamento entre Avaliacao e Usuario
    Avaliacao.belongsTo(Usuario, { as: 'usuario', foreignKey: 'usuarioId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Usuario.hasMany(Avaliacao, { as: 'avaliacoes', foreignKey: 'usuarioId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
 
    // Relacionamento entre Avaliacao e Evento
    Avaliacao.belongsTo(Evento, { as: 'evento', foreignKey: 'eventoId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Evento.hasMany(Avaliacao, { as: 'avaliacoes', foreignKey: 'eventoId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

    // Relacionamento entre Notificacao e Usuario
    Notificacao.belongsTo(Usuario, { as: 'usuario', foreignKey: 'usuarioId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Usuario.hasMany(Notificacao, { as: 'notificacoes', foreignKey: 'usuarioId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

    // Relacionamento entre CheckoutSession e Usuario
    CheckoutSession.belongsTo(Usuario, { as: 'usuario', foreignKey: 'usuarioId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Usuario.hasMany(CheckoutSession, { as: 'checkoutSessions', foreignKey: 'usuarioId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

    // Relacionamento entre CheckoutSession e Ingresso
    CheckoutSession.belongsTo(Ingresso, { as: 'ingresso', foreignKey: 'ingressoId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Ingresso.hasMany(CheckoutSession, { as: 'checkoutSessions', foreignKey: 'ingressoId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

    // Relacionamento entre CheckoutSession e Evento
    CheckoutSession.belongsTo(Evento, { as: 'evento', foreignKey: 'eventoId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Evento.hasMany(CheckoutSession, { as: 'checkoutSessions', foreignKey: 'eventoId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

};

module.exports = setupAssociations;