import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Typography, Grid, Card, CardContent, CardMedia, Button, Box, CircularProgress,
  TextField, InputAdornment, Chip, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import{ Search, LocationOn, CalendarToday } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import styled from 'styled-components';
import { formatarData, formatarMoeda } from '../utils/fomatters';
import ptBR from 'date-fns/locale/pt-BR';
import { motion } from 'framer-motion';
import useEventos from '../hook/pages/useEventos';

const Eventos = () => {
  const{
    eventos,
    cidades,
    filtros,
    pagina,
    totalPaginas,
    loading,

    //Manipuladores
    handleFiltroChange,
    handleDataChange,
    handlePageChange
  } = useEventos();

  if(loading) {
    return(
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress/>
      </Box>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        Eventos
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Buscar eventos"
              name="nome"
              value={filtros.nome}
              onChange={handleFiltroChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Categoria</InputLabel>
              <Select
                name="categoria"
                value={filtros.categoria}
                onChange={handleFiltroChange}
                label="Categoria"
              >                                  
                <MenuItem value="">Todas</MenuItem>
                <MenuItem value="comedia">Comédia</MenuItem>
                <MenuItem value="familia">Família</MenuItem>
                <MenuItem value="musical">Musical</MenuItem>
                <MenuItem value="teatro">Teatro</MenuItem>
                <MenuItem value="esporte">Esporte</MenuItem>
                <MenuItem value="outros">Outros</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Cidade</InputLabel>
              <Select
                name="cidade"
                value={filtros.cidade}
                onChange={handleFiltroChange}
                label="Cidade"
              >
                <MenuItem value="">Todas</MenuItem>
                {cidades.map((cidade) => (
                  <MenuItem key={cidade} value={cidade}>
                    {cidade}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
              <DatePicker
                label="Data do Evento"
                value={filtros.data}
                onChange={handleDataChange}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
  {eventos.map((evento) => (
    <Grid item xs={12} sm={6} md={4} key={evento.id}>
      <EventCard>
        <CardMedia
          component="img"
          height="200"
          image={evento.foto}
          alt={evento.nome}
        />
        <CardContentWrapper>
          <Chip
            label={evento.categoria}
            color="primary"
            size="small"
            sx={{ alignSelf: 'flex-start', mb: 1 }}
          />
          <Typography variant="h5" component="h2" gutterBottom>
            {evento.nome}
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            {evento.descricao}
          </Typography>
          <Box sx={{ mt: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CalendarToday sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">
                {formatarData(evento.data)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOn sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">
                {evento.local.nome}, {evento.local.endereco.cidade}
              </Typography>
            </Box>
            <Typography variant="h6" color="primary" gutterBottom>
              {formatarMoeda(evento.precoIngresso)}
            </Typography>
            <Button
              component={RouterLink}
              to={`/eventos/${evento.id}`}
              variant="contained"
              color="primary"
              fullWidth
            >
              Ver Detalhes
            </Button>
          </Box>
        </CardContentWrapper>
      </EventCard>
    </Grid>
  ))}

  {totalPaginas > 1 && (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, width: '100%' }}>
      <Pagination
        count={totalPaginas}
        page={pagina}
        onChange={handlePageChange}
        color="primary"
      />
    </Box>
  )}
</Grid>


      
    </motion.div>
  );
};

const EventCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
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

export default Eventos;