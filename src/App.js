import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import TrackingUI from './components/TrackingUI';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute element={TrackingUI} />} />
          <Route path="/" element={<Login />} /> {/* Optional default route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
