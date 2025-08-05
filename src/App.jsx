import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import RegisterPage from './pages/RegisterPage';
import TrainerDashboard from './pages/TrainerDashboard';
import TrainerRoute from './components/TrainerRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route
  path="/trainer/dashboard"
  element={
    <TrainerRoute>
      <TrainerDashboard />
    </TrainerRoute>
  }
/>
      </Routes>
    </Router>
  );
}

export default App;

