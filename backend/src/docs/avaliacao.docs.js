/**
 * @swagger
 * tags:
 *   name: Avaliações
 *   description: Rotas relacionadas a avaliações
 */

/**
 * @swagger
 * /api/avaliacoes:
 *   post:
 *     summary: Cria uma nova avaliação
 *     tags: [Avaliações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AvaliacaoCreate'
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avaliacao'
 * 
 * /api/avaliacoes/evento/{idEvento}:
 *   get:
 *     summary: Lista avaliações de um evento específico
 *     tags: [Avaliações]
 *     parameters:
 *       - in: path
 *         name: idEvento
 *         required: true
 *         description: ID do evento
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de avaliações do evento
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Avaliacao'
 *       404:
 *         description: Evento não encontrado
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Avaliacao:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "647e3c4a9b5e1a00987654321"
 *         eventoId:
 *           type: string
 *           example: "647e3c1a9b5e1a00987654322"
 *         usuarioId:
 *           type: string
 *           example: "647e3c1a9b5e1a00987654323"
 *         nota:
 *           type: integer
 *           example: 4
 *         comentario:
 *           type: string
 *           example: "Ótimo evento!"
 *         data:
 *           type: string
 *           format: date-time
 *           example: "2025-05-25T12:00:00Z"
 *     AvaliacaoCreate:
 *       type: object
 *       required:
 *         - eventoId
 *         - usuarioId
 *         - nota
 *       properties:
 *         eventoId:
 *           type: string
 *           example: "647e3c1a9b5e1a00987654322"
 *         usuarioId:
 *           type: string
 *           example: "647e3c1a9b5e1a00987654323"
 *         nota:
 *           type: integer
 *           example: 4
 *         comentario:
 *           type: string
 *           example: "Ótimo evento!"
 */
