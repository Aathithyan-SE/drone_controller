import React, { useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Grid,
} from '@mui/material';
import { Print as PrintIcon } from '@mui/icons-material';

const Mapping = () => {
  const [isMapping, setIsMapping] = useState(false);
  const [mappingComplete, setMappingComplete] = useState(false);
  const [mappingData, setMappingData] = useState(null);
  const printRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const startMapping = () => {
    setIsMapping(true);
    // Simulate mapping process
    setTimeout(() => {
      setIsMapping(false);
      setMappingComplete(true);
      setMappingData({
        area: '1500 sq meters',
        resolution: '10cm/pixel',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      });
    }, 5000);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Mapping
      </Typography>
      <Paper sx={{ p: 3 }}>
        {!mappingComplete && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            {isMapping ? (
              <>
                <CircularProgress size={60} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Mapping in progress...
                </Typography>
              </>
            ) : (
              <Button
                variant="contained"
                size="large"
                onClick={startMapping}
              >
                Start Mapping
              </Button>
            )}
          </Box>
        )}

        {mappingComplete && (
          <Box ref={printRef}>
            <Typography variant="h5" gutterBottom>
              Mapping Results
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6">Mapping Details</Typography>
                  <Typography>Area: {mappingData.area}</Typography>
                  <Typography>Resolution: {mappingData.resolution}</Typography>
                  <Typography>Date: {mappingData.date}</Typography>
                  <Typography>Time: {mappingData.time}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6">Map Preview</Typography>
                  <Box
                    sx={{
                      width: '100%',
                      height: 200,
                      backgroundColor: 'grey.200',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography>Map Image Placeholder</Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={<PrintIcon />}
                onClick={handlePrint}
              >
                Print Report
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Mapping; 