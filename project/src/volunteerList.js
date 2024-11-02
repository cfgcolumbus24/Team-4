import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig'; // Adjust the path as necessary
import { collection, getDocs } from 'firebase/firestore';

const VolunteersList = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const volunteersCollection = collection(db, "volunteering"); // Change "volunteering" to your actual collection name
        const volunteerSnapshot = await getDocs(volunteersCollection);
        
        const volunteerList = volunteerSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setVolunteers(volunteerList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  if (loading) {
    return <p>Loading volunteers...</p>;
  }

  if (error) {
    return <p>Error fetching volunteers: {error}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Volunteers</h2>
      <ul className="space-y-2">
        {volunteers.map(volunteer => (
          <li key={volunteer.id} className="p-4 border rounded shadow">
            <p><strong>Name:</strong> {volunteer.name}</p>
            <p><strong>Subject:</strong> {volunteer.preferredSubject}</p>
            <p><strong>Email:</strong> {volunteer.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VolunteersList;
