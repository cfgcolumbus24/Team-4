import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig'; // Adjust the path if necessary
import { collection, getDocs } from 'firebase/firestore';

const TeacherInfo = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const teachersCollection = collection(db, "login"); // Adjust the collection name if needed
        const teacherSnapshot = await getDocs(teachersCollection);

        const teacherList = teacherSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setTeachers(teacherList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) {
    return <p>Loading teachers...</p>;
  }

  if (error) {
    return <p>Error fetching teachers: {error}</p>;
  }

  return (
    <div className="m-0 p-0">
      <h2 className="text-2xl font-bold mb-4">Teachers</h2>
      <ul className="space-y-2">
        {teachers.map(teacher => (
          <li key={teacher.id} className="p-4 border rounded shadow">
            <p><strong>Name:</strong> {teacher.name}</p>
            <p><strong>School:</strong> {teacher.school}</p>
            <p><strong>Classes:</strong></p>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(teacher.classes) && teacher.classes.length > 0 ? (
                teacher.classes.map((className, index) => (
                  <span
                    key={index}
                    className="bg-blue-300 text-white px-2 py-1 rounded-md"
                  >
                    {className}
                  </span>
                ))
              ) : (
                <p>No classes available.</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherInfo;
