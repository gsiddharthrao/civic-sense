
import React from 'react';
import { User, View } from '../types';
import { HomeIcon, MapIcon, PlusCircleIcon, LayoutDashboardIcon, UsersIcon, HardHatIcon, MessageSquareIcon, PhoneIcon, LogOutIcon, XIcon, LogInIcon } from './icons/IconComponents';

interface SidebarProps {
  currentUser: User | null;
  navigateTo: (view: View) => void;
  onLogout: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  openLoginModal: (type: 'user' | 'admin') => void;
}

const NavLink: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; }> = ({ icon, label, onClick }) => (
  <a
    href="#"
    onClick={(e) => { e.preventDefault(); onClick(); }}
    className="flex items-center px-4 py-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
  >
    {icon}
    <span className="ml-4 font-medium">{label}</span>
  </a>
);

const Sidebar: React.FC<SidebarProps> = ({ currentUser, navigateTo, onLogout, isOpen, setIsOpen, openLoginModal }) => {
  const renderCitizenLinks = () => (
    <>
      <NavLink icon={<LayoutDashboardIcon className="h-5 w-5" />} label="Dashboard" onClick={() => navigateTo({ page: 'citizen-dashboard' })} />
      <NavLink icon={<PlusCircleIcon className="h-5 w-5" />} label="New Report" onClick={() => navigateTo({ page: 'new-report' })} />
    </>
  );

  const renderAdminLinks = () => (
    <>
      <NavLink icon={<LayoutDashboardIcon className="h-5 w-5" />} label="Dashboard" onClick={() => navigateTo({ page: 'admin-dashboard' })} />
      <NavLink icon={<UsersIcon className="h-5 w-5" />} label="Users" onClick={() => navigateTo({ page: 'admin-users' })} />
      <NavLink icon={<HardHatIcon className="h-5 w-5" />} label="Workers" onClick={() => navigateTo({ page: 'admin-workers' })} />
      <NavLink icon={<MessageSquareIcon className="h-5 w-5" />} label="Feedback" onClick={() => navigateTo({ page: 'admin-feedback' })} />
      <NavLink icon={<PhoneIcon className="h-5 w-5" />} label="Contact Forms" onClick={() => navigateTo({ page: 'admin-contact' })} />
    </>
  );

  const renderGuestLinks = () => (
    <>
      <NavLink icon={<HomeIcon className="h-5 w-5" />} label="Home" onClick={() => navigateTo({ page: 'home' })} />
      <NavLink icon={<MessageSquareIcon className="h-5 w-5" />} label="Feedback" onClick={() => navigateTo({ page: 'feedback' })} />
      <NavLink icon={<PhoneIcon className="h-5 w-5" />} label="Contact Us" onClick={() => navigateTo({ page: 'contact' })} />
    </>
  );

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      ></div>
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:flex-shrink-0 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">CivicLens</h2>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-500 dark:text-gray-400">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          {currentUser?.role === 'citizen' && renderCitizenLinks()}
          {currentUser?.role === 'admin' && renderAdminLinks()}
          {!currentUser && renderGuestLinks()}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          {currentUser ? (
            <NavLink icon={<LogOutIcon className="h-5 w-5" />} label="Logout" onClick={onLogout} />
          ) : (
            <div className="space-y-2">
                <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Login</h3>
                <NavLink icon={<LogInIcon className="h-5 w-5" />} label="Citizen Login" onClick={() => { openLoginModal('user'); setIsOpen(false); }} />
                <NavLink icon={<LogInIcon className="h-5 w-5" />} label="Admin Login" onClick={() => { openLoginModal('admin'); setIsOpen(false); }} />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;