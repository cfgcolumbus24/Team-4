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
    <div>
      <h2>Volunteer to Teach a Class</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Preferred Subject:</label>
          <input type="text" name="preferredSubject" value={form.preferredSubject} onChange={handleChange} required />
        </div>
        <div>
          <label>Availability:</label>
          <input type="datetime-local" name="availability" value={form.availability} onChange={handleChange} required />
        </div>
        <div>
          <label>Teacher Username:</label>
          <input type="text" name="teacherUsername" value={form.teacherUsername} onChange={handleChange} required />
        </div>
        <button type="submit" disabled={isSubmitting}>Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default VolunteerForm;
