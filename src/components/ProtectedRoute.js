import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element: Element }) => {
  const { auth } = useAuth();

  return auth ? <Element /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
