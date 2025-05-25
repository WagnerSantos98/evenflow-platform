import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  useTheme,
  useMediaQuery,
  Paper,
  Divider,
} from '@mui/material';
import {
  Event as EventIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  Payment as PaymentIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import heroImage from '../assets/img/hero-image.jpg'

// Componentes estilizados
const HeroSection = styled(Box)`
  background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
  color: white;
  padding: 80px 0;
  position: relative;
  overflow: hidden;
`;

const FeatureCard = styled(Card)`
  height: 100%;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }
`;

const TestimonialCard = styled(Paper)`
  padding: 24px;
  height: 100%;
  background: #f5f5f5;
`;

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      icon: <EventIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Eventos Personalizados',
      description: 'Crie e gerencie eventos únicos com ferramentas intuitivas e personalizáveis.'
    },
    {
      icon: <LocationIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Gestão de Locais',
      description: 'Encontre e gerencie os melhores locais para seus eventos com facilidade.'
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Controle de Público',
      description: 'Gerencie ingressos, participantes e acessos de forma eficiente.'
    },
    {
      icon: <PaymentIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Pagamentos Seguros',
      description: 'Processe pagamentos de forma segura com múltiplas opções de pagamento.'
    }
  ];

  const testimonials = [
    {
      name: 'Ana Silva',
      role: 'Organizadora de Eventos',
      text: 'O Evenflow revolucionou a forma como organizo meus eventos. A plataforma é intuitiva e completa!'
    },
    {
      name: 'Carlos Santos',
      role: 'Produtor Cultural',
      text: 'Excelente ferramenta para gestão de eventos. O suporte é incrível e as funcionalidades são perfeitas.'
    },
    {
      name: 'Mariana Costa',
      role: 'Empresária',
      text: 'Desde que comecei a usar o Evenflow, a organização dos meus eventos ficou muito mais simples e profissional.'
    }
  ];

  const stats = [
    { number: '1000+', label: 'Eventos Realizados' },
    { number: '50k+', label: 'Usuários Ativos' },
    { number: '98%', label: 'Satisfação' },
    { number: '24/7', label: 'Suporte' }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h2" component="h1" gutterBottom>
                  Transforme seus eventos em experiências inesquecíveis
                </Typography>
                <Typography variant="h5" paragraph>
                  Plataforma completa para gestão de eventos, desde o planejamento até a execução.
                </Typography>
                <Stack direction="row" spacing={2} mt={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => navigate('/auth')}
                  >
                    Começar Agora
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    size="large"
                    onClick={() => navigate('/eventos')}
                  >
                    Explorar Eventos
                  </Button>
                </Stack>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Box
                  component="img"
                  src={heroImage}
                  alt="Evento"
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    height: 'auto',
                    display: 'block',
                    margin: '0 auto'
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Por que escolher o Evenflow?
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Tudo que você precisa para criar eventos incríveis em um só lugar
        </Typography>
        <Grid container spacing={4} mt={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FeatureCard>
                  <CardContent>
                    <Box display="flex" justifyContent="center" mb={2}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="h3" align="center" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" align="center">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Box textAlign="center">
                    <Typography variant="h3" component="div" gutterBottom>
                      {stat.number}
                    </Typography>
                    <Typography variant="h6">{stat.label}</Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          O que nossos usuários dizem
        </Typography>
        <Grid container spacing={4} mt={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TestimonialCard elevation={0}>
                  <Typography variant="body1" paragraph>
                    "{testimonial.text}"
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1" fontWeight="bold">
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {testimonial.role}
                  </Typography>
                </TestimonialCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 