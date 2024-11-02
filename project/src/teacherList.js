import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';


const TeacherInfo = () => {
 const [teachers, setTeachers] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);


 useEffect(() => {
   const fetchTeachers = async () => {
     try {
       const teachersCollection = collection(db, "login"); // Ensure this matches your Firestore collection name
       const teacherSnapshot = await getDocs(teachersCollection);
      
       const teacherList = teacherSnapshot.docs.map(doc => ({
         id: doc.id,
         ...doc.data()
       }));


       console.log("Fetched Teachers:", teacherList); 
       setTeachers(teacherList);
     } catch (err) {
       setError(err.message);
       console.error("Error fetching teachers:", err); 
     } finally {
       setLoading(false);
     }
   };


   fetchTeachers();
 }, []);


 if (loading) {
   return <p className="text-center text-gray-500">Loading teachers...</p>;
 }


 if (error) {
   return <p className="text-center text-red-500">Error fetching teachers: {error}</p>;
 }


 return (
   <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
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
