const express = require('express');
const router = express.Router();

const checkoutSessionController = require('../controllers/checkoutSessionController');
const { autenticar } = require('../middlewares/auth');
const {validarCriacaoCheckoutSession, validarAtualizacaoStatus} = require('../validators/checkoutSessionValidators')

// Rotas protegidas
router.post('/', autenticar, validarCriacaoCheckoutSession, checkoutSessionController.criarCheckoutSession); // Criar sessão de checkout
router.put('/:id', autenticar, validarAtualizacaoStatus, checkoutSessionController.atualizarStatusCheckout); // Atualizar status da sessão de checkout

module.exports = router;