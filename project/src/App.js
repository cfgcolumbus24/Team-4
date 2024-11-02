import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoleSelection from './Signup';
import LoginPage from './Login';
import VolunteerForm from './VolunteerForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<RoleSelection />} />
        <Route path="/volunteer" element={<VolunteerForm />} /> {/* Add this line for the VolunteerForm */}
      </Routes>
    </Router>
  );
}
export default App;
