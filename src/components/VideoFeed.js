import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import Webcam from 'react-webcam';

const VideoFeed = () => {
  const webcamRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [ipAddress, setIpAddress] = useState('');

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
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Live Video Feed
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" gutterBottom>
            Connected to: {ipAddress}
          </Typography>
        </Box>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 0,
            paddingBottom: '56.25%', // 16:9 aspect ratio
            backgroundColor: 'black',
          }}
        >
          {isStreaming ? (
            <Webcam
              ref={webcamRef}
              audio={false}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              videoConstraints={{
                facingMode: 'environment',
              }}
            />
          ) : (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              <Typography variant="h6">
                Click "Start Streaming" to begin
              </Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={startStreaming}
            disabled={isStreaming}
          >
            Start Streaming
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={stopStreaming}
            disabled={!isStreaming}
          >
            Stop Streaming
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default VideoFeed; 