import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< Updated upstream
import Login from './Login';

=======
import RoleSelection from './Signup';
import LoginPage from './Login';
import VolunteerForm from './VolunteerForm';
>>>>>>> Stashed changes

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< Updated upstream
        {/* This will make the Login component load first as the default route */}
        <Route path="/" element={<Login />} />
=======
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<RoleSelection />} />
        <Route path="/volunteer" element={<VolunteerForm />} /> {/* Add VolunteerForm route */}
>>>>>>> Stashed changes
      </Routes>
    </Router>
  );
}

export default App;

