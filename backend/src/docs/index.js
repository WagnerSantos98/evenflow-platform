require('./auth.docs');
require('./usuario.docs');
require('./local.docs');
require('./evento.docs');
require('./ingresso.docs');
require('./avaliacao.docs');
require('./notificacao.docs');
require('./checkoutSession.docs');
require('./webhook.docs');


/**
 * @swagger
 * tags:
 *   - name: Autenticação
 *     description: Rotas de login, registro e autenticação
 *   - name: Usuários
 *     description: Gerenciamento de usuários
 *   - name: Locais
 *     description: Gerenciamento de locais de eventos
 *   - name: Eventos
 *     description: Criação e listagem de eventos
 *   - name: Ingressos
 *     description: Compra e gerenciamento de ingressos
 *   - name: Avaliações
 *     description: Avaliações de eventos pelos usuários
 *   - name: Notificações
 *     description: Notificações relacionadas a eventos
 *   - name: Checkout
 *     description: Sessões de pagamento via Stripe
 *   - name: Webhook
 *     description: Comunicação de eventos da Stripe
 */