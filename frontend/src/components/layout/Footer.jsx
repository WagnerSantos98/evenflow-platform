import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
  YouTube,
} from '@mui/icons-material';
import styled from 'styled-components';

const FooterContainer = styled(Box)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  padding: 4rem 0 2rem;
  margin-top: 4rem;
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.palette.text.secondary};
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const SocialIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.palette.text.secondary};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="primary" gutterBottom>
              EvenFlow
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Transformando a experiência de eventos culturais no Brasil.
              Conectando pessoas através da arte e cultura.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <SocialIconButton aria-label="Facebook">
                <Facebook />
              </SocialIconButton>
              <SocialIconButton aria-label="Instagram">
                <Instagram />
              </SocialIconButton>
              <SocialIconButton aria-label="Twitter">
                <Twitter />
              </SocialIconButton>
              <SocialIconButton aria-label="LinkedIn">
                <LinkedIn />
              </SocialIconButton>
              <SocialIconButton aria-label="YouTube">
                <YouTube />
              </SocialIconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Links Úteis
            </Typography>
            <FooterLink component={RouterLink} to="/eventos">
              Eventos
            </FooterLink>
            <FooterLink component={RouterLink} to="/artistas">
              Artistas
            </FooterLink>
            <FooterLink component={RouterLink} to="/sobre">
              Sobre
            </FooterLink>
            <FooterLink component={RouterLink} to="/contato">
              Contato
            </FooterLink>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Suporte
            </Typography>
            <FooterLink component={RouterLink} to="/faq">
              Dúvidas Frequentes
            </FooterLink>
            <FooterLink component={RouterLink} to="/termos-e-politicas">
              Termos e Políticas
            </FooterLink>
            <FooterLink component={RouterLink} to="/central-ajuda">
              Central de Ajuda
            </FooterLink>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Para Organizadores
            </Typography>
            <FooterLink component={RouterLink} to="/recursos">
              Recursos
            </FooterLink>
            <FooterLink component={RouterLink} to="/blog">
              Blog
            </FooterLink>
            <FooterLink component={RouterLink} to="/seja-parceiro">
              Seja Parceiro
            </FooterLink>
            <FooterLink component={RouterLink} to="/suporte">
              Suporte
            </FooterLink>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Contato
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              contato@evenflow.com.br
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              (11) 9999-9999
            </Typography>
            <Typography variant="body2" color="textSecondary">
              São Paulo, SP - Brasil
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} EvenFlow. Todos os direitos reservados.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer; 