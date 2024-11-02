import logo from './logo.svg';
import './App.css';
import React from 'react';
import Dashboard from './dashboard';
import Login from './Login';
import Signup from './Signup';
import RoleSelection from './Signup';
import VolunteerForm from './VolunteerForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Proprietor from './dashboard-prop';


function App() {
  return (
    <Router>
      <Routes>
        {/* This will make the Login component load first as the default route */}
        <Route path="/" element={<Login />} />
        
        <Route path="/signup" element={<Signup />} />
        <Route path="/proprietor" element={<Proprietor />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/volunteer" element={<VolunteerForm />} />
        <Route path="/proprietor" element={<Proprietor />} />
      </Routes>
    </Router>
  );
}


export default App;

