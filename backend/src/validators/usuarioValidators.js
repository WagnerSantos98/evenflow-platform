const { body, query } = require('express-validator');
const { formatarDocumento, formatarCEP, formatarData } = require('../utils/formatadores');

//Validação de arquivo de imagem
const validarArquivoImagem = (req, res, next) => {
    if (!req.file) {
        return next();
    }

    const tiposPermitidos = ['image/jpeg', 'image/jpg', 'image/png'];
    const tamanhoMaximo = 5 * 1024 * 1024; // 5MB

    if (!tiposPermitidos.includes(req.file.mimetype)) {
        return res.status(400).json({ 
            mensagem: 'Tipo de arquivo não permitido. Apenas imagens JPEG, JPG, e PNG são aceitas.' 
        });
    }

    if (req.file.size > tamanhoMaximo) {
        return res.status(400).json({ 
            mensagem: 'Arquivo muito grande. O tamanho máximo permitido é 5MB.' 
        });
    }

    next();
};

const validarCadastroUsuario = [
    body('nome').trim().notEmpty().withMessage('Nome não pode estar vazio'),
    body('email').isEmail().withMessage('Email, inválido'),
    body('senha').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
    body('tipoDocumento').isIn([ 'cpf', 'cnpj']).withMessage('Tipo de documento inválido'),
    body('documento').custom((value, { req }) => {
        try{
            req.body.documentoFormatado = formatarDocumento(value, req.body.tipoDocumento);
            return true;
        }catch(error){
            throw new Error(error.message)
        }
    }),
    body('dataNascimento').custom((value, { req }) => {
        try{
            const data = formatarData(value)
            req.body.dataNascimentoISO = data.iso;
            return true;
        }catch(error){
            throw new Error(error.message);
        }
    }),
    body('telefone').optional().isMobilePhone('pt-BR').withMessage('Telefone inválido'),
    body('endereco').optional().custom(value => {
        if (typeof value !== 'object' || Array.isArray(value) || value === null) {
            throw new Error('Endereço deve ser um objeto');
        }
        return true;
    }),
    body('endereco.cep').custom((value, { req }) => {
        try{
            req.body.endereco = req.body.endereco || {};
            req.body.endereco.cepFormatado = formatarCEP(value);
            return true;
        }catch(error){
            throw new Error(error.message);
        }
    }),
    body('endereco.rua').if(body('endereco').exists()).trim().notEmpty().withMessage('Rua é obrigatória'),
    body('endereco.bairro').if(body('endereco').exists()).trim().notEmpty().withMessage('Bairro é obrigatório'),
    body('endereco.numero').if(body('endereco').exists()).trim().notEmpty().withMessage('Número é obrigatório'),
    body('endereco.complemento').optional().trim(),
    body('endereco.cidade').if(body('endereco').exists()).trim().notEmpty().withMessage('Cidade é obrigatória'),
    body('endereco.estado').if(body('endereco').exists()).isLength({ min: 2, max: 2 }).withMessage('Estado deve ter 2 caracteres')
];

//Validação de atualização
const validarAtualizacaoUsuario = [
    body('nome').optional().trim().notEmpty().withMessage('Nome é obrigatório'),
    body('email').optional().isEmail().withMessage('Email inválido'),
    body('senha').optional().isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
    body('tipoDocumento').optional().isIn(['cpf', 'cnpj']).withMessage('Tipo de documento inválido'),
    body('documento').optional().custom((value, { req }) => {
        try{
            req.body.documentoFormatado = formatarDocumento(value, req.body.tipoDocumento);
            return true;
        }catch(error){
            throw new Error(error.message)
        }
    }),
    body('dataNascimento').optional().custom((value, { req }) => {
        try{
            const data = formatarData(value)
            req.body.dataNascimentoISO = data.iso;
            return true;
        }catch(error){
            throw new Error(error.message);
        }
    }),
    body('telefone').optional().isMobilePhone('pt-BR').withMessage('Telefone inválido'),
    body('endereco').optional().optional().custom(value => {
        if (typeof value !== 'object' || Array.isArray(value) || value === null) {
            throw new Error('Endereço deve ser um objeto');
        }
        return true;
    }),
    body('endereco.cep').optional().custom((value, { req }) => {
        try{
            req.body.endereco = req.body.endereco || {};
            req.body.endereco.cepFormatado = formatarCEP(value);
            return true;
        }catch(error){
            throw new Error(error.message);
        }
    }),
    body('endereco.rua').optional().trim().notEmpty().withMessage('Rua é obrigatória'),
    body('endereco.bairro').optional().trim().notEmpty().withMessage('Bairro é obrigatório'),
    body('endereco.numero').optional().trim().notEmpty().withMessage('Número é obrigatório'),
    body('endereco.complemento').optional().trim(),
    body('endereco.cidade').optional().trim().notEmpty().withMessage('Cidade é obrigatória'),
    body('endereco.estado').optional().isLength({ min: 2, max: 2 }).withMessage('Estado deve ter 2 caracteres')
];

//Validação de consulta
const validarConsultaUsuarios = [
    query('pagina').optional().isInt({ min: 1 }).withMessage('Página deve ser um número inteiro positivo'),
    query('limite').optional().isInt({ min: 1, max: 100 }).withMessage('Limite deve ser um número entre 1 e 100'),
    query('nome').optional().trim(),
    query('email').optional().trim(),
    query('nivelAcesso').optional().isIn(['admin', 'organizador', 'usuario']).withMessage('Nível de acesso inválido')
];


module.exports = {
    validarCadastroUsuario,
    validarAtualizacaoUsuario,
    validarConsultaUsuarios,
    validarArquivoImagem
}