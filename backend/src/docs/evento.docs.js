/**
 * @swagger
 * tags:
 *   name: Eventos
 *   description: Gerenciamento de eventos
 */

/**
 * @swagger
 * /api/eventos:
 *   get:
 *     summary: Lista todos os eventos
 *     tags: [Eventos]
 *     responses:
 *       200:
 *         description: Lista de eventos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 64a5f7e98a9c441d6c2a7f01
 *                   titulo:
 *                     type: string
 *                     example: Show de Rock
 *                   descricao:
 *                     type: string
 *                     example: Um grande show de rock
 *                   data:
 *                     type: string
 *                     format: date
 *                     example: 2025-07-01
 */

/**
 * @swagger
 * /api/eventos/{id}:
 *   get:
 *     summary: Retorna um evento pelo ID
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Dados do evento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 64a5f7e98a9c441d6c2a7f01
 *                 titulo:
 *                   type: string
 *                   example: Show de Rock
 *                 descricao:
 *                   type: string
 *                   example: Um grande show de rock
 *                 data:
 *                   type: string
 *                   format: date
 *                   example: 2025-07-01
 *       404:
 *         description: Evento não encontrado
 */

/**
 * @swagger
 * /api/eventos:
 *   post:
 *     summary: Cria um novo evento
 *     tags: [Eventos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descricao
 *               - data
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Show de Rock
 *               descricao:
 *                 type: string
 *                 example: Um grande show de rock
 *               data:
 *                 type: string
 *                 format: date
 *                 example: 2025-07-01
 *     responses:
 *       201:
 *         description: Evento criado com sucesso
 *       400:
 *         description: Dados inválidos
 */

/**
 * @swagger
 * /api/eventos/{id}:
 *   put:
 *     summary: Atualiza um evento pelo ID
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Show Atualizado
 *               descricao:
 *                 type: string
 *                 example: Show de rock atualizado
 *               data:
 *                 type: string
 *                 format: date
 *                 example: 2025-07-02
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Evento não encontrado
 */

/**
 * @swagger
 * /api/eventos/{id}:
 *   delete:
 *     summary: Remove um evento pelo ID
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do evento
 *     responses:
 *       204:
 *         description: Evento removido com sucesso
 *       404:
 *         description: Evento não encontrado
 */
