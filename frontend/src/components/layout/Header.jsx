import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import styled from 'styled-components';

const StyledAppBar = styled(AppBar)`
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(RouterLink)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.primary.main};
  text-decoration: none;
  margin-right: 2rem;
`;

const NavButton = styled(Button)`
  color: ${({ theme }) => theme.palette.text.primary};
  margin: 0 0.5rem;
  
  &:hover {
    background-color: ${({ theme }) => theme.palette.background.elevated};
  }
`;

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Eventos', path: '/eventos' },
    ...(isAuthenticated ? [{ text: 'Dashboard', path: '/dashboard' }] : []),
    { text: 'Sobre', path: '/sobre' },
    { text: 'Contato', path: '/contato' },
  ];

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem
          button
          component={RouterLink}
          to={item.path}
          key={item.text}
          onClick={handleDrawerToggle}
        >
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
      <ListItem>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          component={RouterLink}
          to="/auth"
        >
          Entrar
        </Button>
      </ListItem>
    </List>
  );

  return (
    <>
      <StyledAppBar position="fixed">
        <Toolbar>
          <Logo to="/">EvenFlow</Logo>
          
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ ml: 'auto' }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
              {menuItems.map((item) => (
                <NavButton
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                >
                  {item.text}
                </NavButton>
              ))}
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/auth"
                sx={{ ml: 2 }}
              >
                Entrar
              </Button>
            </Box>
          )}
        </Toolbar>
      </StyledAppBar>
      
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        {drawer}
      </Drawer>
      
      {/* Toolbar placeholder para evitar que o conteúdo fique sob o AppBar fixo */}
      <Toolbar />
    </>
  );
};

export default Header; 