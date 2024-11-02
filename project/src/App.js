import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoleSelection from './Signup';
import LoginPage from './Login';
import TeacherProfile from './teacher-profile'; // Assuming this is the user profile component

function App() {
  return (
    <Router>
      <Routes>

        {/* Route for the User Profile page */}
        <Route path="/profile" element={<TeacherProfile />} />        

      </Routes>
    </Router>
  );
}

export default App;
