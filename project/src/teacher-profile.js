import React, { useState } from 'react';
import './App.css'; // Assuming Tailwind is imported in App.css or index.css

function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    school: "The Ohio State University",
    address: "123 University Ave, Columbus, OH",
    classes: ["Math 101", "History 201", "Biology 101"]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const toggleEditing = () => setIsEditing((prev) => !prev);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full mx-auto mt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Teacher Profile</h1>
        <button 
          onClick={toggleEditing} 
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
      
      <div className="space-y-4 mt-4">
        <div>
          <h2 className="text-sm font-semibold text-gray-600">Name</h2>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={userProfile.name}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-800">{userProfile.name}</p>
          )}
        </div>
        
        <div>
          <h2 className="text-sm font-semibold text-gray-600">School</h2>
          {isEditing ? (
            <input
              type="text"
              name="school"
              value={userProfile.school}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-800">{userProfile.school}</p>
          )}
        </div>
        
        <div>
          <h2 className="text-sm font-semibold text-gray-600">Address</h2>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={userProfile.address}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-800">{userProfile.address}</p>
          )}
        </div>
        
        <div>
          <h2 className="text-sm font-semibold text-gray-600">Classes</h2>
          {isEditing ? (
            <input
              type="text"
              name="classes"
              value={userProfile.classes.join(", ")}
              onChange={(e) => 
                setUserProfile((prev) => ({ ...prev, classes: e.target.value.split(", ") }))
              }
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <ul className="list-disc list-inside text-gray-800">
              {userProfile.classes.map((className, index) => (
                <li key={index}>{className}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
