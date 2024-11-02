import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig'; // Adjust the path as necessary
import { collection, getDocs, addDoc } from 'firebase/firestore';

const TeacherInfo = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTeacher, setNewTeacher] = useState({ name: '', school: '', classes: '' });

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const teachersCollection = collection(db, "login"); // Ensure this matches your Firestore collection name
        const teacherSnapshot = await getDocs(teachersCollection);

        const teacherList = teacherSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log("Fetched Teachers:", teacherList); // Log the fetched data
        setTeachers(teacherList);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching teachers:", err); // Log the error
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const teachersCollection = collection(db, "login"); // Firestore collection
      const teacherData = {
        name: newTeacher.name,
        school: newTeacher.school,
        classes: newTeacher.classes.split(',').map(item => item.trim()), // Split classes by comma
      };

      const docRef = await addDoc(teachersCollection, teacherData); // Add new teacher to Firestore
      setTeachers((prev) => [...prev, { id: docRef.id, ...teacherData }]); // Update local state with new teacher
      setNewTeacher({ name: '', school: '', classes: '' }); // Reset form fields
    } catch (err) {
      setError(err.message);
      console.error("Error adding teacher:", err); // Log the error
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading teachers...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error fetching teachers: {error}</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Form to add new teacher */}
      <form onSubmit={handleSubmit} className="mb-6">
        <h2 className="text-lg font-bold mb-4">Add New Teacher</h2>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Teacher's Name"
            value={newTeacher.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-2"
          />
          <input
            type="text"
            name="school"
            placeholder="School"
            value={newTeacher.school}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-2"
          />
          <input
            type="text"
            name="classes"
            placeholder="Classes (comma separated)"
            value={newTeacher.classes}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-2"
          />
          <button type="submit" className="bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700">
            Add Teacher
          </button>
        </div>
      </form>

      {/* List of teachers */}
      <ul className="space-y-4">
        {teachers.length > 0 ? (
          teachers.map(teacher => (
            <li key={teacher.id} className="p-4 border border-gray-200 rounded-lg shadow hover:shadow-lg transition duration-200">
              <div className="flex justify-between items-center">
                <p className="font-medium text-lg">{teacher.name}</p>
                <span className="bg-blue-300 text-white px-2 py-1 rounded-md">{teacher.classes.join(', ')}</span>
              </div>
              <p className="mt-2 text-gray-600"><strong>School:</strong> {teacher.school}</p>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No teachers found.</p>
        )}
      </ul>
    </div>
  );
};

export default TeacherInfo;
