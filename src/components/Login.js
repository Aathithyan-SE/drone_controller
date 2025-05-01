import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  InputAdornment,
  useTheme,
} from '@mui/material';
import {
  AccountCircle,
  Wifi as WifiIcon,
  FlightTakeoff as DroneIcon,
} from '@mui/icons-material';

const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [formData, setFormData] = useState({
    username: '',
    ipAddress: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(120deg, #f8fafc 0%, #e0f2fe 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative elements */}
      <Box 
        sx={{ 
          position: 'absolute', 
          width: 400, 
          height: 400, 
          borderRadius: '50%', 
          top: '-100px',
          right: '-100px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0) 70%)',
        }} 
      />
      
      <Box 
        sx={{ 
          position: 'absolute', 
          width: 300, 
          height: 300, 
          borderRadius: '50%', 
          bottom: '-50px',
          left: '-50px',
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, rgba(249, 115, 22, 0) 70%)',
        }} 
      />
      
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Box 
              sx={{ 
                width: 70, 
                height: 70, 
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #3373cc 0%, #60a5fa 100%)',
                boxShadow: '0 8px 16px rgba(51, 115, 204, 0.2)',
              }}
            >
              <DroneIcon sx={{ color: 'white', fontSize: 36 }} />
            </Box>
          </Box>

          <Typography 
            variant="h4" 
            component="h1" 
            align="center" 
            gutterBottom
            sx={{
              fontWeight: 700,
              color: '#0f172a',
              mb: 1,
            }}
          >
            Welcome Back
          </Typography>

          <Typography 
            variant="body1" 
            align="center" 
            sx={{ 
              color: '#64748b',
              mb: 4
            }}
          >
            Connect to your drone and start your mission
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
              required
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />

            <TextField
              fullWidth
              label="Drone IP Address"
              name="ipAddress"
              value={formData.ipAddress}
              onChange={handleChange}
              margin="normal"
              required
              placeholder="e.g., 192.168.1.100"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WifiIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ 
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                background: 'linear-gradient(90deg, #3373cc, #60a5fa)',
                boxShadow: '0 8px 16px rgba(51, 115, 204, 0.15)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #2563eb, #3b82f6)',
                  boxShadow: '0 10px 20px rgba(51, 115, 204, 0.2)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              Connect to Drone
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;