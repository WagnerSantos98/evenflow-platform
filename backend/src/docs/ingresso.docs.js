/**
 * @swagger
 * tags:
 *   name: Ingressos
 *   description: Rotas relacionadas a ingressos
 */

/**
 * @swagger
 * /api/ingressos:
 *   get:
 *     summary: Lista todos os ingressos
 *     tags: [Ingressos]
 *     responses:
 *       200:
 *         description: Lista de ingressos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingresso'
 * 
 *   post:
 *     summary: Cria um novo ingresso
 *     tags: [Ingressos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IngressoCreate'
 *     responses:
 *       201:
 *         description: Ingresso criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingresso'
 * 
 * /api/ingressos/{id}:
 *   get:
 *     summary: Retorna detalhes de um ingresso pelo ID
 *     tags: [Ingressos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do ingresso
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes do ingresso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingresso'
 *       404:
 *         description: Ingresso não encontrado
 * 
 *   delete:
 *     summary: Exclui um ingresso pelo ID
 *     tags: [Ingressos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do ingresso
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Ingresso excluído com sucesso
 *       404:
 *         description: Ingresso não encontrado
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Ingresso:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "647e3c4a9b5e1a001234abcd"
 *         eventoId:
 *           type: string
 *           example: "647e3c1a9b5e1a0012341234"
 *         tipo:
 *           type: string
 *           example: "VIP"
 *         preco:
 *           type: number
 *           example: 150.00
 *         status:
 *           type: string
 *           example: "disponível"
 *         dataCompra:
 *           type: string
 *           format: date-time
 *           example: "2025-05-25T10:00:00Z"
 *     IngressoCreate:
 *       type: object
 *       required:
 *         - eventoId
 *         - tipo
 *         - preco
 *       properties:
 *         eventoId:
 *           type: string
 *           example: "647e3c1a9b5e1a0012341234"
 *         tipo:
 *           type: string
 *           example: "VIP"
 *         preco:
 *           type: number
 *           example: 150.00
 */
