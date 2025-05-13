import React, { useState } from 'react';
import {
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Business,
  Event,
  Payment,
  Support,
  CheckCircle,
} from '@mui/icons-material';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const BenefitCard = styled(Paper)`
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

const steps = ['Informações Básicas', 'Dados da Empresa', 'Confirmação'];

const SejaParceiro = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipoEmpresa: '',
    nomeEmpresa: '',
    cnpj: '',
    site: '',
    redesSociais: '',
    experiencia: '',
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpa o erro do campo quando ele é alterado
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    if (activeStep === 0) {
      if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
      if (!formData.email) newErrors.email = 'E-mail é obrigatório';
      if (!formData.telefone) newErrors.telefone = 'Telefone é obrigatório';
    } else if (activeStep === 1) {
      if (!formData.tipoEmpresa) newErrors.tipoEmpresa = 'Tipo de empresa é obrigatório';
      if (!formData.nomeEmpresa) newErrors.nomeEmpresa = 'Nome da empresa é obrigatório';
      if (!formData.cnpj) newErrors.cnpj = 'CNPJ é obrigatório';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (activeStep === steps.length - 1) {
        // Enviar formulário
        setSnackbar({
          open: true,
          message: 'Cadastro realizado com sucesso! Entraremos em contato em breve.',
          severity: 'success',
        });
      } else {
        setActiveStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const benefits = [
    {
      icon: <Event sx={{ fontSize: 40 }} />,
      title: 'Gestão Completa',
      description: 'Ferramentas integradas para gerenciar todos os aspectos do seu evento.',
    },
    {
      icon: <Payment sx={{ fontSize: 40 }} />,
      title: 'Pagamentos Seguros',
      description: 'Sistema de pagamento confiável e transparente para seus eventos.',
    },
    {
      icon: <Support sx={{ fontSize: 40 }} />,
      title: 'Suporte Dedicado',
      description: 'Equipe especializada para ajudar em todas as etapas do seu evento.',
    },
    {
      icon: <Business sx={{ fontSize: 40 }} />,
      title: 'Visibilidade',
      description: 'Exposição para milhares de usuários em nossa plataforma.',
    },
  ];

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome Completo"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                error={!!errors.nome}
                helperText={errors.nome}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="E-mail"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                error={!!errors.telefone}
                helperText={errors.telefone}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.tipoEmpresa}>
                <InputLabel>Tipo de Empresa</InputLabel>
                <Select
                  name="tipoEmpresa"
                  value={formData.tipoEmpresa}
                  onChange={handleChange}
                  label="Tipo de Empresa"
                >
                  <MenuItem value="produtora">Produtora de Eventos</MenuItem>
                  <MenuItem value="casa">Casa de Shows</MenuItem>
                  <MenuItem value="festival">Festival</MenuItem>
                  <MenuItem value="outro">Outro</MenuItem>
                </Select>
                {errors.tipoEmpresa && (
                  <FormHelperText>{errors.tipoEmpresa}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome da Empresa"
                name="nomeEmpresa"
                value={formData.nomeEmpresa}
                onChange={handleChange}
                error={!!errors.nomeEmpresa}
                helperText={errors.nomeEmpresa}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="CNPJ"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleChange}
                error={!!errors.cnpj}
                helperText={errors.cnpj}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Site"
                name="site"
                value={formData.site}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Redes Sociais"
                name="redesSociais"
                value={formData.redesSociais}
                onChange={handleChange}
                placeholder="Instagram, Facebook, etc."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Experiência com Eventos"
                name="experiencia"
                value={formData.experiencia}
                onChange={handleChange}
                multiline
                rows={4}
                placeholder="Conte-nos sobre sua experiência na organização de eventos..."
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CheckCircle sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Confirme seus dados
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              Por favor, revise as informações fornecidas antes de finalizar o cadastro.
            </Typography>
            <Paper sx={{ p: 3, mt: 3, textAlign: 'left' }}>
              <Typography variant="subtitle1" gutterBottom>
                Informações Pessoais
              </Typography>
              <Typography variant="body2" paragraph>
                Nome: {formData.nome}
              </Typography>
              <Typography variant="body2" paragraph>
                E-mail: {formData.email}
              </Typography>
              <Typography variant="body2" paragraph>
                Telefone: {formData.telefone}
              </Typography>

              <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
                Informações da Empresa
              </Typography>
              <Typography variant="body2" paragraph>
                Tipo: {formData.tipoEmpresa}
              </Typography>
              <Typography variant="body2" paragraph>
                Nome: {formData.nomeEmpresa}
              </Typography>
              <Typography variant="body2" paragraph>
                CNPJ: {formData.cnpj}
              </Typography>
              {formData.site && (
                <Typography variant="body2" paragraph>
                  Site: {formData.site}
                </Typography>
              )}
              {formData.redesSociais && (
                <Typography variant="body2" paragraph>
                  Redes Sociais: {formData.redesSociais}
                </Typography>
              )}
            </Paper>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg">
        <Box sx={{ my: 8, textAlign: 'center' }}>
          <Typography variant="h1" component="h1" gutterBottom>
            Seja um Parceiro
          </Typography>
          <Typography variant="h5" color="textSecondary" paragraph>
            Junte-se à nossa rede de organizadores de eventos e alcance mais pessoas
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <BenefitCard elevation={3}>
                <IconWrapper>
                  {benefit.icon}
                </IconWrapper>
                <Typography variant="h6" gutterBottom>
                  {benefit.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {benefit.description}
                </Typography>
              </BenefitCard>
            </Grid>
          ))}
        </Grid>

        <Paper elevation={3} sx={{ p: 4, mb: 8 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {renderStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            {activeStep > 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Voltar
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? 'Enviar' : 'Próximo'}
            </Button>
          </Box>
        </Paper>
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

export default SejaParceiro; 