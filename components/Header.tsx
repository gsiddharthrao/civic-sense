
import React from 'react';
import { User } from '../types';
import { LogOutIcon, MenuIcon } from './icons/IconComponents';
import Button from './Button';

interface HeaderProps {
  currentUser: User | null;
  onLogout: () => void;
  toggleSidebar: () => void;
  openLoginModal: (type: 'user' | 'admin') => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onLogout, toggleSidebar, openLoginModal }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-gray-500 dark:text-gray-400 focus:outline-none lg:hidden">
          <MenuIcon className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold ml-4 text-gray-800 dark:text-white">CivicLens</h1>
      </div>
      <div className="flex items-center space-x-4">
        {currentUser ? (
          <>
            <span className="hidden sm:inline text-sm text-gray-600 dark:text-gray-300">
              Welcome, <span className="font-medium">{currentUser.username}</span>
            </span>
            <Button onClick={onLogout} variant="ghost" size="sm">
              <LogOutIcon className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </>
        ) : (
            <div className="hidden sm:flex items-center space-x-2">
                <Button onClick={() => openLoginModal('user')} variant="ghost" size="sm">
                    User Login
                </Button>
                <Button onClick={() => openLoginModal('admin')} variant="secondary" size="sm">
                    Admin Login
                </Button>
            </div>
        )}
      </div>
    </header>
  );
};

export default Header;
