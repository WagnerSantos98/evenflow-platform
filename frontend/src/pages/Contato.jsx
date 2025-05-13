import React, { useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Container,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  AccessTime,
} from '@mui/icons-material';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ContactCard = styled(Paper)`
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: ${({ theme }) => theme.palette.background.paper};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
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

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: '',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aqui você implementaria a lógica para enviar o formulário
      console.log('Form data:', formData);
      setSnackbar({
        open: true,
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
        severity: 'success',
      });
      setFormData({
        nome: '',
        email: '',
        assunto: '',
        mensagem: '',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erro ao enviar mensagem. Por favor, tente novamente.',
        severity: error
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const contactInfo = [
    {
      icon: <Email sx={{ fontSize: 30 }} />,
      title: 'Email',
      content: 'contato@evenflow.com.br',
      link: `mailto:${import.meta.env.VITE_APP_EMAIL}`,
    },
    {
      icon: <Phone sx={{ fontSize: 30 }} />,
      title: 'Telefone',
      content: '(11)99999-9999',
      link: `tel:${import.meta.env.VITE_APP_PHONE}`,
    },
    {
      icon: <LocationOn sx={{ fontSize: 30 }} />,
      title: 'Endereço',
      content: 'São Paulo, SP',
      link: `https://maps.google.com/?q=${encodeURIComponent(import.meta.env.VITE_APP_ADDRESS)}`,
    },
    {
      icon: <AccessTime sx={{ fontSize: 30 }} />,
      title: 'Horário de Atendimento',
      content: 'Segunda a Sexta: 9h às 18h',
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
            Entre em Contato
          </Typography>
          <Typography variant="h5" color="textSecondary" paragraph>
            Estamos aqui para ajudar! Entre em contato conosco.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ContactCard elevation={3}>
                <IconWrapper>
                  {info.icon}
                </IconWrapper>
                <Typography variant="h6" gutterBottom>
                  {info.title}
                </Typography>
                {info.link ? (
                  <Button
                    href={info.link}
                    target={info.title === 'Endereço' ? '_blank' : undefined}
                    rel={info.title === 'Endereço' ? 'noopener noreferrer' : undefined}
                    color="primary"
                  >
                    {info.content}
                  </Button>
                ) : (
                  <Typography variant="body1" color="textSecondary">
                    {info.content}
                  </Typography>
                )}
              </ContactCard>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ my: 8 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
              Envie uma Mensagem
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Assunto"
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mensagem"
                    name="mensagem"
                    multiline
                    rows={4}
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                  >
                    Enviar Mensagem
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </motion.div>
  );
};

export default Contato; 