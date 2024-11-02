import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleButtonClick = (role) => {
    // Navigate to the login page with a query parameter indicating the selected role
    navigate(`/signup?role=${role}`);
    
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Select Role</h2>
        <div className="flex justify-around mt-6">
          <button
            onClick={() => handleButtonClick('teacher')}
            className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Teacher
          </button>
          <button
            onClick={() => handleButtonClick('proprietor')}
            className="px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none"
          >
            Proprietor
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
