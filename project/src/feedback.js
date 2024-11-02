import React from 'react';

const FeedbackForm = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center text-gray-800">Feedback Form</h1>
                <form action="https://formspree.io/f/mkgnjvee" method="POST" className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Class</label>
                        <select
                            name="Class"
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea
                            name="Message"
                            placeholder="Message"
                            required
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FeedbackForm;
