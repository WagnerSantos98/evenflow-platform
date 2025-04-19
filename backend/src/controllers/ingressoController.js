const { Ingresso, Evento, Usuário } = require('../models/associations/index');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { validarIngresso } = require('../validators/ingressoValidators');
const { validationResult } = require('express-validator');

class IngressoController{
    //Assíncrono: Criar novo ingresso
    async criarIngresso(req, res){
        try{
            //Validação dos dados do ingresso
            await Promise.all(validarIngresso.map(validation => validation.run(req)));
            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return res.status(400).json({ errors: errors.array() });
            }

            const { eventoId, quantidade, metodoPagamento, tipo, preco } = req.body;
            const usuarioId = req.usuario.id;

            //Verificação de existência de evento e se está ativo
            const evento = await Evento.findByPk(eventoId);
            if(!evento){
                return res.status(404).json({ mensagem: 'Evento não encontrado' });
            }

            // if(evento.status != 'ativo'){
            //     return res.status(400).json({ mensagem: 'Evento não está disponível para venda de ingressos' });
            // }
            
            //Criar o ingresso
            const ingresso = await Ingresso.create({
                preco,
                tipo,
                eventoId,
                compradorId: usuarioId,
                quantidade,
                metodoPagamento,
                status: 'pendente'
            });

            //Atualizar a quantidade de ingrssos disponíveis
            await evento.update({
                ingressosDisponiveis: evento.ingressosDisponiveis - quantidade
            });

            res.status(201).json(ingresso);
        }catch(error){  
            res.status(500).json({ mensagem: 'Erro ao criar ingresso', erro: error.message });
        }
    }
}

module.exports = new IngressoController();