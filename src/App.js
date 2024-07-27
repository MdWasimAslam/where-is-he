import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { AuthProvider } from './components/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import TrackingUI from './components/TrackingUI';

const App = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <AuthProvider>
      <Router>
        {isMobile ? (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<ProtectedRoute element={TrackingUI} />} />
            <Route path="/" element={<Login />} /> {/* Optional default route */}
          </Routes>
        ) : (
          <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontSize: '24px',
            
          }}
          >Only available for mobile devices</div>
        )}
      </Router>
    </AuthProvider>
  );
};

export default App;
