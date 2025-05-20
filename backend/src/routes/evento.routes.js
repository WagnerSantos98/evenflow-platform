const express = require('express');
const router = express.Router(); 
const eventoController = require('../controllers/eventoController');
const {validarCriacaoEvento, validarConsultaEventos, validarAtualizacaoEvento} = require('../validators/eventoValidators')
const {autenticar} = require('../middlewares/auth');
const { uploadEvento } = require('../middlewares/upload');

// Rotas públicas
router.get('/', ...validarConsultaEventos, eventoController.listarEventos); // Listar eventos
router.get('/:id', eventoController.buscarEventoPorId); 


// Rotas protegidas
router.post('/', autenticar, uploadEvento, ...validarCriacaoEvento, eventoController.criarEvento); // Criar evento
router.put('/:id', autenticar, uploadEvento, ...validarAtualizacaoEvento, eventoController.atualizarEventoPeloId)
router.delete('/:id', autenticar, eventoController.deletarEventoPeloId);

module.exports = router;