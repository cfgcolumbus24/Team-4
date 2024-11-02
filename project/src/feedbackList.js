import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const FeedbackList = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const feedbackCollection = collection(db, "feedback");
        const feedbackSnapshot = await getDocs(feedbackCollection);

        const feedbackMap = {};

        feedbackSnapshot.docs.forEach(doc => {
          const feedback = doc.data();
          const teacherName = feedback.name;
          const feedbackDate = feedback.date?.toDate().toLocaleDateString();
          if (!feedbackMap[teacherName]) {
            feedbackMap[teacherName] = {
              dates: [],
              engagementLevel: [],
              overallEffectiveness: [],
              performanceOnAssignments: []
            };
          }

          feedbackMap[teacherName].dates.push(feedbackDate);
          feedbackMap[teacherName].engagementLevel.push(feedback.engagementLevel);
          feedbackMap[teacherName].overallEffectiveness.push(feedback.overallEffectiveness);
          feedbackMap[teacherName].performanceOnAssignments.push(feedback.performanceOnAssignments);
        });

        // Calculate mean scores and prepare final data for display
        const aggregatedData = Object.keys(feedbackMap).map(teacher => ({
          name: teacher,
          dates: feedbackMap[teacher].dates,
          engagementLevel: calculateMean(feedbackMap[teacher].engagementLevel),
          overallEffectiveness: calculateMean(feedbackMap[teacher].overallEffectiveness),
          performanceOnAssignments: calculateMean(feedbackMap[teacher].performanceOnAssignments)
        }));

        setFeedbackData(aggregatedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const calculateMean = (numbers) => {
    const total = numbers.reduce((acc, curr) => acc + curr, 0);
    return total / numbers.length || 0;
  };

  if (loading) {
    return <p>Loading feedback...</p>;
  }

  if (error) {
    return <p>Error fetching feedback: {error}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Teacher Feedback</h2>
      <ul className="space-y-2">
        {feedbackData.map((feedback, index) => (
          <li key={index} className="p-4 border rounded shadow">
            <p><strong>Name:</strong> {feedback.name}</p>
            <div>
              <strong>Dates:</strong>
              {feedback.dates.map((date, idx) => (
                <p key={idx}>{date}</p>
              ))}
            </div>
            <p><strong>Average Engagement Level:</strong> {feedback.engagementLevel.toFixed(2)}</p>
            <p><strong>Average Overall Effectiveness:</strong> {feedback.overallEffectiveness.toFixed(2)}</p>
            <p><strong>Average Performance on Assignments:</strong> {feedback.performanceOnAssignments.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackList;