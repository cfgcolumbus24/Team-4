import React from 'react';
import { useNavigate } from 'react-router-dom';
import VideoFile from './assets/Africa.mp4'; // Make sure the path is correct

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleButtonClick = (role) => {
    navigate(`/signup?role=${role}`);
  };

  const handleVolunteerClick = () => {
    navigate('/volunteer');
  };

  return (
    <div className="relative h-screen">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={VideoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      {/* Removed any additional background color or opacity here */}
      <div className="relative z-10 flex items-center justify-center h-screen">
        <div className="w-full max-w-sm p-8 space-y-6 bg-white bg-opacity-95 rounded-lg shadow-md border-2 border-black">
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
            <button
              onClick={handleVolunteerClick}
              className="px-4 py-2 font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none"
            >
              Volunteer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
