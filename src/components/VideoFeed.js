import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  IconButton, 
  Stack, 
  Chip, 
  Tooltip,
  Fade,
  useTheme,
  Divider
} from '@mui/material';
import Webcam from 'react-webcam';
import { 
  PlayArrow as PlayIcon, 
  Stop as StopIcon,
  Videocam as VideocamIcon,
  FullscreenRounded as FullscreenIcon,
  CameraAlt as CameraIcon,
  Wifi as WifiIcon,
  SignalCellular4Bar as SignalIcon,
  Settings as SettingsIcon,
  FiberManualRecord as RecordIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const VideoFeed = () => {
  const theme = useTheme();
  const webcamRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [ipAddress, setIpAddress] = useState('192.168.1.100');
  const [isRecording, setIsRecording] = useState(false);
  const [signalStrength, setSignalStrength] = useState(95);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  
  // Simulate signal strength fluctuation
  useEffect(() => {
    if (isStreaming) {
      const interval = setInterval(() => {
        setSignalStrength(prev => Math.max(75, Math.min(99, prev + (Math.random() > 0.5 ? 1 : -1))));
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isStreaming]);
  
  // Simulate recording timer
  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else {
      setElapsedTime(0);
    }
    
    return () => clearInterval(timer);
  }, [isRecording]);

  // This would typically come from your login state or context
  useEffect(() => {
    // Get the IP address from your state management
    const storedIp = localStorage.getItem('droneIp');
    if (storedIp) {
      setIpAddress(storedIp);
    }
  }, []);

  const startStreaming = () => {
    setIsStreaming(true);
  };

  const stopStreaming = () => {
    setIsStreaming(false);
    setIsRecording(false);
  };
  
  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };
  
  const captureScreenshot = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      // In a real app, you might save this or display it
      console.log('Screenshot captured:', imageSrc ? 'success' : 'failed');
    }
  };
  
  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
  
  return (
    <Box 
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{ 
        maxWidth: fullScreen ? '100%' : 1200, 
        mx: 'auto',
        height: fullScreen ? '100vh' : 'auto',
        position: fullScreen ? 'fixed' : 'relative',
        top: fullScreen ? 0 : 'auto',
        left: fullScreen ? 0 : 'auto',
        right: fullScreen ? 0 : 'auto',
        bottom: fullScreen ? 0 : 'auto',
        zIndex: fullScreen ? 1300 : 1,
        bgcolor: fullScreen ? 'black' : 'transparent',
        pt: fullScreen ? 0 : undefined,
      }}
    >
      {!fullScreen && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" fontWeight="600" sx={{ display: 'flex', alignItems: 'center' }}>
            <VideocamIcon sx={{ mr: 1.5, color: theme.palette.primary.main }} />
            Live Video Feed
          </Typography>
          
          <Stack direction="row" spacing={1}>
            <Chip 
              icon={<WifiIcon />}
              label={`Connected: ${ipAddress}`}
              variant="outlined"
              color="primary"
              size="small"
            />
            
            <Chip 
              icon={<SignalIcon />}
              label={`Signal: ${signalStrength}%`}
              variant="outlined"
              color={signalStrength > 80 ? "success" : "warning"}
              size="small"
            />
          </Stack>
        </Box>
      )}
      
      <Paper 
        sx={{ 
          p: fullScreen ? 0 : 3, 
          borderRadius: fullScreen ? 0 : 3,
          boxShadow: fullScreen ? 'none' : '0 4px 20px rgba(0,0,0,0.05)', 
          border: fullScreen ? 'none' : `1px solid ${theme.palette.divider}`,
          height: fullScreen ? '100vh' : 'auto',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: fullScreen ? '100%' : 0,
            paddingBottom: fullScreen ? 0 : '56.25%', // 16:9 aspect ratio
            backgroundColor: 'black',
          }}
        >
          <AnimatePresence>
            {isStreaming ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              >
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  videoConstraints={{
                    facingMode: 'environment',
                  }}
                  screenshotFormat="image/jpeg"
                />
                
                {/* Video overlay elements */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: 2,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.3) 100%)',
                  }}
                >
                  {/* Top overlay */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      {isRecording && (
                        <Chip 
                          icon={<RecordIcon sx={{ color: theme.palette.error.main }} />}
                          label={`REC ${formatTime(elapsedTime)}`}
                          sx={{ 
                            bgcolor: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            '& .MuiChip-iconSmall': { 
                              animation: 'pulse 1.5s infinite',
                              '@keyframes pulse': {
                                '0%': { opacity: 1 },
                                '50%': { opacity: 0.5 },
                                '100%': { opacity: 1 },
                              }
                            }
                          }}
                          size="small"
                        />
                      )}
                    </Box>
                    
                    <Stack direction="row" spacing={1}>
                      <Chip 
                        label={new Date().toLocaleTimeString()}
                        sx={{ bgcolor: 'rgba(0,0,0,0.5)', color: 'white' }}
                        size="small"
                      />
                      <Chip 
                        icon={<SignalIcon sx={{ color: signalStrength > 80 ? '#4caf50' : '#ff9800' }} />}
                        label={`${signalStrength}%`}
                        sx={{ bgcolor: 'rgba(0,0,0,0.5)', color: 'white' }}
                        size="small"
                      />
                    </Stack>
                  </Box>
                  
                  {/* Bottom overlay / controls */}
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Tooltip title="Take Screenshot" arrow TransitionComponent={Fade}>
                      <IconButton 
                        onClick={captureScreenshot}
                        sx={{ 
                          bgcolor: 'rgba(0,0,0,0.5)', 
                          color: 'white',
                          '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
                        }}
                      >
                        <CameraIcon />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title={isRecording ? "Stop Recording" : "Start Recording"} arrow TransitionComponent={Fade}>
                      <IconButton 
                        onClick={toggleRecording}
                        sx={{ 
                          bgcolor: isRecording ? 'rgba(244,67,54,0.5)' : 'rgba(0,0,0,0.5)', 
                          color: 'white',
                          '&:hover': { 
                            bgcolor: isRecording ? 'rgba(244,67,54,0.7)' : 'rgba(0,0,0,0.7)' 
                          }
                        }}
                      >
                        {isRecording ? <StopIcon /> : <VideocamIcon />}
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title={fullScreen ? "Exit Fullscreen" : "Fullscreen"} arrow TransitionComponent={Fade}>
                      <IconButton 
                        onClick={toggleFullScreen}
                        sx={{ 
                          bgcolor: 'rgba(0,0,0,0.5)', 
                          color: 'white',
                          '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
                        }}
                      >
                        <FullscreenIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#0f172a',
                  color: 'white',
                  padding: '20px',
                }}
              >
                <VideocamIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2, opacity: 0.8 }} />
                <Typography variant="h5" gutterBottom>
                  Ready to Connect
                </Typography>
                <Typography variant="body2" align="center" color="rgba(255,255,255,0.7)" sx={{ maxWidth: 400, mb: 3 }}>
                  Click "Start Streaming" to begin receiving video feed from your drone camera
                </Typography>
                
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<PlayIcon />}
                  onClick={startStreaming}
                  sx={{
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    background: 'linear-gradient(90deg, #3373cc, #60a5fa)',
                    boxShadow: '0 8px 16px rgba(51, 115, 204, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #2563eb, #3b82f6)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 20px rgba(51, 115, 204, 0.4)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Start Streaming
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
        
        {!fullScreen && (
          <Stack 
            direction="row" 
            spacing={2} 
            sx={{ 
              mt: 3,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<PlayIcon />}
              onClick={startStreaming}
              disabled={isStreaming}
              sx={{
                px: 3,
                '&.Mui-disabled': {
                  bgcolor: `${theme.palette.primary.main}30`,
                  color: theme.palette.primary.main,
                },
              }}
            >
              Start Streaming
            </Button>
            
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<StopIcon />}
              onClick={stopStreaming}
              disabled={!isStreaming}
            >
              Stop Streaming
            </Button>
            
            <Divider orientation="vertical" flexItem />
            
            <IconButton
              color="primary"
              onClick={captureScreenshot}
              disabled={!isStreaming}
              sx={{ 
                border: `1px solid ${theme.palette.divider}`,
                '&.Mui-disabled': {
                  color: theme.palette.text.disabled,
                },
              }}
            >
              <CameraIcon />
            </IconButton>
            
            <IconButton
              color={isRecording ? "error" : "primary"}
              onClick={toggleRecording}
              disabled={!isStreaming}
              sx={{ 
                border: `1px solid ${isRecording ? theme.palette.error.main : theme.palette.divider}`,
                '&.Mui-disabled': {
                  color: theme.palette.text.disabled,
                },
                ...(isRecording && {
                  animation: 'pulse 1.5s infinite',
                  '@keyframes pulse': {
                    '0%': { borderColor: theme.palette.error.main },
                    '50%': { borderColor: theme.palette.error.light },
                    '100%': { borderColor: theme.palette.error.main },
                  }
                })
              }}
            >
              {isRecording ? <StopIcon /> : <VideocamIcon />}
            </IconButton>
            
            <IconButton
              color="primary"
              onClick={() => {}}
              disabled={!isStreaming}
              sx={{ 
                border: `1px solid ${theme.palette.divider}`,
                '&.Mui-disabled': {
                  color: theme.palette.text.disabled,
                },
              }}
            >
              <SettingsIcon />
            </IconButton>
          </Stack>
        )}
      </Paper>
    </Box>
  );
};

export default VideoFeed;