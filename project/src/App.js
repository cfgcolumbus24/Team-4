import './App.css';
import React from 'react';
import Dashboard from './dashboard';
import Login from './Login';
import Signup from './Signup';
import VolunteerForm from './VolunteerForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Proprietor from './dashboard-prop';


/**
 * App Flow
 * Login, Signup, Dashboards, Volunteer form
 */
function App() {
  return (
    <Router>
      <Routes>
        {}
        <Route path="/" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/proprietor" element={<Proprietor />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/volunteer" element={<VolunteerForm />} />
        <Route path="/dashboard-prop" element={<Proprietor />} />
      </Routes>
    </Router>
  );
}


export default App;

