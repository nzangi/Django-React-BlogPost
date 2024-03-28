import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const ProtectedRoute = ({ element, ...rest }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      element={isLoggedIn ? element : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;

