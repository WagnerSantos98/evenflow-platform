import React, { useState } from 'react';
import {
  Typography,
  Box,
  Container,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  ExpandMore,
  Search,
  Event,
  Payment,
  AccountCircle,
  Help,
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

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      icon: <Event sx={{ fontSize: 40 }} />,
      title: 'Eventos',
      questions: [
        {
          pergunta: 'Como posso encontrar eventos próximos a mim?',
          resposta: 'Você pode usar nossa página de Eventos e filtrar por localização. Também temos uma seção de "Eventos Próximos" na página inicial que mostra eventos baseados na sua localização.',
        },
        {
          pergunta: 'Como faço para comprar ingressos?',
          resposta: 'Para comprar ingressos, selecione o evento desejado, escolha a quantidade de ingressos e clique em "Comprar Ingresso". Você será redirecionado para o processo de pagamento seguro.',
        },
        {
          pergunta: 'Posso transferir meu ingresso para outra pessoa?',
          resposta: 'Sim, você pode transferir seu ingresso através da sua conta no EvenFlow. Acesse "Meus Ingressos" e selecione a opção de transferência.',
        },
      ],
    },
    {
      icon: <Payment sx={{ fontSize: 40 }} />,
      title: 'Pagamentos',
      questions: [
        {
          pergunta: 'Quais formas de pagamento são aceitas?',
          resposta: 'Aceitamos cartões de crédito, débito, PIX e boleto bancário. Todos os pagamentos são processados de forma segura.',
        },
        {
          pergunta: 'Como solicito reembolso?',
          resposta: 'Você pode solicitar reembolso através da sua conta no EvenFlow, na seção "Meus Ingressos". O reembolso será processado de acordo com a política do evento.',
        },
        {
          pergunta: 'O pagamento é seguro?',
          resposta: 'Sim, utilizamos sistemas de criptografia avançados e seguimos todas as normas de segurança para processamento de pagamentos.',
        },
      ],
    },
    {
      icon: <AccountCircle sx={{ fontSize: 40 }} />,
      title: 'Conta e Perfil',
      questions: [
        {
          pergunta: 'Como crio uma conta?',
          resposta: 'Clique em "Entrar" no menu superior e selecione "Criar Conta". Preencha seus dados e siga as instruções para ativar sua conta.',
        },
        {
          pergunta: 'Esqueci minha senha, o que faço?',
          resposta: 'Na tela de login, clique em "Esqueci minha senha" e siga as instruções para redefinir sua senha através do e-mail cadastrado.',
        },
        {
          pergunta: 'Como atualizo meus dados pessoais?',
          resposta: 'Acesse sua conta, vá em "Configurações" e selecione "Dados Pessoais". Lá você pode atualizar suas informações.',
        },
      ],
    },
    {
      icon: <Help sx={{ fontSize: 40 }} />,
      title: 'Geral',
      questions: [
        {
          pergunta: 'Como posso entrar em contato com o suporte?',
          resposta: 'Você pode entrar em contato através do formulário na página de Contato, por e-mail ou pelo chat online disponível em horário comercial.',
        },
        {
          pergunta: 'O EvenFlow está disponível em outros idiomas?',
          resposta: 'Atualmente, o EvenFlow está disponível em português e inglês. Você pode alterar o idioma nas configurações da sua conta.',
        },
        {
          pergunta: 'Como posso me tornar um organizador de eventos?',
          resposta: 'Acesse a seção "Para Organizadores" no menu e clique em "Seja Parceiro". Preencha o formulário e nossa equipe entrará em contato.',
        },
      ],
    },
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.pergunta.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.resposta.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg">
        <Box sx={{ my: 8, textAlign: 'center' }}>
          <Typography variant="h1" component="h1" gutterBottom>
            Perguntas Frequentes
          </Typography>
          <Typography variant="h5" color="textSecondary" paragraph>
            Encontre respostas para as dúvidas mais comuns
          </Typography>
          
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar perguntas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {filteredCategories.map((category, index) => (
          <Section key={index} elevation={3}>
            <IconWrapper>
              {category.icon}
              <Typography variant="h4" component="h2">
                {category.title}
              </Typography>
            </IconWrapper>
            {category.questions.map((item, qIndex) => (
              <StyledAccordion key={qIndex}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6">{item.pergunta}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{item.resposta}</Typography>
                </AccordionDetails>
              </StyledAccordion>
            ))}
          </Section>
        ))}
      </Container>
    </motion.div>
  );
};

export default FAQ; 