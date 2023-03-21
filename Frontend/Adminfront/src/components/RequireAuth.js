import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({children}) => {
  const currentUser = localStorage.getItem("userToken");
  return currentUser !== null ? children : <Navigate to="/login" replace={true} />
}

export default RequireAuth;
