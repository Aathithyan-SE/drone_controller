import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  FlightTakeoff as DroneIcon,
  AirplanemodeActive as FlyingIcon,
  Explore as NavigationIcon,
  Satellite as SatelliteIcon
} from '@mui/icons-material';

const SplashScreen = () => {
  const navigate = useNavigate();
  const theme = useTheme();
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(145deg, #f1f5f9 0%, #e0f2fe 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative elements */}
      <Box 
        sx={{ 
          position: 'absolute', 
          width: 500, 
          height: 500, 
          borderRadius: '50%', 
          top: '-200px',
          right: '-200px',
          background: 'radial-gradient(circle, rgba(51, 115, 204, 0.08) 0%, rgba(51, 115, 204, 0) 70%)',
        }} 
      />
      
      <Box 
        sx={{ 
          position: 'absolute', 
          width: 600, 
          height: 600, 
          borderRadius: '50%', 
          bottom: '-300px',
          left: '-200px',
          background: 'radial-gradient(circle, rgba(255, 107, 53, 0.08) 0%, rgba(255, 107, 53, 0) 70%)',
        }} 
      />
      
      {/* Grid pattern for background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          zIndex: 0,
        }}
      />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: showTitle ? 1 : 0.8, opacity: showTitle ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Animated drone icon container */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2.5,
              ease: "easeInOut" 
            }}
          >
            <Box 
              sx={{ 
                width: 120, 
                height: 120, 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #3373cc 0%, #60a5fa 100%)',
                boxShadow: '0 20px 40px rgba(51, 115, 204, 0.3)',
                mb: 3,
                position: 'relative',
              }}
            >
              {/* Main drone icon */}
              <DroneIcon sx={{ 
                color: 'white', 
                fontSize: 60,
                filter: 'drop-shadow(0px 2px 5px rgba(0,0,0,0.2))'
              }} />

              {/* Satellite circles around drone */}
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 10,
                  ease: "linear" 
                }}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                }}
              >
                <SatelliteIcon sx={{ 
                  color: 'rgba(255,255,255,0.7)', 
                  fontSize: 22,
                  position: 'absolute',
                  top: 5,
                  left: 'calc(50% - 11px)',
                }} />
              </motion.div>

              {/* Navigation signal rays */}
              <motion.div
                initial={{ opacity: 0.5, scale: 0.8 }}
                animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.1, 0.8] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut" 
                }}
                style={{
                  position: 'absolute',
                  width: '140%',
                  height: '140%',
                  borderRadius: '50%',
                  border: '2px dashed rgba(255,255,255,0.3)',
                }}
              />
            </Box>
          </motion.div>
          
          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 700,
              textAlign: 'center',
              letterSpacing: '-0.025em',
              mb: 2,
            }}
          >
            Drone Control
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              textAlign: 'center',
              fontWeight: 400,
            }}
          >
            Advanced Mapping & Automation
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
};

export default SplashScreen;