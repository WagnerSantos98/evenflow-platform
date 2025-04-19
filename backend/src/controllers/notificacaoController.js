const { now } = require('moment');
const { Notificacao, Usuario } = require('../models/associations/index');
const { validationResult } = require('express-validator');

class NotificacaoController {
    // Criar uma notificação
    async criarNotificacao(req, res) {
        try {
            const { nome, icone, texto, usuarioId } = req.body;
            // Capturar erros de validação
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return response.status(400).json({ erros: errors.array() });
            }

            // Verificar se o usuário existe
            const usuario = await Usuario.findByPk(usuarioId);
            if (!usuario) {
                return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
            }
            let dataCriacao = new Date().toString().replace(/T/, ':').replace(/\.\w*/, '');
            // Criar a notificação
            const novaNotificacao = await Notificacao.create({
                nome,
                icone,
                texto,
                usuarioId,
                dataCriacao: dataCriacao
            });

            res.status(201).json(novaNotificacao);
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao criar notificação', erro: error.message });
        }
    }

    // Listar notificações de um usuário
    async listarNotificacoesPorUsuario(req, res) {
        try {
            const { usuarioId } = req.params;
            // Capturar erros de validação
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return response.status(400).json({ erros: errors.array() });
            }

            // Verificar se o usuário existe
            const usuario = await Usuario.findByPk(usuarioId);
            if (!usuario) {
                return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
            }

            // Buscar notificações do usuário
            const notificacoes = await Notificacao.findAll({
                where: { usuarioId },
                order: [['createdAt', 'DESC']]
            });

            res.status(200).json(notificacoes);
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao listar notificações', erro: error.message });
        }
    }

    // Marcar uma notificação como lida
    async marcarComoLida(req, res) {
        try {
            const { id } = req.params;
            // Capturar erros de validação
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return response.status(400).json({ erros: errors.array() });
            }

            // Buscar a notificação
            const notificacao = await Notificacao.findByPk(id);
            if (!notificacao) {
                return res.status(404).json({ mensagem: 'Notificação não encontrada!' });
            }

            // Atualizar o status de leitura
            notificacao.foiLidoPeloUsuario = true;
            await notificacao.save();

            res.status(200).json({ mensagem: 'Notificação marcada como lida!', notificacao });
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao marcar notificação como lida', erro: error.message });
        }
    }

    // Deletar uma notificação
    async deletarNotificacao(req, res) {
        try {
            const { id } = req.params;
            // Capturar erros de validação
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return response.status(400).json({ erros: errors.array() });
            }

            // Buscar a notificação
            const notificacao = await Notificacao.findByPk(id);
            if (!notificacao) {
                return res.status(404).json({ mensagem: 'Notificação não encontrada!' });
            }

            // Deletar a notificação
            await notificacao.destroy();
            res.status(200).json({ mensagem: 'Notificação deletada com sucesso!' });
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao deletar notificação', erro: error.message });
        }
    }
}

module.exports = new NotificacaoController();