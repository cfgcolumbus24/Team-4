import React, { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import userPhoto from './opportunity_international_logo.jpeg';
import Calendar from './calender';
import TeacherProfile from './teacher-profile';
import VolunteerForm from './VolunteerForm';
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

const DashboardCard = ({ title, count, percentage }) => (
  <div className="bg-white p-6 rounded-md shadow-md">
    <div className="flex justify-between">
      <div>
        <h3 className="text-xl font-semibold">{count}</h3>
        <p className="text-gray-400">{title}</p>
      </div>
      <div className={`p-2 rounded-full ${percentage > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
        {percentage > 0 ? `+${percentage}%` : `${percentage}%`}
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('calendar');

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'calendar':
        return <Calendar />;
      case 'profile':
        return <TeacherProfile />;
      case 'feedback':
        return <Feedback/>;
      default:
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

