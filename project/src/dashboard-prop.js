import React, { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import TeacherInfo from './teacherList'; 
import StudentInfo from './stu_roster';
import VolunteerResponse from './volunteerList';
import FeedbackList from './feedbackList';
import ChatBox from './ChatBox'; // Import ChatBox component

const navigation = [
  { name: 'Teacher Info', key: 'teacherinfo' },
  { name: 'Student Info', key: 'studentinfo' },
  { name: 'FeedbackList', key: 'feedback' },
  { name: 'Volunteer Response', key: 'v_response' },
  { name: 'Chat', key: 'chat' }, // Add Chat tab
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Sidebar = ({ activeTab, onTabClick }) => (
  <div className="fixed left-0 top-0 w-64 h-full bg-gray-100 p-4 z-50">
    <h2 className="font-bold text-2xl">PROPRIETOR <span className="bg-blue-500 text-white px-1 rounded-md">PROFILE</span></h2>
    <nav className="mt-4">
      <p className="text-gray-400 font-bold"></p>
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
        </Menu.Button>
        <Transition as={React.Fragment}>
          {/* Additional dropdown items can go here */}
        </Transition>
      </Menu>
    </div>
  </div>
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('teacherinfo');

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'teacherinfo':
        return <TeacherInfo />;
      case 'studentinfo':
        return <StudentInfo />;
      case 'feedback':
        return <FeedbackList />;
      case 'v_response':
        return <VolunteerResponse />;
      case 'chat': // Render ChatBox when Chat tab is active
        return <ChatBox />;
      default:
        return <TeacherInfo />;
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
