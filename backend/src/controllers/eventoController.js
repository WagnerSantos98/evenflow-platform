const { Evento, Local, GaleriaEvento } = require('../models/associations/index');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const { createStripeProduct } = require('../services/stripeService');
const s3Service = require('../services/s3Service');

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
                precoIngresso,
                ingressosDisponiveis,
                tipoEvento,
                categoria,
                classificacaoEtaria,
                status,
                localId,
                organizadorId: request.usuario.id,
                stripeProductId: stripeProduct?.id || null,
                stripePriceId: stripeProduct?.default_price || null
            });

            //Upload da capa
            const capaFile = request.files?.capa?.[0];
            if (!capaFile || !capaFile.buffer || !capaFile.mimetype.startsWith('image/')) {
                return response.status(400).json({ mensagem: 'Imagem de capa inválida ou não enviada.' });
            }

            const capaData = {
                name: capaFile.originalname,
                data: capaFile.buffer,
                mimetype: capaFile.mimetype
            };

            const fotoCapa = await s3Service.uploadImagemEvento(novoEvento.id, capaData, false);
            await novoEvento.update({ foto: fotoCapa });

            //Upload da galeria
            const fotosGaleria = [];
            if (request.files?.galeria?.length > 0) {
                for (const galeriaFile of request.files.galeria) {
                    if (galeriaFile.mimetype?.startsWith('image/')) {
                        const galeriaData = {
                            name: galeriaFile.originalname,
                            data: galeriaFile.buffer,
                            mimetype: galeriaFile.mimetype
                        };
                        const fotoUrl = await s3Service.uploadImagemEvento(novoEvento.id, galeriaData, true);
                        fotosGaleria.push(fotoUrl);
                    }
                }

                await Promise.all(fotosGaleria.map(url =>
                    GaleriaEvento.create({
                        eventoId: novoEvento.id,
                        urlImagem: url
                    })
                ));
            }
            
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
                        model: GaleriaEvento,
                        as: 'galeria',
                        attributes: ['id', 'urlImagem']
                    },
                    {
                        model: Local,
                        as: 'local',
                        attributes: ['id', 'nome', 'endereco']
                    },
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
            const evento = await Evento.findByPk(request.params.id, {
                include:[
                    {
                        model: GaleriaEvento,
                        as: 'galeria',
                        attributes: ['id', 'urlImagem']
                    },
                    {
                        model: Local,
                        as: 'local',
                        attributes: ['id', 'nome', 'endereco']
                    }
                    
                ]
            });

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

            //Se houver arquivo, fazer upload  para S3
            if(request.file){
                if(!request.file.mimetype.startsWith('image/')){
                    return response.status(400).json({ mensagem: 'o arquivo enviado não é uma imagem válida' });
                }
            
                const file = {
                    name: request.file.originalname,
                    data: request.file.buffer,
                    mimetype: request.file.mimetype
                };
            
                foto = await s3Service.uploadImagemEvento(evento.id, file);
                
            
                //Atualizar usuário com a URL da imagem
                await evento.update({ foto });
            }

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

            //Deletar registros da galeria vinculados ao evento
            await GaleriaEvento.destroy({ where: { eventoId: evento.id }});

            //Deletar para do evento no S3
            await s3Service.deletarPastaEvento(evento.id);

            await evento.destroy();
            response.json({ mensagem: 'O Evento foi deletado com sucesso!' });
        }catch(error){
            response.status(500).send({ mensagem: 'Houve um erro ao deletar o evento!', erro: error.message });
        }
    }
    
}

module.exports = new EventoController();