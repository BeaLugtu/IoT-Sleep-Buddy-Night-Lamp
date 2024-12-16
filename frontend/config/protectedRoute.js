import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from '../context/UserContext';

const PrivateRoute = () => {
  const { user } = useUserContext();

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
