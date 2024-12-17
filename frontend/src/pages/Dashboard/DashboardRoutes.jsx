import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import Dashboard from './pages/DashboardFinal'; // Assuming this is your dashboard component


const DashboardRoutes = () => {
  return (
    <Routes>
      {/* Admin Layout wrapper */}
      <Route path="/" element={<DashboardLayout />}>
        {/* Default route redirects to dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} /> {/* index is the default route */}

        {/* Admin nested routes */}
        <Route path="dashboard" element={<Dashboard />} />
        
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
