import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const role = new URLSearchParams(location.search).get('role'); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Attempting login for username: ${username} with role: ${role}`);

    try {
      const collectionName = role === 'proprietor' ? 'proprietor' : 'login';
      const userDocRef = doc(db, collectionName, username);
      const userDoc = await getDoc(userDocRef);

      console.log('Document Reference:', userDocRef.path);
      
      if (!userDoc.exists()) {
        console.log('User document does not exist');
        setLoginStatus('User not found');
      } else {
        const storedPassword = userDoc.data().password;

        console.log('Stored Password:', storedPassword);
        
        if (storedPassword === password) {
          setLoginStatus('Success');
          if (role === 'proprietor') {
            navigate('/dashboard-prop');
          } else {
            navigate('/dashboard');
          }
        } else {
          setLoginStatus('Invalid password');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginStatus('An error occurred');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login as {role ? role.charAt(0).toUpperCase() + role.slice(1) : 'User'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        {loginStatus && (
          <p className="mt-4 text-center text-green-600">{loginStatus}</p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
