import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    setShowTitle(true);
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showTitle ? 1 : 0, y: showTitle ? 0 : 20 }}
        transition={{ duration: 1 }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: 'primary.main',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Autonomous Mapping
        </Typography>
      </motion.div>
    </Box>
  );
};

export default SplashScreen; 