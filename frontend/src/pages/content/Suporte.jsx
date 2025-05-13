import React, { useState } from 'react';
import {
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Email,
  Phone,
  WhatsApp,
  Chat,
  Schedule,
  Description,
  VideoLibrary,
  School,
  Forum,
  Send,
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

const Suporte = () => {
  const [message, setMessage] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSnackbar({
      open: true,
      message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
      severity: 'success',
    });
    setMessage('');
  };

  const supportChannels = [
    {
      icon: <Email sx={{ fontSize: 30 }} />,
      title: 'E-mail',
      description: 'suporte@evenflow.com.br',
      action: 'Enviar E-mail',
      link: 'mailto:suporte@evenflow.com.br',
    },
    {
      icon: <Phone sx={{ fontSize: 30 }} />,
      title: 'Telefone',
      description: '(11) 9999-9999',
      action: 'Ligar',
      link: 'tel:+5511999999999',
    },
    {
      icon: <WhatsApp sx={{ fontSize: 30 }} />,
      title: 'WhatsApp',
      description: '(11) 9999-9999',
      action: 'Conversar',
      link: 'https://wa.me/5511999999999',
    },
    {
      icon: <Chat sx={{ fontSize: 30 }} />,
      title: 'Chat Online',
      description: 'Segunda a Sexta, 9h às 18h',
      action: 'Iniciar Chat',
      link: '/chat',
    },
  ];

  const resources = [
    {
      icon: <Description sx={{ fontSize: 30 }} />,
      title: 'Base de Conhecimento',
      description: 'Artigos e tutoriais detalhados sobre a plataforma.',
      action: 'Acessar',
      link: '/ajuda/base-conhecimento',
    },
    {
      icon: <VideoLibrary sx={{ fontSize: 30 }} />,
      title: 'Vídeos Tutoriais',
      description: 'Aprenda com nossos vídeos explicativos.',
      action: 'Assistir',
      link: '/ajuda/videos',
    },
    {
      icon: <School sx={{ fontSize: 30 }} />,
      title: 'Treinamentos',
      description: 'Participe de nossos treinamentos online.',
      action: 'Inscrever-se',
      link: '/ajuda/treinamentos',
    },
    {
      icon: <Forum sx={{ fontSize: 30 }} />,
      title: 'Comunidade',
      description: 'Conecte-se com outros organizadores.',
      action: 'Participar',
      link: '/comunidade',
    },
  ];

  const horarios = [
    { dia: 'Segunda a Sexta', horario: '9h às 18h' },
    { dia: 'Sábado', horario: '9h às 13h' },
    { dia: 'Domingo', horario: 'Fechado' },
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
            Suporte
          </Typography>
          <Typography variant="h5" color="textSecondary" paragraph>
            Estamos aqui para ajudar você a ter sucesso com seus eventos
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {supportChannels.map((channel, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <SupportCard>
                <CardContentWrapper>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconWrapper>
                      {channel.icon}
                    </IconWrapper>
                    <Typography variant="h6" component="h3" sx={{ ml: 2 }}>
                      {channel.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="textSecondary" paragraph>
                    {channel.description}
                  </Typography>
                </CardContentWrapper>
                <CardActions>
                  <Button
                    component="a"
                    href={channel.link}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    {channel.action}
                  </Button>
                </CardActions>
              </SupportCard>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom>
                Envie sua Mensagem
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                Preencha o formulário abaixo e nossa equipe entrará em contato o mais breve possível.
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Sua mensagem"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  endIcon={<Send />}
                >
                  Enviar Mensagem
                </Button>
              </form>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Horário de Atendimento
              </Typography>
              <List>
                {horarios.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Schedule />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.dia}
                      secondary={item.horario}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>

            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom>
                Recursos de Ajuda
              </Typography>
              <List>
                {resources.map((resource, index) => (
                  <ListItem
                    key={index}
                    button
                    component="a"
                    href={resource.link}
                  >
                    <ListItemIcon>
                      {resource.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={resource.title}
                      secondary={resource.description}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </motion.div>
  );
};

export default Suporte; 