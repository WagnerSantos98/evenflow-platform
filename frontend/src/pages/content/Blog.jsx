import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Pagination,
} from '@mui/material';
import {
  Search,
  CalendarToday,
  Person,
  Category,
} from '@mui/icons-material';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const BlogCard = styled(Card)`
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

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'dicas', label: 'Dicas' },
    { id: 'tendencias', label: 'Tendências' },
    { id: 'cases', label: 'Cases de Sucesso' },
    { id: 'tecnologia', label: 'Tecnologia' },
  ];

  const posts = [
    {
      id: 1,
      title: 'Como Organizar um Evento de Sucesso em 2024',
      excerpt: 'Descubra as principais tendências e estratégias para criar eventos memoráveis neste ano.',
      image: 'https://source.unsplash.com/random/800x600/?event',
      category: 'dicas',
      author: 'Maria Silva',
      date: '15/03/2024',
      readTime: '5 min',
    },
    {
      id: 2,
      title: 'Tendências em Tecnologia para Eventos',
      excerpt: 'Conheça as inovações tecnológicas que estão transformando a experiência dos participantes.',
      image: 'https://source.unsplash.com/random/800x600/?technology',
      category: 'tecnologia',
      author: 'João Santos',
      date: '12/03/2024',
      readTime: '7 min',
    },
    {
      id: 3,
      title: 'Case: Festival de Música com 50 mil Participantes',
      excerpt: 'Como um pequeno festival se tornou um dos maiores eventos musicais do país.',
      image: 'https://source.unsplash.com/random/800x600/?concert',
      category: 'cases',
      author: 'Ana Costa',
      date: '10/03/2024',
      readTime: '8 min',
    },
    {
      id: 4,
      title: 'Marketing Digital para Eventos',
      excerpt: 'Estratégias eficientes para promover seu evento nas redes sociais.',
      image: 'https://source.unsplash.com/random/800x600/?marketing',
      category: 'dicas',
      author: 'Pedro Oliveira',
      date: '08/03/2024',
      readTime: '6 min',
    },
    {
      id: 5,
      title: 'Tendências de Experiência do Usuário',
      excerpt: 'Como criar experiências únicas e memoráveis para os participantes.',
      image: 'https://source.unsplash.com/random/800x600/?experience',
      category: 'tendencias',
      author: 'Carla Mendes',
      date: '05/03/2024',
      readTime: '5 min',
    },
    {
      id: 6,
      title: 'Gestão Financeira de Eventos',
      excerpt: 'Dicas práticas para controlar custos e maximizar receitas.',
      image: 'https://source.unsplash.com/random/800x600/?finance',
      category: 'dicas',
      author: 'Ricardo Alves',
      date: '03/03/2024',
      readTime: '7 min',
    },
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todos' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg">
        <Box sx={{ my: 8, textAlign: 'center' }}>
          <Typography variant="h1" component="h1" gutterBottom>
            Blog
          </Typography>
          <Typography variant="h5" color="textSecondary" paragraph>
            Artigos, dicas e novidades sobre o mundo dos eventos
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar artigos..."
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

          <Box sx={{ mt: 4, mb: 6 }}>
            {categories.map((category) => (
              <Chip
                key={category.id}
                label={category.label}
                onClick={() => setSelectedCategory(category.id)}
                color={selectedCategory === category.id ? 'primary' : 'default'}
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
        </Box>

        <Grid container spacing={4}>
          {filteredPosts.map((post) => (
            <Grid item xs={12} md={6} key={post.id}>
              <BlogCard>
                <CardMedia
                  component="img"
                  height="240"
                  image={post.image}
                  alt={post.title}
                />
                <CardContentWrapper>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={categories.find(c => c.id === post.category)?.label}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      icon={<CalendarToday sx={{ fontSize: 16 }} />}
                      label={post.date}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      icon={<Person sx={{ fontSize: 16 }} />}
                      label={post.author}
                      size="small"
                    />
                  </Box>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" paragraph>
                    {post.excerpt}
                  </Typography>
                  <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" color="textSecondary">
                      {post.readTime} de leitura
                    </Typography>
                  </Box>
                </CardContentWrapper>
                <CardActions>
                  <Button
                    component={RouterLink}
                    to={`/blog/${post.id}`}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Ler Mais
                  </Button>
                </CardActions>
              </BlogCard>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 4 }}>
          <Pagination count={3} color="primary" />
        </Box>
      </Container>
    </motion.div>
  );
};

export default Blog; 