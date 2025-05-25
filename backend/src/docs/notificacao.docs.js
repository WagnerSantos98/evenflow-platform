/**
 * @swagger
 * tags:
 *   name: Notificações
 *   description: Rotas relacionadas a notificações
 */

/**
 * @swagger
 * /api/notificacoes/{usuarioId}:
 *   get:
 *     summary: Lista notificações de um usuário
 *     tags: [Notificações]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de notificações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notificacao'
 *       404:
 *         description: Usuário não encontrado
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Notificacao:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "647e3c4a9b5e1a00456789abc"
 *         usuarioId:
 *           type: string
 *           example: "647e3c1a9b5e1a00456789abd"
 *         titulo:
 *           type: string
 *           example: "Novo evento disponível"
 *         mensagem:
 *           type: string
 *           example: "O evento XYZ terá uma nova data."
 *         data:
 *           type: string
 *           format: date-time
 *           example: "2025-05-25T15:00:00Z"
 *         lido:
 *           type: boolean
 *           example: false
 */
