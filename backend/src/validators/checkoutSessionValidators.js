const { body, param } = require('express-validator');

const validarCriacaoCheckoutSession = [
    body('eventoId').isUUID().withMessage('O ID do evento deve ser um UUID válido.'),
    body('quantidade').isInt({ min: 1 }).withMessage('A quantidade deve ser um número inteiro maior que 0.')
];

const validarAtualizacaoStatus = [
    param('id').isUUID().withMessage('O ID da sessão de checkout deve ser um UUID válido.'),
    body('status').isIn(['pendente', 'pago', 'cancelado', 'expirado']).withMessage('Status inválido.')
];

module.exports = {
    validarCriacaoCheckoutSession,
    validarAtualizacaoStatus
}