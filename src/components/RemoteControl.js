import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Grid,
} from '@mui/material';
import {
  ArrowUpward as UpIcon,
  ArrowDownward as DownIcon,
  ArrowBack as LeftIcon,
  ArrowForward as RightIcon,
  Add as UpAltitudeIcon,
  Remove as DownAltitudeIcon,
} from '@mui/icons-material';

const RemoteControl = () => {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false,
  });

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        setMovement((prev) => ({ ...prev, forward: true }));
        break;
      case 'ArrowDown':
        setMovement((prev) => ({ ...prev, backward: true }));
        break;
      case 'ArrowLeft':
        setMovement((prev) => ({ ...prev, left: true }));
        break;
      case 'ArrowRight':
        setMovement((prev) => ({ ...prev, right: true }));
        break;
      case 'w':
        setMovement((prev) => ({ ...prev, up: true }));
        break;
      case 's':
        setMovement((prev) => ({ ...prev, down: true }));
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        setMovement((prev) => ({ ...prev, forward: false }));
        break;
      case 'ArrowDown':
        setMovement((prev) => ({ ...prev, backward: false }));
        break;
      case 'ArrowLeft':
        setMovement((prev) => ({ ...prev, left: false }));
        break;
      case 'ArrowRight':
        setMovement((prev) => ({ ...prev, right: false }));
        break;
      case 'w':
        setMovement((prev) => ({ ...prev, up: false }));
        break;
      case 's':
        setMovement((prev) => ({ ...prev, down: false }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Remote Control
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1" gutterBottom>
          Use arrow keys for movement and W/S for altitude control
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <IconButton
              color={movement.up ? 'primary' : 'default'}
              size="large"
              sx={{ m: 1 }}
            >
              <UpAltitudeIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <IconButton
              color={movement.forward ? 'primary' : 'default'}
              size="large"
              sx={{ m: 1 }}
            >
              <UpIcon />
            </IconButton>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: 'center' }}>
            <IconButton
              color={movement.left ? 'primary' : 'default'}
              size="large"
              sx={{ m: 1 }}
            >
              <LeftIcon />
            </IconButton>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: 'center' }}>
            <IconButton
              color={movement.backward ? 'primary' : 'default'}
              size="large"
              sx={{ m: 1 }}
            >
              <DownIcon />
            </IconButton>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: 'center' }}>
            <IconButton
              color={movement.right ? 'primary' : 'default'}
              size="large"
              sx={{ m: 1 }}
            >
              <RightIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <IconButton
              color={movement.down ? 'primary' : 'default'}
              size="large"
              sx={{ m: 1 }}
            >
              <DownAltitudeIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default RemoteControl; 