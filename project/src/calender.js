import React, { useState } from 'react';
import dayjs from 'dayjs';

const Calendar = ({ onDateClick }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  // Organize calendar 
  const startOfMonth = currentMonth.startOf('month').startOf('week');
  const days = Array.from({ length: 42 }).map((_, index) =>
    startOfMonth.add(index, 'day')
  );

  // Helper functions to navigate between months
  const handlePrevMonth = () => setCurrentMonth(currentMonth.subtract(1, 'month'));
  const handleNextMonth = () => setCurrentMonth(currentMonth.add(1, 'month'));

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 border-2 border-black">
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePrevMonth} className="text-gray-600 hover:text-gray-900">
            &lt;
          </button>
          <h2 className="text-lg font-bold">
            {currentMonth.format('MMMM YYYY')}
          </h2>
          <button onClick={handleNextMonth} className="text-gray-600 hover:text-gray-900">
            &gt;
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-gray-600">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={index} className="font-medium">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 mt-2">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => {
                if (day.month() === currentMonth.month()) { // Check if date is in the current month
                  onDateClick(day); // Trigger onDateClick with the selected day
                }
              }}
              className={`p-2 rounded-lg w-full ${
                day.isSame(dayjs(), 'day')
                  ? 'bg-blue-500 text-white'
                  : day.month() !== currentMonth.month()
                  ? 'text-gray-400'
                  : 'text-gray-700 hover:bg-blue-200'
              }`}
            >
              {day.date()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
