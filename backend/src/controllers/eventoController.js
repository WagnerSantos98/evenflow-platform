const { Evento, Local } = require('../models/associations/index');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const { createStripeProduct } = require('../utils/stripe');

class EventoController {

    // Criar eventos
    async criarEvento(request, response){
        try {
            // Capturar erros de validação
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(400).json({ erros: errors.array() });
            }
            const {
                nome,
                descricao,
                data,
                foto,
                precoIngresso,
                ingressosDisponiveis,
                tipoEvento,
                categoria,
                classificacaoEtaria,
                status,
                localId,
            } = request.body;

            //Validando se o usuário está autenticado e autorizado
            if (!request.usuario || !['admin', 'organizador'].includes(request.usuario.nivelAcesso)) {
                return response.status(403).json({ mensagem: 'Você não tem permissão para realizar esta ação' });
            }

             // Verificar se o local existe
            if (localId) {
                const localExistente = await Local.findByPk(localId);
                if (!localExistente) {
                    return response.status(404).send({ mensagem: 'Local não encontrado.' });
                }
            }

            // Verificar se o organizador existe
            // if (organizadorId) {
            //     const orgExistente = await User.findByPk(organizadorId);
            //     if (!orgExistente) {
            //         return response.status(404).send({ mensagem: 'O Organizador deste evento não foi encontrado!' });
            //     }
            // }

            // Verificar duplicidade de evento
            const eventoExistente = await Evento.findOne({
                where: {
                    [Op.and]: [ { localId }, {data}]
                }
            });

            if(eventoExistente){
                return response.status(400).send({mensagem:'Já existe um evento neste local nesta mesma data e horário.'});
            }
            let stripeProduct;
            
            // Se for evento pago, vai gerar um produto na stripe para pode gerar checkout no ingresso
            if(precoIngresso && precoIngresso > 0){

                stripeProduct = await createStripeProduct({
                    name: nome,
                    description: descricao,
                    price: precoIngresso
                })
            }
           
            const novoEvento = await Evento.create({
                nome, 
                descricao, 
                data, 
                foto, 
                precoIngresso, 
                ingressosDisponiveis, 
                tipoEvento, 
                categoria, 
                classificacaoEtaria, 
                status,
                localId,
                organizadorId: request.usuario.id,
                stripeProductId: stripeProduct?.id,
                stripePriceId: stripeProduct?.default_price
            });

            response.status(201).json(novoEvento);

        } catch (error) {
            response.status(500).send({mensagem: 'Houve um erro ao criar o evento: ', erro: error.message})
        }
        
    }

    // Lista eventos cadastrados
    async listarEventos(request, response) {
        try {
            // Capturar erros de validação
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(400).json({ erros: errors.array() });
            }
            const { pagina = 1, limite = 10, nome, data, tipoEvento, categoria, status } = request.query;
            const offset = (pagina - 1) * limite;
    
            const where = {};
            if (nome) where.nome = { [Op.like]: `%${nome}%` };
            if (data) where.data = { [Op.eq]: data };
            if (tipoEvento) where.tipoEvento = tipoEvento;
            if (categoria) where.categoria = categoria;
            if (status) where.status = status;
    
            const { count, rows } = await Evento.findAndCountAll({
                where,
                include: [
                    {
                        model: Local,
                        as: 'local',
                        attributes: ['id', 'nome', 'endereco']
                    }
                ],
                limit: parseInt(limite),
                offset: parseInt(offset),
                order: [['data', 'ASC']]
            });

            response.json({
                total: count,
                pagina: parseInt(pagina),
                totalPaginas: Math.ceil(count / limite),
                eventos: rows
            });
        } catch (error) {
            response.status(500).json({ mensagem: 'Erro ao listar eventos', erro: error.message });
        }
    }
    
    async buscarEventoPorId(request, response){
        try{
            const evento = await Evento.findByPk(request.params.id);

            if(!evento){
                return response.json(404).json({ mensagem: 'Evento não encontrado com esse id!' });
            }

            response.json(evento);
        }catch(error){
            response.status(500).json({ mensagem: 'Houve um Erro ao buscar evento pelo ID', erro: error.message });
        }
    }

    // Atualiza um evento
    async atualizarEventoPeloId(request, response){
        try {

            // Capturar erros de validação
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(400).json({ erros: errors.array() });
            }
 
            const evento= await Evento.findByPk(request.params.id);

            if(!evento ){
                return response.status(404).send({mensagem: 'Evento não encontrado!'});
            }

            // Validando se o usuário é o organizador ou um admin
            if (evento.organizadorId !== request.usuario.id && request.usuario.nivelAcesso !== 'admin') {
                return response.status(403).json({ mensagem: 'Você não tem permissão para atualizar este evento.' });
            }
            const camposPermitidos = ['nome', 'descricao', 'data', 'foto', 'precoIngresso', 'ingressosDisponiveis', 'tipoEvento', 'categoria', 'classificacaoEtaria', 'status'];
            const dadosAtualizados = {};

            camposPermitidos.forEach(campo => {
                if(request.body[campo] != undefined){
                    dadosAtualizados[campo] = request.body[campo];
                }
            });

            // Atualizar o evento com a cláusula where
            await Evento.update(dadosAtualizados, {
                where: { id: request.params.id }
            });

            const eventoAtualizado = await Evento.findByPk(request.params.id);

            response.json(eventoAtualizado);
        }catch(error){
            response.status(500).json({ mensagem: 'Erro ao atualizar o evento', erro: error.message });
        }
    }

    async deletarEventoPeloId(request, response){
    
        try{
            const evento = await Evento.findByPk(request.params.id);

            if(!evento){
                return response.json(404).send({ mensagem: 'Evento não encontrado' });
            }

            //Validando se o usuário está autenticado e autorizado
            if (!request.usuario || !['admin', 'organizador'].includes(request.usuario.nivelAcesso)) {
                return response.status(403).send({ mensagem: 'Você não tem permissão para realizar esta ação' });
            }

            await evento.destroy();
            response.json({ mensagem: 'O Evento foi deletado com sucesso!' });
        }catch(error){
            response.status(500).send({ mensagem: 'Houve um erro ao deletar o evento!', erro: error.message });
        }
    }
    
}

module.exports = new EventoController();