import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  InputAdornment,
  useTheme,
  Divider,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Explore as ExploreIcon,
  Height as HeightIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
  MyLocation as GPSIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const DroneConfig = () => {
  const theme = useTheme();
  const [config, setConfig] = useState({
    latitude: '37.7749',
    longitude: '-122.4194',
    altitude: '50',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Drone Configuration:', config);
      setLoading(false);
    }, 1000);
  };
  
  const handleReset = () => {
    setConfig({
      latitude: '37.7749',
      longitude: '-122.4194',
      altitude: '50',
    });
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="600">
          Drone Configuration
        </Typography>
        <Chip 
          icon={<GPSIcon />} 
          label="GPS Ready" 
          color="success" 
          variant="outlined"
          sx={{ fontWeight: 500 }}
        />
      </Box>
      
      <Card 
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        elevation={0} 
        sx={{ 
          borderRadius: 3, 
          overflow: 'hidden',
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        }}
      >
        <Box sx={{ 
          p: 2, 
          bgcolor: theme.palette.primary.main, 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
        }}>
          <ExploreIcon sx={{ mr: 1.5 }} />
          <Typography variant="subtitle1" fontWeight="500">
            Flight Parameters
          </Typography>
        </Box>
        
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography 
                  variant="subtitle2" 
                  sx={{ mb: 0.5, display: 'flex', alignItems: 'center' }}
                >
                  <LocationIcon 
                    fontSize="small" 
                    sx={{ 
                      mr: 0.5, 
                      color: theme.palette.primary.main,
                      opacity: 0.8,
                    }} 
                  />
                  Coordinates
                </Typography>
                <Box 
                  sx={{ 
                    p: 2.5, 
                    borderRadius: 2, 
                    bgcolor: theme.palette.background.default,
                    mb: 2,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Box 
                    component={motion.div}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    <TextField
                      fullWidth
                      label="Latitude"
                      name="latitude"
                      value={config.latitude}
                      onChange={handleChange}
                      required
                      type="number"
                      variant="outlined"
                      inputProps={{ step: "0.000001" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box 
                              sx={{ 
                                width: 28, 
                                height: 28, 
                                borderRadius: '50%', 
                                bgcolor: `${theme.palette.primary.main}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Typography 
                                variant="caption" 
                                fontWeight="bold"
                                sx={{ color: theme.palette.primary.main }}
                              >
                                LAT
                              </Typography>
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ 
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Box>
                  
                  <Box 
                    component={motion.div}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <TextField
                      fullWidth
                      label="Longitude"
                      name="longitude"
                      value={config.longitude}
                      onChange={handleChange}
                      required
                      type="number"
                      variant="outlined"
                      inputProps={{ step: "0.000001" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Box 
                              sx={{ 
                                width: 28, 
                                height: 28, 
                                borderRadius: '50%', 
                                bgcolor: `${theme.palette.primary.main}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Typography 
                                variant="caption" 
                                fontWeight="bold"
                                sx={{ color: theme.palette.primary.main }}
                              >
                                LON
                              </Typography>
                            </Box>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography 
                  variant="subtitle2" 
                  sx={{ mb: 0.5, display: 'flex', alignItems: 'center' }}
                >
                  <HeightIcon 
                    fontSize="small" 
                    sx={{ 
                      mr: 0.5, 
                      color: theme.palette.primary.main,
                      opacity: 0.8,
                    }} 
                  />
                  Altitude Settings
                </Typography>
                <Box 
                  sx={{ 
                    p: 2.5, 
                    borderRadius: 2, 
                    bgcolor: theme.palette.background.default,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Box 
                    component={motion.div}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <TextField
                      fullWidth
                      label="Initial Altitude"
                      name="altitude"
                      value={config.altitude}
                      onChange={handleChange}
                      required
                      type="number"
                      variant="outlined"
                      inputProps={{ min: 0 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HeightIcon color="primary" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Typography 
                              variant="body2" 
                              color="textSecondary"
                              fontWeight="500"
                            >
                              meters
                            </Typography>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Box>
                  
                  <Box 
                    sx={{ 
                      mt: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Box 
                      component="img" 
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTUwIDEwQzUwIDEwIDMwIDQwIDIwIDUwQzEwIDYwIDEwIDcwIDEwIDgwQzEwIDg1IDMwIDkwIDUwIDkwQzcwIDkwIDkwIDg1IDkwIDgwQzkwIDcwIDkwIDYwIDgwIDUwQzcwIDQwIDUwIDEwIDUwIDEwWiIgZmlsbD0iI0VERUVGRiIvPgogIDxwYXRoIGQ9Ik01MCA4NUM0NS44NTggODUgNDAgODMuNzMyIDQwIDc4QzQwIDcyLjI2OCA0NS44NTggNzAgNTAgNzBDNTQuMTQyIDcwIDYwIDcyLjI2OCA2MCA3OEM2MCA4My43MzIgNTQuMTQyIDg1IDUwIDg1WiIgZmlsbD0iIzMzNzNDQyIvPgogIDxwYXRoIGQ9Ik01MCAyNUw0MCA0MEw2MCA0MEw1MCAyNVoiIGZpbGw9IiMzMzczQ0MiLz4KICA8cGF0aCBkPSJNMTUgNzBIODVNMzAgNDBINzBNNDAgNTVINjAiIHN0cm9rZT0iIzk0QTNCOCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtZGFzaGFycmF5PSI0IDQiLz4KPC9zdmc+Cg=="
                      alt="Altitude"
                      sx={{ 
                        width: 70, 
                        height: 70,
                        opacity: 0.8,
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>
              
              <Grid item xs={12}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    gap: 2,
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<RefreshIcon />}
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                  
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<SaveIcon />}
                    disabled={loading}
                    sx={{
                      px: 4,
                      background: loading ? theme.palette.primary.main : 'linear-gradient(90deg, #3373cc, #60a5fa)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #2563eb, #3b82f6)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(37, 99, 235, 0.2)',
                      },
                    }}
                  >
                    {loading ? 'Saving...' : 'Save Configuration'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      
      <Box 
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        sx={{ 
          mt: 3, 
          p: 2, 
          borderRadius: 2, 
          bgcolor: `${theme.palette.primary.main}08`,
          border: `1px solid ${theme.palette.primary.main}22`,
        }}
      >
        <Typography variant="body2" color="textSecondary" align="center">
          Set your drone's initial location and altitude before starting your mission.
          Current coordinates represent San Francisco, CA.
        </Typography>
      </Box>
    </Box>
  );
};

export default DroneConfig;