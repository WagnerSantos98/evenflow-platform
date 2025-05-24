import React from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Chip,
  Divider,
  IconButton,
  CircularProgress
} from '@mui/material';
import {
  LocationOn,
  CalendarToday,
  AccessTime,
  Share,
  Favorite,
  Navigation,
} from '@mui/icons-material';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import useEventoDetalhes from '../../hook/pages/content/useEventoDetalhes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation as SwiperNavigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';

const EventoDetalhes = () => {
  const { evento, loading } = useEventoDetalhes();

  if(loading || !evento) {
      return(
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress/>
        </Box>
      )
  }


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <HeroImage image={evento.foto}>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '2rem',
            zIndex: 1,
          }}
        >
          <Typography variant="h1" color="white" gutterBottom>
            {evento.nome}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Chip
              icon={<CalendarToday />}
              label={new Date(evento.data).toLocaleDateString()}
              sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
            />
            <Chip
              icon={<LocationOn />}
              label={`${evento.local.endereco?.cidade} - ${evento.local.endereco?.estado}`}
              sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
            />
          </Box>
        </Box>
      </HeroImage>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <InfoSection>
            <Typography variant="h4" gutterBottom>
              Sobre o Evento
            </Typography>
            <Typography variant="body1" paragraph>
              {evento.descricao}
            </Typography>

            {evento.categoria && (
              <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <Chip label={evento.categoria} color="primary" variant="outlined" />
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            <Box sx={{ my: 4 }}>
              <Typography variant="h6" gutterBottom>
                Galeria de Imagens
              </Typography>
              
              <Swiper
                modules={[SwiperNavigation, Pagination, Autoplay]}
                spaceBetween={16}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                style={{ borderRadius: 8 }}
              >
                {evento.galeria.map((item) => (
                  <SwiperSlide key={item.id}>
                    <Box
                      sx={{
                        width: '100%',
                        aspectRatio: '1 / 1', // Altura = Largura
                        overflow: 'hidden',
                        borderRadius: 2,
                      }}
                    >
                      <img
                        src={item.urlImagem}
                        alt="Imagem da galeria"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '8px',
                        }}
                      />
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </InfoSection>
        </Grid>

        <Grid item xs={12} md={4}>
          <InfoSection>
            <Typography variant="h5" gutterBottom>
              Informações
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" color="textSecondary">
                Data e Horário
              </Typography>
              <Typography variant="body1">
                {new Date(evento.data).toLocaleDateString('pt-BR')} às {new Date(evento.data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </Typography>
            </Box>


            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" color="textSecondary">
                Local
              </Typography>
              <Typography variant="body1">{evento.local?.nome}</Typography>
              <Typography variant="body2" color="textSecondary">
                {evento.local.endereco?.rua}, {evento.local.endereco?.numero} - {evento.local.endereco?.bairro}
              </Typography>
            </Box>


            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" color="primary" gutterBottom>
                R$ {evento.precoIngresso}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {evento.ingressosDisponiveis} ingressos disponíveis
              </Typography>
            </Box>

            <Link 
              to={`/comprar-ingresso/${evento.id}`}
              >
               <Button variant="contained" 
              color="primary" 
              size="large" 
              fullWidth sx={{ mb: 2 }}>Comprar Ingresso</Button>
            </Link>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <IconButton color="primary">
                <Share />
              </IconButton>
              <IconButton color="primary">
                <Favorite />
              </IconButton>
            </Box>
          </InfoSection>
        </Grid>
      </Grid>
    </motion.div>
  );
};


const HeroImage = styled.div`
  width: 100%;
  height: 400px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
  margin-bottom: 2rem;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7));
  }
`;

const InfoSection = styled(Paper)`
  padding: 2rem;
  background-color: ${({ theme }) => theme.palette.background.paper};
  margin-bottom: 2rem;
`;

export default EventoDetalhes; 