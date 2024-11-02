import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const proprietorDocRef = doc(db, 'proprietor', username);
      const proprietorDoc = await getDoc(proprietorDocRef);

      if (proprietorDoc.exists()) {
        const storedPassword = proprietorDoc.data().password;

        if (storedPassword === password) {
          setLoginStatus('Success');
          navigate('/dashboard-prop');
          return; 
        } else {
          setLoginStatus('Invalid password');
          return;
        }
      }

      const userDocRef = doc(db, 'login', username);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        setLoginStatus('User not found');
      } else {
        const storedPassword = userDoc.data().password;

        if (storedPassword === password) {
          setLoginStatus('Success');
          navigate('/dashboard');
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
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md border-2 border-black">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login
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
