/**
 * @swagger
 * tags:
 *   name: Webhook
 *   description: Rota para receber eventos do Stripe
 */

/**
 * @swagger
 * /api/webhook:
 *   post:
 *     summary: Recebe eventos do webhook do Stripe
 *     tags: [Webhook]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Evento recebido com sucesso
 */
