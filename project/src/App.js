import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoleSelection from './Signup';
import LoginPage from './Login';
import VolunteerForm from './VolunteerForm';

function App() {
  return (
    <Router>
      <Routes>
        {/* This will make the Login component load first as the default route */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}


export default App;

