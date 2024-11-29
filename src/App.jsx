import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Import the landing page component
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"  element= {<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
