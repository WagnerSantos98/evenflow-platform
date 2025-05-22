import React, { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { HeroSection } from '../styles/components/homeStyle';
import EventSlider from '../components/home/EventSlider';
import BenefitsSection from '../components/home/BenefitsSection';

const Home = () => {
  useEffect(() => {
    fetch('https://evenflow-platform.onrender.com')
      .then(res => res.json())
  });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection>
        <Typography variant="h1" component="h1" gutterBottom>
          Descubra Eventos Incríveis
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          Encontre os melhores eventos culturais e artísticos da sua cidade
        </Typography>
      </HeroSection>

      <section>
        <Typography variant="h2" component="h2" gutterBottom>
          Eventos em Destaque
        </Typography>
        <EventSlider />
      </section>

      <BenefitsSection />
    </motion.div>
  );
};

export default Home; 