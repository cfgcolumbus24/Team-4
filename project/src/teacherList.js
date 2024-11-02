import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const ProprietorDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    date: '',
    name: '',
    class: '',
    engagementLevel: 5,
    performanceOnAssignments: 5,
    overallEffectiveness: 5
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const feedbacksCollection = collection(db, "teacherFeedback");
        const feedbackSnapshot = await getDocs(feedbacksCollection);

        const feedbackList = feedbackSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setFeedbacks(feedbackList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback((prev) => ({
      ...prev,
      [name]: name === 'date' ? value : (name === 'engagementLevel' || name === 'performanceOnAssignments' || name === 'overallEffectiveness') ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const feedbacksCollection = collection(db, "teacherFeedback"); 
      const feedbackData = {
        ...newFeedback,
        date: new Date(newFeedback.date)
      };

      await addDoc(feedbacksCollection, feedbackData);
      setFeedbacks((prev) => [...prev, feedbackData]);
      setNewFeedback({
        date: '',
        name: '',
        class: '',
        engagementLevel: 5,
        performanceOnAssignments: 5,
        overallEffectiveness: 5
      });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading feedbacks...</p>;
  if (error) return <p>Error fetching feedback: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Submit Feedback</h2>
      
      {/* Feedback Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          type="date"
          name="date"
          value={newFeedback.date}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={newFeedback.name}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="class"
          placeholder="Class (e.g., Pre-K)"
          value={newFeedback.class}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <label>Engagement Level (0 - 10)</label>
        <input
          type="number"
          name="engagementLevel"
          min="0"
          max="10"
          value={newFeedback.engagementLevel}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <label>Performance on Assignments (0 - 10)</label>
        <input
          type="number"
          name="performanceOnAssignments"
          min="0"
          max="10"
          value={newFeedback.performanceOnAssignments}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <label>Overall Effectiveness (0 - 10)</label>
        <input
          type="number"
          name="overallEffectiveness"
          min="0"
          max="10"
          value={newFeedback.overallEffectiveness}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700">
          Submit Feedback
        </button>
      </form>

      {/* Display Table */}
      <h2 className="text-2xl font-bold mb-4">Teacher Feedback</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Class</th>
            <th className="border p-2">Engagement Level</th>
            <th className="border p-2">Performance on Assignments</th>
            <th className="border p-2">Overall Effectiveness</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback.id} className="hover:bg-gray-100">
              <td className="border p-2">{feedback.date.toDateString()}</td>
              <td className="border p-2">{feedback.name}</td>
              <td className="border p-2">{feedback.class}</td>
              <td className="border p-2">{feedback.engagementLevel}</td>
              <td className="border p-2">{feedback.performanceOnAssignments}</td>
              <td className="border p-2">{feedback.overallEffectiveness}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProprietorDashboard;
