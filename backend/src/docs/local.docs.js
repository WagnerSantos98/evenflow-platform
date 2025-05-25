/**
 * @swagger
 * tags:
 *   name: Locais
 *   description: Gerenciamento de locais de eventos
 */

/**
 * @swagger
 * /api/locais:
 *   get:
 *     summary: Lista todos os locais
 *     tags: [Locais]
 *     responses:
 *       200:
 *         description: Lista de locais
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 64a5f7e98a9c441d6c2a7f99
 *                   nome:
 *                     type: string
 *                     example: Teatro Municipal
 *                   endereco:
 *                     type: string
 *                     example: Rua das Flores, 123
 */

/**
 * @swagger
 * /api/locais/{id}:
 *   get:
 *     summary: Retorna um local pelo ID
 *     tags: [Locais]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do local
 *     responses:
 *       200:
 *         description: Dados do local
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 64a5f7e98a9c441d6c2a7f99
 *                 nome:
 *                   type: string
 *                   example: Teatro Municipal
 *                 endereco:
 *                   type: string
 *                   example: Rua das Flores, 123
 *       404:
 *         description: Local não encontrado
 */

/**
 * @swagger
 * /api/locais:
 *   post:
 *     summary: Cria um novo local
 *     tags: [Locais]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - endereco
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Teatro Municipal
 *               endereco:
 *                 type: string
 *                 example: Rua das Flores, 123
 *     responses:
 *       201:
 *         description: Local criado com sucesso
 *       400:
 *         description: Dados inválidos
 */

/**
 * @swagger
 * /api/locais/{id}:
 *   put:
 *     summary: Atualiza um local pelo ID
 *     tags: [Locais]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do local
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Teatro Atualizado
 *               endereco:
 *                 type: string
 *                 example: Rua das Flores, 456
 *     responses:
 *       200:
 *         description: Local atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Local não encontrado
 */

/**
 * @swagger
 * /api/locais/{id}:
 *   delete:
 *     summary: Remove um local pelo ID
 *     tags: [Locais]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do local
 *     responses:
 *       204:
 *         description: Local removido com sucesso
 *       404:
 *         description: Local não encontrado
 */
