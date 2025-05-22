import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Tab,
  Tabs,
  IconButton,
  InputAdornment,
  Divider,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
} from '@mui/icons-material';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import api from '../services/api';

const AuthContainer = styled(Paper)`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const SocialButton = styled(Button)`
  width: 100%;
  text-transform: none;
  font-size: 1rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const Auth = () => {
  const navigate = useNavigate();
  
  const [tab, setTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      if(tab === 0){
        //Login
        const response = await api.post('/auth/login', {
          email: formData.email,
          senha: formData.senha
        },{
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const { token } = response.data;
        localStorage.setItem('authToken', token);
        navigate('/dashboard');
      }else{
        //Cadastro
        if(formData.senha !== formData.confirmarSenha){
          alert('As senhas não coincidem');
          return;
        }

        const response = await api.post('/usuarios', {
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha
        });

        console.log('usuário registrado com sucesso:', response.data);
        alert('Cadastro realizado com sucesso!');
        setTab(0); //Retornar a aba de login
      }
    }catch(error){
      console.error('Erro na autenticação:', error);
      alert('Erro ao autenticar. Verifique os dados.')
    }
  };

  const handleSocialLogin = (provider) => {
    // Implementar login social
    console.log('Login with:', provider);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AuthContainer elevation={3}>
        <Typography variant="h4" align="center" gutterBottom>
          {tab === 0 ? 'Entrar' : 'Criar Conta'}
        </Typography>

        <Tabs
          value={tab}
          onChange={handleTabChange}
          centered
          sx={{ mb: 3 }}
        >
          <Tab label="Entrar" />
          <Tab label="Cadastrar" />
        </Tabs>

        <form onSubmit={handleSubmit}>
          {tab === 1 && (
            <TextField
              fullWidth
              label="Nome completo"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              margin="normal"
              required
            />
          )}

          <TextField
            fullWidth
            label="E-mail"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Senha"
            name="senha"
            type={showPassword ? 'text' : 'password'}
            value={formData.senha}
            onChange={handleInputChange}
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {tab === 1 && (
            <TextField
              fullWidth
              label="Confirmar senha"
              name="confirmarSenha"
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmarSenha}
              onChange={handleInputChange}
              margin="normal"
              required
            />
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            {tab === 0 ? 'Entrar' : 'Cadastrar'}
          </Button>
        </form>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="textSecondary">
            ou continue com
          </Typography>
        </Divider>

        <SocialButton
          variant="outlined"
          startIcon={<Google />}
          onClick={() => handleSocialLogin('google')}
        >
          Continuar com Google
        </SocialButton>

        <SocialButton
          variant="outlined"
          startIcon={<Facebook />}
          onClick={() => handleSocialLogin('facebook')}
        >
          Continuar com Facebook
        </SocialButton>

        {tab === 0 && (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              Esqueceu sua senha?{' '}
              <Button
                color="primary"
                onClick={() => console.log('Recuperar senha')}
              >
                Recuperar
              </Button>
            </Typography>
          </Box>
        )}
      </AuthContainer>
    </motion.div>
  );
};

export default Auth; 