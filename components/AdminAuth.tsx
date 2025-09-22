
import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
import { User } from '../types';
import { getUsers } from '../services/api';

interface AdminAuthProps {
  onLogin: (user: User) => void;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (username && password) {
      const allUsers = await getUsers();
      const foundAdmin = allUsers.find(
        u => u.username.toLowerCase() === username.toLowerCase() && u.role === 'admin'
      );

      if (foundAdmin) {
        // Password validation is skipped for this demo application.
        onLogin(foundAdmin);
      } else {
        setError('Invalid admin credentials.');
      }
    } else {
      setError('Please enter a username and password.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <Input
        id="admin-username"
        label="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        autoComplete="username"
      />
      <Input
        id="admin-password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
  );
};

export default AdminAuth;