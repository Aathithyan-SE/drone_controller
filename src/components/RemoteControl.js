import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Grid,
  Slider,
  Chip,
  Stack,
  LinearProgress,
  useTheme,
  Divider,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import {
  ArrowUpward as UpIcon,
  ArrowDownward as DownIcon,
  ArrowBack as LeftIcon,
  ArrowForward as RightIcon,
  Add as UpAltitudeIcon,
  Remove as DownAltitudeIcon,
  FlightTakeoff as TakeoffIcon,
  FlightLand as LandIcon,
  SignalCellular4Bar as SignalIcon,
  Battery90 as BatteryIcon,
  Speed as SpeedIcon,
  RotateLeft as RotateLeftIcon,
  RotateRight as RotateRightIcon,
  CameraAlt as CameraIcon,
  Videocam as VideocamIcon,
  Lock as LockIcon,
  LockOpen as UnlockIcon,
  MyLocation as GPSIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const RemoteControl = () => {
  const theme = useTheme();
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false,
    rotateLeft: false,
    rotateRight: false,
  });
  
  const [droneData, setDroneData] = useState({
    batteryLevel: 87,
    signalStrength: 92,
    altitude: 28,
    speed: 15,
    isLocked: false,
    isRecording: false,
  });
  
  const [speedSetting, setSpeedSetting] = useState(50);
  
  // Simulate battery drain
  useEffect(() => {
    const interval = setInterval(() => {
      setDroneData(prev => ({
        ...prev,
        batteryLevel: Math.max(1, prev.batteryLevel - 0.1),
        signalStrength: Math.max(50, Math.min(99, prev.signalStrength + (Math.random() > 0.5 ? 1 : -1))),
      }));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

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
      case 'a':
        setMovement((prev) => ({ ...prev, rotateLeft: true }));
        break;
      case 'd':
        setMovement((prev) => ({ ...prev, rotateRight: true }));
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
      case 'a':
        setMovement((prev) => ({ ...prev, rotateLeft: false }));
        break;
      case 'd':
        setMovement((prev) => ({ ...prev, rotateRight: false }));
        break;
      default:
        break;
    }
  };
  
  const handleToggleLock = () => {
    setDroneData(prev => ({
      ...prev,
      isLocked: !prev.isLocked
    }));
  };
  
  const handleToggleRecording = () => {
    setDroneData(prev => ({
      ...prev,
      isRecording: !prev.isRecording
    }));
  };
  
  const handleSpeedChange = (event, newValue) => {
    setSpeedSetting(newValue);
  };
  
  const getBatteryColor = () => {
    if (droneData.batteryLevel > 50) return 'success';
    if (droneData.batteryLevel > 20) return 'warning';
    return 'error';
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  
  const ControlButton = ({ active, icon, disabled, onClick, label }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <IconButton
        color={active ? 'primary' : 'default'}
        disabled={disabled || droneData.isLocked}
        onClick={onClick}
        sx={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          backgroundColor: active 
            ? `${theme.palette.primary.main}20` 
            : theme.palette.background.paper,
          border: active 
            ? `2px solid ${theme.palette.primary.main}` 
            : `2px solid ${theme.palette.divider}`,
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: active 
              ? `${theme.palette.primary.main}30` 
              : `${theme.palette.divider}20`,
            transform: 'scale(1.05)',
          },
        }}
      >
        {icon}
      </IconButton>
      {label && (
        <Typography variant="caption" sx={{ mt: 0.5, color: theme.palette.text.secondary }}>
          {label}
        </Typography>
      )}
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="600">
          Remote Control
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip 
            icon={<BatteryIcon />} 
            label={`${Math.round(droneData.batteryLevel)}%`}
            color={getBatteryColor()} 
            variant="outlined"
          />
          <Chip 
            icon={<SignalIcon />} 
            label={`Signal: ${droneData.signalStrength}%`}
            color="primary" 
            variant="outlined"
          />
          <Chip 
            icon={<GPSIcon />} 
            label="GPS Active"
            color="success" 
            variant="outlined"
          />
        </Stack>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              border: `1px solid ${theme.palette.divider}`,
              height: '100%',
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box 
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: theme.palette.background.default,
                    border: `1px solid ${theme.palette.divider}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 3,
                  }}
                >
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    Altitude: {droneData.altitude}m
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    Speed: {droneData.speed}m/s
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    {droneData.isLocked ? 'Controls Locked' : 'Controls Active'}
                  </Typography>
                </Box>
              </Grid>
              
              {/* Altitude Controls */}
              <Grid item xs={3}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    borderRadius: 2,
                    height: '100%',
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="subtitle2" sx={{ mb: 2 }}>Altitude</Typography>
                    <Stack spacing={3} alignItems="center">
                      <ControlButton 
                        active={movement.up}
                        icon={<UpAltitudeIcon />}
                        label="Up (W)"
                      />
                      <Box 
                        sx={{ 
                          height: 100, 
                          width: 20, 
                          borderRadius: 2, 
                          bgcolor: theme.palette.background.default,
                          border: `1px solid ${theme.palette.divider}`,
                          position: 'relative',
                        }}
                      >
                        <Box 
                          sx={{ 
                            position: 'absolute', 
                            bottom: 0, 
                            left: 0, 
                            right: 0,
                            height: `${droneData.altitude / 100 * 100}%`, 
                            bgcolor: theme.palette.primary.main,
                            borderRadius: 2,
                            transition: 'height 0.5s ease',
                          }} 
                        />
                      </Box>
                      <ControlButton 
                        active={movement.down}
                        icon={<DownAltitudeIcon />}
                        label="Down (S)"
                      />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              
              {/* Direction Controls */}
              <Grid item xs={6}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    borderRadius: 2,
                    height: '100%',
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <CardContent>
                    <Typography variant="subtitle2" align="center" sx={{ mb: 2 }}>
                      Direction Controls
                    </Typography>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                    >
                      <Grid container justifyContent="center" alignItems="center" spacing={1}>
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                          <ControlButton 
                            active={movement.forward}
                            icon={<UpIcon />}
                            label="Forward (↑)"
                          />
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: 'center' }}>
                          <ControlButton 
                            active={movement.left}
                            icon={<LeftIcon />}
                            label="Left (←)"
                          />
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: 'center' }}>
                          <Box 
                            sx={{ 
                              width: 80, 
                              height: 80, 
                              borderRadius: '50%', 
                              background: `radial-gradient(circle, ${theme.palette.background.paper} 40%, ${theme.palette.divider} 40%, ${theme.palette.divider} 42%, ${theme.palette.background.paper} 42%)`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              position: 'relative',
                            }}
                          >
                            <Box 
                              component={motion.div}
                              animate={{ 
                                rotate: [0, 5, 0, -5, 0],
                                scale: [1, 1.05, 1, 1.05, 1]
                              }}
                              transition={{ 
                                repeat: Infinity, 
                                duration: 8,
                                ease: "easeInOut" 
                              }}
                              sx={{
                                position: 'absolute',
                                width: '60%',
                                height: '60%',
                              }}
                            >
                              <Box
                                component="img"
                                src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBkPSJNMjA2LjYxLDI3NS41MSwxMTYsOTZoOTB2MEgyODBsLTczLjM5LDE3OS41MW0tNDMuODQsNDEuODQtLjY5LDEuNjlMMCwzMTksMTEwLjgzLDI4Ni4yOCw2MS4xNywzMTksMTYyLjc3LDMxNy4zNU0zMDUuMzksMjc1LjUxLDM5Niw5NkgzMDZ2MGgtNzRsNzMuMzksMTc5LjUxbTQzLjg0LDQxLjg0LjY5LDEuNjlMNTEyLDMxOSw0MDEuMTcsMjg2LjI4LDQ1MC44MywzMTksMzQ5LjIzLDMxNy4zNU0yNTYsMzE5bDIwLjQ5LDc5LjI5TDI1Ni4yMyw0MTZsLTIwLTc3LjI5TDI1NiwzMTkiIGZpbGw9IiMzMzczY2MiLz48L3N2Zz4="
                                alt="Drone"
                                sx={{ 
                                  width: '100%',
                                  height: '100%',
                                }}
                              />
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: 'center' }}>
                          <ControlButton 
                            active={movement.right}
                            icon={<RightIcon />}
                            label="Right (→)"
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                          <ControlButton 
                            active={movement.backward}
                            icon={<DownIcon />}
                            label="Backward (↓)"
                          />
                        </Grid>
                      </Grid>
                    </motion.div>
                  </CardContent>
                </Card>
              </Grid>
              
              {/* Rotation Controls */}
              <Grid item xs={3}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    borderRadius: 2,
                    height: '100%',
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="subtitle2" sx={{ mb: 2 }}>Rotation</Typography>
                    <Stack spacing={3} alignItems="center">
                      <ControlButton 
                        active={movement.rotateLeft}
                        icon={<RotateLeftIcon />}
                        label="Left (A)"
                      />
                      <Box sx={{ height: 100, display: 'flex', alignItems: 'center' }}>
                        <SpeedIcon color="primary" />
                      </Box>
                      <ControlButton 
                        active={movement.rotateRight}
                        icon={<RotateRightIcon />}
                        label="Right (D)"
                      />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: 3, 
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography variant="subtitle1" fontWeight="500" gutterBottom>
                Speed Settings
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <SpeedIcon color="primary" sx={{ mr: 2 }} />
                <Box sx={{ width: '100%' }}>
                  <Slider
                    value={speedSetting}
                    onChange={handleSpeedChange}
                    disabled={droneData.isLocked}
                    aria-labelledby="speed-slider"
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={10}
                    max={100}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="caption" color="text.secondary">Slow</Typography>
                    <Typography variant="caption" color="text.secondary">Fast</Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
            
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: 3, 
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography variant="subtitle1" fontWeight="500" gutterBottom>
                Quick Actions
              </Typography>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <Button 
                  variant="contained" 
                  startIcon={<TakeoffIcon />}
                  disabled={droneData.isLocked}
                  fullWidth
                >
                  Take Off
                </Button>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  startIcon={<LandIcon />}
                  disabled={droneData.isLocked}
                  fullWidth
                >
                  Land
                </Button>
                <Button 
                  variant="outlined" 
                  color="info" 
                  startIcon={<HomeIcon />}
                  disabled={droneData.isLocked}
                  fullWidth
                >
                  Return Home
                </Button>
              </Stack>
            </Paper>
            
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: 3, 
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography variant="subtitle1" fontWeight="500" gutterBottom>
                Camera Controls
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button 
                  variant="outlined" 
                  startIcon={<CameraIcon />}
                  disabled={droneData.isLocked}
                  fullWidth
                >
                  Snapshot
                </Button>
                <Button 
                  variant={droneData.isRecording ? "contained" : "outlined"}
                  color={droneData.isRecording ? "error" : "primary"}
                  startIcon={<VideocamIcon />}
                  onClick={handleToggleRecording}
                  disabled={droneData.isLocked}
                  fullWidth
                >
                  {droneData.isRecording ? "Stop" : "Record"}
                </Button>
              </Stack>
            </Paper>
            
            <Button
              variant="outlined"
              color={droneData.isLocked ? "success" : "error"}
              startIcon={droneData.isLocked ? <UnlockIcon /> : <LockIcon />}
              onClick={handleToggleLock}
              fullWidth
              sx={{ mt: 2 }}
            >
              {droneData.isLocked ? "Unlock Controls" : "Lock Controls"}
            </Button>
          </Stack>
        </Grid>
      </Grid>
      
      <Typography 
        variant="body2" 
        color="text.secondary" 
        align="center" 
        sx={{ mt: 3 }}
      >
        Use keyboard controls for precise movements. Arrow keys for direction, W/S for altitude, A/D for rotation.
      </Typography>
    </Box>
  );
};

export default RemoteControl;