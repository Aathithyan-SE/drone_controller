import React, { useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Chip,
  Tab,
  Tabs,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material';
import { 
  Print as PrintIcon,
  Map as MapIcon,
  Download as DownloadIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  GridOn as GridIcon,
  Straighten as MeasureIcon,
  LocationOn as LocationIcon,
  Satellite as SatelliteIcon,
  Compare as CompareIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';

// Building mapping data
const buildingData = {
  buildingAreas: [
    { id: 'B1', area: '25 m²' },
    { id: 'B2', area: '22 m²' },
    { id: 'B3', area: '28 m²' },
    { id: 'B4', area: '30 m²' },
    { id: 'B5', area: '35 m²' },
  ],
  buildingDimensions: [
    { id: 'B1', dimensions: '5 m × 5 m' },
    { id: 'B2', dimensions: '4.5 m × 5 m' },
    { id: 'B3', dimensions: '5 m × 5.5 m' },
    { id: 'B4', dimensions: '5.5 m × 5.5 m' },
    { id: 'B5', dimensions: '6 m × 6 m' },
  ],
  distances: [
    { from: 'B1', to: 'B2', distance: '3 m' },
    { from: 'B3', to: 'B4', distance: '4 m' },
    { from: 'B4', to: 'B5', distance: '6 m' },
    { from: 'B2', to: 'B5', distance: '5 m' },
  ],
  orientation: {
    general: 'Northwest-Southeast',
    notes: 'B5: Slightly tilted compared to the other buildings'
  },
  buildingDensity: {
    buildingsArea: '140 m²',
    totalArea: '200 m²',
    density: '70%'
  },
  roadProximity: [
    { id: 'B5', distance: '2 m', note: 'Closest to the road' },
    { id: 'B1', distance: '5 m', note: 'Farthest from the road' },
  ]
};

const Mapping = () => {
  const theme = useTheme();
  const [isMapping, setIsMapping] = useState(false);
  const [mappingComplete, setMappingComplete] = useState(false);
  const [mappingData, setMappingData] = useState(null);
  const printRef = React.useRef();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

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
        area: '200 m²',
        resolution: '10cm/pixel',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      });
    }, 3000);
  };

  const renderBuildingMap = () => (
    <Box sx={{ 
      position: 'relative',
      width: '100%',
      height: 400,
      bgcolor: '#f1f5f9',
      borderRadius: 2,
      overflow: 'hidden',
      border: `1px solid ${theme.palette.divider}`,
    }}>
      {/* Map visualization with SVG */}
      <svg width="100%" height="100%" viewBox="0 0 600 400">
        {/* Grid pattern */}
        <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
        <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="url(#smallGrid)" />
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#cbd5e1" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Road */}
        <rect x="50" y="300" width="500" height="40" fill="#94a3b8" />
        
        {/* Buildings */}
        <g>
          {/* B1 */}
          <rect x="100" y="200" width="50" height="50" fill="#3373cc" opacity="0.8" stroke="#1e40af" strokeWidth="2" />
          <text x="125" y="225" textAnchor="middle" fill="white" fontWeight="bold">B1</text>
          <text x="125" y="240" textAnchor="middle" fill="white" fontSize="10">25 m²</text>
          
          {/* B2 */}
          <rect x="180" y="210" width="45" height="50" fill="#3373cc" opacity="0.8" stroke="#1e40af" strokeWidth="2" />
          <text x="202.5" y="235" textAnchor="middle" fill="white" fontWeight="bold">B2</text>
          <text x="202.5" y="250" textAnchor="middle" fill="white" fontSize="10">22 m²</text>
          
          {/* B3 */}
          <rect x="270" y="180" width="50" height="55" fill="#3373cc" opacity="0.8" stroke="#1e40af" strokeWidth="2" />
          <text x="295" y="210" textAnchor="middle" fill="white" fontWeight="bold">B3</text>
          <text x="295" y="225" textAnchor="middle" fill="white" fontSize="10">28 m²</text>
          
          {/* B4 */}
          <rect x="350" y="190" width="55" height="55" fill="#3373cc" opacity="0.8" stroke="#1e40af" strokeWidth="2" />
          <text x="377.5" y="220" textAnchor="middle" fill="white" fontWeight="bold">B4</text>
          <text x="377.5" y="235" textAnchor="middle" fill="white" fontSize="10">30 m²</text>
          
          {/* B5 (slightly tilted) */}
          <g transform="rotate(-10, 470, 200)">
            <rect x="440" y="170" width="60" height="60" fill="#3373cc" opacity="0.8" stroke="#1e40af" strokeWidth="2" />
            <text x="470" y="200" textAnchor="middle" fill="white" fontWeight="bold">B5</text>
            <text x="470" y="215" textAnchor="middle" fill="white" fontSize="10">35 m²</text>
          </g>
          
          {/* Distance lines */}
          <line x1="150" y1="225" x2="180" y2="235" stroke="#ff6b35" strokeWidth="2" strokeDasharray="4" />
          <text x="165" y="220" textAnchor="middle" fill="#ff6b35" fontSize="10" fontWeight="bold">3m</text>
          
          <line x1="320" y1="207.5" x2="350" y2="217.5" stroke="#ff6b35" strokeWidth="2" strokeDasharray="4" />
          <text x="335" y="202" textAnchor="middle" fill="#ff6b35" fontSize="10" fontWeight="bold">4m</text>
          
          <line x1="405" y1="217.5" x2="440" y2="200" stroke="#ff6b35" strokeWidth="2" strokeDasharray="4" />
          <text x="420" y="195" textAnchor="middle" fill="#ff6b35" fontSize="10" fontWeight="bold">6m</text>
          
          <line x1="225" y1="235" x2="440" y2="200" stroke="#ff6b35" strokeWidth="2" strokeDasharray="4" />
          <text x="330" y="230" textAnchor="middle" fill="#ff6b35" fontSize="10" fontWeight="bold">5m</text>
          
          {/* Road proximity indicators */}
          <line x1="125" y1="250" x2="125" y2="300" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4" />
          <text x="140" y="275" textAnchor="start" fill="#64748b" fontSize="10">5m</text>
          
          <line x1="470" y1="230" x2="470" y2="300" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4" />
          <text x="485" y="275" textAnchor="start" fill="#64748b" fontSize="10">2m</text>
          
          {/* Compass */}
          <g transform="translate(50, 50)">
            <circle cx="0" cy="0" r="20" fill="white" stroke="#0f172a" strokeWidth="1" />
            <path d="M 0,-15 L 5,5 L 0,0 L -5,5 Z" fill="#0f172a" />
            <text x="0" y="25" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">N</text>
          </g>
        </g>
      </svg>
      
      {/* Map controls */}
      <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
        <Paper elevation={0} sx={{ p: 0.5, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.8)' }}>
          <Stack direction="column" spacing={0.5}>
            <Tooltip title="Zoom In">
              <IconButton size="small" color="primary">
                <ZoomInIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Zoom Out">
              <IconButton size="small" color="primary">
                <ZoomOutIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Divider sx={{ my: 0.5 }} />
            <Tooltip title="Toggle Grid">
              <IconButton size="small" color="primary">
                <GridIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Measure">
              <IconButton size="small" color="primary">
                <MeasureIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Paper>
      </Box>
      
      {/* Scale indicator */}
      <Box sx={{ position: 'absolute', bottom: 10, left: 10 }}>
        <Paper elevation={0} sx={{ px: 2, py: 0.5, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.8)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: 50, height: 4, bgcolor: theme.palette.primary.main }} />
            <Typography variant="caption" sx={{ ml: 1 }}>10 meters</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="600" sx={{ display: 'flex', alignItems: 'center' }}>
          <MapIcon sx={{ mr: 1.5, color: theme.palette.primary.main }} />
          Building Mapping
        </Typography>
        
        <Stack direction="row" spacing={1}>
          <Chip 
            icon={<SatelliteIcon />} 
            label="Aerial Data" 
            color="primary" 
            variant="outlined"
          />
          <Chip 
            icon={<CalendarIcon />} 
            label={new Date().toLocaleDateString()} 
            variant="outlined"
          />
        </Stack>
      </Box>
      
      <Paper elevation={0} sx={{ 
        borderRadius: 3, 
        overflow: 'hidden',
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      }}>
        {!mappingComplete && (
          <Box sx={{ textAlign: 'center', py: 8, bgcolor: theme.palette.background.default }}>
            {isMapping ? (
              <>
                <CircularProgress size={70} thickness={4} />
                <Typography variant="h5" sx={{ mt: 3, fontWeight: 500 }}>
                  Mapping in progress...
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 500, mx: 'auto' }}>
                  The drone is capturing high-resolution imagery of the area to map building dimensions and distances.
                </Typography>
              </>
            ) : (
              <>
                <Box 
                  component="img"
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSI0IiBmaWxsPSIjRjFGNUY5Ii8+CiAgPHJlY3QgeD0iMjAiIHk9IjIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiMzMzczQ0MiIGZpbGwtb3BhY2l0eT0iMC44Ii8+CiAgPHJlY3QgeD0iNjAiIHk9IjIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiMzMzczQ0MiIGZpbGwtb3BhY2l0eT0iMC44Ii8+CiAgPHJlY3QgeD0iMjAiIHk9IjYwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiMzMzczQ0MiIGZpbGwtb3BhY2l0eT0iMC44Ii8+CiAgPHJlY3QgeD0iNjAiIHk9IjYwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiMzMzczQ0MiIGZpbGwtb3BhY2l0eT0iMC44Ii8+Cjwvc3ZnPgo="
                  alt="Mapping"
                  sx={{ width: 100, height: 100, mb: 3 }}
                />
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>
                  Ready to Map Building Area
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
                  Start the mapping process to analyze building dimensions, distances, and area details.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={startMapping}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(90deg, #3373cc, #60a5fa)',
                    boxShadow: '0 8px 16px rgba(51, 115, 204, 0.2)',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #2563eb, #3b82f6)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 20px rgba(51, 115, 204, 0.3)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Start Mapping
                </Button>
              </>
            )}
          </Box>
        )}

        {mappingComplete && (
          <Box ref={printRef}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={activeTab} 
                onChange={handleTabChange}
                sx={{ 
                  px: 2, 
                  pt: 2,
                  '& .MuiTabs-indicator': {
                    height: 3,
                    borderRadius: '3px 3px 0 0',
                  }
                }}
              >
                <Tab label="Map View" />
                <Tab label="Building Details" />
                <Tab label="Measurements" />
              </Tabs>
            </Box>
            
            <Box sx={{ p: 3 }}>
              {activeTab === 0 && (
                <>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Building Map Visualization
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Visual representation of mapped buildings showing positions, dimensions, and distances.
                  </Typography>
                  
                  {renderBuildingMap()}
                  
                  <Grid container spacing={3} sx={{ mt: 2 }}>
                    <Grid item xs={12} md={6}>
                      <Paper elevation={0} sx={{ 
                        p: 2, 
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.divider}`,
                      }}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                          Building Density
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Total building area:
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {buildingData.buildingDensity.buildingsArea}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">
                              Total map area:
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {buildingData.buildingDensity.totalArea}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="body2" color="text.secondary">
                              Building density:
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {buildingData.buildingDensity.density}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Paper elevation={0} sx={{ 
                        p: 2, 
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.divider}`,
                      }}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                          Orientation Details
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          General orientation:
                        </Typography>
                        <Typography variant="body1" fontWeight={500} sx={{ mb: 2 }}>
                          {buildingData.orientation.general}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Notes:
                        </Typography>
                        <Typography variant="body1">
                          {buildingData.orientation.notes}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </>
              )}
              
              {activeTab === 1 && (
                <>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Building Measurements
                  </Typography>
                  <TableContainer component={Paper} elevation={0} sx={{ 
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                  }}>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ bgcolor: theme.palette.primary.main + '10' }}>
                          <TableCell sx={{ fontWeight: 'bold' }}>Building</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>Area</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>Dimensions</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>Road Proximity</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {buildingData.buildingAreas.map((building, index) => (
                          <TableRow key={building.id} sx={{ 
                            '&:nth-of-type(odd)': { bgcolor: theme.palette.background.default }
                          }}>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ 
                                  width: 24, 
                                  height: 24, 
                                  borderRadius: 1, 
                                  bgcolor: theme.palette.primary.main,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  mr: 1,
                                }}>
                                  <Typography variant="caption" sx={{ color: 'white', fontWeight: 'bold' }}>
                                    {building.id}
                                  </Typography>
                                </Box>
                                Building {building.id.replace('B', '')}
                              </Box>
                            </TableCell>
                            <TableCell>{building.area}</TableCell>
                            <TableCell>{buildingData.buildingDimensions[index].dimensions}</TableCell>
                            <TableCell>
                              {buildingData.roadProximity.find(item => item.id === building.id)?.distance || '-'}
                              {buildingData.roadProximity.find(item => item.id === building.id)?.note && (
                                <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                                  ({buildingData.roadProximity.find(item => item.id === building.id)?.note})
                                </Typography>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Visual Comparison
                    </Typography>
                    <Grid container spacing={2}>
                      {buildingData.buildingAreas.map((building, index) => (
                        <Grid item xs={6} md={2.4} key={building.id}>
                          <Paper elevation={0} sx={{ 
                            p: 2, 
                            borderRadius: 2,
                            border: `1px solid ${theme.palette.divider}`,
                            textAlign: 'center',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                          }}>
                            <Typography variant="h6" fontWeight={600}>
                              {building.id}
                            </Typography>
                            <Box sx={{ 
                              my: 2, 
                              borderRadius: 1,
                              bgcolor: theme.palette.primary.main + '15',
                              p: 1,
                              height: 100,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                              <Typography variant="body1" fontWeight={500}>
                                {building.area}
                              </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {buildingData.buildingDimensions[index].dimensions}
                            </Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </>
              )}
              
              {activeTab === 2 && (
                <>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Distance Measurements
                  </Typography>
                  <TableContainer component={Paper} elevation={0} sx={{ 
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                  }}>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ bgcolor: theme.palette.secondary.main + '10' }}>
                          <TableCell sx={{ fontWeight: 'bold' }}>From Building</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>To Building</TableCell>
                          <TableCell sx={{ fontWeight: 'bold' }}>Distance</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {buildingData.distances.map((item) => (
                          <TableRow key={`${item.from}-${item.to}`} sx={{ 
                            '&:nth-of-type(odd)': { bgcolor: theme.palette.background.default }
                          }}>
                            <TableCell>{item.from}</TableCell>
                            <TableCell>{item.to}</TableCell>
                            <TableCell>{item.distance}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Road Proximity
                    </Typography>
                    <Grid container spacing={2}>
                      {buildingData.roadProximity.map((item) => (
                        <Grid item xs={12} md={6} key={item.id}>
                          <Paper elevation={0} sx={{ 
                            p: 2, 
                            borderRadius: 2,
                            border: `1px solid ${theme.palette.divider}`,
                          }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <Box sx={{ 
                                width: 32, 
                                height: 32, 
                                borderRadius: 1, 
                                bgcolor: theme.palette.primary.main,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mr: 2,
                              }}>
                                <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 'bold' }}>
                                  {item.id}
                                </Typography>
                              </Box>
                              <Typography variant="h6">
                                {item.note}
                              </Typography>
                            </Box>
                            <Box sx={{ 
                              p: 2, 
                              borderRadius: 1,
                              bgcolor: theme.palette.background.default,
                              display: 'flex',
                              alignItems: 'center',
                            }}>
                              <LocationIcon color="primary" sx={{ mr: 1 }} />
                              <Typography variant="body1">
                                Distance to road: <strong>{item.distance}</strong>
                              </Typography>
                            </Box>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </>
              )}
              
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                >
                  Download Data
                </Button>
                <Button
                  variant="contained"
                  startIcon={<PrintIcon />}
                  onClick={handlePrint}
                >
                  Print Report
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Mapping;