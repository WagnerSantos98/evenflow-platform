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
} from '@mui/material';
import {
  Support,
  Email,
  Phone,
  Chat,
  VideoLibrary,
  Book,
  School,
  Forum,
} from '@mui/icons-material';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SupportCard = styled(Card)`
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
  align-items: center;
  text-align: center;
`;

const IconWrapper = styled(Box)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: white;
`;

const CentralAjuda = () => {
  const supportOptions = [
    {
      icon: <Email sx={{ fontSize: 40 }} />,
      title: 'E-mail',
      description: 'Envie suas dúvidas por e-mail e receba uma resposta em até 24 horas.',
      action: 'Enviar E-mail',
      link: 'mailto:suporte@evenflow.com.br',
    },
    {
      icon: <Phone sx={{ fontSize: 40 }} />,
      title: 'Telefone',
      description: 'Atendimento telefônico de segunda a sexta, das 9h às 18h.',
      action: 'Ligar Agora',
      link: 'tel:+5511999999999',
    },
    {
      icon: <Chat sx={{ fontSize: 40 }} />,
      title: 'Chat Online',
      description: 'Converse em tempo real com nossa equipe de suporte.',
      action: 'Iniciar Chat',
      link: '/chat',
    },
  ];

  const resources = [
    {
      icon: <VideoLibrary sx={{ fontSize: 40 }} />,
      title: 'Tutoriais em Vídeo',
      description: 'Aprenda a usar todas as funcionalidades do EvenFlow com nossos tutoriais em vídeo.',
      action: 'Ver Tutoriais',
      link: '/tutoriais',
    },
    {
      icon: <Book sx={{ fontSize: 40 }} />,
      title: 'Base de Conhecimento',
      description: 'Artigos detalhados sobre todos os aspectos da plataforma.',
      action: 'Explorar Base',
      link: '/base-conhecimento',
    },
    {
      icon: <School sx={{ fontSize: 40 }} />,
      title: 'Treinamentos',
      description: 'Participe de webinars e treinamentos para organizadores de eventos.',
      action: 'Ver Treinamentos',
      link: '/treinamentos',
    },
    {
      icon: <Forum sx={{ fontSize: 40 }} />,
      title: 'Comunidade',
      description: 'Conecte-se com outros usuários e compartilhe experiências.',
      action: 'Acessar Comunidade',
      link: '/comunidade',
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
            Central de Ajuda
          </Typography>
          <Typography variant="h5" color="textSecondary" paragraph>
            Estamos aqui para ajudar você a aproveitar ao máximo o EvenFlow
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Support sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
            <Typography variant="h4" component="h2">
              Canais de Suporte
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {supportOptions.map((option, index) => (
              <Grid item xs={12} md={4} key={index}>
                <SupportCard>
                  <CardContentWrapper>
                    <IconWrapper>
                      {option.icon}
                    </IconWrapper>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {option.title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                      {option.description}
                    </Typography>
                  </CardContentWrapper>
                  <CardActions>
                    <Button
                      component={option.link.startsWith('/') ? RouterLink : 'a'}
                      href={option.link.startsWith('/') ? undefined : option.link}
                      to={option.link.startsWith('/') ? option.link : undefined}
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      {option.action}
                    </Button>
                  </CardActions>
                </SupportCard>
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Book sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
            <Typography variant="h4" component="h2">
              Recursos e Materiais
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {resources.map((resource, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <SupportCard>
                  <CardContentWrapper>
                    <IconWrapper>
                      {resource.icon}
                    </IconWrapper>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {resource.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {resource.description}
                    </Typography>
                  </CardContentWrapper>
                  <CardActions>
                    <Button
                      component={RouterLink}
                      to={resource.link}
                      variant="outlined"
                      color="primary"
                      fullWidth
                    >
                      {resource.action}
                    </Button>
                  </CardActions>
                </SupportCard>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </motion.div>
  );
};

export default CentralAjuda; 