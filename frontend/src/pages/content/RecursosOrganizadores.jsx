import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Paper,
  Chip,
} from '@mui/material';
import {
  Analytics,
  Campaign,
  Payment,
  Security,
  Support,
  Event,
  People,
} from '@mui/icons-material';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ResourceCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.background.paper};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardContentWrapper = styled(CardContent)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const IconWrapper = styled(Box)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: white;
`;

const RecursosOrganizadores = () => {
  const recursos = [
    {
      icon: <Analytics sx={{ fontSize: 30 }} />,
      title: 'Dashboard Analítico',
      description: 'Acompanhe métricas importantes como vendas, engajamento e satisfação dos participantes.',
      features: ['Relatórios em tempo real', 'Análise de público', 'Métricas de vendas'],
      action: 'Acessar Dashboard',
      link: '/dashboard',
    },
    {
      icon: <Campaign sx={{ fontSize: 30 }} />,
      title: 'Ferramentas de Marketing',
      description: 'Promova seus eventos com ferramentas integradas de marketing digital.',
      features: ['E-mail marketing', 'Redes sociais', 'Anúncios personalizados'],
      action: 'Explorar Ferramentas',
      link: '/marketing',
    },
    {
      icon: <Payment sx={{ fontSize: 30 }} />,
      title: 'Gestão Financeira',
      description: 'Gerencie pagamentos, reembolsos e relatórios financeiros de forma integrada.',
      features: ['Controle de ingressos', 'Gestão de reembolsos', 'Relatórios financeiros'],
      action: 'Ver Financeiro',
      link: '/financeiro',
    },
    {
      icon: <Security sx={{ fontSize: 30 }} />,
      title: 'Segurança e Compliance',
      description: 'Ferramentas para garantir a segurança e conformidade dos seus eventos.',
      features: ['LGPD', 'Segurança de dados', 'Certificações'],
      action: 'Saiba Mais',
      link: '/seguranca',
    },
    
    {
      icon: <Support sx={{ fontSize: 30 }} />,
      title: 'Suporte Especializado',
      description: 'Acesso a uma equipe dedicada para ajudar na organização dos seus eventos.',
      features: ['Suporte prioritário', 'Consultoria', 'Treinamentos'],
      action: 'Falar com Especialista',
      link: '/suporte',
    },
    {
      icon: <Event sx={{ fontSize: 30 }} />,
      title: 'Checklist de Eventos',
      description: 'Listas de verificação e templates para planejamento completo de eventos.',
      features: ['Templates', 'Checklists', 'Cronogramas'],
      action: 'Ver Templates',
      link: '/templates',
    },
    {
      icon: <People sx={{ fontSize: 30 }} />,
      title: 'Gestão de Participantes',
      description: 'Ferramentas para gerenciar inscrições, credenciamento e experiência dos participantes.',
      features: ['Credenciamento', 'Badges', 'Certificados'],
      action: 'Gerenciar Participantes',
      link: '/participantes',
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
            Recursos para Organizadores
          </Typography>
          <Typography variant="h5" color="textSecondary" paragraph>
            Ferramentas e materiais para impulsionar seus eventos
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {recursos.map((recurso, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ResourceCard>
                <CardContentWrapper>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconWrapper>
                      {recurso.icon}
                    </IconWrapper>
                    <Typography variant="h5" component="h3" sx={{ ml: 2 }}>
                      {recurso.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="textSecondary" paragraph>
                    {recurso.description}
                  </Typography>
                  <Box sx={{ mt: 'auto', mb: 2 }}>
                    {recurso.features.map((feature, idx) => (
                      <Chip
                        key={idx}
                        label={feature}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                </CardContentWrapper>
                <CardActions>
                  <Button
                    component={RouterLink}
                    to={recurso.link}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    {recurso.action}
                  </Button>
                </CardActions>
              </ResourceCard>
            </Grid>
          ))}
        </Grid>

        <Paper elevation={3} sx={{ p: 4, mt: 6, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Comece a Organizar Seus Eventos
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            Aproveite todas as ferramentas e recursos do EvenFlow para criar eventos incríveis
          </Typography>
          <Button
            component={RouterLink}
            to="/seja-parceiro"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
          >
            Seja um Organizador
          </Button>
        </Paper>
      </Container>
    </motion.div>
  );
};

export default RecursosOrganizadores; 