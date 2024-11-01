// src/RoleSelection.js
import React, { useState } from 'react';

const RoleSelection = () => {
  const [role, setRole] = useState(null);

  const showMessage = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
        {!role ? (
          <div id="role-choice">
            <h2 className="text-2xl font-bold text-center text-gray-800">Select Role</h2>
            <div className="flex justify-around mt-6">
              <button
                onClick={() => showMessage('Teacher')}
                className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Teacher
              </button>
              <button
                onClick={() => showMessage('Proprietor')}
                className="px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none"
              >
                Proprietor
              </button>
            </div>
          </div>
        ) : (
          <div id="welcome-message">
            <h2 className="text-2xl font-bold text-center text-gray-800">{`Welcome, ${role}!`}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleSelection;
