import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
} from '@mui/material';

const DroneConfig = () => {
  const [config, setConfig] = useState({
    latitude: '',
    longitude: '',
    altitude: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the configuration to your backend
    console.log('Drone Configuration:', config);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Drone Configuration
      </Typography>
      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Latitude"
                name="latitude"
                value={config.latitude}
                onChange={handleChange}
                required
                type="number"
                inputProps={{ step: "0.000001" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Longitude"
                name="longitude"
                value={config.longitude}
                onChange={handleChange}
                required
                type="number"
                inputProps={{ step: "0.000001" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Initial Altitude (meters)"
                name="altitude"
                value={config.altitude}
                onChange={handleChange}
                required
                type="number"
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
              >
                Set Configuration
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default DroneConfig; 