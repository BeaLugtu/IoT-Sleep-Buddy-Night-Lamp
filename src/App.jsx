import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import DashboardRoutes from './pages/Dashboard/DashboardRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard Routes */}
        <Route
          path="/*"
          element={<DashboardRoutes />}
        />

      </Routes>
    </Router>
  );
}

export default App;
