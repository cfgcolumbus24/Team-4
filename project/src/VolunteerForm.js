import React, { useState } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const VolunteerForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    preferredSubject: '',
    availability: '',
    teacherUsername: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await addDoc(collection(db, "volunteering"), {
        name: form.name,
        email: form.email,
        preferredSubject: form.preferredSubject,
        availability: Timestamp.fromDate(new Date(form.availability)),
        teacherUsername: form.teacherUsername,
      });
      setForm({
        name: '',
        email: '',
        preferredSubject: '',
        availability: '',
        teacherUsername: '',
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      setError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Volunteer Interest Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-medium">Name:</label>
            <input 
              type="text" 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              required 
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Email:</label>
            <input 
              type="email" 
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              required 
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Preferred Subject:</label>
            <input 
              type="text" 
              name="preferredSubject" 
              value={form.preferredSubject} 
              onChange={handleChange} 
              required 
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Availability:</label>
            <input 
              type="datetime-local" 
              name="availability" 
              value={form.availability} 
              onChange={handleChange} 
              required 
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Teacher Username:</label>
            <input 
              type="text" 
              name="teacherUsername" 
              value={form.teacherUsername} 
              onChange={handleChange} 
              required 
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <button 
            type="submit" 
            className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-200" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default VolunteerForm;
