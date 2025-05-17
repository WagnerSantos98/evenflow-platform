const { body, query } = require('express-validator');
const moment = require('moment');

const validarArquivoImagem = (req, res, next) => {
    if(!req.file){
        return next();
    }

    const tiposPermitidos = ['image/jpeg', 'image/jpg', 'image/png'];
    const tamanhoMaximo = 5 * 1024 * 1024; //5MB

    if(!tiposPermitidos.includes(req.fie.mimetype)){
        return res.status(400).json({
            mensagem: 'Tipo de arquivo não permitido. Apenas imagens JPEG, JPG, e PNG são aceitas.'
        });
    }

    if(req.file.size > tamanhoMaximo){
        return res.status(400).json({
            mensagem: 'Arquivo muito grande. O tamanho máximo permitido é 5MB.'
        })
    }
    next();
}

const validarCriacaoEvento = [
    body('nome').notEmpty().withMessage('O nome do evento é obrigatório.'),
    //body('descricao').withMessage('A descrição do evento é obrigatória.'),
    body('data')
        .notEmpty().withMessage('A data do evento é obrigatória.')
        .custom((value) => {
            if (!moment(value, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
                throw new Error('A data do evento deve estar no formato YYYY-MM-DD HH:mm:ss.');
            }
            if (moment(value).isBefore(moment())) {
                throw new Error('A data do evento não pode estar no passado.');
            }
            return true;
        }),
    body('precoIngresso')
        .notEmpty().withMessage('O preço do ingresso é obrigatório.')
        .isFloat({ min: 0 }).withMessage('O preço do ingresso deve ser um número maior ou igual a 0.'),
    body('ingressosDisponiveis')
        .notEmpty().withMessage('A quantidade de ingressos disponíveis é obrigatória.')
        .isInt({ min: 1 }).withMessage('A quantidade de ingressos disponíveis deve ser maior que 0.'),
    body('tipoEvento')
        .notEmpty().withMessage('O tipo do evento é obrigatório.')
        .isIn(['presencial', 'online']).withMessage('O tipo do evento deve ser "presencial" ou "online".'),
    body('categoria')
        .optional()
        .isIn(['comedia', 'infantil', 'familia', 'musical', 'teatro', 'esporte', 'outros'])
        .withMessage('A categoria do evento é inválida.'),
    body('classificacaoEtaria')
        .optional()
        .isIn(['L', '14', '16', '18']).withMessage('A classificação etária deve ser "L", "14", "16" ou "18".'),
    body('status')
        .optional()
        .isIn(['em cartaz', 'cancelado', 'encerrado']).withMessage('O status do evento é inválido.'),
    body('localId')
        .optional()
        .isUUID().withMessage('O ID do local deve ser um UUID válido.'),
    body('organizadorId')
        .optional()
        .isUUID().withMessage('O ID do organizador deve ser um UUID válido.')
];

const validarAtualizacaoEvento = [
    body('nome').optional().notEmpty().withMessage('O nome do evento não pode estar vazio.'),
    body('descricao').optional().notEmpty().withMessage('A descrição do evento não pode estar vazia.'),
    body('data')
        .optional()
        .custom((value) => {
            if (!moment(value, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
                throw new Error('A data do evento deve estar no formato YYYY-MM-DD HH:mm:ss.');
            }
            if (moment(value).isBefore(moment())) {
                throw new Error('A data do evento não pode estar no passado.');
            }
            return true;
        }),
    body('precoIngresso')
        .optional()
        .isFloat({ min: 0 }).withMessage('O preço do ingresso deve ser um número maior ou igual a 0.'),
    body('ingressosDisponiveis')
        .optional()
        .isInt({ min: 1 }).withMessage('A quantidade de ingressos disponíveis deve ser maior que 0.'),
    body('tipoEvento')
        .optional()
        .isIn(['presencial', 'online']).withMessage('O tipo do evento deve ser "presencial" ou "online".'),
    body('categoria')
        .optional()
        .isIn(['comedia', 'infantil', 'familia', 'musical', 'teatro', 'esporte', 'outros'])
        .withMessage('A categoria do evento é inválida.'),
    body('classificacaoEtaria')
        .optional()
        .isIn(['L', '14', '16', '18']).withMessage('A classificação etária deve ser "L", "14", "16" ou "18".'),
    body('status')
        .optional()
        .isIn(['em cartaz', 'cancelado', 'encerrado']).withMessage('O status do evento é inválido.'),
    body('localId')
        .optional()
        .isUUID().withMessage('O ID do local deve ser um UUID válido.'),
    body('organizadorId')
        .optional()
        .isUUID().withMessage('O ID do organizador deve ser um UUID válido.')
];

const validarConsultaEventos = [
    query('pagina').optional().isInt({ min: 1 }).withMessage('A página deve ser um número inteiro positivo.'),
    query('limite').optional().isInt({ min: 1, max: 100 }).withMessage('O limite deve ser um número entre 1 e 100.'),
    query('nome').optional().trim(),
    query('data')
        .optional()
        .custom((value) => {
            if (!moment(value, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
                throw new Error('A data deve estar no formato YYYY-MM-DD HH:mm:ss.');
            }
            return true;
        }),
    query('tipoEvento')
        .optional()
        .isIn(['presencial', 'online']).withMessage('O tipo do evento deve ser "presencial" ou "online".'),
    query('categoria')
        .optional()
        .isIn(['comedia', 'infantil', 'familia', 'musical', 'teatro', 'esporte', 'outros'])
        .withMessage('A categoria do evento é inválida.'),
    query('status')
        .optional()
        .isIn(['em cartaz', 'cancelado', 'encerrado']).withMessage('O status do evento é inválido.')
];

module.exports = {
    validarCriacaoEvento,
    validarAtualizacaoEvento,
    validarConsultaEventos,
    validarArquivoImagem
};