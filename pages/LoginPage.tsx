import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { User } from '../types';
import { getUsers } from '../services/api';

interface LoginPageProps {
  onLogin: (user: User) => void;
  onSignUp: (newUser: { username: string; email: string; }) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSignUp }) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  
  // Sign In state
  const [signInUsername, setSignInUsername] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  
  // Sign Up state
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (signInUsername && signInPassword) {
      const allUsers = await getUsers();
      const foundUser = allUsers.find(u => u.username.toLowerCase() === signInUsername.toLowerCase());
      
      if (foundUser) {
        // Password validation is skipped for this demo application.
        onLogin(foundUser);
      } else {
        setError('User not found. Please check your username or sign up.');
      }
    } else {
      setError('Please enter a username and password.');
    }
  };
  
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (signUpUsername && signUpEmail && signUpPassword) {
      onSignUp({ username: signUpUsername, email: signUpEmail });
      setSignUpUsername('');
      setSignUpEmail('');
      setSignUpPassword('');
    } else {
      setError('Please fill out all fields.');
    }
  };

  const TabButton: React.FC<{isActive: boolean, onClick: () => void, children: React.ReactNode}> = ({isActive, onClick, children}) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-1/2 py-3 text-sm font-medium text-center border-b-2 ${
        isActive
          ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div>
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex" aria-label="Tabs">
            <TabButton isActive={activeTab === 'signin'} onClick={() => setActiveTab('signin')}>Sign In</TabButton>
            <TabButton isActive={activeTab === 'signup'} onClick={() => setActiveTab('signup')}>Sign Up</TabButton>
        </nav>
      </div>

      {activeTab === 'signin' ? (
        <form onSubmit={handleSignIn} className="space-y-6">
          <Input
            id="username"
            label="Username"
            type="text"
            value={signInUsername}
            onChange={(e) => setSignInUsername(e.target.value)}
            required
            autoComplete="username"
          />
          <Input
            id="password"
            label="Password"
            type="password"
            value={signInPassword}
            onChange={(e) => setSignInPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSignUp} className="space-y-6">
           <Input
            id="signup-username"
            label="Username"
            type="text"
            value={signUpUsername}
            onChange={(e) => setSignUpUsername(e.target.value)}
            required
            autoComplete="username"
          />
           <Input
            id="signup-email"
            label="Email Address"
            type="email"
            value={signUpEmail}
            onChange={(e) => setSignUpEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <Input
            id="signup-password"
            label="Password"
            type="password"
            value={signUpPassword}
            onChange={(e) => setSignUpPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
