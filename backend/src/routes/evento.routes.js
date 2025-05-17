const express = require('express');
const router = express.Router(); 
const eventoController = require('../controllers/eventoController');
const {validarCriacaoEvento, validarConsultaEventos, validarAtualizacaoEvento} = require('../validators/eventoValidators')
const {autenticar} = require('../middlewares/auth');
const { upload } = require('../middlewares/upload');

// Rotas públicas
router.get('/', validarConsultaEventos, eventoController.listarEventos); // Listar eventos
router.get('/:id', eventoController.buscarEventoPorId); 


// Rotas protegidas
router.post('/', autenticar, validarCriacaoEvento, upload, eventoController.criarEvento); // Criar evento
router.put('/:id', autenticar, validarAtualizacaoEvento, upload, eventoController.atualizarEventoPeloId)
router.delete('/:id', autenticar, eventoController.deletarEventoPeloId);

module.exports = router;