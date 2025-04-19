const { CheckoutSession, Evento, Usuario, Ingresso } = require('../models/associations/index');
const { createStripeCheckout } = require('../utils/stripe');
const { validationResult } = require('express-validator');

class CheckoutSessionController {
    // Criar uma sessão de checkout
    async criarCheckoutSession(req, res) {
        try {
            // Capturar erros de validação
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ erros: errors.array() });
            }

            const { eventoId, quantidade, ingressoId } = req.body;
            const usuarioId = req.usuario.id;

            // Verificar se o evento existe
            const evento = await Evento.findByPk(eventoId);
            if (!evento) {
                return res.status(404).json({ mensagem: 'Evento não encontrado!' });
            }

            // Verificar se há ingressos disponíveis
            if (evento.ingressosDisponiveis < quantidade) {
                return res.status(400).json({ mensagem: 'Ingressos insuficientes disponíveis para este evento.' });
            }

            // Criar a sessão de checkout na Stripe
            const stripeSession = await createStripeCheckout({
                email: req.usuario.email,
                usuarioId,
                priceId: evento.stripePriceId,
                quantity: quantidade
            });

            // Criar a sessão de checkout no banco de dados
            const novaCheckoutSession = await CheckoutSession.create({
                idCheckout: stripeSession.id,
                checkoutUrl: stripeSession.url,
                status: 'pendente',
                valorTotal: evento.precoIngresso * quantidade,
                payment_method_types: stripeSession.payment_method_types.join(", "),
                usuarioId,
                eventoId,
                ingressoId
            });

            res.status(201).json({
                mensagem: 'Sessão de checkout criada com sucesso!',
                checkoutSession: novaCheckoutSession
            });
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao criar sessão de checkout', erro: error.message });
        }
    }

    // Atualizar o status da sessão de checkout
    async atualizarStatusCheckout(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            // Buscar a sessão de checkout
            const checkoutSession = await CheckoutSession.findByPk(id);
            if (!checkoutSession) {
                return res.status(404).json({ mensagem: 'Sessão de checkout não encontrada!' });
            }

            // Atualizar o status
            checkoutSession.status = status;
            await checkoutSession.save();

            res.json({ mensagem: 'Status da sessão de checkout atualizado com sucesso!', checkoutSession });
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao atualizar status da sessão de checkout', erro: error.message });
        }
    }
}

module.exports = new CheckoutSessionController();