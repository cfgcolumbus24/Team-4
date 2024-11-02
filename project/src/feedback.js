import React, { useState, useEffect } from 'react';

const FeedbackForm = () => {
    const [feedback, setFeedback] = useState({
        engagement: 5,
        feedbackQuality: 5,
        effectiveness: 5
    });
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setCurrentDate(formattedDate);
    }, []);

    const handleSliderChange = (field, value) => {
        setFeedback(prevFeedback => ({
            ...prevFeedback,
            [field]: value
        }));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4">
            <div className="w-full max-w-md p-6 space-y-4 bg-white rounded-xl shadow-xl">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Daily Survey</h1>
                <form action="https://formspree.io/f/mkgnjvee" method="POST" className="space-y-4">
                    
                    {/* Display Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                            type="text"
                            name="Date"
                            value={currentDate}
                            readOnly
                            disabled
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded bg-gray-100 text-gray-600 focus:outline-none focus:transform focus:scale-105 transition duration-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="TeacherName"
                            placeholder="Enter your name"
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:transform focus:scale-105 transition duration-300"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Class</label>
                        <select
                            name="Class"
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:transform focus:scale-105 transition duration-300"
                            required
                        >
                            <option>Pre-K</option>
                            <option>Kindergarten</option>
                            <option>Grade 1</option>
                            <option>Grade 2</option>
                            <option>Grade 3</option>
                            <option>Grade 4</option>
                            <option>Grade 5</option>
                            <option>Grade 6</option>
                            <option>Grade 7</option>
                            <option>Grade 8</option>
                            <option>Grade 9</option>
                            <option>Grade 10</option>
                            <option>Grade 11</option>
                            <option>Grade 12</option>
                        </select>
                    </div>

                    {/* Feedback Options */}
                    {[
                        { label: 'Engagement Level', field: 'engagement' },
                        { label: 'Performance on Assignments', field: 'feedbackQuality' },
                        { label: 'Overall Effectiveness', field: 'effectiveness' }
                    ].map(({ label, field }) => (
                        <div key={field}>
                            <label className="block text-sm font-medium text-gray-700">{label} (0 - 10)</label>
                            <input
                                type="range"
                                name={field}
                                min="0"
                                max="10"
                                value={feedback[field]}
                                onChange={(e) => handleSliderChange(field, e.target.value)}
                                className="w-full h-1 bg-gray-200 rounded appearance-none focus:outline-none focus:transform focus:scale-105 transition duration-300"
                            />
                            <div className="text-center text-gray-800 font-semibold mt-1 text-sm">{feedback[field]}</div>
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full px-3 py-2 font-semibold text-white bg-purple-500 rounded hover:bg-purple-600 focus:outline-none focus:transform focus:scale-105 transition duration-300"
                    >
                        Submit Feedback
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FeedbackForm;
