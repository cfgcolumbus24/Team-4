import React, { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import userPhoto from './opportunity_international_logo.jpeg';
import Calendar from './calender';
import TeacherProfile from './teacher-profile';
import Feedback from './feedback';

const navigation = [
  { name: 'Calendar', key: 'calendar' },
  { name: 'Profile', key: 'profile' },
  { name: 'Feedback', key: 'feedback' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Sidebar = ({ activeTab, onTabClick }) => (
  <div className="fixed left-0 top-0 w-64 h-full bg-gray-100 p-4 z-50">
    <h2 className="font-bold flex items-center justify-center text-2xl">
      School 
      <span className="bg-blue-300 text-white px-1 mx-2 rounded-md">
        Sphere
      </span>
    </h2>
    <nav className="mt-4">
      <p className="text-gray-400 font-bold">ADMIN</p>
      {navigation.map((item) => (
        <button
          key={item.key}
          onClick={() => onTabClick(item.key)}
          className={classNames(
            activeTab === item.key ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-700 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium w-full text-left'
          )}
        >
          {item.name}
        </button>
      ))}
    </nav>
  </div>
);

const Navbar = () => (
  <div className="py-2 px-6 bg-gray-100 flex items-center shadow-md">
    <div className="ml-auto flex items-center">
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center text-gray-700 hover:text-gray-900">
          <img className="h-8 w-8 rounded-full" src={userPhoto} alt="User Avatar" />
        </Menu.Button>
        <Transition as={React.Fragment}>
          {/* Additional dropdown items can go here */}
        </Transition>
      </Menu>
    </div>
  </div>
);

// Sample lesson plans by weekday
const weekdayLessonPlans = {
  Monday: `
    - Math (8:00 - 9:00 a.m.): Introduction to Algebraic Expressions
      * Use real-life examples (e.g., finances) to show variables.
      * Utilize visual aids like algebra tiles for understanding terms.
      * Engage students with interactive exercises to create expressions.
    
    - French (9:00 - 10:00 a.m.): Basic Conversational Phrases
      * Introduce phrases with visuals and actions for context.
      * Practice pronunciation as a group, then in pairs.
      * Use role-play scenarios to practice conversations.

    - History (10:15 - 11:15 a.m.): Ancient Civilizations Overview
      * Use a world map to locate civilizations geographically.
      * Divide students into groups to research and share about a civilization.
      * Include visuals of artifacts or landmarks for better understanding.

    - Vocabulary (12:15 - 12:45 p.m.): Synonyms and Antonyms
      * Start with a matching game for antonyms/synonyms.
      * Introduce a vocabulary chart for new words.
      * Encourage students to create sentences using both synonyms and antonyms.

    - Art (12:45 - 1:45 p.m.): Perspective Drawing
      * Show examples of perspective in famous artworks.
      * Introduce one-point perspective with step-by-step guidance.
      * Allow students to practice one-point perspective in their own drawings.
  `,

  Tuesday: `
    - Math (8:00 - 9:00 a.m.): Fractions and Decimals
      * Use visual aids like fraction circles for understanding.
      * Provide real-life examples (e.g., cooking measurements).
      * Practice conversions and addition/subtraction with exercises.

    - French (9:00 - 10:00 a.m.): Family Vocabulary
      * Use a family tree visual with French terms.
      * Practice pronunciation, creating personal family trees.
      * Play a matching game to reinforce vocabulary.

    - History (10:15 - 11:15 a.m.): Ancient Egypt
      * Show images of Egyptian symbols and artifacts.
      * Discuss daily life in ancient Egypt and compare to modern times.
      * Engage students in a hieroglyphic writing activity.

    - Vocabulary (12:15 - 12:45 p.m.): Descriptive Adjectives
      * Introduce adjectives with their opposites.
      * Have students describe themselves or friends using adjectives.
      * End with a creative writing activity describing an imaginary character.

    - Art (12:45 - 1:45 p.m.): Egyptian Art and Symbols
      * Show examples of Egyptian art focusing on symbols and colors.
      * Guide students in creating Egyptian-inspired artwork.
  `,

  Wednesday: `
    - Math (8:00 - 9:00 a.m.): Geometry - Basic Shapes
      * Introduce shapes with real-life examples.
      * Use hands-on activities with string or sticks to create shapes.
      * Identify shapes in the classroom and create patterns.

    - French (9:00 - 10:00 a.m.): School Vocabulary
      * Label classroom items and introduce related vocabulary.
      * Practice pronunciation and conduct a scavenger hunt.
      * Describe favorite classroom objects using new vocabulary.

    - History (10:15 - 11:15 a.m.): Greek Mythology
      * Begin with a popular myth and discuss characters.
      * Divide students into groups to research gods/goddesses.
      * Encourage them to create their own myths.

    - Vocabulary (12:15 - 12:45 p.m.): Antonyms
      * Use flashcards for antonyms matching.
      * Play a game to connect words with their opposites.
      * Write sentences using words and their antonyms.

    - Art (12:45 - 1:45 p.m.): Greek Pottery Design
      * Show Greek pottery designs with common motifs.
      * Have students create paper pottery with Greek-inspired designs.
  `,

  Thursday: `
    - Math (8:00 - 9:00 a.m.): Introduction to Probability
      * Discuss "chance" and ask about real-life examples.
      * Use experiments like dice rolls to introduce probability.
      * Let students predict and perform experiments to see outcomes.

    - French (9:00 - 10:00 a.m.): Numbers and Dates
      * Introduce numbers with a counting song.
      * Practice pronunciation and calendar dates in French.
      * Assign various dates for students to say aloud.

    - History (10:15 - 11:15 a.m.): Roman Empire
      * Use a map of the Roman Empire.
      * Discuss Roman life features like roads and buildings.
      * Activity: Design a Roman-style coin or architectural drawing.

    - Vocabulary (12:15 - 12:45 p.m.): Action Verbs
      * Introduce verbs with actions for memory aid.
      * Act out verbs and guess each other’s actions.
      * Creative story activity using action verbs.

    - Art (12:45 - 1:45 p.m.): Roman Mosaics
      * Show examples of Roman mosaics.
      * Guide students in making their own mosaics with paper squares.
  `,

  Friday: `
    - Math (8:00 - 9:00 a.m.): Word Problems
      * Break down word problems, focusing on key information.
      * Practice guided problems, allowing students to create their own.
      * Have pairs work together to solve and explain problems.

    - French (9:00 - 10:00 a.m.): Food and Dining Vocabulary
      * Introduce vocabulary with food pictures.
      * Role-play a restaurant scene for ordering practice.
      * Write a list of favorite foods in French.

    - History (10:15 - 11:15 a.m.): The Middle Ages
      * Discuss medieval life with visuals of castles.
      * Assign roles as medieval society members for a day.
      * Conclude with images of knights and medieval armor.

    - Vocabulary (12:15 - 12:45 p.m.): Compound Words
      * Introduce examples of compound words.
      * Play a game combining words to create compound words.
      * Encourage students to use compound words in sentences.

    - Art (12:45 - 1:45 p.m.): Coat of Arms Design
      * Show traditional coats of arms and explain symbolism.
      * Allow students to design their own with meaningful symbols.
  `,
};



// Generate lesson plans for each weekday in November 2024
const generateMonthlyLessonPlans = () => {
  const lessonPlans = {};
  const startOfMonth = dayjs('2024-11-01');
  const endOfMonth = startOfMonth.endOf('month');

  let currentDay = startOfMonth;
  while (currentDay.isBefore(endOfMonth) || currentDay.isSame(endOfMonth)) {
    const weekday = currentDay.format('dddd'); // Get day of the week (e.g., "Monday")
    if (weekdayLessonPlans[weekday]) {
      lessonPlans[currentDay.format('YYYY-MM-DD')] = weekdayLessonPlans[weekday];
    }
    currentDay = currentDay.add(1, 'day'); // Move to the next day
  }

  return lessonPlans;
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('calendar');
  const [selectedDate, setSelectedDate] = useState(null);
  const lessonPlans = generateMonthlyLessonPlans();

  const handleDateClick = (date) => {
    const formattedDate = date.format('YYYY-MM-DD'); // Format date as "YYYY-MM-DD"
    setSelectedDate(formattedDate);
  };

  const renderActiveTabContent = () => {
    if (activeTab === 'calendar') {
      return (
        <>
          <h3 className="text-xl font-bold mb-4 text-center">Welcome to your Dashboard! Click on today's date to see your study plan below. Happy teaching!</h3> {/* Calendar title */}
          <Calendar onDateClick={handleDateClick} /> {/* Full month calendar */}
          {selectedDate && lessonPlans[selectedDate] && (
            <div className="mt-4 p-4 bg-white rounded-md shadow-md">
              <h3 className="text-lg font-bold">Lesson Plan for {selectedDate}</h3>
              <p className="whitespace-pre-line">{lessonPlans[selectedDate]}</p>
            </div>
          )}
        </>
      );
    } else if (activeTab === 'profile') {
      return <TeacherProfile />;
    } else if (activeTab === 'feedback') {
      return <Feedback />;
    } else {
      return <Calendar />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar activeTab={activeTab} onTabClick={setActiveTab} />
      <div className="flex-1 bg-gray-200 ml-64 p-4">
        <Navbar />
        <div className="lg:col-span-2">
          {renderActiveTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
