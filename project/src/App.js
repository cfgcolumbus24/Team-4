import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';


function App() {
  return (
    <Router>
      <Routes>
        {/* This will make the Login component load first as the default route */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

