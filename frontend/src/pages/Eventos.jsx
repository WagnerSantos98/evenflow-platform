import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  Typography, Grid, Card, CardContent, CardMedia, Button, Box, CircularProgress,
  TextField, InputAdornment, Chip, FormControl, InputLabel, Select, MenuItem, TableCell,
  Container, Paper, CardActions
} from '@mui/material';
import{ Search, LocationOn, CalendarToday } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import styled from 'styled-components';
import { formatarMoeda } from '../utils/fomatters';
import ptBR from 'date-fns/locale/pt-BR';
// import { motion } from 'framer-motion';
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

  const navigate = useNavigate();

  if(loading) {
    return(
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress/>
      </Box>
    )
  }

  return (
    <div>
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
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={evento.foto || 'https://via.placeholder.com/140'}
          alt={evento.nome}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {evento.nome}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(evento.data).toLocaleDateString()} às {evento.horario}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {evento.local?.nome || 'Local não definido'}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
            {formatarMoeda(evento.precoIngresso)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => navigate(`/eventos/${evento.id}`)}
          >
            Ver Detalhes
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => navigate(`/eventos/${evento.id}/comprar`)}
          >
            Comprar Ingresso
          </Button>
        </CardActions>
      </Card>
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


      
    </div>
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