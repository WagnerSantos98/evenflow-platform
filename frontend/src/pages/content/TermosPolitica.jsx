import React from 'react';
import {
  Typography,
  Box,
  Container,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  ExpandMore,
  Security,
  Gavel,
  Cookie,
} from '@mui/icons-material';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled(Paper)`
  padding: 2rem;
  margin-bottom: 2rem;
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const StyledAccordion = styled(Accordion)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  margin-bottom: 1rem;
  
  &:before {
    display: none;
  }
`;

const IconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  svg {
    margin-right: 1rem;
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const TermosPoliticas = () => {
  const termosUso = [
    {
      titulo: 'Aceitação dos Termos',
      conteudo: 'Ao acessar e usar o EvenFlow, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis, e reconhece que é responsável pelo cumprimento de quaisquer leis locais aplicáveis.',
    },
    {
      titulo: 'Conta do Usuário',
      conteudo: 'Para usar certos recursos do EvenFlow, você precisará criar uma conta. Você é responsável por manter a confidencialidade de sua conta e senha, e por restringir o acesso ao seu computador. Você concorda em aceitar a responsabilidade por todas as atividades que ocorram em sua conta.',
    },
    {
      titulo: 'Conteúdo do Usuário',
      conteudo: 'Você mantém todos os direitos sobre qualquer conteúdo que enviar, postar ou exibir no EvenFlow. Ao enviar conteúdo, você concede ao EvenFlow uma licença mundial, não exclusiva, isenta de royalties para usar, reproduzir, modificar, adaptar, publicar, traduzir e distribuir seu conteúdo.',
    },
    {
      titulo: 'Conduta do Usuário',
      conteudo: 'Você concorda em não usar o EvenFlow para: (a) violar qualquer lei aplicável; (b) infringir os direitos de propriedade intelectual de terceiros; (c) enviar spam ou mensagens não solicitadas; (d) interferir com o funcionamento adequado do serviço.',
    },
  ];

  const politicaPrivacidade = [
    {
      titulo: 'Coleta de Informações',
      conteudo: 'Coletamos informações que você nos fornece diretamente, como nome, endereço de e-mail, informações de pagamento e qualquer outra informação que você opte por fornecer. Também coletamos informações automaticamente sobre seu uso do serviço.',
    },
    {
      titulo: 'Uso de Informações',
      conteudo: 'Usamos as informações coletadas para: fornecer, manter e melhorar nossos serviços; processar transações; enviar notificações técnicas, atualizações, alertas de segurança e mensagens de suporte; responder a seus comentários e perguntas.',
    },
    {
      titulo: 'Compartilhamento de Informações',
      conteudo: 'Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para fornecer nossos serviços, cumprir obrigações legais, proteger nossos direitos ou com seu consentimento.',
    },
    {
      titulo: 'Segurança dos Dados',
      conteudo: 'Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger suas informações pessoais contra acesso, uso ou divulgação não autorizados.',
    },
  ];

  const politicaCookies = [
    {
      titulo: 'O que são Cookies',
      conteudo: 'Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo quando você visita nosso site. Eles nos ajudam a fazer o site funcionar corretamente e a melhorar nossos serviços.',
    },
    {
      titulo: 'Tipos de Cookies',
      conteudo: 'Utilizamos cookies essenciais para o funcionamento do site, cookies de desempenho para analisar como os visitantes usam nosso site, cookies de funcionalidade para lembrar suas preferências e cookies de publicidade para mostrar anúncios relevantes.',
    },
    {
      titulo: 'Gerenciamento de Cookies',
      conteudo: 'Você pode controlar e/ou excluir cookies conforme desejar. Você pode excluir todos os cookies que já estão no seu computador e pode configurar a maioria dos navegadores para impedir que eles sejam colocados.',
    },
    {
      titulo: 'Alterações na Política',
      conteudo: 'Podemos atualizar nossa política de cookies de tempos em tempos. Recomendamos que você revise esta página periodicamente para se manter informado sobre como estamos usando cookies.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg">
        <Box sx={{ my: 8, textAlign: 'center' }}>
          <Typography variant="h1" component="h1" gutterBottom>
            Termos e Políticas
          </Typography>
          <Typography variant="h5" color="textSecondary" paragraph>
            Conheça nossos termos de uso, política de privacidade e política de cookies
          </Typography>
        </Box>

        <Section elevation={3}>
          <IconWrapper>
            <Gavel sx={{ fontSize: 40 }} />
            <Typography variant="h4" component="h2">
              Termos de Uso
            </Typography>
          </IconWrapper>
          {termosUso.map((item, index) => (
            <StyledAccordion key={index}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">{item.titulo}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.conteudo}</Typography>
              </AccordionDetails>
            </StyledAccordion>
          ))}
        </Section>

        <Section elevation={3}>
          <IconWrapper>
            <Security sx={{ fontSize: 40 }} />
            <Typography variant="h4" component="h2">
              Política de Privacidade
            </Typography>
          </IconWrapper>
          {politicaPrivacidade.map((item, index) => (
            <StyledAccordion key={index}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">{item.titulo}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.conteudo}</Typography>
              </AccordionDetails>
            </StyledAccordion>
          ))}
        </Section>

        <Section elevation={3}>
          <IconWrapper>
            <Cookie sx={{ fontSize: 40 }} />
            <Typography variant="h4" component="h2">
              Política de Cookies
            </Typography>
          </IconWrapper>
          {politicaCookies.map((item, index) => (
            <StyledAccordion key={index}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">{item.titulo}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.conteudo}</Typography>
              </AccordionDetails>
            </StyledAccordion>
          ))}
        </Section>
      </Container>
    </motion.div>
  );
};

export default TermosPoliticas; 