import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import SplashScreen from './components/SplashScreen';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import DroneConfig from './components/DroneConfig';
import VideoFeed from './components/VideoFeed';
import Mapping from './components/Mapping';
import RemoteControl from './components/RemoteControl';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3373cc', // Rich blue
      light: '#5c8edb',
      dark: '#0d4cad',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff6b35', // Vibrant orange
      light: '#ff916c',
      dark: '#e54200',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f7f9fc', // Light blue-gray background
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          fontWeight: 500,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="config" element={<DroneConfig />} />
            <Route path="video" element={<VideoFeed />} />
            <Route path="mapping" element={<Mapping />} />
            <Route path="control" element={<RemoteControl />} />
            <Route index element={<Navigate to="config" replace />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;