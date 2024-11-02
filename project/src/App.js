import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoleSelection from './Signup';
import LoginPage from './Login';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<RoleSelection />} />
      </Routes>
    </Router>
  );
}

export default App;