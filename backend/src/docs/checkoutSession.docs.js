/**
 * @swagger
 * tags:
 *   name: Checkout
 *   description: Rotas para sessões de pagamento Stripe
 */

/**
 * @swagger
 * /api/checkout-sessions:
 *   post:
 *     summary: Cria uma nova sessão de pagamento
 *     tags: [Checkout]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *             required:
 *               - items
 *     responses:
 *       200:
 *         description: Sessão de pagamento criada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sessionId:
 *                   type: string
 *                   example: "cs_test_123456789"
 */
