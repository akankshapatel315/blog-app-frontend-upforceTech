// src/routes/PrivateRoute.tsx
import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const PrivateRoute: React.FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
