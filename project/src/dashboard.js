import React, { useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, BellIcon } from '@heroicons/react/24/outline';
import userPhoto from './opportunity_international_logo.jpeg';

const navigation = [
  { name: 'Calendar', href: '#', current: true },
  { name: 'Profile', href: '#', current: false },
  { name: 'Feedback', href: '#', current: false },
  { name: 'Contact', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Sidebar = () => (
  <div className="fixed left-0 top-0 w-64 h-full bg-gray-100 p-4 z-50">
    <h2 className="font-bold text-2xl">USER <span className="bg-blue-500 text-white px-2 rounded-md">PROFILE</span></h2>
    <nav className="mt-4">
      <p className="text-gray-400 font-bold">ADMIN</p>
      {navigation.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className={classNames(
            item.current ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-700 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium'
          )}
        >
          {item.name}
        </a>
      ))}
    </nav>
  </div>
);

const Navbar = () => (
  <div className="py-2 px-6 bg-gray-100 flex items-center shadow-md">
    <div className="ml-auto flex items-center">
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center text-gray-700 hover:text-gray-900">
          <img
            className="h-8 w-8 rounded-full"
            src={userPhoto}
            alt="User Avatar"
          />
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

const Dashboard = () => (
  <div className="flex min-h-screen">
    <Sidebar />
    <div className="flex-1 bg-gray-200 ml-64">
      <Navbar />
      
    </div>
  </div>
);

export default Dashboard;
