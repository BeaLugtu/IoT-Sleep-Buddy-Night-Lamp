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

        {/* Protect Dashboard Routes */}
        <Route>
          <Route path="/*" element={<DashboardRoutes />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
